import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { getAllProducts } from '../hooks/useApi';
import ProductCard from './ProductCard';
import './Marketplace.css';

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

const Marketplace = () => {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState(loadCartItems());
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAllProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      setError(error.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchTerm, products]);

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = (productId) => {
    if (user?.role !== 'buyer') {
      navigate(`/product/${productId}`);
      return;
    }

    const productToAdd = products.find((product) => product._id === productId);
    if (!productToAdd) {
      setError('Unable to add product to cart. Please try again.');
      return;
    }

    const alreadyAdded = cart.some((item) => item._id === productId);
    if (alreadyAdded) {
      setError('This product is already in your cart.');
      return;
    }

    const updatedCart = [...cart, productToAdd];
    setCart(updatedCart);
    saveCartItems(updatedCart);
    setError('');
    alert('Product added to cart!');
  };

  return (
    <div className="marketplace">
      <div className="marketplace-header">
        <h1>Farmer-Buyer Marketplace</h1>
        <p>Browse and purchase fresh products directly from farmers</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="marketplace-controls">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-filter"
        >
          <option value="">All Categories</option>
          <option value="vegetables">Vegetables</option>
          <option value="fruits">Fruits</option>
          <option value="grains">Grains</option>
        </select>

        <button onClick={fetchProducts} className="btn-refresh">
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading products...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="no-products">No products found</div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onViewDetails={handleViewDetails}
              onAddToCart={handleAddToCart}
              showAddToCart={user?.role === 'buyer'}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Marketplace;
