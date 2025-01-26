#!/bin/bash

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Start the Flask backend
echo "Starting Flask backend..."
FLASK_APP=app.py flask run &

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd ../frontend
npm install

# Start the React frontend
echo "Starting React frontend..."
npm start &

# Wait for both processes to finish
wait