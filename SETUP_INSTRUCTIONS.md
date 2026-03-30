# Complete Setup Instructions

## Prerequisites
Before starting, ensure you have the following installed:
- **Node.js** v14+ (with npm) - Download from https://nodejs.org/
- **MongoDB** - Either local installation or MongoDB Atlas account
- **Git** - For version control
- **Code Editor** - VS Code, WebStorm, or your preference

## Step-by-Step Installation

### 1. MongoDB Setup

#### Option A: Local MongoDB
```bash
# On macOS with Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# On Windows
# Download installer from https://www.mongodb.com/try/download/community
# Run installer and follow the wizard

# On Linux (Ubuntu)
sudo apt-get install -y mongodb
```

#### Option B: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/farmer-buyer-marketplace`

### 2. Backend Installation

```bash
# Navigate to project root
cd Farmer-Buyer-Direct-Marketplace-Portal-website

# Navigate to backend folder
cd backend

# Install all dependencies
npm install

# Create .env file
cat > .env << EOF
MONGODB_URI=mongodb://localhost:27017/farmer-buyer-marketplace
PORT=5000
NODE_ENV=development
EOF

# Start backend server
npm start
```

**Expected output:**
```
[2024-01-20T10:30:00.123Z] GET /api/health
MongoDB Connected: localhost
Server is running on port 5000
```

### 3. Frontend Installation

In a new terminal window:

```bash
# Navigate to project root
cd Farmer-Buyer-Direct-Marketplace-Portal-website

# Navigate to frontend folder
cd frontend

# Install all dependencies
npm install

# Start development server
npm start
```

This will automatically open your browser at `http://localhost:3000`

## Loading Sample Data

### Method 1: Using MongoDB Shell (mongosh)

```bash
# Connect to MongoDB
mongosh

# Select database
use farmer-buyer-marketplace

# Copy entire contents of SAMPLE_DATA.js file and paste in shell
```

### Method 2: Using mongosh with file input
```bash
mongosh < SAMPLE_DATA.js
```

## Test Credentials

After loading sample data, use these credentials to test:

**Farmer Account:**
```
Email: rajesh@farm.com
Password: farmer123
Role: Farmer
Location: Punjab, India
```

**Alternative Farmer:**
```
Email: priya@farm.com
Password: farmer123
Role: Farmer
Location: Haryana, India
```

**Buyer Account:**
```
Email: amit@buyer.com
Password: buyer123
Role: Buyer
Location: New Delhi, India
```

**Alternative Buyer:**
```
Email: neha@buyer.com
Password: buyer123
Role: Buyer
Location: Mumbai, India
```

## Application URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health
- **MongoDB (Local)**: mongodb://localhost:27017

## Testing the Application

### For Farmers:

1. Login at http://localhost:3000/login
   - Use: rajesh@farm.com / farmer123

2. Access Dashboard
   - View your products
   - Statistics and analytics

3. Add New Product
   - Click "Add Product"
   - Fill in product details:
     - Name: "Fresh Cucumber"
     - Category: "Vegetables"
     - Price: 30
     - Quantity: 100
     - Unit: kg
     - Location: "Punjab, India"

4. Manage Products
   - Edit product details
   - Delete products when out of stock
   - Track inventory

### For Buyers:

1. Login at http://localhost:3000/login
   - Use: amit@buyer.com / buyer123

2. Browse Marketplace
   - View all available products
   - Search for specific items
   - Filter by category

3. Product Details
   - Click on any product
   - View farmer information
   - Check availability

4. Place Order
   - Select quantity needed
   - Enter delivery address
   - Confirm order

5. View Orders
   - Track all placed orders
   - View order status
   - Cancel pending orders

## Troubleshooting

### MongoDB Connection Error
**Problem:** `Error connecting to MongoDB: connect ECONNREFUSED`

**Solution:**
```bash
# Make sure MongoDB is running
# On macOS:
brew services start mongodb-community

# On Windows:
# Check Services app for MongoDB

# Or use MongoDB Atlas connection string in .env
```

### Port Already in Use
**Problem:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Change port in backend/.env to 5001
PORT=5001

# Or kill process using port 5000:
# On macOS/Linux:
lsof -ti:5000 | xargs kill -9

# On Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Module Not Found Errors
**Problem:** `Cannot find module 'express'`

**Solution:**
```bash
# Ensure you're in the correct directory
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules
npm install
```

### CORS Errors
**Problem:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
- Ensure backend is running on port 5000
- Check frontend proxy setting in package.json points to `http://localhost:5000`
- Verify CORS middleware in backend/server.js

### React Port Already in Use
**Problem:** Port 3000 already in use

**Solution:**
```bash
# Specify a different port
PORT=3001 npm start
```

## Development Tips

### Adding a New Feature

**Example: Add product review system**

1. **Backend:**
   - Create Review model in `backend/models/Review.js`
   - Create reviewController in `backend/controllers/reviewController.js`
   - Add routes in `backend/routes/reviewRoutes.js`
   - Import routes in `backend/server.js`

2. **Frontend:**
   - Create ReviewForm component in `frontend/src/components/`
   - Add API call in `frontend/src/hooks/useApi.js`
   - Update ProductDetails page to show/add reviews

