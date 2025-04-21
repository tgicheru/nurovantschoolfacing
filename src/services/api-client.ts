import axios from 'axios';

// Create an axios instance with default configuration
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://api.nurovantai.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token
apiClient.interceptors.request.use(
  (config) => {
    // Get token from recoil-persist in localStorage
    const authData = localStorage.getItem('authentication');
    let token = null;
    
    if (authData) {
      try {
        const parsedAuthData = JSON.parse(authData);
        
        // Check for token property format - it might be in the format "token":"value"
        if (typeof parsedAuthData === 'string' && parsedAuthData.includes('token":"')) {
          // Extract token from string format
          const tokenMatch = parsedAuthData.match(/token":"([^"]+)/);
          if (tokenMatch && tokenMatch[1]) {
            token = tokenMatch[1];
            console.log('Extracted token from string format');
          }
        } else if (parsedAuthData.token) {
          // Normal object format
          token = parsedAuthData.token;
        }
        
        // Debug log the token format (first 10 chars only for security)
        if (token) {
          const tokenPreview = token.substring(0, 10) + '...';
          console.log(`Using token: ${tokenPreview}`);
        } else {
          console.warn('Token not found in parsed auth data:', parsedAuthData);
        }
      } catch (error) {
        console.error('Error parsing auth data:', error);
        
        // Try to extract token directly from string if JSON parsing failed
        if (typeof authData === 'string' && authData.includes('token":"')) {
          const tokenMatch = authData.match(/token":"([^"]+)/);
          if (tokenMatch && tokenMatch[1]) {
            token = tokenMatch[1];
            console.log('Extracted token from raw string after JSON parse error');
          }
        }
      }
    }
    
    // If token exists, add it to the headers
    if (token) {
      // Ensure proper format: 'Bearer ' + token
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Request headers:', JSON.stringify(config.headers));
      console.log('Request URL:', config.url);
    } else {
      console.warn('No token available for request:', config.url);
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle authentication errors
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.warn(`Authentication error:`, error.response.data);
      
      // Don't automatically redirect - let the component handle it
      // window.location.href = '/auth/login';
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
