// src/components/store/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import { useCartContext } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatCurrency';

const ProductCard = ({ product }) => {
  const { addToCart } = useCartContext();
  
  if (!product) return null;
  
  const { id, name, price, imageUrl, description } = product;
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  return (
    <div className="product-card">
      <Link to={`/products/${id}`} className="product-link">
        <div className="product-image-container">
          <img 
            src={imageUrl || '/assets/placeholder-images/product.jpg'} 
            alt={name} 
            className="product-image"
          />
        </div>
        
        <div className="product-info">
          <h3 className="product-name">{name}</h3>
          <p className="product-price">{formatCurrency(price)}</p>
          
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
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;