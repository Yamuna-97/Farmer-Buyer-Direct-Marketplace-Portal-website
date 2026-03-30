import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserContext } from './context/UserContext';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Marketplace from './components/Marketplace';
import FarmerDashboard from './components/FarmerDashboard';
import AddProduct from './components/AddProduct';
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

function App() {
  const { loading } = useContext(UserContext);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router>
      <Header />
      <main className="main-content">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/product/:productId" element={<ProductDetails />} />

          {/* Buyer routes */}
          <Route
            path="/my-orders"
            element={
              <PrivateRoute requiredRole="buyer">
                <MyOrders />
              </PrivateRoute>
            }
          />

          {/* Farmer routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute requiredRole="farmer">
                <FarmerDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-product"
            element={
              <PrivateRoute requiredRole="farmer">
                <AddProduct />
              </PrivateRoute>
            }
          />

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/marketplace" />} />
          <Route path="*" element={<Navigate to="/marketplace" />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
