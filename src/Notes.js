import React, { Component } from 'react';
import autosize from 'autosize';

class Notes extends Component {
   constructor(){
      super()
      this.state = {}
   }
   componentDidMount() {
      autosize(this.textarea);
   }
   render() {
      return (
         <main className="notes wrapper">
            <form action="submit">
               <textarea name="newNote" id="newNote" ref={c => this.textarea = c} placeholder="Add a new note..."></textarea>
               <div className="submit-button">
                  <label className="visuallyhidden" htmlFor="submit">Add Note</label>
                  <input type="submit" id="submit" value="Add Note"/>
               </div>
            </form>
         </main>
      )
   }
}

export default Notes;