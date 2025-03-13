// src/themes/ModernTheme/index.jsx
import React, { useEffect } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import { ModernThemeProvider } from './ThemeContext';

// Import all styles in one place for lazy loading
import './styles/index.css';

const ModernTheme = ({ store, themeConfig, children }) => {
  // Extract theme settings from themeConfig
  const { colors, typography, layout, header, footer } = themeConfig?.settings || {};
  
  // Create CSS variables for theme
  const themeStyles = {
    '--primary-color': colors?.primary || '#4361ee',
    '--secondary-color': colors?.secondary || '#f72585',
    '--accent-color': colors?.accent || '#7209b7',
    '--background-color': colors?.background || '#ffffff',
    '--surface-color': colors?.surface || '#f8f9fa',
    '--text-color': colors?.text || '#212529',
    '--text-light-color': colors?.textLight || '#6c757d',
    '--success-color': colors?.success || '#2ecc71',
    '--warning-color': colors?.warning || '#f39c12',
    '--error-color': colors?.error || '#e74c3c',
    '--border-radius': '8px',
    '--card-shadow': '0 4px 20px rgba(0, 0, 0, 0.08)',
    '--font-family': typography?.fontFamily || '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    '--heading-font': typography?.headingFont || '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    '--content-width': layout?.maxContentWidth || '1200px',
    '--section-spacing': '80px',
    '--grid-gap': '24px',
    '--primary-color-rgb': '67, 97, 238', // RGB for #4361ee
    '--secondary-color-rgb': '247, 37, 133', // RGB for #f72585
    '--accent-color-rgb': '114, 9, 183', // RGB for #7209b7
  };

  // Apply content alignment classes
  const contentAlignment = layout?.contentAlignment || 'center';
  const contentClass = `content-alignment-${contentAlignment}`;

  // Apply product card style
  const productCardStyle = layout?.productCardStyle || 'modern';
  
  // Apply animations
  const animations = layout?.animations !== false;

  // Add Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <ModernThemeProvider>
      <div 
        className={`modern-theme ${contentClass} ${animations ? 'with-animations' : ''}`} 
        style={themeStyles}
        data-product-card-style={productCardStyle}
      >
        <Header 
          storeName={store.name} 
          logo={store.logoUrl} 
          showSearch={header?.showSearch}
          showCart={header?.showCart}
          headerStyle={layout?.headerStyle || 'floating'}
          navigationPosition={layout?.navigationPosition || 'center'}
        />
        
        <main className="main-content">
          {children}
        </main>
        
        <Footer 
          storeName={store.name}
          contactEmail={store.contactEmail}
          showSocialLinks={footer?.showSocialLinks}
          showNewsletter={footer?.showNewsletter}
        />
      </div>
    </ModernThemeProvider>
  );
};

export default ModernTheme;