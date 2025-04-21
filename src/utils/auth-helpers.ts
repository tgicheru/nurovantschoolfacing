import { useRecoilValue } from 'recoil';
import authAtom from '../atoms/auth/auth.atom';

/**
 * Helper function to get the current authentication token
 * @returns The current authentication token or null if not authenticated
 */
export const getAuthToken = (): string | null => {
  try {
    const authData = localStorage.getItem('authentication');
    if (authData) {
      const parsedAuthData = JSON.parse(authData);
      return parsedAuthData.token;
    }
  } catch (error) {
    console.error('Error retrieving auth token:', error);
  }
  return null;
};

/**
 * Helper function to check if the user is authenticated
 * @returns True if the user is authenticated, false otherwise
 */
export const isAuthenticated = (): boolean => {
  try {
    const authData = localStorage.getItem('authentication');
    if (authData) {
      const parsedAuthData = JSON.parse(authData);
      return !!parsedAuthData.token && parsedAuthData.isLoggedIn;
    }
  } catch (error) {
    console.error('Error checking authentication:', error);
  }
  return false;
};

/**
 * React hook to check if the user is authenticated
 * @returns Object containing authentication status and user data
 */
export const useAuth = () => {
  const auth = useRecoilValue(authAtom);
  
  return {
    isAuthenticated: !!auth.token && auth.isLoggedIn,
    user: auth.user,
    token: auth.token,
    role: auth.role,
    isAdmin: auth.isAdmin
  };
};
