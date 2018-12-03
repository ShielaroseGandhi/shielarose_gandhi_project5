import React, { Component } from 'react';
import HamburgerMenu from 'react-hamburger-menu';
import Sidebar from './Sidebar';

class Nav extends Component {
   constructor() {
      super();
      this.state = {
         open: false,
      }
   }

   handleClick = () => {
      const { toggleMenu } = this.props;
      toggleMenu()
      this.setState({ open: !this.state.open });
   }

   render() {
      const { open } = this.state;
      return (
            <nav className="navigation">
               <div className="wrapper navigation-flex">
                  <h1>Noted</h1>                  
                  <ul>
                     <HamburgerMenu
                        isOpen={open}
                        menuClicked={this.handleClick}
                        width={18}
                        height={15}
                        strokeWidth={1}
                        rotate={0}
                        color='black'
                        borderRadius={0}
                        animationDuration={0.5}
                     />
                  </ul>
               </div>

               <Sidebar 
                  handleClick={this.handleClick}
                  currentState={ (open === true) ? "visible" : "not-visible" }
               />

            </nav>
      )
   }
}

export default Nav;