// src/utils/localStorage.js
/**
 * Get an item from localStorage with error handling
 * @param {string} key - The key to get from localStorage
 * @param {*} defaultValue - The default value to return if the key is not found
 * @returns {*} The value from localStorage or the default value
 */
export const getFromStorage = (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error getting ${key} from localStorage:`, error);
      return defaultValue;
    }
  };
  
  /**
   * Set an item in localStorage with error handling
   * @param {string} key - The key to set in localStorage
   * @param {*} value - The value to store
   * @returns {boolean} Whether the operation was successful
   */
  export const setInStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting ${key} in localStorage:`, error);
      return false;
    }
  };
  
  /**
   * Remove an item from localStorage with error handling
   * @param {string} key - The key to remove from localStorage
   * @returns {boolean} Whether the operation was successful
   */
  export const removeFromStorage = (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
      return false;
    }
  };