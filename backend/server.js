require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const loggingMiddleware = require('./middleware/logging');

// Import routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const path = require('path');

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());
app.use(loggingMiddleware);

// Serve static images from picture folder
app.use('/images', express.static(path.join(__dirname, '../picture')));

// ================= ROUTES =================
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Root route
app.get('/', (req, res) => {
  res.send('API Running...');
});

// ================= ERROR HANDLER (ALWAYS LAST) =================
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({
    message: 'Internal server error',
    error: err.message
  });
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  });