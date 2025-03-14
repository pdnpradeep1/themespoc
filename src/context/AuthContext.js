// Integration Guide for New E-commerce Components

/*
 * This guide will help you integrate the new components into your existing storefront project.
 * We've created several new components to enhance your e-commerce application:
 * 
 * 1. EnhancedNavigationMenu - A more robust navigation with dropdowns and mobile support
 * 2. UserAuthDropdown - Authentication UI with dropdown and modal functionality
 * 3. PromotionBanner - A site-wide announcement banner with countdown timer
 * 4. FloatingOffers - A side button that opens a coupon modal
 * 5. CouponModal - A modal to display available coupons and offers
 */

// STEP 1: Add User Authentication Context
// Create src/context/AuthContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  // Load auth state from localStorage on initial render
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedAuthStatus = localStorage.getItem('isLoggedIn');
    
    if (savedUser && savedAuthStatus === 'true') {
      setUserData(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);
  
  const login = (user) => {
    setUserData(user);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isLoggedIn', 'true');
  };
  
  const logout = () => {
    setUserData(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
  };
  
  const openLoginModal = () => {
    setShowLoginModal(true);
  };
  
  const closeLoginModal = () => {
    setShowLoginModal(false);
  };
  
  const value = {
    isLoggedIn,
    userData,
    login,
    logout,
    showLoginModal,
    openLoginModal,
    closeLoginModal
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};