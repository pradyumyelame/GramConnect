// ===== FRONTEND: AdminSchemes.jsx =====
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import './AdminSchemes.css';

const AdminSchemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [newScheme, setNewScheme] = useState({
    name: '', eligibility: '', benefits: '', link: '', category: '', targetState: '',
  });
  const [editingScheme, setEditingScheme] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      const res = await axios.get('https://gramconnect.onrender.com/api/schemes');
      setSchemes(res.data);
    } catch (err) {
      console.error('Error fetching schemes:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingScheme) setEditingScheme({ ...editingScheme, [name]: value });
    else setNewScheme({ ...newScheme, [name]: value });
  };

  const handleAddScheme = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://gramconnect.onrender.com/api/schemes', newScheme);
      setNewScheme({ name: '', eligibility: '', benefits: '', link: '', category: '', targetState: '' });
      setShowAddForm(false);
      fetchSchemes();
    } catch (err) {
      console.error('Error adding scheme:', err);
    }
  };

  const handleEditClick = (scheme) => {
    setEditingScheme({
      ...scheme,
      eligibility: scheme.eligibilityCriteria?.others || '',
      benefits: scheme.description || '',
      link: scheme.applyLink || '',
      category: scheme.category || '',
      targetState: scheme.eligibilityCriteria?.targetState || '',
    });
    setShowAddForm(false);
  };

  const handleUpdateScheme = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://gramconnect.onrender.com/api/schemes/${editingScheme._id}`, editingScheme);
      setEditingScheme(null);
      fetchSchemes();
    } catch (err) {
      console.error('Error updating scheme:', err);
    }
  };

  const handleDeleteScheme = async (id) => {
    if (!window.confirm('Are you sure you want to delete this scheme?')) return;
    try {
      await axios.delete(`https://gramconnect.onrender.com/api/schemes/${id}`);
      fetchSchemes();
    } catch (err) {
      console.error('Error deleting scheme:', err);
    }
  };

  return (
    <div className="admin-schemes-container">
      <header className="header">
        <h1>Government Schemes</h1>
        <button className="btn-add" onClick={() => {
          setShowAddForm(true);
          setEditingScheme(null);
        }}>
          <Plus size={18} /> Add Scheme
        </button>
      </header>

      {(showAddForm || editingScheme) && (
        <form className="form-scheme" onSubmit={editingScheme ? handleUpdateScheme : handleAddScheme}>
          <h2>{editingScheme ? 'Edit Scheme' : 'Add New Scheme'}</h2>
          <input type="text" name="name" placeholder="Scheme Name" value={editingScheme ? editingScheme.name : newScheme.name} onChange={handleInputChange} required />
          <input type="text" name="eligibility" placeholder="Eligibility" value={editingScheme ? editingScheme.eligibility : newScheme.eligibility} onChange={handleInputChange} required />
          <input type="text" name="benefits" placeholder="Benefits" value={editingScheme ? editingScheme.benefits : newScheme.benefits} onChange={handleInputChange} required />
          <input type="url" name="link" placeholder="Official Link" value={editingScheme ? editingScheme.link : newScheme.link} onChange={handleInputChange} required />
          <input type="text" name="category" placeholder="Category" value={editingScheme ? editingScheme.category : newScheme.category} onChange={handleInputChange} />
          <input type="text" name="targetState" placeholder="Target State" value={editingScheme ? editingScheme.targetState : newScheme.targetState} onChange={handleInputChange} />
          <div className="form-buttons">
            <button type="submit" className="btn-save"><CheckCircle size={16} /> {editingScheme ? 'Update' : 'Save'}</button>
            <button type="button" className="btn-cancel" onClick={() => {
              setEditingScheme(null);
              setShowAddForm(false);
            }}>
              <XCircle size={16} /> Cancel
            </button>
          </div>
        </form>
      )}

      {!showAddForm && !editingScheme && (
        <table className="schemes-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Eligibility</th>
              <th>Benefits</th>
              <th>Category</th>
              <th>Target State</th>
              <th>Link</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {schemes.map((scheme) => (
              <tr key={scheme._id}>
                <td>{scheme.name}</td>
                <td>{scheme.eligibilityCriteria?.others || '-'}</td>
                <td>{scheme.description}</td>
                <td>{scheme.category}</td>
                <td>{scheme.eligibilityCriteria?.targetState || '-'}</td>
                <td>
                  <a href={scheme.applyLink} target="_blank" rel="noopener noreferrer" className="link">
                    <Eye size={16} />
                  </a>
                </td>
                <td className="actions">
                  <button className="btn-action btn-edit" onClick={() => handleEditClick(scheme)} title="Edit Scheme"><Edit size={16} /></button>
                  <button className="btn-action btn-delete" onClick={() => handleDeleteScheme(scheme._id)} title="Delete Scheme"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminSchemes;
