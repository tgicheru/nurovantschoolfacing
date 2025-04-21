import { useContext } from 'react';
import { AxiosContext } from '../context/AxiosContext';
import axios, { AxiosInstance } from 'axios';

// Types for dashboard API
export interface Course {
  _id: string;
  userId: string;
  course_title: string;
  course_image?: string;
  state: string;
  grade: string;
  institution: string;
  curriculum_url: string;
  integrateWithGoogleCalendar: boolean;
  googleCalendarId: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  students: any[];
}

export interface Lecture {
  _id: string;
  user: string;
  course: string;
  status: string;
  title: string;
  date: string;
  unit: string;
  sub_topic: string;
  topics: string[];
  quiz: string | null;
  flash_card: string | null;
  lesson_plan: string | null;
  recap: string | null;
  creative_assessment: string | null;
  curricullum_alignment: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  startTime?: string;
  endTime?: string;
  isIntegratedWithGoogleCalendar?: boolean;
  googleCalendarId?: string;
  googleEventId?: string | null;
  lessonPlan?: any | null;
}

export interface CourseDeadline {
  course: Course;
  lecture: Lecture;
}

export interface DashboardData {
  upcomingCourseDeadlines: CourseDeadline[];
  upcomingLectures: Lecture[];
  userCourses: Course[];
  todayLectures: Lecture[];
}

// API functions
const BASE_URL = process.env.REACT_APP_API_URL || '';

