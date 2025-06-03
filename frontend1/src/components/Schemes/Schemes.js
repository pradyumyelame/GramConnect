import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Award, Users, Home, Heart, Banknote, ArrowRight, ExternalLink } from 'lucide-react';
import './Schemes.css';

const iconMap = {
  Agriculture: Banknote,
  Employment: Users,
  Housing: Home,
  Health: Heart,
  Pension: Users,
  Education: Award,
  Central: Award,
  State: Users,
};

const staticSchemes = [
  {
    icon: Banknote,
    title: "PM-KISAN Scheme",
    description: "Direct income support to small and marginal farmers",
    benefit: "₹6,000 per year",
    eligibility: "Small & marginal farmers with cultivable land",
    status: "Active",
    colorClass: "scheme-green",
    documents: ["Land Records", "Aadhaar Card", "Bank Account Details"],
    link: "https://pmkisan.gov.in/"
  },
  {
    icon: Users,
    title: "MNREGA",
    description: "Guaranteed employment scheme for rural households",
    benefit: "100 days guaranteed work",
    eligibility: "Adult members of rural households",
    status: "Active", 
    colorClass: "scheme-blue",
    documents: ["Job Card", "Aadhaar Card", "Bank Account"],
    link: "https://nrega.nic.in/"
  },
  {
    icon: Home,
    title: "Pradhan Mantri Awas Yojana",
    description: "Housing scheme for economically weaker sections",
    benefit: "₹1.2-2.5 Lakh subsidy",
    eligibility: "Families without pucca house",
    status: "Active",
    colorClass: "scheme-orange",
    documents: ["Income Certificate", "Aadhaar Card", "Property Documents"],
    link: "https://pmaymis.gov.in/"
  },
  {
    icon: Heart,
    title: "Ayushman Bharat",
    description: "Health insurance scheme for poor families",
    benefit: "₹5 Lakh health cover",
    eligibility: "Families listed in SECC database",
    status: "Active",
    colorClass: "scheme-red",
    documents: ["Ration Card", "Aadhaar Card", "SECC Certificate"],
    link: "https://pmjay.gov.in/"
  },
  {
    icon: Users,
    title: "Old Age Pension",
    description: "Monthly pension for senior citizens",
    benefit: "₹1,000 per month",
    eligibility: "Citizens above 60 years with low income",
    status: "Active",
    colorClass: "scheme-purple",
    documents: ["Age Proof", "Income Certificate", "Bank Account"],
    link: "https://nsap.nic.in/"
  },
  {
    icon: Award,
    title: "Beti Bachao Beti Padhao",
    description: "Girl child welfare and education scheme",
    benefit: "Educational support & awareness",
    eligibility: "Girl children and their families",
    status: "Active",
    colorClass: "scheme-pink",
    documents: ["Birth Certificate", "School Enrollment", "Aadhaar Card"],
    link: "https://wcd.nic.in/bbbp-scheme"
  }
];

const Schemes = () => {
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const res = await axios.get('https://gramconnect.onrender.com/api/schemes');
        const backendSchemes = res.data.map((scheme) => ({
          icon: iconMap[scheme.category] || Award,
          title: scheme.name,
          description: scheme.description,
          benefit: scheme.description,
          eligibility: scheme.eligibilityCriteria?.others || "Not specified",
          status: scheme.status || "Active",
          colorClass: "scheme-blue",
          documents: scheme.documents || [],
          link: scheme.applyLink || "#"
        }));
        setSchemes([...staticSchemes, ...backendSchemes]);
      } catch (err) {
        console.error('Error fetching schemes:', err);
        setSchemes(staticSchemes);
      }
    };

    fetchSchemes();
  }, []);

  return (
    <div className="schemes-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Government Schemes</h1>
          <p className="hero-description">
            Access various central and state government welfare schemes designed 
            to support rural communities and improve quality of life
          </p>
        </div>
      </section>

      <section className="schemes-section">
        <div className="schemes-grid">
          {schemes.map((scheme, index) => (
            <div key={index} className={`scheme-card ${scheme.colorClass}`}>
              <div className="scheme-header">
                <div className="scheme-header-content">
                  <div className="scheme-icon-container">
                    <div className={`scheme-icon-wrapper ${scheme.colorClass}-icon`}>
                      <scheme.icon className="scheme-icon" />
                    </div>
                    <div className="scheme-title-container">
                      <h3 className="scheme-title">{scheme.title}</h3>
                      <span className="scheme-status">{scheme.status}</span>
                    </div>
                  </div>
                </div>
                <p className="scheme-description">{scheme.description}</p>
              </div>
              <div className="scheme-content">
                <div className="scheme-details">
                  <div className="scheme-benefit">
                    <h4 className="detail-label">Benefit</h4>
                    <p className={`benefit-amount ${scheme.colorClass}-text`}>
                      {scheme.benefit}
                    </p>
                  </div>
                  <div className="scheme-eligibility">
                    <h4 className="detail-label">Eligibility</h4>
                    <p className="eligibility-text">{scheme.eligibility}</p>
                  </div>
                  <div className="scheme-documents">
                    <h4 className="detail-label">Required Documents</h4>
                    <ul className="documents-list">
                      {scheme.documents.map((doc, idx) => (
                        <li key={idx} className="document-item">
                          <ArrowRight className="document-arrow" />
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="scheme-actions">
                    <a
                      href={scheme.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`apply-button ${scheme.colorClass}-button`}
                    >
                      Apply Now
                      <ArrowRight className="button-arrow" />
                    </a>
                    <button className="details-button">
                      <ExternalLink className="details-icon" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Schemes;
