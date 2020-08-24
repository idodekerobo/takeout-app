import React, { useContext, useState } from 'react';
import { ListGroup, ListGroupItem, Button } from 'shards-react';
import '../styles/Cart.css';
import "shards-ui/dist/css/shards.min.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import TAX_RATE from '../api/constants';

const Cart = (props) => {
   const { state } = useContext(GlobalContext);
   const currentCart = state.cart.slice().map((item) => {
      return <ListGroupItem key={item._id}>{item.name}: ${(item.price).toFixed(2)} <Button onClick={props.handleRemoveFromCart.bind(this, item._id)} size="sm" theme="dark">Remove</Button>
      </ListGroupItem>
   });

   const handleOrderClick = (e) => {
      if (state.cart.length > 0) return "/checkout"
      // don't go to checkout and pass feedback saying that you need to order an item
   }
   const onOrderClick = () => {
   }

   const subtotal = state.cart.slice().reduce((acc, obj) => (acc += obj.price), 0).toFixed(2);
   const tax = (subtotal * TAX_RATE).toFixed(2);
   const total = (parseFloat(subtotal) + parseFloat(tax)).toFixed(2);

   return (
      <div className="cart-wrapper">
         <ListGroup>
            {currentCart}
         </ListGroup>

         <ListGroup>
            <ListGroupItem>Subtotal: ${subtotal}</ListGroupItem>
            <ListGroupItem>Tax: ${tax}</ListGroupItem>
            <ListGroupItem>Total: ${total}</ListGroupItem>
         </ListGroup>

         <Link to={handleOrderClick} className="router-link">
            <Button block onClick={onOrderClick}>Order</Button>
         </Link>

      </div>
   );
}
export default Cart;