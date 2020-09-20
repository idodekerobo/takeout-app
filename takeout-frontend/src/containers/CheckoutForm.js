import React, { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { useHistory } from 'react-router-dom';
import * as Actions from '../context/Actions';
import { Modal, ModalBody, ModalHeader } from 'shards-react';
import "shards-ui/dist/css/shards.min.css"
import "bootstrap/dist/css/bootstrap.min.css";

// Styles
import '../styles/CheckoutForm.css';
// Stripe
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = (props) => {
   const stripe = useStripe();
   const elements = useElements();
   const { state, dispatch } = useContext(GlobalContext);

   // controlled form component
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');
   const [phone, setPhone] = useState('');
   const [city, setCity] = useState('');
   const [customerState, setCustomerState] = useState('');
   const [zip, setZip] = useState('');
   const [nameOnCard, setNameOnCard] = useState('');
   const [matchingNames, setMatchingNames] = useState(true);

   // control payment logic flow
   const [ paymentMethod, setPaymentMethod ] = useState('');
   
   // Modal state
   const [modalVisible, setModalVisibility] = useState(false);
   const [orderFeedback, setFeedback] = useState('');
   const [modalBodyText, setModalBodyText] = useState('');
   // modal visibility function
   const toggleModal = () => {
      setModalVisibility(!modalVisible);
   }

   // react-router hook
   const history = useHistory();

   // controlled form components
   const handleInputChange = (e) => {
      const target = e.target.name;
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
         case 'matchingNames':
            setMatchingNames(!matchingNames);
            break;
         default:
            break;
      }
   }

   const handleNameOnCardInput = (e) => {
      if (matchingNames) {
         setNameOnCard(firstName + " " + lastName)
      } else {
         setNameOnCard(e.target.value);
      }
   }

   const nameOnCardInputStyle = {
      display: 'none',
   }

   // TODO - figure out a better way to redirect after order
   const redirectAfterTimeout = () => {
      setTimeout(() => {
         // clear cart before redirect
         dispatch({type: Actions.CLEAR_CART})
         history.push('/');
      },3000);
   }

   const onPayOnlineClick = (e) => {
      setPaymentMethod('online');
      // console.log(e.target.textContent);
   }
   const onPayAtPickupClick = (e) => {
      setPaymentMethod('pickup')
      // console.log(e.target.textContent);
   }

   // TODO - navigate to success/thank you page if works
   const handleSubmit = async (e) => {
      e.preventDefault();

      if (paymentMethod === 'pickup') {
         // TODO - put the production api url here when it pushes to production
         await fetch('http://localhost:5000/api/order', {
            method: 'POST',
            headers: {
               'Content-type': 'application/json'
            },
            body: JSON.stringify({
               items: state.cart,
               firstName, lastName, email, phone, city, customerState, zip,
               paid: false
            })
         });
         setFeedback('Thank you for your order.');
         setModalBodyText('See you soon!');
         toggleModal();
         redirectAfterTimeout();
      } else if (paymentMethod === 'online') {
         if (!stripe || !elements) return;
         // TODO - put the production api url here when it pushes to production
         const response = await fetch('http://localhost:5000/api/checkout', {
            method: 'POST',
            headers: {
               'Content-type': 'application/json'
            },
            body: JSON.stringify({
               items: state.cart,
               firstName, lastName, email, phone, city, customerState, zip,
            })
         });
         const paymentIntentResponse = await response.json();

         const result = await stripe.confirmCardPayment(paymentIntentResponse.clientSecret, {
            payment_method: {
               card: elements.getElement(CardElement),
               billing_details: {
                  name: nameOnCard,
               },
            },
            receipt_email: email 
         });

         // TODO - add customer feedback on whether payment worked or it didn't work, navigate to success/thank you page if works
         if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            setFeedback(result.error.message, ". Please try again.");
            setModalBodyText('Please refresh the page and try again, or call the restaurant.');
            toggleModal();
            redirectAfterTimeout();
         } else {
            if (result.paymentIntent.status === 'succeeded') {
               // TODO - put the production api url here when it pushes to production
               await fetch('http://localhost:5000/api/order', {
                  method: 'POST', 
                  headers: {
                     'Content-type': 'application/json'
                  },
                  body: JSON.stringify({
                     items: state.cart,
                     firstName, lastName, email, phone, city, customerState, zip,
                     paid: true
                  })
               });
               setFeedback('Thank you for your order. See you soon!');
               setModalBodyText('We will send a receipt to the email used in the order.');
               toggleModal();
               redirectAfterTimeout();
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
   // TODO - add name on card input and name for order, add logic so if the same as order name it will auto-populate
   // TODO - match the colors of the pay/order buttons to the rest of the site
   return (
      <div className="form-wrapper">
         <Modal open={modalVisible} toggle={toggleModal}>
            <ModalHeader>{orderFeedback}</ModalHeader>
            <ModalBody>{modalBodyText}</ModalBody>
         </Modal>
         <form className="checkout-form" onSubmit={handleSubmit}>
            <fieldset>
               <input type="text" name="firstName" value={firstName} onChange={handleInputChange} placeholder="First Name" required/>
               <input type="text" name="lastName" value={lastName} onChange={handleInputChange} placeholder="Last Name" required/>
               <input type="email" name="email" value={email} onChange={handleInputChange} placeholder="Email" required />
               <input type="tel" name="phone" value={phone} onChange={handleInputChange} placeholder="Phone Number" required />
               <input type="text" name="city" value={city} onChange={handleInputChange} placeholder="City" required />
               <input type="text" name="customerState" value={customerState} onChange={handleInputChange} placeholder="State" required />
               <input type="text" name="zip" value={zip} onChange={handleInputChange} placeholder="Zip" required />
               <button type="submit" action="payAtPickUp" onClick={onPayAtPickupClick}>Pay at Pick Up</button>
               <div className="card-element-wrapper" >
                  <label className="labelWrapper">
                     <input id="matchingNamesCheckbox" type="checkbox" name="matchingNames" value="matchingNames" checked={matchingNames} onChange={handleInputChange}/>
                     <p id="checkboxLabel">Name on card matches name on order</p>
                  </label>
                  <input style={(matchingNames) ? nameOnCardInputStyle : null} id="nameOnCard" type="text" name="nameOnCard" value={nameOnCard} onChange={handleNameOnCardInput} placeholder="Name on Card" required={(matchingNames) ? false : true}/>
                  <CardElement className="card-element" options={{ style: styleObject }} />
               </div>
               <button type="submit" action="payOnline" onClick={onPayOnlineClick} disabled={!stripe}>Pay Online</button>
            </fieldset>
         </form>
      </div>
   )
}

export default CheckoutForm;