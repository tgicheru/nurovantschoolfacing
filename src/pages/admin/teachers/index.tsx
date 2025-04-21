import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Input, Form, Select, Upload, message, Drawer, Dropdown, Menu } from 'antd';
import { SearchOutlined, PlusOutlined, FilterOutlined, MoreOutlined, CloseOutlined, UploadOutlined, EyeOutlined } from '@ant-design/icons';
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

// Mock data for teachers
const teachersData = [
  {
    key: '1',
    name: 'Peter Olugbenga',
    email: 'olasunkanmifinesse@gmail.com',
    subject: 'English',
    progress: '75%',
    status: 'Active',
  },
  {
    key: '2',
    name: 'Peter Olugbenga',
    email: 'olasunkanmifinesse@gmail.com',
    subject: 'English',
    progress: '75%',
    status: 'Active',
  },
  {
    key: '3',
    name: 'Peter Olugbenga',
    email: 'olasunkanmifinesse@gmail.com',
    subject: 'English',
    progress: '75%',
    status: 'Active',
  },
  {
    key: '4',
    name: 'Peter Olugbenga',
    email: 'olasunkanmifinesse@gmail.com',
    subject: 'English',
    progress: '75%',
    status: 'Active',
  },
  {
    key: '5',
    name: 'Peter Olugbenga',
    email: 'olasunkanmifinesse@gmail.com',
    subject: 'English',
    progress: '75%',
    status: 'Active',
  },
];

const AdminTeachers = () => {
  const navigate = useNavigate();
  const auth = useRecoilValue(authAtom);
  const [activeTab, setActiveTab] = useState('teachers');
  const [viewMode, setViewMode] = useState('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [form] = Form.useForm();
  
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
              <button 
                className={`py-2 px-1 ${activeTab === 'curriculum' ? 'text-[#4970FC] border-b-2 border-[#4970FC] font-medium' : 'text-[#667085]'}`}
                onClick={() => {
                  setActiveTab('curriculum');
                  navigate('/admin/curriculum');
                }}
              >
                Curriculum
              </button>
              <button 
                className={`py-2 px-1 ${activeTab === 'review' ? 'text-[#4970FC] border-b-2 border-[#4970FC] font-medium' : 'text-[#667085]'}`}
                onClick={() => {
                  setActiveTab('review');
                  navigate('/admin/review');
                }}
              >
                Review & Report
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-[#101828]">Teachers 🍎</h1>
            <p className="text-[#667085]">Organize and manage your course materials.</p>
          </div>

          <div className="mb-5 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="text-lg font-medium text-[#101828]">20</div>
              <div className="text-sm text-[#667085]">Teacher(s)</div>
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
                Add new teacher
              </Button>
            </div>
          </div>

          {/* Teachers Table */}
          <div className="bg-white border border-[#EAECF0] rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#EAECF0]">
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#667085] uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#667085] uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#667085] uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#667085] uppercase tracking-wider">Progress</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#667085] uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-[#667085] uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAECF0]">
                {teachersData.map((teacher) => (
                  <tr key={teacher.key} className="hover:bg-[#F9FAFB]">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-[#F9A826] flex items-center justify-center text-white font-medium mr-3">
                          P
                        </div>
                        <div className="text-sm font-medium text-[#101828]">{teacher.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#667085]">{teacher.email}</td>
                    <td className="px-6 py-4 text-sm text-[#667085]">{teacher.subject}</td>
                    <td className="px-6 py-4 text-sm text-[#667085]">{teacher.progress}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#ECFDF3] text-[#027A48]">
                        <span className="mr-1.5 w-1.5 h-1.5 rounded-full bg-[#12B76A]"></span>
                        {teacher.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Dropdown
                        overlay={
                          <Menu>
                            <Menu.Item 
                              key="view" 
                              icon={<EyeOutlined />} 
                              onClick={() => navigate(`/admin/teachers/${teacher.key}`, { state: { teacher } })}
                            >
                              View
                            </Menu.Item>
                          </Menu>
                        }
                        trigger={['click']}
                        placement="bottomRight"
                      >
                        <button className="text-[#667085] hover:text-[#101828]">
                          <MoreOutlined />
                        </button>
                      </Dropdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-6 py-4 flex items-center justify-between border-t border-[#EAECF0]">
              <div className="text-sm text-[#667085]">
                Page {currentPage} of {Math.ceil(teachersData.length / pageSize)}
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
                  disabled={currentPage === Math.ceil(teachersData.length / pageSize)}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="border border-[#D0D5DD] rounded-lg px-3 py-1 h-auto text-sm"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
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
