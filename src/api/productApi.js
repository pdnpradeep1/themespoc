// src/api/productApi.js
import apiClient from './index';

export const productApi = {
  // Get all products for a store
  getProducts: (storeId, params = {}) => {
    return apiClient.get(`/stores/${storeId}/products`, { params });
  },
  
  // Get a single product
  getProduct: (storeId, productId) => {
    return apiClient.get(`/stores/${storeId}/products/${productId}`);
  },
  
  // Get featured products
  getFeaturedProducts: (storeId) => {
    return apiClient.get(`/stores/${storeId}/products`, { params: { featured: true } });
  }
};