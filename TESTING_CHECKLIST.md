# 🧪 Testing Checklist - Image Setup Verification

Use this checklist to verify all image features are working correctly.

## Pre-Setup Verification

- [ ] MongoDB is installed or MongoDB Atlas account created
- [ ] Port 5000 is available (backend)
- [ ] Port 3000 is available (frontend)
- [ ] All 8 image files exist in `/picture` folder:
  - [ ] `tomato.webp`
  - [ ] `carrot.webp`
  - [ ] `mango.jpg`
  - [ ] `banana.jpeg`
  - [ ] `wheatgrain.jpg`
  - [ ] `rice.jpeg`
  - [ ] `Spinach.webp`
  - [ ] `potato.jpg`

## Setup Verification

- [ ] Run setup script (setup.bat or setup.sh)
- [ ] Backend dependencies installed without errors
- [ ] Database seeded successfully with message:
  - "✅ Products created: 8"
- [ ] Frontend dependencies installed without errors
- [ ] No installation errors in console

## Backend Verification

**Start Backend:**
```bash
cd backend
npm start
```

Verify in console:
- [ ] "🚀 Server is running on port 5000"
- [ ] "✅ MongoDB connection successful"

**Test Image Serving:**

Open browser and check these URLs:
- [ ] `http://localhost:5000/images/tomato.webp` (displays image)
- [ ] `http://localhost:5000/images/carrot.webp` (displays image)
- [ ] `http://localhost:5000/images/mango.jpg` (displays image)
- [ ] `http://localhost:5000/images/banana.jpeg` (displays image)
- [ ] `http://localhost:5000/images/wheatgrain.jpg` (displays image)
- [ ] `http://localhost:5000/images/rice.jpeg` (displays image)
- [ ] `http://localhost:5000/images/Spinach.webp` (displays image)
- [ ] `http://localhost:5000/images/potato.jpg` (displays image)

**Test API Endpoints:**

```bash
curl http://localhost:5000/api/products
```

In response JSON, verify each product has:
- [ ] `_id` field (MongoDB ID)
- [ ] `name` field (product name)
- [ ] `image` field with URL like "http://localhost:5000/images/..."
- [ ] `price` field
- [ ] `quantity` field
- [ ] `category` field
- [ ] `farmerId` field (references user)

Example:
```json
{
  "_id": "...",
  "name": "Fresh Tomatoes",
  "description": "Freshly harvested organic red tomatoes from local farm",
  "price": 45,
  "quantity": 100,
  "unit": "kg",
  "category": "vegetables",
  "image": "http://localhost:5000/images/tomato.webp",
  "farmerId": "..."
}
```

**Test Health Check:**
```bash
curl http://localhost:5000/api/health
```

Should return:
```json
{ "message": "Server is running" }
```

## Frontend Verification

**Start Frontend (new terminal):**
```bash
cd frontend
npm start
```

Verify in console:
- [ ] "Compiled successfully!"
- [ ] No error messages
- [ ] Browser opens to `http://localhost:3000`

## User Interface Testing

### Login Page
- [ ] Login page loads
- [ ] Can login with farmer credentials:
  - Email: `rajesh@farm.com`
  - Password: `farmer123`
- [ ] Can login with buyer credentials:
  - Email: `amit@buyer.com`
  - Password: `buyer123`

### Marketplace Page
**After login, navigate to Marketplace:**
- [ ] Page loads without errors
- [ ] All 8 product cards visible:
  - [ ] Fresh Tomatoes with image
  - [ ] Carrots with image
  - [ ] Mangoes with image
  - [ ] Bananas with image
  - [ ] Wheat Grain with image
  - [ ] Rice with image
  - [ ] Spinach with image
  - [ ] Potatoes with image

**Product Card Display:**
- [ ] Product images display correctly
- [ ] Product names visible
- [ ] Product descriptions visible
- [ ] Product prices visible (₹)
- [ ] Available quantity visible
- [ ] Location visible (📍)
- [ ] "View Details" button visible
- [ ] "Add to Cart" button visible (if buyer)

