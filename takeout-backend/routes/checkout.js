const express = require('express');
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_TEST_KEY)

// Require database in router
const db = require('../models/index');
const bodyParser = require('body-parser');
const { response } = require('express');

// do i want to start w/ api???
// EVERY URL STARTS WITH /API/

const TAX_RATE = 0.1;

function errorHandling(err) {
      console.log();
      console.log('There was an error!');
      console.log(err);
      console.log();
      // return res.send(err);
      return res.send(500, { error: err });
}

const calculateOrderAmount = (items) => {
   const subtotal = items.slice().reduce((acc, obj) => (acc += obj.price), 0).toFixed(2);
   const tax = (subtotal * TAX_RATE).toFixed(2);
   const total = (parseFloat(subtotal) + parseFloat(tax)).toFixed(2);

   return (subtotal*100);
}

/*
==============================
        CHECKOUT ROUTES
==============================
*/
router.post('/checkout', async (req, res) => {
   // TODO - save the data of the user and their order in the database
   console.log(req.body);
   const data = req.body;
   const amount = calculateOrderAmount(data.items);

   await stripe.paymentIntents.create(
      {
         payment_method_types: ['card'],
         amount: amount,
         currency: 'usd',
         // application_fee_amount: 0 // if there's no application fee than just have it 0
      }, 
      {
         stripeAccount: process.env.TEST_CONNET_ACCOUNT_ID,
      })
      .then( (paymentIntent) => {
      try {
         return res.send({
            publishableKey: process.env.STRIPE_TEST_PUBLISHABLE_KEY,
            clientSecret: paymentIntent.client_secret,
         });
      } catch (err) {
         // TODO - handle errors here, would be a server/network error
         errorHandling(err);
         return res.status(500).send({
            error: err.message
         });
      }
   });
});

const webhook_secret = 'whsec_QFL5uYxudbk8eQNgvD6vgBvGnzGA7tkF'; // this should be in settings????
const handleSuccessfulPaymentIntent = (connectedAccountId, paymentIntent) => {
   // fulfill the purchase logic
   console.log('payment intent successfully triggered the webhook!! - idode');
   console.log('Connected account id', connectedAccountId);
   console.log(JSON.stringify(paymentIntent));
}

router.get('/onlineorders', (req, res) => {
   res.send('this shit on?');
})

// TODO - fix this, currently not working w/ Stripe CLI
router.post('/onlineorders', bodyParser.raw({type: 'application/json'}), (req, res) => {
   const sig = req.headers['stripe-signature']; // this optional but can sign the request to ensure it came from stripe

   let event;

   // verify webhook signature and extract event
   try {
      // event = stripe.webhooks.constructEvent(req.body, webhook_secret);
      event = JSON.parse(req.body);
   } catch (err) {
      return res.status(400).send(`Webhook error: ${err.message}`);
   }

   // if (event.type === 'payment_intent.succeeded') {
   //    const paymentIntent = event.data.object;
   //    const connectedAccountId = event.account;
   //    handleSuccessfulPaymentIntent(connectedAccountId, paymentIntent);
   // }

   switch (event.type) {
      case 'payment_intent.succeeded':
         const paymentIntent = event.data.object;
         console.log('payment intent was successful... now do stuff');
         break;
      case 'payment_method.attached': 
         const paymentMethod = event.data.object;
         console.log('payment method was attached to a customer');
         // handle other event types
         break;
      default:
         return response.status(400).end();
   }

   // returns a 200 response to acknowledge receipt of the event
   res.json({received: true});
});

module.exports = router;