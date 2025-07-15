import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

const CourseLibraryOnboarding: React.FC = () => {
  const navigate = useNavigate();

  // Function to handle navigation to the previous onboarding screen
  const goToPrevious = () => {
    navigate('/onboarding/student-groups');
  };

  // Function to handle navigation to the next onboarding screen
  const goToNext = () => {
    navigate('/onboarding/course-creation');
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
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Course Library</h1>
          <p className="text-gray-600 mb-6">
            Browse, filter, and search your courses in grid or list view—manage
            titles, grades, institutions, and creation dates.
          </p>
        </div>
        
        {/* Pagination dots - step counter */}
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
      
      {/* Right side with course library visualization */}
      <div className="hidden md:flex md:w-1/2 bg-[#F5F7FF] items-start justify-center p-8 pt-16">
        <div className="relative w-full max-w-md">
          {/* Course details card */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex items-center mb-3">
              <div className="text-xs text-gray-500">Courses / Understanding Mathematics</div>
              <div className="ml-auto">
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
              </div>
            </div>
            
            <div className="flex mb-4">
              <div className="mr-4">
                <div className="w-[86px] h-[86px] bg-green-800 rounded-md overflow-hidden">
                  <div className="w-full h-full bg-green-800 flex items-center justify-center p-2">
                    <div className="text-white text-xs">
                      <div className="text-lg font-light mb-1">z₁(f/6</div>
                      <div className="text-lg font-light">∫</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-lg font-medium">Understanding Mathematics</div>
                <div className="text-xs text-gray-500">Created 11 Nov, 2024 · 12:09PM</div>
                
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
                  <div>
                    <div className="text-xs text-gray-500">Institution</div>
                    <div className="text-xs">St. Calvin High School</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">State</div>
                    <div className="text-xs">Alabama</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Grade</div>
                    <div className="text-xs">3-5 (Middle School)</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm">1 course(s)</div>
              <div className="flex items-center">
                <button className="p-1 text-gray-500 hover:text-gray-700">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </button>
                <button className="p-1 text-gray-500 hover:text-gray-700">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                <button className="p-1 text-gray-500 hover:text-gray-700">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
                <button className="p-1 text-gray-500 hover:text-gray-700">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button className="ml-2 px-4 py-1 bg-[#4970FC] text-white text-xs rounded-full flex items-center">
                  <span className="mr-1">+</span>
                  <span>Create Course</span>
                </button>
              </div>
            </div>
            
            {/* Course content */}
            <div className="bg-[#FBF8F2] rounded-md p-3 mb-5">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-[#F5EFE1] rounded-md flex items-center justify-center text-amber-700 mr-3">
                  <span>A</span>
                </div>
                <div>
                  <div className="text-sm font-medium">Algebra</div>
                  <div className="text-xs text-gray-500">Created 11 Nov, 2024 · 12:09PM</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
              <div className="flex items-center">
                <div className="w-4 h-4 mr-1 text-gray-500">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-500">Lesson Plan</span>
                <div className="ml-1 w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="ml-1 text-xs text-gray-500">Created</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-4 h-4 mr-1 text-gray-500">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <span className="text-xs text-gray-500">Quiz</span>
                <div className="ml-1 w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="ml-1 text-xs text-gray-500">Not Created</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-4 h-4 mr-1 text-gray-500">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-500">Flashcards</span>
                <div className="ml-1 w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="ml-1 text-xs text-gray-500">Not Created</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-4 h-4 mr-1 text-gray-500">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <span className="text-xs text-gray-500">Recap</span>
                <div className="ml-1 w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="ml-1 text-xs text-gray-500">Not Created</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-4 h-4 mr-1 text-gray-500">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-500">Discuss</span>
                <div className="ml-1 w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="ml-1 text-xs text-gray-500">Not Created</span>
              </div>
            </div>
            
            <div className="flex justify-between text-xs text-gray-500 pt-2 border-t">
              <div>Page 1 of 10</div>
              <div className="flex space-x-2">
                <span className="text-gray-400">Previous</span>
                <span className="text-gray-400">Next</span>
              </div>
            </div>
          </div>
          
          {/* Second card (faded) */}
          <div className="bg-white p-4 rounded-lg shadow-sm opacity-50">
            <div className="flex items-center mb-3">
              <div className="text-xs text-gray-500">Created · 11 Nov, 2024 · 12:09PM</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <div className="text-xs text-gray-500">Institution</div>
                <div className="text-xs">St. Calvin High School</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">State</div>
                <div className="text-xs">Alabama</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Grade</div>
                <div className="text-xs">3-5 (Middle School)</div>
              </div>
            </div>
            
            <div className="flex justify-between text-xs text-gray-500 pt-2 border-t">
              <div>Page 1 of 10</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLibraryOnboarding;
