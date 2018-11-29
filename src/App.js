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
  componentDidMount(){
    dbRef.on('value', (snapshot) => {
      this.setState({
        completeNotes: snapshot.val()
      })
    })
  }
  addNoteOnSubmit = e => {
    e.preventDefault();
    // create a copy of the completeNotes array in state
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
        <section>
          {
            Object.entries(this.state.completeNotes).map(note => {
              return (
                <div key={note[0]}>
                  <h2>{note[1].title}</h2>
                  <p>{note[1].note}</p>
                  <p>{note[1].date}</p>
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
