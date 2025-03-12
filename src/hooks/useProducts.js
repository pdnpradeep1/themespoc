// src/hooks/useProducts.js
import { useState, useEffect } from 'react';
import { productApi } from '../api/productApi';

export const useProducts = (storeId, options = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { featured, categoryId, limit, sort } = options;

  const fetchProducts = async () => {
    if (!storeId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const params = {};
      
      if (featured !== undefined) params.featured = featured;
      if (categoryId) params.categoryId = categoryId;
      if (limit) params.limit = limit;
      if (sort) params.sort = sort;
      
      const response = await productApi.getProducts(storeId, params);
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [storeId, featured, categoryId, limit, sort]);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts
  };
};