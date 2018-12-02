import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

class Sidebar extends Component {
   render() {
      return (
         <div className="side-bar">
            <ul className="wrapper">
               <li>
                  <NavLink exact to="/" className="link" activeClassName="link-active">Notes</NavLink> 
               </li>
               <li>
                  <NavLink exact to="/archive" className="link" activeClassName="link-active">Archive</NavLink>
               </li>
               <li>
                  <NavLink exact to="/trash" className="link" activeClassName="link-active">Trash</NavLink>
               </li>
            </ul>
         </div>
      )
   }
}

export default Sidebar;