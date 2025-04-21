import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Card, message, Modal, Form, Select, Spin, Checkbox, Space, Alert, Divider } from 'antd';
import { SearchOutlined, PlusOutlined, DragOutlined, EditOutlined, UserSwitchOutlined, UserOutlined, MailOutlined, LoginOutlined, KeyOutlined, BookOutlined } from '@ant-design/icons';
import { useGetAllStudents, useCreateStudentGroup, useGetStudentGroups, useGetAllCourses, useGetCourseDetails, useUpdateGroupName, useChangeGroupLeader } from '../../../hooks/student-groups/student-groups';
import { Student as ApiStudent, StudentGroupMember, Course, Lecture, CreateStudentGroupRequest } from '../../../services/student-groups.service';
import { useAuth } from '../../../utils/auth-helpers';
import { useRecoilState, useRecoilValue } from 'recoil';
import authAtom from '../../../atoms/auth/auth.atom';

// Define drag types
enum DragTypes {
  GROUP = 'group',
  STUDENT = 'student'
}

// Local interfaces for UI representation
interface Student {
  id: string;
  name: string;
  email: string;
  score: number;
  isLeader: boolean;
}

interface StudentGroup {
  id: string;
  name: string;
  groupNumber: number;
  lectureId: string;
  students: Student[];
}

// Function to convert API student group to local format
const mapApiToLocalGroup = (apiGroup: any, index: number): StudentGroup => {
  return {
    id: apiGroup._id || apiGroup.id,
    name: apiGroup.groupName || apiGroup.name,
    groupNumber: index + 1,
    lectureId: apiGroup.lecture_id || apiGroup.lectureId,
    students: apiGroup.students.map((student: any) => ({
      id: student._id || student.id || `temp-${Math.random().toString(36).substr(2, 9)}`,
      name: student.name,
      email: student.email,
      score: student.score || Math.floor(Math.random() * 30) + 70, // Random score between 70-100 if not provided
      isLeader: student.isLeader
    }))
  };
};

