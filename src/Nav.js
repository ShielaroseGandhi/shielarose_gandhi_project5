import React, { Component } from 'react';

class Nav extends Component {
   render() {
      return (
            <nav className="navigation">
               <h2>Noted</h2>
               <ul>
                  <li>+</li>
                  <li>Profile</li>
               </ul>
            </nav>
      )
   }
}

export default Nav;