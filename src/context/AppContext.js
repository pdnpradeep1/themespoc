// // src/context/AppContext.js
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useThemeContext } from './ThemeContext';
// import { storeApi } from '../api/storeApi';
// import { categoryApi } from '../api/categoryApi';

// // Create a unified app context
// const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   // Authentication state
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const [showLoginModal, setShowLoginModal] = useState(false);
  
//   // Store data
//   const [storeData, setStoreData] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   // Promotion state
//   const [promotions, setPromotions] = useState([]);
//   const [coupons, setCoupons] = useState([]);
  
//   // Theme context
//   const { themeConfig, fetchThemeConfig } = useThemeContext();
  
//   // Load auth state from localStorage on initial render
//   useEffect(() => {
//     const savedUser = localStorage.getItem('user');
//     const savedAuthStatus = localStorage.getItem('isLoggedIn');
    
//     if (savedUser && savedAuthStatus === 'true') {
//       setUserData(JSON.parse(savedUser));
//       setIsLoggedIn(true);
//     }
//   }, []);
  
//   // Fetch store data and categories
//   const fetchStoreData = async (storeId) => {
//     if (!storeId) return;
    
//     setLoading(true);
//     setError(null);
    
//     try {
//       // Fetch store data, theme config, and categories in parallel
//       const [storeResponse, themeResponse, categoriesResponse] = await Promise.all([
//         storeApi.getStoreById(storeId),
//         fetchThemeConfig(storeId),
//         categoryApi.getCategories(storeId)
//       ]);
      
//       setStoreData(storeResponse.data);
//       setCategories(categoriesResponse.data);
      
//       // Mock promotions and coupons (in real app, would come from API)
//       setPromotions([
//         {
//           id: 1,
//           message: 'Get 10% OFF on all products. Limited time offer!',
//           endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
//           link: '/sale',
//           linkText: 'Shop Now',
//           bgColor: '#1F6B75',
//           textColor: '#ffffff'
//         }
//       ]);
      
//       setCoupons([
//         {
//           code: 'FLAT11',
//           description: 'You will save ₹11 with this coupon',
//           details: 'Get ₹11 off on item total above ₹11. Applicable On both online and COD',
//         },
//         {
//           code: 'FREEGIFTWRAP',
//           description: 'You get item worth ₹1 for FREE.',
//           details: 'Get Gift Wrap Packaging worth ₹1 FREE on every purchase. Applicable On both online and COD',
//         },
//         {
//           code: '123123',
//           description: '',
//           details: 'Buy 3 item and get 2 item FREE on specific products. Applicable On both online and COD',
//           specificProducts: true
//         },
//         {
//           code: 'BUY3GET4',
//           description: '',
//           details: 'Buy 3 item and get 1 item FREE on specific products. Applicable On both online and COD',
//           specificProducts: true
//         },
//         {
//           code: 'PERCENT100',
//           description: 'Add items worth ₹60 to get this offer',
//           details: 'Get 12% off on item total above ₹100 (upto ₹12). Applicable On both online and COD',
//           additionalRequirement: true
//         }
//       ]);
      
//     } catch (err) {
//       console.error('Error fetching app data:', err);
//       setError('Failed to load store data. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   // Authentication methods
//   const login = (user) => {
//     setUserData(user);
//     setIsLoggedIn(true);
//     localStorage.setItem('user', JSON.stringify(user));
//     localStorage.setItem('isLoggedIn', 'true');
//     setShowLoginModal(false);
//   };
  
//   const logout = () => {
//     setUserData(null);
//     setIsLoggedIn(false);
//     localStorage.removeItem('user');
//     localStorage.removeItem('isLoggedIn');
//   };
  
//   const openLoginModal = () => {
//     setShowLoginModal(true);
//   };
  
//   const closeLoginModal = () => {
//     setShowLoginModal(false);
//   };
  
//   // Provide all values to the context
//   const value = {
//     // Auth values
//     isLoggedIn,
//     userData,
//     login,
//     logout,
//     showLoginModal,
//     openLoginModal,
//     closeLoginModal,
    
//     // Store values
//     storeData,
//     categories,
//     loading,
//     error,
//     fetchStoreData,
    
//     // Promotions and coupons
//     promotions,
//     coupons,
    
//     // Theme 
//     themeConfig
//   };
  
//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// export const useAppContext = () => {
//   return useContext(AppContext);
// };

// // Usage in App.js (simplified)
// // ----------------------------
// // import { AppProvider, useAppContext } from './context/AppContext';
// //
// // function App() {
// //   return (
// //     <AppProvider>
// //       <AppContent />
// //     </AppProvider>
// //   );
// // }
// //
// // function AppContent() {
// //   const { 
// //     storeData, 
// //     categories, 
// //     promotions,
// //     loading, 
// //     error,
// //     isLoggedIn,
// //     showLoginModal,
// //     closeLoginModal,
// //     login
// //   } = useAppContext();
// //
// //   if (loading) return <Loader message="Loading store..." />;
// //   if (error) return <NotFoundPage message={error} />;
// //
// //   return (
// //     <>
// //       {promotions.length > 0 && (
// //         <PromotionBanner 
// //           message={promotions[0].message}
// //           enableTimer={true}
// //           endTime={promotions[0].endTime}
// //           link={promotions[0].link}
// //           linkText={promotions[0].linkText}
// //           bgColor={promotions[0].bgColor}
// //         />
// //       )}
// //       
// //       <ThemeRenderer storeInfo={storeData}>
// //         <Routes>
// //           <Route path="/" element={<HomePage />} />
// //           {...other routes}
// //         </Routes>
// //         
// //         <FloatingOffers />
// //         
// //         <LoginModal 
// //           isOpen={showLoginModal}
// //           onClose={closeLoginModal}
// //           onLogin={login}
// //         />
// //       </ThemeRenderer>
// //     </>
// //   );
// // }

// src/context/AuthContext.js
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