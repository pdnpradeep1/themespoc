// src/components/store/CategoryList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useThemeContext } from '../../context/ThemeContext';

const CategoryList = ({ categories = [] }) => {
  const { themeConfig } = useThemeContext();
  
  if (!categories || categories.length === 0) {
    return null;
  }
  
  // Get layout style from theme config
  const layoutStyle = themeConfig?.settings?.sections?.categories?.layout || 'cards';

  return (
    <div className="category-list" data-layout={layoutStyle}>
      {categories.map(category => (
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
          <h3 className="category-name">{category.name}</h3>
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;