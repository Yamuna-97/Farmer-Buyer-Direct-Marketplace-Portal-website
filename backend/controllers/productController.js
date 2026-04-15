const Product = require('../models/Product');
// Create product (Farmer only)
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, quantity, unit, category, location, image } = req.body;
    const product = new Product({
      name,
      description,
      price,
      quantity,
      unit: unit || 'kg',
      category,
      location,
      farmerId: req.userId,
      image,
    });
    const savedProduct = await product.save();
    res.status(201).json({
      message: 'Product created successfully',
      product: savedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};
// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};
    if (category) {
      query.category = category;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    const products = await Product.find(query).populate('farmerId', 'name email location phone');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};
// Get product by ID
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('farmerId', 'name email location phone');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};
// Update product (Farmer only)
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    // Check if the user is the farmer who created the product
    if (product.farmerId.toString() !== req.userId) {
      return res.status(403).json({ message: 'You can only update your own products' });
    }
    const { name, description, price, quantity, unit, category, location, image } = req.body;
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (quantity) product.quantity = quantity;
    if (unit) product.unit = unit;
    if (category) product.category = category;
    if (location) product.location = location;
    if (image) product.image = image;
    product.updatedAt = Date.now();
    const updatedProduct = await product.save();
    res.json({
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};
// Delete product (Farmer only)
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    // Check if the user is the farmer who created the product
    if (product.farmerId.toString() !== req.userId) {
      return res.status(403).json({ message: 'You can only delete your own products' });
    }
    await Product.findByIdAndDelete(productId);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};
// Get products by farmer
exports.getFarmerProducts = async (req, res) => {
  try {
    const farmerId = req.params.farmerId;
    const products = await Product.find({ farmerId });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching farmer products', error: error.message });
  }
};
