// src/components/common/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
// Import new components
import EnhancedNavigationMenu from '../store/EnhancedNavigationMenu';
import UserAuthDropdown from '../auth/UserAuthDropdown';
import SearchBar from '../store/SearchBar';
import CartWidget from '../store/CartWidget';
import { useAuth } from '../../context/AuthContext';

const Header = ({ 
  storeName, 
  logo, 
  showSearch = true, 
  showCart = true,
  minimalist = false,
  bold = false,
  headerStyle = 'standard',
  navigationPosition = 'below-header'
}) => {
  const { isLoggedIn, userData, logout } = useAuth();
  const headerClass = `site-header ${minimalist ? 'minimalist' : ''} ${bold ? 'bold' : ''}`;

  return (
    <header className={headerClass} data-style={headerStyle} data-nav-position={navigationPosition}>
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
        
        {navigationPosition !== 'below-header' && (
          <EnhancedNavigationMenu position={navigationPosition} />
        )}
        
        <div className="header-actions">
          {showSearch && <SearchBar />}
          <UserAuthDropdown 
            isLoggedIn={isLoggedIn} 
            userData={userData} 
            onLogout={logout} 
          />
          {showCart && <CartWidget />}
        </div>
      </div>
      
      {navigationPosition === 'below-header' && (
        <div className="navigation-container">
          <EnhancedNavigationMenu position={navigationPosition} />
        </div>
      )}
    </header>
  );
};

export default Header;