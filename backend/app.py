"""
Author: Huakai Zeng
Description: This Flask app serves as the backend for the Stripe Press Bookstore application.
"""

import os
from flask import Flask, request, jsonify
import stripe
from dotenv import load_dotenv, find_dotenv
from flask_cors import cross_origin


load_dotenv(find_dotenv())
# Set the Stripe secret key
stripe.api_key = os.getenv('STRIPE_SECRET_KEY')

app = Flask(__name__)


@app.route("/")
def home():
    return "home"

# Checkout route
@app.route('/checkout', methods=['GET'])
def checkout():
    return "Checkout"

# Success route
@app.route('/success', methods=['GET'])
def success():
  return "Success"

# Retrieve the publishable key to send to the client, allow cross-origin requests fro the client
@app.route('/api/config', methods=['GET'])
@cross_origin(origins=['http://localhost:3000'])
def get_publishable_key():
    try:
        publishable_key = os.getenv('STRIPE_PUBLISHABLE_KEY')
        if not publishable_key:
            raise ValueError("Publishable key not found")
        return jsonify({'publishableKey': publishable_key})
    except Exception as e:
        return jsonify(error=str(e)), 403

# Create stripe Payment Intent and return client secret, allow cross-origin requests from the client
@app.route('/api/create-payment-intent', methods=['POST'])
@cross_origin(origins=['http://localhost:3000'])
def create_payment_intent():
    try:
        data = request.get_json()
        amount = data['amount']
        currency = data['currency']

        payment_intent = stripe.PaymentIntent.create(
            amount=amount,
            currency=currency,
            automatic_payment_methods={
                'enabled': True,
            },
        )
        print(f"PaymentIntent created: {payment_intent}")  # Add logging to check the response
        return jsonify({'clientSecret': payment_intent.client_secret})
    
    except Exception as e:
        print(f"Error creating PaymentIntent: {e}")  # Add logging for errors
        return jsonify(error=str(e)), 403

if __name__ == "__main__":
    app.run(debug=True)