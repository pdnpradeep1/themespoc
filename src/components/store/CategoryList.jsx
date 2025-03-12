// src/components/store/CategoryList.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const CategoryList = ({ categories = [] }) => {
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="category-list">
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
