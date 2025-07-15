import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import authAtom from '../atoms/auth/auth.atom';
import { notification } from 'antd';
import { useContext } from 'react';
import { AxiosContext } from '../context/AxiosContext';
import { AxiosInstance } from 'axios';
import { useMutation } from 'react-query';
import { putRequest } from '../context/requestTypes';

/**
 * Custom hook to handle onboarding completion
 * Updates the user's onboarded status and redirects to the appropriate dashboard or auth page
 */
const useCompleteOnboarding = () => {
  const [auth, setAuth] = useRecoilState(authAtom);
  const navigate = useNavigate();
  const axios = useContext(AxiosContext);
  
  // Mutation to update user onboarding status if they're logged in
  const updateOnboardingStatus = useMutation(
    (userId: string) => {
      const url = `/teacher_api/users/${userId}/update_onboarding`;
      return putRequest(axios as unknown as AxiosInstance, url, { onboarded: true });
    },
    {
      onSuccess: () => {
        // Successfully updated onboarding status on the server
        console.log('Onboarding status updated successfully');
      },
      onError: (error: any) => {
        console.error('Failed to update onboarding status:', error);
      }
    }
  );

  /**
   * Complete the onboarding process
   * If user is logged in, updates their onboarded status on the server
   * Otherwise, directs them to authentication
   */
  const completeOnboarding = () => {
    // Show success notification
    notification.success({
      message: 'Onboarding Complete',
      description: 'You have successfully completed the product tour!',
      duration: 3
    });
    
    // If user is already logged in, update their onboarding status
    if (auth.isLoggedIn && auth.user?.id) {
      // Update the onBoarded flag in the auth state
      setAuth({
        ...auth,
        onBoarded: true
      });
      
      // Update the onboarding status on the server
      updateOnboardingStatus.mutate(auth.user.id);
      
      // Navigate to the appropriate dashboard based on user role
      if (auth.isAdmin) {
        navigate('/admin/dashboard');
      } else {
        navigate('/main');
      }
    } else {
      // User is not logged in, direct them to authentication
      navigate('/auth/login');
    }
  };

  return { completeOnboarding };
};

export default useCompleteOnboarding;
