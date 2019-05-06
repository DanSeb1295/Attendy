import pymongo
import datetime
import gspread
from oauth2client.service_account import ServiceAccountCredentials

class Cell(object):
	"""An instance of this class represents a single cell
	in a :class:`worksheet <gspread.models.Worksheet>`.
	"""

	def __init__(self, row, col, value=''):
		self._row = row
		self._col = col
		self.value = value

	def __repr__(self):
		return '<%s R%sC%s %s>' % (self.__class__.__name__,
								   self.row,
								   self.col,
								   repr(self.value))

	@property
	def row(self):
		"""Row number of the cell."""
		return self._row

	@property
	def col(self):
		"""Column number of the cell."""
		return self._col

	@property
	def numeric_value(self):
		try:
			return float(self.value)
		except ValueError:
			return None

# Setting up MongoDB & GSpread Clients
print('>>>>>>>>>> SETTING UP CLIENT')
client = pymongo.MongoClient('')

scope = ['https://spreadsheets.google.com/feeds',
		 'https://www.googleapis.com/auth/drive']
creds = ServiceAccountCredentials.from_json_keyfile_name('./config/client_secret.json', scope)
gClient = gspread.authorize(creds)
sheet = gClient.open("IEOR 171 Attendance").sheet1

# Variables
d = datetime.datetime.today()
year = d.year
month = d.month if (d.month >= 10 ) else '0{}'.format(d.month)
day = d.day if (d.day >= 10 ) else '0{}'.format(d.day)
dates = ['{}-{}-{}'.format(year, month, day), '{}-{}-{}'.format(year, month, day + 1)]

NAMELIST = sheet.range('A3:A60')
COLNUM = sheet.find('{}-{}-{}'.format(year, month, day)).col
lastRow = 60

namelist = []
for name in NAMELIST:
	namelist.append(name.value.strip('\n ').replace(' ', '').lower())

# Fetching Attenance from MongoDB
print('>>>>>>>>>> FETCHING DATA')
attendance = {}
for date in dates:
	print('Accessing MongoDB Collection:', date)
	for entry in client['Attendy'][date].find():
		attendance[entry['sid']] = {'firstName': entry['firstName'].strip('\n ').replace(' ', '').lower(),
									'lastName': entry['lastName'].strip('\n ').replace(' ', '').lower()}

# Formatting Data to Update GSheet
print('>>>>>>>>>> COLLATING ATTENDANCE')
cellList = []
for _, presentee in attendance.items():
	candidateFirst = []
	candidateSec = []
	for index, name in enumerate(namelist):
		if presentee['firstName'] in name:
			candidateFirst.append((name, index))
	if len(candidateFirst) == 1:
		row = candidateFirst[0][1] + 3
		cellList.append(Cell(row, COLNUM, 1))
		continue
	for candidateName in candidateFirst:
		if presentee['lastName'] in candidateName[0]:
			candidateSec.append(candidateName)
	if len(candidateSec) == 1:
		row = candidateSec[0][1] + 3
		cellList.append(Cell(row, COLNUM, 1))
		continue
	lastRow += 1
	cellList.append(Cell(lastRow, COLNUM, 1))
	sheet.update_acell('A{}'.format(lastRow), presentee['firstName'] + ' ' + presentee['lastName'])


# Perform Update
print('>>>>>>>>>> UPDATING GOOGLE SHEETS')
sheet.update_cells(cellList)
