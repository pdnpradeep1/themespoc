// src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Hero from '../components/store/Hero';
import ProductGrid from '../components/store/ProductGrid';
import CategoryList from '../components/store/CategoryList';
import Newsletter from '../components/store/Newsletter';
import { useStoreContext } from '../context/StoreContext';
import { useThemeContext } from '../context/ThemeContext';
import { productApi } from '../api/productApi';
import { categoryApi } from '../api/categoryApi';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';

const HomePage = () => {
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
  
  // Extract hero section settings from theme config
  const heroSettings = themeConfig?.settings?.sections?.hero || {};
  
  return (
    <div className="home-page">
      {themeConfig?.settings?.sections?.heroEnabled && (
        <Hero 
          headline={heroSettings.headline || 'Welcome to our Store'}
          subheading={heroSettings.subheading}
          backgroundImage={heroSettings.backgroundImage}
          buttonText={heroSettings.buttonText}
          buttonLink={heroSettings.buttonLink}
        />
      )}
      
      {featuredProducts.length > 0 && (
        <section className="featured-products-section">
          <div className="container">
            <h2 className="section-title">
              {themeConfig?.settings?.sections?.featuredProducts?.title || 'Featured Products'}
            </h2>
            <ProductGrid 
              products={featuredProducts} 
              columns={themeConfig?.settings?.sections?.featuredProducts?.columns || 3}
            />
          </div>
        </section>
      )}
      
      {categories.length > 0 && themeConfig?.settings?.sections?.categories?.enabled && (
        <section className="categories-section">
          <div className="container">
            <h2 className="section-title">
              {themeConfig?.settings?.sections?.categories?.title || 'Shop by Category'}
            </h2>
            <CategoryList categories={categories} />
          </div>
        </section>
      )}
      
      {themeConfig?.settings?.sections?.newsletter?.enabled && (
        <section className="newsletter-section">
          <div className="container">
            <Newsletter 
              title={themeConfig?.settings?.sections?.newsletter?.title}
              description={themeConfig?.settings?.sections?.newsletter?.description}
            />
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;