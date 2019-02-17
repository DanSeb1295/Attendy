import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';

class AccessDenied extends Component {
	render = () => {
		return (
		<div>
      	<Jumbotron style={{backgroundColor: "#f0f0f0"}}>
      	<div style={{margin: '2rem'}}>
        <h1 className="display-3" style={{fontSize: '50px'}}>Hello, Tech Firm Leader!</h1>
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

export default AccessDenied;