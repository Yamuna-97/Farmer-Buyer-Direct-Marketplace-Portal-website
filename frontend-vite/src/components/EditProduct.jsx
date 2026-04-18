import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct, updateProduct } from '../hooks/useApi';
import './AddProduct.css';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    unit: 'kg',
    category: 'vegetables',
    location: '',
    image: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError('');
      try {
        const product = await getProduct(id);
        setFormData({
          name: product.name || '',
          description: product.description || '',
          price: product.price || '',
          quantity: product.quantity || '',
          unit: product.unit || 'kg',
          category: product.category || 'vegetables',
          location: product.location || '',
          image: product.image || '',
        });
      } catch (err) {
        setError(err.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.price || !formData.quantity || !formData.location) {
      setError('Please fill in all required fields');
      return;
    }

    setSaving(true);
    try {
      await updateProduct(id, {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        quantity: parseFloat(formData.quantity),
        unit: formData.unit,
        category: formData.category,
        location: formData.location,
        image: formData.image,
      });
      alert('Product updated successfully!');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to update product');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }

  return (
    <div className="add-product-container">
      <div className="add-product-form">
        <h2>Edit Product</h2>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Product Name: (Required)</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category: (Required)</label>
              <select id="category" name="category" value={formData.category} onChange={handleChange}>
                <option value="vegetables">Vegetables</option>
                <option value="fruits">Fruits</option>
                <option value="grains">Grains</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="price">Price per Unit (₹): (Required)</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="quantity">Quantity: (Required)</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                step="0.1"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="unit">Unit:</label>
              <select id="unit" name="unit" value={formData.unit} onChange={handleChange}>
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="liter">liter</option>
                <option value="piece">piece</option>
                <option value="bunch">bunch</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="location">Location: (Required)</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Image URL:</label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button type="button" className="btn-cancel" onClick={() => navigate('/dashboard')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
