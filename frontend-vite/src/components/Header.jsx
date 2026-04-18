import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './Header.css';

const Header = () => {
  const { user, logoutUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          🌾 Farmer-Buyer Marketplace
        </Link>

        <nav className="nav">
          {user ? (
            <>
              <span className="user-welcome">Welcome, {user.name}!</span>

              {user.role === 'farmer' ? (
                <>
                  <Link to="/dashboard" className="nav-link">
                    Dashboard
                  </Link>
                  <Link to="/marketplace" className="nav-link">
                    Marketplace
                  </Link>
                  <Link to="/add-product" className="nav-link">
                    Add Product
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/marketplace" className="nav-link">
                    Marketplace
                  </Link>
                  <Link to="/cart" className="nav-link">
                    Cart
                  </Link>
                  <Link to="/my-orders" className="nav-link">
                    My Orders
                  </Link>
                </>
              )}

              <button className="nav-link logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link register-btn">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
