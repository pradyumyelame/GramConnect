import React from 'react';
import {
  FileText, Award, MessageSquare, Users,
  ArrowRight, Clock, CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './Services.css';

const Services = () => {
  const services = [
    {
      icon: FileText,
      title: "Document Services",
      description: "Apply for essential certificates and documents online",
      colorClass: "orange-bg",
      iconColorClass: "orange-icon",
      documents: [
        "Birth Certificate",
        "Death Certificate",
        "Income Certificate",
        "Caste Certificate",
        "Residence Certificate"
      ],
      processingTime: "3-7 working days",
      linkTo: "/documents"
    },
    {
      icon: Award,
      title: "Government Schemes",
      description: "Access various central and state government welfare schemes",
      colorClass: "green-bg",
      iconColorClass: "green-icon",
      documents: [
        "PM-KISAN Scheme",
        "MNREGA Job Cards",
        "Pradhan Mantri Awas Yojana",
        "Ayushman Bharat",
        "Old Age Pension"
      ],
      processingTime: "Instant eligibility check",
      linkTo: "/schemes"
    },
    {
      icon: MessageSquare,
      title: "Grievance Portal",
      description: "Submit and track complaints with transparent resolution",
      colorClass: "blue-bg",
      iconColorClass: "blue-icon",
      documents: [
        "Water Supply Issues",
        "Road & Infrastructure",
        "Electricity Problems",
        "Public Health Concerns",
        "Administrative Complaints"
      ],
      processingTime: "15 days maximum",
      linkTo: "/grievances"
    },
    {
      icon: Users,
      title: "Community Services",
      description: "Participate in village development and community programs",
      colorClass: "purple-bg",
      iconColorClass: "purple-icon",
      documents: [
        "Village Meeting Minutes",
        "Development Project Updates",
        "Community Event Registration",
        "Volunteer Programs",
        "Local Announcements"
      ],
      processingTime: "Real-time updates",
      linkTo: "/notice-board"
    }
  ];

  return (
    <div className="services-page">
      <header className="header">
        <h2 className="header-title">Village Services Portal</h2>
      </header>

      {/* <section className="hero-section">
        <div className="hero-container">
          <h1 className="hero-title">Our Services</h1>
          <p className="hero-description">
            Comprehensive digital services designed to make village administration 
            more efficient and accessible for every citizen
          </p>
        </div>
      </section> */}

      <section className="services-section">
        <div className="services-container">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div key={idx} className={`service-card ${service.colorClass}`}>
                <div className="service-header">
                  <div className={`service-icon-wrapper ${service.iconColorClass}`}>
                    <Icon className="service-icon" />
                  </div>
                  <div className="service-header-text">
                    <h2 className="service-title">{service.title}</h2>
                    <p className="service-description">{service.description}</p>
                  </div>
                </div>

                <div className="service-content">
                  <div className="service-documents">
                    <h3 className="section-heading">
                      <CheckCircle className="icon-green" />
                      Available Services
                    </h3>
                    <ul className="documents-list">
                      {service.documents.map((doc, i) => (
                        <li key={i} className="document-item">
                          <ArrowRight className="icon-arrow" />
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="service-extra">
                    <div className="processing-time">
                      <h3 className="section-heading">
                        <Clock className="icon-blue" />
                        Processing Time
                      </h3>
                      <p className="processing-text">{service.processingTime}</p>
                    </div>

                    <Link to={service.linkTo} className={`service-button ${service.iconColorClass}`}>
                      Access Service
                      <ArrowRight className="button-icon" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 Village Services. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Services;
