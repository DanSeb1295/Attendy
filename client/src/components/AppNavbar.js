import React, { Component } from 'react';
import {
	Navbar,
	NavbarBrand,
	Container
} from 'reactstrap';

class AppNavbar extends Component {
	render() {
		return (
		<div height='2rem'>
			<Navbar color="dark" className="mb-5" style={{top: '0', marginBottom: '1rem', position: 'fixed', width: '100%', overflow: 'hidden'}}>
				<Container style={{margin: 'auto'}}>
					<NavbarBrand style={{fontSize: 'inherit'}} href="/">A T T E N D Y</NavbarBrand>
				</Container>
			</Navbar>
		</div>
		);
	}
}

export default AppNavbar;