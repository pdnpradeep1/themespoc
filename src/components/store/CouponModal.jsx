// src/components/store/CouponModal.jsx
import React, { useState, useEffect } from 'react';
import '../styles/CouponModal.css';

const CouponModal = ({ isOpen, onClose }) => {
  const [coupons, setCoupons] = useState([
    {
      code: 'FLAT11',
      description: 'You will save ₹11 with this coupon',
      details: 'Get ₹11 off on item total above ₹11. Applicable On both online and COD',
      showDetails: false
    },
    {
      code: 'FREEGIFTWRAP',
      description: 'You get item worth ₹1 for FREE.',
      details: 'Get Gift Wrap Packaging worth ₹1 FREE on every purchase. Applicable On both online and COD',
      showDetails: false
    },
    {
      code: '123123',
      description: '',
      details: 'Buy 3 item and get 2 item FREE on specific products. Applicable On both online and COD',
      showDetails: false,
      specificProducts: true
    },
    {
      code: 'BUY3GET4',
      description: '',
      details: 'Buy 3 item and get 1 item FREE on specific products. Applicable On both online and COD',
      showDetails: false,
      specificProducts: true
    },
    {
      code: 'PERCENT100',
      description: 'Add items worth ₹60 to get this offer',
      details: 'Get 12% off on item total above ₹100 (upto ₹12). Applicable On both online and COD',
      showDetails: false,
      additionalRequirement: true
    }
  ]);

  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Toggle details visibility for a coupon
  const toggleDetails = (index) => {
    setCoupons(coupons.map((coupon, i) => {
      if (i === index) {
        return { ...coupon, showDetails: !coupon.showDetails };
      }
      return coupon;
    }));
  };

  // Copy coupon code to clipboard
  const copyCode = (code) => {
    navigator.clipboard.writeText(code)
      .then(() => {
        // You could add a toast notification here
        console.log(`Code ${code} copied to clipboard`);
      })
      .catch(err => {
        console.error('Failed to copy code:', err);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="coupon-modal-overlay">
      <div className="coupon-modal">
        <div className="coupon-modal-header">
          <h2>Coupons and offers</h2>
          <button className="close-button" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        
        <div className="coupon-modal-content">
          <h3 className="coupon-section-title">Available coupons</h3>
          
          <div className="coupons-list">
            {coupons.map((coupon, index) => (
              <div key={coupon.code} className="coupon-item">
                <div className="coupon-code-container">
                  <span className="coupon-code">{coupon.code}</span>
                  <button 
                    className="copy-code-button" 
                    onClick={() => copyCode(coupon.code)}
                  >
                    COPY CODE
                  </button>
                </div>
                
                {coupon.description && (
                  <p className={coupon.additionalRequirement ? "coupon-description required" : "coupon-description"}>
                    {coupon.description}
                  </p>
                )}
                
                <p className="coupon-details">
                  {coupon.specificProducts ? (
                    <>
                      {coupon.details.split('specific products')[0]}
                      <a href="#" className="specific-products-link">specific products</a>
                      {coupon.details.split('specific products')[1]}
                    </>
                  ) : (
                    coupon.details
                  )}
                </p>
                
                <button 
                  className="details-toggle" 
                  onClick={() => toggleDetails(index)}
                >
                  Details {coupon.showDetails ? '↑' : '↓'}
                </button>
                
                {coupon.showDetails && (
                  <div className="details-content">
                    <p>Valid until: 30 Apr 2025</p>
                    <p>Max discount: ₹500</p>
                    <p>Min purchase: ₹0</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponModal;