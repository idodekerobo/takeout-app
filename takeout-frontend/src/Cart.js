import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'shards-react';
import { Button } from 'shards-react';
import './Cart.css';
import "shards-ui/dist/css/shards.min.css"
import "bootstrap/dist/css/bootstrap.min.css";


const TAX_RATE = 0.07;

class Cart extends Component {
   constructor(props) {
      super(props);
   }

   render() {

      const currentCart = this.props.cartItems.slice().map( (item) => {
         return   <ListGroupItem key={item._id}>{item.name}: ${item.price} <Button onClick={this.props.handleRemoveFromCart.bind(this, item._id)} size="sm" theme="dark">Remove</Button>
                  </ListGroupItem>
      })
      var subtotal = 0;
      var currentSubtotal = '0';
      if (this.props.cartItems.length > 0) {
         subtotal = this.props.cartItems.reduce( (acc, currentVal) => {
            return acc + currentVal;
         })
         currentSubtotal = subtotal.toString();
      } else {
         subtotal = 0
         currentSubtotal = subtotal.toString();
      }

      return (
         <div className="cart-wrapper">
            <ListGroup>
               {currentCart}
            </ListGroup>

            <ListGroup>
               <ListGroupItem>Subtotal: ${currentSubtotal} </ListGroupItem>
               <ListGroupItem>Tax: ${0}</ListGroupItem>
               <ListGroupItem>Total: ${0}</ListGroupItem>
            </ListGroup>
         </div>
      );
   }
}

export default Cart;