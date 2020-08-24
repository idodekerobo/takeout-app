import React, { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';

// Styles
import '../styles/CheckoutForm.css';
// Stripe
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = (props) => {
   const stripe = useStripe();
   const elements = useElements();
   const { state } = useContext(GlobalContext);

   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');
   const [phone, setPhone] = useState('');
   const [city, setCity] = useState('');
   const [customerState, setCustomerState] = useState('');
   const [zip, setZip] = useState('');

   const [ paymentMethod, setPaymentMethod ] = useState('');

   const handleInputChange = (e) => {
      const target = e.target.name;
      console.log(target);
      switch (target) {
         case 'firstName':
            setFirstName(e.target.value);
            break;
         case 'lastName': 
            setLastName(e.target.value);
            break;
         case 'email': 
            setEmail(e.target.value);
            break;
         case 'phone': 
            setPhone(e.target.value);
            break;
         case 'city': 
            setCity(e.target.value);
            break;
         case 'customerState': 
            setCustomerState(e.target.value);
            break;
         case 'zip': 
            setZip(e.target.value);
            break;
         default:
            break;
      }
   }

   const onPayOnlineClick = () => {
      setPaymentMethod('online');
   }
   const onPayAtPickupClick = () => {
      setPaymentMethod('pickup');
   }

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (paymentMethod === 'pickup') {
         console.log('pay at pickup logic');
         // TODO - build out logic to notify business about pay @ pickup order
         // TODO - navigate to success/thank you page if works
      } else if (paymentMethod === 'online') {
         if (!stripe || !elements) return;
         const response = await fetch('http://localhost:5000/api/checkout', {
            method: 'POST',
            headers: {
               'Content-type': 'application/json'
            },
            body: JSON.stringify({
               items: state.cart,
               // TODO - send the rest of the contact info to the server
               firstName, lastName, email, phone, city, customerState, zip,
            })
         });
         const paymentIntentResponse = await response.json();
         console.log('payment intent', paymentIntentResponse);
         console.log('client secret', paymentIntentResponse.clientSecret);

         const result = await stripe.confirmCardPayment(paymentIntentResponse.clientSecret, {
            payment_method: {
               card: elements.getElement(CardElement),
               billing_details: {
                  name: firstName+' '+lastName,
               },
            },
            receipt_email: email 
         });

         // TODO - add customer feedback on whether payment worked or it didn't work, navigate to success/thank you page if works
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
               console.log('payment intent succeeded as well!');
               // Show a success message to your customer
               // There's a risk of the customer closing the window before callback
               // execution. Set up a webhook or plugin to listen for the
               // payment_intent.succeeded event that handles any business critical
               // post-payment actions.
            }
         }
      }
   }

   const styleObject = {
      invalid: {
         color: '#9e2146',
         iconColor: '#fa755a', 
      },
   }

   // TODO - set the type of the input so correct keyboards come up on mobile
   return (
      <div className="form-wrapper">
         <form className="checkout-form" onSubmit={handleSubmit}>
            <fieldset>
               <input type="text" name="firstName" value={firstName} onChange={handleInputChange} placeholder="First Name" required/>
               <input type="text" name="lastName" value={lastName} onChange={handleInputChange} placeholder="Last Name" required/>
               <input type="email" name="email" value={email} onChange={handleInputChange} placeholder="Email" required />
               <input type="tel" name="phone" value={phone} onChange={handleInputChange} placeholder="Phone Number" required />
               <input type="text" name="city" value={city} onChange={handleInputChange} placeholder="City" required />
               <input type="text" name="customerState" value={customerState} onChange={handleInputChange} placeholder="State" required />
               <input type="text" name="zip" value={zip} onChange={handleInputChange} placeholder="Zip" required />
               <div className="card-element-wrapper" style={{ marginBottom: 15 }}>
                  <CardElement options={{ style: styleObject }} />
               </div>
               <button type="submit" onClick={onPayOnlineClick} disabled={!stripe}>Pay Online</button>
               <button type="submit" onClick={onPayAtPickupClick}>Pay at Pick Up</button>
            </fieldset>
         </form>
      </div>
   )
}

export default CheckoutForm;