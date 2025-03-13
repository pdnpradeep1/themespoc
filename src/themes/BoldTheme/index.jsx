// // src/themes/BoldTheme/index.jsx
// import React from 'react';
// import Header from '../../components/common/Header';
// import Footer from '../../components/common/Footer';
// import './styles/bold-theme.css';

// const BoldTheme = ({ store, themeConfig, children }) => {
//   // Extract theme settings from themeConfig
//   const { colors, typography, header, footer } = themeConfig.settings;
  
//   // Create CSS variables for theme
//   const themeStyles = {
//     '--primary-color': colors.primary || '#e63946',
//     '--secondary-color': colors.secondary || '#1d3557',
//     '--background-color': colors.background || '#f1faee',
//     '--text-color': colors.text || '#1d3557',
//     '--font-family': typography.fontFamily || 'Poppins, sans-serif',
//     '--heading-font': typography.headingFont || 'Poppins, sans-serif',
//   };

//   return (
//     <div className="bold-theme" style={themeStyles}>
//       <Header 
//         storeName={store.name} 
//         logo={store.logoUrl} 
//         showSearch={header.showSearch}
//         showCart={header.showCart}
//         bold={true}
//       />
      
//       <main className="main-content">
//         {children}
//       </main>
      
//       <Footer 
//         storeName={store.name}
//         contactEmail={store.contactEmail}
//         showSocialLinks={footer.showSocialLinks}
//         showNewsletter={footer.showNewsletter}
//         bold={true}
//       />
//     </div>
//   );
// };

// export default BoldTheme;

// src/themes/BoldTheme/index.jsx
import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import './styles/bold-theme.css';

const BoldTheme = ({ store, themeConfig, children }) => {
  // Extract theme settings from themeConfig
  const { colors, typography, layout, header, footer } = themeConfig.settings;
  
  // Create CSS variables for theme
  const themeStyles = {
    '--primary-color': colors.primary || '#e63946',
    '--secondary-color': colors.secondary || '#1d3557',
    '--background-color': colors.background || '#f1faee',
    '--text-color': colors.text || '#1d3557',
    '--font-family': typography.fontFamily || 'Poppins, sans-serif',
    '--heading-font': typography.headingFont || 'Poppins, sans-serif',
    '--content-width': layout?.maxContentWidth || '100%',
  };

  // Apply content alignment classes
  const contentAlignment = layout?.contentAlignment || 'full-width';
  const contentClass = `content-alignment-${contentAlignment}`;
  
  // Apply product card style
  const productCardStyle = layout?.productCardStyle || 'bold-border';
  document.documentElement.style.setProperty('--product-card-style', productCardStyle);
  
  // Apply product image aspect ratio
  const productImageRatio = layout?.productImageAspectRatio || '16:9';
  document.documentElement.style.setProperty('--product-image-ratio', productImageRatio);

  return (
    <div className={`bold-theme ${contentClass}`} style={themeStyles}>
      <Header 
        storeName={store.name} 
        logo={store.logoUrl} 
        showSearch={header.showSearch}
        showCart={header.showCart}
        bold={true}
        headerStyle={layout?.headerStyle || 'overlay'}
        navigationPosition={layout?.navigationPosition || 'center'}
      />
      
      <main className="main-content">
        {children}
      </main>
      
      <Footer 
        storeName={store.name}
        contactEmail={store.contactEmail}
        showSocialLinks={footer.showSocialLinks}
        showNewsletter={footer.showNewsletter}
        bold={true}
      />
    </div>
  );
};

export default BoldTheme;