import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DocumentApplication.css';

const DocumentApplication = () => {
  const { documentId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    motherName: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    phoneNumber: '',
    email: '',
    purpose: '',
    additionalInfo: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const documentDetails = {
    'birth-certificate': {
      name: 'Birth Certificate',
      specificFields: ['hospitalName', 'doctorName', 'birthTime', 'birthWeight'],
      description: 'Apply for official birth certificate',
    },
    'death-certificate': {
      name: 'Death Certificate',
      specificFields: ['deceasedName', 'dateOfDeath', 'placeOfDeath', 'causeOfDeath'],
      description: 'Apply for official death certificate',
    },
    'income-certificate': {
      name: 'Income Certificate',
      specificFields: ['occupation', 'annualIncome', 'employerName', 'workAddress'],
      description: 'Apply for income certificate',
    },
    'caste-certificate': {
      name: 'Caste Certificate',
      specificFields: ['caste', 'subCaste', 'religion', 'communityCategory'],
      description: 'Apply for caste certificate',
    },
    'residence-certificate': {
      name: 'Residence Certificate',
      specificFields: ['yearsOfResidence', 'previousAddress', 'landlordName', 'propertyType'],
      description: 'Apply for residence certificate',
    },
  };

  const currentDoc = documentDetails[documentId];

  if (!currentDoc) {
    return <div className="not-found">Document not found</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Generate unique application ID
  const generateApplicationId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `APP${timestamp}${random}`;
  };

  // Save application to localStorage for status tracking
  const saveApplicationToStorage = (applicationData) => {
    const existingApplications = JSON.parse(localStorage.getItem('applications') || '[]');
    const newApplication = {
      id: applicationData.applicationId,
      documentType: currentDoc.name,
      applicantName: applicationData.fullName,
      submittedDate: new Date().toLocaleDateString(),
      status: 'pending', // Default status
      ...applicationData
    };
    
    const updatedApplications = [...existingApplications, newApplication];
    localStorage.setItem('applications', JSON.stringify(updatedApplications));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = localStorage.getItem('token');
    if (!token) {
      alert('User not authenticated. Please log in.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Generate application ID
      const applicationId = generateApplicationId();

      // Prepare data to send — wrap form fields inside details object
      const { applicationId: _, ...otherFields } = formData;
      const dataToSend = {
        certificateType: documentId,
        details: {
          applicationId,
          ...otherFields,
        },
      };

      const response = await fetch('https://gramconnect.onrender.com/api/certificates/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to apply');
      }

      // Save application data locally for status tracking
      saveApplicationToStorage({ applicationId, ...formData });

      alert('Application submitted successfully!');
      navigate('/documents/documentstatus');

    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="application-container">
      <header className="app-header">
        <h1>{currentDoc.name} Application</h1>
        <p>{currentDoc.description}</p>
      </header>

      <form onSubmit={handleSubmit} className="application-form">
        {/* Common Fields */}
        {[
          ['fullName', 'Full Name *'],
          ['fatherName', "Father's Name *"],
          ['motherName', "Mother's Name *"],
          ['dateOfBirth', 'Date of Birth *', 'date'],
          ['gender', 'Gender *', 'select'],
          ['phoneNumber', 'Phone Number *', 'tel'],
          ['email', 'Email Address', 'email'],
        ].map(([name, label, type = 'text']) => (
          <div key={name} className="form-row">
            <label htmlFor={name}>{label}</label>
            {type === 'select' ? (
              <select 
                id={name} 
                name={name} 
                value={formData[name]} 
                onChange={handleInputChange} 
                required
                disabled={isSubmitting}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            ) : (
              <input
                type={type}
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                required={label.includes('*')}
                disabled={isSubmitting}
              />
            )}
          </div>
        ))}

        <div className="form-row full-width">
          <label htmlFor="address">Address *</label>
          <textarea
            id="address"
            name="address"
            rows="3"
            value={formData.address}
            onChange={handleInputChange}
            required
            disabled={isSubmitting}
          ></textarea>
        </div>

        <div className="form-row full-width">
          <label htmlFor="purpose">Purpose of Application *</label>
          <textarea
            id="purpose"
            name="purpose"
            rows="2"
            value={formData.purpose}
            onChange={handleInputChange}
            required
            disabled={isSubmitting}
          ></textarea>
        </div>

        {/* Dynamic Fields */}
        {currentDoc.specificFields.map((field) => (
          <div key={field} className="form-row">
            <label htmlFor={field}>
              {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </label>
            <input
              type={
                field.toLowerCase().includes('date') ? 'date' : 
                field.toLowerCase().includes('time') ? 'time' : 
                field.toLowerCase().includes('income') || field.toLowerCase().includes('weight') ? 'number' :
                'text'
              }
              id={field}
              name={field}
              value={formData[field] || ''}
              onChange={handleInputChange}
              disabled={isSubmitting}
              step={field.toLowerCase().includes('income') ? '0.01' : undefined}
            />
          </div>
        ))}

        <div className="form-row full-width">
          <label htmlFor="additionalInfo">Additional Information</label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            rows="3"
            value={formData.additionalInfo}
            onChange={handleInputChange}
            disabled={isSubmitting}
          ></textarea>
        </div>

        <button 
          type="submit" 
          className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
};

export default DocumentApplication;
