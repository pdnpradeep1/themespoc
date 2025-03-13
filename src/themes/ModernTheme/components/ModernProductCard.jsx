// src/themes/ModernTheme/components/ModernProductCard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/common/Button';
import { useCartContext } from '../../../context/CartContext';
import { formatCurrency } from '../../../utils/formatCurrency';
import { useModernTheme } from '../ThemeContext';

const ModernProductCard = ({ product, style }) => {
  const { addToCart } = useCartContext();
  const { isDarkMode } = useModernTheme();
  const [isHovered, setIsHovered] = useState(false);
  
  if (!product) return null;
  
  const { id, name, price, imageUrl, description, discount, rating, tags } = product;
  
  const originalPrice = discount ? price / (1 - discount / 100) : null;
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };
  
  const cardClass = `
    product-card 
    ${isDarkMode ? 'dark-mode' : ''}
    ${isHovered ? 'is-hovered' : ''}
  `;

  return (
    <div 
      className={cardClass}
      data-style={style || 'modern'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/products/${id}`} className="product-link">
        <div className="product-image-container">
          <img 
            src={imageUrl || '/assets/placeholder-images/product.jpg'} 
            alt={name} 
            className="product-image"
          />
          
          {discount > 0 && (
            <div className="product-badge discount-badge">
              -{discount}%
            </div>
          )}
          
          {tags?.includes('new') && (
            <div className="product-badge new-badge">
              New
            </div>
          )}
          
          <div className="quick-actions">
            <button
              className="quick-action-btn wishlist-btn"
              title="Add to wishlist"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Add wishlist functionality
                console.log('Add to wishlist:', name);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
            <button
              className="quick-action-btn quickview-btn"
              title="Quick view"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Add quick view functionality
                console.log('Quick view:', name);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="product-info">
          {rating && (
            <div className="product-rating">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={`star ${i < Math.round(rating) ? 'filled' : ''}`}>★</span>
              ))}
              <span className="rating-number">({rating})</span>
            </div>
          )}
          
          <h3 className="product-name">{name}</h3>
          
          <div className="product-price-container">
            <p className="product-price">{formatCurrency(price)}</p>
            {originalPrice && (
              <p className="product-original-price">{formatCurrency(originalPrice)}</p>
            )}
          </div>
          
          {description && (
            <p className="product-description">
              {description.length > 60 ? `${description.substring(0, 60)}...` : description}
            </p>
          )}
        </div>
      </Link>
      
      <div className="product-actions">
        <Button 
          variant="primary" 
          onClick={handleAddToCart}
          fullWidth
          className="add-to-cart-btn"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ModernProductCard;