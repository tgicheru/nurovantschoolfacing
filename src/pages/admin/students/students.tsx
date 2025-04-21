import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Input, Form, Select, Upload, message, Drawer, Dropdown, Menu, Avatar } from 'antd';
import { SearchOutlined, PlusOutlined, FilterOutlined, MoreOutlined, CloseOutlined, UploadOutlined, EyeOutlined } from '@ant-design/icons';
import ProfileMenu from '../../../components/Header/ProfileMenu';
import { useRecoilValue } from 'recoil';
import authAtom from '../../../atoms/auth/auth.atom';

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

// Mock data for students
const studentsData = [
  {
    key: '1',
    name: 'Peter Olugbenga',
    email: 'olasunkanmifinesse@gmail.com',
    grade: '9th Grade',
    progress: '75%',
    status: 'Active',
  },
  {
    key: '2',
    name: 'Peter Olugbenga',
    email: 'olasunkanmifinesse@gmail.com',
    grade: '9th Grade',
    progress: '75%',
    status: 'Active',
  },
  {
    key: '3',
    name: 'Peter Olugbenga',
    email: 'olasunkanmifinesse@gmail.com',
    grade: '9th Grade',
    progress: '75%',
    status: 'Active',
  },
  {
    key: '4',
    name: 'Peter Olugbenga',
    email: 'olasunkanmifinesse@gmail.com',
    grade: '9th Grade',
    progress: '75%',
    status: 'Active',
  },
];

