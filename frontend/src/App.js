import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css'; // Import the global CSS file
import Shop from './components/Shop';
import Checkout from './components/Checkout';
import Success from './components/Success';

// Main App component
const App = () => {


  return (
    <Router>
      <Switch>
        {/* Route for the success page */}
        <Route path="/success" component={Success} />
        {/* Route for the checkout page with dynamic ID */}
        <Route path="/checkout/:id" component={Checkout} />
        {/* Default route for the shop page */}
        <Route path="/" component={Shop} />
      </Switch>
    </Router>
  );
};

export default App;