import { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import adminService, { DashboardStatsResponse, TeachersResponse, TeacherRegistrationRequest, FileUploadResponse, StudentsResponse } from '../../services/admin.service';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { AxiosError } from 'axios';

console.log('🔧 Admin hooks module loaded');

/**
 * Hook for fetching admin dashboard stats
 * @returns Object containing dashboard stats data, loading state, and error
 */
export const useAdminDashboardStats = () => {
  const [isAuthError, setIsAuthError] = useState(false);
  
  const query = useQuery<DashboardStatsResponse, Error>(
    'adminDashboardStats',
    async () => {
      try {
        setIsAuthError(false);
        return await adminService.getDashboardStats();
      } catch (err: any) {
        // Check if error is authentication related
        if (err.response?.status === 401 || 
            err.response?.status === 403 || 
            (err.response?.data?.message && 
             err.response?.data?.message.includes('not authenticated'))) {
          console.error('Authentication error fetching dashboard stats:', err);
          setIsAuthError(true);
        }
        throw err;
      }
    },
    {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  return {
    dashboardStats: query.data || null,
    isLoading: query.isLoading,
    error: query.error,
    isAuthError,
    refetch: query.refetch
  };
};

/**
 * Hook for fetching all teachers with pagination
 * @param page Page number for pagination
 * @param limit Number of teachers per page
 * @returns Object containing teachers data, loading state, and error
 */
export const useAdminTeachers = (page: number = 1, limit: number = 10) => {
  const [isAuthError, setIsAuthError] = useState(false);
  
  const query = useQuery<TeachersResponse, Error>(
    ['adminTeachers', page, limit],
    async () => {
      try {
        setIsAuthError(false);
        return await adminService.getAllTeachers(page, limit);
      } catch (err: any) {
        // Check if error is authentication related
        if (err.response?.status === 401 || 
            err.response?.status === 403 || 
            (err.response?.data?.message && 
             err.response?.data?.message.includes('not authenticated'))) {
          console.error('Authentication error fetching teachers:', err);
          setIsAuthError(true);
        }
        throw err;
      }
    },
    {
      refetchOnWindowFocus: false,
      retry: 1,
      keepPreviousData: true, // Keep previous data while fetching new data
      staleTime: 2 * 60 * 1000, // 2 minutes
    }
  );

  return {
    teachers: query.data?.data || [],
    total: query.data?.total || query.data?.data?.length || 0,
    currentPage: query.data?.page || page,
    pageSize: query.data?.limit || limit,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    isAuthError,
    refetch: query.refetch
  };
};

/**
 * Hook for registering a new teacher
 * @param onSuccess Optional callback for successful registration
 * @returns Mutation for teacher registration
 */
export const useRegisterTeacher = (onSuccess?: (data: any) => void) => {
  const [isAuthError, setIsAuthError] = useState(false);

  return useMutation<any, Error, TeacherRegistrationRequest>(
    (data: TeacherRegistrationRequest) => adminService.registerTeacher(data),
    {
      onSuccess: (data) => {
        console.log('Teacher registered successfully:', data);
        if (onSuccess) onSuccess(data);
      },
      onError: (error: any) => {
        console.error('Error registering teacher:', error);
        
        // Check if error is authentication related
        if (error.response?.status === 401 || 
            error.response?.status === 403 || 
            (error.response?.data?.message && 
             error.response?.data?.message.includes('not authenticated'))) {
          console.error('Authentication error registering teacher:', error);
          setIsAuthError(true);
        }
      },
    }
  );
};

/**
 * Hook for uploading files to S3
 * @param onSuccess Optional callback for successful upload
 * @returns Mutation for file upload
 */
export const useFileUpload = (onSuccess?: (data: FileUploadResponse) => void) => {
  const [isAuthError, setIsAuthError] = useState(false);

  return useMutation<FileUploadResponse, Error, File>(
    (file: File) => adminService.uploadFileToS3(file),
    {
      onSuccess: (data) => {
        console.log('File uploaded successfully:', data);
        if (onSuccess) onSuccess(data);
      },
      onError: (error: any) => {
        console.error('Error uploading file:', error);
        
        // Check if error is authentication related
        if (error.response?.status === 401 || 
            error.response?.status === 403 || 
            (error.response?.data?.message && 
             error.response?.data?.message.includes('not authenticated'))) {
          console.error('Authentication error uploading file:', error);
          setIsAuthError(true);
        }
      },
    }
  );
};

/**
 * Hook for fetching all students
 * @param page Page number for pagination
 * @param limit Number of students per page
 * @returns Object containing students data, loading state, and error
 */
export const useAdminStudents = (page: number = 1, limit: number = 10) => {
  const [isAuthError, setIsAuthError] = useState(false);
  
  console.log('🎯 useAdminStudents hook called with page:', page, 'limit:', limit);
  
  const query = useQuery<StudentsResponse, Error>(
    ['adminStudents', page, limit],
    async () => {
      console.log('🚀 Starting API call for students...');
      try {
        setIsAuthError(false);
        const result = await adminService.getAllStudents(page, limit);
        console.log('✅ API call completed successfully:', result);
        return result;
      } catch (err: any) {
        console.log('❌ API call failed:', err);
        // Check if error is authentication related
        if (err.response?.status === 401 || 
            err.response?.status === 403 || 
            (err.response?.data?.message && 
             err.response?.data?.message.includes('not authenticated'))) {
          console.error('Authentication error fetching students:', err);
          setIsAuthError(true);
        }
        throw err;
      }
    },
    {
      refetchOnWindowFocus: false,
      retry: 1,
      keepPreviousData: true, // Keep previous data while fetching new data
      staleTime: 0, // Always fetch fresh data
      cacheTime: 5 * 60 * 1000, // 5 minutes cache
      enabled: true, // Always enable the query
    }
  );

  console.log('📊 Query state:', {
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    data: query.data
  });

  return {
    students: query.data?.data || [],
    total: query.data?.total || query.data?.data?.length || 0,
    currentPage: page,
    pageSize: limit,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    isAuthError,
    refetch: query.refetch
  };
};
