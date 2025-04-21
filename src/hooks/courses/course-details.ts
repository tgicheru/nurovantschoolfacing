import { useQuery } from 'react-query';
import coursesService from '../../services/courses.service';

// Hook for fetching course details with lectures and resources
export const useGetCourseDetails = (courseId: string, options = {}) => {
  return useQuery(
    ['course-details', courseId],
    () => coursesService.fetchCourseDetails(courseId),
    {
      enabled: !!courseId,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      ...options,
    }
  );
};
