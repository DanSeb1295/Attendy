import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import SignInPage from './components/SignInPage';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App" style={{backgroundColor: "#f0f0f0", height: '-webkit-fill-available'}}>
        <AppNavbar />
        <SignInPage />
      </div>
    );
  }
}

export default App;
