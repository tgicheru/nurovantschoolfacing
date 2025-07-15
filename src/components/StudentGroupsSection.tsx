import React from 'react';

const StudentGroupsSection: React.FC = () => {
  return (
    <div className="student-groups-section mt-6 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Student Groups</h2>
      <p className="text-sm text-gray-600 mb-4">
        Create and manage groups of students for better organization and collaborative learning.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-sm">Physics 101 - Group A</span>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Active</span>
          </div>
          <p className="text-xs text-gray-500">12 students • Created 2 weeks ago</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-sm">Chemistry 202 - Lab Group</span>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Active</span>
          </div>
          <p className="text-xs text-gray-500">8 students • Created 3 days ago</p>
        </div>
      </div>
      <button className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Create New Group
      </button>
    </div>
  );
};

export default StudentGroupsSection;
