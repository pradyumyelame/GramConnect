import React from 'react';
import { FileText, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../Documents/Documents.css';
const Documents = () => {
  const documents = [
    {
      id: 'birth-certificate',
      name: 'Birth Certificate',
      description: 'Official document proving birth details',
      requiredDocs: ['Hospital Records', 'Parent ID Proof', 'Address Proof'],
      processingTime: '3-5 working days',
      fees: '₹50',
      icon: FileText
    },
    {
      id: 'death-certificate',
      name: 'Death Certificate',
      description: 'Official document certifying death',
      requiredDocs: ['Medical Certificate', 'ID Proof of Deceased', 'Applicant ID Proof'],
      processingTime: '2-3 working days',
      fees: '₹50',
      icon: FileText
    },
    {
      id: 'income-certificate',
      name: 'Income Certificate',
      description: 'Certificate showing annual income details',
      requiredDocs: ['Salary Certificate', 'Bank Statements', 'Income Tax Returns'],
      processingTime: '5-7 working days',
      fees: '₹30',
      icon: FileText
    },
    {
      id: 'caste-certificate',
      name: 'Caste Certificate',
      description: 'Official caste verification document',
      requiredDocs: ['Community Certificate', 'ID Proof', 'Address Proof'],
      processingTime: '7-10 working days',
      fees: '₹30',
      icon: FileText
    },
    {
      id: 'residence-certificate',
      name: 'Residence Certificate',
      description: 'Proof of residence in the village',
      requiredDocs: ['Ration Card', 'Voter ID', 'Utility Bills'],
      processingTime: '3-5 working days',
      fees: '₹30',
      icon: FileText
    }
  ];

  return (
    <div className="documents-page">
      {/* Header placeholder */}
     

      <section className="documents-hero">
        <div className="container text-center">
          <h1 className="documents-title">Document Services</h1>
          <p className="documents-description">
            Apply for essential certificates and documents online with easy tracking
          </p>
        </div>
      </section>

      <section className="documents-list-section">
        <div className="container">
          <div className="documents-grid">
            {documents.map((doc) => {
              const Icon = doc.icon;
              return (
                <div key={doc.id} className="document-card">
                  <div className="document-icon-wrapper">
                    <Icon className="document-icon" />
                  </div>
                  <h2 className="document-card-title">{doc.name}</h2>
                  <p className="document-card-description">{doc.description}</p>

                  <div className="required-docs-section">
                    <h4>Required Documents:</h4>
                    <ul className="required-docs-list">
                      {doc.requiredDocs.map((reqDoc, idx) => (
                        <li key={idx} className="required-doc-item">
                          <CheckCircle className="check-icon" />
                          <span>{reqDoc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="processing-fees-row">
                    <div className="processing-time">
                      <Clock className="clock-icon" />
                      <span>{doc.processingTime}</span>
                    </div>
                    <div className="fees">{doc.fees}</div>
                  </div>

                  <Link to={`/documents/apply/${doc.id}`}>
                    <button className="service-button">Apply Now</button>
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="status-check-btn-wrapper">
            <Link to="/documents/documentstatus">
              <button className="status-check-button">Check Application Status</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer placeholder */}
      <footer className="footer-placeholder">Footer</footer>
    </div>
  );
};

export default Documents;
