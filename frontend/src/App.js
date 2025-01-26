import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css'; // Import the global CSS file
import Shop from './components/Shop';
import Checkout from './components/Checkout';
import Success from './components/Success';

// Main App component
const App = () => {
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