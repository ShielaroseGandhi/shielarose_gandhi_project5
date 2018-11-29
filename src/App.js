import React, { Component } from 'react';
import './styles/App.css';
import firebase from './firebase';
import Nav from './Nav';
import Notes from './Notes';

class App extends Component {
  constructor(){
    super()
  }
  render() {
    return (
      <div className="App">
        <Nav />
        <Notes />
      </div>
    );
  }
}

export default App;
