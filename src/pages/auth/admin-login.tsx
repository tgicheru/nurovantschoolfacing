import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Form, Input, Divider, Checkbox, notification } from 'antd';
import { useRecoilState } from 'recoil';
import authAtom from '../../atoms/auth/auth.atom';
import { useAdminLogin } from '../../hooks/auth/auth';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useRecoilState(authAtom);
  const [rememberMe, setRememberMe] = useState(false);
  
  const { adminLogin, isLoading, error } = useAdminLogin();
  
  // Handle login with the admin login API
  const handleLogin = async (values: any) => {
    try {
      console.log('Submitting admin login form:', { email: values.email });
      
      // Call the admin login API
      const response = await adminLogin({
        email: values.email,
        password: values.password
      });
      
      console.log('Admin login response received:', response);
      
      // Check if login was successful based on different possible response structures
      const isSuccessful = response.success || 
        (response.data && response.data.token) || 
        response.token;
      
      if (isSuccessful) {
        // Extract user data and token from different possible response structures
        const userData = response.data?.user || response.user || {};
        const token = response.data?.token || response.token;
        
        console.log('Login successful, extracted data:', { userData, token });
        
        // Update Recoil state with normalized data
        const newAuthState = {
          ...auth,
          isLoggedIn: true,
          user: userData,
          isAdmin: true,
          token: token,
          onBoarded: true // Admin users don't need onboarding
        };
        
        console.log('Setting auth state:', newAuthState);
        setAuth(newAuthState);
        
        notification.success({
          message: 'Login Successful',
          description: 'You have successfully logged in as an admin.'
        });
        
        // Force a small delay to ensure state is updated before navigation
        setTimeout(() => {
          // Use direct window location change for a full page refresh
          console.log('Redirecting to admin dashboard');
          window.location.href = '/admin/dashboard';
        }, 500);
      } else {
        // Handle unsuccessful login
        console.error('Login unsuccessful:', response);
        notification.error({
          message: 'Login Failed',
          description: response.message || 'Invalid credentials. Please try again.'
        });
      }
    } catch (err: any) {
      console.error('Admin login error:', err);
      notification.error({
        message: 'Login Failed',
        description: err.response?.data?.message || 'An error occurred during login.'
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FDF8F3] flex flex-col items-center justify-center">
      <div className="w-full max-w-md px-4">
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#101828] mb-2">Admin Sign In</h2>
          <p className="text-sm text-[#667085]">
            Welcome back! Please enter your details.
          </p>
        </div>
        
        <Form layout="vertical" onFinish={handleLogin} className="w-full">
          <Form.Item 
            label={<span className="text-sm font-medium text-[#101828]">Email</span>}
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input 
              placeholder="Enter your email"
              className="h-[44px] rounded-lg border border-[#D0D5DD] bg-white px-3 py-2 text-[#101828]"
            />
          </Form.Item>
          
          <Form.Item 
            label={<span className="text-sm font-medium text-[#101828]">Password</span>}
            name="password"
            rules={[
              { required: true, message: 'Please enter your password' }
            ]}
          >
            <Input.Password 
              placeholder="Enter your password"
              className="h-[44px] rounded-lg border border-[#D0D5DD] bg-white px-3 py-2 text-[#101828]"
            />
          </Form.Item>
          
          <div className="flex items-center justify-between mb-6">
            <Checkbox 
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="text-sm text-[#101828]"
            >
              Remember me
            </Checkbox>
            
            <Link 
              to="/auth/forgot"
              className="text-sm font-medium text-[#4970FC]"
            >
              Forgot password?
            </Link>
          </div>
          
          <Button 
            htmlType="submit"
            className="w-full h-12 rounded-full font-medium bg-[#4970FC] text-white hover:bg-[#3A5AD9]"
            type="primary"
            loading={isLoading}
          >
            Sign in
          </Button>
        </Form>
        
        <div className="text-center mt-6">
          <p className="text-sm text-[#667085]">
            Don't have an account? <Link to="/auth/role-selection" className="text-[#4970FC] font-medium">Sign up</Link>
          </p>
        </div>
        
        <div className="text-center mt-10 text-xs text-[#667085]">
          <p>By signing in, you agree to our <Link to="/public/terms" className="text-[#4970FC]">Terms of Service</Link> and <Link to="/public/privacy" className="text-[#4970FC]">Privacy Policy</Link></p>
          <p className="mt-2">© NurovantAI 2024. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
