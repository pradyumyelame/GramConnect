import React, { useState } from 'react';
import { User, Shield } from 'react-feather';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [loginType, setLoginType] = useState('citizen');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint =
      loginType === 'citizen'
        ? 'https://gramconnect.onrender.com/api/auth/login/citizen'
        : 'https://gramconnect.onrender.com/api/auth/login/admin';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || 'Login successful!');
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        if (loginType === 'citizen') {
          navigate('/');
        } else if (loginType === 'official') {
          navigate('/admin/admindashboard');
        } else {
          navigate('/');
        }
      } else {
        alert(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Something went wrong during login.');
    }
  };

  return (
    <div className="login-page">
      <header className="login-header">
        <h1>GramConnect</h1>
      </header>

      <main className="login-main">
        <div className="login-card">
          <div className="login-card-header">
            <h2>Login to your account</h2>
            <p>Access GramConnect services by logging in</p>
          </div>

          <div className="tabs">
            <div className="tabs-list">
              <button
                className={`tab-button ${loginType === 'citizen' ? 'active' : ''}`}
                onClick={() => setLoginType('citizen')}
                type="button"
              >
                <User size={16} /> Citizen
              </button>
              <button
                className={`tab-button ${loginType === 'official' ? 'active' : ''}`}
                onClick={() => setLoginType('official')}
                type="button"
              >
                <Shield size={16} /> Official
              </button>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  {loginType === 'citizen' ? 'Email Address' : 'Official Email'}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  className="form-input"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Login
              </button>

              <p className="login-link">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
