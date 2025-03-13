// src/themes/ModernTheme/ThemeContext.jsx
import React, { createContext, useContext, useState } from 'react';

// Create a context for theme values
const ModernThemeContext = createContext();

// Custom hook to use the theme context
export const useModernTheme = () => {
  const context = useContext(ModernThemeContext);
  if (!context) {
    throw new Error('useModernTheme must be used within a ModernThemeProvider');
  }
  return context;
};

export const ModernThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    // You could also save the preference to localStorage here
  };
  
  // Values to expose in the context
  const value = {
    isDarkMode,
    toggleDarkMode
  };
  
  return (
    <ModernThemeContext.Provider value={value}>
      {children}
    </ModernThemeContext.Provider>
  );
};