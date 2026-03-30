# Farmer-Buyer Direct Marketplace Portal

A comprehensive full-stack web application connecting farmers and buyers directly in an online marketplace. Built with React.js, Node.js/Express, and MongoDB.

## 🎯 Project Overview

This marketplace portal enables:
- **Farmers** to list and manage agricultural products
- **Buyers** to browse, search, and purchase directly from farmers
- **Real-time product management** with inventory tracking
- **Order management** with status tracking

## 📋 Features

### User Management
- User registration and login (Farmer/Buyer roles)
- Role-based access control
- User profile management
- Location-based product discovery

### Product Management
- Add new products with details (name, price, quantity, category, location)
- Update and delete products (farmers only)
- View product details
- Browse products by category
- Search functionality

### Marketplace
- Browse all available products
- Filter by category (vegetables, fruits, grains)
- Search products by name or description
- View product details and farmer information

### Order Management
- Place orders with quantity and delivery address specifications
- Order status tracking (pending, confirmed, shipped, delivered, cancelled)
- Cancel orders before shipping
- View order history
- Automatic inventory management

## 🏗️ Tech Stack

### Frontend
- **React.js** 18.2.0 (Functional Components)
- **React Router** 6.11.0 (Navigation)
- **Axios** (HTTP requests)
- **CSS3** (Styling)
- **React Context API** (State Management)
- **Modern React Hooks** (useState, useEffect, useContext, useReducer)

### Backend
- **Node.js** with **Express.js** 4.18.2
- **MongoDB** with **Mongoose** 7.0.0
- **CORS** for cross-origin requests
- **Dotenv** for environment configuration

### Database
- **MongoDB** (NoSQL)
- Cloud: MongoDB Atlas or Local MongoDB

## 📁 Project Structure

```
Farmer-Buyer-Direct-Marketplace-Portal-website/
│
├── backend/
│   ├── models/
│   │   ├── User.js          # User schema
│   │   ├── Product.js       # Product schema
│   │   └── Order.js         # Order schema
│   │
│   ├── routes/
│   │   ├── userRoutes.js    # User endpoints
│   │   ├── productRoutes.js # Product endpoints
│   │   └── orderRoutes.js   # Order endpoints
│   │
│   ├── controllers/
│   │   ├── userController.js    # User business logic
│   │   ├── productController.js # Product business logic
│   │   └── orderController.js   # Order business logic
│   │
│   ├── middleware/
│   │   ├── auth.js          # Authentication & authorization
│   │   ├── logging.js       # Request logging
│   │   └── validation.js    # Input validation
│   │
│   ├── db.js                # MongoDB connection
│   ├── server.js            # Express app entry point
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js & Header.css
│   │   │   ├── Login.js & Auth.css
│   │   │   ├── Register.js
│   │   │   ├── Marketplace.js & Marketplace.css
│   │   │   ├── ProductCard.js & ProductCard.css
│   │   │   ├── FarmerDashboard.js & FarmerDashboard.css
│   │   │   └── AddProduct.js & AddProduct.css
│   │   │
│   │   ├── pages/
│   │   │   ├── ProductDetails.js & ProductDetails.css
│   │   │   └── MyOrders.js & MyOrders.css
│   │   │
│   │   ├── context/
│   │   │   └── UserContext.js   # User state management
│   │   │
│   │   ├── hooks/
│   │   │   ├── useApi.js        # API calls
│   │   │   └── useAsync.js      # Async state management
│   │   │
│   │   ├── App.js              # Main app component
│   │   ├── App.css
│   │   ├── index.js            # React entry point
│   │   └── index.css
│   │
│   └── package.json
│
├── SAMPLE_DATA.js           # MongoDB sample data
├── SETUP_INSTRUCTIONS.md    # Detailed setup guide
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (Local or MongoDB Atlas)
- npm or yarn package manager
- Git

### Installation & Setup

#### 1. Clone the Repository
```bash
cd Farmer-Buyer-Direct-Marketplace-Portal-website
```

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure MongoDB connection in .env
# MONGODB_URI=mongodb://localhost:27017/farmer-buyer-marketplace
# PORT=5000

# Start MongoDB (if running locally)
# mongod

# Start the backend server
npm start
# Server runs on http://localhost:5000
```

#### 3. Frontend Setup

```bash
# In a new terminal, navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
# Application runs on http://localhost:3000
```

