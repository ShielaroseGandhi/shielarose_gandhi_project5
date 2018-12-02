import React, { Component } from 'react';
import './styles/App.css';
import firebase from './firebase';
import Nav from './Nav';
import Sidebar from './Sidebar';
import Notes from './Notes';
import NoteDisplay from './NoteDisplay';
import Archive from './Archive';
import Trash from './Trash';
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
      if (snapshot.val() !== null) {
        this.setState({
          completeNotes: Object.entries(snapshot.val())
        })
      } else {
        this.setState({
          completeNotes: []
        })
      }
    })
  }
  addNoteOnSubmit = (e) => {
    e.preventDefault();

    const newNote = {
      title: this.state.title,
      note: this.state.note,
      date: today,
      archived: false,
      trash: false
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
    this.setState({ 
      menuIsOpen: !this.state.menuIsOpen 
    });
  }

  archiveHandler = (id) => {
    dbRef.child(`/${id}`).update({ archived: true, trash: false });  
  }

  unArchiveHandler = (id) => {
    dbRef.child(`/${id}`).update({ archived: false });  
  }

  trashHandler = (id) => {
    dbRef.child(`/${id}`).update({ trash: true, archived: false });
  }

  moveFromTrashHandler = (id) => {
    dbRef.child(`/${id}`).update({ trash: false });
  }

  deleteNote = noteId => {
    const firebaseKey = noteId;
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

    const archivedNotes = [];

    for (let i in completeNotes) {
      if (completeNotes[i][1].archived === true){
        archivedNotes.push(completeNotes[i])
      }
    }

    const trashNotes = [];

    for (let i in completeNotes) {
      if (completeNotes[i][1].trash === true) {
        trashNotes.push(completeNotes[i])
      }
    }

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
        { completeNotes.length > 0
          ? 
          <NoteDisplay 
            completeNotes={completeNotes.filter((note) => note[1].archived === false && note[1].trash === false)}
            trashHandler = {this.trashHandler}
            archiveHandler = {this.archiveHandler}
          />
          :
          <p>no notes</p>
        }
        { archivedNotes.length > 0
          ? 
          <Archive 
            archive = {completeNotes.filter((note) => note[1].archived === true && note[1].trash === false)}
            unArchiveHandler = {this.unArchiveHandler}
            trashHandler={this.trashHandler}
          />
          :
          <p>nothing in archive</p>
        }
        { trashNotes.length > 0
          ? 
          <Trash
            trash = {completeNotes.filter((note) => note[1].trash === true)}
            archiveHandler={this.archiveHandler}
            deleteNote={this.deleteNote}
          />
          :
          <p>no trash</p>
        }
      </div>
    );
  }
}

export default App;