// Mock data for student groups
const mockStudentGroups: StudentGroup[] = [
  {
    id: '1',
    groupNumber: 1,
    name: 'Algebra',
    lectureId: 'lecture-1',
    students: [
      { id: '1', name: 'Martha Cooper', email: 'martha.cooper@example.com', score: 92, isLeader: true },
      { id: '2', name: 'Martha Davis', email: 'martha.davis@example.com', score: 87, isLeader: false },
      { id: '3', name: 'Kevin Matthews', email: 'kevin.matthews@example.com', score: 85, isLeader: false },
      { id: '4', name: 'Mark Henderson', email: 'mark.henderson@example.com', score: 93, isLeader: false },
      { id: '5', name: 'Jennifer Morris', email: 'jennifer.morris@example.com', score: 88, isLeader: false }
    ]
  },
  {
    id: '2',
    groupNumber: 2,
    name: 'Geometry group',
    lectureId: 'lecture-1',
    students: [
      { id: '6', name: 'Kevin Gonzalez', email: 'kevin.gonzalez@example.com', score: 91, isLeader: true },
      { id: '7', name: 'Dave Chandler', email: 'dave.chandler@example.com', score: 79, isLeader: false },
      { id: '8', name: 'Olivia McLaren', email: 'olivia.mclaren@example.com', score: 75, isLeader: false },
      { id: '9', name: 'Yolanda Martinez', email: 'yolanda.martinez@example.com', score: 89, isLeader: false },
      { id: '10', name: 'Peter Anderson', email: 'peter.anderson@example.com', score: 82, isLeader: false }
    ]
  },
  {
    id: '3',
    groupNumber: 3,
    name: 'Biology study group',
    lectureId: 'lecture-2',
    students: [
      { id: '11', name: 'Jennifer Emery', email: 'jennifer.emery@example.com', score: 90, isLeader: true },
      { id: '12', name: 'Eric Andrews', email: 'eric.andrews@example.com', score: 87, isLeader: false },
      { id: '13', name: 'Lisa Anderson', email: 'lisa.anderson@example.com', score: 90, isLeader: false },
      { id: '14', name: 'Sarah Evans', email: 'sarah.evans@example.com', score: 91, isLeader: false },
      { id: '15', name: 'Freddie Dalton', email: 'freddie.dalton@example.com', score: 85, isLeader: false }
    ]
  },
  {
    id: '4',
    groupNumber: 4,
    name: 'Chemistry and science',
    lectureId: 'lecture-2',
    students: [
      { id: '16', name: 'Olivia Lawson', email: 'olivia.lawson@example.com', score: 93, isLeader: true },
      { id: '17', name: 'Tyler Montgomery', email: 'tyler.montgomery@example.com', score: 87, isLeader: false },
      { id: '18', name: 'Anthony Lee', email: 'anthony.lee@example.com', score: 85, isLeader: false },
      { id: '19', name: 'Emma Schultz', email: 'emma.schultz@example.com', score: 90, isLeader: false },
      { id: '20', name: 'Monica Jones', email: 'monica.jones@example.com', score: 88, isLeader: false }
    ]
  },
  {
    id: '5',
    groupNumber: 5,
    name: 'Physics club',
    lectureId: 'lecture-3',
    students: [
      { id: '21', name: 'Andrew Ng Smith', email: 'andrew.smith@example.com', score: 94, isLeader: true },
      { id: '22', name: 'John Xu', email: 'john.xu@example.com', score: 87, isLeader: false },
      { id: '23', name: 'Lisa Martinez', email: 'lisa.martinez@example.com', score: 75, isLeader: false },
      { id: '24', name: 'Sarah Evans', email: 'sarah.evans2@example.com', score: 88, isLeader: false },
      { id: '25', name: 'Olivia Ng Lee', email: 'olivia.lee@example.com', score: 90, isLeader: false }
    ]
  },
  {
    id: '6',
    groupNumber: 6,
    name: 'Creative writing',
    lectureId: 'lecture-3',
    students: [
      { id: '26', name: 'Michael Russo', email: 'michael.russo@example.com', score: 89, isLeader: true },
      { id: '27', name: 'Sophia Patel', email: 'sophia.patel@example.com', score: 92, isLeader: false },
      { id: '28', name: 'Curtis Jameson', email: 'curtis.jameson@example.com', score: 78, isLeader: false },
      { id: '29', name: 'Emily Schultz', email: 'emily.schultz@example.com', score: 85, isLeader: false },
      { id: '30', name: 'Richard Alva', email: 'richard.alva@example.com', score: 79, isLeader: false }
    ]
  },
  {
    id: '7',
    groupNumber: 7,
    name: 'History Buffs',
    lectureId: 'lecture-4',
    students: [
      { id: '31', name: 'Eric Mears', email: 'eric.mears@example.com', score: 91, isLeader: true },
      { id: '32', name: 'Gregory Russo', email: 'gregory.russo@example.com', score: 90, isLeader: false },
      { id: '33', name: 'Karen Lott', email: 'karen.lott@example.com', score: 87, isLeader: false },
      { id: '34', name: 'David O\'Brien', email: 'david.obrien@example.com', score: 83, isLeader: false },
      { id: '35', name: 'Jane Irwin', email: 'jane.irwin@example.com', score: 90, isLeader: false }
    ]
  },
  {
    id: '8',
    groupNumber: 8,
    name: 'Tech Innovators',
    lectureId: 'lecture-4',
    students: [
      { id: '36', name: 'Jin Hayward', email: 'jin.hayward@example.com', score: 95, isLeader: true },
      { id: '37', name: 'Tyrell Patel', email: 'tyrell.patel@example.com', score: 92, isLeader: false },
      { id: '38', name: 'Cynthia Jenkins', email: 'cynthia.jenkins@example.com', score: 78, isLeader: false },
      { id: '39', name: 'Randall Wright', email: 'randall.wright@example.com', score: 84, isLeader: false },
      { id: '40', name: 'Richard Alva', email: 'richard.alva2@example.com', score: 79, isLeader: false }
    ]
  }
];

// Draggable Student Component
interface StudentItemProps {
  student: Student;
  index: number;
  groupIndex: number;
  onStudentDragStart: (e: React.DragEvent<HTMLDivElement>, studentId: string, groupIndex: number) => void;
  onChangeLeader?: (studentId: string, groupId: string) => void;
  groupId: string;
}

