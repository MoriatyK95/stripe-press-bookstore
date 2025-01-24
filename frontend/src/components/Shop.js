import React from 'react';
import { Link } from 'react-router-dom';
import './Shop.css';

// hardcoded data for the books
const books = {
  1: { title: "The Art of Doing Science and Engineering", price: 23, image: "/images/art-science-eng.jpg", author: "Richard Hamming", description: "The Art of Doing Science and Engineering is a reminder that a childlike capacity for learning and creativity are accessible to everyone." },
  2: { title: "The Making of Prince of Persia: Journals 1985-1993", price: 25, image: "/images/prince-of-persia.jpg", author: "Jordan Mechner", description: "In The Making of Prince of Persia, on the 30th anniversary of the game’s release, Mechner looks back at the journals he kept from 1985 to 1993." },
  3: { title: "Working in Public: The Making and Maintenance of Open Source", price: 28, image: "/images/working-in-public.jpg", author: "Nadia Eghbal", description: "Nadia Eghbal takes an inside look at modern open source and offers a model through which to understand the challenges faced by online creators." },
};

// Shop component
const Shop = () => {
  return (
    <div className="shop-container">
      <h1 className="shop-title">Stripe Press Shop</h1>
      <p className="shop-subtitle">Select an item to purchase</p>
      <div className="card-grid">
        {Object.entries(books).map(([id, book]) => (
          <div key={id} className="card">
            <img src={book.image} className="card-image" alt={book.title} />
            <div className="card-body">
              <h5 className="card-title">{book.title}</h5>
              <strong className="card-author">{book.author}</strong>
              <p className="card-description">{book.description}</p>
              <Link to={`/checkout/${id}`} className="card-button">Purchase — ${book.price}</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;