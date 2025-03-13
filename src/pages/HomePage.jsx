// // src/pages/HomePage.jsx
// import React, { useEffect, useState } from 'react';
// import Hero from '../components/store/Hero';
// import ProductGrid from '../components/store/ProductGrid';
// import CategoryList from '../components/store/CategoryList';
// import Newsletter from '../components/store/Newsletter';
// import { useStoreContext } from '../context/StoreContext';
// import { useThemeContext } from '../context/ThemeContext';
// import { productApi } from '../api/productApi';
// import { categoryApi } from '../api/categoryApi';
// import Loader from '../components/common/Loader';
// import ErrorMessage from '../components/common/ErrorMessage';

// const HomePage = () => {
//   const { storeData } = useStoreContext();
//   const { themeConfig } = useThemeContext();
  
//   const [featuredProducts, setFeaturedProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   useEffect(() => {
//     const fetchHomePageData = async () => {
//       if (!storeData || !storeData.id) return;
      
//       setLoading(true);
//       setError(null);
      
//       try {
//         // Fetch featured products and categories in parallel
//         const [productsResponse, categoriesResponse] = await Promise.all([
//           productApi.getFeaturedProducts(storeData.id),
//           categoryApi.getCategories(storeData.id)
//         ]);
        
//         setFeaturedProducts(productsResponse.data);
//         setCategories(categoriesResponse.data);
//       } catch (err) {
//         console.error('Error fetching home page data:', err);
//         setError('Failed to load store data. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchHomePageData();
//   }, [storeData]);
  
//   if (loading) {
//     return <Loader message="Loading store..." />;
//   }
  
//   if (error) {
//     return <ErrorMessage message={error} />;
//   }
  
//   // Extract settings from theme config
//   const heroSettings = themeConfig?.settings?.sections?.hero || {};
//   const featuredProductsSettings = themeConfig?.settings?.sections?.featuredProducts || {};
//   const categoriesSettings = themeConfig?.settings?.sections?.categories || {};
//   const newsletterSettings = themeConfig?.settings?.sections?.newsletter || {};
  
//   return (
//     <div className="home-page">
//       {themeConfig?.settings?.sections?.heroEnabled && (
//         <Hero 
//           headline={heroSettings.headline || 'Welcome to our Store'}
//           subheading={heroSettings.subheading}
//           backgroundImage={heroSettings.backgroundImage}
//           buttonText={heroSettings.buttonText}
//           buttonLink={heroSettings.buttonLink}
//           textAlignment={heroSettings.textAlignment || 'center'}
//           overlayOpacity={heroSettings.overlayOpacity || '0.3'}
//           fullscreenHero={heroSettings.fullscreenHero || false}
//         />
//       )}
      
//       {featuredProducts.length > 0 && (
//         <section className="featured-products-section">
//           <div className="container">
//             <h2 className="section-title">
//               {featuredProductsSettings.title || 'Featured Products'}
//             </h2>
//             <ProductGrid 
//               products={featuredProducts} 
//               columns={featuredProductsSettings.columns || 3}
//               layout={featuredProductsSettings.layout || 'grid'}
//             />
//           </div>
//         </section>
//       )}
      
//       {categories.length > 0 && categoriesSettings.enabled && (
//         <section className="categories-section">
//           <div className="container">
//             <h2 className="section-title">
//               {categoriesSettings.title || 'Shop by Category'}
//             </h2>
//             <CategoryList categories={categories} />
//           </div>
//         </section>
//       )}
      
//       {themeConfig?.settings?.sections?.newsletter?.enabled && (
//         <section 
//           className="newsletter-section"
//           data-style={newsletterSettings.backgroundStyle || 'default'}
//         >
//           <div className="container">
//             <Newsletter 
//               title={newsletterSettings.title}
//               description={newsletterSettings.description}
//             />
//           </div>
//         </section>
//       )}
//     </div>
//   );
// };

// export default HomePage;

// src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import { useStoreContext } from '../context/StoreContext';
import { useThemeContext } from '../context/ThemeContext';
import { productApi } from '../api/productApi';
import { categoryApi } from '../api/categoryApi';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';

