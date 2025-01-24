import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css'; // Import the global CSS file
import Shop from './components/Shop';
import Checkout from './components/CheckoutForm';
import Success from './components/Success';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/success" component={Success} />
        <Route path="/checkout/:id" component={Checkout} />
        <Route path="/" component={Shop} />
      </Switch>
    </Router>
  );
};

export default App;