### Environment Variables

Create `.env` files for different environments:

**backend/.env.production:**
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/farmer-buyer
PORT=8000
NODE_ENV=production
```

**frontend/.env.production:**
```
REACT_APP_API_URL=https://api.example.com
```

### Debugging

**Backend debugging:**
```bash
# Use nodemon for auto-reload
npm install -g nodemon
nodemon server.js
```

**Frontend debugging:**
- Use React Developer Tools browser extension
- Check browser console for errors
- Use Network tab to inspect API calls

## Deployment Checklist

- [ ] Change authentication to JWT tokens
- [ ] Hash passwords with bcrypt
- [ ] Remove console.logs
- [ ] Add proper error handling
- [ ] Set up HTTPS
- [ ] Configure production MongoDB
- [ ] Add environment validation
- [ ] Set up logging service
- [ ] Add monitoring/alerting
- [ ] Create admin dashboard
- [ ] Add API rate limiting
- [ ] Set up CI/CD pipeline

## Useful Commands

```bash
# Backend
npm start           # Start server
npm run dev        # Start with nodemon

# Frontend
npm start          # Start dev server
npm run build      # Create production build
npm test           # Run tests

# MongoDB
mongosh            # Open MongoDB shell
show dbs           # List all databases
db.products.find() # Query products
```

## File Descriptions

### Backend Files

| File | Purpose |
|------|---------|
| `server.js` | Express app setup and middleware configuration |
| `db.js` | MongoDB connection logic |
| `models/User.js` | User model and schema |
| `models/Product.js` | Product model and schema |
| `models/Order.js` | Order model and schema |
| `controllers/userController.js` | User business logic (register, login, fetch) |
| `controllers/productController.js` | Product CRUD operations |
| `controllers/orderController.js` | Order creation and management |
| `middleware/auth.js` | Authentication and authorization |
| `middleware/logging.js` | Request logging |
| `middleware/validation.js` | Input validation |
| `routes/userRoutes.js` | User endpoints |
| `routes/productRoutes.js` | Product endpoints |
| `routes/orderRoutes.js` | Order endpoints |

### Frontend Files

| File | Purpose |
|------|---------|
| `App.js` | Main app component and routing |
| `context/UserContext.js` | Global user state management |
| `hooks/useApi.js` | API call functions |
| `hooks/useAsync.js` | Async state management hook |
| `components/Header.js` | Navigation header |
| `components/Login.js` | Login form |
| `components/Register.js` | Registration form |
| `components/Marketplace.js` | Product listing page |
| `components/ProductCard.js` | Individual product card component |
| `components/FarmerDashboard.js` | Farmer product management |
| `components/AddProduct.js` | Add new product form |
| `pages/ProductDetails.js` | Product details and order placement |
| `pages/MyOrders.js` | Buyer's order history |

## Architecture Overview

```
┌─────────────────────────────────────────────────┐
│          Frontend (React)                        │
│  ┌─────────────────────────────────────┐        │
│  │ Components & Pages                  │        │
│  │ - Header, Login, Register           │        │
│  │ - Marketplace, Dashboard            │        │
│  │ - ProductDetails, MyOrders          │        │
│  └─────────────────────────────────────┘        │
│  ┌─────────────────────────────────────┐        │
│  │ State Management (Context API)      │        │
│  │ - UserContext                       │        │
│  └─────────────────────────────────────┘        │
│  ┌─────────────────────────────────────┐        │
│  │ Hooks (API & Custom)                │        │
│  │ - useApi, useAsync                  │        │
│  └─────────────────────────────────────┘        │
└─────────────────────────────────────────────────┘
                      │
                  HTTP/CORS
                      │
┌─────────────────────────────────────────────────┐
│         Backend (Express.js)                    │
│  ┌─────────────────────────────────────┐        │
│  │ Routes                              │        │
│  │ - /api/users, /api/products         │        │
│  │ - /api/orders                       │        │
│  └─────────────────────────────────────┘        │
│  ┌─────────────────────────────────────┐        │
│  │ Controllers (Business Logic)        │        │
│  │ - User, Product, Order operations   │        │
│  └─────────────────────────────────────┘        │
│  ┌─────────────────────────────────────┐        │
│  │ Middleware                          │        │
│  │ - Auth, Logging, Validation         │        │
│  └─────────────────────────────────────┘        │
│  ┌─────────────────────────────────────┐        │
│  │ Models (Mongoose Schemas)           │        │
│  │ - User, Product, Order              │        │
│  └─────────────────────────────────────┘        │
└─────────────────────────────────────────────────┘
                      │
                   Mongoose
                      │
┌─────────────────────────────────────────────────┐
│         Database (MongoDB)                      │
│  - Users Collection                             │
│  - Products Collection                          │
│  - Orders Collection                            │
└─────────────────────────────────────────────────┘
```

## Support & Resources

- **MongoDB Docs**: https://docs.mongodb.com/
- **Express.js**: https://expressjs.com/
- **React.js**: https://react.dev/
- **Node.js**: https://nodejs.org/docs/
- **Mongoose**: https://mongoosejs.com/
- **React Router**: https://reactrouter.com/

---

For additional help or issues, check the main README.md or refer to component comments in the code.
