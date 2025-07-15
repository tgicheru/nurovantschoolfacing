import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Input, Form, Select, Upload, message, Drawer, Dropdown, Menu, Table, Tag, Spin, Alert, notification, Pagination, Modal } from 'antd';
import { SearchOutlined, PlusOutlined, FilterOutlined, MoreOutlined, CloseOutlined, UploadOutlined, EyeOutlined, LoadingOutlined } from '@ant-design/icons';
import { useRecoilValue } from 'recoil';
import authAtom from '../../../atoms/auth/auth.atom';
import { useAdminStudents } from '../../../hooks/admin/admin';
import { Student } from '../../../services/admin.service';

// SVG icons
const GridViewIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.33333 2.5H2.5V8.33333H8.33333V2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17.5 2.5H11.6667V8.33333H17.5V2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17.5 11.6667H11.6667V17.5H17.5V11.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.33333 11.6667H2.5V17.5H8.33333V11.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ListViewIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.66667 5H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.66667 10H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.66667 15H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2.5 5H2.50833" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2.5 10H2.50833" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2.5 15H2.50833" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Table columns for students
const getTableColumns = (handleViewStudent: (student: Student) => void) => [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (_: string, record: Student) => (
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-[#F2F4F7] flex items-center justify-center mr-2 text-[#4970FC] font-medium">
          {record.name?.[0] || 'S'}
        </div>
        <div>
          <div className="font-medium">{record.name}</div>
          <div className="text-xs text-[#667085]">{record.email}</div>
        </div>
      </div>
    ),
  },
  {
    title: 'Grade',
    dataIndex: 'grade',
    key: 'grade',
    render: (grade: string) => (
      <span className="text-sm">{grade || 'Not specified'}</span>
    ),
  },
  {
    title: 'Phone',
    dataIndex: 'phoneNo',
    key: 'phoneNo',
    render: (phone: string) => (
      <span className="text-sm">{phone || 'Not provided'}</span>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (_: string, record: Student) => {
      // For now, show all students as active since we don't have verification status
      const status = 'Active';
      return (
        <Tag color="green">
          {status}
        </Tag>
      );
    },
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (_: any, record: Student) => (
      <Dropdown 
        menu={{
          items: [
            {
              key: 'view',
              icon: <EyeOutlined />,
              label: 'View Details',
              onClick: () => handleViewStudent(record)
            }
          ]
        }}
        trigger={['click']}
      >
        <Button type="text" icon={<MoreOutlined />} />
      </Dropdown>
    ),
  },
];

const AdminStudents = () => {
  const navigate = useNavigate();
  const auth = useRecoilValue(authAtom);
  const [activeTab, setActiveTab] = useState('students');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isStudentDetailsModalVisible, setIsStudentDetailsModalVisible] = useState(false);
  
  // Fetch students data from API
  const { 
    students,
    total: totalStudents,
    isLoading,
    error,
    isAuthError,
    refetch
  } = useAdminStudents(currentPage, pageSize);
  
  // Log students data for debugging
  useEffect(() => {
    console.log('Students data:', students);
    console.log('Loading state:', isLoading);
    console.log('Error state:', error);
    console.log('Auth error state:', isAuthError);
  }, [students, isLoading, error, isAuthError]);
  
  // Log when component mounts to verify API call
  useEffect(() => {
    console.log('🔍 Admin Students page mounted - API call should be triggered');
    console.log('🔑 Auth token exists:', !!auth?.token);
    console.log('🔑 Auth token:', auth?.token);
    console.log('🌐 API URL:', process.env.REACT_APP_API_URL);
    console.log('📊 Current page:', currentPage, 'Page size:', pageSize);
    
    // Force refetch on mount to ensure API call happens
    refetch();
    
    // Manual test API call
    const testApiCall = async () => {
      try {
        console.log('🧪 Testing manual API call...');
        // Fix double slash issue
        const baseUrl = process.env.REACT_APP_API_URL || '';
        const apiUrl = baseUrl.endsWith('/') 
          ? `${baseUrl.slice(0, -1)}/teacher_api/students`
          : `${baseUrl}/teacher_api/students`;
        console.log('🧪 API URL:', apiUrl);
        
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${auth?.token}`,
            'Content-Type': 'application/json',
          },
        });
        console.log('🧪 Manual API call response status:', response.status);
        const data = await response.json();
        console.log('🧪 Manual API call response data:', data);
      } catch (error) {
        console.error('🧪 Manual API call failed:', error);
      }
    };
    
    if (auth?.token) {
      testApiCall();
    } else {
      console.error('❌ No auth token found!');
    }
  }, [refetch, auth?.token, currentPage, pageSize]);
  
  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    form.resetFields();
  };

  const handleAddStudent = (values: any) => {
    // In a real app, this would call an API to add the student
    console.log('New student:', values);
    message.success('Student added successfully!');
    closeDrawer();
  };
  
  // Redirect to login page if authentication error
  useEffect(() => {
    if (isAuthError) {
      message.error('Your session has expired. Please login again.');
      navigate('/auth/admin-login');
    }
  }, [isAuthError, navigate]);

  // Refetch data when pagination changes
  useEffect(() => {
    refetch();
  }, [currentPage, pageSize, refetch]);

  // Handle pagination change
  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) setPageSize(pageSize);
  };
  
  // Handle view student details
  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsStudentDetailsModalVisible(true);
    console.log('View student details:', student);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-[#EAECF0] px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/admin/dashboard" className="text-[#4970FC] font-semibold text-xl">
              NurovantAI
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button className="border border-[#D0D5DD] rounded-lg px-3 py-1 h-auto">
              Upgrade Plan
            </Button>
            <div className="w-10 h-10 rounded-full bg-[#F9A826] flex items-center justify-center text-white font-medium">
              P
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex space-x-8 border-b border-[#EAECF0]">
              <button 
                className={`py-2 px-1 ${activeTab === 'overview' ? 'text-[#4970FC] border-b-2 border-[#4970FC] font-medium' : 'text-[#667085]'}`}
                onClick={() => {
                  setActiveTab('overview');
                  navigate('/admin/dashboard');
                }}
              >
                Overview
              </button>
              <button 
                className={`py-2 px-1 ${activeTab === 'teachers' ? 'text-[#4970FC] border-b-2 border-[#4970FC] font-medium' : 'text-[#667085]'}`}
                onClick={() => {
                  setActiveTab('teachers');
                  navigate('/admin/teachers');
                }}
              >
                Teachers
              </button>
              <button 
                className={`py-2 px-1 ${activeTab === 'students' ? 'text-[#4970FC] border-b-2 border-[#4970FC] font-medium' : 'text-[#667085]'}`}
                onClick={() => {
                  setActiveTab('students');
                  navigate('/admin/students');
                }}
              >
                Students
              </button>
              {/* Curriculum tab commented out for now */}
              {/* <button 
                className={`py-2 px-1 ${activeTab === 'curriculum' ? 'text-[#4970FC] border-b-2 border-[#4970FC] font-medium' : 'text-[#667085]'}`}
                onClick={() => {
                  setActiveTab('curriculum');
                  navigate('/admin/curriculum');
                }}
              >
                Curriculum
              </button> */}
              <button 
                className={`py-2 px-1 ${activeTab === 'review' ? 'text-[#4970FC] border-b-2 border-[#4970FC] font-medium' : 'text-[#667085]'}`}
                onClick={() => {
                  setActiveTab('review');
                  navigate('/review-report');
                }}
              >
                Review & Report
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-[#101828]">Students 📚</h1>
            <p className="text-[#667085]">Organize and manage your course materials.</p>
          </div>

          <div className="mb-5 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="text-lg font-medium text-[#101828]">{totalStudents}</div>
              <div className="text-sm text-[#667085]">Student(s)</div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                icon={<FilterOutlined />} 
                className="border border-[#D0D5DD] rounded-lg px-3 py-1 flex items-center gap-1 h-auto"
              >
                Filter
              </Button>
              <div className="flex items-center">
                <Input 
                  prefix={<SearchOutlined className="text-gray-400" />}
                  placeholder="Search"
                  className="rounded-lg border border-[#D0D5DD] h-9 w-40"
                />
              </div>
              <div className="flex border border-[#D0D5DD] rounded-lg overflow-hidden">
                <button 
                  className={`p-2 ${viewMode === 'grid' ? 'bg-[#F9FAFB] text-[#101828]' : 'bg-white text-[#667085]'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <GridViewIcon />
                </button>
                <button 
                  className={`p-2 ${viewMode === 'list' ? 'bg-[#F9FAFB] text-[#101828]' : 'bg-white text-[#667085]'}`}
                  onClick={() => setViewMode('list')}
                >
                  <ListViewIcon />
                </button>
              </div>
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                className="bg-[#4970FC] hover:bg-[#3A5AD9] rounded-full h-9 flex items-center"
                onClick={showDrawer}
              >
                Add new student
              </Button>
            </div>
          </div>

          {/* Students Table */}
          {/* Show loading state */}
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
              <span className="ml-2">Loading students...</span>
            </div>
          )}
          
          {/* Show error state */}
          {error && !isAuthError && (
            <Alert
              message="Error Loading Students"
              description={
                <>
                  <p>Failed to load students data. {error.message}</p>
                  <Button type="primary" onClick={() => refetch()} className="mt-2">
                    Try Again
                  </Button>
                </>
              }
              type="error"
              showIcon
              className="mb-4"
            />
          )}
          
          <div className="bg-white rounded-lg border border-[#EAECF0] overflow-hidden mb-6">
            {!isLoading && !error && (
              <>
                {viewMode === 'list' ? (
                  <div className="overflow-x-auto">
                    <Table
                      dataSource={students.map(student => ({ ...student, key: student._id }))} 
                      columns={getTableColumns(handleViewStudent)}
                      pagination={false}
                      loading={isLoading}
                      rowKey="_id"
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    {students.map((student) => (
                      <div key={student._id} className="border border-[#EAECF0] rounded-lg p-4 hover:shadow-sm transition-shadow">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 rounded-full bg-[#F2F4F7] flex items-center justify-center mr-3 text-[#4970FC] font-medium">
                            {student.name?.[0] || 'S'}
                          </div>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-xs text-[#667085]">{student.email}</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          <div>
                            <div className="text-xs text-[#667085]">Grade</div>
                            <div className="text-sm">{student.grade || 'Not specified'}</div>
                          </div>
                          <div>
                            <div className="text-xs text-[#667085]">Phone</div>
                            <div className="text-sm">{student.phoneNo || 'Not provided'}</div>
                          </div>
                          <div>
                            <div className="text-xs text-[#667085]">Status</div>
                            <div className="text-sm">
                              <Tag color="green">
                                Active
                              </Tag>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button 
                            type="primary" 
                            size="small" 
                            onClick={() => handleViewStudent(student)}
                            className="bg-[#4970FC]"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
          
          {/* Pagination */}
          {!isLoading && !error && students.length > 0 && (
            <div className="flex justify-end p-4 border-t border-[#EAECF0]">
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={totalStudents}
                onChange={(page) => {
                  console.log('Changing to page:', page);
                  setCurrentPage(page);
                }}
                showSizeChanger={false}
              />
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-[#EAECF0] px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="text-sm text-[#667085]">
            © NurovantAI 2024. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-sm text-[#667085]">
            <Link to="#" className="hover:text-[#101828]">Contact</Link>
            <Link to="#" className="hover:text-[#101828]">Terms of service</Link>
            <Link to="#" className="hover:text-[#101828]">Privacy Policy</Link>
          </div>
        </div>
      </footer>

      {/* Student Details Modal */}
      <Modal
        title="Student Details"
        open={isStudentDetailsModalVisible}
        onCancel={() => setIsStudentDetailsModalVisible(false)}
        width={800}
        footer={[
          <Button key="close" onClick={() => setIsStudentDetailsModalVisible(false)}>
            Close
          </Button>
        ]}
      >
        {selectedStudent && (
          <div className="p-4">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 rounded-full bg-[#F2F4F7] flex items-center justify-center mr-4 text-[#4970FC] text-xl font-medium">
                {selectedStudent.name?.[0] || 'S'}
              </div>
              <div>
                <h2 className="text-xl font-semibold">{selectedStudent.name}</h2>
                <p className="text-[#667085]">{selectedStudent.email}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="border border-[#EAECF0] rounded-lg p-4">
                <h3 className="text-sm font-medium text-[#667085] mb-1">Grade</h3>
                <p className="font-medium">{selectedStudent.grade || 'Not specified'}</p>
              </div>
              <div className="border border-[#EAECF0] rounded-lg p-4">
                <h3 className="text-sm font-medium text-[#667085] mb-1">Phone</h3>
                <p className="font-medium">{selectedStudent.phoneNo || 'Not provided'}</p>
              </div>
              <div className="border border-[#EAECF0] rounded-lg p-4">
                <h3 className="text-sm font-medium text-[#667085] mb-1">Username</h3>
                <p className="font-medium">{selectedStudent.username || 'Not provided'}</p>
              </div>
              <div className="border border-[#EAECF0] rounded-lg p-4">
                <h3 className="text-sm font-medium text-[#667085] mb-1">Status</h3>
                <p className="font-medium">
                  <Tag color="green">
                    Active
                  </Tag>
                </p>
              </div>
            </div>
            
            <div className="border border-[#EAECF0] rounded-lg p-4 mb-6">
              <h3 className="text-sm font-medium text-[#667085] mb-1">Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div>
                  <p className="text-sm text-[#667085]">Student ID</p>
                  <p className="font-medium">{selectedStudent._id}</p>
                </div>
                <div>
                  <p className="text-sm text-[#667085]">Courses</p>
                  <p className="font-medium">{selectedStudent.courses?.length || 0} courses</p>
                </div>
                <div>
                  <p className="text-sm text-[#667085]">Created At</p>
                  <p className="font-medium">{selectedStudent.createdAt ? new Date(selectedStudent.createdAt).toLocaleString() : 'Not available'}</p>
                </div>
                <div>
                  <p className="text-sm text-[#667085]">Last Updated</p>
                  <p className="font-medium">{selectedStudent.updatedAt ? new Date(selectedStudent.updatedAt).toLocaleString() : 'Not available'}</p>
                </div>
              </div>
            </div>
            
            {/* Profile image section removed since it's not available in the API response */}
          </div>
        )}
      </Modal>

      {/* Add Student Drawer */}
      <Drawer
        title={
          <div className="flex items-center justify-between pr-5">
            <span className="text-lg font-semibold">Add New Student</span>
            <Button 
              type="text" 
              icon={<CloseOutlined />} 
              onClick={closeDrawer} 
              className="flex items-center justify-center"
            />
          </div>
        }
        placement="right"
        closable={false}
        onClose={closeDrawer}
        open={drawerVisible}
        width={400}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div className="flex justify-end">
            <Button onClick={closeDrawer} className="mr-2">
              Cancel
            </Button>
            <Button 
              type="primary" 
              onClick={() => form.submit()} 
              className="bg-[#4970FC]"
            >
              Add Student
            </Button>
          </div>
        }
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddStudent}
          initialValues={{ grade: '9th Grade' }}
        >
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: 'Please enter student name' }]}
          >
            <Input placeholder="Enter student's full name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: 'Please enter email address' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input placeholder="Enter email address" />
          </Form.Item>

          <Form.Item
            name="grade"
            label="Grade"
            rules={[{ required: true, message: 'Please select a grade' }]}
          >
            <Select>
              <Select.Option value="1st Grade">1st Grade</Select.Option>
              <Select.Option value="2nd Grade">2nd Grade</Select.Option>
              <Select.Option value="3rd Grade">3rd Grade</Select.Option>
              <Select.Option value="4th Grade">4th Grade</Select.Option>
              <Select.Option value="5th Grade">5th Grade</Select.Option>
              <Select.Option value="6th Grade">6th Grade</Select.Option>
              <Select.Option value="7th Grade">7th Grade</Select.Option>
              <Select.Option value="8th Grade">8th Grade</Select.Option>
              <Select.Option value="9th Grade">9th Grade</Select.Option>
              <Select.Option value="10th Grade">10th Grade</Select.Option>
              <Select.Option value="11th Grade">11th Grade</Select.Option>
              <Select.Option value="12th Grade">12th Grade</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="parentName"
            label="Parent/Guardian Name"
            rules={[{ required: true, message: 'Please enter parent name' }]}
          >
            <Input placeholder="Enter parent's name" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[{ required: true, message: 'Please enter phone number' }]}
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>

          <Form.Item
            name="profilePhoto"
            label="Profile Photo"
          >
            <Upload
              maxCount={1}
              listType="picture"
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Upload Photo</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default AdminStudents;
