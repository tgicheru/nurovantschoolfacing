import axios from 'axios';

// Define the base URL for API requests
const BASE_URL = process.env.REACT_APP_API_URL || '';

// Utility function to construct API URLs without double slashes
const constructApiUrl = (endpoint: string) => {
  const base = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${base}${path}`;
};

// Interface for the admin sign-up request
export interface AdminSignUpRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  state: string;
  sex: string;
  grade_level: string;
  subject: string;
  user_type: 'ADMIN';
  skip_verification?: boolean;
}

// Interface for the sign-up response
export interface SignUpResponse {
  success: boolean;
  data?: {
    token: string;
    user?: {
      _id: string;
      first_name: string;
      last_name: string;
      email: string;
      state: string;
      sex: string;
      grade_level: string;
      subject: string;
      user_type: string;
      createdAt: string;
      updatedAt: string;
    };
  };
  // For direct response structure (not nested under data)
  token?: string;
  user?: {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    state: string;
    sex: string;
    grade_level: string;
    subject: string;
    user_type: string;
    createdAt: string;
    updatedAt: string;
  };
  message?: string;
}

// Helper function to get authentication token
export const getAuthToken = () => {
  const authData = localStorage.getItem('authentication');
  let token = null;

  if (authData) {
    try {
      const parsedAuthData = JSON.parse(authData);
      
      if (typeof parsedAuthData === 'string' && parsedAuthData.includes('token":"')) {
        const tokenMatch = parsedAuthData.match(/token":"([^"]+)/);
        token = tokenMatch ? tokenMatch[1] : null;
      } else if (parsedAuthData && typeof parsedAuthData === 'object') {
        if (parsedAuthData.token) {
          token = parsedAuthData.token;
        } else if (parsedAuthData.data && parsedAuthData.data.token) {
          token = parsedAuthData.data.token;
        }
      }
    } catch (error) {
      console.error('Error parsing auth data:', error);
    }
  }

  return token;
};

// Authentication service
const authService = {
  /**
   * Admin User Sign Up
   * Endpoint: /teacher_api/auth/sign_up
   * @param data Admin sign-up data
   * @returns Promise with sign-up response
   */
  adminSignUp: async (data: AdminSignUpRequest): Promise<SignUpResponse> => {
    try {
      const response = await axios.post(constructApiUrl('teacher_api/auth/sign_up'), data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      // Store authentication data in localStorage
      if (response.data.success && response.data.data.token) {
        localStorage.setItem('authentication', JSON.stringify(response.data));
      }
      
      return response.data;
    } catch (error) {
      console.error('Error during admin sign-up:', error);
      throw error;
    }
  },
  
  /**
   * Admin Login
   * Endpoint: /teacher_api/auth/login
   * @param email Admin email
   * @param password Admin password
   * @returns Promise with login response
   */
  adminLogin: async (email: string, password: string): Promise<SignUpResponse> => {
    try {
      console.log('Attempting admin login with:', { email });
      
      const response = await axios.post(constructApiUrl('teacher_api/auth/login'), {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Admin login response:', response.data);
      
      // Extract data based on response structure
      const responseData = response.data;
      
      // Determine if login was successful based on different possible response structures
      const isSuccessful = responseData.success || 
        (responseData.data && responseData.data.token) || 
        responseData.token;
      
      if (isSuccessful) {
        // Extract token and user data from different possible response structures
        const token = responseData.data?.token || responseData.token;
        const userData = responseData.data?.user || responseData.user || {};
        
        // Create a normalized auth data structure
        const authData = {
          success: true,
          data: {
            token: token,
            user: userData
          },
          isLoggedIn: true,
          isAdmin: true
        };
        
        console.log('Storing auth data:', authData);
        localStorage.setItem('authentication', JSON.stringify(authData));
        localStorage.setItem('isAdmin', 'true');
      }
      
      return responseData;
    } catch (error) {
      console.error('Error during admin login:', error);
      throw error;
    }
  },
  
  /**
   * Sign In
   * @param email User email
   * @param password User password
   * @returns Promise with sign-in response
   */
  signIn: async (email: string, password: string): Promise<SignUpResponse> => {
    try {
      const response = await axios.post(constructApiUrl('teacher_api/auth/sign_in'), {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      // Store authentication data in localStorage
      if (response.data.success && response.data.data.token) {
        localStorage.setItem('authentication', JSON.stringify(response.data));
      }
      
      return response.data;
    } catch (error) {
      console.error('Error during sign-in:', error);
      throw error;
    }
  },
  
  /**
   * Sign Out
   * Removes authentication data from localStorage
   */
  signOut: (): void => {
    localStorage.removeItem('authentication');
  },
  
  /**
   * Check if user is authenticated
   * @returns Boolean indicating if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return getAuthToken() !== null;
  },
  
  /**
   * Get current user data from localStorage
   * @returns User data or null if not authenticated
   */
  getCurrentUser: () => {
    const authData = localStorage.getItem('authentication');
    
    if (authData) {
      try {
        const parsedAuthData = JSON.parse(authData);
        if (parsedAuthData && parsedAuthData.data && parsedAuthData.data.user) {
          return parsedAuthData.data.user;
        }
      } catch (error) {
        console.error('Error parsing current user data:', error);
      }
    }
    
    return null;
  }
};

export default authService;
