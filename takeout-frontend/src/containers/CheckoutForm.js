import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

// Styles
import '../styles/CheckoutForm.css';
// Stripe
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Shards
// import { Form, FormInput, FormGroup } from 'shards-react';
// import "shards-ui/dist/css/shards.min.css"
// import "bootstrap/dist/css/bootstrap.min.css";

const CheckoutForm = (props) => {
   const stripe = useStripe();
   const elements = useElements();
   const { state } = useContext(GlobalContext);

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!stripe || !elements) return;

      const response = await fetch('http://localhost:5000/api/checkout', {
         method: 'POST', 
         headers: {
            'Content-type': 'application/json'
         },
         body: JSON.stringify({
            items: state.cart,
         })
      }); 
      const paymentIntentResponse = await response.json();
      console.log('payment intent', paymentIntentResponse);
      console.log('client secret', paymentIntentResponse.clientSecret);
      // const result = await stripe.redirectToCheckout({sessionId: session.id,}); // not sure what this does
      // console.log('session', session);

      const result = await stripe.confirmCardPayment(paymentIntentResponse.clientSecret, {
         payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
               // TODO - possible to make the input below controlled input forms and use hooks to connect to submission
               name: "Idode",
            },
         },
         receipt_email: "" // TODO - add the customer's email here so they get the receipt
      });

      if (result.error) {
         // Show error to your customer (e.g., insufficient funds)
         console.log();
         console.log(result.error.message);
         console.log();
       } else {
         // The payment has been processed!
         console.log();
         console.log('payment has been processed!!!');
         console.log();
         if (result.paymentIntent.status === 'succeeded') {
           // Show a success message to your customer
           // There's a risk of the customer closing the window before callback
           // execution. Set up a webhook or plugin to listen for the
           // payment_intent.succeeded event that handles any business critical
           // post-payment actions.
         }
       }
      
   }

   const styleObject = {
      base: {
      },
      invalid: {
         color: '#9e2146',
         iconColor: '#fa755a', 
      },
   }

   return (
      <div className="form-wrapper">
         <form className="checkout-form" onSubmit={handleSubmit}>
            <fieldset>
               <input type="text" name="firstName" placeholder="First Name" required/>
               <input type="text" name="lastName" placeholder="Last Name" required/>
               <input type="email" name="email" placeholder="Email" required />
               <input type="tel" name="phone" placeholder="Phone Number" required />
               <input type="text" name="city" placeholder="City" required />
               <input type="text" name="state" placeholder="State" required />
               <input type="text" name="zip" placeholder="Zip" required />
               <div className="card-element-wrapper" style={{ marginBottom: 15 }}>
                  <CardElement options={{ style: styleObject }} />
               </div>
               <button type="submit" disabled={!stripe}>Pay</button>
            </fieldset>
         </form>
      </div>
   )
}

export default CheckoutForm;