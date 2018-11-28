import React, { Component } from 'react';

class Nav extends Component {
   render() {
      return (
            <nav className="navigation">
               <div className="wrapper navigation-flex">
                  <h1>Noted</h1>
                  <ul>
                     <li>+</li>
                     <li>Profile</li>
                  </ul>
               </div>
            </nav>
      )
   }
}

export default Nav;