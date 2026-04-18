import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { getFarmerProducts, deleteProduct } from '../hooks/useApi';
import './FarmerDashboard.css';

const FarmerDashboard = () => {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.id) {
      fetchProducts();
    }
  }, [user]);

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getFarmerProducts(user.id);
      setProducts(data);
    } catch (error) {
      setError(error.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId);
        setProducts(products.filter((p) => p._id !== productId));
      } catch (error) {
        setError(error.message || 'Failed to delete product');
      }
    }
  };

  return (
    <div className="farmer-dashboard">
      <h1>Farmer Dashboard</h1>
      <p>Welcome, {user?.name}!</p>

      {error && <div className="error-message">{error}</div>}

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Products</h3>
          <p>{products.length}</p>
        </div>
        <div className="stat-card">
          <h3>Active Listings</h3>
          <p>{products.filter((p) => p.quantity > 0).length}</p>
        </div>
        <div className="stat-card">
          <h3>Location</h3>
          <p>{user?.location}</p>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Your Products</h2>

        {loading ? (
          <div className="loading">Loading your products...</div>
        ) : products.length === 0 ? (
          <div className="no-products">
            <p>You haven't added any products yet.</p>
          </div>
        ) : (
          <table className="products-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price (₹)</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.unit}</td>
                  <td>{product.location}</td>
                  <td className="actions">
                    <Link className="btn-edit" to={`/edit-product/${product._id}`}>
                      Edit
                    </Link>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default FarmerDashboard;
