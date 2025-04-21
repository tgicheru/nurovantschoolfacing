import { useRecoilState } from 'recoil';
import authAtom from '../atoms/auth/auth.atom';

// Create a properly formatted JWT token for testing
// This is a mock token with the correct structure but it won't be valid on the server
// Format: header.payload.signature
const createMockJwtToken = () => {
  // Header: { "alg": "HS256", "typ": "JWT" }
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  
  // Payload with standard JWT claims and user info
  const payload = btoa(JSON.stringify({
    sub: 'mock-user-id',
    name: 'Test User',
    email: 'test@example.com',
    role: 'teacher',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600 // 1 hour from now
  }));
  
  // Signature (mock)
  const signature = btoa('mock-signature');
  
  // Combine to create JWT format
  return `${header}.${payload}.${signature}`;
};

/**
 * Helper function to set up mock authentication for testing
 * This will set a mock token and user in the auth state
 */
export const setupMockAuth = () => {
  // Get auth data from localStorage
  const authData = localStorage.getItem('authentication');
  let auth = {
    isLoggedIn: false,
    user: null,
    token: null,
    onBoarded: false,
    role: null,
    isAdmin: false,
  };
  
  if (authData) {
    try {
      auth = JSON.parse(authData);
    } catch (error) {
      console.error('Error parsing auth data:', error);
    }
  }
  
  // Only set mock auth if not already logged in
  if (!auth.isLoggedIn || !auth.token) {
    // Create mock auth data
    const mockAuth = {
      isLoggedIn: true,
      user: {
        _id: 'mock-user-id',
        first_name: 'Test',
        last_name: 'User',
        email: 'test@example.com',
        role: 'teacher',
      },
      token: createMockJwtToken(),
      onBoarded: true,
      role: 'teacher',
      isAdmin: false,
    };
    
    // Save to localStorage
    localStorage.setItem('authentication', JSON.stringify(mockAuth));
    
    console.log('Mock authentication set up for testing');
    return true;
  }
  
  return false;
};

/**
 * React hook to use mock authentication
 * Returns a function to toggle mock auth on/off
 */
export const useMockAuth = () => {
  const [auth, setAuth] = useRecoilState(authAtom);
  
  const toggleMockAuth = () => {
    if (auth.isLoggedIn && auth.token) {
      // Clear auth
      setAuth({
        isLoggedIn: false,
        user: null,
        token: null,
        onBoarded: false,
        role: null,
        isAdmin: false,
      });
      return false;
    } else {
      // Set mock auth
      setAuth({
        isLoggedIn: true,
        user: {
          _id: 'mock-user-id',
          first_name: 'Test',
          last_name: 'User',
          email: 'test@example.com',
          role: 'teacher',
        },
        token: createMockJwtToken(),
        onBoarded: true,
        role: 'teacher',
        isAdmin: false,
      });
      return true;
    }
  };
  
  return { toggleMockAuth, isAuthenticated: auth.isLoggedIn };
};
