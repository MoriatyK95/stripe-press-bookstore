import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './CheckoutForm.css';

// CheckoutForm component
const CheckoutForm = ({ book }) => {
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();

  // Get a reference to the Elements component from Stripe
  const elements = useElements();

  useEffect(() => {
    if (!clientSecret) {
      // Create PaymentIntent when the component mounts
      fetch('http://127.0.0.1:5000/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: book.price * 100, currency: 'usd' }), // amount in cents
      })
        // Parse the JSON response, and set the client secret
        .then(response => response.json())
        .then(data => setClientSecret(data.clientSecret))
        // Log any errors to the console
        .catch(error => console.error('Error creating payment intent:', error));
    }
  }, [clientSecret, book.price]); // Run only once when the component mounts


  // Handle the form submission, confirm the card payment
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Do not proceed if Stripe or Elements have not loaded 
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // Confirm the card payment
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          email: event.target.email.value,
        },
      },
    });

    if (error) {
      console.error('Payment failed:', error);
    } else if (paymentIntent.status === 'succeeded') {
      console.log('Payment succeeded:', paymentIntent);
    }
  };

  return (
    <div className="checkout-form">
      <form onSubmit={handleSubmit}>
        <label>Email address</label>
        <input
          name="email"
          type="email"
          placeholder="you@email.com"
        />
        <label>Card details</label>
        <CardElement className="stripe-element" />
        <button type="submit" disabled={!stripe || !clientSecret}>
          Pay ${book.price.toFixed(2)}
        </button>
      </form>
    </div>
  );
};

// use memo to memoize the CheckoutFormWrapper component, in order to prevent unnecessary re-renders 
const CheckoutFormWrapper = React.memo(({ book }) => {
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    // Fetch the publishable key from the server, /api/config endpoint, and set the Stripe promise
    fetch('http://127.0.0.1:5000/api/config')
      .then(response => response.json())
      .then(data => {
        if (data.publishableKey) {
          setStripePromise(loadStripe(data.publishableKey));
        } else {
          throw new Error('Publishable key not found');
        }
      })
      // Log any other errors to the console
      .catch(error => {
        console.error('Error fetching publishable key:', error);
      });
  }, []);

  // Render the CheckoutForm component with the Stripe promise
  return (
    stripePromise && (
      <Elements stripe={stripePromise}>
        <CheckoutForm book={book} />
      </Elements>
    )
  );
});

export default CheckoutFormWrapper;