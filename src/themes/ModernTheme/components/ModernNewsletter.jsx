// src/themes/ModernTheme/components/ModernNewsletter.jsx
import React, { useState } from 'react';
import Button from '../../../components/common/Button';

const ModernNewsletter = ({ 
  title = 'Stay Updated',
  description = 'Subscribe to our newsletter for exclusive offers and updates',
  style = 'default', // default, box, minimal, fullwidth
  placeholder = 'Your email address',
  buttonText = 'Subscribe',
  backgroundImage = null,
  backgroundColor = null
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    
    // In a real app, you would send this to your API
    console.log('Newsletter subscription:', email);
    
    // Show success message
    setSubscribed(true);
    setEmail('');
    setError('');
    
    // Reset after a few seconds
    setTimeout(() => {
      setSubscribed(false);
    }, 5000);
  };

  // Set style based on type
  const containerStyle = {};
  if (backgroundImage) {
    containerStyle.backgroundImage = `url(${backgroundImage})`;
  }
  if (backgroundColor) {
    containerStyle.backgroundColor = backgroundColor;
  }

  return (
    <section className="modern-newsletter-section" data-style={style}>
      <div 
        className="modern-newsletter"
        style={containerStyle}
      >
        <div className="newsletter-content">
          <h3 className="newsletter-title">{title}</h3>
          <p className="newsletter-description">{description}</p>
          
          {subscribed ? (
            <div className="newsletter-success">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <p>Thank you for subscribing!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="newsletter-form">
              <div className="form-input-group">
                <input
                  type="email"
                  className={`newsletter-input ${error ? 'has-error' : ''}`}
                  placeholder={placeholder}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  aria-label="Email address"
                />
                {error && <div className="input-error">{error}</div>}
              </div>
              
              <Button 
                type="submit" 
                variant={style === 'minimal' ? 'primary' : 'secondary'}
                className="newsletter-button"
              >
                {buttonText}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ModernNewsletter;