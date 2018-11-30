import React, { Component } from 'react';
import './styles/App.css';
import firebase from './firebase';
import Nav from './Nav';
import Sidebar from './Sidebar';
import Notes from './Notes';
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
        <section className="note-display">
          {
            Object.entries(completeNotes).map(note => {
              return (
                <div key={note[0]}>
                  <h2>{note[1].title}</h2>
                  <p>{note[1].date}</p>
                  <p id="line-break">{note[1].note}</p>
                </div>
              )           
            })
          }
        </section>
      </div>
    );
  }
}

export default App;