### Product Details Page
**Click "View Details" on any product:**
- [ ] Product details page loads
- [ ] Product image displays larger
- [ ] All product information shows:
  - [ ] Name
  - [ ] Description
  - [ ] Price
  - [ ] Quantity available
  - [ ] Category
  - [ ] Farmer location
- [ ] "Add to Cart" button works (for buyers)
- [ ] Back button works

### Shopping Cart
**After adding products to cart:**
- [ ] Cart shows added items
- [ ] Images display in cart
- [ ] Quantity can be changed
- [ ] Remove button works
- [ ] Subtotal calculated correctly
- [ ] Can proceed to checkout

### Farmer Dashboard
**After login as farmer:**
- [ ] Dashboard loads
- [ ] Shows farmer's products with images
- [ ] Can edit/delete products
- [ ] Can add new products

## Network Testing

**Open Browser DevTools (F12):**

### Network Tab
- [ ] Check `/api/products` request:
  - [ ] Status 200
  - [ ] Response includes all products
  - [ ] Response includes image URLs
- [ ] Check `/images/tomato.webp` request:
  - [ ] Status 200
  - [ ] Response type: image/webp
  - [ ] Image loads successfully

### Console Tab
- [ ] No error messages
- [ ] No warning messages about missing images
- [ ] No CORS errors

## Database Verification

**In MongoDB:**

```javascript
// Check users
db.users.find().pretty()
```
- [ ] 4 users exist (2 farmers, 2 buyers)

```javascript
// Check products
db.products.find().pretty()
```
- [ ] 8 products exist
- [ ] Each product has image field
- [ ] Image URLs are correct format

```javascript
// Check orders
db.orders.find().pretty()
```
- [ ] 3 sample orders exist
- [ ] Orders reference correct users and products

## Performance Testing

- [ ] Page loads in < 3 seconds
- [ ] Images load quickly (< 1 second each)
- [ ] No lag when clicking buttons
- [ ] Smooth scrolling on marketplace
- [ ] No memory leaks in console

## Mobile Responsiveness (Optional)

- [ ] Page works on mobile view (toggle device toolbar)
- [ ] Images scale correctly on small screens
- [ ] Product cards readable on mobile
- [ ] Buttons accessible on touch devices

## Error Handling

### Test 404 Errors
- [ ] Visit `http://localhost:5000/images/nonexistent.jpg`
  - [ ] Returns 404 error (expected)

### Test Invalid Product ID
- [ ] Visit `http://localhost:3000/marketplace/invalidid`
  - [ ] Shows appropriate error message

### Test Network Issues
- [ ] Stop backend server
  - [ ] Frontend shows connection error
  - [ ] Appropriate error message displayed
- [ ] Restart backend
  - [ ] Frontend reconnects automatically

## Production Readiness

- [ ] Image URLs can be updated for production domain
- [ ] No hardcoded `localhost:5000` in critical code
- [ ] Image file paths are relative
- [ ] Environment variables used for URLs (if needed)
- [ ] Compression enabled for images (optional)

## Sign-Off

Once all checks pass:

- [ ] Date tested: ________________
- [ ] Tester name: ________________
- [ ] All functionality working: YES / NO
- [ ] Ready for production: YES / NO

### Notes:
```
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
```

---

## Quick Retest Command

If you need to retest everything quickly:

```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend (wait for backend to start)
cd frontend
npm start

# Browser
# Open http://localhost:3000
# Go through the UI checklist above
```

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Images not loading | Check if backend is running on port 5000 |
| 404 errors on images | Verify files exist in `/picture` folder |
| Products have no images | Check database has image URLs in all products |
| API returns no data | Verify database was seeded with `node seedDb.js` |
| Frontend won't connect | Check backend is running and CORS is enabled |
| Page loads slowly | Check browser network tab for slow image loading |

---

**Good luck with your testing!** 🎉
