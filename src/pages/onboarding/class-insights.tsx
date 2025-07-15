import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

const ClassInsightsOnboarding: React.FC = () => {
  const navigate = useNavigate();

  const goToPrevious = () => {
    navigate('/onboarding');
  };

  const goToNext = () => {
    navigate('/onboarding/student-groups');
  };

  return (
    <div className="flex flex-col md:flex-row h-screen relative">
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
      {/* Left side with text content */}
      <div className="flex flex-col justify-between w-full md:w-1/2 p-8 md:p-12">
        <div>
          <div className="text-[#4970FC] text-2xl font-bold mb-2">NurovantAI</div>
          
          <div className="mt-16 mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Class Insights</h1>
            <p className="text-gray-600 mb-6">
              Track each class's progress with clear progress bars, average-score
              metrics, and an interactive performance chart.
            </p>
          </div>
          
          {/* Pagination dots - updated to show step counter */}
          <div className="flex space-x-2 mb-8">
            <div className="w-2 h-2 bg-[#D4D9F6] rounded-full"></div>
            <div className="w-6 h-2 bg-[#4970FC] rounded-full"></div>
            <div className="w-2 h-2 bg-[#D4D9F6] rounded-full"></div>
            <div className="w-2 h-2 bg-[#D4D9F6] rounded-full"></div>
            <div className="w-2 h-2 bg-[#D4D9F6] rounded-full"></div>
            <div className="w-2 h-2 bg-[#D4D9F6] rounded-full"></div>
            <div className="w-2 h-2 bg-[#D4D9F6] rounded-full"></div>
            <div className="w-2 h-2 bg-[#D4D9F6] rounded-full"></div>
          </div>
          
          {/* Navigation buttons - moved up */}
          <div className="flex space-x-4 mb-12">
            <button 
              onClick={goToPrevious}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <ArrowLeftOutlined className="mr-2" />
              <span>Prev</span>
            </button>
            <button 
              onClick={goToNext}
              className="flex items-center justify-center px-6 py-2 bg-[#4970FC] text-white rounded-md hover:bg-blue-600"
            >
              <span>Next</span>
              <ArrowRightOutlined className="ml-2" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Right side with class insights visualization */}
      <div className="hidden md:flex md:w-1/2 bg-[#F5F7FF] items-center justify-center p-8">
        <div className="relative w-full max-w-xl">
          {/* Class Insights visualization - exactly matching the image */}
          <div className="flex flex-col">
            {/* Trend Chart */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4 w-full">
              <div className="mb-3 text-sm font-medium">Trend</div>
              <div className="h-48 relative">
                {/* Y-axis labels */}
                <div className="absolute top-0 -left-6 text-xs text-gray-500">100%</div>
                <div className="absolute top-1/3 -left-6 text-xs text-gray-500">75%</div>
                <div className="absolute top-2/3 -left-6 text-xs text-gray-500">50%</div>
                <div className="absolute bottom-0 -left-6 text-xs text-gray-500">25%</div>
                
                {/* Performance chart */}
                <svg className="w-full h-full" viewBox="0 0 300 150" preserveAspectRatio="none">
                  {/* Performance line */}
                  <path 
                    d="M30,130 C50,120 70,100 90,95 C110,90 130,60 150,70 C170,80 190,75 210,60 C230,45 250,20 270,25" 
                    fill="none" 
                    stroke="#4970FC" 
                    strokeWidth="2"
                  />
                  
                  {/* Data points */}
                  <circle cx="90" cy="95" r="3" fill="#4970FC" stroke="white" strokeWidth="1" />
                  <circle cx="150" cy="70" r="3" fill="#4970FC" stroke="white" strokeWidth="1" />
                  <circle cx="210" cy="60" r="3" fill="#4970FC" stroke="white" strokeWidth="1" />
                  <circle cx="270" cy="25" r="3" fill="#4970FC" stroke="white" strokeWidth="1" />
                </svg>
                
                {/* X-axis labels */}
                <div className="absolute bottom-0 left-[30%] text-xs text-gray-500">Week 1</div>
                <div className="absolute bottom-0 left-[50%] text-xs text-gray-500">Week 1</div>
                <div className="absolute bottom-0 left-[70%] text-xs text-gray-500">Week 1</div>
                <div className="absolute bottom-0 left-[90%] text-xs text-gray-500">Week 1</div>
              </div>
              <div className="text-center text-xs text-gray-500 mt-2">Performance Metrics</div>
            </div>
            
            {/* Chunk statistics - stacked on top */}
            <div className="bg-white p-4 rounded-lg shadow-sm w-full mb-4">
              <div className="text-sm font-medium mb-2">Chunk statistics</div>
              <div className="text-xs text-gray-500 mb-3">Chunk Summary Statistics</div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="text-xs text-gray-500">Number of Students:</div>
                  <div className="text-xs">100</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-xs text-gray-500">Average Score:</div>
                  <div className="text-xs">48.1%</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-xs text-gray-500">Needs Improvement:</div>
                  <div className="text-xs">54.0% of students</div>
                </div>
              </div>
            </div>
            
            {/* Performance Metrics - stacked on top */}
            <div className="bg-white p-4 rounded-lg shadow-sm w-full">
              <div className="text-sm font-medium mb-3">Performance Metrics</div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="text-xs text-gray-500">Meeting Expectation:</div>
                  <div className="text-xs">4.5% of students</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-xs text-gray-500">Exceeding Expectation:</div>
                  <div className="text-xs">1.8% of students</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-xs text-gray-500">Needs Improvement:</div>
                  <div className="text-xs">54.0% of students</div>
                </div>
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

export default ClassInsightsOnboarding;
