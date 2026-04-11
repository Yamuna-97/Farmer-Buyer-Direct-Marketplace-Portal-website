require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/farmer-buyer-marketplace';
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connection successful');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert users
    const users = await User.insertMany([
      {
        name: "Rajesh Kumar",
        email: "rajesh@farm.com",
        password: "farmer123",
        role: "farmer",
        location: "Punjab, India",
        phone: "9876543210",
      },
      {
        name: "Priya Singh",
        email: "priya@farm.com",
        password: "farmer123",
        role: "farmer",
        location: "Haryana, India",
        phone: "9876543211",
      },
      {
        name: "Amit Patel",
        email: "amit@buyer.com",
        password: "buyer123",
        role: "buyer",
        location: "New Delhi, India",
        phone: "9876543212",
      },
      {
        name: "Neha Verma",
        email: "neha@buyer.com",
        password: "buyer123",
        role: "buyer",
        location: "Mumbai, India",
        phone: "9876543213",
      }
    ]);
    console.log('✅ Users created:', users.length);

    // Get farmer IDs
    const rajesh = users.find(u => u.email === "rajesh@farm.com");
    const priya = users.find(u => u.email === "priya@farm.com");

    // Insert products with images
    const products = await Product.insertMany([
      {
        name: "Fresh Tomatoes",
        description: "Freshly harvested organic red tomatoes from local farm",
        price: 45,
        quantity: 100,
        unit: "kg",
        category: "vegetables",
        location: "Punjab, India",
        image: "http://localhost:5000/images/tomato.webp",
        farmerId: rajesh._id,
      },
      {
        name: "Carrots",
        description: "Crunchy and sweet carrots, freshly pulled",
        price: 35,
        quantity: 150,
        unit: "kg",
        category: "vegetables",
        location: "Punjab, India",
        image: "http://localhost:5000/images/carrot.webp",
        farmerId: rajesh._id,
      },
      {
        name: "Mangoes",
        description: "Sweet and juicy Alphonso mangoes",
        price: 120,
        quantity: 80,
        unit: "kg",
        category: "fruits",
        location: "Haryana, India",
        image: "http://localhost:5000/images/mango.jpg",
        farmerId: priya._id,
      },
      {
        name: "Bananas",
        description: "Fresh banana bunches from the farm",
        price: 40,
        quantity: 200,
        unit: "kg",
        category: "fruits",
        location: "Haryana, India",
        image: "http://localhost:5000/images/banana.jpeg",
        farmerId: priya._id,
      },
      {
        name: "Wheat Grain",
        description: "Premium quality whole wheat grains",
        price: 55,
        quantity: 500,
        unit: "kg",
        category: "grains",
        location: "Punjab, India",
        image: "http://localhost:5000/images/wheatgrain.jpg",
        farmerId: rajesh._id,
      },
      {
        name: "Rice",
        description: "Long grain basmati rice",
        price: 75,
        quantity: 300,
        unit: "kg",
        category: "grains",
        location: "Haryana, India",
        image: "http://localhost:5000/images/rice.jpeg",
        farmerId: priya._id,
      },
      {
        name: "Spinach",
        description: "Fresh organic spinach leaves",
        price: 25,
        quantity: 120,
        unit: "kg",
        category: "vegetables",
        location: "Punjab, India",
        image: "http://localhost:5000/images/Spinach.webp",
        farmerId: rajesh._id,
      },
      {
        name: "Potatoes",
        description: "High quality potatoes suitable for all cuisines",
        price: 30,
        quantity: 400,
        unit: "kg",
        category: "vegetables",
        location: "Haryana, India",
        image: "http://localhost:5000/images/potato.jpg",
        farmerId: priya._id,
      }
    ]);
    console.log('✅ Products created:', products.length);

    // Get buyer IDs
    const amit = users.find(u => u.email === "amit@buyer.com");
    const neha = users.find(u => u.email === "neha@buyer.com");

    // Insert sample orders
    const orders = await Order.insertMany([
      {
        buyerId: amit._id,
        productId: products[0]._id, // Fresh Tomatoes
        quantity: 10,
        totalPrice: 450,
        status: "delivered",
        deliveryAddress: "123 Market Street, New Delhi 110001",
      },
      {
        buyerId: neha._id,
        productId: products[2]._id, // Mangoes
        quantity: 5,
        totalPrice: 600,
        status: "shipped",
        deliveryAddress: "456 Apartment 10B, Mumbai 400001",
      },
      {
        buyerId: amit._id,
        productId: products[1]._id, // Carrots
        quantity: 15,
        totalPrice: 525,
        status: "pending",
        deliveryAddress: "123 Market Street, New Delhi 110001",
      }
    ]);
    console.log('✅ Orders created:', orders.length);

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Users: ${users.length}`);
    console.log(`   - Products: ${products.length}`);
    console.log(`   - Orders: ${orders.length}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

connectDB().then(() => {
  seedDatabase();
});
