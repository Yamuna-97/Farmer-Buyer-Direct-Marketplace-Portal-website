#!/bin/bash

# Quick Start Script for Farmer-Buyer Marketplace with Images
# This script automates the setup process

echo ""
echo "========================================"
echo "Farmer-Buyer Marketplace - Quick Setup"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed"
    echo "Download from: https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js is installed"
echo ""

# Check if MongoDB is running
echo "Checking MongoDB connection..."
if ! command -v mongosh &> /dev/null; then
    echo "WARNING: MongoDB mongosh is not installed"
    echo "Please ensure MongoDB is running before continuing"
    echo ""
    read -p "Press Enter to continue..."
fi

echo ""
echo "Step 1: Installing Backend Dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install backend dependencies"
    exit 1
fi
echo "✓ Backend dependencies installed"

echo ""
echo "Step 2: Seeding Database with Sample Data and Images..."
node seedDb.js
if [ $? -ne 0 ]; then
    echo "ERROR: Database seeding failed"
    echo "Make sure MongoDB is running"
    exit 1
fi
echo "✓ Database seeded successfully"

echo ""
echo "Step 3: Installing Frontend Dependencies..."
cd ../frontend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install frontend dependencies"
    exit 1
fi
echo "✓ Frontend dependencies installed"

echo ""
echo "========================================"
echo "Setup Complete!"
echo "========================================"
echo ""
echo "To run the application:"
echo ""
echo "Terminal 1 - Start Backend:"
echo "  cd backend"
echo "  npm start"
echo ""
echo "Terminal 2 - Start Frontend:"
echo "  cd frontend"
echo "  npm start"
echo ""
echo "Then open: http://localhost:3000"
echo ""
echo "All 8 products with images should be displayed!"
echo ""
