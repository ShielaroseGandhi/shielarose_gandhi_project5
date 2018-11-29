import React, { Component } from 'react';
import './styles/App.css';
import firebase from './firebase';
import Nav from './Nav';
import Notes from './Notes';

const dbRef = firebase.database().ref();

class App extends Component {
  constructor(){
    super()
    this.state = {
      completeNotes: [],
    }
  }
  addNoteOnSubmit = e => {
    e.preventDefault();
    // create a copy of the completeNotes array in state
    const completeNotesCopy = Array.from(this.state.completeNotes);
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    today = mm + '/' + dd + '/' + yyyy;
    const newNote = {
      title: this.state.title,
      note: this.state.note,
      date: today
    }
    // push the newNote object into the completeNotesCopy array
    completeNotesCopy.push(newNote)
    if(this.state.note !== ""){
      this.setState({
        completeNotes: completeNotesCopy,
        title: "",
        note: ""
      })
    }
  }
  handleChange = e => {
    console.log(e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    return (
      <div className="App">
        <Nav />
        <Notes 
          handleChange={this.handleChange} 
          addNoteOnSubmit={this.addNoteOnSubmit}
          
        />
      </div>
    );
  }
}

export default App;
