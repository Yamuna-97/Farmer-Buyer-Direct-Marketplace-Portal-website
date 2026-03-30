# Quick Reference Guide

## Starting the Application

### Terminal 1: Backend Server
```bash
cd backend
npm install    # First time only
npm start
```
Expected: Server running on http://localhost:5000

### Terminal 2: Frontend App
```bash
cd frontend
npm install    # First time only
npm start
```
Expected: Browser opens http://localhost:3000

## Quick Test Flow

### 1. Farmer Testing
- URL: http://localhost:3000/login
- Email: rajesh@farm.com
- Password: farmer123
- Actions:
  - View Dashboard → See products
  - Click "Add Product" → Create new item
  - Edit/Delete products

### 2. Buyer Testing
- URL: http://localhost:3000/login
- Email: amit@buyer.com
- Password: buyer123
- Actions:
  - Browse Marketplace
  - Search/Filter products
  - View product details
  - Place order
  - Check My Orders

## API Testing with cURL

### Get All Products
```bash
curl http://localhost:5000/api/products
```

### Login User
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"rajesh@farm.com","password":"farmer123"}'
```

### Create Product (as Farmer)
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "user-id: <USER_ID>" \
  -H "user-role: farmer" \
  -d '{
    "name":"Cucumber",
    "price":30,
    "quantity":100,
    "category":"vegetables",
    "location":"Punjab"
  }'
```

### Place Order (as Buyer)
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "user-id: <USER_ID>" \
  -H "user-role: buyer" \
  -d '{
    "productId":"<PRODUCT_ID>",
    "quantity":5,
    "deliveryAddress":"123 Main St"
  }'
```

## Directory Structure Quick Map

```
.
├── backend/              # Node.js/Express server
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── controllers/      # Business logic
│   ├── middleware/       # Auth, validation, logging
│   ├── server.js        # Main entry point
│   └── package.json
│
├── frontend/            # React application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── context/     # State management
│   │   ├── hooks/       # Custom hooks & API
│   │   ├── App.js       # Root component
│   │   └── index.js     # React entry point
│   └── package.json
│
├── README.md            # Project overview
├── SETUP_INSTRUCTIONS.md # Installation guide
├── ARCHITECTURE.md      # Technical architecture
└── SAMPLE_DATA.js       # MongoDB seed data
```

## Common Tasks

### Reset Database
```bash
# Connect to MongoDB
mongosh

# Drop database
use farmer-buyer-marketplace
db.dropDatabase()

# Reload sample data
# (Copy contents of SAMPLE_DATA.js and paste in shell)
```

### Change API Port
Edit `backend/.env`:
```
PORT=8000
```
Then restart backend server

### Enable Development Logging
Add to `backend/server.js`:
```javascript
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log('Body:', req.body);
  console.log('Headers:', req.headers);
  next();
});
```

### Clear MongoDB Collection
```bash
mongosh
use farmer-buyer-marketplace
db.products.deleteMany({})   # Delete all products
db.orders.deleteMany({})     # Delete all orders
db.users.deleteMany({})      # Delete all users
```

## Developing New Features

### 1. Add New API Endpoint

**Step 1: Create Controller**
```javascript
// backend/controllers/newController.js
exports.newFunction = async (req, res) => {
  try {
    // Logic here
    res.json({ message: 'Success' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

**Step 2: Add Route**
```javascript
// backend/routes/newRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/newController');

router.post('/endpoint', controller.newFunction);

module.exports = router;
```

**Step 3: Register in server.js**
```javascript
const newRoutes = require('./routes/newRoutes');
app.use('/api/new', newRoutes);
```

### 2. Create New React Component

**Step 1: Component File**
```javascript
// frontend/src/components/NewComponent.js
import React, { useState } from 'react';
import './NewComponent.css';

const NewComponent = ({ prop1, prop2 }) => {
  const [state, setState] = useState();

  return (
    <div className="new-component">
      {/* JSX here */}
    </div>
  );
};

export default NewComponent;
```

**Step 2: Add Styles**
```css
/* frontend/src/components/NewComponent.css */
.new-component {
  /* Styles */
}
```

**Step 3: Use in App**
```javascript
// frontend/src/App.js
import NewComponent from './components/NewComponent';

// In routing or component tree
<NewComponent prop1="value" />
```

## Debugging Tips

### Frontend Issues
1. Open Chrome DevTools (F12)
2. Check Console tab for errors
3. Check Network tab for API calls
4. Use React Developer Tools extension
5. Check localStorage: `localStorage.getItem('user')`

### Backend Issues
1. Check terminal for console.log output
2. Check MongoDB connection: `db.adminCommand('ping')`
3. Test endpoints with cURL
4. Check headers are being sent correctly
5. Look for error logs in terminal

### Database Issues
```bash
# Connect to MongoDB
mongosh

# Check database exists
show dbs

# Check collections
use farmer-buyer-marketplace
show collections

# Check data
db.users.findOne()
db.products.findOne()
db.orders.findOne()

# Check indexes
db.products.getIndexes()
```

## Useful VS Code Extensions

- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- MongoDB for VS Code
- Thunder Client (API testing)
- GitLens
- REST Client
- JavaScript (ES6) code snippets

## Performance Checklist

- ✅ Use React.memo for expensive components
- ✅ Implement pagination for large lists
- ✅ Use lazy loading for images
- ✅ Optimize bundle size
- ✅ Use indexes in MongoDB on frequently queried fields
- ✅ Implement caching for API responses
- ✅ Use async/await for non-blocking operations
- ✅ Minimize re-renders with useCallback/useMemo

## Security Checklist

- ⚠️ Implement proper password hashing
- ⚠️ Use JWT for authentication (not headers)
- ⚠️ Add HTTPS in production
- ⚠️ Validate all inputs on backend
- ⚠️ Sanitize user inputs
- ⚠️ Use environment variables for secrets
- ⚠️ Implement CORS properly
- ⚠️ Add rate limiting

## Deployment Checklist

- Build frontend: `cd frontend && npm run build`
- Test production build: `serve -s build` (install serve globally)
- Push to GitHub
- Link to hosting platform (Vercel, Netlify, Heroku, Railway)
- Set environment variables properly
- Configure database connection
- Set up domain/SSL
- Monitor for errors

## Learning Resources

### React
- https://react.dev
- https://react-patterns.com
- Hooks docs: https://react.dev/reference/react

### Express.js
- https://expressjs.com
- https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs

### MongoDB
- https://docs.mongodb.com
- https://mongoosejs.com/docs

### REST API Design
- https://restfulapi.net
- https://jsonapi.org

## Support Commands

```bash
# Check Node version
node --version

# Check npm version
npm --version

# Check MongoDB status
mongosh --version

# Update npm packages
npm update

# Clean npm cache
npm cache clean --force

# See all running processes
ps aux | grep node

# Kill specific process
kill -9 <PID>

# See which process uses port 5000
lsof -i :5000

# See which process uses port 3000
lsof -i :3000
```

---

**Happy coding! For detailed setup, see SETUP_INSTRUCTIONS.md**
