// src/themes/ThemeRenderer.jsx
import React, { useEffect } from 'react';
import { useStore } from '../hooks/useStore';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';

// Import theme components
import ModernTheme from './ModernTheme';
import MinimalistTheme from './MinimalistTheme';
import BoldTheme from './BoldTheme';

// Theme component mapping
const THEMES = {
  'modern': ModernTheme,
  'minimalist': MinimalistTheme,
  'bold': BoldTheme,
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
    <ThemeComponent 
      store={storeData} 
      themeConfig={themeConfig}
    >
      {children}
    </ThemeComponent>
  );
};

export default ThemeRenderer;