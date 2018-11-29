import React, { Component } from 'react';

class Sidebar extends Component {
   render() {
      return (
         <div className="side-bar">
            <ul className="wrapper">
               <li>Notes</li>
               <li>Calendar</li>
               <li>Trash</li>
            </ul>
         </div>
      )
   }
}

export default Sidebar;