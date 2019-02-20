const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var date = new Date();
var yyyy = date.getFullYear();
var mm = date.getMonth() + 1;
var dd = date.getDate();
var fullDate = [yyyy + '-',
				(mm>9 ? '' : '0') + mm + '-',
          		(dd>9 ? '' : '0') + dd
          		].join('');

// Create Schema
const ItemSchema = new Schema({
	sid: {
		type: String,
		required: true
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
})

module.exports = Item = mongoose.model(`${fullDate}`, ItemSchema);