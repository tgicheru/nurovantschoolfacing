import { AxiosInstance } from 'axios';
import apiClient from '../services/api-client';

// Types for student groups
export interface Student {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface StudentGroupMember {
  _id?: string;
  name: string;
  email: string;
  isLeader: boolean;
}

export interface StudentGroup {
  _id: string;
  lecture_id: string;
  groupName: string;
  students: StudentGroupMember[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateStudentGroupRequest {
  lecture_id: string;
  groupName: string;
  students: {
    name: string;
    email: string;
    isLeader: boolean;
  }[];
}

export interface UpdateGroupNameRequest {
  groupId: string;
  groupName: string;
}

export interface ChangeGroupLeaderRequest {
  groupId: string;
  newLeaderId: string;
}

export interface UpdateLectureDateRequest {
  lectureId: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface Lecture {
  _id: string;
  title: string;
  description?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Course {
  _id: string;
  title?: string; // Keep for backward compatibility
  course_title: string; // The actual field returned by the API
  description?: string;
  lectures?: Lecture[];
  createdAt?: string;
  updatedAt?: string;
}

// Helper function to get authentication token with proper logging
const getAuthToken = () => {
  const authData = localStorage.getItem('authentication');
  let token = null;
  
  if (authData) {
    try {
      const parsedAuthData = JSON.parse(authData);
      
      // Check for different token formats
      if (typeof parsedAuthData === 'string' && parsedAuthData.includes('token":"')) {
        // Format: token":"value
        const tokenMatch = parsedAuthData.match(/token":"([^"]+)/);
        if (tokenMatch && tokenMatch[1]) {
          token = tokenMatch[1];
          console.log('Extracted token from string format in student groups service');
        }
      } else if (parsedAuthData && typeof parsedAuthData === 'object') {
        // Standard object format
        if (parsedAuthData.token) {
          token = parsedAuthData.token;
        }
      }
      
      // Log token format for debugging
      if (token) {
        console.log(`Token found in student groups service: ${token.substring(0, 10)}...`);
      } else {
        console.warn('Token is null in parsed auth data');
        console.log('Full parsed auth data:', JSON.stringify(parsedAuthData));
        
        // Try to extract directly from the raw string as a last resort
        if (typeof authData === 'string') {
          if (authData.includes('token":"')) {
            const directMatch = authData.match(/token":"([^"]+)/);
            if (directMatch && directMatch[1]) {
              token = directMatch[1];
              console.log('Extracted token directly from raw localStorage string');
            }
          }
        }
      }
    } catch (error) {
      console.error('Error parsing auth data:', error);
      
      // Try to extract directly from the raw string if JSON parsing failed
      if (typeof authData === 'string') {
        if (authData.includes('token":"')) {
          const directMatch = authData.match(/token":"([^"]+)/);
          if (directMatch && directMatch[1]) {
            token = directMatch[1];
            console.log('Extracted token from raw string after JSON parse error');
          }
        }
      }
    }
  } else {
    console.warn('No authentication data found in localStorage');
  }
  
  return token;
};

// Student Groups Service
const studentGroupsService = {
  // Fetch all students
  fetchAllStudents: async (): Promise<Student[]> => {
    try {
      // Get the authentication token
      const token = getAuthToken();
      
      // Make the API request with Authorization header if token exists
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        console.log('Using Authorization header:', headers['Authorization']);
      }
      
      // Log the request details
      console.log('Making request to /teacher_api/students with headers:', headers);
      
      const response = await apiClient.get('/teacher_api/students', { headers });
      
      // Log success for debugging
      console.log('Successfully fetched students');
      
      return response.data.data || [];
    } catch (error: any) {
      console.error('Error fetching students:', error.response?.data || error.message);
      // Return empty array instead of throwing error
      return [];
    }
  },
  // Create student group manually
  createStudentGroup: async (data: CreateStudentGroupRequest): Promise<StudentGroup> => {
    try {
      // Get the authentication token
      const token = getAuthToken();
      
      // Make the API request with Authorization header if token exists
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        console.log('Using Authorization header for create group:', headers['Authorization']);
      }
      
      // Log the request details
      console.log('Making request to create student group with headers:', headers);
      
      const response = await apiClient.post('/teacher_api/student-groups/create', data, { headers });
      
      console.log('Successfully created student group');
      return response.data.data;
    } catch (error: any) {
      console.error('Error creating student group:', error.response?.data || error.message);
      throw error;
    }
  },

  // Update student group name
  updateGroupName: async (data: UpdateGroupNameRequest): Promise<StudentGroup> => {
    try {
      // Get the authentication token
      const token = getAuthToken();
      
      // Make the API request with Authorization header if token exists
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        console.log('Using Authorization header for update group name:', headers['Authorization']);
      }
      
      // Log the request details
      console.log('Making request to update group name with data:', data);
      
      // Using PUT method as specified in the API documentation
      const response = await apiClient.put('/teacher_api/student-groups/name', data, { headers });
      
      console.log('Successfully updated group name');
      return response.data.data;
    } catch (error: any) {
      console.error('Error updating group name:', error.response?.data || error.message);
      throw error;
    }
  },

  // Change group leader
  changeGroupLeader: async (data: ChangeGroupLeaderRequest): Promise<StudentGroup> => {
    try {
      // Get the authentication token
      const token = getAuthToken();
      
      // Make the API request with Authorization header if token exists
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        console.log('Using Authorization header for change group leader:', headers['Authorization']);
      }
      
      // Log the request details
      console.log('Making request to change group leader with data:', data);
      
      // Using PUT method as specified in the API documentation
      const response = await apiClient.put('/teacher_api/student-groups/leader', data, { headers });
      
      console.log('Successfully changed group leader');
      return response.data.data;
    } catch (error: any) {
      console.error('Error changing group leader:', error.response?.data || error.message);
      throw error;
    }
  },

  // Fetch teacher student groups
  fetchStudentGroups: async (): Promise<StudentGroup[]> => {
    try {
      // Get the authentication token
      const token = getAuthToken();
      
      // Make the API request with Authorization header if token exists
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        console.log('Using Authorization header for fetch groups:', headers['Authorization']);
      }
      
      // Log the request details
      console.log('Making request to fetch student groups with headers:', headers);
      
      const response = await apiClient.get('/teacher_api/student-groups/user', { headers });
      
      console.log('Successfully fetched student groups');
      return response.data.data || [];
    } catch (error: any) {
      console.error('Error fetching student groups:', error.response?.data || error.message);
      // Return empty array instead of throwing error
      return [];
    }
  },

  // Update lecture date, startTime and endTime
  updateLectureDate: async (data: UpdateLectureDateRequest): Promise<any> => {
    try {
      const response = await apiClient.put('teacher_api/lecture/update-date', data);
      return response.data.data;
    } catch (error) {
      console.error('Error updating lecture date:', error);
      throw error;
    }
  },
  
  // Fetch course details with lectures
  fetchCourseDetails: async (courseId: string): Promise<Course> => {
    try {
      // Get the authentication token
      const token = getAuthToken();
      
      // Make the API request with Authorization header if token exists
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        console.log('Using Authorization header for fetch course details:', headers['Authorization']);
      }
      
      // Log the request details
      console.log(`Making request to fetch course details for course ID: ${courseId}`);
      
      const response = await apiClient.get(`/teacher_api/courses?course_id=${courseId}`, { headers });
      
      console.log('Successfully fetched course details');
      return response.data.data || {};
    } catch (error: any) {
      console.error('Error fetching course details:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // Fetch all courses
  fetchAllCourses: async (): Promise<Course[]> => {
    try {
      // Get the authentication token
      const token = getAuthToken();
      
      // Make the API request with Authorization header if token exists
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        console.log('Using Authorization header for fetch all courses:', headers['Authorization']);
      }
      
      // Log the request details
      console.log('Making request to fetch all courses using correct endpoint');
      
      const response = await apiClient.get('/teacher_api/courses/my_courses', { headers });
      
      console.log('Successfully fetched all courses');
      return response.data.data || [];
    } catch (error: any) {
      console.error('Error fetching all courses:', error.response?.data || error.message);
      return [];
    }
  },
};

export default studentGroupsService;
