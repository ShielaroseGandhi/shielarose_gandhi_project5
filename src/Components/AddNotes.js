import React, { Component } from 'react';
import NoteDisplay from './NoteDisplay';
import autosize from 'autosize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStickyNote } from '@fortawesome/free-solid-svg-icons'

class AddNotes extends Component {
   constructor(){
      super()
      this.state = {
         showTitle: false
      }
   }
   componentDidMount() {
      autosize(this.textarea);
   }
   focusHandler = () => {
      this.setState({
         showTitle: true
      })
   }
   handleSubmit = (e) => {
      this.textarea.style.height = "70px";
      this.props.addNoteOnSubmit(e)
   }
   render() {
      const {
         completeNotes,
         handleChange, 
         handleClick,
         title,
         note,
         trashHandler,
         archiveHandler,
         addClass
      } = this.props;

      const { showTitle } = this.state;

      const notes = [];
      for (let i in completeNotes) {
         if (completeNotes[i][1].archived === false && completeNotes[i][1].trash === false) {
            notes.push(completeNotes[i])
         }
      }
      return (
         <main className="notes inner-wrapper">
            <form>
               <div className="note-container">
                  <label className="visuallyhidden" htmlFor="title">Title</label>
                  {showTitle && <input onChange={handleChange} value={title} name="title" type="text" id="title" placeholder="Title" className="title"/>}
   
                  <textarea onFocus={this.focusHandler} onChange={handleChange} onClick={handleClick} name="note" value={note} id="note" ref={c => this.textarea = c} placeholder="Add a new note..."></textarea>
               </div>

               <div className="submit-button">
                  <label className="visuallyhidden" htmlFor="submit">Add Note</label>
                  <input onClick={this.handleSubmit} type="submit" id="submit" value="+ Add Note"/>
               </div>
            </form>

            {notes.length > 0
               ?
               <NoteDisplay
                  completeNotes={completeNotes.filter((note) => note[1].archived === false && note[1].trash === false)}
                  trashHandler={trashHandler}
                  archiveHandler={archiveHandler}
                  addClass={addClass}
               />
               :
               <div className="empty-section main-page">
                  <FontAwesomeIcon icon={faStickyNote} className="icon-main" aria-hidden title="Notes" />
                  <span className="visuallyhidden">Notes</span>
                  <p>Your notes will appear here</p>
               </div> 
            }

         </main>
      )
   }
}

export default AddNotes;
