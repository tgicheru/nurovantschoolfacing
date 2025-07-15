import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

const StudentGroupsOnboarding: React.FC = () => {
  const navigate = useNavigate();

  // Function to handle navigation to the previous onboarding screen
  const goToPrevious = () => {
    navigate('/onboarding/class-insights');
  };

  // Function to handle navigation to the next onboarding screen
  const goToNext = () => {
    navigate('/onboarding/course-library');
  };

  return (
    <div className="flex min-h-screen bg-[#F5F7FF]">
      {/* Left side with text */}
      <div className="w-full md:w-1/2 flex flex-col p-8 md:p-16">
        <div className="text-[#4970FC] text-2xl font-bold mb-12">NurovantAI</div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Student Groups</h1>
          <p className="text-gray-600 mb-6">
            Build and organize student groups, assign leaders, reorder
            members, and monitor group-level performance.
          </p>
        </div>
        
        {/* Pagination dots - step counter */}
        <div className="flex space-x-2 mb-8">
          <div className="w-2 h-2 bg-[#D4D9F6] rounded-full"></div>
          <div className="w-2 h-2 bg-[#D4D9F6] rounded-full"></div>
          <div className="w-6 h-2 bg-[#4970FC] rounded-full"></div>
          <div className="w-2 h-2 bg-[#D4D9F6] rounded-full"></div>
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
      
      {/* Right side with student groups visualization */}
      <div className="hidden md:flex md:w-1/2 bg-[#F5F7FF] items-start justify-center p-8 pt-16">
        <div className="relative w-full max-w-md">
          {/* Active Groups section */}
          <div className="mb-4 text-base font-medium">Active Groups</div>
          
          {/* Group 1 */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-3">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center text-blue-500 mr-3">
                <span className="text-sm">G</span>
              </div>
              <div>
                <div className="text-sm font-medium">Group 1</div>
                <div className="text-xs text-gray-500">Mathematics</div>
              </div>
            </div>
            <div className="mt-2 text-xs text-blue-500 cursor-pointer">Edit Group</div>
          </div>
          
          {/* Group 2 */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center text-blue-500 mr-3">
                  <span className="text-sm">G</span>
                </div>
                <div>
                  <div className="text-sm font-medium">Group 2</div>
                  <div className="text-xs text-gray-500">Literature</div>
                </div>
              </div>
              <div className="text-xs text-gray-500">4 Participants</div>
            </div>
            <div className="mt-2 text-xs text-blue-500 cursor-pointer">Edit Group</div>
          </div>
          
          {/* Group 3 */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center text-blue-500 mr-3">
                  <span className="text-sm">G</span>
                </div>
                <div>
                  <div className="text-sm font-medium">Group 3</div>
                  <div className="text-xs text-gray-500">Mathematics</div>
                </div>
              </div>
              <div className="text-xs text-green-500">In Progress</div>
            </div>
            <div className="mt-2 text-xs text-blue-500 cursor-pointer">Edit Group</div>
          </div>
          
          {/* Modal for creating new student group */}
          <div className="bg-white p-5 rounded-lg shadow-md absolute -right-4 -top-4 w-80 z-10">
            <div className="flex justify-between items-center mb-3">
              <div className="text-sm font-medium">Create New Student Group</div>
              <div className="text-gray-400 cursor-pointer">×</div>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="text-xs text-gray-500 mb-1">• Group Name</div>
                <input 
                  type="text" 
                  className="w-full p-2 text-xs border border-gray-200 rounded-md" 
                  placeholder="Enter group name..."
                />
              </div>
              
              <div>
                <div className="text-xs text-gray-500 mb-1">• Course</div>
                <input 
                  type="text" 
                  className="w-full p-2 text-xs border border-gray-200 rounded-md" 
                  placeholder="Select course..."
                />
              </div>
              
              <div>
                <div className="text-xs text-gray-500 mb-1">• Lecture</div>
                <input 
                  type="text" 
                  className="w-full p-2 text-xs border border-gray-200 rounded-md" 
                  placeholder="Select a lecture..."
                />
              </div>
              
              <div>
                <div className="text-xs text-gray-500 mb-1">Description</div>
                <textarea 
                  className="w-full p-2 text-xs border border-gray-200 rounded-md" 
                  placeholder="This is important for creating a student group"
                  rows={2}
                ></textarea>
              </div>
              
              <div>
                <div className="text-xs text-gray-500 mb-1">Add Students from Existing List</div>
                <div className="flex items-center">
                  <input 
                    type="text" 
                    className="w-full p-2 text-xs border border-gray-200 rounded-md" 
                    placeholder="Search..."
                  />
                </div>
              </div>
              
              <div>
                <div className="text-xs text-gray-500 mb-1">Students in Group</div>
                <div className="flex justify-between items-center">
                  <div className="text-xs">No students added yet. Select from the dropdown above or add manually.</div>
                  <div className="text-xs text-blue-500 cursor-pointer">+ Add Manually</div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 mt-2">
                <button className="px-3 py-1 text-xs border border-gray-200 rounded-md">Cancel</button>
                <button className="px-3 py-1 text-xs bg-[#4970FC] text-white rounded-md">Create Group</button>
              </div>
            </div>
          </div>
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
    </div>
  );
};

export default StudentGroupsOnboarding;
