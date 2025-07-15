import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

const PacingGuidesOnboarding: React.FC = () => {
  const navigate = useNavigate();

  // Function to handle navigation to the previous onboarding screen
  const goToPrevious = () => {
    navigate('/onboarding/course-creation');
  };

  // Function to handle navigation to the next onboarding screen
  const goToNext = () => {
    navigate('/onboarding/calendar-view');
  };

  return (
    <div className="flex min-h-screen bg-[#F5F7FF] relative">
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
      
      {/* Left side with text */}
      <div className="w-full md:w-1/2 flex flex-col p-8 md:p-16">
        <div className="text-[#4970FC] text-2xl font-bold mb-12">NurovantAI</div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Pacing Guides</h1>
          <p className="text-gray-600 mb-6">
            Define your course pace by grade level, review creation dates, and
            sync your lesson plan directly to Google Calendar.
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
        
        {/* Navigation buttons */}
        <div className="flex space-x-4 mt-4">
          <button 
            onClick={goToPrevious}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-full text-gray-700 bg-white hover:bg-gray-50"
          >
            <ArrowLeftOutlined className="mr-2" />
            <span>Prev</span>
          </button>
          <button 
            onClick={goToNext}
            className="flex items-center justify-center px-6 py-2 bg-[#4970FC] text-white rounded-full hover:bg-blue-600"
          >
            <span>Next</span>
            <ArrowRightOutlined className="ml-2" />
          </button>
        </div>
      </div>
      
      {/* Right side with pacing guides visualization */}
      <div className="hidden md:flex md:w-1/2 bg-[#F5F7FF] items-center justify-center">
        <div className="w-full max-w-xl px-8 flex flex-col space-y-4">
          {/* Import Pacing Guide Card */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-medium">Import Pacing Guide</h3>
                <button className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="px-4 pb-4">
              <div className="bg-gray-50 p-6 flex flex-col items-center justify-center mb-4">
                <div className="mb-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l4-4m0 0l4 4m-4-4v18" />
                  </svg>
                </div>
                <p className="text-xs text-gray-500 text-center">
                  Click to upload or drag and drop<br />
                  SVG, PNG, JPG or GIF (max. 800×600px)
                </p>
              </div>
              
              <div className="flex items-center mb-4">
                <div className="w-4 h-4 flex-shrink-0 mr-2">
                  <svg className="w-full h-full text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" stroke="#4970FC" strokeWidth="2" />
                    <path d="M8 12h8" stroke="#4970FC" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-xs text-blue-500">Integrate to google calendar</span>
              </div>
              
              <button className="w-full py-3 bg-[#4970FC] text-white text-sm font-medium rounded-md">
                Continue
              </button>
            </div>
          </div>
          
          {/* Pacing Guide Objectives */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center mb-4">
              <div className="w-5 h-5 bg-blue-50 rounded flex items-center justify-center text-blue-500 mr-2">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="text-sm font-medium">Pacing Guide Objectives</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-5 h-5 rounded-full border border-red-300 flex items-center justify-center text-red-500 mr-3 flex-shrink-0">
                  <span className="text-xs">1</span>
                </div>
                <span className="text-sm text-gray-600">Solve linear equations with variables on both sides</span>
              </div>
              
              <div className="flex items-start">
                <div className="w-5 h-5 rounded-full border border-red-300 flex items-center justify-center text-red-500 mr-3 flex-shrink-0">
                  <span className="text-xs">2</span>
                </div>
                <span className="text-sm text-gray-600">Graph linear inequalities on a coordinate plane</span>
              </div>
              
              <div className="flex items-start">
                <div className="w-5 h-5 rounded-full border border-red-300 flex items-center justify-center text-red-500 mr-3 flex-shrink-0">
                  <span className="text-xs">3</span>
                </div>
                <span className="text-sm text-gray-600">Write equations from word problems</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PacingGuidesOnboarding;