const StudentItem: React.FC<StudentItemProps> = ({ 
  student, 
  index, 
  groupIndex, 
  onStudentDragStart, 
  onChangeLeader,
  groupId
}) => {
  return (
    <div 
      className="flex items-center py-1 cursor-move hover:bg-gray-50 rounded transition-colors duration-200"
      draggable
      onDragStart={(e) => onStudentDragStart(e, student.id, groupIndex)}
    >
      <div className="w-5 text-xs text-gray-500">{index + 1}</div>
      <div className="flex-1 flex items-center">
        {student.isLeader && (
          <div className="w-5 h-5 bg-blue-500 rounded-sm flex items-center justify-center text-white text-xs mr-2">
            {student.name.charAt(0)}
          </div>
        )}
        <span className="text-sm">{student.name}</span>
      </div>
      <span className="text-xs text-gray-500">{student.score}%</span>
      {!student.isLeader && onChangeLeader && (
        <Button 
          type="text" 
          size="small" 
          icon={<UserSwitchOutlined className="text-gray-400" />} 
          className="ml-2 p-0"
          onClick={() => onChangeLeader(student.id, groupId)}
          title="Make group leader"
        />
      )}
      <DragOutlined className="ml-2 text-gray-300 text-xs" />
    </div>
  );
};

// Group card component
interface GroupCardProps {
  group: StudentGroup;
  index: number;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDragEnter: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onStudentDragStart: (e: React.DragEvent<HTMLDivElement>, studentId: string, groupIndex: number) => void;
  onStudentDragOver: (e: React.DragEvent<HTMLDivElement>, groupIndex: number) => void;
  onStudentDrop: (e: React.DragEvent<HTMLDivElement>, groupIndex: number) => void;
  onRenameGroup?: (groupId: string, newName: string) => void;
  onChangeLeader?: (studentId: string, groupId: string) => void;
}

