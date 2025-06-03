import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, AlertCircle, Eye, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import './DocumentStatus.css';

const DocumentStatus = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch('https://gramconnect.onrender.com/api/certificates/my', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.certificates && Array.isArray(data.certificates)) {
          const formattedApplications = data.certificates.map((cert) => ({
            id: cert._id,
            documentType: cert.certificateType.replace('-', ' '),
            applicantName: cert.details?.fullName || 'N/A',
            submittedDate: new Date(cert.createdAt).toLocaleDateString(),
            status: cert.status.toLowerCase(),
          }));

          setApplications(formattedApplications);
        }
      } catch (error) {
        console.error('Failed to fetch applications:', error);
      }
    };

    fetchApplications();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="icon green" />;
      case 'pending':
        return <Clock className="icon yellow" />;
      case 'rejected':
        return <AlertCircle className="icon red" />;
      default:
        return <Clock className="icon gray" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <span className="badge green">Approved</span>;
      case 'pending':
        return <span className="badge yellow">Pending Review</span>;
      case 'rejected':
        return <span className="badge red">Rejected</span>;
      default:
        return <span className="badge gray">Unknown</span>;
    }
  };

  return (
    <div className="document-status-wrapper">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Application Status</h1>
          <p className="hero-description">
            Track the progress of your document applications
          </p>
        </div>
      </section>

      <section className="status-section">
        <div className="status-container">
          {applications.length === 0 ? (
            <div className="empty-card">
              <AlertCircle className="empty-icon" />
              <h3>No Applications Found</h3>
              <p>You haven't submitted any document applications yet.</p>
              <Link to="/documents">
                <button className="apply-button">Apply for Documents</button>
              </Link>
            </div>
          ) : (
            <div className="application-list">
              {applications.map((application) => (
                <div key={application.id} className="application-card">
                  <div className="card-header">
                    <div className="card-header-left">
                      <h2 className="card-title">
                        {getStatusIcon(application.status)}
                        {application.documentType}
                      </h2>
                      <p className="card-description">Application ID: {application.id}</p>
                    </div>
                    {getStatusBadge(application.status)}
                  </div>

                  <div className="card-content">
                    <div className="info-grid">
                      <div>
                        <p className="label">Applicant Name</p>
                        <p className="value">{application.applicantName}</p>
                      </div>
                      <div>
                        <p className="label">Submitted Date</p>
                        <p className="value">{application.submittedDate}</p>
                      </div>
                      <div>
                        <p className="label">Status</p>
                        <p className="value capitalize">{application.status}</p>
                      </div>
                      <div>
                        <p className="label">Expected Completion</p>
                        <p className="value">
                          {application.status === 'approved' ? 'Completed' : '5-7 days'}
                        </p>
                      </div>
                    </div>

                    <div className="action-buttons">
                      <button className="btn-outline">
                        <Eye className="btn-icon" />
                        View Details
                      </button>
                      {application.status === 'approved' && (
                        <button className="btn-download">
                          <Download className="btn-icon" />
                          Download Certificate
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DocumentStatus;
