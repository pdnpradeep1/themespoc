// src/pages/CategoryPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { categoryApi } from '../api/categoryApi';
import { useStoreContext } from '../context/StoreContext';
import ProductGrid from '../components/store/ProductGrid';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const { storeData } = useStoreContext();
  
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchCategory = async () => {
      if (!storeData || !storeData.id || !categoryId) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await categoryApi.getCategory(storeData.id, categoryId);
        setCategory(response.data);
        setProducts(response.data.products || []);
      } catch (err) {
        console.error('Error fetching category:', err);
        setError('Failed to load category. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategory();
  }, [storeData, categoryId]);
  
  if (loading) {
    return <Loader message="Loading category..." />;
  }
  
  if (error) {
    return <ErrorMessage message={error} />;
  }
  
  if (!category) {
    return <ErrorMessage message="Category not found" />;
  }
  
  return (
    <div className="category-page">
      <div className="container">
        <header className="category-header">
          <h1 className="category-title">{category.name}</h1>
          
          {category.description && (
            <p className="category-description">{category.description}</p>
          )}
        </header>
        
        <div className="category-products">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
