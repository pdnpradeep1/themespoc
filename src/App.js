// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDomainResolver } from './hooks/useDomainResolver';
import Loader from './components/common/Loader';
import ThemeRenderer from './themes/ThemeRenderer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import NotFoundPage from './pages/NotFoundPage';
// Import our new page components
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TrackOrderPage from './pages/TrackOrderPage';

// Import promotion components
import PromotionBanner from './components/store/PromotionBanner';
import FloatingOffers from './components/store/FloatingOffers';
import LoginModal from './components/auth/LoginModal'; 
import { useAuth } from './context/AuthContext';  // Make sure this path is correct

// Import auth pages CSS
import './styles/AuthPages.css';

function App() {
  const { storeInfo, loading, error } = useDomainResolver();
  const { showLoginModal, closeLoginModal, login } = useAuth();

  // Setup a sample promotion expiration date (2 days from now)
  const promotionEndDate = new Date();
  promotionEndDate.setDate(promotionEndDate.getDate() + 2);

  if (loading) {
    return <Loader message="Loading store..." />;
  }

  if (error) {
    return <NotFoundPage message={error} />;
  }

  return (
    <>
      {/* Global Promotion Banner */}
      <PromotionBanner 
        message="Get 10% OFF on all products. Limited time offer!"
        enableTimer={true}
        endTime={promotionEndDate}
        link="/sale"
        linkText="Shop Now"
        bgColor="#1F6B75"
      />
      
      <ThemeRenderer storeInfo={storeInfo}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:productId" element={<ProductPage />} />
          <Route path="/categories/:categoryId" element={<CategoryPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          
          {/* Add new routes for auth and tracking */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/track-order" element={<TrackOrderPage />} />
          
          {/* 404 page for all other routes */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        
        {/* Floating Offers Button */}
        <FloatingOffers 
          position="right" 
          color="#1b5e20" 
          couponsCount={5}
        />
        
        {/* Login Modal */}
        <LoginModal 
          isOpen={showLoginModal}
          onClose={closeLoginModal}
          onLogin={login}
        />
      </ThemeRenderer>
    </>
  );
}

export default App;