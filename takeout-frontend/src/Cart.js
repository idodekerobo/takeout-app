import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'shards-react';
import { Button } from 'shards-react';
import './Cart.css';
import "shards-ui/dist/css/shards.min.css"
import "bootstrap/dist/css/bootstrap.min.css";

// subtotal in constructor would be 0, wouldn't put that in render() cus its being run all the time. making program way less efficient
const TAX_RATE = 0.07;

class Cart extends Component {
   constructor(props) {
      super(props);
      this.state = {
         
      }
      let subtotal = 0;
      this.calcSubtotal = this.calcSubtotal.bind(this);
   }

   calcSubtotal() {
      if (this.props.cartItems.length == 0) return;
      var newSubtotal = 0;
      const itemArr = this.props.cartItems; 
      // itemArr.slice().reduce( (acc, item) => acc.price += item.price);
      console.log('this is the new subtotal ', newSubtotal);
   }

   render() {

      this.calcSubtotal();
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