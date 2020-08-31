import React from 'react';
import { Navbar, NavbarBrand, Nav } from 'shards-react';
import "shards-ui/dist/css/shards.min.css"
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/NavComponent.css';

const NavComponent = () => {
   let restaurantInfo = (
      <div className="restaurant-info">
         {/* <a>Restaurant Name</a>
         <p>Restaurant Address</p>
         <p>Restaurant Hours</p> */}
      </div>
   )

   return (
      <div className="component-wrapper">
         <Navbar className="shards-navbar" type="dark" theme="primary" expand="md">
            <NavbarBrand className="navbar-brand" href="#">{restaurantInfo}</NavbarBrand>
               <Nav navbar className="nav-links">
               </Nav>
         </Navbar>
      </div>
   );
}
export default NavComponent;