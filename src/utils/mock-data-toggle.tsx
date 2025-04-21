import React from 'react';
import { Button, Switch, message, Tooltip } from 'antd';
import { DatabaseOutlined, ApiOutlined } from '@ant-design/icons';

/**
 * Enable or disable mock data mode
 * @param enable Whether to enable or disable mock data mode
 */
export const setMockDataMode = (enable: boolean): void => {
  localStorage.setItem('useMockData', enable ? 'true' : 'false');
  
  // Log the change
  console.log(`Mock data mode ${enable ? 'enabled' : 'disabled'}`);
  
  // Show a message to the user
  message.success(
    enable 
      ? 'Mock data mode enabled. Using sample data for development.' 
      : 'Mock data mode disabled. Using real API endpoints.'
  );
};

/**
 * Check if mock data mode is enabled
 */
export const isMockDataEnabled = (): boolean => {
  return localStorage.getItem('useMockData') === 'true';
};

/**
 * Toggle mock data mode
 */
export const toggleMockDataMode = (): void => {
  const currentMode = isMockDataEnabled();
  setMockDataMode(!currentMode);
};

/**
 * React component for a mock data toggle switch
 */
export const MockDataToggle: React.FC = () => {
  const [mockEnabled, setMockEnabled] = React.useState<boolean>(isMockDataEnabled());
  
  const handleToggle = (checked: boolean) => {
    setMockDataMode(checked);
    setMockEnabled(checked);
  };
  
  return (
    <Tooltip title={mockEnabled ? 'Using mock data (development mode)' : 'Using real API data'}>
      <div className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-lg">
        <span className="text-xs text-gray-500">API</span>
        <Switch 
          size="small"
          checked={mockEnabled}
          onChange={handleToggle}
          checkedChildren={<DatabaseOutlined />}
          unCheckedChildren={<ApiOutlined />}
        />
        <span className="text-xs text-gray-500">Mock</span>
      </div>
    </Tooltip>
  );
};

/**
 * React component for a mock data toggle button
 */
export const MockDataButton: React.FC = () => {
  const [mockEnabled, setMockEnabled] = React.useState<boolean>(isMockDataEnabled());
  
  const handleToggle = () => {
    const newMode = !mockEnabled;
    setMockDataMode(newMode);
    setMockEnabled(newMode);
  };
  
  return (
    <Button
      type={mockEnabled ? 'primary' : 'default'}
      icon={mockEnabled ? <DatabaseOutlined /> : <ApiOutlined />}
      onClick={handleToggle}
      size="small"
    >
      {mockEnabled ? 'Using Mock Data' : 'Using API Data'}
    </Button>
  );
};