const GroupCard: React.FC<GroupCardProps> = ({ 
  group, 
  index,
  onDragStart,
  onDragEnter,
  onDragEnd,
  onDragOver,
  onStudentDragStart,
  onStudentDragOver,
  onStudentDrop,
  onRenameGroup,
  onChangeLeader
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const studentsContainerRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [groupName, setGroupName] = useState(group.name);
  
  // Get the leader from the students array
  const leader = group.students.find(student => student.isLeader);

  const handleRenameGroup = () => {
    if (onRenameGroup && groupName.trim() !== '' && groupName !== group.name) {
      onRenameGroup(group.id, groupName);
    }
    setIsEditing(false);
  };

  return (
    <div 
      ref={ref} 
      className="mb-6"
    >
      <Card 
        className="border rounded-md shadow-sm hover:shadow-md transition-shadow duration-200"
        title={
          <div 
            className="flex justify-between items-center"
            draggable
            onDragStart={(e) => onDragStart(e, index)}
            onDragEnter={(e) => onDragEnter(e, index)}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
          >
            <div className="flex items-center cursor-move">
              {isEditing ? (
                <div className="flex items-center">
                  <Input
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    onPressEnter={handleRenameGroup}
                    onBlur={handleRenameGroup}
                    autoFocus
                    size="small"
                    className="mr-2"
                  />
                </div>
              ) : (
                <h3 className="text-base font-medium">Group {group.groupNumber} - {group.name}</h3>
              )}
            </div>
            <div className="flex items-center">
              {!isEditing && onRenameGroup && (
                <Button 
                  type="text" 
                  icon={<EditOutlined />} 
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                  }}
                  className="mr-1"
                  title="Rename group"
                />
              )}
              <DragOutlined className="text-gray-400 cursor-move" />
            </div>
          </div>
        }
      >
        <div className="mb-4">
          {leader && (
            <div className="border-b pb-2 mb-2">
              <p className="text-sm font-medium mb-1">Group Leader</p>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-blue-500 rounded-sm flex items-center justify-center text-white text-xs">
                  {leader.name.charAt(0)}
                </div>
                <span className="text-sm">{leader.name}</span>
                <span className="ml-auto text-xs text-blue-500">{leader.score}%</span>
              </div>
            </div>
          )}

          <div 
            ref={studentsContainerRef}
            className="student-list p-1 min-h-[100px] border border-dashed border-gray-200 rounded-md"
            onDragOver={(e) => onStudentDragOver(e, index)}
            onDrop={(e) => onStudentDrop(e, index)}
          >
            {group.students.map((student, studentIndex) => (
              <StudentItem
                key={student.id}
                student={student}
                index={studentIndex}
                groupIndex={index}
                onStudentDragStart={onStudentDragStart}
                onChangeLeader={onChangeLeader}
                groupId={group.id}
              />
            ))}
            {group.students.length === 0 && (
              <div className="text-center py-4 text-gray-400 text-sm">
                Drag students here
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

// Main Student Groups Page Component
const StudentGroupsPage: React.FC = () => {
  const navigate = useNavigate();
  const [draggedGroupIndex, setDraggedGroupIndex] = useState<number | null>(null);
  const [draggedStudentId, setDraggedStudentId] = useState<string | null>(null);
  const [draggedStudentGroupIndex, setDraggedStudentGroupIndex] = useState<number | null>(null);
  const [studentGroups, setStudentGroups] = useState<StudentGroup[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isAuthError, setIsAuthError] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [createGroupForm] = Form.useForm();
  const [auth, setAuth] = useRecoilState(authAtom);
  const { isAuthenticated, token } = useAuth();
  
  // React Query hooks
  const { data: students = [], isLoading: isLoadingStudents, refetch: refetchStudents } = useGetAllStudents();
  const createStudentGroup = useCreateStudentGroup();
  const updateGroupNameMutation = useUpdateGroupName();
  const changeGroupLeaderMutation = useChangeGroupLeader();
  const { groups, isLoading: isLoadingGroups, error: groupsError, isAuthError: groupsAuthError, refetch: refetchGroups } = useGetStudentGroups();
  const { courses = [], isLoading: isLoadingCourses, refetch: refetchCourses } = useGetAllCourses();
  const { course, lectures = [], isLoading: isLoadingCourseDetails } = useGetCourseDetails(selectedCourseId, !!selectedCourseId);

  // Handle modal visibility and fetch students and courses when opened
  const showCreateModal = () => {
    setIsCreateModalVisible(true);
    refetchStudents();
    refetchCourses();
    setSelectedCourseId('');
    createGroupForm.resetFields();
  };
  
  // Handle course selection change
  const handleCourseChange = (courseId: string) => {
    if (!courseId) {
      setSelectedCourseId('');
      createGroupForm.setFieldValue('lecture_id', undefined);
      return;
    }
    
    setSelectedCourseId(courseId);
    // Reset the lecture selection when course changes
    createGroupForm.setFieldValue('lecture_id', undefined);
    
    // Find the selected course for display purposes
    const selectedCourse = courses.find(course => course._id === courseId);
    
    // Log course selection for debugging
    console.log('Selected course:', selectedCourse?.course_title || selectedCourse?.title, '(ID:', courseId, ')');
    
    // Validate the course ID format
    if (!/^[0-9a-fA-F]{24}$/.test(courseId)) {
      console.warn('Course ID format may be invalid:', courseId);
    }
  };

  // Fetch student groups on component mount
  useEffect(() => {
    fetchGroups();
  }, [auth.token]); // Re-fetch when auth token changes

  // Function to fetch student groups
  const fetchGroups = async () => {
    try {
      setIsAuthError(false);
      
      // Check if user is authenticated
      if (!auth.token) {
        console.warn('User is not authenticated');
        setIsAuthError(true);
        setStudentGroups([]);
        return;
      }
      
      // Try to fetch from API
      const result = await refetchGroups();
      
      if (result.data) {
        // If we have API data, use it
        const mappedGroups = result.data.map((group, index) => mapApiToLocalGroup(group, index));
        setStudentGroups(mappedGroups);
        setIsAuthError(false); // Clear any auth errors if successful
      } else {
        // API returned empty data
        setStudentGroups([]);
      }
    } catch (error: any) {
      console.error('Error fetching groups:', error);
      
      // Check if it's an authentication error
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        console.warn('Authentication error:', error.response.data);
        setIsAuthError(true);
        
        // Check for specific error message
        const errorMessage = error.response.data?.message || '';
        if (errorMessage.includes('not authenticated')) {
          message.warning('Your session has expired. Please log in again.');
        } else {
          message.warning('Authentication required to view student groups.');
        }
        
        setStudentGroups([]);
      } else {
        message.error('Failed to fetch student groups');
        setStudentGroups([]);
      }
    }
  };

  interface CreateGroupFormValues {
    groupName: string;
    course_id: string; // This is only used for UI selection
    lecture_id: string; // This is what gets sent to the API
    students: Array<{
      name: string;
      email: string;
      isLeader: boolean;
    }>;
  }

  const handleCreateGroup = (values: CreateGroupFormValues) => {
    // Check if there's at least one student marked as leader
    const hasLeader = values.students?.some((student) => student.isLeader);
    
    if (!hasLeader) {
      message.error('Please designate at least one student as group leader');
      return;
    }
    
    // Validate lecture selection
    if (!values.lecture_id) {
      message.error('Please select a lecture for this group');
      return;
    }
    
    // Make sure we have students
    if (!values.students || values.students.length === 0) {
      message.error('Please add at least one student to the group');
      return;
    }
    
    // Validate the lecture_id format
    if (!/^[0-9a-fA-F]{24}$/.test(values.lecture_id)) {
      message.error('Invalid lecture ID format');
      return;
    }
    
    // Create the group
    const createGroupData: CreateStudentGroupRequest = {
      lecture_id: values.lecture_id.trim(), // Ensure no whitespace
      groupName: values.groupName.trim(),
      students: values.students.map((student) => ({
        name: student.name.trim(),
        email: student.email.trim(),
        isLeader: student.isLeader
      }))
    };
    
    // Log the data being sent to the API for debugging
    console.log('Creating group with data:', JSON.stringify(createGroupData, null, 2));
    
    createStudentGroup.mutate(createGroupData, {
      onSuccess: () => {
        message.success('Group created successfully');
        setIsCreateModalVisible(false);
        fetchGroups(); // Refresh groups after creation
      },
      onError: (error: any) => {
        console.error('Error creating group:', error);
        // Extract detailed error message
        let errorMessage = 'Unknown error';
        
        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        // Handle specific error cases
        if (errorMessage.includes('Invalid course id') || errorMessage.includes('Invalid lecture id')) {
          message.error('Invalid lecture selection. Please try selecting a different lecture.');
          // Log more details for debugging
          console.log('Selected lecture ID:', values.lecture_id);
          console.log('Available lectures:', lectures);
        } else {
          message.error(`Failed to create group: ${errorMessage}`);
        }
      }
    });
  };
  
  // Handle group drag and drop
  const handleGroupDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedGroupIndex(index);
    e.dataTransfer.setData('type', DragTypes.GROUP);
    e.dataTransfer.effectAllowed = 'move';
  };
  
  const handleGroupDragEnter = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    if (draggedGroupIndex !== null && draggedGroupIndex !== index) {
      // Reorder groups
      const newGroups = [...studentGroups];
      const draggedGroup = newGroups[draggedGroupIndex];
      newGroups.splice(draggedGroupIndex, 1);
      newGroups.splice(index, 0, draggedGroup);
      
      // Update group numbers
      newGroups.forEach((group, idx) => {
        group.groupNumber = idx + 1;
      });
      
      setStudentGroups(newGroups);
      setDraggedGroupIndex(index);
    }
  };
  
  const handleGroupDragEnd = () => {
    setDraggedGroupIndex(null);
  };
  
  const handleGroupDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };
  
  // Handle student drag and drop
  const handleStudentDragStart = (e: React.DragEvent<HTMLDivElement>, studentId: string, groupIndex: number) => {
    setDraggedStudentId(studentId);
    setDraggedStudentGroupIndex(groupIndex);
    e.dataTransfer.setData('type', DragTypes.STUDENT);
    e.dataTransfer.effectAllowed = 'move';
  };
  
  const handleStudentDragOver = (e: React.DragEvent<HTMLDivElement>, groupIndex: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };
  
  const handleStudentDrop = (e: React.DragEvent<HTMLDivElement>, groupIndex: number) => {
    e.preventDefault();
    
    const dragType = e.dataTransfer.getData('type');
    
    if (dragType === DragTypes.STUDENT && draggedStudentId && draggedStudentGroupIndex !== null) {
      // Move student between groups
      const newGroups = [...studentGroups];
      
      // Find the student in the source group
      const sourceGroup = newGroups[draggedStudentGroupIndex];
      const studentIndex = sourceGroup.students.findIndex(s => s.id === draggedStudentId);
      
      if (studentIndex === -1) return;
      
      const student = sourceGroup.students[studentIndex];
      
      // Remove from source group
      sourceGroup.students.splice(studentIndex, 1);
      
      // Add to target group
      newGroups[groupIndex].students.push(student);
      
      setStudentGroups(newGroups);
      setDraggedStudentId(null);
      setDraggedStudentGroupIndex(null);
    }
  };
  
  // Handle group renaming
  const handleRenameGroup = (groupId: string, newName: string) => {
    if (!newName.trim()) {
      message.error('Group name cannot be empty');
      return;
    }
    
    // Optimistically update the UI
    const newGroups = [...studentGroups];
    const groupIndex = newGroups.findIndex(g => g.id === groupId);
    
    if (groupIndex !== -1) {
      // Store the old name in case we need to revert
      const oldName = newGroups[groupIndex].name;
      
      // Update local state immediately for better UX
      newGroups[groupIndex].name = newName;
      setStudentGroups(newGroups);
      
      // Call the API to update the group name
      updateGroupNameMutation.mutate(
        { groupId, groupName: newName },
        {
          onSuccess: () => {
            message.success('Group renamed successfully');
            // Refresh the groups list to get the updated data
            fetchGroups();
          },
          onError: (error: any) => {
            // Revert the local change if the API call fails
            const revertGroups = [...studentGroups];
            const revertIndex = revertGroups.findIndex(g => g.id === groupId);
            if (revertIndex !== -1) {
              revertGroups[revertIndex].name = oldName;
              setStudentGroups(revertGroups);
            }
            
            message.error(`Failed to rename group: ${error.message || 'Unknown error'}`);
            console.error('Error renaming group:', error);
          }
        }
      );
    }
  };
  
  // Handle changing group leader
  const handleChangeLeader = (studentId: string, groupId: string) => {
    // Optimistically update the UI
    const newGroups = [...studentGroups];
    const groupIndex = newGroups.findIndex(g => g.id === groupId);
    
    if (groupIndex !== -1) {
      const group = newGroups[groupIndex];
      
      // Find the current leader for potential revert
      const oldLeaderId = group.students.find(s => s.isLeader)?.id;
      
      // Reset all students to non-leader
      group.students.forEach(student => {
        student.isLeader = false;
      });
      
      // Set the new leader
      const studentIndex = group.students.findIndex(s => s.id === studentId);
      if (studentIndex !== -1) {
        group.students[studentIndex].isLeader = true;
      }
      
      // Update local state immediately for better UX
      setStudentGroups(newGroups);
      
      // Call the API to update the group leader
      changeGroupLeaderMutation.mutate(
        { groupId, newLeaderId: studentId },
        {
          onSuccess: () => {
            message.success('Group leader changed successfully');
            // Refresh the groups list to get the updated data
            fetchGroups();
          },
          onError: (error: any) => {
            // Revert the local change if the API call fails
            if (oldLeaderId) {
              const revertGroups = [...studentGroups];
              const revertGroupIndex = revertGroups.findIndex(g => g.id === groupId);
              
              if (revertGroupIndex !== -1) {
                const revertGroup = revertGroups[revertGroupIndex];
                
                // Reset all students to non-leader
                revertGroup.students.forEach(student => {
                  student.isLeader = false;
                });
                
                // Restore the old leader
                const oldLeaderIndex = revertGroup.students.findIndex(s => s.id === oldLeaderId);
                if (oldLeaderIndex !== -1) {
                  revertGroup.students[oldLeaderIndex].isLeader = true;
                }
                
                setStudentGroups(revertGroups);
              }
            }
            
            message.error(`Failed to change group leader: ${error.message || 'Unknown error'}`);
            console.error('Error changing group leader:', error);
          }
        }
      );
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Student Groups</h1>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={showCreateModal}
        >
          Create Group
        </Button>
      </div>
      
      {/* Authentication error alert */}
      {isAuthError && (
        <Alert
          message="Authentication Required"
          description="You need to be logged in to view and manage student groups."
          type="warning"
          showIcon
          className="mb-4"
          action={
            <Button size="small" type="primary" onClick={() => navigate('/login')}>
              Log In
            </Button>
          }
        />
      )}
      
      {/* Search and filter */}
      <div className="mb-6">
        <Input
          placeholder="Search groups or students..."
          prefix={<SearchOutlined className="text-gray-400" />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>
      
      {/* Loading state */}
      {isLoadingGroups && (
        <div className="flex justify-center items-center py-12">
          <Spin size="large" />
          <span className="ml-2">Loading student groups...</span>
        </div>
      )}
      
      {/* Empty state */}
      {!isLoadingGroups && studentGroups.length === 0 && (
        <div className="text-center py-12 border border-dashed rounded-lg">
          <BookOutlined style={{ fontSize: '32px' }} className="text-gray-300 mb-3" />
          <h3 className="text-lg font-medium mb-2">No Student Groups Yet</h3>
          <p className="text-gray-500 mb-4">Create your first student group to get started</p>
          <Button type="primary" icon={<PlusOutlined />} onClick={showCreateModal}>
            Create Group
          </Button>
        </div>
      )}
      
      {/* Group cards */}
      {!isLoadingGroups && studentGroups.length > 0 && (
        <div>
          {studentGroups
            .filter(group => 
              group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              group.students.some(student => 
                student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                student.email.toLowerCase().includes(searchQuery.toLowerCase())
              )
            )
            .map((group, index) => (
              <GroupCard
                key={group.id}
                group={group}
                index={index}
                onDragStart={handleGroupDragStart}
                onDragEnter={handleGroupDragEnter}
                onDragEnd={handleGroupDragEnd}
                onDragOver={handleGroupDragOver}
                onStudentDragStart={handleStudentDragStart}
                onStudentDragOver={handleStudentDragOver}
                onStudentDrop={handleStudentDrop}
                onRenameGroup={handleRenameGroup}
                onChangeLeader={handleChangeLeader}
              />
            ))
          }
        </div>
      )}

      {/* Create Group Modal */}
      <Modal
        title="Create New Student Group"
        open={isCreateModalVisible}
        onCancel={() => setIsCreateModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsCreateModalVisible(false)}>
            Cancel
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            onClick={() => createGroupForm.submit()}
            loading={createStudentGroup.isLoading}
          >
            Create Group
          </Button>
        ]}
        width={600}
      >
        <Form
          form={createGroupForm}
          layout="vertical"
          onFinish={handleCreateGroup}
          initialValues={{ students: [] }}
          onFinishFailed={(errorInfo) => {
            console.log('Form validation failed:', errorInfo);
            message.error('Please fill in all required fields');
          }}
        >
          <Form.Item
            name="groupName"
            label="Group Name"
            rules={[{ required: true, message: 'Please enter group name' }]}
          >
            <Input placeholder="Enter group name" />
          </Form.Item>
          
          <Form.Item
            name="course_id"
            label="Course"
            rules={[{ required: true, message: 'Please select a course' }]}
          >
            <Select 
              placeholder="Select course" 
              onChange={handleCourseChange}
              loading={isLoadingCourses}
              disabled={isLoadingCourses}
              optionLabelProp="label"
            >
              {courses.map(course => (
                <Select.Option 
                  key={course._id} 
                  value={course._id} 
                  label={course.course_title || course.title || ''}
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{course.course_title || course.title || 'Unnamed Course'}</span>
                    {course.description && (
                      <span className="text-xs text-gray-500 truncate">{course.description}</span>
                    )}
                  </div>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            name="lecture_id"
            label="Lecture"
            rules={[{ required: true, message: 'Please select a lecture' }]}
            extra="This is required for creating a student group"
          >
            <Select 
              placeholder={selectedCourseId ? "Select lecture" : "Select a course first"}
              loading={isLoadingCourseDetails}
              disabled={!selectedCourseId || isLoadingCourseDetails}
              notFoundContent={isLoadingCourseDetails ? <Spin size="small" /> : (selectedCourseId ? 'No lectures found' : 'Please select a course first')}
              optionLabelProp="label"
            >
              {lectures && lectures.length > 0 ? lectures.map(lecture => (
                <Select.Option 
                  key={lecture._id} 
                  value={lecture._id}
                  label={`${lecture.title}${lecture.date ? ` (${lecture.date})` : ''}`}
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{lecture.title}</span>
                    {lecture.date && (
                      <span className="text-xs text-gray-500">
                        Date: {lecture.date}
                        {lecture.startTime && lecture.endTime && ` • ${lecture.startTime} - ${lecture.endTime}`}
                      </span>
                    )}
                  </div>
                </Select.Option>
              )) : null}
              {selectedCourseId && (!lectures || lectures.length === 0) && !isLoadingCourseDetails && (
                <Select.Option disabled value="no-lectures">
                  No lectures available for this course
                </Select.Option>
              )}
            </Select>
          </Form.Item>
          
          <Form.Item
            label="Add Students from Existing List"
          >
            <Select
              placeholder="Select students to add"
              mode="multiple"
              loading={isLoadingStudents}
              onChange={(values: string[]) => {
                // Get current students in form
                const currentStudents: Array<{
                  name: string;
                  email: string;
                  isLeader: boolean;
                }> = createGroupForm.getFieldValue('students') || [];
                
                // For each selected student ID
                values.forEach((studentId) => {
                  // Check if student is already in the list
                  const isStudentAlreadyAdded = currentStudents.some(
                    (s) => s.email === students.find(st => st._id === studentId)?.email
                  );
                  
                  if (!isStudentAlreadyAdded) {
                    const student = students.find(s => s._id === studentId);
                    if (student) {
                      // Add student to the list
                      currentStudents.push({
                        name: student.name,
                        email: student.email,
                        isLeader: currentStudents.length === 0 // First student is leader by default
                      });
                    }
                  }
                });
                
                createGroupForm.setFieldValue('students', [...currentStudents]);
              }}
              filterOption={(input, option) => 
                option?.label?.toString().toLowerCase().includes(input.toLowerCase()) || false
              }
              options={students.map(student => ({
                value: student._id,
                label: `${student.name} (${student.email})`
              }))}
            />
          </Form.Item>
          
          <Form.List name="students">
            {(fields, { add, remove }) => (
              <>
                <div className="mb-2 flex justify-between items-center">
                  <label className="font-medium">Students in Group</label>
                  <Button 
                    type="dashed" 
                    onClick={() => add({ name: '', email: '', isLeader: false })}
                    icon={<PlusOutlined />}
                  >
                    Add Manually
                  </Button>
                </div>
                
                {fields.length === 0 && (
                  <div className="text-center py-4 text-gray-500 border border-dashed rounded-md">
                    No students added yet. Select from the dropdown above or add manually.
                  </div>
                )}
                
                {fields.map((field, index) => (
                  <div key={field.key} className="border p-3 rounded-md mb-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Student {index + 1}</span>
                      <Button 
                        danger 
                        type="text" 
                        onClick={() => remove(field.name)}
                      >
                        Remove
                      </Button>
                    </div>
                    <Form.Item
                      {...field}
                      name={[field.name, 'name']}
                      key={[field.key, 'name'].join('.')}
                      rules={[{ required: true, message: 'Please enter student name' }]}
                      label="Name"
                    >
                      <Input 
                        placeholder="Student name" 
                        prefix={<UserOutlined />}
                      />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'email']}
                      key={[field.key, 'email'].join('.')}
                      rules={[{ required: true, message: 'Please enter student email', type: 'email' }]}
                      label="Email"
                    >
                      <Input 
                        placeholder="Student email" 
                        prefix={<MailOutlined />}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Group Leader"
                    >
                      <div className="flex items-center">
                        <Checkbox
                          className="mr-2"
                          checked={createGroupForm.getFieldValue(['students', field.name, 'isLeader']) || false}
                          onChange={(e) => {
                            // If checking this box, uncheck all others
                            if (e.target.checked) {
                              fields.forEach((otherField, otherIndex) => {
                                if (otherIndex !== index) {
                                  createGroupForm.setFieldValue(['students', otherField.name, 'isLeader'], false);
                                }
                              });
                            }
                            createGroupForm.setFieldValue(['students', field.name, 'isLeader'], e.target.checked);
                          }}
                        />
                        <span>Make group leader</span>
                      </div>
                    </Form.Item>
                  </div>
                ))}
              </>
            )}
          </Form.List>
        </Form>
      </Modal>

      {/* Footer */}
      <div className="text-xs text-[#667085] mt-8 text-center">
        © NurovantAI 2024. All rights reserved.
      </div>
    </div>
  );
};

export default StudentGroupsPage;
