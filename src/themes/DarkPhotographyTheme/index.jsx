// src/themes/DarkPhotographyTheme/index.jsx
import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import './styles/dark-photography-theme.css';

const DarkPhotographyTheme = ({ store, themeConfig, children }) => {
  // Extract theme settings from themeConfig
  const { colors, typography, layout, header, footer } = themeConfig.settings;
  
  // Create CSS variables for theme
  const themeStyles = {
    '--primary-color': colors.primary || '#ff3030',
    '--secondary-color': colors.secondary || '#ffffff',
    '--background-color': colors.background || '#111111',
    '--text-color': colors.text || '#eeeeee',
    '--nav-background': colors.navBackground || '#000000',
    '--footer-background': colors.footerBackground || '#0a0a0a',
    '--font-family': typography.fontFamily || 'Roboto, sans-serif',
    '--heading-font': typography.headingFont || 'Roboto, sans-serif',
    '--heading-weight': typography.headingWeight || '700',
    '--body-weight': typography.bodyWeight || '300',
    '--content-width': layout?.maxContentWidth || '100%'
  };

  // Apply content alignment classes
  const contentAlignment = layout?.contentAlignment || 'full-width';
  const contentClass = `content-alignment-${contentAlignment}`;
  
  // Apply product card style
  const productCardStyle = layout?.productCardStyle || 'dark-minimal';
  document.documentElement.style.setProperty('--product-card-style', productCardStyle);
  
  // Apply product image aspect ratio
  const productImageRatio = layout?.productImageAspectRatio || '4:3';
  document.documentElement.style.setProperty('--product-image-ratio', productImageRatio);

  return (
    <div className={`dark-photography-theme ${contentClass}`} style={themeStyles}>
      <Header 
        storeName={store.name} 
        logo={store.logoUrl} 
        showSearch={header.showSearch}
        showCart={header.showCart}
        headerStyle={layout?.headerStyle || 'dark-transparent'}
        navigationPosition={layout?.navigationPosition || 'top'}
        darkMode={true}
      />
      
      <main className="main-content">
        {children}
      </main>
      
      <Footer 
        storeName={store.name}
        contactEmail={store.contactEmail}
        showSocialLinks={footer.showSocialLinks}
        showNewsletter={footer.showNewsletter}
        darkMode={true}
      />
    </div>
  );
};

export default DarkPhotographyTheme;

// Add this to src/themes/ThemeRenderer.jsx
// import DarkPhotographyTheme from './DarkPhotographyTheme';
// 
// // Theme component mapping
// const THEMES = {
//   'modern': ModernTheme,
//   'minimalist': MinimalistTheme,
//   'bold': BoldTheme,
//   'dark-photography': DarkPhotographyTheme,
// };