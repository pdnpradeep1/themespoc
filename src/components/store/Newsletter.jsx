// src/components/store/Newsletter.jsx
import React, { useState } from 'react';
import Button from '../common/Button';

const Newsletter = ({ 
  title = 'Subscribe to our Newsletter', 
  description = 'Sign up for our newsletter to receive updates and exclusive offers.'
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, you would send this to your API
    console.log('Newsletter subscription:', email);
    
    // Show success message
    setSubscribed(true);
    setEmail('');
    
    // Reset after a few seconds
    setTimeout(() => {
      setSubscribed(false);
    }, 5000);
  };

  return (
    <div className="newsletter-container">
      <h3 className="newsletter-title">{title}</h3>
      <p className="newsletter-description">{description}</p>
      
      {subscribed ? (
        <div className="newsletter-success">
          Thank you for subscribing!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="newsletter-form">
          <input
            type="email"
            className="newsletter-input"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <Button type="submit" variant="secondary">
            Subscribe
          </Button>
        </form>
      )}
    </div>
  );
};

export default Newsletter;