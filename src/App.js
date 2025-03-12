// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDomainResolver } from './hooks/useDomainResolver';
import Loader from './components/common/Loader';
import ThemeRenderer from './themes/ThemeRenderer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const { storeInfo, loading, error } = useDomainResolver();

  if (loading) {
    return <Loader message="Loading store..." />;
  }

  if (error) {
    return <NotFoundPage message={error} />;
  }

  return (
    <ThemeRenderer storeInfo={storeInfo}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:productId" element={<ProductPage />} />
        <Route path="/categories/:categoryId" element={<CategoryPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ThemeRenderer>
  );
}

export default App;