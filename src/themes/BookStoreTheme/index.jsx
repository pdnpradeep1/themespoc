// src/themes/BookStoreTheme/index.jsx
import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import './styles/book-store-theme.css';

const BookStoreTheme = ({ store, themeConfig, children }) => {
  // Extract theme settings from themeConfig
  const { colors, typography, layout, header, footer } = themeConfig.settings;
  
  // Create CSS variables for theme
  const themeStyles = {
    '--primary-color': colors.primary || '#191970',
    '--secondary-color': colors.secondary || '#FF6B00',
    '--background-color': colors.background || '#ffffff',
    '--text-color': colors.text || '#333333',
    '--nav-background': colors.navBackground || '#191970',
    '--nav-text': colors.navText || '#ffffff',
    '--accent-border': colors.accentBorder || '#FF6B00',
    '--sale-tag': colors.saleTag || '#FF6B00',
    '--font-family': typography.fontFamily || 'Helvetica, Arial, sans-serif',
    '--heading-font': typography.headingFont || 'Georgia, serif',
    '--heading-weight': typography.headingWeight || '700',
    '--body-weight': typography.bodyWeight || '400',
    '--content-width': layout?.maxContentWidth || '1200px'
  };

  // Apply content alignment classes
  const contentAlignment = layout?.contentAlignment || 'center';
  const contentClass = `content-alignment-${contentAlignment}`;
  
  // Apply product card style
  const productCardStyle = layout?.productCardStyle || 'clean-border';
  document.documentElement.style.setProperty('--product-card-style', productCardStyle);
  
  // Apply product image aspect ratio
  const productImageRatio = layout?.productImageAspectRatio || '3:4';
  document.documentElement.style.setProperty('--product-image-ratio', productImageRatio);

  // Product grid columns
  const productGridColumns = layout?.productGridColumns || 3;
  document.documentElement.style.setProperty('--product-grid-columns', productGridColumns);

  return (
    <div className={`book-store-theme ${contentClass}`} style={themeStyles}>
      <Header 
        storeName={store.name} 
        logo={store.logoUrl} 
        showSearch={header.showSearch}
        showCart={header.showCart}
        headerStyle={layout?.headerStyle || 'simple'}
        navigationPosition={layout?.navigationPosition || 'inline'}
        showLanguageSelector={header.showLanguageSelector}
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
      />
    </div>
  );
};

export default BookStoreTheme;

// Add to src/themes/ThemeRenderer.jsx
// import BookStoreTheme from './BookStoreTheme';
// 
// // Theme component mapping
// const THEMES = {
//   'modern': ModernTheme,
//   'minimalist': MinimalistTheme,
//   'bold': BoldTheme,
//   'dark-photography': DarkPhotographyTheme,
//   'book-store': BookStoreTheme,
// };