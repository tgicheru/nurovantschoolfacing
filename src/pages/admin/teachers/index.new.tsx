import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Input, Form, Select, Upload, message, Drawer, Dropdown, Menu, Table, Tag, Spin, Alert, notification, Pagination } from 'antd';
import { SearchOutlined, PlusOutlined, FilterOutlined, MoreOutlined, CloseOutlined, UploadOutlined, EyeOutlined, LoadingOutlined } from '@ant-design/icons';
import { useRecoilValue } from 'recoil';
import authAtom from '../../../atoms/auth/auth.atom';
import { useAdminTeachers } from '../../../hooks/admin/admin';
import { Teacher } from '../../../services/admin.service';

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

// Table columns for teachers
const getTableColumns = (handleViewTeacher: (teacher: Teacher) => void) => [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (_: string, record: Teacher) => (
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-[#F2F4F7] flex items-center justify-center mr-2 text-[#4970FC] font-medium">
          {record.first_name?.[0]}{record.last_name?.[0]}
        </div>
        <div>
          <div className="font-medium">{`${record.first_name} ${record.last_name}`}</div>
          <div className="text-xs text-[#667085]">{record.email}</div>
        </div>
      </div>
    ),
  },
  {
    title: 'Subject',
    dataIndex: 'subject',
    key: 'subject',
    render: (subject: string) => (
      <span className="text-sm">{subject}</span>
    ),
  },
  {
    title: 'Grade Level',
    dataIndex: 'grade_level',
    key: 'grade_level',
    render: (grade: string) => (
      <span className="text-sm">{grade}</span>
    ),
  },
  {
    title: 'State',
    dataIndex: 'state',
    key: 'state',
    render: (state: string) => (
      <span className="text-sm">{state}</span>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: string = 'Active') => {
      const color = status === 'Active' ? 'green' : status === 'Inactive' ? 'volcano' : 'geekblue';
      return (
        <Tag color={color}>
          {status || 'Active'}
        </Tag>
      );
    },
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (_: any, record: Teacher) => (
      <Dropdown 
        overlay={
          <Menu>
            <Menu.Item key="view" onClick={() => handleViewTeacher(record)}>
              <EyeOutlined /> View Details
            </Menu.Item>
          </Menu>
        } 
        trigger={['click']}
      >
        <Button type="text" icon={<MoreOutlined />} />
      </Dropdown>
    ),
  },
];

