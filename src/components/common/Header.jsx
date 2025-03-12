// src/components/common/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import NavigationMenu from '../store/NavigationMenu';
import SearchBar from '../store/SearchBar';
import CartWidget from '../store/CartWidget';

const Header = ({ 
  storeName, 
  logo, 
  showSearch = true, 
  showCart = true,
  minimalist = false,
  bold = false
}) => {
  const headerClass = `site-header ${minimalist ? 'minimalist' : ''} ${bold ? 'bold' : ''}`;

  return (
    <header className={headerClass}>
      <div className="header-container">
        <div className="logo-container">
          <Link to="/" className="logo-link">
            {logo ? (
              <img src={logo} alt={storeName} className="store-logo" />
            ) : (
              <h1 className="store-name">{storeName}</h1>
            )}
          </Link>
        </div>
        
        <NavigationMenu />
        
        <div className="header-actions">
          {showSearch && <SearchBar />}
          {showCart && <CartWidget />}
        </div>
      </div>
    </header>
  );
};

export default Header;
