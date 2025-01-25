import React from 'react';
import './CheckoutForm.css';

// CheckoutForm component
const CheckoutForm = ({ book }) => {
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