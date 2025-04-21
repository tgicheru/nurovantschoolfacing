import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button, Checkbox, Spin, message, Space } from 'antd';
import { useGetAllStudents, useCreateStudentGroup } from '../../hooks/student-groups/student-groups';
import { Student, StudentGroupMember } from '../../services/student-groups.service';
import { PlusOutlined, CloseOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';

interface CreateStudentGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  lectureId: string;
  onSuccess?: () => void;
}

const CreateStudentGroupModal: React.FC<CreateStudentGroupModalProps> = ({
  isOpen,
  onClose,
  lectureId,
  onSuccess
}) => {
  const [form] = Form.useForm();
  const [selectedStudents, setSelectedStudents] = useState<StudentGroupMember[]>([]);
  const [groupLeader, setGroupLeader] = useState<string | null>(null);
  const [currentStudent, setCurrentStudent] = useState<{
    name: string;
    email: string;
    isLeader: boolean;
  }>({ name: '', email: '', isLeader: false });

  // Fetch students from API
  const { 
    data: students = [], 
    isLoading: isLoadingStudents,
    error: studentsError
  } = useGetAllStudents();

  // Create student group mutation
  const { 
    mutate: createGroup, 
    isLoading: isCreating,
    error: createError
  } = useCreateStudentGroup();

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      form.resetFields();
      setSelectedStudents([]);
      setGroupLeader(null);
    }
  }, [isOpen, form]);

  // Show error message if API call fails
  useEffect(() => {
    if (studentsError) {
      message.error('Failed to load students. Please try again.');
    }
    if (createError) {
      message.error('Failed to create student group. Please try again.');
    }
  }, [studentsError, createError]);

  // Handle student selection from dropdown
  const handleStudentSelect = (studentId: string) => {
    const student = students.find(s => s._id === studentId);
    if (student) {
      // Populate the name and email fields
      setCurrentStudent({
        name: student.name,
        email: student.email,
        isLeader: false
      });
      form.setFieldsValue({
        studentName: student.name,
        studentEmail: student.email
      });
    }
  };

  // Remove student from selection
  const handleRemoveStudent = (studentId: string) => {
    setSelectedStudents(selectedStudents.filter(s => s._id !== studentId));
    if (groupLeader === studentId) {
      setGroupLeader(null);
    }
  };
  
  // Add current student to the group
  const handleAddStudent = () => {
    const { studentName, studentEmail, isLeader } = form.getFieldsValue(['studentName', 'studentEmail', 'isLeader']);
    
    if (!studentName || !studentEmail) {
      message.error('Please enter both name and email for the student');
      return;
    }
    
    // Check if student with same email already exists in the group
    if (selectedStudents.some(s => s.email === studentEmail)) {
      message.error('A student with this email already exists in the group');
      return;
    }
    
    const newStudent: StudentGroupMember = {
      name: studentName,
      email: studentEmail,
      isLeader: !!isLeader
    };
    
    // If this student is marked as leader, update the group leader
    if (isLeader) {
      // Unset previous leader if exists
      const updatedStudents = selectedStudents.map(s => 
        s.isLeader ? { ...s, isLeader: false } : s
      );
      
      setSelectedStudents([...updatedStudents, newStudent]);
      setGroupLeader(newStudent.email); // Use email as identifier since we don't have _id yet
    } else {
      setSelectedStudents([...selectedStudents, newStudent]);
    }
    
    // Reset the form fields
    form.setFieldsValue({
      studentSelect: undefined,
      studentName: '',
      studentEmail: '',
      isLeader: false
    });
    
    setCurrentStudent({ name: '', email: '', isLeader: false });
  };

  // Set group leader
  const handleSetLeader = (studentIdentifier: string, isLeader: boolean) => {
    if (isLeader) {
      // Unset previous leader if exists
      if (groupLeader && groupLeader !== studentIdentifier) {
        setSelectedStudents(
          selectedStudents.map(s => {
            const identifier = s._id || s.email;
            return identifier === groupLeader 
              ? { ...s, isLeader: false } 
              : s;
          })
        );
      }
      setGroupLeader(studentIdentifier);
    } else if (groupLeader === studentIdentifier) {
      setGroupLeader(null);
    }

    // Update the selected student's isLeader status
    setSelectedStudents(
      selectedStudents.map(s => {
        const identifier = s._id || s.email;
        return identifier === studentIdentifier 
          ? { ...s, isLeader } 
          : s;
      })
    );
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      // Ensure at least one student is selected
      if (selectedStudents.length === 0) {
        message.error('Please select at least one student for the group');
        return;
      }

      // Ensure a group leader is selected
      if (!groupLeader) {
        message.error('Please designate a group leader');
        return;
      }

      // Create the student group
      createGroup({
        lecture_id: lectureId,
        groupName: values.groupName,
        students: selectedStudents
      }, {
        onSuccess: () => {
          message.success('Student group created successfully');
          onClose();
          if (onSuccess) onSuccess();
        }
      });
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  // Filter out already selected students from dropdown options
  const availableStudents = students.filter(
    student => !selectedStudents.some(s => s._id === student._id)
  );

  return (
    <Modal
      title="Create Student Group"
      open={isOpen}
      onCancel={onClose}
      width={600}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button 
          key="submit" 
          type="primary" 
          loading={isCreating}
          onClick={handleSubmit}
        >
          Create Group
        </Button>
      ]}
    >
      <Spin spinning={isLoadingStudents}>
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="groupName"
            label="Group Name"
            rules={[{ required: true, message: 'Please enter a group name' }]}
          >
            <Input placeholder="Enter group name" />
          </Form.Item>

          <Form.Item label="Student Information">
            <Space direction="vertical" style={{ width: '100%' }} size="middle">
              <Form.Item name="studentSelect" noStyle>
                <Select
                  placeholder="Select a student from the list"
                  style={{ width: '100%' }}
                  onSelect={handleStudentSelect}
                  disabled={isLoadingStudents}
                  loading={isLoadingStudents}
                  showSearch
                  allowClear
                  filterOption={(input, option) =>
                    (option?.label as string).toLowerCase().includes(input.toLowerCase())
                  }
                  options={students.map(student => ({
                    value: student._id,
                    label: `${student.name} (${student.email})`
                  }))}
                />
              </Form.Item>
              
              <Space direction="vertical" style={{ width: '100%' }} size="small">
                <Form.Item 
                  name="studentName" 
                  rules={[{ required: true, message: 'Please enter student name' }]}
                >
                  <Input 
                    placeholder="Student Name" 
                    prefix={<UserOutlined />} 
                    value={currentStudent.name}
                    onChange={(e) => setCurrentStudent({...currentStudent, name: e.target.value})}
                  />
                </Form.Item>
                
                <Form.Item 
                  name="studentEmail" 
                  rules={[{ required: true, message: 'Please enter student email' }, { type: 'email', message: 'Please enter a valid email' }]}
                >
                  <Input 
                    placeholder="Student Email" 
                    prefix={<MailOutlined />} 
                    value={currentStudent.email}
                    onChange={(e) => setCurrentStudent({...currentStudent, email: e.target.value})}
                  />
                </Form.Item>
                
                <Form.Item name="isLeader" valuePropName="checked">
                  <Checkbox
                    onChange={(e) => setCurrentStudent({...currentStudent, isLeader: e.target.checked})}
                  >
                    Designate as Group Leader
                  </Checkbox>
                </Form.Item>
                
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />} 
                  onClick={handleAddStudent}
                  style={{ width: '100%' }}
                >
                  Add to Group
                </Button>
              </Space>
            </Space>
          </Form.Item>

          {selectedStudents.length > 0 && (
            <div className="border rounded-md p-4 mb-4">
              <h4 className="mb-2 font-medium">Selected Students</h4>
              {selectedStudents.map((student, index) => {
                const studentIdentifier = student._id || student.email;
                return (
                  <div 
                    key={studentIdentifier || index} 
                    className="flex items-center justify-between py-2 border-b last:border-b-0"
                  >
                    <div className="flex items-center">
                      <Checkbox
                        checked={student.isLeader}
                        onChange={(e) => handleSetLeader(studentIdentifier, e.target.checked)}
                      />
                      <span className="ml-2">{student.name}</span>
                      <span className="ml-2 text-gray-500 text-xs">{student.email}</span>
                      {student.isLeader && (
                        <span className="ml-2 text-blue-600 text-xs font-medium">
                          (Group Leader)
                        </span>
                      )}
                    </div>
                    <Button
                      type="text"
                      icon={<CloseOutlined />}
                      onClick={() => handleRemoveStudent(studentIdentifier)}
                      className="text-gray-500 hover:text-red-500"
                    />
                  </div>
                );
              })}
            </div>
          )}
        </Form>
      </Spin>
    </Modal>
  );
};

export default CreateStudentGroupModal;
