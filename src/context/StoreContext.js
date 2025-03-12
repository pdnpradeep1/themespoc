// src/context/StoreContext.js
import React, { createContext, useContext, useState } from 'react';
import { storeApi } from '../api/storeApi';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [storeData, setStoreData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStoreData = async (storeId) => {
    if (!storeId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await storeApi.getStoreById(storeId);
      setStoreData(response.data);
      return response.data;
    } catch (err) {
      console.error('Error fetching store data:', err);
      setError('Failed to load store data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    storeData,
    loading,
    error,
    fetchStoreData,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStoreContext = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStoreContext must be used within a StoreProvider');
  }
  return context;
};
