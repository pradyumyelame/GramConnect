import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

import EmblemOfIndia from '../../assets/2.jpg';
import SealOfMaharashtra from '../../assets/4.png';
import AmritMahotsavLogo from '../../assets/3.jpg';
import GramConnectLogo from '../../assets/images.png';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleProtectedClick = (path) => {
    if (!token) {
      alert('Please login to access this section.');
      navigate('/login');
    } else {
      navigate(path);
    }
  };

  const handleLogout = async () => {
    try {
      // Optionally call backend logout API to invalidate token
      await fetch('https://gramconnect.onrender.com/api/auth/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Clear token from localStorage
      localStorage.removeItem('token');

      // Redirect to login or home page
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="navbar-container">
      {/* Government Header Section */}
      <div className="government-header">
        <div className="header-content">
          <div className="left-logo">
            <img src={EmblemOfIndia} alt="Government Emblem" className="govt-logo" />
          </div>

          <div className="header-text">
            <div className="hindi-text">ग्राम विकास व पंचायतराज विभाग</div>
            <div className="english-title">
              <strong>Rural Development & Panchayat Raj Department</strong>
            </div>
            <div className="state-name">Government Of Maharashtra</div>
          </div>

          <div className="right-logo">
            <img src={SealOfMaharashtra} alt="Maharashtra Seal" className="govt-logo" />
            <img src={AmritMahotsavLogo} alt="Azadi Ka Amrit Mahotsav" className="amrit-logo" />
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="main-navbar">
        <div className="navbar-brand">
          <div className="logo-icon">
            <img src={GramConnectLogo} alt="GramConnect Logo" width="40" height="40" />
          </div>
          <div className="logo-text">
            <h1>GramConnect</h1>
            <p>Digital Grampanchayat Portal</p>
          </div>
        </div>

        <div className="navbar-center">
          <div className="navbar-links">
            <Link to="/">Home</Link>
            <span className="clickable-link" onClick={() => handleProtectedClick('/services')}>Services</span>
            <span className="clickable-link" onClick={() => handleProtectedClick('/schemes')}>Schemes</span>
            <span className="clickable-link" onClick={() => handleProtectedClick('/notice-board')}>Notice Board</span>
            <span className="clickable-link" onClick={() => handleProtectedClick('/contact')}>Contact</span>
          </div>
        </div>

        <div className="navbar-actions">
          <select className="language-selector">
            <option>English</option>
            <option>मराठी</option>
            <option>हिंदी</option>
          </select>

          <div className="auth-buttons">
            {!token ? (
              <>
                <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
                <button className="register-btn" onClick={() => navigate('/register')}>Register</button>
              </>
            ) : (
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
