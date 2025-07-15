import React from 'react';

const TestOnboarding: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-blue-100 items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">Test Onboarding Page</h1>
        <p className="text-gray-700">This is a test page to verify routing is working correctly.</p>
      </div>
    </div>
  );
};

export default TestOnboarding;
