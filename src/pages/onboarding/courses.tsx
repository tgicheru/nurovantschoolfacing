import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { LeftOutlined, RightOutlined, LoginOutlined } from '@ant-design/icons';

const CoursesOnboarding = () => {
  const navigate = useNavigate();

  // Function to handle navigation to the next onboarding screen
  const handleNext = () => {
    navigate('/onboarding/complete');
  };

  // Function to handle navigation to the previous onboarding screen
  const handleBack = () => {
    navigate('/onboarding/features');
  };
  
  // Function to skip the tour and go directly to login
  const handleSkipToLogin = () => {
    navigate('/auth/login');
  };

  return (
    <div className="flex min-h-screen bg-[#F5F7FF]">
      {/* Left side with text */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16">
        <div className="absolute top-6 right-6">
          <Button 
            type="link" 
            className="text-[#4970FC] font-medium flex items-center text-base"
            onClick={handleSkipToLogin}
          >
            <LoginOutlined className="mr-2" /> Skip to Login
          </Button>
        </div>
        <div className="mb-10">
          <h1 className="text-[#4970FC] text-3xl font-bold">NurovantAI</h1>
        </div>
        
        <div className="mb-14">
          <h2 className="text-4xl font-bold text-gray-800 mb-5">Course Management</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Create, organize, and deliver courses with ease. Track progress and engage students with interactive content.
          </p>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
            <h3 className="font-semibold text-gray-800 text-lg mb-4">Key Benefits</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 leading-relaxed">
              <li>Centralized course materials and resources</li>
              <li>Automated grading and progress tracking</li>
              <li>Interactive lessons and assessments</li>
              <li>Real-time collaboration tools</li>
            </ul>
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex space-x-2 mb-8">
          <div className="w-2 h-2 bg-[#D4D9F6] rounded-full"></div>
          <div className="w-2 h-2 bg-[#D4D9F6] rounded-full"></div>
          <div className="w-2 h-2 bg-[#D4D9F6] rounded-full"></div>
          <div className="w-6 h-2 bg-[#4970FC] rounded-full"></div>
          <div className="w-2 h-2 bg-[#D4D9F6] rounded-full"></div>
          <div className="w-2 h-2 bg-[#D4D9F6] rounded-full"></div>
          <div className="w-2 h-2 bg-[#D4D9F6] rounded-full"></div>
          <div className="w-2 h-2 bg-[#D4D9F6] rounded-full"></div>
        </div>

        {/* Navigation buttons */}
        <div className="flex space-x-4">
          <Button 
            shape="round" 
            size="large"
            className="flex items-center justify-center border-gray-300 h-12 px-6 text-base font-medium"
            onClick={handleBack}
          >
            <LeftOutlined className="mr-2" /> Back
          </Button>
          
          <Button 
            type="primary" 
            shape="round" 
            size="large"
            className="bg-[#4970FC] hover:bg-[#3a5bd9] flex items-center justify-center h-12 px-8 text-base font-medium shadow-md"
            onClick={handleNext}
          >
            Next <RightOutlined className="ml-2" />
          </Button>
        </div>
      </div>

      {/* Right side with courses visualization */}
      <div className="hidden md:flex md:w-1/2 bg-[#F5F7FF] items-center justify-center p-8">
        <div className="relative w-full max-w-lg">
          {/* Courses visualization */}
          <div className="w-full bg-white rounded-lg shadow-xl p-6">
            {/* Course list visualization */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
              <div className="h-6 bg-[#4970FC] w-32 rounded-md"></div>
              <div className="h-8 w-8 rounded-full bg-[#EEF2FF] flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-[#4970FC]"></div>
              </div>
            </div>
            
            {/* Course cards */}
            <div className="space-y-3 mb-4">
              <div className="bg-[#EEF2FF] p-3 rounded-lg">
                <div className="h-4 bg-gray-300 w-3/4 rounded-full mb-2"></div>
                <div className="h-3 bg-gray-200 w-1/2 rounded-full"></div>
              </div>
              <div className="bg-[#EEF2FF] p-3 rounded-lg">
                <div className="h-4 bg-gray-300 w-3/4 rounded-full mb-2"></div>
                <div className="h-3 bg-gray-200 w-1/2 rounded-full"></div>
              </div>
              <div className="bg-[#EEF2FF] p-3 rounded-lg">
                <div className="h-4 bg-gray-300 w-3/4 rounded-full mb-2"></div>
                <div className="h-3 bg-gray-200 w-1/2 rounded-full"></div>
              </div>
            </div>
            
            <div className="mt-3 text-center text-gray-500">Course Management</div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-4 -left-4 w-32 h-32 border-2 border-dashed border-[#4970FC] opacity-20 rounded-lg"></div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-dashed border-[#4970FC] opacity-20 rounded-lg"></div>
        </div>
      </div>
      {/* Right side with course management visualization */}
      <div className="hidden md:flex md:w-1/2 bg-[#F5F7FF] items-center justify-center p-8">
        <div className="relative w-full max-w-xl">
          {/* Course management visualization */}
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
              <div className="text-[#4970FC] text-sm font-medium border-b-2 border-[#4970FC] pb-2">Courses</div>
              <div className="text-gray-500 text-sm">Review & Report</div>
              <div className="text-gray-500 text-sm">Data Warehouse</div>
            </div>
            
            {/* Content */}
            <div className="p-6 bg-gray-50">
              <div className="mb-6">
                <div className="text-xl font-semibold">Course Management</div>
                <div className="text-sm text-gray-500 mt-1">Manage your courses and track student progress</div>
              </div>
              
              {/* Course list */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <div className="text-sm font-medium">Your Courses</div>
                  <div className="text-sm text-blue-600">View All</div>
                </div>
                
                <div className="bg-white p-4 rounded-lg mb-3 shadow-sm">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Introduction to Physics</div>
                      <div className="text-sm text-gray-500 mt-1">Class A • 24 students</div>
                    </div>
                    <div className="text-sm text-green-500 font-medium">Active</div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg mb-3 shadow-sm">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Advanced Mathematics</div>
                      <div className="text-sm text-gray-500 mt-1">Class B • 18 students</div>
                    </div>
                    <div className="text-sm text-green-500 font-medium">Active</div>
                  </div>
                </div>
              </div>
              
              {/* Course creation */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <div className="text-sm font-medium">Create New Course</div>
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-2">Course Name</div>
                      <div className="h-10 bg-gray-50 border border-gray-200 rounded-lg"></div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-2">Class</div>
                      <div className="h-10 bg-gray-50 border border-gray-200 rounded-lg"></div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm text-gray-500 mb-2">Description</div>
                    <div className="h-20 bg-gray-50 border border-gray-200 rounded-lg"></div>
                  </div>
                  
                  <div className="flex justify-end">
                    <div className="bg-[#4970FC] text-white text-sm font-medium px-5 py-2 rounded-lg">Create Course</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Connecting line to course management visualization */}
          <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-8 h-0.5 bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default CoursesOnboarding;
