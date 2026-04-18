import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserContext } from './context/UserContext';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Marketplace from './components/Marketplace';
import FarmerDashboard from './components/FarmerDashboard';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import ProductDetails from './pages/ProductDetails';
import MyOrders from './pages/MyOrders';
import './App.css';

const PrivateRoute = ({ children, requiredRole }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={user.role === 'farmer' ? '/dashboard' : '/marketplace'} />;
  }

  return children;
};

export default function App() {
  const { user } = useContext(UserContext);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/marketplace" element={<PrivateRoute><Marketplace /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute requiredRole="farmer"><FarmerDashboard /></PrivateRoute>} />
          <Route path="/add-product" element={<PrivateRoute requiredRole="farmer"><AddProduct /></PrivateRoute>} />
          <Route path="/edit-product/:id" element={<PrivateRoute requiredRole="farmer"><EditProduct /></PrivateRoute>} />
          <Route path="/product/:id" element={<PrivateRoute><ProductDetails /></PrivateRoute>} />
          <Route path="/my-orders" element={<PrivateRoute><MyOrders /></PrivateRoute>} />
          <Route path="/" element={<Navigate to={user ? (user.role === 'farmer' ? '/dashboard' : '/marketplace') : '/login'} />} />
        </Routes>
      </Router>
    </>
  );
}
