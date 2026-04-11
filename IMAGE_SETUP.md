# Image Setup Guide - Farmer-Buyer Marketplace

## Overview
This guide explains how to set up images for all 8 products in the Farmer-Buyer Marketplace with MongoDB integration.

## What's Included
- **8 Product Images** in `/picture` folder
- **Updated Sample Data** with image references
- **Backend Static File Serving** to serve images
- **Database Seeding Script** to populate MongoDB with sample data

## Images Setup

### Images Available
| Product | Image File | Format |
|---------|-----------|--------|
| Fresh Tomatoes | `tomato.webp` | WebP |
| Carrots | `carrot.webp` | WebP |
| Mangoes | `mango.jpg` | JPG |
| Bananas | `banana.jpeg` | JPEG |
| Wheat Grain | `wheatgrain.jpg` | JPG |
| Rice | `rice.jpeg` | JPEG |
| Spinach | `Spinach.webp` | WebP |
| Potatoes | `potato.jpg` | JPG |

All images are located in: `/picture` folder

## Setup Instructions

### Step 1: Ensure MongoDB is Running

#### Option A: Local MongoDB
```bash
# On Windows
# Make sure MongoDB service is running via Services or:
mongod

# On macOS
brew services start mongodb-community

# On Linux
sudo systemctl start mongodb
```

#### Option B: MongoDB Atlas (Cloud)
Update `.env` file in the `backend` folder:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/farmer-buyer-marketplace
PORT=5000
```

### Step 2: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 3: Seed the Database with Sample Data and Images
```bash
# From the backend folder
node seedDb.js
```

You should see output like:
```
✅ MongoDB connection successful
🗑️  Cleared existing data
✅ Users created: 4
✅ Products created: 8
✅ Orders created: 3

🎉 Database seeding completed successfully!
```

### Step 4: Start the Backend Server
```bash
npm start
# or
node server.js
```

The backend will start on `http://localhost:5000`

### Step 5: Start the Frontend
```bash
cd ../frontend
npm install
npm start
```

The frontend will start on `http://localhost:3000`

## Verification

### Verify Images Are Served
Open your browser and check:
- `http://localhost:5000/images/tomato.webp` - Should display the tomato image
- `http://localhost:5000/images/carrot.webp` - Should display the carrot image
- etc.

### Verify API Returns Images
```bash
curl http://localhost:5000/api/products
```

Each product should have an `image` field with the URL:
```json
{
  "_id": "...",
  "name": "Fresh Tomatoes",
  "image": "http://localhost:5000/images/tomato.webp",
  ...
}
```

### Verify Frontend Displays Images
1. Navigate to `http://localhost:3000/marketplace`
2. You should see all 8 products with their images displayed in product cards

## Project Structure After Setup
```
Farmer-Buyer-Direct-Marketplace-Portal-website/
├── picture/                    # Image files
│   ├── tomato.webp
│   ├── carrot.webp
│   ├── mango.jpg
│   ├── banana.jpeg
│   ├── wheatgrain.jpg
│   ├── rice.jpeg
│   ├── Spinach.webp
│   └── potato.jpg
├── backend/
│   ├── server.js               # Updated to serve static images
│   ├── seedDb.js               # New seeding script
│   ├── models/
│   │   ├── Product.js          # Has 'image' field
│   │   ├── User.js
│   │   └── Order.js
│   └── ...
└── frontend/
    └── ...
```

## Sample Data in MongoDB

### Users (4 farmers/buyers)
- Rajesh Kumar (farmer) - rajesh@farm.com
- Priya Singh (farmer) - priya@farm.com
- Amit Patel (buyer) - amit@buyer.com
- Neha Verma (buyer) - neha@buyer.com

### Products (8 with images)
All products have:
- Name
- Description
- Price
- Quantity
- Category (vegetables, fruits, grains)
- **Image URL** pointing to `/images/[filename]`
- Associated farmer

### Orders (3 sample)
Orders linking buyers to products with prices and delivery details

## Configuration

### Backend File Serving (server.js)
```javascript
const path = require('path');

// Serve static images from picture folder
app.use('/images', express.static(path.join(__dirname, '../picture')));
```

### Image URLs in Database
Images are stored as absolute URLs:
```
http://localhost:5000/images/tomato.webp
```

For production, update these URLs in `seedDb.js`:
```javascript
image: "https://yourdomain.com/images/tomato.webp",
```

## Troubleshooting

### Images Not Loading
1. ✅ Verify backend is running on port 5000
2. ✅ Check if image files exist in `/picture` folder
3. ✅ Check MongoDB has the correct image URLs

### Database Issues
```bash
# Clear and reseed database
node seedDb.js

# This will:
# - Clear all existing users, products, and orders
# - Create new sample data
# - Associate images with products
```

### Port Already in Use
```bash
# Change PORT in .env file
PORT=5001

# Or kill the process using the port
# On Windows
netstat -ano | findstr :5000
taskkill /PID [PID] /F

# On macOS/Linux
lsof -i :5000
kill -9 [PID]
```

## Next Steps

1. ✅ **View Products**: Navigate to marketplace page
2. ✅ **Add More Images**: Add image files to `/picture` folder and update `seedDb.js`
3. ✅ **Customize**: Edit product details in `seedDb.js`
4. ✅ **Implement Upload**: Create image upload functionality for farmers

## API Endpoints

### Get All Products with Images
```
GET /api/products
```

Response:
```json
[
  {
    "_id": "...",
    "name": "Fresh Tomatoes",
    "price": 45,
    "quantity": 100,
    "image": "http://localhost:5000/images/tomato.webp",
    "category": "vegetables",
    ...
  },
  ...
]
```

### Get Single Product
```
GET /api/products/:id
```

## Support
For issues or questions, check:
- Backend logs: `node server.js` console output
- MongoDB connection: `mongod` console output
- Frontend network tab (Browser DevTools)
