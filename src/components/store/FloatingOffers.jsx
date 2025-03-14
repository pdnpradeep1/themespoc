// src/components/store/FloatingOffers.jsx
import React, { useState } from 'react';
import CouponModal from './CouponModal';
import './FloatingOffers.css';

const FloatingOffers = ({ 
  position = 'right', // 'left' or 'right'
  color = '#1b5e20', // Primary color
  vibrate = true, // Enable animation
  showBadge = true, // Show count badge
  couponsCount = 5
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button 
        className={`floating-offers ${position} ${vibrate ? 'vibrate' : ''}`}
        style={{ backgroundColor: color }}
        onClick={openModal}
        aria-label="View available offers"
      >
        <div className="offers-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
        </div>
        <span className="offers-text">Offers</span>
        {showBadge && couponsCount > 0 && (
          <span className="offers-badge">{couponsCount}</span>
        )}
      </button>
      
      <CouponModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default FloatingOffers;