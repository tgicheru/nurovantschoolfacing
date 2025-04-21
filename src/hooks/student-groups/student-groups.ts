import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import studentGroupsService, { 
  Student, 
  StudentGroup, 
  CreateStudentGroupRequest, 
  UpdateGroupNameRequest, 
  ChangeGroupLeaderRequest,
  UpdateLectureDateRequest,
  Course,
  Lecture
} from '../../services/student-groups.service';
import { message } from 'antd';

// Hook for fetching all students
export const useGetAllStudents = () => {
  return useQuery(['students'], () => studentGroupsService.fetchAllStudents(), {
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

// Hook to get all student groups
export const useGetStudentGroups = () => {
  const [isAuthError, setIsAuthError] = useState(false);
  
  const { data, isLoading, error, refetch } = useQuery(
    'studentGroups',
    async () => {
      try {
        setIsAuthError(false);
        const groups = await studentGroupsService.fetchStudentGroups();
        return groups;
      } catch (err: any) {
        // Check if error is authentication related
        if (err.response?.status === 401 || 
            (err.response?.data?.message && 
             err.response?.data?.message.includes('not authenticated'))) {
          console.error('Authentication error fetching student groups:', err);
          setIsAuthError(true);
        }
        throw err;
      }
    },
    {
      refetchOnWindowFocus: false,
      retry: false,
      onError: (err: any) => {
        console.error('Error fetching student groups:', err);
      }
    }
  );

  return { groups: data || [], isLoading, error, isAuthError, refetch };
};

// Hook to get all courses
export const useGetAllCourses = () => {
  const [isAuthError, setIsAuthError] = useState(false);
  
  const { data, isLoading, error, refetch } = useQuery(
    'allCourses',
    async () => {
      try {
        setIsAuthError(false);
        const courses = await studentGroupsService.fetchAllCourses();
        return courses;
      } catch (err: any) {
        // Check if error is authentication related
        if (err.response?.status === 401 || 
            (err.response?.data?.message && 
             err.response?.data?.message.includes('not authenticated'))) {
          console.error('Authentication error fetching courses:', err);
          setIsAuthError(true);
        }
        throw err;
      }
    },
    {
      refetchOnWindowFocus: false,
      retry: false,
      onError: (err: any) => {
        console.error('Error fetching courses:', err);
      }
    }
  );

  return { courses: data || [], isLoading, error, isAuthError, refetch };
};

// Hook to get specific course details with lectures
export const useGetCourseDetails = (courseId: string, enabled = true) => {
  const [isAuthError, setIsAuthError] = useState(false);
  
  const { data, isLoading, error, refetch } = useQuery(
    ['courseDetails', courseId],
    async () => {
      try {
        setIsAuthError(false);
        if (!courseId) return null;
        const course = await studentGroupsService.fetchCourseDetails(courseId);
        return course;
      } catch (err: any) {
        // Check if error is authentication related
        if (err.response?.status === 401 || 
            (err.response?.data?.message && 
             err.response?.data?.message.includes('not authenticated'))) {
          console.error('Authentication error fetching course details:', err);
          setIsAuthError(true);
        }
        throw err;
      }
    },
    {
      refetchOnWindowFocus: false,
      retry: false,
      enabled: enabled && !!courseId,
      onError: (err: any) => {
        console.error('Error fetching course details:', err);
      }
    }
  );

  return { course: data, lectures: data?.lectures || [], isLoading, error, isAuthError, refetch };
};

// Hook for creating a student group
export const useCreateStudentGroup = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    (data: CreateStudentGroupRequest) => studentGroupsService.createStudentGroup(data),
    {
      onSuccess: () => {
        // Invalidate and refetch student groups
        queryClient.invalidateQueries(['studentGroups']);
      },
    }
  );
};

// Hook for updating group name
export const useUpdateGroupName = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    (data: UpdateGroupNameRequest) => studentGroupsService.updateGroupName(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['studentGroups']);
      },
    }
  );
};

// Hook for changing group leader
export const useChangeGroupLeader = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    (data: ChangeGroupLeaderRequest) => studentGroupsService.changeGroupLeader(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['studentGroups']);
        queryClient.invalidateQueries(['student-groups']);
      },
    }
  );
};

// Hook for updating lecture date
export const useUpdateLectureDate = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    (data: UpdateLectureDateRequest) => studentGroupsService.updateLectureDate(data),
    {
      onSuccess: () => {
        // Invalidate and refetch lectures
        queryClient.invalidateQueries(['lectures']);
        queryClient.invalidateQueries(['course-details']);
      },
    }
  );
};
