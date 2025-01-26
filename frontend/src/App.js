import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css'; // Import the global CSS file
import Shop from './components/Shop';
import Checkout from './components/Checkout';
import Success from './components/Success';

// Main App component
const App = () => {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <Link to="/" className="brand-link">Stripe Press</Link>
          <div className="nav-links">
            <Link to="/" className="home-link">Home</Link>
            <Link to="/link" className="link-button">Link</Link>
          </div>
        </header>
        <Switch>
          {/* Route for the success page */}
          <Route path="/success" component={Success} />
          {/* Route for the checkout page with dynamic ID */}
          <Route path="/checkout/:id" component={Checkout} />
          {/* Default route for the shop page */}
          <Route path="/" component={Shop} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;