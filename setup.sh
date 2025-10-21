#!/bin/bash

echo "========================================"
echo "   MediNova Firebase Setup Script"
echo "========================================"
echo

echo "Checking for Node.js..."
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    echo "Then run this script again."
    exit 1
fi

echo "Node.js found!"
echo

echo "Checking for .env file..."
if [ ! -f .env ]; then
    echo "Creating .env file from template..."
    cp env-template.txt .env
    echo
    echo "IMPORTANT: Please edit the .env file with your Firebase configuration!"
    echo "You can get your Firebase config from: https://console.firebase.google.com/"
    echo
else
    echo ".env file already exists."
fi

echo "Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install dependencies!"
    exit 1
fi

echo
echo "========================================"
echo "   Setup Complete!"
echo "========================================"
echo
echo "Next steps:"
echo "1. Edit .env file with your Firebase configuration"
echo "2. Run: npm start"
echo
echo "Your Firebase config should look like:"
echo "REACT_APP_FIREBASE_API_KEY=your-api-key"
echo "REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com"
echo "REACT_APP_FIREBASE_PROJECT_ID=your-project-id"
echo "REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com"
echo "REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id"
echo "REACT_APP_FIREBASE_APP_ID=your-app-id"
echo
