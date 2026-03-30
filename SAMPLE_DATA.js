// MongoDB Sample Data
// Copy and paste these commands in MongoDB shell or import via mongoimport

// Register admin users for testing
db.users.insertMany([
  {
    name: "Rajesh Kumar",
    email: "rajesh@farm.com",
    password: "farmer123",
    role: "farmer",
    location: "Punjab, India",
    phone: "9876543210",
    createdAt: new Date()
  },
  {
    name: "Priya Singh",
    email: "priya@farm.com",
    password: "farmer123",
    role: "farmer",
    location: "Haryana, India",
    phone: "9876543211",
    createdAt: new Date()
  },
  {
    name: "Amit Patel",
    email: "amit@buyer.com",
    password: "buyer123",
    role: "buyer",
    location: "New Delhi, India",
    phone: "9876543212",
    createdAt: new Date()
  },
  {
    name: "Neha Verma",
    email: "neha@buyer.com",
    password: "buyer123",
    role: "buyer",
    location: "Mumbai, India",
    phone: "9876543213",
    createdAt: new Date()
  }
]);

// Insert sample products
db.products.insertMany([
  {
    name: "Fresh Tomatoes",
    description: "Freshly harvested organic red tomatoes from local farm",
    price: 45,
    quantity: 100,
    unit: "kg",
    category: "vegetables",
    location: "Punjab, India",
    farmerId: db.users.findOne({ email: "rajesh@farm.com" })._id,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Carrots",
    description: "Crunchy and sweet carrots, freshly pulled",
    price: 35,
    quantity: 150,
    unit: "kg",
    category: "vegetables",
    location: "Punjab, India",
    farmerId: db.users.findOne({ email: "rajesh@farm.com" })._id,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Mangoes",
    description: "Sweet and juicy Alphonso mangoes",
    price: 120,
    quantity: 80,
    unit: "kg",
    category: "fruits",
    location: "Haryana, India",
    farmerId: db.users.findOne({ email: "priya@farm.com" })._id,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Bananas",
    description: "Fresh banana bunches from the farm",
    price: 40,
    quantity: 200,
    unit: "kg",
    category: "fruits",
    location: "Haryana, India",
    farmerId: db.users.findOne({ email: "priya@farm.com" })._id,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Wheat Grain",
    description: "Premium quality whole wheat grains",
    price: 55,
    quantity: 500,
    unit: "kg",
    category: "grains",
    location: "Punjab, India",
    farmerId: db.users.findOne({ email: "rajesh@farm.com" })._id,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Rice",
    description: "Long grain basmati rice",
    price: 75,
    quantity: 300,
    unit: "kg",
    category: "grains",
    location: "Haryana, India",
    farmerId: db.users.findOne({ email: "priya@farm.com" })._id,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Spinach",
    description: "Fresh organic spinach leaves",
    price: 25,
    quantity: 120,
    unit: "kg",
    category: "vegetables",
    location: "Punjab, India",
    farmerId: db.users.findOne({ email: "rajesh@farm.com" })._id,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Potatoes",
    description: "High quality potatoes suitable for all cuisines",
    price: 30,
    quantity: 400,
    unit: "kg",
    category: "vegetables",
    location: "Haryana, India",
    farmerId: db.users.findOne({ email: "priya@farm.com" })._id,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Sample orders
db.orders.insertMany([
  {
    buyerId: db.users.findOne({ email: "amit@buyer.com" })._id,
    productId: db.products.findOne({ name: "Fresh Tomatoes" })._id,
    quantity: 10,
    totalPrice: 450,
    status: "delivered",
    deliveryAddress: "123 Market Street, New Delhi 110001",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  },
  {
    buyerId: db.users.findOne({ email: "neha@buyer.com" })._id,
    productId: db.products.findOne({ name: "Mangoes" })._id,
    quantity: 5,
    totalPrice: 600,
    status: "shipped",
    deliveryAddress: "456 Apartment 10B, Mumbai 400001",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  },
  {
    buyerId: db.users.findOne({ email: "amit@buyer.com" })._id,
    productId: db.products.findOne({ name: "Carrots" })._id,
    quantity: 15,
    totalPrice: 525,
    status: "pending",
    deliveryAddress: "123 Market Street, New Delhi 110001",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

console.log("Sample data inserted successfully!");
