import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

const ReviewReportsOnboarding: React.FC = () => {
  const navigate = useNavigate();

  // Function to handle navigation to the previous onboarding screen
  const goToPrevious = () => {
    navigate('/onboarding/calendar-view');
  };

  // Function to handle navigation to the role selection screen
  const goToRoleSelection = () => {
    navigate('/auth/role-selection');
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
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Review & Reports</h1>
          <p className="text-gray-600 mb-6">
            Generate tailored reports with filters and search, turn class and
            lecture data into actionable insights.
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
          <div className="w-2 h-2 bg-[#D4D9F6] rounded-full"></div>
          <div className="w-6 h-2 bg-[#4970FC] rounded-full"></div>
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
            onClick={goToRoleSelection}
            className="flex items-center justify-center px-6 py-2 bg-[#4970FC] text-white rounded-full hover:bg-blue-600"
          >
            <span>Continue to Dashboard</span>
            <ArrowRightOutlined className="ml-2" />
          </button>
        </div>
      </div>
      
      {/* Right side with reports visualization */}
      <div className="hidden md:flex md:w-1/2 bg-[#F5F7FF] items-center justify-center">
        <div className="w-full max-w-xl px-4">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Report header */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <span className="text-base font-medium mr-2">Review & Report</span>
                  <span className="text-green-500">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </span>
                </div>
                <p className="text-xs text-gray-500">Generate insights and tailored reports with ease</p>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm">Report(s)</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-1 rounded border border-gray-200 text-gray-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                  </button>
                  <button className="p-1 rounded border border-gray-200 text-gray-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                  <button className="px-3 py-1 bg-[#4970FC] text-white text-xs rounded">
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
            
            {/* Report table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="py-2 px-4 text-left text-xs font-medium text-gray-600">Objective</th>
                    <th className="py-2 px-4 text-left text-xs font-medium text-gray-600">Coverage %</th>
                    <th className="py-2 px-4 text-left text-xs font-medium text-gray-600">Status</th>
                    <th className="py-2 px-4 text-left text-xs font-medium text-gray-600">Recommendation</th>
                    <th className="py-2 px-4 text-left text-xs font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 text-xs">Understand Newton's Laws</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <span className="text-xs mr-2">75%</span>
                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Aligned ✓</span>
                    </td>
                    <td className="py-3 px-4 text-xs">Add practical examples or case studies</td>
                    <td className="py-3 px-4">
                      <button className="text-gray-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                  
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 text-xs">Understand Newton's Laws</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <span className="text-xs mr-2">25%</span>
                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: '25%' }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">⚠ Needs Work</span>
                    </td>
                    <td className="py-3 px-4 text-xs">Add practical examples or case studies</td>
                    <td className="py-3 px-4">
                      <button className="text-gray-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                  
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 text-xs">Understand Newton's Laws</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <span className="text-xs mr-2">50%</span>
                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: '50%' }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Aligned ✓</span>
                    </td>
                    <td className="py-3 px-4 text-xs">Add practical examples or case studies</td>
                    <td className="py-3 px-4">
                      <button className="text-gray-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                  
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 text-xs">Understand Newton's Laws</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <span className="text-xs mr-2">20%</span>
                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: '20%' }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">⚠ Needs Work</span>
                    </td>
                    <td className="py-3 px-4 text-xs">Add practical examples or case studies</td>
                    <td className="py-3 px-4">
                      <button className="text-gray-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                  
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 text-xs">Understand Newton's Laws</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <span className="text-xs mr-2">10%</span>
                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: '10%' }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">⚠ Needs Work</span>
                    </td>
                    <td className="py-3 px-4 text-xs">Add practical examples or case studies</td>
                    <td className="py-3 px-4">
                      <button className="text-gray-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                  
                  <tr>
                    <td className="py-3 px-4 text-xs">Understand Newton's Laws</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <span className="text-xs mr-2">10%</span>
                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: '10%' }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">⚠ Needs Work</span>
                    </td>
                    <td className="py-3 px-4 text-xs">Add practical examples or case studies</td>
                    <td className="py-3 px-4">
                      <button className="text-gray-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewReportsOnboarding;
