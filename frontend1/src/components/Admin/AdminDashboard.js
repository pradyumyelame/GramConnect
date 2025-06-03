import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

import {
  FileText,
  ClipboardList,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ShieldCheck,
  Users,
  Megaphone,
  CalendarCheck,
} from 'lucide-react';

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [grievances, setGrievances] = useState([]);
  const [schemes, setSchemes] = useState([]);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://gramconnect.onrender.com/api/certificates/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      return data.certificates || [];
    } catch {
      return [];
    }
  };

  const fetchGrievances = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://gramconnect.onrender.com/api/grievances/counts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      let arr = [];
      for (let i = 0; i < (data.pending || 0); i++) arr.push({ status: 'pending' });
      for (let i = 0; i < (data.resolved || 0); i++) arr.push({ status: 'resolved' });
      for (let i = 0; i < (data['in-progress'] || 0); i++) arr.push({ status: 'in-progress' });
      for (let i = 0; i < (data.rejected || 0); i++) arr.push({ status: 'rejected' });
      return arr;
    } catch {
      return [];
    }
  };

  const fetchSchemes = async () => [];
  const fetchNotices = async () => [];

  const loadAllData = useCallback(async () => {
    setLoading(true);
    try {
      const [apps, grievancesData, schemesData, noticesData] = await Promise.all([
        fetchApplications(),
        fetchGrievances(),
        fetchSchemes(),
        fetchNotices(),
      ]);
      setApplications(apps);
      setGrievances(grievancesData);
      setSchemes(schemesData);
      setNotices(noticesData);
    } catch {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  const stats = {
    applications: {
      total: applications.length,
      pending: applications.filter(app => app.status === 'Pending').length,
      approved: applications.filter(app => app.status === 'Approved').length,
      rejected: applications.filter(app => app.status === 'Rejected').length,
    },
    grievances: {
      total: grievances.length,
      pending: grievances.filter(g => g.status === 'pending').length,
      resolved: grievances.filter(g => g.status === 'resolved').length,
      inProgress: grievances.filter(g => g.status === 'in-progress').length,
    },
    schemes: {
      total: schemes.length,
      active: schemes.filter(s => s.status === 'active').length,
      inactive: schemes.filter(s => s.status === 'inactive').length,
    },
    community: {
      totalNotices: notices.length,
      activeNotices: notices.filter(n => n.status === 'active').length,
      meetings: notices.filter(n => n.type === 'meeting').length,
    },
  };

  if (loading) {
    return <div className="admin-dashboard"><p>Loading dashboard data...</p></div>;
  }

  if (error) {
    return <div className="admin-dashboard"><p>{error}</p></div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1><ShieldCheck size={28} /> Government Admin Dashboard</h1>
        <p>Manage Certificates, Grievances, Schemes & Notices Efficiently</p>
      </div>

      <div className="stats-section">
        <div className="stat-card bg-blue">
          <FileText size={32} className="card-icon" />
          <h2>{stats.applications.total}</h2>
          <p>Applications</p>
          <span>{stats.applications.pending} Pending</span>
        </div>
        <div className="stat-card bg-red">
          <AlertCircle size={32} className="card-icon" />
          <h2>{stats.grievances.total}</h2>
          <p>Grievances</p>
          <span>{stats.grievances.pending} Pending</span>
        </div>
        <div className="stat-card bg-green">
          <ClipboardList size={32} className="card-icon" />
          <h2>{stats.schemes.total}</h2>
          <p>Schemes</p>
          <span>{stats.schemes.active} Active</span>
        </div>
        <div className="stat-card bg-purple">
          <Megaphone size={32} className="card-icon" />
          <h2>{stats.community.totalNotices}</h2>
          <p>Notices</p>
          <span>{stats.community.meetings} Meetings</span>
        </div>
      </div>

      <div className="management-section">
        <div className="admin-panel">
          <div className="panel-content">
            <h3><FileText size={20} /> Certificate Applications</h3>
            <ul>
              <li><AlertCircle size={16} /> Pending: {stats.applications.pending}</li>
              <li><CheckCircle2 size={16} /> Approved: {stats.applications.approved}</li>
              <li><XCircle size={16} /> Rejected: {stats.applications.rejected}</li>
            </ul>
          </div>
          <Link to="/admin/admindocuments" className="admin-button">Manage Applications</Link>
        </div>

        <div className="admin-panel">
          <div className="panel-content">
            <h3><AlertCircle size={20} /> Grievance Management</h3>
            <ul>
              <li><Users size={16} /> Total: {stats.grievances.total}</li>
              <li><AlertCircle size={16} /> Pending: {stats.grievances.pending}</li>
              <li><ClipboardList size={16} /> In Progress: {stats.grievances.inProgress}</li>
              <li><CheckCircle2 size={16} /> Resolved: {stats.grievances.resolved}</li>
            </ul>
          </div>
          <Link to="/admin/grievances" className="admin-button">Manage Grievances</Link>
        </div>

        <div className="admin-panel">
          <div className="panel-content">
            <h3><ClipboardList size={20} /> Scheme Administration</h3>
            <ul>
              <li><Users size={16} /> Total: {stats.schemes.total}</li>
              <li><CheckCircle2 size={16} /> Active: {stats.schemes.active}</li>
              <li><XCircle size={16} /> Inactive: {stats.schemes.inactive}</li>
            </ul>
          </div>
          <Link to="/admin/schemes" className="admin-button">Manage Schemes</Link>
        </div>

        <div className="admin-panel">
          <div className="panel-content">
            <h3><Megaphone size={20} /> Community Notices</h3>
            <ul>
              <li><Users size={16} /> Total: {stats.community.totalNotices}</li>
              <li><CheckCircle2 size={16} /> Active: {stats.community.activeNotices}</li>
              <li><CalendarCheck size={16} /> Meetings: {stats.community.meetings}</li>
            </ul>
          </div>
          <Link to="/admin/notices" className="admin-button">Manage Notices</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
