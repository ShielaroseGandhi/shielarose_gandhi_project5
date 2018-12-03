import React, { Component } from 'react';
import './styles/App.css';
import firebase from './Other JS files/firebase';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faArchive } from '@fortawesome/free-solid-svg-icons'
import Nav from './Components/Nav';
import AddNotes from './Components/AddNotes';
import Archive from './Components/Archive';
import Trash from './Components/Trash';
import today from './Other JS files/date';

const dbRef = firebase.database().ref();

class App extends Component {
  constructor(){
    super()
    this.state = {
      completeNotes: [],
      menuIsOpen: false,
      title: "",
      note: "",
      addClass: ""
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
      trash: false,
    }
    // push newNote into firebase
    if(this.state.note !== ""){
      dbRef.push(newNote);
      this.setState({
        title: "",
        note: "",
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

  archiveHandler = (id) => {
    dbRef.child(`/${id}`).update({ archived: true, trash: false });  
  }

  moveToNotesHandler = (id) => {
    dbRef.child(`/${id}`).update({ archived: false, trash: false });  
  }

  trashHandler = (id) => {
    dbRef.child(`/${id}`).update({ trash: true, archived: false });
  }

  deleteNote = noteId => {
    const firebaseKey = noteId;
    const noteRef = firebase.database().ref(`/${firebaseKey}`);
    noteRef.remove();
  }

  handleThemeClick = (color) => (e) => {
    this.setState({ addClass: color })
  }

  render() {
    const {
      completeNotes,
      title,
      note,
      menuIsOpen,
      addClass
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

    let theme;
    if (addClass === "red") {
      theme = "red-theme"
    } else if (addClass === "blue") {
      theme = "blue-theme"
    } else if (addClass === "yellow") {
      theme = "yellow-theme"
    } else if (addClass === "green") {
      theme = "green-theme"
    } else if (addClass === "purple") {
      theme = "purple-theme"
    } else if (addClass === "pink") {
      theme = "pink-theme"
    } else if (addClass === "white") {
      theme = "white-theme"
    } else if (addClass === "black") {
      theme = "dark-theme"
    } else {
      theme = ""
    };

    return (
      <Router>
        <div className="App">
          <Nav
            toggleMenu={this.toggleMenu}
            isOpen={menuIsOpen}
            handleThemeClick={this.handleThemeClick}
            theme={theme}
          />
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <AddNotes 
                  handleChange={this.handleChange} 
                  addNoteOnSubmit={this.addNoteOnSubmit}
                  title={title}
                  note={note}
                  completeNotes={completeNotes}
                  archiveHandler={this.archiveHandler}
                  trashHandler={this.trashHandler}
                  theme={theme}
                />
              )}
            />
            <Route
              path="/archive"
              render={() => (
                <section className="wrapper archive">
                  <h2 className="main-title">
                    <FontAwesomeIcon icon={faArchive} className="icon-title" title="Archive" />
                    <span className="visuallyhidden">Archive</span>
                  </h2>
                  { archivedNotes.length > 0
                    ? 
                    <Archive 
                      archive = {completeNotes.filter((note) => note[1].archived === true && note[1].trash === false)}
                      moveToNotesHandler = {this.moveToNotesHandler}
                      trashHandler={this.trashHandler}
                      theme={theme}
                      />
                    :
                    <div className="empty-section">
                      <FontAwesomeIcon icon={faArchive} className="icon-main" aria-hidden title="Archive" />
                      <span className="visuallyhidden">Archive</span>
                      <p>You have nothing in your archive</p>
                    </div> 
                  }
                  </section>
                )}
            />
            <Route
              path="/trash"
              render={() => (
                <section className="wrapper trash">
                  <h2 className="main-title">
                    <FontAwesomeIcon icon={faTrashAlt} className="icon-title" aria-hidden title="Trash" />
                    <span className="visuallyhidden">Trash</span>
                  </h2>
                  
                  { trashNotes.length > 0
                    ? 
                    <Trash
                      trash = {completeNotes.filter((note) => note[1].trash === true)}
                      archiveHandler={this.archiveHandler}
                      moveToNotesHandler={this.moveToNotesHandler}
                      deleteNote={this.deleteNote}
                      theme={theme}
                    />
                    :
                    <div className="empty-section">
                      <FontAwesomeIcon icon={faTrashAlt} className="icon-main" aria-hidden title="Trash" />
                      <span className="visuallyhidden">Trash</span>
                      <p>You have nothing in your trash</p>
                    </div> 
                  }
                </section>
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
