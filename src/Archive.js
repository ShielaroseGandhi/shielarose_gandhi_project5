import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderMinus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const Archive = (props) => {
   return (
      <section className="note-display inner-wrapper">
         {
            props.archive.map(note => {
               return (
                  <div key={note[0]} className="saved-note">
                     <div className="icon-format">
                        <h2 className="saved-note-title">{note[1].title}</h2>
                        <div className="icons">
                           <FontAwesomeIcon aria-hidden title="Unarchive" icon={faFolderMinus} id={note[0]} className="archive-icon icon" onClick={() => props.moveToNotesHandler(note[0])} />
                           <span className="visuallyhidden">Unarchive</span>

                           <FontAwesomeIcon aria-hidden title="Trash" icon={faTrashAlt} id={note[0]} className="trash-icon icon" onClick={() => props.trashHandler(note[0])} />
                           <span className="visuallyhidden">Trash</span>
                        </div>
                     </div>
                     <p className="saved-note-date">{note[1].date}</p>
                     <p id="line-break" className="saved-note-note">{note[1].note}</p>
                  </div>
               )
            })
         }
      </section>
   )
}

export default Archive;
