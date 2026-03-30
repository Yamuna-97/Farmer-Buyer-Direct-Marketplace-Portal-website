const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authMiddleware, authorizeRole } = require('../middleware/auth');
const { validateOrder } = require('../middleware/validation');

// Get all orders (Admin/Farmer access)
router.get('/', authMiddleware, orderController.getAllOrders);

// Get order by ID
router.get('/:id', authMiddleware, orderController.getOrder);

// Create order (Buyer only)
router.post('/', authMiddleware, authorizeRole(['buyer']), validateOrder, orderController.createOrder);

// Update order status
router.put('/:id/status', authMiddleware, orderController.updateOrderStatus);

// Get buyer's orders
router.get('/buyer/:buyerId', authMiddleware, orderController.getBuyerOrders);

// Cancel order (Buyer only)
router.delete('/:id', authMiddleware, authorizeRole(['buyer']), orderController.cancelOrder);

module.exports = router;
