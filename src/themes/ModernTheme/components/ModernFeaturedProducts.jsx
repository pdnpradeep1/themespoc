// src/themes/ModernTheme/components/ModernFeaturedProducts.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ModernProductCard from './ModernProductCard';
import Button from '../../../components/common/Button';

const ModernFeaturedProducts = ({ 
  products = [], 
  title = 'Featured Products', 
  viewAllLink = '/products',
  viewAllText = 'View All Products',
  showViewAll = true,
  layout = 'grid',
  columns = 4,
  maxProducts = 8
}) => {
  const [activeTab, setActiveTab] = useState('all');
  
  if (!products || products.length === 0) {
    return null;
  }
  
  // Get all unique product categories or collections
  const categories = ['all', ...new Set(products.map(product => product.category || product.collection))];
  
  // Filter products based on active tab
  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(product => (product.category || product.collection) === activeTab);
  
  // Limit the number of products shown
  const displayProducts = filteredProducts.slice(0, maxProducts);
  
  return (
    <section className="modern-featured-products">
      <div className="container">
        <div className="featured-header">
          <h2 className="section-title">{title}</h2>
          
          {categories.length > 1 && (
            <div className="product-tabs">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`tab-button ${activeTab === category ? 'active' : ''}`}
                  onClick={() => setActiveTab(category)}
                >
                  {category === 'all' ? 'All' : category}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className={`product-grid product-grid-${columns}`} data-layout={layout}>
          {displayProducts.map(product => (
            <ModernProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {showViewAll && products.length > maxProducts && (
          <div className="view-all-container">
            <Link to={viewAllLink}>
              <Button variant="secondary" className="view-all-button">
                {viewAllText}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ModernFeaturedProducts;