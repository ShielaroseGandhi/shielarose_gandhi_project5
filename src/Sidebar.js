import React from 'react';
import { NavLink } from "react-router-dom";

const Sidebar = (props) => {
      return (
         <div className="side-bar">
            <ul className="wrapper">
               <li>
                  <NavLink exact to="/" className="link" activeClassName="link-active" onClick={props.handleClick}>Notes</NavLink> 
               </li>
               <li>
                  <NavLink exact to="/archive" className="link" activeClassName="link-active" onClick={props.handleClick}>Archive</NavLink>
               </li>
               <li>
                  <NavLink exact to="/trash" className="link" activeClassName="link-active" onClick={props.handleClick}>Trash</NavLink>
               </li>
            </ul>
         </div>
      )
}

export default Sidebar;