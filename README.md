# stripe-press-bookstore

## How to Build, Configure, and Run

### Prerequisites
- Node.js (version 14 or higher)
- npm (version 6 or higher)
- Python (version 3.6 or higher)
- Flask
- Stripe account and Stripe keys

### Build
1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/stripe-press-bookstore.git
    cd stripe-press-bookstore
    ```
2. Install dependencies:
    ```sh
    npm install
    cd backend
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    cd ../frontend
    npm install
    cd ..
    ```

### Configure
1. Create a `.env` file in the `backend` directory and add your Stripe API keys:
    ```env
    STRIPE_PUBLISHABLE_KEY=your_publishable_key
    STRIPE_SECRET_KEY=your_secret_key
    ```

### Run
1. Use the provided script to start both the server and client concurrently:
    ```sh
    ./start.sh
    ```
2. Open your browser and navigate to `http://localhost:3000` to see the application running.

## How Does the Solution Work?

### Stripe APIs Used
- **Stripe Payment Intents API**: This API is used to create and manage payment intents. It ensures that the payment process is secure and handles the complexities of different payment methods.
- **Stripe.js and React Stripe.js**: These libraries are used to securely collect payment details and handle the payment process on the client side.

### Application Architecture
- **Client**: The client is built using React and is located in the `frontend` directory. It includes components for the shop, checkout, and success pages. The frontend communicates with the backend to create payment intents and retrieve the publishable key.
- **Server**: The server is built using Flask and is located in the `backend` directory. In this simple application, it includes routes for creating payment intents and retrieving Stripe's publishable key.
- **Communication**: The frontend and backend communicate via HTTP requests. The frontend sends requests to the backend to create payment intents and retrieve the publishable key. The backend processes these requests and interacts with the Stripe API to perform the necessary actions. Since this is a simple application without a database, there are no routes to retrieve book data. In a production application, an OLTP database would be used to store book data.

### Flow of the Application
1. The user visits the shop page and selects items to purchase.
2. The user proceeds to the checkout page, where they enter their payment details and select the payment method
3. The frontend sends a request to the backend to create a payment intent.
4. The backend creates the payment intent using the Stripe Payment Intents API and returns the client secret to the frontend.
5. The frontend uses the client secret to complete the payment process using Stripe.js and React Stripe.js.
6. Upon successful payment, the success component renderes and shows the user a message confirming payment is successful as well as displaying the total amount and payment intent id.
