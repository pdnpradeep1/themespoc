// src/themes/MinimalistTheme/index.jsx
import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import './styles/minimalist-theme.css';

const MinimalistTheme = ({ store, themeConfig, children }) => {
  // Extract theme settings from themeConfig
  const { colors, typography, header, footer } = themeConfig.settings;
  
  // Create CSS variables for theme
  const themeStyles = {
    '--primary-color': colors.primary || '#222222',
    '--secondary-color': colors.secondary || '#666666',
    '--background-color': colors.background || '#ffffff',
    '--text-color': colors.text || '#333333',
    '--font-family': typography.fontFamily || 'Helvetica, Arial, sans-serif',
    '--heading-font': typography.headingFont || 'Helvetica, Arial, sans-serif',
  };

  return (
    <div className="minimalist-theme" style={themeStyles}>
      <Header 
        storeName={store.name} 
        logo={store.logoUrl} 
        showSearch={header.showSearch}
        showCart={header.showCart}
        minimalist={true}
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