const AdminStudents = () => {
  const navigate = useNavigate();
  const auth = useRecoilValue(authAtom);
  const [activeTab, setActiveTab] = useState('students');
  const [viewMode, setViewMode] = useState('list'); // 'grid' or 'list'
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [form] = Form.useForm();
  
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
  
  const handleViewStudent = (student: any) => {
    // Navigate to the student detail page with the student data
    console.log('View student:', student);
    navigate(`/admin/students/${student.key}`, { state: { student } });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-[#EAECF0] px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/admin/dashboard" className="text-[#4970FC] font-semibold text-xl">
              NurovantAI
            </Link>
            <div className="ml-10 flex space-x-6">
              <Link to="/admin/dashboard" className={`text-[#667085] hover:text-[#101828] ${activeTab === 'dashboard' ? 'font-medium text-[#101828]' : ''}`}>
                Dashboard
              </Link>
              <Link to="/admin/teachers" className={`text-[#667085] hover:text-[#101828] ${activeTab === 'teachers' ? 'font-medium text-[#101828]' : ''}`}>
                Teachers
              </Link>
              <Link to="/admin/students" className={`text-[#667085] hover:text-[#101828] ${activeTab === 'students' ? 'font-medium text-[#101828]' : ''}`}>
                Students
              </Link>
              <Link to="/admin/curriculum" className={`text-[#667085] hover:text-[#101828] ${activeTab === 'curriculum' ? 'font-medium text-[#101828]' : ''}`}>
                Curriculum
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ProfileMenu userName="Admin User" />
          </div>
        </div>
      </header>

      <main className="flex-1 p-8 bg-[#FDF8F3]">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-[#101828]">Students</h1>
          <p className="text-[#667085]">Manage your students and their information</p>
        </div>

        <div className="bg-white rounded-lg border border-[#EAECF0] overflow-hidden">
          <div className="p-6 border-b border-[#EAECF0] flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center space-x-2 flex-grow">
              <div className="relative flex-grow max-w-md">
                <Input
                  placeholder="Search students..."
                  prefix={<SearchOutlined className="text-[#667085]" />}
                  className="rounded-lg border-[#D0D5DD] pl-10"
                />
              </div>
              <Button 
                icon={<FilterOutlined />} 
                className="border border-[#D0D5DD] rounded-lg px-3 py-1 h-auto"
              >
                Filter
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <div className="border border-[#D0D5DD] rounded-lg flex">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1.5 ${viewMode === 'grid' ? 'bg-[#F9FAFB] text-[#101828]' : 'text-[#667085]'}`}
                >
                  <GridViewIcon />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1.5 ${viewMode === 'list' ? 'bg-[#F9FAFB] text-[#101828]' : 'text-[#667085]'}`}
                >
                  <ListViewIcon />
                </button>
              </div>
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={showDrawer}
                className="bg-[#4970FC] rounded-lg px-3 py-1 h-auto"
              >
                Add new student
              </Button>
            </div>
          </div>

          {viewMode === 'grid' ? (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {studentsData.map((student) => (
                  <div key={student.key} className="border border-[#EAECF0] rounded-lg overflow-hidden">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center">
                          <Avatar size={64} src={`https://randomuser.me/api/portraits/men/${parseInt(student.key) + 30}.jpg`} />
                          <div className="ml-4">
                            <h3 className="text-lg font-medium text-[#101828]">{student.name}</h3>
                            <p className="text-sm text-[#667085]">{student.email}</p>
                          </div>
                        </div>
                        <Dropdown
                          overlay={
                            <Menu>
                              <Menu.Item 
                                key="view" 
                                icon={<EyeOutlined />}
                                onClick={() => handleViewStudent(student)}
                              >
                                View
                              </Menu.Item>
                            </Menu>
                          }
                          trigger={['click']}
                          placement="bottomRight"
                        >
                          <Button 
                            type="text" 
                            icon={<MoreOutlined />} 
                            className="flex items-center justify-center"
                          />
                        </Dropdown>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-[#667085] mb-1">Grade</p>
                          <p className="text-sm font-medium text-[#101828]">{student.grade}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#667085] mb-1">Progress</p>
                          <p className="text-sm font-medium text-[#101828]">{student.progress}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          student.status === 'Active' ? 'bg-[#ECFDF3] text-[#027A48]' : 'bg-[#FEF3F2] text-[#B42318]'
                        }`}>
                          {student.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-[#667085]">
                  Page {currentPage} of 10
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="border border-[#D0D5DD] rounded-lg px-3 py-1 h-auto text-sm"
                  >
                    Previous
                  </Button>
                  <Button 
                    disabled={currentPage === 10}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="border border-[#D0D5DD] rounded-lg px-3 py-1 h-auto text-sm"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-[#EAECF0]">
                  <thead className="bg-[#F9FAFB]">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#667085] uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#667085] uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#667085] uppercase tracking-wider">
                        Grade
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#667085] uppercase tracking-wider">
                        Progress
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#667085] uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-[#667085] uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-[#EAECF0]">
                    {studentsData.map((student) => (
                      <tr key={student.key} className="hover:bg-[#F9FAFB]">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Avatar src={`https://randomuser.me/api/portraits/men/${parseInt(student.key) + 30}.jpg`} />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-[#101828]">{student.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-[#667085]">{student.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-[#667085]">{student.grade}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-[#667085]">{student.progress}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            student.status === 'Active' ? 'bg-[#ECFDF3] text-[#027A48]' : 'bg-[#FEF3F2] text-[#B42318]'
                          }`}>
                            {student.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Dropdown
                            overlay={
                              <Menu>
                                <Menu.Item 
                                  key="view" 
                                  icon={<EyeOutlined />}
                                  onClick={() => handleViewStudent(student)}
                                >
                                  View
                                </Menu.Item>
                              </Menu>
                            }
                            trigger={['click']}
                            placement="bottomRight"
                          >
                            <Button 
                              type="text" 
                              icon={<MoreOutlined />} 
                              className="flex items-center justify-center"
                            />
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 flex items-center justify-between border-t border-[#EAECF0]">
                <div className="text-sm text-[#667085]">
                  Page {currentPage} of 10
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="border border-[#D0D5DD] rounded-lg px-3 py-1 h-auto text-sm"
                  >
                    Previous
                  </Button>
                  <Button 
                    disabled={currentPage === 10}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="border border-[#D0D5DD] rounded-lg px-3 py-1 h-auto text-sm"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-[#EAECF0] px-8 py-6">
        <div className="flex justify-between items-center">
          <div className="text-sm text-[#667085]">
            © 2023 NurovantAI. All rights reserved.
          </div>
          <div className="flex space-x-4 text-sm text-[#667085]">
            <Link to="#" className="hover:text-[#101828]">Terms of service</Link>
            <Link to="#" className="hover:text-[#101828]">Privacy Policy</Link>
          </div>
        </div>
      </footer>

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
