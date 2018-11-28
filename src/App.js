import React, { Component } from 'react';
import './styles/App.css';
import firebase from './firebase';
import Nav from './Nav';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
      </div>
    );
  }
}

export default App;
