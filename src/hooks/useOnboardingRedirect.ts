import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import authAtom from '../atoms/auth/auth.atom';

/**
 * Custom hook to handle onboarding redirection logic
 * This hook is now primarily used to ensure authenticated users who haven't completed onboarding
 * are properly redirected to the main dashboard after completing onboarding
 */
const useOnboardingRedirect = () => {
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();

  useEffect(() => {
    // Only handle redirection for authenticated users
    if (auth.isLoggedIn && auth.token) {
      const currentPath = window.location.pathname;
      
      // If user has completed onboarding but is still on an onboarding page,
      // redirect them to the appropriate dashboard
      if (auth.onBoarded && currentPath.startsWith('/onboarding')) {
        console.log('User has completed onboarding, redirecting to dashboard');
        if (auth.isAdmin) {
          navigate('/admin/dashboard');
        } else {
          navigate('/main');
        }
      }
      
      // If user hasn't completed onboarding and tries to access protected routes,
      // ensure they complete onboarding first
      if (!auth.onBoarded && !currentPath.startsWith('/onboarding') && !currentPath.startsWith('/auth')) {
        console.log('Authenticated user needs to complete onboarding');
        navigate('/onboarding');
      }
    }
  }, [auth.isLoggedIn, auth.token, auth.onBoarded, auth.isAdmin, navigate]);
};

export default useOnboardingRedirect;
