// src/themes/MinimalistTheme/index.jsx
import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import './styles/minimalist-theme.css';

const MinimalistTheme = ({ store, themeConfig, children }) => {
  // Extract theme settings from themeConfig
  const { colors, typography, layout, header, footer } = themeConfig.settings;
  
  // Create CSS variables for theme
  const themeStyles = {
    '--primary-color': colors.primary || '#222222',
    '--secondary-color': colors.secondary || '#666666',
    '--background-color': colors.background || '#ffffff',
    '--text-color': colors.text || '#333333',
    '--font-family': typography.fontFamily || 'Helvetica, Arial, sans-serif',
    '--heading-font': typography.headingFont || 'Helvetica, Arial, sans-serif',
    '--content-width': layout?.maxContentWidth || '1000px',
  };

  // Apply content alignment classes
  const contentAlignment = layout?.contentAlignment || 'left';
  const contentClass = `content-alignment-${contentAlignment}`;
  
  // Apply product card style
  const productCardStyle = layout?.productCardStyle || 'borderless';
  document.documentElement.style.setProperty('--product-card-style', productCardStyle);
  
  // Apply product image aspect ratio
  const productImageRatio = layout?.productImageAspectRatio || '3:4';
  document.documentElement.style.setProperty('--product-image-ratio', productImageRatio);

  return (
    <div className={`minimalist-theme ${contentClass}`} style={themeStyles}>
      <Header 
        storeName={store.name} 
        logo={store.logoUrl} 
        showSearch={header.showSearch}
        showCart={header.showCart}
        minimalist={true}
        headerStyle={layout?.headerStyle || 'minimal'}
        navigationPosition={layout?.navigationPosition || 'right'}
      />
      
      <main className="main-content">
        {children}
      </main>
      
      <Footer 
        storeName={store.name}
        contactEmail={store.contactEmail}
        showSocialLinks={footer.showSocialLinks}
        showNewsletter={footer.showNewsletter}
        minimalist={true}
      />
    </div>
  );
};

export default MinimalistTheme;