// src/components/store/EnhancedNavigationMenu.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavigationMenu.css';

const EnhancedNavigationMenu = ({ 
  position = 'below-header',
  categories = [],
  showMobileMenu = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const location = useLocation();
  const menuRef = useRef(null);

  // Close mobile menu on location change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
        setDropdownOpen(null);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Sample menu items with dropdowns
  const menuItems = [
    { 
      label: 'Home', 
      path: '/',
      isActive: location.pathname === '/',
    },
    { 
      label: 'Shop', 
      path: '/products',
      isActive: location.pathname === '/products' || location.pathname.startsWith('/products/'),
      children: categories.length > 0 ? categories.map(cat => ({
        label: cat.name,
        path: `/categories/${cat.id}`
      })) : [
        { label: 'New Arrivals', path: '/products?filter=new' },
        { label: 'Best Sellers', path: '/products?filter=bestsellers' },
        { label: 'Sale', path: '/products?filter=sale' },
      ]
    },
    { 
      label: 'Collections', 
      path: '/collections',
      isActive: location.pathname.startsWith('/collections'),
      children: [
        { label: 'Summer 2025', path: '/collections/summer-2025' },
        { label: 'Winter Essentials', path: '/collections/winter-essentials' },
        { label: 'Limited Edition', path: '/collections/limited-edition' },
      ]
    },
    { 
      label: 'About', 
      path: '/about',
      isActive: location.pathname === '/about',
    },
    { 
      label: 'Contact', 
      path: '/contact',
      isActive: location.pathname === '/contact',
    },
  ];

  const toggleDropdown = (index, e) => {
    e.preventDefault(); // Prevent navigation to the parent URL
    e.stopPropagation(); // Prevent other handlers from firing
    
    if (dropdownOpen === index) {
      setDropdownOpen(null);
    } else {
      setDropdownOpen(index);
    }
  };

  return (
    <nav className={`main-navigation nav-position-${position}`} ref={menuRef}>
      {showMobileMenu && (
        <button 
          className="mobile-menu-toggle" 
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          <span className="hamburger-icon">
            <span className={`bar ${isOpen ? 'open' : ''}`}></span>
            <span className={`bar ${isOpen ? 'open' : ''}`}></span>
            <span className={`bar ${isOpen ? 'open' : ''}`}></span>
          </span>
          <span className="mobile-menu-text">Menu</span>
        </button>
      )}

      <div className={`nav-menu-container ${isOpen ? 'open' : ''}`}>
        <ul className="nav-menu">
          {menuItems.map((item, index) => (
            <li key={index} className={`nav-item ${item.isActive ? 'active' : ''}`}>
              {item.children ? (
                <>
                  <button 
                    className={`nav-link dropdown-toggle ${item.isActive ? 'active' : ''}`}
                    onClick={(e) => toggleDropdown(index, e)}
                    aria-expanded={dropdownOpen === index}
                  >
                    {item.label}
                    <span className="dropdown-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </button>
                  <div className={`dropdown-menu ${dropdownOpen === index ? 'open' : ''}`}>
                    {item.children.map((child, childIndex) => (
                      <Link 
                        key={childIndex} 
                        to={child.path} 
                        className="dropdown-item"
                        onClick={() => setDropdownOpen(null)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link to={item.path} className={`nav-link ${item.isActive ? 'active' : ''}`}>
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default EnhancedNavigationMenu;