### Adding Sample Data

```bash
# Connect to MongoDB
mongosh

# Select database
use farmer-buyer-marketplace

# Copy and paste contents of SAMPLE_DATA.js in MongoDB shell
# Or import via mongoimport command
```

**Test Credentials:**

Farmer:
- Email: rajesh@farm.com
- Password: farmer123

Buyer:
- Email: amit@buyer.com
- Password: buyer123

## 📚 API Endpoints

### Users
```
POST   /api/users/register      # Register new user
POST   /api/users/login         # Login user
GET    /api/users               # Get all users
GET    /api/users/:id           # Get user by ID
```

### Products
```
GET    /api/products            # Get all products (with filters)
GET    /api/products/:id        # Get product details
POST   /api/products            # Create product (Farmer)
PUT    /api/products/:id        # Update product (Farmer)
DELETE /api/products/:id        # Delete product (Farmer)
GET    /api/products/farmer/:farmerId  # Get farmer's products
```

### Orders
```
GET    /api/orders              # Get all orders
GET    /api/orders/:id          # Get order details
POST   /api/orders              # Create order (Buyer)
PUT    /api/orders/:id/status   # Update order status
GET    /api/orders/buyer/:buyerId  # Get buyer's orders
DELETE /api/orders/:id          # Cancel order (Buyer)
```

## 🔐 Security & Authentication

Current implementation uses header-based authentication:
- User ID and Role are passed in request headers
- Production deployment should use JWT tokens
- Passwords stored in plain text (demo only - hash in production)

Headers required for authenticated endpoints:
```
user-id: <user_id>
user-role: <farmer|buyer>
```

## 🎨 UI/UX Features

- **Responsive Design** - Mobile, tablet, and desktop compatible
- **Gradient Backgrounds** - Modern color schemes
- **Interactive Components** - Smooth animations and transitions
- **Form Validation** - Real-time input validation
- **Error Handling** - User-friendly error messages
- **Loading States** - Feedback during data fetching

## 🔄 State Management

### React Context API
- **UserContext** - Global user state and authentication
- Session persistence using localStorage

### React Hooks
- **useState** - Local component state
- **useEffect** - Side effects and data fetching
- **useContext** - Consumer context
- **useNavigate** - Programmatic routing
- **useParams** - URL parameters

## 📊 Database Schema

### Users
```javascript
{
  name: String,
  email: String (unique),
  password: String,
  role: String (farmer|buyer),
  location: String,
  phone: String,
  createdAt: Date
}
```

### Products
```javascript
{
  name: String,
  description: String,
  price: Number,
  quantity: Number,
  unit: String,
  category: String (vegetables|fruits|grains),
  location: String,
  farmerId: ObjectId,
  image: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Orders
```javascript
{
  buyerId: ObjectId,
  productId: ObjectId,
  quantity: Number,
  totalPrice: Number,
  status: String (pending|confirmed|shipped|delivered|cancelled),
  deliveryAddress: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🧪 Testing the Application

### Farmer Workflow
1. Register as a farmer
2. Login to dashboard
3. Add new products
4. View and manage inventory
5. Update/delete products

### Buyer Workflow
1. Register as a buyer
2. Browse marketplace
3. Filter by category or search
4. View product details
5. Place orders
6. Track order status

## 🚀 Deployment

### Backend (Heroku/Railway/Render)
1. Push code to GitHub
2. Connect to hosting platform
3. Set environment variables (MONGODB_URI, PORT)
4. Deploy

### Frontend (Vercel/Netlify)
1. Build production optimized version: `npm run build`
2. Deploy dist folder
3. Configure API proxy to backend URL

## 📝 Future Enhancements

- JWT-based authentication
- Password hashing (bcrypt)
- Email verification
- Payment gateway integration
- Reviews and ratings
- Farmer statistics dashboard
- Advanced search filters
- Chat messaging between users
- Admin panel for moderation
- Email notifications
- Image upload functionality
- Wishlist feature
- Cart functionality

## 🤝 Contributing

This is a demonstration project. For improvements:
1. Create feature branches
2. Follow code style conventions
3. Add documentation
4. Test thoroughly

## 📄 License

This project is open source and available under the MIT License.

## 📞 Support

For issues or questions, please refer to the code comments or consult the component documentation.

---

**Happy Farming & Shopping! 🌾🛒**