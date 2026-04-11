@echo off
REM Quick Start Script for Farmer-Buyer Marketplace with Images
REM This script automates the setup process

echo.
echo ========================================
echo Farmer-Buyer Marketplace - Quick Setup
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js is installed
echo.

REM Check if MongoDB is running
echo Checking MongoDB connection...
mongosh --eval "db.version()" >nul 2>&1
if errorlevel 1 (
    echo WARNING: MongoDB might not be running or mongosh is not installed
    echo Please ensure MongoDB is running before continuing
    echo.
    pause
)

echo.
echo Step 1: Installing Backend Dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install backend dependencies
    pause
    exit /b 1
)
echo ✓ Backend dependencies installed

echo.
echo Step 2: Seeding Database with Sample Data and Images...
call node seedDb.js
if errorlevel 1 (
    echo ERROR: Database seeding failed
    echo Make sure MongoDB is running
    pause
    exit /b 1
)
echo ✓ Database seeded successfully

echo.
echo Step 3: Installing Frontend Dependencies...
cd ..\frontend
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)
echo ✓ Frontend dependencies installed

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo To run the application:
echo.
echo Terminal 1 - Start Backend:
echo   cd backend
echo   npm start
echo.
echo Terminal 2 - Start Frontend:
echo   cd frontend
echo   npm start
echo.
echo Then open: http://localhost:3000
echo.
echo All 8 products with images should be displayed!
echo.
pause
