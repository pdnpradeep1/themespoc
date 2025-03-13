// src/themes/ModernTheme/components/ModernCategories.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ModernCategories = ({ 
  categories = [], 
  title = 'Shop by Category',
  layout = 'grid',
  maxCategories = 6
}) => {
  if (!categories || categories.length === 0) {
    return null;
  }
  
  // Limit the number of categories shown
  const displayCategories = categories.slice(0, maxCategories);
  
  return (
    <section className="modern-categories">
      <div className="container">
        <h2 className="section-title">{title}</h2>
        
        <div className={`category-list`} data-layout={layout}>
          {displayCategories.map(category => (
            <Link 
              key={category.id} 
              to={`/categories/${category.id}`} 
              className="category-item"
            >
              <div className="category-image-container">
                <img 
                  src={category.imageUrl || '/assets/placeholder-images/category.jpg'} 
                  alt={category.name} 
                  className="category-image"
                />
              </div>
              <div className="category-overlay"></div>
              <h3 className="category-name">{category.name}</h3>
              {category.productCount && (
                <span className="category-count">{category.productCount} products</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModernCategories;