
"""
Author: Huakai Zeng
Description: This Flask app serves as the backend for the Stripe Press Bookstore application.
"""


from flask import Flask, request, jsonify

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

if __name__ == "__main__":
    app.run(debug=True)