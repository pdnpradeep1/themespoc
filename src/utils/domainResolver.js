// src/utils/domainResolver.js
/**
 * Extract the store subdomain from a hostname
 * @param {string} hostname - The hostname to extract from
 * @param {string} baseDomain - The base domain to remove
 * @returns {string|null} The subdomain or null if none found
 */
export const extractSubdomain = (hostname, baseDomain = 'example.com') => {
    if (!hostname || hostname === 'localhost' || hostname === '127.0.0.1') {
      return null;
    }
    
    // Check if this is a custom domain (not a subdomain of baseDomain)
    if (!hostname.endsWith(baseDomain)) {
      return hostname; // Return the full hostname as a custom domain
    }
    
    // Extract subdomain from hostname
    const parts = hostname.split('.');
    
    // Calculate how many parts to remove (baseDomain parts)
    const baseparts = baseDomain.split('.');
    
    // If there are more parts in hostname than in baseDomain, we have a subdomain
    if (parts.length > baseparts.length) {
      return parts[0];
    }
    
    return null;
  };
  
  /**
   * Check if the current environment is development
   * @returns {boolean} Whether it's dev environment
   */
  export const isDevelopment = () => {
    return process.env.NODE_ENV === 'development' || 
      window.location.hostname === 'localhost' || 
      window.location.hostname === '127.0.0.1';
  };