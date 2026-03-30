const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authMiddleware, authorizeRole } = require('../middleware/auth');
const { validateProduct } = require('../middleware/validation');

// Get all products (public)
router.get('/', productController.getAllProducts);

// Get product by ID (public)
router.get('/:id', productController.getProduct);

// Create product (Farmer only)
router.post('/', authMiddleware, authorizeRole(['farmer']), validateProduct, productController.createProduct);

// Update product (Farmer only)
router.put('/:id', authMiddleware, authorizeRole(['farmer']), productController.updateProduct);

// Delete product (Farmer only)
router.delete('/:id', authMiddleware, authorizeRole(['farmer']), productController.deleteProduct);

// Get products by farmer
router.get('/farmer/:farmerId', productController.getFarmerProducts);

module.exports = router;
