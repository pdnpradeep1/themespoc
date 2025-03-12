// src/api/storeApi.js
import apiClient from './index';

export const storeApi = {
  // Get store by ID
  getStoreById: (storeId) => {
    return apiClient.get(`/stores/${storeId}`);
  },
  
  // Get store by domain
  getStoreByDomain: (domain) => {
    return apiClient.get(`/stores/domain/${domain}`);
  },
  
  // Get theme configuration for a store
  getThemeConfig: (storeId) => {
    return apiClient.get(`/stores/${storeId}/theme`);
  }
};