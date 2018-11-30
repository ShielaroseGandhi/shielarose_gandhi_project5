import React, { Component } from 'react';
import './styles/App.css';
import firebase from './firebase';
import Nav from './Nav';
import Sidebar from './Sidebar';
import Notes from './Notes';
import NoteDisplay from './NoteDisplay'
import today from './date';

const dbRef = firebase.database().ref();

class App extends Component {
  constructor(){
    super()
    this.state = {
      completeNotes: [],
      menuIsOpen: false,
      title: "",
      note: ""
    }
  }
  componentDidMount(){
    dbRef.on('value', (snapshot) => {
      this.setState({
        completeNotes: snapshot.val()
      })
    })
  }
  addNoteOnSubmit = (e) => {
    e.preventDefault();

    const newNote = {
      title: this.state.title,
      note: this.state.note,
      date: today
    }
    // push newNote into firebase
    if(this.state.note !== ""){
      dbRef.push(newNote);
      this.setState({
        title: "",
        note: ""
      })
    } 
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  toggleMenu = () => {
    this.setState({ menuIsOpen: !this.state.menuIsOpen });
  }

  deleteNote = e => {
    const firebaseKey = e.target.parentElement.id;
    const noteRef = firebase.database().ref(`/${firebaseKey}`);
    noteRef.remove();
  }

  render() {
    const {
      completeNotes,
      title,
      note,
      menuIsOpen,
    } = this.state;

    return (
      <div className="App">
        <Nav
          toggleMenu={this.toggleMenu}
          isOpen={menuIsOpen}
        />
        { menuIsOpen &&
          <Sidebar />
        }
        <Notes 
          handleChange={this.handleChange} 
          addNoteOnSubmit={this.addNoteOnSubmit}
          title={title}
          note={note}
        />
        { completeNotes !== null
        ? 
        <NoteDisplay 
          completeNotes = {completeNotes}
          deleteNote = {this.deleteNote}
        />
        :
        <p>no notes to display :(</p>
      }
      </div>
    );
  }
}

export default App;
