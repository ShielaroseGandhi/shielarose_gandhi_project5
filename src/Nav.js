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
      return (
            <nav className="navigation">
               <div className="wrapper navigation-flex">
                  <h1>Noted</h1>
                  <ul>
                     <HamburgerMenu
                        isOpen={this.state.open}
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

               {menuIsOpen &&
                  <Sidebar />
               }
               
            </nav>
      )
   }
}

export default Nav;