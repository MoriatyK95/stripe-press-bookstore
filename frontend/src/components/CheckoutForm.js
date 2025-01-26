import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './CheckoutForm.css';
import Success from './Success';

// CheckoutForm component
const CheckoutForm = ({ book, clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Do not proceed if Stripe.js has not loaded yet
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: 'http://localhost:3000/success',
        payment_method_data: {
          billing_details: {
            email: event.target.email.value,
          },
        },
      },
    });

    // FROM STRIPE DOCUMENTATION:  https://docs.stripe.com/payments/quickstart?client=react
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error) {
      console.error('Payment error:', error);  // Add logging for errors
      if (error.type === 'card_error' || error.type === 'validation_error') {
        setMessage(error.message);
      } else {
        setMessage('An unexpected error occurred.');
      }
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      console.log('Payment succeeded:', paymentIntent);
      setPaymentSucceeded(true);
      setPaymentDetails({
        amount: book.price,
        paymentIntentId: paymentIntent.id,
      });
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: 'accordion',
  };

  return (
    <div className="checkout-form">
      {paymentSucceeded ? (
        <Success paymentDetails={paymentDetails} />
      ) : (
        <form id="payment-form" onSubmit={handleSubmit}>
          <label>Email address</label>
          <input
            name="email"
            type="email"
            placeholder="you@email.com"
          />
          <PaymentElement id="payment-element" options={paymentElementOptions} />
          <button disabled={isLoading || !stripe || !elements} id="submit">
            <span id="button-text">
              {isLoading ? <div className="spinner" id="spinner"></div> : 'Pay now'}
            </span>
          </button>
          {/* Show any error or success messages */}
          {message && <div id="payment-message">{message}</div>}
        </form>
      )}
    </div>
  );
};

// use memo to memoize the CheckoutFormWrapper component, in order to prevent unnecessary re-renders 
const CheckoutFormWrapper = React.memo(({ book }) => {
  const [stripePromise, setStripePromise] = useState(null);

  // Initializes the clientSecret state with the value from local storage if it exists. If not, it initializes it to an empty string.
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Clear the clientSecret from local storage to ensure a new payment intent is created
    localStorage.removeItem('clientSecret');

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
      .catch(error => {
        console.error('Error fetching publishable key:', error);
      });
  }, []);

  useEffect(() => {
    if (!clientSecret) {
      // Create PaymentIntent when the component mounts
      fetch('http://127.0.0.1:5000/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: book.price * 100, currency: 'sgd' }), // amount in cents
      })
        .then(response => response.json())
        .then(data => {
          setClientSecret(data.clientSecret);
          localStorage.setItem('clientSecret', data.clientSecret);
        })
        .catch(error => console.error('Error creating payment intent:', error));
    }
  }, [book.id, clientSecret]);

  // Set the appearance of the PaymentElement
  const appearance = {
    theme: 'stripe',
  };

  // Set the options for the PaymentElement
  const options = {
    clientSecret,
    appearance,
  };

  // Render the CheckoutForm component with the Stripe promise
  return (
    stripePromise && clientSecret && (
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm book={book} clientSecret={clientSecret} />
      </Elements>
    )
  );
});

export default CheckoutFormWrapper;