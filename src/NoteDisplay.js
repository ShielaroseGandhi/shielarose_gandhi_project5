import React from 'react';

const NoteDisplay = (props) => {
   return (
      <section className="note-display">
         {
            Object.entries(props.completeNotes).map(note => {
               return (
                  <div key={note[0]}>
                     <h2>{note[1].title}</h2>
                     <p>{note[1].date}</p>
                     <p id="line-break">{note[1].note}</p>
                  </div>
               )
            })
         }
      </section>
   )
}

export default NoteDisplay;
