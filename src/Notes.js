import React, { Component } from 'react';
import autosize from 'autosize';


class Notes extends Component {
   componentDidMount() {
      autosize(this.textarea);
   }
   render() {
      return (
         <main className="notes wrapper">
            <form action="">
               <div className="note-container">
                  <label className="visuallyhidden" htmlFor="title">Title</label>
                  <input onChange={this.props.handleChange} name="title" type="text" id="title" placeholder="Title" />
   
                  <textarea onChange={this.props.handleChange} name="note" id="note" ref={c => this.textarea = c} placeholder="Add a new note..."></textarea>
               </div>

               <div className="submit-button">
                  <label className="visuallyhidden" htmlFor="submit">Add Note</label>
                  <input onClick={this.props.addNoteOnSubmit} type="submit" id="submit" value="+ Add Note"/>
               </div>
            </form>
         </main>
      )
   }
}

export default Notes;