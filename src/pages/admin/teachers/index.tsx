import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Input, Form, Select, Upload, message, Drawer, Dropdown, Menu, Table, Tag, Spin, Alert, notification, Pagination, Modal } from 'antd';
import { SearchOutlined, PlusOutlined, FilterOutlined, MoreOutlined, CloseOutlined, UploadOutlined, EyeOutlined, LoadingOutlined, CodeOutlined } from '@ant-design/icons';
import AWS from 'aws-sdk';
import { useRecoilValue } from 'recoil';
import authAtom from '../../../atoms/auth/auth.atom';
import { useAdminTeachers, useRegisterTeacher } from '../../../hooks/admin/admin';
import { Teacher, TeacherRegistrationRequest } from '../../../services/admin.service';

// Define interface for S3 upload response
interface S3UploadResponse {
  Location: string;
  ETag: string;
  Bucket: string;
  Key: string;
}

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
    render: (subject: string, record: Teacher) => (
      <span className="text-sm">{subject || record.subject || 'Not specified'}</span>
    ),
  },
  {
    title: 'Grade Level',
    dataIndex: 'grade_level',
    key: 'grade_level',
    render: (grade: string, record: Teacher) => (
      <span className="text-sm">{grade || record.grade_level || 'Not specified'}</span>
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
    render: (_: string, record: Teacher) => {
      // Determine status based on isVerified field
      const status = record.isVerified ? 'Active' : 'Pending';
      // Set color based on status
      let color = 'geekblue';
      if (status === 'Active') {
        color = 'green';
      } else if (status === 'Pending') {
        color = 'geekblue';
      }
      return (
        <Tag color={color}>
          {status}
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
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');
  const [isApiResponseModalVisible, setIsApiResponseModalVisible] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  
  // Fetch teachers data from API
  const { 
    teachers, 
    total, 
    isLoading, 
    error, 
    isAuthError, 
    refetch 
  } = useAdminTeachers(currentPage, pageSize);
  
  // Teacher registration mutation
  const { mutate: registerTeacher, isLoading: isRegistering, error: registerError, isSuccess: isRegisterSuccess } = useRegisterTeacher((data) => {
    message.success('Teacher registered successfully!');
    closeDrawer();
    refetch(); // Refresh the teachers list
  });
  
  // State for file upload
  const [isUploading, setIsUploading] = useState(false);
  
  // Function to handle file upload using AWS SDK
  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    
    try {
      // Get AWS credentials and bucket from environment variables
      const accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
      const secretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
      const region = process.env.REACT_APP_AWS_REGION;
      const bucketName = process.env.REACT_APP_S3_BUCKET_PROFILE || process.env.REACT_APP_S3_BUCKET;
      
      if (!accessKeyId || !secretAccessKey || !bucketName) {
        throw new Error('AWS credentials or bucket not configured in environment variables');
      }
      
      // Configure AWS with credentials
      AWS.config.update({
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
        region: region,
        apiVersion: 'latest',
      });
      
      // Create an S3 service object
      const s3 = new AWS.S3();
      
      // Create a unique key for the file
      const timestamp = new Date().toISOString().replaceAll('.', '_');
      const sanitizedFileName = file.name.replace(/\s+/g, '_').replace(/-/g, '_').replace(/:/g, '_');
      const key = `profile-images/${timestamp}_${sanitizedFileName}`;
      
      // Set up the upload parameters
      const uploadParams = {
        Bucket: bucketName,
        Key: key,
        Body: file,
        ContentType: file.type,
      };
      
      // Upload the file to S3
      const upload = s3.upload(uploadParams);
      
      // Track progress of the upload
      upload.on('httpUploadProgress', (progress) => {
        const uploadedBytes = progress.loaded;
        const totalBytes = progress.total;
        const percentProgress = Math.round((uploadedBytes / totalBytes) * 100);
        console.log(`Uploaded ${percentProgress}%`);
      });
      
      // Send the upload request
      const data = await new Promise<S3UploadResponse>((resolve, reject) => {
        upload.send((err, data: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(data as S3UploadResponse);
          }
        });
      });
      
      console.log('AWS Upload Response:', data);
      
      // Set the uploaded image URL
      if (data && data.Location) {
        setUploadedImageUrl(data.Location);
        message.success('Profile image uploaded successfully!');
      } else {
        throw new Error('No URL returned from upload service');
      }
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      message.error('Failed to upload profile image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };
  

  
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
  
  const showDrawer = () => setIsDrawerVisible(true);
  const closeDrawer = () => {
    setIsDrawerVisible(false);
    form.resetFields();
    setUploadedImageUrl('');
  };

  const handleAddTeacher = (values: any) => {
    setIsSubmitting(true);
    
    // Prepare the teacher registration data according to API requirements
    const teacherData: TeacherRegistrationRequest = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      password: values.password,
      state: values.state,
      sex: values.sex,
      grade_level: values.grade_level,
      subject: values.subject,
      phone_number: values.phone_number,
      user_type: 'TEACHER'
    };
    
    // Add profile image if uploaded
    if (uploadedImageUrl) {
      teacherData.profile_image = uploadedImageUrl;
    }
    
    console.log('Registering new teacher:', teacherData);
    
    // Call the registration mutation
    registerTeacher(teacherData, {
      onSettled: () => {
        setIsSubmitting(false);
      },
      onError: (error: any) => {
        const errorMessage = error.response?.data?.message || 'Failed to register teacher';
        notification.error({
          message: 'Registration Failed',
          description: errorMessage,
          duration: 5
        });
      }
    });
  };
  
  // Handle pagination change
  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) setPageSize(pageSize);
  };
  
  // Handle view teacher details
  const handleViewTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsApiResponseModalVisible(true);
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
                            <div className="text-sm">{teacher.subject || 'Not specified'}</div>
                          </div>
                          <div>
                            <div className="text-xs text-[#667085]">Grade Level</div>
                            <div className="text-sm">{teacher.grade_level || 'Not specified'}</div>
                          </div>
                          <div>
                            <div className="text-xs text-[#667085]">State</div>
                            <div className="text-sm">{teacher.state}</div>
                          </div>
                          <div>
                            <div className="text-xs text-[#667085]">Status</div>
                            <div className="text-sm">
                              <Tag color={teacher.isVerified ? 'green' : 'geekblue'}>
                                {teacher.isVerified ? 'Active' : 'Pending'}
                              </Tag>
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
                    Showing {teachers.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to {Math.min(currentPage * pageSize, teachers.length)} of {teachers.length} teachers
                  </div>
                </div>
              </>
            )}
          </div>
          {/* Pagination */}
          {!isLoading && !error && teachers.length > 0 && (
            <div className="flex justify-end p-4 border-t border-[#EAECF0]">
              <Pagination
                current={currentPage}
                total={teachers.length}
                pageSize={pageSize}
                onChange={handlePageChange}
                showSizeChanger
                showTotal={(total) => `Total ${total} teachers`}
              />
            </div>
          )}
        </div>
      </main>

      {/* Teacher Details Modal */}
      <Modal
        title="Teacher Details"
        open={isApiResponseModalVisible}
        onCancel={() => setIsApiResponseModalVisible(false)}
        width={800}
        footer={[
          <Button key="close" onClick={() => setIsApiResponseModalVisible(false)}>
            Close
          </Button>
        ]}
      >
        {selectedTeacher && (
          <div className="p-4">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 rounded-full bg-[#F2F4F7] flex items-center justify-center mr-4 text-[#4970FC] text-xl font-medium">
                {selectedTeacher.first_name?.[0]}{selectedTeacher.last_name?.[0]}
              </div>
              <div>
                <h2 className="text-xl font-semibold">{`${selectedTeacher.first_name} ${selectedTeacher.last_name}`}</h2>
                <p className="text-[#667085]">{selectedTeacher.email}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="border border-[#EAECF0] rounded-lg p-4">
                <h3 className="text-sm font-medium text-[#667085] mb-1">Subject</h3>
                <p className="font-medium">{selectedTeacher.subject || 'Not specified'}</p>
              </div>
              <div className="border border-[#EAECF0] rounded-lg p-4">
                <h3 className="text-sm font-medium text-[#667085] mb-1">Grade Level</h3>
                <p className="font-medium">{selectedTeacher.grade_level || 'Not specified'}</p>
              </div>
              <div className="border border-[#EAECF0] rounded-lg p-4">
                <h3 className="text-sm font-medium text-[#667085] mb-1">State</h3>
                <p className="font-medium">{selectedTeacher.state}</p>
              </div>
              <div className="border border-[#EAECF0] rounded-lg p-4">
                <h3 className="text-sm font-medium text-[#667085] mb-1">Status</h3>
                <p className="font-medium">
                  <Tag color={selectedTeacher.isVerified ? 'green' : 'geekblue'}>
                    {selectedTeacher.isVerified ? 'Active' : 'Pending'}
                  </Tag>
                </p>
              </div>
            </div>
            
            <div className="border border-[#EAECF0] rounded-lg p-4 mb-6">
              <h3 className="text-sm font-medium text-[#667085] mb-1">Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div>
                  <p className="text-sm text-[#667085]">User Type</p>
                  <p className="font-medium">{selectedTeacher.user_type || 'TEACHER'}</p>
                </div>
                <div>
                  <p className="text-sm text-[#667085]">Sign Up Type</p>
                  <p className="font-medium">{selectedTeacher.sign_up_type || 'NATIVE'}</p>
                </div>
                <div>
                  <p className="text-sm text-[#667085]">Created At</p>
                  <p className="font-medium">{selectedTeacher.createdAt ? new Date(selectedTeacher.createdAt).toLocaleString() : 'Not available'}</p>
                </div>
                <div>
                  <p className="text-sm text-[#667085]">Last Updated</p>
                  <p className="font-medium">{selectedTeacher.updatedAt ? new Date(selectedTeacher.updatedAt).toLocaleString() : 'Not available'}</p>
                </div>
              </div>
            </div>
            
            {selectedTeacher.profile_image && (
              <div className="border border-[#EAECF0] rounded-lg p-4">
                <h3 className="text-sm font-medium text-[#667085] mb-3">Profile Image</h3>
                <div className="flex justify-center">
                  <img 
                    src={selectedTeacher.profile_image} 
                    alt={`${selectedTeacher.first_name} ${selectedTeacher.last_name}`} 
                    className="max-h-60 rounded-md object-contain"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

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

      {/* Teacher Registration Drawer */}
      <Drawer
        title="Add New Teacher"
        placement="right"
        onClose={closeDrawer}
        open={isDrawerVisible}
        width={500}
        footer={
          <div className="flex justify-end">
            <Button onClick={closeDrawer} className="mr-2">
              Cancel
            </Button>
            <Button 
              type="primary" 
              onClick={() => form.submit()}
              loading={isSubmitting}
              className="bg-[#4970FC]"
            >
              Submit
            </Button>
          </div>
        }
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddTeacher}
          initialValues={{ 
            subject: 'English',
            sex: 'male',
            grade_level: '5th Grade',
            state: 'Texas'
          }}
        >
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="first_name"
              label="First Name"
              rules={[{ required: true, message: 'Please enter first name' }]}
            >
              <Input placeholder="Enter first name" />
            </Form.Item>

            <Form.Item
              name="last_name"
              label="Last Name"
              rules={[{ required: true, message: 'Please enter last name' }]}
            >
              <Input placeholder="Enter last name" />
            </Form.Item>
          </div>

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
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Please enter password' },
              { min: 8, message: 'Password must be at least 8 characters' }
            ]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="state"
              label="State"
              rules={[{ required: true, message: 'Please select state' }]}
            >
              <Select>
                <Select.Option value="Texas">Texas</Select.Option>
                <Select.Option value="California">California</Select.Option>
                <Select.Option value="New York">New York</Select.Option>
                <Select.Option value="Florida">Florida</Select.Option>
                <Select.Option value="Illinois">Illinois</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="sex"
              label="Gender"
              rules={[{ required: true, message: 'Please select gender' }]}
            >
              <Select>
                <Select.Option value="male">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
                <Select.Option value="other">Other</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="grade_level"
              label="Grade Level"
              rules={[{ required: true, message: 'Please select grade level' }]}
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
              name="subject"
              label="Subject"
              rules={[{ required: true, message: 'Please select subject' }]}
            >
              <Select>
                <Select.Option value="English">English</Select.Option>
                <Select.Option value="Mathematics">Mathematics</Select.Option>
                <Select.Option value="Science">Science</Select.Option>
                <Select.Option value="History">History</Select.Option>
                <Select.Option value="Geography">Geography</Select.Option>
                <Select.Option value="Physics">Physics</Select.Option>
                <Select.Option value="Chemistry">Chemistry</Select.Option>
                <Select.Option value="Biology">Biology</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            name="phone_number"
            label="Phone Number"
            rules={[{ required: true, message: 'Please enter phone number' }]}
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>

          <Form.Item
            name="profile_image"
            label="Profile Image"
          >
            <div className="space-y-2">
              <Upload
                name="profile_image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={(file) => {
                  // Validate file type and size
                  const isImage = file.type.startsWith('image/');
                  if (!isImage) {
                    message.error('You can only upload image files!');
                    return Upload.LIST_IGNORE;
                  }
                  
                  const isLt2M = file.size / 1024 / 1024 < 2;
                  if (!isLt2M) {
                    message.error('Image must be smaller than 2MB!');
                    return Upload.LIST_IGNORE;
                  }
                  
                  // Handle the file upload
                  handleFileUpload(file);
                  return false; // Prevent default upload behavior
                }}
              >
                {uploadedImageUrl ? (
                  <div className="relative w-full h-full">
                    <img 
                      src={uploadedImageUrl} 
                      alt="Profile" 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Button 
                        type="text" 
                        icon={<UploadOutlined />} 
                        className="text-white"
                      >
                        Change
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <UploadOutlined className="text-lg mb-1" />
                    <div className="text-xs">Upload</div>
                  </div>
                )}
              </Upload>
              {isUploading && (
                <div className="flex items-center">
                  <Spin size="small" className="mr-2" />
                  <span className="text-xs text-gray-500">Uploading...</span>
                </div>
              )}
              {uploadedImageUrl && (
                <div className="text-xs text-gray-500 truncate">
                  Image uploaded successfully
                </div>
              )}
            </div>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default AdminTeachers;
