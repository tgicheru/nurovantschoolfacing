import { useState } from 'react';
import { useMutation } from 'react-query';
import authService, { AdminSignUpRequest, SignUpResponse } from '../../services/auth.service';

/**
 * Hook for admin user sign-up
 * @returns Object containing mutation function, loading state, error, and data
 */
export const useAdminSignUp = () => {
  const [isAuthError, setIsAuthError] = useState(false);
  
  const mutation = useMutation<SignUpResponse, Error, AdminSignUpRequest>(
    async (signUpData: AdminSignUpRequest) => {
      try {
        setIsAuthError(false);
        return await authService.adminSignUp(signUpData);
      } catch (err: any) {
        // Check if error is authentication related
        if (err.response?.status === 401 || 
            err.response?.status === 403 || 
            (err.response?.data?.message && 
             err.response?.data?.message.includes('not authenticated'))) {
          console.error('Authentication error during admin sign-up:', err);
          setIsAuthError(true);
        }
        throw err;
      }
    }
  );

  return {
    adminSignUp: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    error: mutation.error,
    isAuthError,
    data: mutation.data
  };
};

/**
 * Hook for user sign-in
 * @returns Object containing mutation function, loading state, error, and data
 */
export const useSignIn = () => {
  const [isAuthError, setIsAuthError] = useState(false);
  
  const mutation = useMutation<SignUpResponse, Error, { email: string; password: string }>(
    async ({ email, password }) => {
      try {
        setIsAuthError(false);
        return await authService.signIn(email, password);
      } catch (err: any) {
        // Check if error is authentication related
        if (err.response?.status === 401 || 
            err.response?.status === 403 || 
            (err.response?.data?.message && 
             err.response?.data?.message.includes('not authenticated'))) {
          console.error('Authentication error during sign-in:', err);
          setIsAuthError(true);
        }
        throw err;
      }
    }
  );

  return {
    signIn: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    error: mutation.error,
    isAuthError,
    data: mutation.data
  };
};

/**
 * Hook for checking authentication status
 * @returns Object containing isAuthenticated flag and current user data
 */
export const useAuth = () => {
  const isAuthenticated = authService.isAuthenticated();
  const currentUser = authService.getCurrentUser();
  
  const signOut = () => {
    authService.signOut();
    // Force a page reload to clear any cached data
    window.location.href = '/';
  };
  
  return {
    isAuthenticated,
    currentUser,
    signOut
  };
};
