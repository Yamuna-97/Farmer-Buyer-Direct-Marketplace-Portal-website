import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct, createOrder } from '../hooks/useApi';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [ordering, setOrdering] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getProduct(productId);
      setProduct(data);
    } catch (error) {
      setError(error.message || 'Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError('');

    if (!deliveryAddress) {
      setError('Please enter a delivery address');
      return;
    }

    if (quantity <= 0 || quantity > product.quantity) {
      setError('Invalid quantity');
      return;
    }

    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');

    if (!userId || userRole !== 'buyer') {
      setError('Please log in as a buyer to place an order');
      return;
    }

    setOrdering(true);
    try {
      await createOrder({
        productId,
        quantity: parseFloat(quantity),
        deliveryAddress,
      });

      alert('Order placed successfully!');
      navigate('/my-orders');
    } catch (error) {
      setError(error.message || 'Failed to place order');
    } finally {
      setOrdering(false);
    }
  };

  if (loading) return <div className="loading">Loading product details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!product) return <div className="not-found">Product not found</div>;

  return (
    <div className="product-details-container">
      <button className="btn-back" onClick={() => navigate('/marketplace')}>
        ← Back to Marketplace
      </button>

      <div className="product-details">
        <div className="product-image">
          {product.image ? (
            <img src={product.image} alt={product.name} />
          ) : (
            <div className="image-placeholder">{product.category}</div>
          )}
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="category">{product.category.toUpperCase()}</p>

          <div className="price-section">
            <h2 className="price">₹{product.price}</h2>
            <span className="unit">per {product.unit}</span>
          </div>

          {product.description && (
            <div className="description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>
          )}

          <div className="product-meta">
            <div className="meta-item">
              <span className="label">Available Quantity:</span>
              <span className="value">{product.quantity}{product.unit}</span>
            </div>
            <div className="meta-item">
              <span className="label">Location:</span>
              <span className="value">📍 {product.location}</span>
            </div>
            <div className="meta-item">
              <span className="label">Farmer:</span>
              <span className="value">{product.farmerId?.name}</span>
            </div>
            <div className="meta-item">
              <span className="label">Contact:</span>
              <span className="value">{product.farmerId?.email}</span>
            </div>
          </div>

          <form className="order-form" onSubmit={handlePlaceOrder}>
            <div className="form-group">
              <label htmlFor="quantity">Quantity ({product.unit}):</label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
                max={product.quantity}
                step="0.1"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="deliveryAddress">Delivery Address:</label>
              <textarea
                id="deliveryAddress"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                rows="3"
                placeholder="Enter your delivery address"
                required
              />
            </div>

            <div className="order-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Price per {product.unit}:</span>
                <span>₹{product.price}</span>
              </div>
              <div className="summary-row">
                <span>Quantity:</span>
                <span>{quantity}{product.unit}</span>
              </div>
              <div className="summary-row total">
                <span>Total Price:</span>
                <span>₹{(product.price * quantity).toFixed(2)}</span>
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="btn-place-order" disabled={ordering}>
              {ordering ? 'Placing Order...' : 'Place Order'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
