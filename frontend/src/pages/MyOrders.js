import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { getBuyerOrders, cancelOrder } from '../hooks/useApi';
import './MyOrders.css';

const MyOrders = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancelling, setCancelling] = useState(null);

  useEffect(() => {
    if (!user?.id) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [user, navigate]);

  const fetchOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getBuyerOrders(user.id);
      setOrders(data);
    } catch (error) {
      setError(error.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      setCancelling(orderId);
      try {
        await cancelOrder(orderId);
        setOrders(orders.map((o) => (o._id === orderId ? { ...o, status: 'cancelled' } : o)));
        alert('Order cancelled successfully!');
      } catch (error) {
        setError(error.message || 'Failed to cancel order');
      } finally {
        setCancelling(null);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#ff9800';
      case 'confirmed':
        return '#2196f3';
      case 'shipped':
        return '#9c27b0';
      case 'delivered':
        return '#4caf50';
      case 'cancelled':
        return '#f44336';
      default:
        return '#666';
    }
  };

  if (!user) {
    return <div className="loading">Please log in to view your orders</div>;
  }

  return (
    <div className="my-orders-container">
      <h1>My Orders</h1>
      <p>Track your orders and manage deliveries</p>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading your orders...</div>
      ) : orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders yet.</p>
          <button className="btn-shop" onClick={() => navigate('/marketplace')}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <h3>{order.productId?.name}</h3>
                <span className="status" style={{ backgroundColor: getStatusColor(order.status) }}>
                  {order.status.toUpperCase()}
                </span>
              </div>

              <div className="order-details">
                <div className="detail-item">
                  <span className="label">Order ID:</span>
                  <span className="value">{order._id}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Product Category:</span>
                  <span className="value">{order.productId?.category}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Quantity:</span>
                  <span className="value">{order.quantity}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Total Price:</span>
                  <span className="value">₹{order.totalPrice}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Delivery Address:</span>
                  <span className="value">{order.deliveryAddress}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Order Date:</span>
                  <span className="value">{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {order.status !== 'delivered' && order.status !== 'cancelled' && (
                <button
                  className="btn-cancel-order"
                  onClick={() => handleCancelOrder(order._id)}
                  disabled={cancelling === order._id}
                >
                  {cancelling === order._id ? 'Cancelling...' : 'Cancel Order'}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
