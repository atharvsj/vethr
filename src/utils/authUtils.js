/**
 * Authentication utility functions
 */
import { jwtDecode } from 'jwt-decode';

/**
 * Check if a JWT token is valid and not expired
 * @param {string} token - JWT token to validate
 * @returns {boolean} - True if token is valid and not expired
 */
export const isTokenValid = (token) => {
  if (!token) return false;
  
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    
    // Check if token is expired
    if (decodedToken.exp && decodedToken.exp < currentTime) {
      return false;
    }
    
    return true;
  } catch (error) {
    // If token can't be decoded, assume it's invalid
    return false;
  }
};

/**
 * Get user info from JWT token
 * @param {string} token - JWT token
 * @returns {Object|null} - User info or null if token is invalid
 */
export const getUserFromToken = (token) => {
  if (!token) return null;
  
  try {
    const decodedToken = jwtDecode(token);
    return {
      ...(decodedToken.user_id && { id: decodedToken.user_id }),
      ...(decodedToken.username && { username: decodedToken.username }),
      ...(decodedToken.email && { email: decodedToken.email }),
    };
  } catch (error) {
    return null;
  }
};

/**
 * Check if user has required role
 * @param {string} userRole - User's role
 * @param {Array<string>} allowedRoles - Allowed roles
 * @returns {boolean} - True if user has required role
 */
export const hasRequiredRole = (userRole, allowedRoles = []) => {
  if (!userRole || !allowedRoles.length) return false;
  return allowedRoles.includes(userRole);
};

/**
 * Get dashboard path based on user role
 * @param {string} role - User role
 * @returns {string} - Dashboard path
 */
export const getDashboardPathByRole = (role) => {
  if (!role) return '/';
  
  if (role === 'employee' || role === 'Reporting Manager' || role === 'Manager 1') {
    return '/dashboard/home';
  } else if (role === 'Intern') {
    return '/interndashboard/home';
  } else if (role === 'HR-Admin' || role === 'Superadmin') {
    return '/admindashboard/home';
  } else if (role === 'Hr') {
    return '/dashboardhr/home';
  } else if (role === 'Head') {
    return '/dashboardHead/home';
  } else if (role === 'Line Manager') {
    return '/dashboardLM/home';
  }
  
  return '/';
};

export default {
  isTokenValid,
  getUserFromToken,
  hasRequiredRole,
  getDashboardPathByRole
};


