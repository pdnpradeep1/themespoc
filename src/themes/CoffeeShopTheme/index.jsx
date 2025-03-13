// src/themes/CoffeeShopTheme/index.jsx
import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import './styles/coffee-shop-theme.css';

const CoffeeShopTheme = ({ store, themeConfig, children }) => {
  // Extract theme settings from themeConfig
  const { colors, typography, layout, header, footer } = themeConfig.settings;
  
  // Create CSS variables for theme
  const themeStyles = {
    '--primary-color': colors.primary || '#8B4513',
    '--secondary-color': colors.secondary || '#D2B48C',
    '--background-color': colors.background || '#FDF5E6',
    '--text-color': colors.text || '#3E2723',
    '--accent-color': colors.accentColor || '#558B2F',
    '--sale-color': colors.saleColor || '#D32F2F',
    '--header-background': colors.headerBackground || '#5D4037',
    '--footer-background': colors.footerBackground || '#3E2723',
    '--font-family': typography.fontFamily || 'Lato, sans-serif',
    '--heading-font': typography.headingFont || 'Playfair Display, serif',
    '--heading-weight': typography.headingWeight || '700',
    '--body-weight': typography.bodyWeight || '400',
    '--content-width': layout?.maxContentWidth || '1200px',
    '--section-spacing': layout?.sectionSpacing === 'large' ? '80px' : '40px'
  };

  // Apply content alignment classes
  const contentAlignment = layout?.contentAlignment || 'center';
  const contentClass = `content-alignment-${contentAlignment}`;
  
  // Apply product card style
  const productCardStyle = layout?.productCardStyle || 'clean-rounded';
  document.documentElement.style.setProperty('--product-card-style', productCardStyle);
  
  // Apply product image aspect ratio
  const productImageRatio = layout?.productImageAspectRatio || '1:1';
  document.documentElement.style.setProperty('--product-image-ratio', productImageRatio);

  // Product grid columns
  const productGridColumns = layout?.productGridColumns || 4;
  document.documentElement.style.setProperty('--product-grid-columns', productGridColumns);

  return (
    <div className={`coffee-shop-theme ${contentClass}`} style={themeStyles}>
      <Header 
        storeName={store.name} 
        logo={store.logoUrl} 
        showSearch={header.showSearch}
        showCart={header.showCart}
        showAccount={header.showAccount}
        headerStyle={layout?.headerStyle || 'compact'}
        navigationPosition={layout?.navigationPosition || 'top'}
      />
      
      <main className="main-content">
        {children}
      </main>
      
      <Footer 
        storeName={store.name}
        contactEmail={store.contactEmail}
        showSocialLinks={footer.showSocialLinks}
        showNewsletter={footer.showNewsletter}
        showPaymentIcons={footer.showPaymentIcons}
        showPartners={footer.showPartners}
      />
    </div>
  );
};

export default CoffeeShopTheme;

// Add to src/themes/ThemeRenderer.jsx
// import CoffeeShopTheme from './CoffeeShopTheme';
// 
// // Theme component mapping
// const THEMES = {
//   'modern': ModernTheme,
//   'minimalist': MinimalistTheme,
//   'bold': BoldTheme,
//   'dark-photography': DarkPhotographyTheme,
//   'book-store': BookStoreTheme,
//   'coffee-shop': CoffeeShopTheme,
// };