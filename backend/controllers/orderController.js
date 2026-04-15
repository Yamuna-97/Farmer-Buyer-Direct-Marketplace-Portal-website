const Order = require('../models/Order');
const Product = require('../models/Product');
// Create order (Buyer only)
exports.createOrder = async (req, res) => {
  try {
    const { productId, quantity, deliveryAddress } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    if (product.quantity < quantity) {
      return res.status(400).json({ message: 'Insufficient product quantity' });
    }
    const totalPrice = product.price * quantity;

    const order = new Order({
      buyerId: req.userId,
      productId,
      quantity,
      totalPrice,
      deliveryAddress,
    });
    // Update product quantity
    product.quantity -= quantity;
    await product.save();
    const savedOrder = await order.save();
    res.status(201).json({
      message: 'Order created successfully',
      order: savedOrder,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};
// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('buyerId', 'name email location')
      .populate('productId', 'name price category');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};
// Get order by ID
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('buyerId', 'name email location')
      .populate('productId', 'name price category farmerId');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error: error.message });
  }
};
// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid order status' });
    }
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({
      message: 'Order status updated successfully',
      order,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error: error.message });
  }
};
// Get buyer's orders
exports.getBuyerOrders = async (req, res) => {
  try {
    const buyerId = req.params.buyerId;
    const orders = await Order.find({ buyerId })
      .populate('productId', 'name price category')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching buyer orders', error: error.message });
  }
};
// Cancel order (Buyer only)
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    if (order.buyerId.toString() !== req.userId) {
      return res.status(403).json({ message: 'You can only cancel your own orders' });
    }
    if (order.status === 'shipped' || order.status === 'delivered') {
      return res.status(400).json({ message: 'Cannot cancel orders that are shipped or delivered' });
    }
    // Refund product quantity
    const product = await Product.findById(order.productId);
    product.quantity += order.quantity;
    await product.save();
    order.status = 'cancelled';
    order.updatedAt = Date.now();
    const cancelledOrder = await order.save();
    res.json({
      message: 'Order cancelled successfully',
      order: cancelledOrder,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling order', error: error.message });
  }
};
