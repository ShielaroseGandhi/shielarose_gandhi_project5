import React, { Component } from 'react';
import './styles/App.css';
import firebase from './firebase';
import Nav from './Nav';
import Sidebar from './Sidebar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Sidebar />
      </div>
    );
  }
}

export default App;
