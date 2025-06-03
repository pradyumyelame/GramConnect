import React, { useState, useEffect } from 'react';
import { Calendar, Bell, Plus, Edit, Trash2, Eye, ArrowLeft, Users, Megaphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import './AdminCommunity.css';
const AdminCommunity = () => {
  const [notices, setNotices] = useState([]);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [isAddingNotice, setIsAddingNotice] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'announcement',
    priority: 'medium',
    location: '',
    date: '',
    time: '',
    status: 'active'
  });

  useEffect(() => {
    const storedNotices = JSON.parse(localStorage.getItem('adminNotices') || '[]');
    setNotices(storedNotices);
  }, []);

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      type: 'announcement',
      priority: 'medium',
      location: '',
      date: '',
      time: '',
      status: 'active'
    });
  };

  const handleAddNotice = () => {
    const newNotice = {
      id: Date.now().toString(),
      ...formData,
      author: 'Admin',
      createdDate: new Date().toLocaleDateString(),
      lastUpdated: new Date().toLocaleDateString()
    };
    const updatedNotices = [...notices, newNotice];
    setNotices(updatedNotices);
    localStorage.setItem('adminNotices', JSON.stringify(updatedNotices));
    setIsAddingNotice(false);
    resetForm();
    alert('Notice added successfully!');
  };

  const handleUpdateNotice = () => {
    const updatedNotices = notices.map(notice =>
      notice.id === editingNotice.id
        ? { ...formData, id: editingNotice.id, author: editingNotice.author, createdDate: editingNotice.createdDate, lastUpdated: new Date().toLocaleDateString() }
        : notice
    );
    setNotices(updatedNotices);
    localStorage.setItem('adminNotices', JSON.stringify(updatedNotices));
    setEditingNotice(null);
    resetForm();
    alert('Notice updated successfully!');
  };

  const handleDeleteNotice = (id) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      const updatedNotices = notices.filter(n => n.id !== id);
      setNotices(updatedNotices);
      localStorage.setItem('adminNotices', JSON.stringify(updatedNotices));
      alert('Notice deleted successfully!');
    }
  };

  const startEdit = (notice) => {
    setFormData({ ...notice });
    setEditingNotice(notice);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-700';
      case 'medium': return 'text-yellow-700';
      case 'low': return 'text-green-700';
      default: return 'text-gray-700';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'meeting': return <Users className="inline-block h-4 w-4 mr-1" />;
      case 'announcement': return <Megaphone className="inline-block h-4 w-4 mr-1" />;
      case 'event': return <Calendar className="inline-block h-4 w-4 mr-1" />;
      default: return <Bell className="inline-block h-4 w-4 mr-1" />;
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <Link to="/admin/admindashboard" className="inline-flex items-center mb-4 text-blue-600 hover:underline">
        <ArrowLeft className="h-5 w-5 mr-1" />
        Back to Dashboard
      </Link>

      <h1 className="text-3xl font-bold mb-2">Community Management</h1>
      <p className="mb-6 text-gray-700">Schedule meetings, add notices, and manage community announcements</p>

      <button
        className="bg-purple-600 text-white px-4 py-2 rounded mb-6 flex items-center"
        onClick={() => setIsAddingNotice(true)}
      >
        <Plus className="h-4 w-4 mr-2" /> Add New Notice
      </button>

      {notices.length === 0 ? (
        <div className="text-center text-gray-500">
          <Bell className="mx-auto mb-2" />
          No notices found. Add your first notice.
        </div>
      ) : (
        <table className="w-full border-collapse border border-gray-300 mb-10">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2 text-left">Title</th>
              <th className="border border-gray-300 p-2 text-left">Type</th>
              <th className="border border-gray-300 p-2 text-left">Priority</th>
              <th className="border border-gray-300 p-2 text-left">Date/Time</th>
              <th className="border border-gray-300 p-2 text-left">Status</th>
              <th className="border border-gray-300 p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notices.map(notice => (
              <tr key={notice.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2">
                  {getTypeIcon(notice.type)} {notice.title}
                </td>
                <td className="border border-gray-300 p-2">{notice.type}</td>
                <td className={`border border-gray-300 p-2 font-semibold ${getPriorityColor(notice.priority)}`}>
                  {notice.priority}
                </td>
                <td className="border border-gray-300 p-2">
                  {notice.date && notice.time ? `${notice.date} ${notice.time}` : notice.createdDate}
                </td>
                <td className="border border-gray-300 p-2">
                  <span className={notice.status === 'active' ? 'text-green-700' : 'text-gray-700'}>
                    {notice.status}
                  </span>
                </td>
                <td className="border border-gray-300 p-2 space-x-2">
                  <button
                    onClick={() => setSelectedNotice(notice)}
                    className="text-blue-600 hover:underline"
                    title="View"
                  >
                    <Eye className="inline-block h-4 w-4" />
                  </button>
                  <button
                    onClick={() => startEdit(notice)}
                    className="text-yellow-600 hover:underline"
                    title="Edit"
                  >
                    <Edit className="inline-block h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteNotice(notice.id)}
                    className="text-red-600 hover:underline"
                    title="Delete"
                  >
                    <Trash2 className="inline-block h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Add/Edit Notice Modal */}
      {(isAddingNotice || editingNotice) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded shadow-lg w-full max-w-3xl max-h-[90vh] overflow-auto p-6">
            <h2 className="text-xl font-bold mb-4">{editingNotice ? 'Edit Notice' : 'Add New Notice'}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="title" className="block font-semibold mb-1">Notice Title</label>
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="Enter notice title"
                />
              </div>
              <div>
                <label htmlFor="type" className="block font-semibold mb-1">Type</label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={e => setFormData({ ...formData, type: e.target.value })}
                  className="w-full border border-gray-300 rounded p-2"
                >
                  <option value="announcement">Announcement</option>
                  <option value="meeting">Meeting</option>
                  <option value="event">Event</option>
                  <option value="alert">Alert</option>
                </select>
              </div>
              <div>
                <label htmlFor="priority" className="block font-semibold mb-1">Priority</label>
                <select
                  id="priority"
                  value={formData.priority}
                  onChange={e => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full border border-gray-300 rounded p-2"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label htmlFor="status" className="block font-semibold mb-1">Status</label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value })}
                  className="w-full border border-gray-300 rounded p-2"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label htmlFor="location" className="block font-semibold mb-1">Location</label>
                <input
                  id="location"
                  type="text"
                  value={formData.location}
                  onChange={e => setFormData({ ...formData, location: e.target.value })}
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="Location (optional)"
                />
              </div>
              <div>
                <label htmlFor="date" className="block font-semibold mb-1">Date</label>
                <input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div>
                <label htmlFor="time" className="block font-semibold mb-1">Time</label>
                <input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={e => setFormData({ ...formData, time: e.target.value })}
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="content" className="block font-semibold mb-1">Content</label>
              <textarea
                id="content"
                value={formData.content}
                onChange={e => setFormData({ ...formData, content: e.target.value })}
                rows={5}
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Enter notice content"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setIsAddingNotice(false);
                  setEditingNotice(null);
                  resetForm();
                }}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              {editingNotice ? (
                <button
                  onClick={handleUpdateNotice}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Update Notice
                </button>
              ) : (
                <button
                  onClick={handleAddNotice}
                  className="bg-purple-600 text-white px-4 py-2 rounded"
                >
                  Add Notice
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Selected Notice View */}
      {selectedNotice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded shadow-lg w-full max-w-2xl max-h-[90vh] overflow-auto p-6">
            <h2 className="text-2xl font-bold mb-4">{selectedNotice.title}</h2>
            <p className="mb-2"><strong>Type:</strong> {selectedNotice.type}</p>
            <p className="mb-2"><strong>Priority:</strong> {selectedNotice.priority}</p>
            <p className="mb-2"><strong>Status:</strong> {selectedNotice.status}</p>
            <p className="mb-2"><strong>Location:</strong> {selectedNotice.location || 'N/A'}</p>
            <p className="mb-2"><strong>Date/Time:</strong> {selectedNotice.date} {selectedNotice.time}</p>
            <p className="mb-4"><strong>Content:</strong></p>
            <p className="whitespace-pre-wrap">{selectedNotice.content}</p>

            <button
              onClick={() => setSelectedNotice(null)}
              className="mt-6 bg-gray-300 px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCommunity;
