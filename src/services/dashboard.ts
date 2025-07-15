import type { DashboardData } from '../types/dashboard';

// Mock dashboard data
const mockDashboardData: DashboardData = {
  lectures: [
    {
      _id: '1',
      title: 'Introduction to Mathematics',
      course: 'MATH101',
      startTime: '2025-02-05T09:00:00',
      endTime: '2025-02-05T10:30:00',
    },
    {
      _id: '2',
      title: 'Science Lab: Chemistry Basics',
      course: 'SCI102',
      startTime: '2025-02-05T11:00:00',
      endTime: '2025-02-05T12:30:00',
    },
    {
      _id: '3',
      title: 'English Literature Review',
      course: 'ENG201',
      startTime: '2025-02-05T14:00:00',
      endTime: '2025-02-05T15:30:00',
    }
  ],
  deadlines: [
    {
      _id: '101',
      title: 'Math Assignment #3',
      course: 'MATH101',
      dueDate: '2025-02-07T23:59:59',
    },
    {
      _id: '102',
      title: 'Science Lab Report',
      course: 'SCI102',
      dueDate: '2025-02-10T23:59:59',
    }
  ]
};

// Function to get dashboard data
export const getDashboardData = async (token: string): Promise<DashboardData> => {
  // In a real app, this would make an API call using the token
  // For now, we'll return mock data after a small delay to simulate a network request
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDashboardData);
    }, 500);
  });
};