// Original components - keep these for non-ModernTheme themes
import Hero from '../components/store/Hero';
import ProductGrid from '../components/store/ProductGrid';
import CategoryList from '../components/store/CategoryList';
import Newsletter from '../components/store/Newsletter';

// This function dynamically decides which components to use based on theme
const HomePage = () => {
  const { storeData } = useStoreContext();
  const { themeConfig } = useThemeContext();
  
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Track whether we're using modern theme
  const [isModernTheme, setIsModernTheme] = useState(false);
  
  // Modern theme components (will be loaded only if ModernTheme is active)
  const [ModernComponents, setModernComponents] = useState({
    Hero: null,
    FeaturedProducts: null,
    Categories: null,
    Testimonials: null,
    Newsletter: null
  });
  
  // Check if we should use modern theme and load components if needed
  useEffect(() => {
    const checkThemeType = async () => {
      if (themeConfig && themeConfig.themeName === 'modern') {
        setIsModernTheme(true);
        
        try {
          // Dynamically import modern components only if using ModernTheme
          const ModernHero = (await import('../themes/ModernTheme/components/ModernHero')).default;
          const ModernFeaturedProducts = (await import('../themes/ModernTheme/components/ModernFeaturedProducts')).default;
          const ModernCategories = (await import('../themes/ModernTheme/components/ModernCategories')).default;
          const ModernTestimonials = (await import('../themes/ModernTheme/components/ModernTestimonials')).default;
          const ModernNewsletter = (await import('../themes/ModernTheme/components/ModernNewsletter')).default;
          
          setModernComponents({
            Hero: ModernHero,
            FeaturedProducts: ModernFeaturedProducts,
            Categories: ModernCategories,
            Testimonials: ModernTestimonials,
            Newsletter: ModernNewsletter
          });
        } catch (err) {
          console.error("Error loading modern components:", err);
        }
      } else {
        setIsModernTheme(false);
      }
    };
    
    checkThemeType();
  }, [themeConfig]);
  
  useEffect(() => {
    const fetchHomePageData = async () => {
      if (!storeData || !storeData.id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // Fetch featured products and categories in parallel
        const [productsResponse, categoriesResponse] = await Promise.all([
          productApi.getFeaturedProducts(storeData.id),
          categoryApi.getCategories(storeData.id)
        ]);
        
        setFeaturedProducts(productsResponse.data);
        setCategories(categoriesResponse.data);
      } catch (err) {
        console.error('Error fetching home page data:', err);
        setError('Failed to load store data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchHomePageData();
  }, [storeData]);
  
  if (loading) {
    return <Loader message="Loading store..." />;
  }
  
  if (error) {
    return <ErrorMessage message={error} />;
  }
  
  // Extract settings from theme config
  const heroSettings = themeConfig?.settings?.sections?.hero || {};
  const featuredProductsSettings = themeConfig?.settings?.sections?.featuredProducts || {};
  const categoriesSettings = themeConfig?.settings?.sections?.categories || {};
  const newsletterSettings = themeConfig?.settings?.sections?.newsletter || {};
  
  // Sample testimonials (would come from API in real app)
  const testimonials = [
    {
      id: 1,
      name: 'John Smith',
      avatar: '/assets/placeholder-images/avatar1.jpg',
      role: 'Verified Customer',
      content: 'Amazing products and great customer service. I will definitely be shopping here again!',
      rating: 5
    },
    {
      id: 2,
      name: 'Jane Doe',
      avatar: '/assets/placeholder-images/avatar2.jpg',
      role: 'Verified Customer',
      content: 'The quality of the products exceeded my expectations. Shipping was fast and everything arrived in perfect condition.',
      rating: 4
    },
    {
      id: 3,
      name: 'Mike Johnson',
      avatar: '/assets/placeholder-images/avatar3.jpg',
      role: 'Verified Customer',
      content: 'Great experience from start to finish. The website is easy to navigate and the checkout process was smooth.',
      rating: 5
    }
  ];
  
  // Prepare hero slides for modern theme
  const heroSlides = [
    {
      headline: heroSettings.headline || 'Welcome to our Store',
      subheading: heroSettings.subheading || 'Discover our latest collection with amazing prices',
      backgroundImage: heroSettings.backgroundImage || '/assets/placeholder-images/hero.jpg',
      primaryButtonText: heroSettings.buttonText || 'Shop Now',
      primaryButtonLink: heroSettings.buttonLink || '/products',
      secondaryButtonText: 'Learn More',
      secondaryButtonLink: '/about'
    }
  ];

  // Render the appropriate version based on theme
  if (isModernTheme && ModernComponents.Hero) {
    // Modern theme version
    return (
      <div className="modern-home-page">
        <ModernComponents.Hero 
          slides={heroSlides}
          autoplay={true}
          interval={5000}
          showIndicators={true}
          showArrows={true}
          textAlignment={heroSettings.textAlignment || 'center'}
          overlayOpacity={heroSettings.overlayOpacity || '0.4'}
          fullscreenHero={heroSettings.fullscreenHero || false}
        />
        
        {featuredProducts.length > 0 && (
          <ModernComponents.FeaturedProducts 
            products={featuredProducts} 
            title={featuredProductsSettings.title || 'Featured Products'}
            viewAllLink="/products"
            showViewAll={true}
            layout={featuredProductsSettings.layout || 'grid'}
            columns={featuredProductsSettings.columns || 4}
            maxProducts={8}
          />
        )}
        
        {categories.length > 0 && (
          <ModernComponents.Categories 
            categories={categories}
            title={categoriesSettings.title || 'Shop by Category'}
            layout={categoriesSettings.layout || 'grid'}
          />
        )}
        
        <ModernComponents.Testimonials 
          testimonials={testimonials}
          title="What Our Customers Say"
          autoplay={true}
          interval={5000}
          style="cards"
        />
        
        <ModernComponents.Newsletter 
          title={newsletterSettings.title || 'Stay Updated'}
          description={newsletterSettings.description || 'Subscribe to our newsletter for exclusive offers and updates'}
          style={newsletterSettings.style || 'default'}
          backgroundImage={newsletterSettings.backgroundImage}
          backgroundColor={newsletterSettings.backgroundColor}
        />
      </div>
    );
  } else {
    // Original theme version
    return (
      <div className="home-page">
        {themeConfig?.settings?.sections?.heroEnabled && (
          <Hero 
            headline={heroSettings.headline || 'Welcome to our Store'}
            subheading={heroSettings.subheading}
            backgroundImage={heroSettings.backgroundImage}
            buttonText={heroSettings.buttonText}
            buttonLink={heroSettings.buttonLink}
            textAlignment={heroSettings.textAlignment || 'center'}
            overlayOpacity={heroSettings.overlayOpacity || '0.3'}
            fullscreenHero={heroSettings.fullscreenHero || false}
          />
        )}
        
        {featuredProducts.length > 0 && (
          <section className="featured-products-section">
            <div className="container">
              <h2 className="section-title">
                {featuredProductsSettings.title || 'Featured Products'}
              </h2>
              <ProductGrid 
                products={featuredProducts} 
                columns={featuredProductsSettings.columns || 3}
                layout={featuredProductsSettings.layout || 'grid'}
              />
            </div>
          </section>
        )}
        
        {categories.length > 0 && categoriesSettings.enabled && (
          <section className="categories-section">
            <div className="container">
              <h2 className="section-title">
                {categoriesSettings.title || 'Shop by Category'}
              </h2>
              <CategoryList categories={categories} />
            </div>
          </section>
        )}
        
        {themeConfig?.settings?.sections?.newsletter?.enabled && (
          <section 
            className="newsletter-section"
            data-style={newsletterSettings.backgroundStyle || 'default'}
          >
            <div className="container">
              <Newsletter 
                title={newsletterSettings.title}
                description={newsletterSettings.description}
              />
            </div>
          </section>
        )}
      </div>
    );
  }
};

export default HomePage;