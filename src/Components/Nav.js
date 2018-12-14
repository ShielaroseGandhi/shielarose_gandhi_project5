import React, { Component } from 'react';
import HamburgerMenu from 'react-hamburger-menu';
import Sidebar from './Sidebar';

class Nav extends Component {
   constructor() {
      super();
      this.state = {
         open: false,
         themeOpen: false,
      }
   }

   handleClick = () => {
      const { toggleMenu } = this.props;
      toggleMenu()
      this.setState({ open: !this.state.open });
   }

   handleThemeOptionsClick = (e) => {
      e.preventDefault();
      this.setState({ themeOpen: !this.state.themeOpen });
   }

   render() {
      const { open, themeOpen } = this.state;
      const { addClass } = this.props;
      return (
            <nav className={`${addClass} navigation`} >
               <div className="wrapper navigation-flex">
                  <h1>Noted</h1>                  
                  <ul className="navigation-options">
                     <div onClick={this.handleThemeOptionsClick}
                        className={`${addClass} theme`}>
                        <ul 
                        className={`${(themeOpen === true) ? "show-themes" : "hide-themes"}  
                        theme-options`}>
                           <li onClick={this.props.handleThemeClick("red")}>
                              <button 
                              className="theme-color red">
                              </button>
                           </li>
                           <li onClick={this.props.handleThemeClick("blue")}>
                              <button 
                              className="theme-color blue">
                              </button>
                           </li>
                           <li onClick={this.props.handleThemeClick("yellow")}>
                              <button 
                              className="theme-color yellow">
                              </button>
                           </li>
                           <li onClick={this.props.handleThemeClick("green")}>
                              <button 
                              className="theme-color green">
                              </button>
                           </li>
                           <li onClick={this.props.handleThemeClick("purple")}>
                              <button 
                              className="theme-color purple">
                              </button>
                           </li>
                           <li onClick={this.props.handleThemeClick("pink")}>
                              <button 
                              className="theme-color pink">
                              </button>
                           </li>
                           <li onClick={this.props.handleThemeClick("white")}>
                              <button 
                              className="theme-color white">
                              </button>
                           </li>
                           <li onClick={this.props.handleThemeClick("black")}>
                              <button href="#" 
                              className="theme-color black">
                              </button>
                           </li>
                        </ul>
                     </div>
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