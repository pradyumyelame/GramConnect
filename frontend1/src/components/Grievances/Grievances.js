import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  Eye,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import './Grievances.css';

const Grievances = () => {
  const [grievances, setGrievances] = useState([]);
  const [selectedGrievance, setSelectedGrievance] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingGrievances, setLoadingGrievances] = useState(false);
  const [error, setError] = useState(null);
  const [phoneToTrack, setPhoneToTrack] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    category: '',
    description: '',
    priority: 'medium'
  });

  const categories = [
    'Water Supply',
    'Road Maintenance',
    'Electricity',
    'Sanitation',
    'Healthcare',
    'Education',
    'Public Transport',
    'Land Records',
    'Government Services',
    'Other'
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="status-icon text-green" />;
      case 'in-progress':
        return <Clock className="status-icon text-blue" />;
      case 'pending':
        return <AlertTriangle className="status-icon text-orange" />;
      default:
        return <Clock className="status-icon" />;
    }
  };

  const fetchGrievances = async (phone) => {
    if (!phone) return;
    setLoadingGrievances(true);
    setError(null);
    setSelectedGrievance(null);

    try {
      const response = await fetch(`https://gramconnect.onrender.com/api/grievances/user?phone=${encodeURIComponent(phone)}`);
      if (!response.ok) throw new Error('Failed to fetch grievances');
      const data = await response.json();
      setGrievances(data || []);
    } catch (err) {
      setError(err.message);
      setGrievances([]);
    } finally {
      setLoadingGrievances(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('https://gramconnect.onrender.com/api/grievances', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to submit grievance');
      }

      const newGrievance = await response.json();
      alert('Grievance submitted successfully! You can now track it using your phone number.');

      setFormData({
        name: '',
        phone: '',
        email: '',
        address: '',
        category: '',
        description: '',
        priority: 'medium'
      });

      setPhoneToTrack(newGrievance.phone);
      fetchGrievances(newGrievance.phone);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grievances-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Grievance Portal</h1>
          <p className="hero-subtitle">Submit your complaints and track their resolution status</p>
        </div>
      </section>

      <section className="main-content">
        <div className="content-wrapper">
          {/* Grievance Submission Form */}
          <div className="form-section">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">
                  <MessageSquare className="icon message-icon" />
                  Submit a Grievance
                </h2>
                <p className="card-description">Fill out the form below to submit your complaint</p>
              </div>
              <div className="card-content">
                <form onSubmit={handleSubmit} className="grievance-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name *</label>
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number *</label>
                      <input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="address">Address *</label>
                      <input
                        id="address"
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        required
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="category">Category *</label>
                      <select
                        id="category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        required
                        className="form-select"
                      >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="priority">Priority *</label>
                      <select
                        id="priority"
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                        required
                        className="form-select"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">Description *</label>
                    <textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows="4"
                      required
                      className="form-textarea"
                    />
                  </div>

                  <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                    {isSubmitting ? 'Submitting...' : <>Submit <Send className="btn-icon" /></>}
                  </button>

                  {error && <p className="error-message">{error}</p>}
                </form>
              </div>
            </div>
          </div>

          {/* Grievance Tracking Section */}
          <div className="list-section">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">
                  <Eye className="icon eye-icon" />
                  Track Your Grievances
                </h2>
                <p className="card-description">Enter your phone number to view your submitted grievances</p>
              </div>
              <div className="card-content">
                <form
                  className="track-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    fetchGrievances(phoneToTrack);
                  }}
                >
                  <div className="track-input-row">
                    <input
                      type="tel"
                      placeholder="Enter phone number"
                      value={phoneToTrack}
                      onChange={(e) => setPhoneToTrack(e.target.value)}
                      required
                      className="form-input"
                    />
                    <button
                      type="submit"
                      disabled={!phoneToTrack || loadingGrievances}
                      className="btn btn-secondary"
                    >
                      {loadingGrievances ? 'Loading...' : 'Track'}
                    </button>
                  </div>
                </form>

                {error && <p className="error-message">{error}</p>}

                {!loadingGrievances && grievances.length === 0 && phoneToTrack && !error && (
                  <p>No grievances found for this phone number.</p>
                )}

                <ul className="grievance-list">
                  {grievances.map((grievance) => (
                    <li
                      key={grievance._id}
                      className={`grievance-item ${selectedGrievance?._id === grievance._id ? 'selected' : ''}`}
                      onClick={() => setSelectedGrievance(grievance)}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') setSelectedGrievance(grievance);
                      }}
                    >
                      <div className="grievance-header">
                        <span className="grievance-category">{grievance.category}</span>
                        {getStatusIcon(grievance.status)}
                      </div>
                      <p className="grievance-description">{grievance.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Selected Grievance Details */}
            {selectedGrievance && (
              <div className="details-card">
                <div className="details-header">
                  <h3>{selectedGrievance.category} Grievance Details</h3>
                  <button
                    className="close-btn"
                    onClick={() => setSelectedGrievance(null)}
                    aria-label="Close details"
                  >
                    &times;
                  </button>
                </div>
                <div className="details-content">
                  <p><strong>Status:</strong> {selectedGrievance.status}</p>
                  <p><strong>Priority:</strong> {selectedGrievance.priority}</p>
                  <p><strong>Description:</strong> {selectedGrievance.description}</p>
                  <p><strong>Submitted At:</strong> {new Date(selectedGrievance.createdAt || Date.now()).toLocaleString()}</p>
                  <p><strong>Submitted By:</strong> {selectedGrievance.name}</p>
                  <p><strong>Contact:</strong> {selectedGrievance.phone}</p>
                  <p><strong>Email:</strong> {selectedGrievance.email || 'N/A'}</p>
                  <p><strong>Address:</strong> {selectedGrievance.address}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Grievances;
