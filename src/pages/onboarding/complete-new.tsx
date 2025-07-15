import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { CheckCircleOutlined, LeftOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import useCompleteOnboarding from '../../hooks/useCompleteOnboarding';

const CompleteOnboarding: React.FC = () => {
  const navigate = useNavigate();
  const { completeOnboarding } = useCompleteOnboarding();

  // Function to handle navigation to the previous onboarding screen
  const handleBack = () => {
    navigate('/onboarding/courses');
  };
  
  // Function to handle sign up
  const handleSignUp = () => {
    completeOnboarding();
    navigate('/auth/register');
  };
  
  // Function to handle login
  const handleLogin = () => {
    completeOnboarding();
    navigate('/auth/login');
  };

  return (
    <div className="flex min-h-screen bg-[#F5F7FF]">
      {/* Left side with text */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16">
        <div className="mb-10">
          <h1 className="text-[#4970FC] text-3xl font-bold">NurovantAI</h1>
        </div>
        
        <div className="mb-14">
          <div className="flex items-center mb-5">
            <CheckCircleOutlined className="text-green-500 text-4xl mr-4" />
            <h2 className="text-4xl font-bold text-gray-800">All Set!</h2>
          </div>
          
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            You're now ready to start using NurovantAI. Choose an option below to continue.
          </p>
        </div>

        {/* Pagination dots */}
        <div className="flex space-x-2 mb-10">
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-6 h-2 bg-[#4970FC] rounded-full"></div>
        </div>

        {/* Action buttons */}
        <div className="space-y-5">
          <Button 
            type="primary" 
            shape="round" 
            size="large"
            className="bg-[#4970FC] hover:bg-[#3a5bd9] flex items-center justify-center w-full h-12 text-base font-medium shadow-md"
            onClick={handleSignUp}
          >
            <UserOutlined className="mr-2" /> Sign Up
          </Button>
          
          <Button 
            shape="round" 
            size="large"
            className="flex items-center justify-center w-full h-12 text-base font-medium border-gray-300"
            onClick={handleLogin}
          >
            <LoginOutlined className="mr-2" /> Login
          </Button>
          
          <Button 
            type="link"
            className="flex items-center justify-center w-full text-gray-500 text-base font-medium mt-4"
            onClick={handleBack}
          >
            <LeftOutlined className="mr-2" /> Back to Previous Step
          </Button>
        </div>
      </div>
      
      {/* Right side with completion visualization */}
      <div className="hidden md:flex md:w-1/2 bg-[#F5F7FF] items-center justify-center p-8">
        <div className="relative w-full max-w-xl">
          {/* Completion visualization */}
          <div className="w-full bg-white rounded-xl shadow-lg p-8">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircleOutlined className="text-green-500 text-5xl" />
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-center mb-6">Ready to Get Started</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <CheckCircleOutlined className="text-green-500 text-sm" />
                </div>
                <div>
                  <div className="font-medium">Personalized Dashboard</div>
                  <div className="text-sm text-gray-500">Access all your courses and analytics in one place</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <CheckCircleOutlined className="text-green-500 text-sm" />
                </div>
                <div>
                  <div className="font-medium">Course Management</div>
                  <div className="text-sm text-gray-500">Create and manage your courses with ease</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <CheckCircleOutlined className="text-green-500 text-sm" />
                </div>
                <div>
                  <div className="font-medium">Student Analytics</div>
                  <div className="text-sm text-gray-500">Track student performance and engagement</div>
                </div>
              </div>
            </div>
            
            <div className="text-center text-gray-500 text-sm">
              Sign up or log in to access all features
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -right-16 -top-16 w-32 h-32 bg-green-500 opacity-10 rounded-full"></div>
          <div className="absolute -left-12 -bottom-12 w-24 h-24 bg-green-500 opacity-10 rounded-full"></div>
          
          {/* Decorative curved line */}
          <div className="absolute -left-16 top-1/2 w-32 h-64">
            <svg className="w-full h-full text-gray-300" viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M100 0C44.7715 0 0 44.7715 0 100C0 155.228 44.7715 200 100 200" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeDasharray="5 5"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteOnboarding;
