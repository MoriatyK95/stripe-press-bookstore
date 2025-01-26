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
    git clone https://github.com/moriatyk95/stripe-press-bookstore.git
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

- **Communication**: The frontend and backend communicate via HTTP requests. The frontend sends requests to the backend to create payment intents and retrieve the publishable key. The Flask application, with CORS enabled for the api/config and api/create-payment-intent routes, processes these requests and interacts with the Stripe API to perform the necessary actions. Since this is a simple application without a database, there are no routes to retrieve book data. In a production application, an OLTP database would be used to store and manage book and other application data.

### Flow of the Application
1. The user visits the shop page and selects items to purchase.
    ![Shop Page](flow-screenshots/shop.png)
2. The user proceeds to the checkout page, where they enter their payment details and select the payment method.
    ![Checkout Page](flow-screenshots/checkout.png)
3. The frontend sends a request to the backend to create a payment intent.
4. The backend creates the payment intent using the Stripe Payment Intents API and returns the client secret to the frontend.
5. The frontend uses the client secret to complete the payment process using Stripe.js and React Stripe.js.
6. Upon successful payment, the success component renders and shows the user a message confirming payment is successful as well as displaying the total amount and payment intent id.
    ![Success Page](flow-screenshots/success.png)
    ![Verify transaction on Stripe](flow-screenshots/verifiedonStripeTransactions.png)

## How I Approached This Problem

### Approach
1. **Understanding Requirements**: I began by thoroughly understanding the project requirements. After cloning the boilerplate and running the application to get a sense of its functionality, I noted that this is a relatively simple application. In a real-world scenario, there might be additional requirements. For instance, instead of a straightforward e-commerce platform selling books directly to customers, we might have a marketplace where users can be both merchants and customers. In such cases, it would be crucial to understand the specific requirements of the platform, such as the geographical locations of the users, preferred payment methods, and compliance with regulations like Strong Customer Authentication (SCA).

2. **Setting Up the Environment**: I decided to separate the client and server components of this application to better mimic real-world projects. Separating the frontend and backend offers several advantages, such as improved scalability, easier maintenance, and the ability to deploy them independently. This separation allows for a more modular architecture, where each part of the application can be developed, tested, and scaled individually. (I did not set up CI pipeline since this is a small application, but in real world application, set up a CI pipeline with test cases) Additionally, it aligns with best practices in modern web development, where microservices and decoupled architectures are becoming increasingly common.

3. **Implementing the Backend**: I implemented the backend using Flask, creating routes to handle payment intents and retrieve the publishable key. 

4. **Implementing the Frontend**: I implemented the frontend using React, creating components for the shop, checkout, and success components. I integrated Stripe.js and React Stripe.js to handle payment processing and using Stripe elements.

5. **Testing**: All test card numbers for payment failure tested (Card Declined, Insufficient Funds, incorrect CVC, Expired Card, Processing failure, fraudulent)

### Documentation Used
- **Stripe Documentation**: 
  - [Stripe Payment Intents API](https://stripe.com/docs/api/payment_intents)
  - [Stripe.js and React Stripe.js](https://stripe.com/docs/stripe-js/react)
  - [Payment method integration options](https://docs.stripe.com/payments/payment-methods/integration-options)
  - [Element appearance](https://docs.stripe.com/elements/appearance-api)
- **Stripe Developers Youtube Channel**:
  - [Accept a payment - Create a PaymentIntent with Python](https://www.youtube.com/watch?v=3s4Dwox7oTQ)
  - [React Stripe.js and the Payment Element](https://www.youtube.com/watch?v=e-whXipfRvg)


### Challenges Encountered
1. **Managing State in React**: Managing state in React, particularly within the `CheckoutForm` and `CheckoutFormWrapper` component, presented several challenges. The complexity arose from the need to track multiple states. This required careful planning and the use of React's state management tools to ensure that the component remained responsive and the user experience was smooth.

2. **Handling Multiple Payment Methods**: Initially, I implemented the payment process using only the `CardElement` to quickly get the application up and running. However, to better reflect real-world scenarios, especially in regions like Southeast Asia and Greater China where payment methods such as PayNow, GrabPay, and Alipay are prevalent, I decided to support multiple payment methods. This necessitated refactoring the `CheckoutForm` component to use the `PaymentElement`, which supports a variety of payment methods.

