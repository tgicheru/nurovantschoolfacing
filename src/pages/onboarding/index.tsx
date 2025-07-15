import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { RightOutlined } from '@ant-design/icons';

const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();

  // Function to handle navigation to the next onboarding screen
  const goToNext = () => {
    navigate('/onboarding/class-insights');
  };

  return (
    <div className="flex min-h-screen bg-[#F5F7FF] relative">
      {/* Left side with text */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16">
        <div className="mb-10">
          <h1 className="text-[#4970FC] text-3xl font-bold">NurovantAI</h1>
        </div>
        
        <div className="mb-14">
          <h2 className="text-4xl font-bold text-gray-800 mb-5">Dashboard Overview</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            A unified snapshot of your day: see upcoming lectures, today's
            sessions, and active courses at a glance.
          </p>
        </div>

        {/* Pagination dots - updated to show step counter */}
        <div className="flex space-x-2 mb-8">
          <div className="w-6 h-2 bg-[#4970FC] rounded-full"></div>
          <div className="w-2 h-2 bg-[#D4D9F6] rounded-full"></div>
          <div className="w-2 h-2 bg-[#D4D9F6] rounded-full"></div>
          <div className="w-2 h-2 bg-[#D4D9F6] rounded-full"></div>
          <div className="w-2 h-2 bg-[#D4D9F6] rounded-full"></div>
          <div className="w-2 h-2 bg-[#D4D9F6] rounded-full"></div>
          <div className="w-2 h-2 bg-[#D4D9F6] rounded-full"></div>
          <div className="w-2 h-2 bg-[#D4D9F6] rounded-full"></div>
        </div>

        {/* Next button */}
        <div>
          <Button 
            type="primary" 
            shape="round" 
            size="large"
            className="bg-[#4970FC] hover:bg-[#3a5bd9] flex items-center justify-center px-8 h-12 text-base font-medium shadow-md"
            onClick={goToNext}
          >
            Next <RightOutlined className="ml-2" />
          </Button>
        </div>
      </div>
      
      {/* Decorative curved line connecting left text to right content */}
      <div className="pointer-events-none">
        <div className="absolute left-0 top-0 w-full h-full">
          <svg width="100%" height="100%" viewBox="0 0 1000 600" preserveAspectRatio="none">
            <path 
              d="M250 240 C 350 220, 450 260, 600 240" 
              stroke="#8F95B2" 
              strokeWidth="1.5" 
              strokeDasharray="5 5" 
              fill="none"
              opacity="0.8"
            />
          </svg>
        </div>
      </div>

      {/* Right side with dashboard visualization */}
      <div className="hidden md:flex md:w-1/2 bg-[#F5F7FF] items-center justify-center p-8">
        <div className="relative w-full max-w-xl">
          {/* Dashboard visualization */}
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
              <div className="text-[#4970FC] text-sm font-medium border-b-2 border-[#4970FC] pb-2">Overview</div>
              <div className="text-gray-500 text-sm">Courses</div>
              <div className="text-gray-500 text-sm">Review & Report</div>
              <div className="text-gray-500 text-sm">Data Warehouse</div>
            </div>
            
            {/* Content */}
            <div className="p-6 bg-gray-50">
              <div className="mb-6">
                <div className="text-xl font-semibold">Welcome back, Peter 👋</div>
                <div className="text-sm text-gray-500 mt-1">Let's pick up where you left off.</div>
              </div>
              
              {/* Search bar */}
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input type="text" className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-white text-sm" placeholder="Search for student" />
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-sm text-gray-500">Classes</div>
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-3xl font-bold">6</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-sm text-gray-500">Courses</div>
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-3xl font-bold">2</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-sm text-gray-500">Students</div>
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-3xl font-bold">100</div>
                </div>
              </div>
              
              {/* Tasks and Lessons */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-sm font-medium">Upcoming Tasks</div>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>Class B</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg mb-2 text-sm">
                    <div className="font-medium">Prepare Presentation</div>
                    <div className="text-gray-500 mt-1 flex items-center text-xs">
                      <span>Class A</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-400 mt-1">
                      <span>Due: October 20</span>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg mb-2 text-sm">
                    <div className="font-medium">Submit Project Proposal</div>
                    <div className="text-gray-500 mt-1 flex items-center text-xs">
                      <span>Class C</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-400 mt-1">
                      <span>Due: October 25</span>
                    </div>
                  </div>
                  <div className="flex justify-center mt-4">
                    <button className="bg-blue-100 text-blue-600 text-xs px-3 py-1.5 rounded-md opacity-50">
                      + Create new task
                    </button>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-sm font-medium">Upcoming Lessons</div>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>Class B</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg mb-2 text-sm">
                    <div className="font-medium">Introduction to Shakespeare</div>
                    <div className="text-gray-500 mt-1 flex items-center text-xs">
                      <span>Class B</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-400 mt-1">
                      <span>October 15</span>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg mb-2 text-sm">
                    <div className="font-medium">Introduction to English</div>
                    <div className="text-gray-500 mt-1 flex items-center text-xs">
                      <span>Class A</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-400 mt-1">
                      <span>October 20</span>
                    </div>
                  </div>
                  <div className="flex justify-center mt-4">
                    <button className="bg-blue-100 text-blue-600 text-xs px-3 py-1.5 rounded-md opacity-50">
                      + Create new lesson
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Classes section */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <div className="text-sm font-medium">Classes</div>
                  <svg className="w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </div>
                
                <div className="space-y-2 opacity-50">
                  <div className="flex items-center justify-between bg-white p-2 rounded-lg">
                    <div className="text-sm">Class A</div>
                    <svg className="w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex items-center justify-between bg-white p-2 rounded-lg">
                    <div className="text-sm">Class A</div>
                    <svg className="w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex items-center justify-between bg-white p-2 rounded-lg">
                    <div className="text-sm">Class A</div>
                    <svg className="w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Students performance section - faded */}
              <div className="opacity-50">
                <div className="flex justify-between items-center mb-3">
                  <div className="text-sm font-medium">Students performance</div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>Class C</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                <div className="h-32 bg-white rounded-lg"></div>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -right-8 -top-8 w-16 h-16 bg-[#4970FC] opacity-10 rounded-full"></div>
          <div className="absolute -left-4 -bottom-4 w-12 h-12 bg-[#4970FC] opacity-10 rounded-full"></div>
          

        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
