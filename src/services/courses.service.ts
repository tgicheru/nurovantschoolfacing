import apiClient from './api-client';
import { Course } from './dashboard.service';

// Extended course interface with more details
export interface CourseDetails extends Course {
  lectures: Lecture[];
  resources: Resource[];
}

export interface Lecture {
  _id: string;
  course_id: string;
  title: string;
  description?: string;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface Resource {
  _id: string;
  course_id: string;
  title: string;
  type: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

// Courses Service
const coursesService = {
  // Fetch teacher specific course details (for course resources and lectures)
  fetchCourseDetails: async (courseId: string): Promise<CourseDetails> => {
    try {
      const response = await apiClient.get(`teacher_api/courses/details?course_id=${courseId}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching course details:', error);
      throw error;
    }
  },

  // Get all courses
  fetchCourses: async (params?: { limit?: number; page?: number }): Promise<{ data: Course[]; total: number }> => {
    try {
      const response = await apiClient.get('teacher_api/courses', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  },

  // Create a new course
  createCourse: async (courseData: Partial<Course>): Promise<Course> => {
    try {
      const response = await apiClient.post('teacher_api/courses/create', courseData);
      return response.data.data;
    } catch (error) {
      console.error('Error creating course:', error);
      throw error;
    }
  },
};

export default coursesService;
