import React, { Component } from 'react';
import HamburgerMenu from 'react-hamburger-menu';

class Nav extends Component {
   constructor(){
      super()
      this.state = {}
   }
   handleClick() {
      this.setState({
         menuOpen: !this.state.menuOpen
      });
   }
   handleLinkClick() {
      this.setState({ 
         menuOpen: false 
      });
   }
   render() {
      return (
            <nav className="navigation">
               <div className="wrapper navigation-flex">
                  <h1>Noted</h1>
                  <ul>
                     <li>+</li>
                     <li>Profile</li>
                     {<HamburgerMenu
                        isOpen={this.state.menuOpen}
                        menuClicked={this.handleClick.bind(this)}
                        width={18}
                        height={15}
                        strokeWidth={1}
                        rotate={0}
                        color='black'
                        borderRadius={0}
                        animationDuration={0.5}
                     />}
                  </ul>
               </div>
            </nav>
      )
   }
}

export default Nav;