import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const NoteDisplay = (props) => {
   return (
      <section className="note-display inner-wrapper">
         {
            Object.entries(props.completeNotes).map(note => {
               return (
                  <div key={note[0]} className="saved-note">
                     <h2 className="saved-note-title">{note[1].title}</h2>
                     <p className="saved-note-date">{note[1].date}</p>
                     <p id="line-break" className="saved-note-note">{note[1].note}</p>
                     <FontAwesomeIcon icon={faTrashAlt} id={note[0]} className="trash-icon" onClick={props.deleteNote}/>
                  </div>               
               )
            })
         }
      </section>
   )
}

export default NoteDisplay;
