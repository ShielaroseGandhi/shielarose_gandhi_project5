import React, { Component } from 'react';
import NoteDisplay from './NoteDisplay';
import autosize from 'autosize';

class Notes extends Component {
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
         archiveHandler
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
            <form action="">
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
               />
               :
               <p>no notes</p>
            }

         </main>
      )
   }
}

export default Notes;

    //   if (snapshot.val() !== null) {
    //     const notes = Object.entries(snapshot.val());
    //     // console.log(notes);
    //     notes.forEach(item => {
    //       // console.log(item);
    //       //check if the item is archived AND whether it doesn't already exist in the array
    //       if (item[1].archived === true && this.state.archivedNotes.indexOf(item) === -1) {
    //         const archivedDuplicate = Array.from(this.state.archivedNotes);  
    //         archivedDuplicate.push(item);

    //         const completeDuplicate = Array.from(this.state.completeNotes);    
    //         const index = completeDuplicate.indexOf(item); 
    //         completeDuplicate.splice(index);

    //         const trashDuplicate = Array.from(this.state.trashNotes);
    //         const indexTwo = trashDuplicate.indexOf(item);
    //         trashDuplicate.splice(indexTwo);

    //         this.setState({
    //           archivedNotes: archivedDuplicate,
    //           completeNotes: completeDuplicate,
    //           trashNotes: trashDuplicate
    //         })
    //       } else if (item[1].trash === true && this.state.trashNotes.indexOf(item) === -1) {
    //         const trashDuplicate = Array.from(this.state.trashNotes);
    //         trashDuplicate.push(item);

    //         const completeDuplicate = Array.from(this.state.completeNotes);
    //         const index = completeDuplicate.indexOf(item);
    //         completeDuplicate.splice(index);

    //         const archivedDuplicate = Array.from(this.state.archivedNotes);
    //         const indexTwo = archivedDuplicate.indexOf(item);
    //         archivedDuplicate.splice(indexTwo);

    //         this.setState({
    //           trashNotes: trashDuplicate,
    //           completeNotes: completeDuplicate,
    //           archivedNotes: archivedDuplicate
    //         })
    //       } else if (this.state.completeNotes.indexOf(item) === -1) {
    //         const completeDuplicate = Array.from(this.state.completeNotes);
    //         completeDuplicate.push(item);

    //         const archivedDuplicate = Array.from(this.state.archivedNotes);
    //         const index = archivedDuplicate.indexOf(item); 
    //         archivedDuplicate.splice(index);

    //         const trashDuplicate = Array.from(this.state.trashNotes);
    //         const indexTwo = trashDuplicate.indexOf(item);
    //         trashDuplicate.splice(indexTwo);
    //         this.setState({
    //           completeNotes: completeDuplicate,
    //           archivedNotes: archivedDuplicate,
    //           trashNotes: trashDuplicate
    //         })
    //       }
    //     })
    //   console.log(this.state.archivedNotes, this.state.trashNotes, this.state.completeNotes);
    // }