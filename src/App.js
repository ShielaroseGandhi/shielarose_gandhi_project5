import React, { Component } from 'react';
import './styles/App.css';
import firebase from './Other JS files/firebase';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faArchive } from '@fortawesome/free-solid-svg-icons'
import LogInHomePage from './Components/LogInHomePage';
import Nav from './Components/Nav';
import AddNotes from './Components/AddNotes';
import Archive from './Components/Archive';
import Trash from './Components/Trash';
import today from './Other JS files/date';

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

let dbRef;

class App extends Component {
  constructor(){
    super()
    this.state = {
      user: null,
      completeNotes: {},
      menuIsOpen: false,
      title: "",
      note: "",
      theme: "",
      name: "",
    }
  }
  componentDidMount(){
    console.log("component")
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user: user
        }, () => {
          // create a reference specific to user
          dbRef = firebase.database().ref(`/${this.state.user.uid}`)
          // dbRef.set({ name: this.state.user.displayName, theme: this.state.theme
          // })
        }, () => {
          // attaching our event listener to firebase
          dbRef.on("value", (snapshot) => {
            console.log(snapshot.val())
            this.setState({
              completeNotes: snapshot.val()[this.state.user.uid] || {},
            })
          })
        })
      }
    })

  }

  // Handle Google login -> See above
  googleSignIn = e => {
    e.preventDefault();
    auth.signInWithPopup(provider)
      .then(result => {
        console.log(result)
        this.setState({
          user: result.user,
          name: result.user.displayName
        })
    })
  }

  signOut = () => {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        })
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
    const noteRef = firebase.database().ref(`/${this.state.user.uid}/${firebaseKey}`);
    noteRef.remove();
  }

  handleThemeClick = (color) => (e) => {
    this.setState({ 
      theme: color 
    }, () => {
      dbRef.update({ theme: this.state.theme })
    })
  }

  render() {
    console.log("render");
    const {
      completeNotes,
      title,
      note,
      menuIsOpen,
      theme
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

    let addClass;
    if (theme === "red") {
      addClass = "red-theme"
    } else if (theme === "blue") {
      addClass = "blue-theme"
    } else if (theme === "yellow") {
      addClass = "yellow-theme"
    } else if (theme === "green") {
      addClass = "green-theme"
    } else if (theme === "purple") {
      addClass = "purple-theme"
    } else if (theme === "pink") {
      addClass = "pink-theme"
    } else if (theme === "white") {
      addClass = "white-theme"
    } else if (theme === "black") {
      addClass = "dark-theme"
    } else {
      addClass = ""
    };

    return (
      <Router>
        <div className="App">
          <Switch>
            {this.state.user 
            ?
            <React.Fragment>
              <Nav
                toggleMenu={this.toggleMenu}
                isOpen={menuIsOpen}
                handleThemeClick={this.handleThemeClick}
                theme={theme}
              />
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
                    addClass={addClass}
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
            </React.Fragment>
            :
            <Route
              path="/"
              exact
              render={() => (
                <LogInHomePage 
                  googleSignIn={this.googleSignIn}
                />
              )}
            />
            }
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
