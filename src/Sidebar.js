import React, { Component } from 'react';

// const hamburgerMenu = ['Notes', 'Calendar', 'Trash']
// const menuItems = hamburgerMenu.map((val, i) => {
//    return (
//       <MenuItem
//          key={index}
//          delay={`${index * 0.1}s`}
//          onClick={() => { this.handleLinkClick(); }}>{val}</MenuItem>)
// });

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