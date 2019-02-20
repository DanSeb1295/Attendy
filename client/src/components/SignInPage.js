import React, { Component } from 'react';
import { Spinner, Button, Form, FormGroup, Jumbotron, Label, Input, Fade} from 'reactstrap';
import Cookies from 'universal-cookie';

const HOURS_START_CLASS = 14;
const HOUR_END_CLASS = 17;
const HOURS_AFTER_CLASS = 1;
const [nBound, eBound, sBound, wBound] = [37.876012, -122.259018, 37.875334, -122.259342];

const cookies = new Cookies();

const DEV = false

class SignInPage extends Component {
	state = {
		loading: true,
		inClass: false,
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({loading: false, inClass: false});
		}, 3000);
		console.log('Auto-Checking Location')
	  	navigator.geolocation.getCurrentPosition(
	  		(location) => {
	  			var [lat, lng] = [location.coords.latitude, location.coords.longitude];
	  			console.log(`${lat}, ${lng}`)
		  		if (Number(lat) >= sBound && Number(lat) <= nBound && Number(lng) >= wBound && Number(lng) <= eBound) {
					console.log('ENTERED')
					setTimeout(() => {
						this.setState({loading: false, inClass: true});
					}, 3000);
		  		}
			},
			(error_message) => {
				console.error('An error has occured while retrieving location', error_message)
	  		}
	  	);
	}

	render = () => {
		if (DEV) {
			// cookies.remove('submitted');
			this.state.inClass = true;
		}
		const submitted = cookies.get('submitted');
		return(
			<div>
				{this.state.loading && !submitted && <Spin />}
				{!this.state.loading && this.state.inClass && submitted  && <Submitted />}
				{!this.state.loading && this.state.inClass && !submitted && <AttForm />}
				{!this.state.loading && !this.state.inClass && <AccDenied />}
			</div>
		);
	}
}

class AttForm extends Component {
	state = {
		sid: '',
		firstName: '',
		lastName: '',
	}

	handleChange = (e) => this.setState({[e.target.name]: e.target.value });
	
	handleSubmit = (e) => {
		e.preventDefault();
		var exp = new Date();
		exp.setDate(exp.getDate() + 1);
		cookies.set('submitted', 'true', { path: '/', expires: exp} )
		fetch('/api/items', {
			method: "POST",
			cache: "no-cache",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(this.state)
		})
  			.then(res => res.json())
  			.then(json => {
  				console.log(json);
  				window.location = '/'
  			})
	};

	render(){
		// if (DEV) { cookies.remove('submitted') }
		console.log(cookies.getAll())
		const { sid, firstName, lastName } = this.state;
		const currentTime = new Date();
		const submitted = cookies.get('submitted');
		const formOpen = currentTime.getHours() >= HOURS_START_CLASS && currentTime.getHours() <= HOUR_END_CLASS + HOURS_AFTER_CLASS
		var allowSubmit = Number(currentTime.getDay()) === 2 && !submitted && formOpen;
		if (DEV) { allowSubmit = true };
		const isEnabled = firstName && lastName && allowSubmit;


		return(
			<div style={{paddingTop: '4rem', margin: 'auto', backgroundColor: "#f0f0f0"}}>
				<Fade in={true} tag="h5" className="mt-3" margin='0'>
        			<Form onSubmit={this.handleSubmit} style={{padding: '4rem', alignItems: 'center', justifyContent: 'center'}}>
				          <FormGroup style={{marginBottom: '2rem'}}>
				            <Label style={{fontFamily: 'monospace', fontSize: 'medium'}}>SID</Label>
				            <Input type="number" pattern="[0-9]*" name="sid" id="sid" placeholder="Enter 10-digit SID" value={this.state.sid} onChange={this.handleChange}/>
				          </FormGroup>
				          <FormGroup style={{marginBottom: '2rem'}}>
				            <Label style={{fontFamily: 'monospace', fontSize: 'medium'}}>First Name</Label>
				            <Input type="text" name="firstName" id="firstName" placeholder="Enter First Name" value={this.state.firstName} onChange={this.handleChange}/>
				          </FormGroup>
				          <FormGroup style={{marginBottom: '2rem'}}>
				            <Label style={{fontFamily: 'monospace', fontSize: 'medium'}}>Last Name</Label>
				            <Input type="text" name="lastName" id="lastName" placeholder="Enter Last Name" value={this.state.lastName} onChange={this.handleChange}/>
				          </FormGroup>
					    <Button disabled={!isEnabled}>Submit</Button>
        			</Form>
        		</Fade>
      		</div>
		);
	}
}

class AccDenied extends Component {
	render = () => {
		return (
			<div style={{paddingTop: '5rem', margin: 'auto'}}>
		      	<Jumbotron style={{backgroundColor: "#f0f0f0"}}>
			      	<div style={{margin: '2rem'}}>
			        <h1 className="display-3" style={{fontSize: 'xx-large'}}>Hello, Tech Firm Leader!</h1>
			        <p className="lead"> It appears that you are not in class.</p>
			        <hr className="my-2" />
			        <p>Please come to class to access the attendance form!</p>
			        <p className="lead">
			          <Button style={{baclgroundColor: "#212529"}} href="/">Click here to retry</Button>
			        </p>
			        </div>
		      	</Jumbotron>
	    	</div>
		);
	}
}

class Submitted extends Component {
	render = () => {
		return (
			<div style={{paddingTop: '5rem', margin: 'auto',}}>
		      	<Jumbotron style={{backgroundColor: "#f0f0f0"}}>
			      	<div style={{margin: '2rem'}}>
			        <h1 className="display-3" style={{fontSize: 'xx-large'}}>SUBMITTED!</h1>
			        <p className="lead"> You have already submitted your attendance for this week.</p>
			        <hr className="my-2" />
			        <p>Please access this form again next week!</p>
			        </div>
		      	</Jumbotron>
	    	</div>
		);
	}
}

class Spin extends Component {
	render() {
	    return (
	      <div style={{height: '50%', width: '70%', margin: 'auto', textAlign: 'center', paddingTop: '7rem', backgroundColor: "#f0f0f0"}}>
	      	<div style={{display: 'inline-block', margin:'auto', marginBottom: '20px', width: '75%'}}>
	      		<Spinner style={{height: '2rem', width: '2rem', margin: '.7rem'}} type="grow" color="secondary" />
	      	</div>
	      	<div style={{display: 'inline-block', margin:'auto', marginBottom: '20px', width: '75%'}}>
		        <Spinner style={{height: '2rem', width: '2rem', margin: '.7rem'}} type="grow" color="success" />
		        <Spinner style={{height: '2rem', width: '2rem', margin: '.7rem'}} type="grow" color="danger" />
		        <Spinner style={{height: '2rem', width: '2rem', margin: '.7rem'}} type="grow" color="info" />
		    </div>
	      	<div style={{display: 'inline-block', margin:'auto', marginBottom: '20px', width: '75%', backgroundColor: "#f0f0f0"}}>
	      		<Spinner style={{height: '2rem', width: '2rem', margin: '.7rem'}} type="grow" color="warning" />
	      	</div>
	      	<div style={{backgroundColor: "#f0f0f0"}}>
	      		<h2 style={{color: 'light', marginTop: '3rem', fontFamily: 'monospace', fontSize: 'medium'}}> Checking &nbsp; Location </h2>
	      	</div>
	      </div>
	    );
  	}
}

export default SignInPage;