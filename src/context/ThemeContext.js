
// src/context/ThemeContext.js
import React, { createContext, useContext, useState } from 'react';
import { storeApi } from '../api/storeApi';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeConfig, setThemeConfig] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchThemeConfig = async (storeId) => {
    if (!storeId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await storeApi.getThemeConfig(storeId);
      setThemeConfig(response.data);
      return response.data;
    } catch (err) {
      console.error('Error fetching theme configuration:', err);
      setError('Failed to load theme configuration. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    themeConfig,
    loading,
    error,
    fetchThemeConfig,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};