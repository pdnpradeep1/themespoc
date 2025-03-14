// src/components/auth/UserAuthDropdown.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './UserAuth.css';
import { useAuth } from '../../context/AuthContext';

const UserAuthDropdown = ({ isLoggedIn, userData, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { openLoginModal } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle navigation to login/register
  const handleNavigation = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  // Handle modal login
  const handleModalLogin = () => {
    setIsOpen(false);
    openLoginModal();
  };

  return (
    <div className="user-auth-dropdown" ref={dropdownRef}>
      <button 
        className="user-auth-toggle" 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {isLoggedIn ? (
          <div className="user-avatar">
            {userData?.avatar ? (
              <img src={userData.avatar} alt={userData.name} />
            ) : (
              <span className="avatar-text">{userData?.name?.charAt(0) || 'U'}</span>
            )}
          </div>
        ) : (
          <div className="auth-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>Account</span>
          </div>
        )}
      </button>

      <div className={`auth-dropdown ${isOpen ? 'open' : ''}`}>
        {isLoggedIn ? (
          <div className="user-dropdown-content">
            <div className="user-info">
              <p className="user-greeting">Hello, {userData?.name || 'User'}</p>
              <p className="user-email">{userData?.email || ''}</p>
            </div>
            <div className="dropdown-divider"></div>
            <ul className="user-menu">
              <li>
                <Link to="/account" onClick={() => setIsOpen(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/orders" onClick={() => setIsOpen(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="18" rx="2"></rect>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                    <line x1="8" y1="16" x2="12" y2="16"></line>
                  </svg>
                  My Orders
                </Link>
              </li>
              <li>
                <Link to="/wishlist" onClick={() => setIsOpen(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/settings" onClick={() => setIsOpen(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                  Settings
                </Link>
              </li>
              <li className="logout-item">
                <button onClick={() => {
                  onLogout();
                  setIsOpen(false);
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="auth-options">
            {/* Use direct navigation functions instead of Link to make it work better */}
            <button 
              className="auth-link" 
              onClick={() => handleNavigation('/login')}
            >
              Login
            </button>
            <div className="dropdown-divider"></div>
            <button 
              className="auth-link" 
              onClick={() => handleNavigation('/register')}
            >
              Register
            </button>
            <div className="dropdown-divider"></div>
            <button 
              className="auth-link" 
              onClick={() => handleNavigation('/track-order')}
            >
              Track Order
            </button>
            <div className="dropdown-divider"></div>
            <button 
              className="auth-link" 
              onClick={handleModalLogin}
            >
              Quick Login (Modal)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAuthDropdown;