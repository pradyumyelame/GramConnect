import React from 'react';
import './ContactPage.css';

const ContactPage = () => {
  return (
    <div className="contact-container">
      <h2 className="contact-title">Contact Us</h2>

      <div className="contact-grid">
        {/* Contact Form */}
        <div className="contact-card">
          <h3>Send us a message</h3>
          <form className="contact-form">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="example@email.com" required />
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input type="text" placeholder="Subject" required />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea rows="4" placeholder="Your message" required></textarea>
            </div>
            <button type="submit">Send Message</button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="contact-card contact-info">
          <h3>Our Contact Details</h3>
          <ul>
            <li>
              📞 <strong>Phone:</strong> <a href="tel:+919876543210">+91 98765 43210</a>
            </li>
            <li>
              📧 <strong>Email:</strong>{' '}
              <a href="mailto:support@tourplanner.com">support@tourplanner.com</a>
            </li>
            <li>
              📍 <strong>Address:</strong> A-204, Innovation Tower, Mumbai, Maharashtra, India
            </li>
            <li>
              🕒 <strong>Working Hours:</strong> Mon - Sat, 9:00 AM - 6:00 PM
            </li>
          </ul>
          <div className="contact-map">
            <iframe
              title="Our Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609979974!2d72.7410996322075!3d19.08219783960869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63c0fdd39bb%3A0x8423e1a48a4d99c1!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1689782495413!5m2!1sen!2sin"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
