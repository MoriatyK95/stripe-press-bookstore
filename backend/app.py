
"""
Author: Huakai Zeng
Description: This Flask app serves as the backend for the Stripe Press Bookstore application.
"""

import os
from flask import Flask, request, jsonify
import stripe
from dotenv import load_dotenv, find_dotenv



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


# Create stripe Payment Intent and return client secret
@app.route('/create-payment-intent', methods=['POST'])
def create_payment_intent():
    try:
        data = request.get_json()
        amount = data['amount']
        currency = data['currency']

        payment_intent = stripe.PaymentIntent.create(
            amount=amount,
            currency=currency,
        )

        return jsonify({'clientSecret': payment_intent.client_secret})
    except Exception as e:
        return jsonify(error=str(e)), 403




if __name__ == "__main__":
    app.run(debug=True)