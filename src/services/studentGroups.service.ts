import axios from 'axios';

// Types for student group API
export interface StudentGroupMember {
  _id?: string;
  name: string;
  email: string;
  isLeader: boolean;
  score?: number;
}

export interface CreateStudentGroupPayload {
  lecture_id: string;
  groupName: string;
  students: StudentGroupMember[];
}

export interface UpdateGroupNamePayload {
  groupId: string;
  groupName: string;
}

export interface ChangeGroupLeaderPayload {
  groupId: string;
  newLeaderId: string;
}

export interface StudentGroup {
  _id: string;
  lecture_id: string;
  groupName: string;
  students: StudentGroupMember[];
  createdAt: string;
  updatedAt: string;
}

// API functions
const BASE_URL = process.env.REACT_APP_API_URL || '';

/**
 * Fetch teacher dashboard courses data
 */
export const fetchDashboardCourses = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/teacher_api/courses/dashboard`);
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard courses:', error);
    throw error;
  }
};

/**
 * Create a new student group
 */
export const createStudentGroup = async (payload: CreateStudentGroupPayload) => {
  try {
    const response = await axios.post(`${BASE_URL}/teacher_api/student-groups/create`, payload);
    return response.data;
  } catch (error) {
    console.error('Error creating student group:', error);
    throw error;
  }
};

/**
 * Update a student group name
 */
export const updateGroupName = async (payload: UpdateGroupNamePayload) => {
  try {
    const response = await axios.put(`${BASE_URL}/teacher_api/student-groups/name`, payload);
    return response.data;
  } catch (error) {
    console.error('Error updating group name:', error);
    throw error;
  }
};

/**
 * Change the group leader
 */
export const changeGroupLeader = async (payload: ChangeGroupLeaderPayload) => {
  try {
    const response = await axios.put(`${BASE_URL}/teacher_api/student-groups/leader`, payload);
    return response.data;
  } catch (error) {
    console.error('Error changing group leader:', error);
    throw error;
  }
};

/**
 * Fetch all student groups
 * Note: This endpoint is not provided in the documentation but would be needed
 * to get all student groups. You may need to adjust this based on the actual API.
 */
export const fetchStudentGroups = async (lectureId?: string) => {
  try {
    // If a lectureId is provided, fetch groups for that lecture only
    const url = lectureId 
      ? `${BASE_URL}/teacher_api/student-groups?lecture_id=${lectureId}`
      : `${BASE_URL}/teacher_api/student-groups`;
    
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching student groups:', error);
    throw error;
  }
};
