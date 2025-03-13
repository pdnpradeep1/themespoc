// src/themes/ThemeRenderer.jsx
import React, { useEffect, lazy, Suspense } from 'react';
import { useStore } from '../hooks/useStore';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';

// Lazy load theme components
const ModernTheme = lazy(() => import('./ModernTheme'));
const MinimalistTheme = lazy(() => import('./MinimalistTheme'));
const BoldTheme = lazy(() => import('./BoldTheme'));
const DarkPhotographyTheme = lazy(() => import('./DarkPhotographyTheme'));
const BookStoreTheme = lazy(() => import('./BookStoreTheme'));
const CoffeeShopTheme = lazy(() => import('./CoffeeShopTheme'));

// Theme component mapping
const THEMES = {
  'modern': ModernTheme,
  'minimalist': MinimalistTheme,
  'bold': BoldTheme,
  'dark-photography': DarkPhotographyTheme,
  'book-store': BookStoreTheme,
  'coffee-shop': CoffeeShopTheme,
};

const ThemeRenderer = ({ children, storeInfo }) => {
  const { storeData, themeConfig, loading, error } = useStore(storeInfo?.id);

  // Set document title based on store name
  useEffect(() => {
    if (storeData && storeData.name) {
      document.title = storeData.name;
    }
  }, [storeData]);

  if (loading) {
    return <Loader message="Loading store theme..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!storeData || !themeConfig) {
    return <ErrorMessage message="Store information not found" />;
  }

  // Determine which theme to use
  const ThemeComponent = THEMES[themeConfig.themeName] || THEMES.modern;

  return (
    <Suspense fallback={<Loader message="Loading theme..." />}>
      <ThemeComponent 
        store={storeData} 
        themeConfig={themeConfig}
      >
        {children}
      </ThemeComponent>
    </Suspense>
  );
};

export default ThemeRenderer;