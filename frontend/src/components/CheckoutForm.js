import React from 'react';
import { useParams } from 'react-router-dom';
import './CheckoutForm.css';

const books = {
  1: { title: "The Art of Doing Science and Engineering", price: 23 },
  2: { title: "The Making of Prince of Persia: Journals 1985-1993", price: 25 },
  3: { title: "Working in Public: The Making and Maintenance of Open Source", price: 28 },
};

const CheckoutForm = () => {

  // get BookID from the url parameters
  const { id } = useParams();
  // get the book details from the hardcoded data
  const book = books[id];

  // return a message if the book is not found
  if (!book) {
    return <h2>Book not found</h2>;
  }

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout — Stripe Press</h1>
      <p className="checkout-book-title">{book.title}</p>
      <h2 className="checkout-total">Total due: ${book.price.toFixed(2)}</h2>
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
    </div>
  );
};

export default CheckoutForm;