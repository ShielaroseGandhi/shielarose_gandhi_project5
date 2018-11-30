import React from 'react';

const Trash = (props) => {
   return (
      <section className="trash-page">
         {
            Object.entries(props.completeNotes).map(note => {
               return (
                  <div key={note[0]} className="saved-note">
                     <h2 className="saved-note-title">{note[1].title}</h2>
                     <p className="saved-note-date">{note[1].date}</p>
                     <p id="line-break" className="saved-note-note">{note[1].note}</p>
                     <FontAwesomeIcon icon={faTrashAlt} className="trash-icon" />
                  </div>
               )
            })
         }
      </section>
   )
}

export default Trash;
