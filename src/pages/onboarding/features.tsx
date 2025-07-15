import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { LeftOutlined, LoginOutlined, RightOutlined } from '@ant-design/icons';

const FeaturesOnboarding: FC = () => {
  const navigate = useNavigate();

  // Function to handle navigation to the next onboarding screen
  const handleNext = () => {
    navigate('/onboarding/courses');
  };

  // Function to handle navigation to the previous onboarding screen
  const handleBack = () => {
    navigate('/onboarding');
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
          <h2 className="text-4xl font-bold text-gray-800 mb-5">Key Features</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Discover powerful tools designed to enhance your teaching experience.
          </p>
          
          <ul className="space-y-6">
            <li className="flex items-start">
              <div className="flex-shrink-0 w-7 h-7 bg-[#4970FC] rounded-full flex items-center justify-center text-white mr-4 mt-1 font-medium">1</div>
              <div>
                <h3 className="font-semibold text-gray-800 text-lg mb-1">Course Management</h3>
                <p className="text-gray-600 leading-relaxed">Create and manage courses, lectures, and materials in one place.</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 w-7 h-7 bg-[#4970FC] rounded-full flex items-center justify-center text-white mr-4 mt-1 font-medium">2</div>
              <div>
                <h3 className="font-semibold text-gray-800 text-lg mb-1">Student Groups</h3>
                <p className="text-gray-600 leading-relaxed">Organize students into collaborative groups for better learning outcomes.</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 w-7 h-7 bg-[#4970FC] rounded-full flex items-center justify-center text-white mr-4 mt-1 font-medium">3</div>
              <div>
                <h3 className="font-semibold text-gray-800 text-lg mb-1">Analytics</h3>
                <p className="text-gray-600 leading-relaxed">Track student performance and engagement with detailed analytics.</p>
              </div>
            </li>
          </ul>
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

      {/* Right side with features visualization */}
      <div className="hidden md:flex md:w-1/2 bg-[#F5F7FF] items-center justify-center p-8">
        <div className="relative w-full max-w-xl">
          {/* Features visualization */}
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
              <div className="text-[#4970FC] text-sm font-medium border-b-2 border-[#4970FC] pb-2">Features</div>
              <div className="text-gray-500 text-sm">Review & Report</div>
              <div className="text-gray-500 text-sm">Data Warehouse</div>
            </div>
            
            {/* Content */}
            <div className="p-6 bg-gray-50">
              <div className="mb-6">
                <div className="text-xl font-semibold">Features Overview</div>
                <div className="text-sm text-gray-500 mt-1">Explore the powerful tools at your disposal</div>
              </div>
              
              {/* Features grid */}
              <div className="grid grid-cols-2 gap-5">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                      </svg>
                    </div>
                    <div className="font-medium text-base">Course Management</div>
                  </div>
                  <div className="text-sm text-gray-500 pl-13">
                    Create and manage courses with ease. Organize content, set schedules, and track progress.
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                    </div>
                    <div className="font-medium text-base">Student Groups</div>
                  </div>
                  <div className="text-sm text-gray-500 pl-13">
                    Organize students into groups for collaborative learning and targeted instruction.
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="font-medium text-base">Question Bank</div>
                  </div>
                  <div className="text-sm text-gray-500 pl-13">
                    Create, store, and organize questions for assessments and quizzes.
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="font-medium text-base">Analytics & Reports</div>
                  </div>
                  <div className="text-sm text-gray-500 pl-13">
                    Gain insights into student performance with detailed analytics and reports.
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -right-8 -top-8 w-16 h-16 bg-[#4970FC] opacity-10 rounded-full"></div>
          <div className="absolute -left-4 -bottom-4 w-12 h-12 bg-[#4970FC] opacity-10 rounded-full"></div>
          
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
          
          {/* Connecting line to features visualization */}
          <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-8 h-0.5 bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesOnboarding;
