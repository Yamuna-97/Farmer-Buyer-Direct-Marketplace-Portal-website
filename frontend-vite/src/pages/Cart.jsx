import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const loadCartItems = () => {
  try {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  } catch (error) {
    console.error('Error parsing cart from localStorage', error);
    return [];
  }
};

const saveCartItems = (items) => {
  localStorage.setItem('cart', JSON.stringify(items));
};

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCartItems(loadCartItems());
  }, []);

  const handleViewProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleRemoveItem = (productId) => {
    const updatedItems = cartItems.filter((item) => item._id !== productId);
    setCartItems(updatedItems);
    saveCartItems(updatedItems);
  };

  const handleClearCart = () => {
    setCartItems([]);
    saveCartItems([]);
  };

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Your Cart</h1>
        <p>Save products you want to follow, review, or order later.</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <button className="btn-secondary" onClick={() => navigate('/marketplace')}>
            Browse Marketplace
          </button>
        </div>
      ) : (
        <>
          <div className="cart-actions">
            <button className="btn-clear" onClick={handleClearCart}>
              Clear Cart
            </button>
          </div>

          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="item-meta">
                  <h3>{item.name}</h3>
                  <p>{item.category} • {item.quantity}{item.unit} available</p>
                  <p>
                    Price: ₹{item.price}/{item.unit}
                  </p>
                  <p className="item-location">📍 {item.location}</p>
                </div>
                <div className="item-actions">
                  <button className="btn-view" onClick={() => handleViewProduct(item._id)}>
                    View Product
                  </button>
                  <button className="btn-remove" onClick={() => handleRemoveItem(item._id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
