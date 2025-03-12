// src/hooks/useDomainResolver.js
import { useState, useEffect } from 'react';
import { storeApi } from '../api/storeApi';

export const useDomainResolver = () => {
  const [storeInfo, setStoreInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const resolveStore = async () => {
      setLoading(true);
      
      try {
        // Extract domain from current URL
        const currentDomain = window.location.hostname;
        
        // For development environment
        if (currentDomain === 'localhost' || currentDomain === '127.0.0.1') {
          const params = new URLSearchParams(window.location.search);
          const storeId = params.get('storeId') || '1'; // Default to store ID 1 if none specified
          
          try {
            // Try to get store by ID
            const response = await storeApi.getStoreById(storeId);
            setStoreInfo(response.data);
          } catch (err) {
            console.log("Creating mock store for development");
            // If the store doesn't exist in the API, create a mock store for development
            setStoreInfo({
              id: 1,
              name: "Demo Store",
              subdomain: "demo",
              customDomain: "demo-store.example.com",
              logoUrl: "https://via.placeholder.com/200x50?text=Demo+Store",
              contactEmail: "contact@demo-store.example"
            });
          }
        } else {
          // For production, resolve store based on domain
          try {
            const response = await storeApi.getStoreByDomain(currentDomain);
            setStoreInfo(response.data);
          } catch (err) {
            setError('Store not found. Please check the URL and try again.');
          }
        }
      } catch (err) {
        console.error('Error resolving store from domain:', err);
        setError('An error occurred while trying to load the store.');
      } finally {
        setLoading(false);
      }
    };

    resolveStore();
  }, []);

  return { storeInfo, loading, error };
};