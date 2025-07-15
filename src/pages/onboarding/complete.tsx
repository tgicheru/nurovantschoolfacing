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

        {/* Pagination dots - step counter */}
        <div className="flex space-x-2 mb-8">
          <div className="w-2 h-2 bg-[#D4D9F6] rounded-full"></div>
          <div className="w-2 h-2 bg-[#D4D9F6] rounded-full"></div>
          <div className="w-2 h-2 bg-[#D4D9F6] rounded-full"></div>
          <div className="w-2 h-2 bg-[#D4D9F6] rounded-full"></div>
          <div className="w-2 h-2 bg-[#D4D9F6] rounded-full"></div>
          <div className="w-6 h-2 bg-[#4970FC] rounded-full"></div>
          <div className="w-2 h-2 bg-[#D4D9F6] rounded-full"></div>
          <div className="w-2 h-2 bg-[#D4D9F6] rounded-full"></div>
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
          <div className="w-full bg-white rounded-xl shadow-md overflow-hidden">
            {/* Header */}
            <div className="p-4 flex justify-between items-center">
              <div className="text-[#4970FC] font-semibold">NurovantAI</div>
              <div className="flex items-center space-x-4">
                <div className="text-sm">Upgrade Plan</div>
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-medium overflow-hidden">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Profile" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex px-4 py-2 overflow-x-auto space-x-6">
              <div className="text-gray-500 text-sm">Overview</div>
              <div className="text-gray-500 text-sm">Courses</div>
              <div className="text-gray-500 text-sm">Review & Report</div>
              <div className="text-gray-500 text-sm">Data Warehouse</div>
            </div>
            
            {/* Content */}
            <div className="p-6 bg-gray-50">
              <div className="mb-6 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="text-xl font-semibold">Setup Complete!</div>
                <div className="text-sm text-gray-500 mt-1">Your account is now ready to use</div>
              </div>
              
              {/* Account summary */}
              <div className="bg-white p-5 rounded-lg mb-6 shadow-sm">
                <div className="text-sm font-medium mb-4">Account Summary</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Name</div>
                    <div className="text-sm font-medium">Peter Johnson</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Role</div>
                    <div className="text-sm font-medium">Teacher</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Email</div>
                    <div className="text-sm font-medium">peter@example.com</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">School</div>
                    <div className="text-sm font-medium">Westside High School</div>
                  </div>
                </div>
              </div>
              
              {/* Next steps */}
              <div className="mb-6">
                <div className="text-sm font-medium mb-3">Next Steps</div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="text-sm">Complete your profile information</div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="text-sm">Set up your first course</div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    </div>
                    <div className="text-sm">Invite students to your class</div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    </div>
                    <div className="text-sm">Create your first assessment</div>
                  </div>
                </div>
              </div>
              
              {/* Buttons */}
              <div className="flex justify-center">
                <button 
                  onClick={completeOnboarding}
                  className="bg-[#4970FC] text-white px-6 py-2.5 rounded-lg text-sm font-medium"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -right-8 -top-8 w-16 h-16 bg-green-500 opacity-10 rounded-full"></div>
          <div className="absolute -left-4 -bottom-4 w-12 h-12 bg-green-500 opacity-10 rounded-full"></div>
          
          {/* Decorative curved line */}
          <div className="absolute -left-24 top-1/2 transform -translate-y-1/2 w-24 h-96">
            <svg className="w-full h-full text-gray-300" viewBox="0 0 100 240" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M100 0C44.7715 0 0 44.7715 0 100C0 155.228 44.7715 200 100 200" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeDasharray="5 5"
              />
            </svg>
          </div>
          
          {/* Connecting line to completion visualization */}
          <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-8 h-0.5 bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default CompleteOnboarding;
