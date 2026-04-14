import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// User API calls
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error registering user' };
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error logging in' };
  }
};

export const getUser = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching user' };
  }
};

const getAuthHeaders = () => {
  let userId = localStorage.getItem('userId');
  let userRole = localStorage.getItem('userRole');

  if ((!userId || !userRole) && localStorage.getItem('user')) {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!userId) {
        userId = storedUser?.id || storedUser?._id || userId;
      }
      if (!userRole) {
        userRole = storedUser?.role || userRole;
      }
    } catch (err) {
      console.warn('Unable to parse stored user for auth headers', err);
    }
  }

  const headers = {};
  if (userId) headers['user-id'] = userId;
  if (userRole) headers['user-role'] = userRole;
  return headers;
};

// Product API calls
export const getAllProducts = async (category = '', search = '') => {
  try {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (search) params.append('search', search);

    const response = await axios.get(`${API_BASE_URL}/products?${params.toString()}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching products' };
  }
};

export const getProduct = async (productId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching product' };
  }
};

export const getFarmerProducts = async (farmerId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/farmer/${farmerId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching farmer products' };
  }
};

export const createProduct = async (productData) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.post(`${API_BASE_URL}/products`, productData, { headers });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error creating product' };
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.put(`${API_BASE_URL}/products/${productId}`, productData, { headers });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error updating product' };
  }
};

export const deleteProduct = async (productId) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.delete(`${API_BASE_URL}/products/${productId}`, { headers });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error deleting product' };
  }
};

// Order API calls
export const createOrder = async (orderData) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.post(`${API_BASE_URL}/orders`, orderData, { headers });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error creating order' };
  }
};

export const getOrder = async (orderId) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get(`${API_BASE_URL}/orders/${orderId}`, { headers });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching order' };
  }
};

export const getBuyerOrders = async (buyerId) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get(`${API_BASE_URL}/orders/buyer/${buyerId}`, { headers });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching buyer orders' };
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.put(`${API_BASE_URL}/orders/${orderId}/status`, { status }, { headers });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error updating order status' };
  }
};

export const cancelOrder = async (orderId) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.delete(`${API_BASE_URL}/orders/${orderId}`, { headers });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error cancelling order' };
  }
};
