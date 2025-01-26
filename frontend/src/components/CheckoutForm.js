import React, { useState, useEffect } from 'react';
import './CheckoutForm.css';

// CheckoutForm component
const CheckoutForm = ({ book }) => {


  const [publishableKey, setPublishableKey] = useState('');

  useEffect(() => {
    // Fetch the publishable key from the backend
    fetch('http://127.0.0.1:5000/api/config')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.publishableKey) {
          setPublishableKey(data.publishableKey);
          console.log('Fetched publishable key:', data.publishableKey);
        } else {
          throw new Error('Publishable key not found');
        }
      })
      .catch(error => {
        console.error('Error fetching publishable key:', error);
      });
  }, []);

  return (
    <div className="checkout-form">
      <form>
        <label>Email address</label>
        <input
          type="email"
          placeholder="you@email.com"
        />
        <label>Card details</label>
        <div className="stripe-element">
          Add Stripe Element here!
        </div>
        <button>
          Pay ${book.price.toFixed(2)}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;