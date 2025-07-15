import React from 'react';

const PacingGuideSection: React.FC = () => {
  return (
    <div className="pacing-guide-section mt-6 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Pacing Guide</h2>
      <p className="text-sm text-gray-600 mb-4">
        Define your course pace by grade level and sync to Google Calendar for seamless planning.
      </p>
      <div className="space-y-3">
        <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-sm">Physics 101 - Fall Semester</span>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Synced</span>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <span className="mr-3">Grade: 11th</span>
            <span>16 weeks • 32 lectures</span>
          </div>
        </div>
        <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-sm">Chemistry 202 - Spring Semester</span>
            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">Draft</span>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <span className="mr-3">Grade: 10th</span>
            <span>18 weeks • 36 lectures</span>
          </div>
        </div>
      </div>
      <button className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Create New Pacing Guide
      </button>
    </div>
  );
};

export default PacingGuideSection;
