// src/components/common/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Newsletter from '../store/Newsletter';

const Footer = ({ 
  storeName, 
  contactEmail, 
  showSocialLinks = true, 
  showNewsletter = true,
  minimalist = false,
  bold = false
}) => {
  const footerClass = `site-footer ${minimalist ? 'minimalist' : ''} ${bold ? 'bold' : ''}`;
  
  const year = new Date().getFullYear();

  return (
    <footer className={footerClass}>
      <div className="footer-container">
        {showNewsletter && (
          <div className="footer-newsletter">
            <Newsletter />
          </div>
        )}
        
        <div className="footer-content">
          <div className="footer-info">
            <h3 className="footer-title">{storeName}</h3>
            <p className="footer-contact">
              <a href={`mailto:${contactEmail}`} className="footer-email">
                {contactEmail}
              </a>
            </p>
          </div>
          
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          {showSocialLinks && (
            <div className="social-links">
              <h4>Follow Us</h4>
              <div className="social-icons">
                <a href="#" className="social-icon facebook">Facebook</a>
                <a href="#" className="social-icon instagram">Instagram</a>
                <a href="#" className="social-icon twitter">Twitter</a>
              </div>
            </div>
          )}
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">
            © {year} {storeName}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;