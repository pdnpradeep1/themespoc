// src/themes/ModernTheme/index.jsx
import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import './styles/modern-theme.css';

const ModernTheme = ({ store, themeConfig, children }) => {
  // Extract theme settings from themeConfig
  const { colors, typography, header, footer } = themeConfig.settings;
  
  // Create CSS variables for theme
  const themeStyles = {
    '--primary-color': colors.primary || '#4a90e2',
    '--secondary-color': colors.secondary || '#f5a623',
    '--background-color': colors.background || '#ffffff',
    '--text-color': colors.text || '#333333',
    '--font-family': typography.fontFamily || 'Roboto, sans-serif',
    '--heading-font': typography.headingFont || 'Montserrat, sans-serif',
  };

  return (
    <div className="modern-theme" style={themeStyles}>
      <Header 
        storeName={store.name} 
        logo={store.logoUrl} 
        showSearch={header.showSearch}
        showCart={header.showCart}
        primaryColor={colors.primary}
      />
      
      <main className="main-content">
        {children}
      </main>
      
      <Footer 
        storeName={store.name}
        contactEmail={store.contactEmail}
        showSocialLinks={footer.showSocialLinks}
        showNewsletter={footer.showNewsletter}
      />
    </div>
  );
};

export default ModernTheme;
