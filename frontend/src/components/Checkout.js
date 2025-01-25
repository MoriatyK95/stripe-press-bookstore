import React from 'react';
import { useParams } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
import './Checkout.css';

// Mock data for books
const books = {
  1: { title: "The Art of Doing Science and Engineering", price: 23 },
  2: { title: "The Making of Prince of Persia: Journals 1985-1993", price: 25 },
  3: { title: "Working in Public: The Making and Maintenance of Open Source", price: 28 },
};

// Checkout component
const Checkout = () => {
  // Get the book ID from the URL parameters
  const { id } = useParams();
  // Find the book based on the ID
  const book = books[id];

  // If the book is not found, display an error message
  if (!book) {
    return <h2>Book not found</h2>;
  }

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout — Stripe Press</h1>
      <p className="checkout-book-title">{book.title}</p>
      <h2 className="checkout-total">Total due: ${book.price.toFixed(2)}</h2>
      <CheckoutForm book={book} />
    </div>
  );
};

export default Checkout;