import React, { useState, useEffect } from 'react';
import { MessageSquare, Eye, CheckCircle, Clock, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import './AdminGrievances.css';

const AdminGrievances = () => {
  const [grievances, setGrievances] = useState([]);
  const [selectedGrievance, setSelectedGrievance] = useState(null);
  const [adminComments, setAdminComments] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        const response = await fetch('https://gramconnect.onrender.com/api/grievances/admin');
        const data = await response.json();
        setGrievances(data);
      } catch (error) {
        console.error('Error fetching grievances:', error);
      }
    };

    fetchGrievances();
  }, []);

  const handleStatusUpdate = async (grievanceId, newStatus, comments) => {
    try {
      const res = await fetch(`https://gramconnect.onrender.com/api/grievances/admin/${grievanceId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, adminComments: comments })
      });

      if (!res.ok) throw new Error('Failed to update grievance');

      const updated = await res.json();

      setGrievances((prev) =>
        prev.map((g) => (g._id === updated.grievance._id ? updated.grievance : g))
      );

      setSelectedGrievance(null);
      setAdminComments('');
      alert(`Grievance ${newStatus} successfully!`);
    } catch (err) {
      alert('Error updating grievance: ' + err.message);
    }
  };

  const filteredGrievances = grievances.filter((grievance) => {
    if (filter === 'all') return true;
    return grievance.status?.toLowerCase() === filter;
  });

  const stats = {
    total: grievances.length,
    pending: grievances.filter((g) => g.status === 'Pending').length,
    inProgress: grievances.filter((g) => g.status === 'In Progress').length,
    resolved: grievances.filter((g) => g.status === 'Resolved').length
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-default';
    }
  };

  const getStatusColor = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'resolved': return 'status-resolved';
      case 'in progress': return 'status-in-progress';
      default: return 'status-pending';
    }
  };

  return (
    <div className="admin-grievances">
      {/* Hero, Stats, Filters unchanged */}
      {/* ... */}
      <section className="main-section">
        <div className="container">
          {/* Stats and Filter buttons unchanged */}
          {/* ... */}

          {/* Grievances Table */}
          <div className="table-card">
            <div className="card-header">
              <h2 className="card-title">Submitted Grievances</h2>
              <p className="card-description">Review and manage citizen grievances</p>
            </div>
            <div className="card-content">
              {filteredGrievances.length === 0 ? (
                <div className="empty-state">
                  <AlertCircle className="empty-icon" />
                  <p className="empty-text">No grievances found for the selected filter.</p>
                </div>
              ) : (
                <div className="table-container">
                  <table className="grievances-table">
                    <thead>
                      <tr>
                        <th>Grievance ID</th>
                        <th>Category</th>
                        <th>Complainant</th>
                        <th>Priority</th>
                        <th>Submitted Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredGrievances.map((grievance) => (
                        <tr key={grievance._id}>
                          <td className="font-medium">{grievance._id}</td>
                          <td>{grievance.category}</td>
                          <td>{grievance.name || 'Anonymous'}</td>
                          <td>
                            <span className={`badge ${getPriorityColor(grievance.priority)}`}>
                              {grievance.priority?.toUpperCase() || 'MEDIUM'}
                            </span>
                          </td>
                          <td>{new Date(grievance.submittedAt).toLocaleDateString()}</td>
                          <td>
                            <span className={`badge ${getStatusColor(grievance.status)}`}>
                              {grievance.status}
                            </span>
                          </td>
                          <td>
                            <button
                              className="review-btn"
                              onClick={() => setSelectedGrievance(grievance)}
                            >
                              <Eye className="btn-icon" />
                              Review
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Review Modal */}
      {selectedGrievance && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h2 className="modal-title">Review Grievance - {selectedGrievance.category}</h2>
              <p className="modal-description">Grievance ID: {selectedGrievance._id}</p>
            </div>
            <div className="modal-content">
              <div className="details-grid">
                <div className="details-section">
                  <h4 className="section-title">Complainant Details</h4>
                  <div className="details-list">
                    <p><span className="detail-label">Name:</span> {selectedGrievance.name}</p>
                    <p><span className="detail-label">Phone:</span> {selectedGrievance.phone}</p>
                    <p><span className="detail-label">Email:</span> {selectedGrievance.email}</p>
                    <p><span className="detail-label">Address:</span> {selectedGrievance.address}</p>
                  </div>
                </div>
                <div className="details-section">
                  <h4 className="section-title">Grievance Details</h4>
                  <div className="details-list">
                    <p><span className="detail-label">Category:</span> {selectedGrievance.category}</p>
                    <p><span className="detail-label">Priority:</span> {selectedGrievance.priority || 'Medium'}</p>
                    <p><span className="detail-label">Submitted:</span> {new Date(selectedGrievance.submittedAt).toLocaleDateString()}</p>
                    <p><span className="detail-label">Current Status:</span> {selectedGrievance.status}</p>
                  </div>
                </div>
              </div>

              <div className="description-section">
                <h4 className="section-title">Description</h4>
                <p className="description-text">{selectedGrievance.description}</p>
              </div>

              {selectedGrievance.adminComments && (
                <div className="comments-section">
                  <h4 className="section-title">Previous Admin Comments</h4>
                  <p className="previous-comments">{selectedGrievance.adminComments}</p>
                </div>
              )}

              <div className="action-section">
                <div className="textarea-container">
                  <label className="textarea-label">
                    Admin Comments/Response
                  </label>
                  <textarea
                    className="admin-textarea"
                    value={adminComments}
                    onChange={(e) => setAdminComments(e.target.value)}
                    placeholder="Enter your comments or response to the grievance..."
                    rows={4}
                  />
                </div>

                <div className="action-buttons">
                  {selectedGrievance.status === 'Pending' && (
                    <button
                      onClick={() => handleStatusUpdate(selectedGrievance._id, 'In Progress', adminComments)}
                      className="action-btn progress-btn"
                    >
                      <Clock className="btn-icon" />
                      Mark In Progress
                    </button>
                  )}

                  {selectedGrievance.status !== 'Resolved' && (
                    <button
                      onClick={() => handleStatusUpdate(selectedGrievance._id, 'Resolved', adminComments)}
                      className="action-btn resolve-btn"
                    >
                      <CheckCircle className="btn-icon" />
                      Mark Resolved
                    </button>
                  )}

                  <button
                    onClick={() => handleStatusUpdate(selectedGrievance._id, selectedGrievance.status, adminComments)}
                    className="action-btn comment-btn"
                  >
                    <MessageSquare className="btn-icon" />
                    Add Comment Only
                  </button>
                </div>
              </div>

              <div className="modal-footer">
                <button className="close-btn" onClick={() => setSelectedGrievance(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGrievances;
