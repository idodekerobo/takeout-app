import React, { useContext } from 'react';
import { ListGroup, ListGroupItem, Button } from 'shards-react';
import '../styles/Cart.css';
import "shards-ui/dist/css/shards.min.css"
import "bootstrap/dist/css/bootstrap.min.css";

import { GlobalContext } from '../context/GlobalState';

// Stripe
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51H0IWVL4UppL0br2bYSp1tlwvfoPwDEjfjPUx4ilY0zQr8LY0txFJjj9CHqPTP27ieDiTHhxQfNlaKSuPVcNkuq00071qG37ks');

// subtotal in constructor would be 0, wouldn't put that in render() cus its being run all the time. making program way less efficient
const TAX_RATE = 0.1;

const Cart = (props) => {
   const { state } = useContext(GlobalContext);
   const currentCart = state.cart.slice().map((item) => {
      return <ListGroupItem key={item._id}>{item.name}: ${(item.price).toFixed(2)} <Button onClick={props.handleRemoveFromCart.bind(this, item._id)} size="sm" theme="dark">Remove</Button>
      </ListGroupItem>
   });

   const handleCheckoutClick = async (e) => {
      const stripe = await stripePromise; // get stripe instance
      const response = await fetch('http://localhost:5000/api/checkout', {
         method: 'POST', 
         headers: {
            'Content-type': 'application/json'
         },
         body: JSON.stringify({
            items: state.cart,
            subtotal,
            tax,
            total,
         })
      }); 
      const session = await response.json();

      const result = await stripe.redirectToCheckout({sessionId: session.id,});

      console.log('session', session);
      if (result.error) {
         // If `redirectToCheckout` fails due to a browser or network
         // error, display the localized error message to your customer
         // using `result.error.message`.
      }

      // fetch('/public-keys')
      // .then( (response) => response.json())
      // .then( (data) => {
      //    // stripe = Stripe(data.key);
      //    console.log('success: ', data);
      // })
      // .catch( (error) => {
      //    console.log('error', error);
      // });
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
            {/* <ListGroupItem>Subtotal: ${props.subtotal} </ListGroupItem> */}
            <ListGroupItem>Subtotal: ${subtotal}</ListGroupItem>
            <ListGroupItem>Tax: ${tax}</ListGroupItem>
            <ListGroupItem>Total: ${total}</ListGroupItem>
         </ListGroup>

         <Button onClick={handleCheckoutClick}>Checkout</Button>
      </div>
   );
}
export default Cart;