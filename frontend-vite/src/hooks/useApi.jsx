import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const userId = localStorage.getItem('userId');
  const userRole = localStorage.getItem('userRole');
  const headers = {};
  if (userId) headers['user-id'] = userId;
  if (userRole) headers['user-role'] = userRole;
  return headers;
};

// User API calls
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Product API calls
export const getProducts = async (filters = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`, { params: filters });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getFarmerProducts = async (farmerId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/farmer/${farmerId}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getProduct = async (productId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/products`, productData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/products/${productId}`, productData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/products/${productId}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Order API calls
export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/orders`, orderData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      'Error creating order'
    );
  }
};

export const getBuyerOrders = async (buyerId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/buyer/${buyerId}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getFarmerOrders = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/farmer`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const cancelOrder = async (orderId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/orders/${orderId}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/orders/${orderId}/status`, { status }, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
