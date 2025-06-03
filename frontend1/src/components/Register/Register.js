import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginType, setLoginType] = useState('citizen');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    village: '',
    password: '',
    confirmPassword: '',
    designation: '',
    employeeId: '',
    district: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const endpoint =
      loginType === 'citizen'
        ? 'https://gramconnect.onrender.com/api/auth/register/citizen'
        : 'https://gramconnect.onrender.com/api/auth/register/admin';

    const designationRoleMap = {
      grampanchayat_official: 'sarpanch',
      block_development_officer: 'gramsevak',
    };

    const payload =
      loginType === 'citizen'
        ? {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            village: formData.village,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            role: 'user',
          }
        : {
            fullName: formData.fullName,
            email: formData.email,
            designation: formData.designation,
            employeeId: formData.employeeId,
            district: formData.district,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            role: designationRoleMap[formData.designation] || 'official',
          };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || 'Registration successful!');
        navigate('/login');
      } else {
        alert(data.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="register-page">
      <header className="register-header">GramConnect</header>

      <main className="register-main">
        <div className="register-card">
          <div className="register-card-header">
            <h2 className="register-card-title">Create Account</h2>
            <p className="register-card-description">Register to access GramConnect services</p>
          </div>

          <div className="tabs">
            <div className="tabs-list">
              <button
                className={`tab-button ${loginType === 'citizen' ? 'active' : ''}`}
                onClick={() => setLoginType('citizen')}
                type="button"
              >
                Citizen
              </button>
              <button
                className={`tab-button ${loginType === 'official' ? 'active' : ''}`}
                onClick={() => setLoginType('official')}
                type="button"
              >
                Official
              </button>
            </div>

            <form onSubmit={handleSubmit} className="register-form">
              <div className="form-group">
                <label htmlFor="fullName" className="form-label">Full Name</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  className="form-input"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  {loginType === 'citizen' ? 'Email Address' : 'Official Email'}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-input"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {loginType === 'citizen' && (
                <>
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="form-input"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="village" className="form-label">Village</label>
                    <input
                      id="village"
                      name="village"
                      type="text"
                      className="form-input"
                      placeholder="Enter your village"
                      value={formData.village}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </>
              )}

              {loginType === 'official' && (
                <>
                  <div className="form-group">
                    <label htmlFor="designation" className="form-label">Designation</label>
                    <select
                      id="designation"
                      name="designation"
                      className="form-select"
                      value={formData.designation}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Designation</option>
                      <option value="grampanchayat_official">sarpanch</option>
                      <option value="block_development_officer">gramsevak</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="employeeId" className="form-label">Employee ID</label>
                    <input
                      id="employeeId"
                      name="employeeId"
                      type="text"
                      className="form-input"
                      placeholder="Enter employee ID"
                      value={formData.employeeId}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="district" className="form-label">District</label>
                    <input
                      id="district"
                      name="district"
                      type="text"
                      className="form-input"
                      placeholder="Enter district"
                      value={formData.district}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </>
              )}

              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="input-wrapper">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    className="form-input"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle-button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <div className="input-wrapper">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="form-input"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle-button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Register
              </button>

              <p className="register-link">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
