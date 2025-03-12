// src/pages/ProductPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productApi } from '../api/productApi';
import { useStoreContext } from '../context/StoreContext';
import { useCartContext } from '../context/CartContext';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import { formatCurrency } from '../utils/formatCurrency';

const ProductPage = () => {
  const { productId } = useParams();
  const { storeData } = useStoreContext();
  const { addToCart } = useCartContext();
  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProduct = async () => {
      if (!storeData || !storeData.id || !productId) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await productApi.getProduct(storeData.id, productId);
        setProduct(response.data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [storeData, productId]);
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) {
      setQuantity(value);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  if (loading) {
    return <Loader message="Loading product..." />;
  }
  
  if (error) {
    return <ErrorMessage message={error} />;
  }
  
  if (!product) {
    return <ErrorMessage message="Product not found" />;
  }
  
  return (
    <div className="product-page">
      <div className="container">
        <div className="product-details">
          <div className="product-gallery">
            <img 
              src={product.imageUrl || '/assets/placeholder-images/product.jpg'} 
              alt={product.name}
              className="product-main-image" 
            />
          </div>
          
          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-price">{formatCurrency(product.price)}</p>
            
            {product.description && (
              <div className="product-description">
                <p>{product.description}</p>
              </div>
            )}
            
            <div className="product-actions">
              <div className="quantity-selector">
                <label htmlFor="quantity">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                />
              </div>
              
              <Button 
                variant="primary" 
                size="large"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;