// src/hooks/useStore.js
import { useEffect } from 'react';
import { useStoreContext } from '../context/StoreContext';
import { useThemeContext } from '../context/ThemeContext';

export const useStore = (storeId) => {
  const { 
    storeData, 
    loading: storeLoading, 
    error: storeError, 
    fetchStoreData 
  } = useStoreContext();
  
  const { 
    themeConfig, 
    loading: themeLoading, 
    error: themeError, 
    fetchThemeConfig 
  } = useThemeContext();

  useEffect(() => {
    if (storeId && !storeData) {
      fetchStoreData(storeId);
    }
  }, [storeId, storeData, fetchStoreData]);

  useEffect(() => {
    if (storeId && !themeConfig) {
      fetchThemeConfig(storeId);
    }
  }, [storeId, themeConfig, fetchThemeConfig]);

  return {
    storeData,
    themeConfig,
    loading: storeLoading || themeLoading,
    error: storeError || themeError
  };
};