import React, { Component } from 'react';
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
      return (
         <main className="notes wrapper">
            <form action="">
               <div className="note-container">
                  <label className="visuallyhidden" htmlFor="title">Title</label>
                  {this.state.showTitle && <input onChange={this.props.handleChange} value={this.props.title} name="title" type="text" id="title" placeholder="Title" className="title"/>}
   
                  <textarea onFocus={this.focusHandler} onChange={this.props.handleChange} onClick={this.props.handleClick} name="note" value={this.props.note} id="note" ref={c => this.textarea = c} placeholder="Add a new note..."></textarea>
               </div>

               <div className="submit-button">
                  <label className="visuallyhidden" htmlFor="submit">Add Note</label>
                  <input onClick={this.handleSubmit} type="submit" id="submit" value="+ Add Note"/>
               </div>
            </form>
         </main>
      )
   }
}

export default Notes;