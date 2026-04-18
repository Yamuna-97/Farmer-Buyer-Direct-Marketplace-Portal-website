import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onViewDetails, onAddToCart, showAddToCart }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <div className="image-placeholder">{product.category}</div>
        )}
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-description">{product.description}</p>
        <div className="product-details">
          <p className="price">₹{product.price}/{product.unit}</p>
          <p className="quantity">Available: {product.quantity}{product.unit}</p>
          <p className="location">📍 {product.location}</p>
        </div>
        <div className="product-actions">
          <button className="btn-view" onClick={() => onViewDetails(product._id)}>
            View Details
          </button>
          {showAddToCart && (
            <button className="btn-add-cart" onClick={() => onAddToCart(product._id)}>
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
