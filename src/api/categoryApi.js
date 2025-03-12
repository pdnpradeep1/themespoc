// src/api/categoryApi.js
import apiClient from './index';

export const categoryApi = {
  // Get all categories for a store
  getCategories: (storeId) => {
    return apiClient.get(`/stores/${storeId}/categories`);
  },
  
  // Get a single category with its products
  getCategory: (storeId, categoryId) => {
    return apiClient.get(`/stores/${storeId}/categories/${categoryId}`);
  }
};