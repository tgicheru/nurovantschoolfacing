import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

const CourseCreationOnboarding: React.FC = () => {
  const navigate = useNavigate();

  // Function to handle navigation to the previous onboarding screen
  const goToPrevious = () => {
    navigate('/onboarding/course-library');
  };

  // Function to handle navigation to the next onboarding screen
  const goToNext = () => {
    navigate('/onboarding/pacing-guides');
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
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Course Creation Wizard</h1>
          <p className="text-gray-600 mb-6">
            Get started in seconds: launch a new course, import from your
            LMS (coming soon), or generate quick lectures with guided
            prompts.
          </p>
        </div>
        
        {/* Pagination dots - step counter */}
        <div className="flex space-x-2 mb-8">
          <div className="w-2 h-2 bg-[#D4D9F6] rounded-full"></div>
          <div className="w-2 h-2 bg-[#D4D9F6] rounded-full"></div>
          <div className="w-2 h-2 bg-[#D4D9F6] rounded-full"></div>
          <div className="w-2 h-2 bg-[#D4D9F6] rounded-full"></div>
          <div className="w-6 h-2 bg-[#4970FC] rounded-full"></div>
          <div className="w-2 h-2 bg-[#D4D9F6] rounded-full"></div>
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
      
      {/* Right side with course creation wizard visualization */}
      <div className="hidden md:flex md:w-1/2 bg-[#F5F7FF] items-center justify-center">
        <div className="grid grid-cols-2 gap-4 w-full max-w-2xl px-8">
          {/* Top left - Create lecture card */}
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="mb-4">
              <h3 className="text-lg font-medium">Create lecture</h3>
              <p className="text-sm text-gray-500">Let's get you all set up by creating your first class.</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start p-3 border border-gray-200 rounded-lg">
                <div className="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center text-purple-600 mr-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium">Create a new lecture</div>
                  <div className="text-xs text-gray-500">Create a lecture for your students</div>
                </div>
              </div>
              
              <div className="flex items-start p-3 border border-gray-200 rounded-lg">
                <div className="w-8 h-8 bg-teal-100 rounded-md flex items-center justify-center text-teal-600 mr-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium">Create lectures with your calendar</div>
                  <div className="text-xs text-gray-500">Import your school calendar to create lectures</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Top right - In-progress card */}
          <div className="bg-white p-5 rounded-lg shadow-sm flex flex-col items-center justify-center">
            <div className="w-20 h-20 mb-4">
              <div className="w-full h-full relative">
                <div className="absolute inset-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#E6E8F0" strokeWidth="10" />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="45" 
                      fill="none" 
                      stroke="#4970FC" 
                      strokeWidth="10" 
                      strokeDasharray="282.7" 
                      strokeDashoffset="56.5" 
                      strokeLinecap="round" 
                      transform="rotate(-90 50 50)" 
                    />
                  </svg>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-semibold text-[#4970FC]">80%</span>
                </div>
              </div>
            </div>
            <div className="text-center mb-4">
              <h3 className="text-base font-medium">Your lecture is being created</h3>
            </div>
            <button className="px-6 py-2 bg-[#4970FC] text-white rounded-full text-sm">
              Cancel
            </button>
          </div>
          
          {/* Bottom - Completed card */}
          <div className="bg-white p-5 rounded-lg shadow-sm col-span-2 flex flex-col items-center justify-center">
            <div className="w-12 h-12 bg-[#EEF1FF] rounded-full flex items-center justify-center text-[#4970FC] mb-4">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <div className="text-center mb-2">
              <h3 className="text-lg font-medium text-gray-700">Lecture has been created</h3>
              <p className="text-sm text-gray-500">Your lecture has been created successfully.</p>
            </div>
            
            <button className="px-6 py-2 bg-[#EEF1FF] text-[#4970FC] rounded-full text-sm">
              Go to Lecture
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCreationOnboarding;
