// src/pages/ModernHomePage.jsx
import React, { useEffect, useState } from 'react';
import { useStoreContext } from '../context/StoreContext';
import { useThemeContext } from '../context/ThemeContext';
import { productApi } from '../api/productApi';
import { categoryApi } from '../api/categoryApi';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';

// Import our new modern components
import ModernHero from '../components/store/ModernHero';
import ModernFeaturedProducts from '../components/store/ModernFeaturedProducts';
import ModernCategories from '../components/store/ModernCategories';
import ModernTestimonials from '../components/store/ModernTestimonials';
import ModernNewsletter from '../components/store/ModernNewsletter';

const ModernHomePage = () => {
  const { storeData } = useStoreContext();
  const { themeConfig } = useThemeContext();
  
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
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
  const testimonialsSettings = themeConfig?.settings?.sections?.testimonials || {};
  const newsletterSettings = themeConfig?.settings?.sections?.newsletter || {};
  
  // Prepare hero slides
  const heroSlides = [
    {
      headline: heroSettings.headline || 'Welcome to our Modern Store',
      subheading: heroSettings.subheading || 'Discover our latest collection with amazing prices',
      backgroundImage: heroSettings.backgroundImage || '/assets/placeholder-images/hero.jpg',
      primaryButtonText: heroSettings.buttonText || 'Shop Now',
      primaryButtonLink: heroSettings.buttonLink || '/products',
      secondaryButtonText: 'Learn More',
      secondaryButtonLink: '/about'
    }
  ];
  
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

  return (
    <div className="modern-home-page">
      <ModernHero 
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
        <ModernFeaturedProducts 
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
        <ModernCategories 
          categories={categories}
          title={categoriesSettings.title || 'Shop by Category'}
          layout={categoriesSettings.layout || 'grid'}
        />
      )}
      
      <ModernTestimonials 
        testimonials={testimonials}
        title={testimonialsSettings.title || 'What Our Customers Say'}
        autoplay={true}
        interval={5000}
        style={testimonialsSettings.style || 'cards'}
      />
      
      <ModernNewsletter 
        title={newsletterSettings.title || 'Stay Updated'}
        description={newsletterSettings.description || 'Subscribe to our newsletter for exclusive offers and updates'}
        style={newsletterSettings.style || 'default'}
        backgroundImage={newsletterSettings.backgroundImage}
        backgroundColor={newsletterSettings.backgroundColor}
      />
    </div>
  );
};

export default ModernHomePage;