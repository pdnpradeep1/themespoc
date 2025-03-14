// src/components/store/PromotionBanner.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PromotionBanner.css';

const PromotionBanner = ({ 
  message = 'Get 10% OFF on all products. Limited time offer!',
  link = '/sale',
  linkText = 'Shop Now',
  bgColor = '#1F6B75',
  textColor = '#ffffff',
  enableTimer = true,
  endTime = null, // Pass a Date object or null for no timer
  showClose = true,
  position = 'top' // 'top' or 'bottom'
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Calculate remaining time if endTime is provided
  useEffect(() => {
    if (!enableTimer || !endTime) return;

    const targetDate = new Date(endTime);
    
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate - now;
      
      if (difference <= 0) {
        // Offer expired
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
        return;
      }
      
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    };
    
    // Initial calculation
    calculateTimeLeft();
    
    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [enableTimer, endTime]);

  const handleClose = () => {
    setIsVisible(false);
    
    // Optional: Save to localStorage to keep it closed between page loads
    localStorage.setItem('promotionBannerClosed', 'true');
  };

  // Check localStorage on first render to respect previous close action
  useEffect(() => {
    const wasClosed = localStorage.getItem('promotionBannerClosed') === 'true';
    if (wasClosed) setIsVisible(false);
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={`promotion-banner ${position}`}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="promotion-content">
        <p className="promotion-message">{message}</p>
        
        {enableTimer && endTime && (
          <div className="promotion-timer">
            <div className="timer-unit">
              <span className="timer-value">{String(timeLeft.days).padStart(2, '0')}</span>
              <span className="timer-label">Days</span>
            </div>
            <div className="timer-separator">:</div>
            <div className="timer-unit">
              <span className="timer-value">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="timer-label">Hours</span>
            </div>
            <div className="timer-separator">:</div>
            <div className="timer-unit">
              <span className="timer-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="timer-label">Mins</span>
            </div>
            <div className="timer-separator">:</div>
            <div className="timer-unit">
              <span className="timer-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="timer-label">Secs</span>
            </div>
          </div>
        )}
        
        {link && linkText && (
          <Link to={link} className="promotion-link">
            {linkText}
          </Link>
        )}
      </div>
      
      {showClose && (
        <button 
          className="promotion-close" 
          onClick={handleClose}
          aria-label="Close promotion"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default PromotionBanner;