import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

// Strict mode is causing the issue of rendering Checkout component twice and causing duplicated paymentIntent

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// Temporarily disable React Strict Mode to check if it causes the issue
ReactDOM.render(
  <App />,
  document.getElementById('root')
);


