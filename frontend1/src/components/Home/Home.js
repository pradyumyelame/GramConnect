import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import {
  FaUserFriends,
  FaUserShield,
  FaWhatsapp,
  FaUsers,
  FaFileAlt,
  FaAward,
  FaCommentDots,
  FaFile,
  FaRegComment,
  FaUsersCog,
  FaPhoneAlt,
  FaEnvelope,
  FaLightbulb,
  FaHandshake,
  FaShieldAlt
} from 'react-icons/fa';
import slide1 from '../../assets/1.jpeg';
import slide2 from '../../assets/slide2.avif';
import slide3 from '../../assets/5.png';
const dummyImages = [
  slide1,
  slide2,
  slide3
];

const Home = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === dummyImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Sliding Images Section */}
      <div className="Home1">
        <img
          src={dummyImages[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="slide-image"
        />
      </div>

      {/* About GramConnect Section */}
      <div className="about-section">
        <div className="about-container">
          <div className="about-header">
            <h1 className="about-title">GramConnect</h1>
            <h2 className="about-subtitle">Digital Grampanchayat Portal</h2>
          </div>
          
          <div className="about-content">
            <div className="about-description">
              <p className="main-description">
                GramConnect is a revolutionary digital platform designed to bridge the gap between rural communities 
                and government services. Our mission is to empower every village citizen with seamless access to 
                essential government services, documents, and community programs through a user-friendly digital interface.
              </p>
            </div>

            <div className="about-features">
              <div className="feature-grid">
                <div className="feature-item">
                  <div className="feature-icon">
                    <FaLightbulb />
                  </div>
                  <div className="feature-content">
                    <h3>Innovation</h3>
                    <p>Cutting-edge technology solutions tailored for rural governance and community development.</p>
                  </div>
                </div>
                
                <div className="feature-item">
                  <div className="feature-icon">
                    <FaHandshake />
                  </div>
                  <div className="feature-content">
                    <h3>Accessibility</h3>
                    <p>Simple, intuitive interface designed for users of all technical backgrounds and literacy levels.</p>
                  </div>
                </div>
                
                <div className="feature-item">
                  <div className="feature-icon">
                    <FaShieldAlt />
                  </div>
                  <div className="feature-content">
                    <h3>Trust & Security</h3>
                    <p>Secure, reliable platform ensuring data privacy and transparent service delivery.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="vision-mission">
              <div className="vision-mission-grid">
                <div className="vision-card">
                  <h3>Our Vision</h3>
                  <p>
                    To create a digitally empowered rural India where every citizen has equal access to 
                    government services and participates actively in the democratic governance process.
                  </p>
                </div>
                
                <div className="mission-card">
                  <h3>Our Mission</h3>
                  <p>
                    To eliminate bureaucratic barriers, reduce documentation delays, and ensure transparent, 
                    efficient delivery of government services to rural communities across India.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="stats-section">
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon icon-blue"><FaUsers /></div>
            <h3 className="stat-number">10,000+</h3>
            <p className="stat-label">Registered Citizens</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon icon-green"><FaFileAlt /></div>
            <h3 className="stat-number">5,000+</h3>
            <p className="stat-label">Documents Processed</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon icon-orange"><FaAward /></div>
            <h3 className="stat-number">50+</h3>
            <p className="stat-label">Government Schemes</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon icon-purple"><FaCommentDots /></div>
            <h3 className="stat-number">95%</h3>
            <p className="stat-label">Grievances Resolved</p>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="services-grid">
        <div className="service-card orange-bg">
          <FaFile className="service-icon orange" />
          <div className="service-text">
            <h3>Document Services</h3>
            <p>Apply for Birth Certificate, Death Certificate, Income Certificate, and other official documents online</p>
            <button className="access-btn">Access Service →</button>
          </div>
        </div>
        <div className="service-card green-bg">
          <div className="green-circle" />
          <div className="service-text">
            <h3>Government Schemes</h3>
            <p>Access and apply for various government schemes like PM-KISAN, MNREGA, housing schemes, and more</p>
            <button className="access-btn">Access Service →</button>
          </div>
        </div>
        <div className="service-card blue-bg">
          <FaRegComment className="service-icon blue" />
          <div className="service-text">
            <h3>Grievance Portal</h3>
            <p>Submit complaints and track the status of your grievances with transparent resolution process</p>
            <button className="access-btn">Access Service →</button>
          </div>
        </div>
        <div className="service-card purple-bg">
          <FaUsersCog className="service-icon purple" />
          <div className="service-text">
            <h3>Community Services</h3>
            <p>Village meetings, announcements, community development programs, and local events</p>
            <button className="access-btn">Access Service →</button>
          </div>
        </div>
      </div>

      {/* Why Choose Section */}
      <div className="why-choose-section">
        <h2 className="why-choose-title">Why Choose GramConnect?</h2>
        <div className="why-choose-cards">
          <div className="why-card">
            <div className="why-icon orange-bg"><FaPhoneAlt /></div>
            <h3>24/7 Accessibility</h3>
            <p>Access government services anytime, anywhere through our digital platform</p>
          </div>
          <div className="why-card">
            <div className="why-icon green-bg"><FaAward /></div>
            <h3>Transparent Process</h3>
            <p>Track your applications and grievances with complete transparency and accountability</p>
          </div>
          <div className="why-card">
            <div className="why-icon blue-bg"><FaUsers /></div>
            <h3>Community Focused</h3>
            <p>Built specifically for village-level administration and rural community needs</p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="contact-section">
        <h2 className="contact-title">Get in Touch</h2>
        <p className="contact-subtitle">Have questions or need assistance? Our support team is here to help.</p>
        <div className="contact-methods">
          <div className="contact-item">
            <div className="contact-icon icon-call">
              <FaPhoneAlt />
            </div>
            <div>
              <strong>Call Us</strong><br />
              1800-XXX-XXXX
            </div>
          </div>
          <div className="contact-item">
            <div className="contact-icon icon-email">
              <FaEnvelope />
            </div>
            <div>
              <strong>Email Us</strong><br />
              support@gramconnect.gov.in
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;