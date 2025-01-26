import React from 'react';

const Success = ({ paymentDetails }) => {
  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase.</p>
      {paymentDetails && (
        <div>
          <p>Total Amount: ${paymentDetails.amount.toFixed(2)}</p>
          <p>Payment Intent ID: {paymentDetails.paymentIntentId}</p>
        </div>
      )}
    </div>
  );
};

export default Success;