// Use the AxiosContext for authenticated requests
export const useDashboardService = () => {
  const axiosInstance = useContext(AxiosContext);
  
  // Create a default axios instance if the context is null
  const apiClient: AxiosInstance = axiosInstance || axios.create({
    baseURL: process.env.REACT_APP_API_URL || '',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
  
  return {
    fetchDashboardData: async (): Promise<DashboardData> => {
      try {
        const response = await apiClient.get('teacher_api/courses/dashboard');
        return response.data.data; // Extract the data property from the response
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        throw error;
      }
    },
    
    fetchUpcomingTasks: async (): Promise<any[]> => {
      try {
        const response = await apiClient.get('teacher_api/tasks/upcoming');
        return response.data;
      } catch (error) {
        console.error('Error fetching upcoming tasks:', error);
        throw error;
      }
    },
    
    fetchCalendarActivities: async (startDate: string, endDate: string): Promise<any[]> => {
      try {
        const response = await apiClient.get(
          `teacher_api/calendar?startDate=${startDate}&endDate=${endDate}`
        );
        return response.data;
      } catch (error) {
        console.error('Error fetching calendar activities:', error);
        throw error;
      }
    },
    
    fetchPerformanceData: async (classId: string, weekRange: string): Promise<any> => {
      try {
        const response = await apiClient.get(
          `teacher_api/performance?classId=${classId}&weekRange=${weekRange}`
        );
        return response.data;
      } catch (error) {
        console.error('Error fetching performance data:', error);
        throw error;
      }
    }
  };
};

// For backward compatibility, provide these functions that use the BASE_URL
// but they should be replaced with the hook-based approach above

/**
 * Fetch teacher dashboard courses data
 * Endpoint: teacher_api/courses/dashboard
 * This endpoint is for the main overview dashboard
 */
export const fetchDashboardData = async (): Promise<DashboardData> => {
  try {
    // For testing only - this should be replaced with the hook-based approach
    // Mock data based on the actual API response
    return {
      upcomingCourseDeadlines: [
        {
          course: {
            _id: "67fd98d3a299d4b4f061966d",
            userId: "67fd92b577c3b6191c4278c8",
            course_title: "Go Math",
            state: "Illinois",
            grade: "14",
            institution: "Illinois",
            curriculum_url: "https://nurovantfrontend.s3.amazonaws.com/2025_04_14T23_20_54_268Z_user_pacing_guide.pdf",
            integrateWithGoogleCalendar: false,
            googleCalendarId: null,
            createdAt: "2025-04-14T23:23:07.154Z",
            updatedAt: "2025-04-14T23:23:07.154Z",
            __v: 0,
            students: []
          },
          lecture: {
            _id: "67fd98d3a299d4b4f0619682",
            user: "67fd92b577c3b6191c4278c8",
            status: "PENDING",
            title: "Estimate Quotients Using Multiples & Opener 4.NBT",
            date: "2025-04-20",
            unit: ".6",
            sub_topic: "In this lesson, students will learn to estimate quotients by using multiples. They will develop strategies to determine reasonable estimates for division problems, enhancing their number sense and rounding skills.",
            topics: [],
            quiz: null,
            flash_card: null,
            lesson_plan: null,
            recap: null,
            creative_assessment: null,
            curricullum_alignment: null,
            createdAt: "2025-04-14T23:23:00.289Z",
            updatedAt: "2025-04-14T23:23:00.289Z",
            __v: 0,
            endTime: "14:45",
            startTime: "14:00",
            course: "67fd98d3a299d4b4f061966d"
          }
        },
        {
          course: {
            _id: "67fd96a2a299d4b4f0618f87",
            userId: "67fd92b577c3b6191c4278c8",
            course_title: "Science.",
            course_image: "https://nurovantfrontend.s3.amazonaws.com/2025_04_14T23_09_05_728Z_user_favicon_48x48.png",
            state: "Alaska",
            grade: "Grade 6 (Middle School)",
            institution: "Nurovant Sch",
            curriculum_url: "https://nurovantfrontend.s3.amazonaws.com/2025_04_14T23_09_50_456Z_user_Early_Childhood_K10_Syllabus.pdf",
            integrateWithGoogleCalendar: true,
            googleCalendarId: "c_6385541aa1a6c7ace3c52dc92c2ee016856e70ecc8aae149748a7ac194db5506@group.calendar.google.com",
            createdAt: "2025-04-14T23:13:38.154Z",
            updatedAt: "2025-04-14T23:13:38.154Z",
            __v: 0,
            students: []
          },
          lecture: {
            _id: "67fd96b4a299d4b4f0618fe5",
            user: "67fd92b577c3b6191c4278c8",
            isIntegratedWithGoogleCalendar: true,
            googleCalendarId: "c_6385541aa1a6c7ace3c52dc92c2ee016856e70ecc8aae149748a7ac194db5506@group.calendar.google.com",
            googleEventId: null,
            status: "PENDING",
            title: "Introduction to Algebra",
            date: "2025-04-22",
            unit: "1",
            sub_topic: "Simple Equations",
            topics: [],
            quiz: null,
            flash_card: null,
            lesson_plan: null,
            recap: null,
            creative_assessment: null,
            curricullum_alignment: null,
            createdAt: "2025-04-14T23:13:56.386Z",
            updatedAt: "2025-04-20T07:51:09.308Z",
            __v: 0,
            endTime: "15:30",
            startTime: "14:30",
            course: "67fd96a2a299d4b4f0618f87"
          }
        }
      ],
      upcomingLectures: [
        {
          _id: "67fd98d3a299d4b4f0619682",
          user: "67fd92b577c3b6191c4278c8",
          course: "67fd98d3a299d4b4f061966d",
          status: "PENDING",
          title: "Estimate Quotients Using Multiples & Opener 4.NBT",
          date: "2025-04-20",
          unit: ".6",
          sub_topic: "In this lesson, students will learn to estimate quotients by using multiples. They will develop strategies to determine reasonable estimates for division problems, enhancing their number sense and rounding skills.",
          topics: [],
          quiz: null,
          flash_card: null,
          lesson_plan: null,
          recap: null,
          creative_assessment: null,
          curricullum_alignment: null,
          createdAt: "2025-04-14T23:23:00.289Z",
          updatedAt: "2025-04-14T23:23:00.289Z",
          __v: 0,
          endTime: "14:45",
          startTime: "14:00"
        },
        {
          _id: "67fd96b4a299d4b4f0618fe5",
          user: "67fd92b577c3b6191c4278c8",
          course: "67fd96a2a299d4b4f0618f87",
          isIntegratedWithGoogleCalendar: true,
          googleCalendarId: "c_6385541aa1a6c7ace3c52dc92c2ee016856e70ecc8aae149748a7ac194db5506@group.calendar.google.com",
          googleEventId: null,
          status: "PENDING",
          title: "Introduction to Algebra",
          date: "2025-04-22",
          unit: "1",
          sub_topic: "Simple Equations",
          topics: [],
          quiz: null,
          flash_card: null,
          lesson_plan: null,
          recap: null,
          creative_assessment: null,
          curricullum_alignment: null,
          createdAt: "2025-04-14T23:13:56.386Z",
          updatedAt: "2025-04-20T07:51:09.308Z",
          __v: 0,
          endTime: "15:30",
          startTime: "14:30"
        }
      ],
      userCourses: [
        {
          _id: "67fd96a2a299d4b4f0618f87",
          userId: "67fd92b577c3b6191c4278c8",
          course_title: "Science.",
          course_image: "https://nurovantfrontend.s3.amazonaws.com/2025_04_14T23_09_05_728Z_user_favicon_48x48.png",
          state: "Alaska",
          grade: "Grade 6 (Middle School)",
          institution: "Nurovant Sch",
          curriculum_url: "https://nurovantfrontend.s3.amazonaws.com/2025_04_14T23_09_50_456Z_user_Early_Childhood_K10_Syllabus.pdf",
          integrateWithGoogleCalendar: true,
          googleCalendarId: "c_6385541aa1a6c7ace3c52dc92c2ee016856e70ecc8aae149748a7ac194db5506@group.calendar.google.com",
          createdAt: "2025-04-14T23:13:38.154Z",
          updatedAt: "2025-04-14T23:13:38.154Z",
          __v: 0,
          students: []
        },
        {
          _id: "67fd98d3a299d4b4f061966d",
          userId: "67fd92b577c3b6191c4278c8",
          course_title: "Go Math",
          state: "Illinois",
          grade: "14",
          institution: "Illinois",
          curriculum_url: "https://nurovantfrontend.s3.amazonaws.com/2025_04_14T23_20_54_268Z_user_pacing_guide.pdf",
          integrateWithGoogleCalendar: false,
          googleCalendarId: null,
          createdAt: "2025-04-14T23:23:07.154Z",
          updatedAt: "2025-04-14T23:23:07.154Z",
          __v: 0,
          students: []
        }
      ],
      todayLectures: [
        {
          _id: "67fd98d3a299d4b4f0619682",
          user: "67fd92b577c3b6191c4278c8",
          course: "67fd98d3a299d4b4f061966d",
          status: "PENDING",
          title: "Estimate Quotients Using Multiples & Opener 4.NBT",
          date: "2025-04-20",
          unit: ".6",
          sub_topic: "In this lesson, students will learn to estimate quotients by using multiples. They will develop strategies to determine reasonable estimates for division problems, enhancing their number sense and rounding skills.",
          topics: [],
          quiz: null,
          flash_card: null,
          lesson_plan: null,
          recap: null,
          creative_assessment: null,
          curricullum_alignment: null,
          createdAt: "2025-04-14T23:23:00.289Z",
          updatedAt: "2025-04-14T23:23:00.289Z",
          __v: 0,
          endTime: "14:45",
          startTime: "14:00",
          lessonPlan: null
        }
      ]
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};

/**
 * Fetch upcoming tasks for the teacher
 */
export const fetchUpcomingTasks = async (): Promise<Lecture[]> => {
  try {
    // For testing only - this should be replaced with the hook-based approach
    return [];
  } catch (error) {
    console.error('Error fetching upcoming tasks:', error);
    throw error;
  }
};

/**
 * Fetch calendar activities for a specific date range
 */
export const fetchCalendarActivities = async (startDate: string, endDate: string): Promise<Lecture[]> => {
  try {
    // For testing only - this should be replaced with the hook-based approach
    return [];
  } catch (error) {
    console.error('Error fetching calendar activities:', error);
    throw error;
  }
};

/**
 * Fetch performance data for a specific class
 */
export const fetchPerformanceData = async (classId: string, weekRange: string): Promise<any> => {
  try {
    // For testing only - this should be replaced with the hook-based approach
    return {};
  } catch (error) {
    console.error('Error fetching performance data:', error);
    throw error;
  }
};
