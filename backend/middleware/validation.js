// Validation middleware for products
const validateProduct = (req, res, next) => {
  const { name, price, quantity, category, location } = req.body;

  if (!name || !price || !quantity || !category || !location) {
    return res.status(400).json({ 
      message: 'Missing required fields: name, price, quantity, category, location' 
    });
  }

  if (price <= 0 || quantity <= 0) {
    return res.status(400).json({ 
      message: 'Price and quantity must be positive numbers' 
    });
  }

  if (!['vegetables', 'fruits', 'grains'].includes(category)) {
    return res.status(400).json({ 
      message: 'Category must be one of: vegetables, fruits, grains' 
    });
  }

  next();
};

// Validation middleware for users
const validateUser = (req, res, next) => {
  const { name, email, password, role, location } = req.body;

  if (!name || !email || !password || !role || !location) {
    return res.status(400).json({ 
      message: 'Missing required fields: name, email, password, role, location' 
    });
  }

  if (!['farmer', 'buyer'].includes(role)) {
    return res.status(400).json({ 
      message: 'Role must be either farmer or buyer' 
    });
  }

  next();
};

// Validation middleware for orders
const validateOrder = (req, res, next) => {
  const { productId, quantity, deliveryAddress } = req.body;

  if (!productId || !quantity || !deliveryAddress) {
    return res.status(400).json({ 
      message: 'Missing required fields: productId, quantity, deliveryAddress' 
    });
  }

  if (quantity <= 0) {
    return res.status(400).json({ 
      message: 'Quantity must be a positive number' 
    });
  }

  next();
};

module.exports = { validateProduct, validateUser, validateOrder };
