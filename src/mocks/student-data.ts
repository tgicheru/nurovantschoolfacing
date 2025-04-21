import { Student, StudentGroup, StudentGroupMember } from '../services/student-groups.service';

/**
 * Mock student data for development and testing
 */
export const mockStudents: Student[] = [
  {
    _id: 'student-001',
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: 'student-002',
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: 'student-003',
    name: 'Charlie Davis',
    email: 'charlie.davis@example.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: 'student-004',
    name: 'Diana Miller',
    email: 'diana.miller@example.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: 'student-005',
    name: 'Edward Wilson',
    email: 'edward.wilson@example.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: 'student-006',
    name: 'Fiona Garcia',
    email: 'fiona.garcia@example.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: 'student-007',
    name: 'George Brown',
    email: 'george.brown@example.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: 'student-008',
    name: 'Hannah Lee',
    email: 'hannah.lee@example.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: 'student-009',
    name: 'Ian Taylor',
    email: 'ian.taylor@example.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: 'student-010',
    name: 'Julia Martinez',
    email: 'julia.martinez@example.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

/**
 * Mock student groups for development and testing
 */
export const mockStudentGroups: StudentGroup[] = [
  {
    _id: 'group-001',
    lecture_id: 'lecture-001',
    groupName: 'Team Alpha',
    students: [
      {
        _id: 'student-001',
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        isLeader: true
      },
      {
        _id: 'student-002',
        name: 'Bob Smith',
        email: 'bob.smith@example.com',
        isLeader: false
      },
      {
        _id: 'student-003',
        name: 'Charlie Davis',
        email: 'charlie.davis@example.com',
        isLeader: false
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: 'group-002',
    lecture_id: 'lecture-001',
    groupName: 'Team Beta',
    students: [
      {
        _id: 'student-004',
        name: 'Diana Miller',
        email: 'diana.miller@example.com',
        isLeader: true
      },
      {
        _id: 'student-005',
        name: 'Edward Wilson',
        email: 'edward.wilson@example.com',
        isLeader: false
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: 'group-003',
    lecture_id: 'lecture-002',
    groupName: 'Team Gamma',
    students: [
      {
        _id: 'student-006',
        name: 'Fiona Garcia',
        email: 'fiona.garcia@example.com',
        isLeader: true
      },
      {
        _id: 'student-007',
        name: 'George Brown',
        email: 'george.brown@example.com',
        isLeader: false
      },
      {
        _id: 'student-008',
        name: 'Hannah Lee',
        email: 'hannah.lee@example.com',
        isLeader: false
      },
      {
        _id: 'student-009',
        name: 'Ian Taylor',
        email: 'ian.taylor@example.com',
        isLeader: false
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

/**
 * Helper function to create a new mock student group
 */
export const createMockStudentGroup = (
  groupName: string,
  lectureId: string,
  students: StudentGroupMember[]
): StudentGroup => {
  return {
    _id: `group-${Date.now()}`,
    lecture_id: lectureId,
    groupName,
    students,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};
