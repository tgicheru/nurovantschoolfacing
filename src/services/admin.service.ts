import axios from 'axios';
import { getAuthToken } from './auth.service';

// Define the base URL for API requests
const BASE_URL = process.env.REACT_APP_API_URL || '';

// Utility function to construct API URLs without double slashes
const constructApiUrl = (endpoint: string) => {
  const base = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${base}${path}`;
};

// Interface for dashboard stats response
export interface DashboardStatsResponse {
  totalTeachers: number;
  totalStudents: number;
  totalCourses: number;
  totalLectures: number;
}

// Interface for teacher registration request
export interface TeacherRegistrationRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  state: string;
  sex: string;
  grade_level: string;
  subject: string;
  phone_number: string;
  user_type: 'TEACHER';
  profile_image?: string;
}

// Interface for file upload response
export interface FileUploadResponse {
  url: string;
  message?: string;
  success: boolean;
}

// Interface for S3 presigned URL response
export interface S3PresignedUrlResponse {
  url: string;
  fields: Record<string, string>;
  key: string;
  bucket: string;
}

// Interface for teacher data
export interface Teacher {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  state: string;
  sex: string;
  grade_level?: string;
  subject?: string;
  phone_number?: string;
  profile_image?: string;
  isVerified?: boolean;
  isGoogleConnected?: boolean;
  sign_up_type?: string;
  user_type?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  school?: string;
  status?: string;
}

// Interface for student data
export interface Student {
  _id: string;
  name: string;
  email: string;
  username?: string;
  phoneNo?: string;
  password?: string;
  grade?: string;
  courses?: any[];
  __v?: number;
  createdAt?: string;
  updatedAt?: string;
}

// Interface for teachers response
export interface TeachersResponse {
  success: boolean;
  data: Teacher[];
  total?: number;
  page?: number;
  limit?: number;
}

// Interface for students response
export interface StudentsResponse {
  success: boolean;
  data: Student[];
  total?: number;
}

// Admin service
const adminService = {
  /**
   * Get Dashboard Stats
   * Endpoint: /teacher_api/admin/dashboard
   * @returns Promise with dashboard stats response
   */
  getDashboardStats: async (): Promise<DashboardStatsResponse> => {
    try {
      const token = getAuthToken();
      
      if (!token) {
        throw new Error('Authentication token not found');
      }
      
      console.log('Fetching admin dashboard stats');
      
      const response = await axios.get(constructApiUrl('teacher_api/admin/dashboard'), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Dashboard stats response:', response.data);
      
      // The API returns the stats directly, not nested under data
      const stats = response.data;
      
      // Verify we have the expected structure
      if (typeof stats.totalTeachers === 'undefined' || 
          typeof stats.totalStudents === 'undefined' || 
          typeof stats.totalCourses === 'undefined' || 
          typeof stats.totalLectures === 'undefined') {
        console.error('Unexpected dashboard stats structure:', stats);
        throw new Error('Unexpected dashboard stats structure');
      }
      
      return stats;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  },

  /**
   * Get All Teachers
   * Endpoint: /teacher_api/admin/teachers
   * @param page Page number for pagination
   * @param limit Number of teachers per page
   * @returns Promise with teachers response
   */
  getAllTeachers: async (page: number = 1, limit: number = 10): Promise<TeachersResponse> => {
    try {
      const token = getAuthToken();
      
      if (!token) {
        throw new Error('Authentication token not found');
      }
      
      console.log('Fetching teachers, page:', page, 'limit:', limit);
      
      const response = await axios.get(constructApiUrl('teacher_api/admin/teachers'), {
        params: {
          page,
          limit
        },
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Teachers response:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('Error fetching teachers:', error);
      throw error;
    }
  },

  /**
   * Get All Students
   * Endpoint: /teacher_api/students
   * @param page Page number for pagination
   * @param limit Number of students per page
   * @returns Promise with students response
   */
  getAllStudents: async (page: number = 1, limit: number = 10): Promise<StudentsResponse> => {
    try {
      const token = getAuthToken();
      
      if (!token) {
        throw new Error('Authentication token not found');
      }
      
      console.log('🔍 Fetching students from API...');
      console.log('📊 Page:', page, 'Limit:', limit);
      const endpoint = constructApiUrl('teacher_api/students');
      console.log('🔗 Endpoint:', endpoint);
      console.log('🔑 Token exists:', !!token);
      
      const response = await axios.get(endpoint, {
        params: {
          page,
          limit
        },
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      console.log('✅ Students API response:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching students:', error);
      throw error;
    }
  },

  /**
   * Register a new teacher
   * Endpoint: /teacher_api/auth/sign_up
   * @param data Teacher registration data
   * @returns Promise with registration response
   */
  registerTeacher: async (data: TeacherRegistrationRequest): Promise<any> => {
    try {
      const token = getAuthToken();
      
      if (!token) {
        throw new Error('Authentication token not found');
      }
      
      console.log('Registering new teacher:', { email: data.email });
      
      const response = await axios.post(constructApiUrl('teacher_api/auth/sign_up'), data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Teacher registration response:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('Error registering teacher:', error);
      throw error;
    }
  },
  
  /**
   * Get S3 presigned URL for direct upload
   * @param fileType MIME type of the file to upload
   * @param fileName Name of the file to upload
   * @returns Promise with presigned URL response
   */
  getS3PresignedUrl: async (fileType: string, fileName: string): Promise<S3PresignedUrlResponse> => {
    try {
      const token = getAuthToken();
      
      if (!token) {
        throw new Error('Authentication token not found');
      }
      
      console.log('Getting S3 presigned URL for:', { fileName, fileType });
      
      // Request a presigned URL from the backend
      const response = await axios.post(constructApiUrl('teacher_api/uploads/s3/presigned-url'), {
        contentType: fileType,
        fileName: fileName
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Presigned URL response:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('Error getting presigned URL:', error);
      throw error;
    }
  },
  
  /**
   * Upload file directly to S3 bucket using presigned URL
   * @param file File to upload
   * @returns Promise with upload response
   */
  uploadFileToS3: async (file: File): Promise<FileUploadResponse> => {
    try {
      // Get presigned URL for the file
      const presignedData = await adminService.getS3PresignedUrl(file.type, file.name);
      
      // Create form data for direct S3 upload
      const formData = new FormData();
      
      // Add all the fields from the presigned URL response
      Object.entries(presignedData.fields).forEach(([key, value]) => {
        formData.append(key, value);
      });
      
      // Add the file as the last field
      formData.append('file', file);
      
      console.log('Uploading file directly to S3:', { fileName: file.name, fileSize: file.size });
      
      // Upload directly to S3 using the presigned URL
      const uploadResponse = await axios.post(presignedData.url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('S3 direct upload response:', uploadResponse);
      
      // Construct the final URL for the uploaded file
      const fileUrl = `${presignedData.url}/${presignedData.key}`;
      
      return {
        url: fileUrl,
        success: uploadResponse.status === 204 || uploadResponse.status === 200,
        message: 'File uploaded successfully'
      };
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      throw error;
    }
  },
};

export default adminService;
