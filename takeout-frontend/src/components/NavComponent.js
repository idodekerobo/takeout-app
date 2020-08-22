import React, { Component } from 'react';

import { Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Collapse } from 'shards-react';
import "shards-ui/dist/css/shards.min.css"
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/NavComponent.css';

class NavComponent extends Component {
   constructor(props) {
      super(props);
      this.state = {
         collapseOpen: false
      }

      this.toggleNavbar = this.toggleNavbar.bind(this);
   }

   toggleNavbar() {
      // complete method
      this.setState({
         ...this.state,
         ...{
            collapseOpen: !this.state.collapseOpen
         }
      });
   }

   render() {
      let restaurantInfo;
      if (this.props.restaurant != null) {
         restaurantInfo = <div className="restauarant-info">
            <a>Restaurant Name</a>
            <p>1111 S Mill, Tempe, AZ 85282</p>
            <p>M-F 9a-9p, Sa-Su 10a-8p</p>
         </div>
      } else {
         restaurantInfo = <div className="restaurant-info">
            RESTAURANT IS NULL
         </div>
      }

      return (
         <div className="component-wrapper">

            <Navbar className="shards-navbar" type="dark" theme="primary" expand="md">
               <NavbarBrand href="#">{restaurantInfo}</NavbarBrand>
               <NavbarToggler onClick={this.toggleNavbar}/>
               <Collapse open={this.state.collapseOpen} navbar className="collapse-nav-component">
                  <Nav navbar className="nav-links">
                  
                     <NavItem>
                        <NavLink active href="#">
                           Menu
                        </NavLink>
                     </NavItem>

                     <NavItem>
                        <NavLink active href="#">
                           Orders
                        </NavLink>
                     </NavItem>

                     <NavItem>
                        <NavLink active href="#">
                           Profile
                        </NavLink>
                     </NavItem>

                  </Nav>
               </Collapse>
            </Navbar>

         </div>
      );
   }
   
}

export default NavComponent;