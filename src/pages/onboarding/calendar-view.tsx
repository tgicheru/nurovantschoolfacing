import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

const CalendarViewOnboarding: React.FC = () => {
  const navigate = useNavigate();

  // Function to handle navigation to the previous onboarding screen
  const goToPrevious = () => {
    navigate('/onboarding/pacing-guides');
  };

  // Function to handle navigation to the next onboarding screen
  const goToNext = () => {
    navigate('/onboarding/review-reports');
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
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Calendar View</h1>
          <p className="text-gray-600 mb-6">
            Visualize your lecture schedule by month or year, refresh events on
            demand, and search upcoming sessions in one place.
          </p>
        </div>
        
        {/* Pagination dots - step counter */}
        <div className="flex space-x-2 mb-8">
          <div className="w-2 h-2 bg-[#D4D9F6] rounded-full"></div>
          <div className="w-2 h-2 bg-[#D4D9F6] rounded-full"></div>
          <div className="w-2 h-2 bg-[#D4D9F6] rounded-full"></div>
          <div className="w-2 h-2 bg-[#D4D9F6] rounded-full"></div>
          <div className="w-2 h-2 bg-[#D4D9F6] rounded-full"></div>
          <div className="w-2 h-2 bg-[#D4D9F6] rounded-full"></div>
          <div className="w-6 h-2 bg-[#4970FC] rounded-full"></div>
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
      
      {/* Right side with calendar visualization */}
      <div className="hidden md:flex md:w-1/2 bg-[#F5F7FF] items-center justify-center">
        <div className="w-full max-w-xl px-4">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Calendar header with month navigation */}
            <div className="flex justify-between items-center p-3 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <button className="w-6 h-6 flex items-center justify-center text-gray-500">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span className="text-sm font-medium">Feb 1, 2025</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="w-6 h-6 flex items-center justify-center text-gray-500">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <span className="text-sm font-medium">Feb 3-7, 2025</span>
                <button className="px-2 py-1 text-xs text-gray-500 border border-gray-200 rounded">
                  Week
                </button>
              </div>
            </div>
            
            {/* Calendar body */}
            <div className="flex">
              {/* Monthly calendar view */}
              <div className="w-1/3 p-2 border-r border-gray-100">
                <div className="grid grid-cols-7 gap-1 text-center">
                  <div className="text-xs text-gray-500 py-1">Mo</div>
                  <div className="text-xs text-gray-500 py-1">Tu</div>
                  <div className="text-xs text-gray-500 py-1">We</div>
                  <div className="text-xs text-gray-500 py-1">Th</div>
                  <div className="text-xs text-gray-500 py-1">Fr</div>
                  <div className="text-xs text-gray-500 py-1">Sa</div>
                  <div className="text-xs text-gray-500 py-1">Su</div>
                  
                  <div className="text-xs text-gray-400 py-1">29</div>
                  <div className="text-xs text-gray-400 py-1">30</div>
                  <div className="text-xs text-gray-400 py-1">31</div>
                  <div className="text-xs py-1">1</div>
                  <div className="text-xs py-1">2</div>
                  <div className="text-xs py-1">3</div>
                  <div className="text-xs py-1">4</div>
                  
                  <div className="text-xs py-1">5</div>
                  <div className="text-xs bg-blue-100 rounded-full w-5 h-5 flex items-center justify-center mx-auto">6</div>
                  <div className="text-xs py-1">7</div>
                  <div className="text-xs py-1">8</div>
                  <div className="text-xs py-1">9</div>
                  <div className="text-xs py-1">10</div>
                  <div className="text-xs py-1">11</div>
                  
                  <div className="text-xs py-1">12</div>
                  <div className="text-xs py-1">13</div>
                  <div className="text-xs py-1">14</div>
                  <div className="text-xs py-1">15</div>
                  <div className="text-xs py-1">16</div>
                  <div className="text-xs py-1">17</div>
                  <div className="text-xs py-1">18</div>
                  
                  <div className="text-xs py-1">19</div>
                  <div className="text-xs py-1">20</div>
                  <div className="text-xs py-1">21</div>
                  <div className="text-xs py-1">22</div>
                  <div className="text-xs py-1">23</div>
                  <div className="text-xs py-1">24</div>
                  <div className="text-xs py-1">25</div>
                  
                  <div className="text-xs py-1">26</div>
                  <div className="text-xs py-1">27</div>
                  <div className="text-xs py-1">28</div>
                  <div className="text-xs text-gray-400 py-1">1</div>
                  <div className="text-xs text-gray-400 py-1">2</div>
                  <div className="text-xs text-gray-400 py-1">3</div>
                  <div className="text-xs text-gray-400 py-1">4</div>
                </div>
              </div>
              
              {/* Weekly calendar view */}
              <div className="w-2/3">
                <div className="grid grid-cols-5 border-b border-gray-100">
                  <div className="p-2 text-center border-r border-gray-100">
                    <div className="text-xs text-gray-500">MON</div>
                    <div className="text-lg">3</div>
                  </div>
                  <div className="p-2 text-center border-r border-gray-100">
                    <div className="text-xs text-gray-500">TUE</div>
                    <div className="text-lg">4</div>
                  </div>
                  <div className="p-2 text-center border-r border-gray-100 bg-blue-50">
                    <div className="text-xs text-gray-500">WED</div>
                    <div className="text-lg text-blue-500">5</div>
                  </div>
                  <div className="p-2 text-center border-r border-gray-100">
                    <div className="text-xs text-gray-500">THU</div>
                    <div className="text-lg">6</div>
                  </div>
                  <div className="p-2 text-center">
                    <div className="text-xs text-gray-500">FRI</div>
                    <div className="text-lg">7</div>
                  </div>
                </div>
                
                {/* Time slots */}
                <div className="relative h-64 overflow-y-auto">
                  <div className="absolute left-0 top-0 w-16 h-full border-r border-gray-100 text-right pr-2">
                    <div className="text-xs text-gray-500 h-8">8:00 AM</div>
                    <div className="text-xs text-gray-500 h-8">9:00 AM</div>
                    <div className="text-xs text-gray-500 h-8">10:00 AM</div>
                    <div className="text-xs text-gray-500 h-8">11:00 AM</div>
                    <div className="text-xs text-gray-500 h-8">12:00 PM</div>
                    <div className="text-xs text-gray-500 h-8">1:00 PM</div>
                    <div className="text-xs text-gray-500 h-8">2:00 PM</div>
                    <div className="text-xs text-gray-500 h-8">3:00 PM</div>
                    <div className="text-xs text-gray-500 h-8">4:00 PM</div>
                    <div className="text-xs text-gray-500 h-8">5:00 PM</div>
                  </div>
                  
                  <div className="ml-16 grid grid-cols-5 gap-1 h-full">
                    {/* Monday */}
                    <div className="relative">
                      <div className="absolute top-8 left-1 right-1 h-8 bg-blue-100 rounded px-1 text-xs text-blue-800">
                        Intro to Algebra
                      </div>
                      <div className="absolute top-24 left-1 right-1 h-8 bg-blue-100 rounded px-1 text-xs text-blue-800">
                        Geometry Basics
                      </div>
                    </div>
                    
                    {/* Tuesday */}
                    <div className="relative">
                      <div className="absolute top-16 left-1 right-1 h-8 bg-blue-100 rounded px-1 text-xs text-blue-800">
                        Linear Equations
                      </div>
                      <div className="absolute top-40 left-1 right-1 h-8 bg-blue-100 rounded px-1 text-xs text-blue-800">
                        Trigonometry
                      </div>
                    </div>
                    
                    {/* Wednesday */}
                    <div className="relative">
                      <div className="absolute top-8 left-1 right-1 h-8 bg-blue-500 rounded px-1 text-xs text-white">
                        Quadratic Equations
                      </div>
                      <div className="absolute top-32 left-1 right-1 h-8 bg-blue-500 rounded px-1 text-xs text-white">
                        Probability Theory
                      </div>
                    </div>
                    
                    {/* Thursday */}
                    <div className="relative">
                      <div className="absolute top-16 left-1 right-1 h-8 bg-blue-100 rounded px-1 text-xs text-blue-800">
                        Statistics
                      </div>
                      <div className="absolute top-48 left-1 right-1 h-8 bg-blue-100 rounded px-1 text-xs text-blue-800">
                        Calculus Intro
                      </div>
                    </div>
                    
                    {/* Friday */}
                    <div className="relative">
                      <div className="absolute top-8 left-1 right-1 h-8 bg-blue-100 rounded px-1 text-xs text-blue-800">
                        Number Theory
                      </div>
                      <div className="absolute top-32 left-1 right-1 h-8 bg-blue-100 rounded px-1 text-xs text-blue-800">
                        Advanced Functions
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Upcoming lessons */}
            <div className="p-4 border-t border-gray-100">
              <h3 className="text-sm font-medium mb-2">Upcoming Lessons</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-xs">Quadratic Equations (Today)</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-xs">Trigonometry Basics</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-xs">Mathematical Logic and Proofs</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-xs">Functions and Graphs</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-xs">Probability Theory</span>
                </div>
              </div>
              
              <h3 className="text-sm font-medium mt-4 mb-2">Recent Modifications</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-xs">Quadratic Equations (Changed)</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-xs">Trigonometry Basics</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-xs">Mathematical Logic and Proofs</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-xs">Advanced Function Techniques</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-xs">Statistical Analysis</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarViewOnboarding;
