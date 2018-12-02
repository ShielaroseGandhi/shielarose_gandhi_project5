import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faArchive } from '@fortawesome/free-solid-svg-icons'

const NoteDisplay = (props) => {
   return (
      <section className="note-display inner-wrapper">
         {
            props.completeNotes.map(note => {
               return (
                  <div key={note[0]} className="saved-note">
                     <h2 className="saved-note-title">{note[1].title}</h2>
                     <p className="saved-note-date">{note[1].date}</p>
                     <p id="line-break" className="saved-note-note">{note[1].note}</p>
                     <FontAwesomeIcon icon={faArchive} id={note[0]} className="archive-icon" 
                     onClick={() => props.archiveHandler(note[0])} />
                     <FontAwesomeIcon icon={faTrashAlt} id={note[0]} className="trash-icon" onClick={() => props.trashHandler(note[0])}/>
                  </div>               
               )
            })
         }
      </section>
   )
}

export default NoteDisplay;