const AdminTeachers = () => {
  const navigate = useNavigate();
  const auth = useRecoilValue(authAtom);
  const [activeTab, setActiveTab] = useState('teachers');
  const [viewMode, setViewMode] = useState('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [form] = Form.useForm();
  
  // Fetch teachers data from API
  const { 
    teachers, 
    total, 
    isLoading, 
    error, 
    isAuthError, 
    refetch 
  } = useAdminTeachers(currentPage, pageSize);
  
  // Handle authentication errors
  useEffect(() => {
    if (isAuthError) {
      notification.error({
        message: 'Authentication Error',
        description: 'Your session has expired. Please log in again.',
        duration: 5
      });
      
      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate('/auth/admin-login');
      }, 2000);
    }
  }, [isAuthError, navigate]);
  
  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    form.resetFields();
  };

  const handleAddTeacher = (values: any) => {
    // In a real app, this would call an API to add the teacher
    console.log('New teacher:', values);
    message.success('Teacher added successfully!');
    closeDrawer();
    // Refresh the teachers list
    refetch();
  };
  
  // Handle pagination change
  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) setPageSize(pageSize);
  };
  
  // Handle view teacher details
  const handleViewTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    // In a real app, you might navigate to a detail page
    console.log('View teacher details:', teacher);
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
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#F9A826] flex items-center justify-center text-white font-medium">
                P
              </div>
              <span className="text-sm font-medium">Peter</span>
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
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-semibold text-[#101828]">Teachers</h1>
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                className="bg-[#4970FC] h-auto py-2 px-4"
                onClick={showDrawer}
              >
                Add Teacher
              </Button>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <div className="w-full md:w-auto">
                <Input 
                  placeholder="Search teachers" 
                  prefix={<SearchOutlined className="text-[#667085]" />} 
                  className="w-full md:w-[300px]"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button icon={<FilterOutlined />} className="border-[#D0D5DD]">
                  Filter
                </Button>
                <div className="flex border border-[#D0D5DD] rounded-lg">
                  <Button 
                    type={viewMode === 'grid' ? 'primary' : 'default'} 
                    icon={<GridViewIcon />} 
                    className={`border-0 ${viewMode === 'grid' ? 'bg-[#4970FC] text-white' : 'text-[#667085]'}`}
                    onClick={() => setViewMode('grid')}
                  />
                  <Button 
                    type={viewMode === 'list' ? 'primary' : 'default'} 
                    icon={<ListViewIcon />} 
                    className={`border-0 ${viewMode === 'list' ? 'bg-[#4970FC] text-white' : 'text-[#667085]'}`}
                    onClick={() => setViewMode('list')}
                  />
                </div>
              </div>
            </div>
            
            {/* Show loading state */}
            {isLoading && (
              <div className="flex justify-center items-center py-8">
                <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                <span className="ml-2">Loading teachers...</span>
              </div>
            )}
            
            {/* Show error state */}
            {error && !isAuthError && (
              <Alert
                message="Error Loading Teachers"
                description={
                  <>
                    <p>Failed to load teachers data. {error.message}</p>
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
          </div>

          {/* Teachers Table */}
          <div className="bg-white rounded-lg border border-[#EAECF0] overflow-hidden mb-6">
            {!isLoading && !error && (
              <>
                {viewMode === 'list' ? (
                  <div className="overflow-x-auto">
                    <Table
                      dataSource={teachers.map(teacher => ({ ...teacher, key: teacher._id }))} 
                      columns={getTableColumns(handleViewTeacher)}
                      pagination={false}
                      loading={isLoading}
                      rowKey="_id"
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    {teachers.map((teacher) => (
                      <div key={teacher._id} className="border border-[#EAECF0] rounded-lg p-4 hover:shadow-sm transition-shadow">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 rounded-full bg-[#F2F4F7] flex items-center justify-center mr-3 text-[#4970FC] font-medium">
                            {teacher.first_name?.[0]}{teacher.last_name?.[0]}
                          </div>
                          <div>
                            <div className="font-medium">{`${teacher.first_name} ${teacher.last_name}`}</div>
                            <div className="text-xs text-[#667085]">{teacher.email}</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          <div>
                            <div className="text-xs text-[#667085]">Subject</div>
                            <div className="text-sm">{teacher.subject}</div>
                          </div>
                          <div>
                            <div className="text-xs text-[#667085]">Grade Level</div>
                            <div className="text-sm">{teacher.grade_level}</div>
                          </div>
                          <div>
                            <div className="text-xs text-[#667085]">State</div>
                            <div className="text-sm">{teacher.state}</div>
                          </div>
                          <div>
                            <div className="text-xs text-[#667085]">Status</div>
                            <div className="text-sm">
                              <Tag color="green">Active</Tag>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button 
                            type="text" 
                            icon={<EyeOutlined />} 
                            onClick={() => handleViewTeacher(teacher)}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="px-6 py-4 border-t border-[#EAECF0] flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="text-sm text-[#667085]">
                    Showing {teachers.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to {Math.min(currentPage * pageSize, total)} of {total} teachers
                  </div>
                  <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={total}
                    onChange={handlePageChange}
                    showSizeChanger
                    pageSizeOptions={['10', '20', '50']}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t border-[#EAECF0] px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="text-sm text-[#667085]">
            &copy; NurovantAI 2024. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-sm text-[#667085]">
            <Link to="#" className="hover:text-[#101828]">Contact</Link>
            <Link to="#" className="hover:text-[#101828]">Terms of service</Link>
            <Link to="#" className="hover:text-[#101828]">Privacy Policy</Link>
          </div>
        </div>
      </footer>

      {/* Add Teacher Drawer */}
      <Drawer
        title={
          <div className="flex items-center justify-between pr-5">
            <span className="text-lg font-semibold">Add New Teacher</span>
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
              Add Teacher
            </Button>
          </div>
        }
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddTeacher}
          initialValues={{ subject: 'English' }}
        >
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: 'Please enter teacher name' }]}
          >
            <Input placeholder="Enter teacher's full name" />
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
            name="subject"
            label="Subject"
            rules={[{ required: true, message: 'Please select a subject' }]}
          >
            <Select>
              <Select.Option value="English">English</Select.Option>
              <Select.Option value="Mathematics">Mathematics</Select.Option>
              <Select.Option value="Science">Science</Select.Option>
              <Select.Option value="History">History</Select.Option>
              <Select.Option value="Geography">Geography</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[{ required: true, message: 'Please enter phone number' }]}
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>

          <Form.Item
            name="qualification"
            label="Qualification"
            rules={[{ required: true, message: 'Please enter qualification' }]}
          >
            <Input placeholder="Enter qualification" />
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

export default AdminTeachers;
