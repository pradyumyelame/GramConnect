import React, { useEffect, useState } from "react";

const AdminDocuments = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [reviewAction, setReviewAction] = useState(""); // "approve" or "reject"
  const [reviewComments, setReviewComments] = useState("");

  const fetchApplications = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("https://gramconnect.onrender.com/api/certificates/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setApplications(data.certificates);
        setMessage("");
      } else {
        setMessage(data.message || "Failed to fetch applications");
      }
    } catch (error) {
      setMessage("Server error, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const openReviewModal = (app, action) => {
    setSelectedApp(app);
    setReviewAction(action);
    setReviewComments("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedApp(null);
    setReviewComments("");
    setReviewAction("");
  };

  const handleReviewSubmit = async () => {
    if (!selectedApp || !reviewAction) return;
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `https://gramconnect.onrender.com/api/certificates/${reviewAction}/${selectedApp._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ reviewComments }),
        }
      );
      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        setApplications((prev) =>
          reviewAction === "reject"
            ? prev.filter((app) => app._id !== selectedApp._id)
            : prev.map((app) =>
                app._id === selectedApp._id
                  ? { ...app, status: "Approved" }
                  : app
              )
        );
        closeModal();
      } else {
        setMessage(data.message || "Action failed");
      }
    } catch {
      setMessage("Server error, please try again.");
    }
  };

  return (
    <div className="admin-documents">
      <header className="header-section">
        <h1 className="page-title">Certificate Applications</h1>
        {message && <p className="message">{message}</p>}
      </header>

      {loading ? (
        <p className="loading-text">Loading applications...</p>
      ) : (
        <div className="table-wrapper">
          <table className="applications-table">
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Certificate Type</th>
                <th>Details</th>
                <th>Status</th>
                <th>Submitted At</th>
                <th className="actions-col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-row">
                    No applications found.
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app._id}>
                    <td>{app.applicant?.fullName || "Unknown"}</td>
                    <td>{app.certificateType}</td>
                    <td>
                      <ul className="details-list">
                        {app.details &&
                          Object.entries(app.details).map(([k, v]) => (
                            <li key={k}>
                              <strong>{k}:</strong> {String(v)}
                            </li>
                          ))}
                      </ul>
                    </td>
                    <td>
                      <span
                        className={`status-badge status-${
                          (app.status || "pending").toLowerCase()
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td>{new Date(app.createdAt).toLocaleString()}</td>
                    <td>
                      {app.status === "Pending" ? (
                        <div className="action-buttons">
                          <button
                            className="btn approve-btn"
                            onClick={() => openReviewModal(app, "approve")}
                          >
                            Approve
                          </button>
                          <button
                            className="btn reject-btn"
                            onClick={() => openReviewModal(app, "reject")}
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <em className="reviewed-text">Reviewed</em>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <header className="modal-header">
              <h2 id="modal-title" className="modal-title">
                {reviewAction === "approve"
                  ? "Approve Application"
                  : "Reject Application"}
              </h2>
              <p className="modal-description">
                {reviewAction === "approve"
                  ? "Please add comments for approval (optional):"
                  : "Please provide reason for rejection:"}
              </p>
            </header>
            <main className="modal-content">
              <textarea
                className="review-textarea"
                value={reviewComments}
                onChange={(e) => setReviewComments(e.target.value)}
                rows="5"
                placeholder="Write your comments here..."
                autoFocus
              />
            </main>
            <footer className="modal-footer">
              <button className="close-btn" onClick={closeModal}>
                Cancel
              </button>
              <button
                className={`btn submit-btn ${reviewAction}-btn`}
                onClick={handleReviewSubmit}
              >
                {reviewAction === "approve" ? "Approve" : "Reject"}
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDocuments;
