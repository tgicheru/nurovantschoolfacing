import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Button, Tabs, Card, Table, Tag, Input, Drawer, Form, Select, Upload, message } from 'antd';
import { SearchOutlined, PlusOutlined, FilterOutlined, ArrowLeftOutlined, CloseOutlined, UploadOutlined } from '@ant-design/icons';
import { useRecoilValue } from 'recoil';
import authAtom from '../../../atoms/auth/auth.atom';

const { TabPane } = Tabs;

// Mock data for classes
const classesData = [
  { key: '1', name: 'Class A' },
  { key: '2', name: 'Class A' },
  { key: '3', name: 'Class A' },
  { key: '4', name: 'Class A' },
  { key: '5', name: 'Class A' },
  { key: '6', name: 'Class A' },
  { key: '7', name: 'Class A' },
];

// Mock data for recent activities
const activitiesData = [
  { 
    key: '1', 
    description: 'New worksheet uploaded by Ms. Smith (9th Grade English)',
    time: '2 hours ago'
  },
  { 
    key: '2', 
    description: 'New worksheet uploaded by Ms. Smith (9th Grade English)',
    time: '2 hours ago'
  },
  { 
    key: '3', 
    description: 'New worksheet uploaded by Ms. Smith (9th Grade English)',
    time: '2 hours ago'
  },
  { 
    key: '4', 
    description: 'New worksheet uploaded by Ms. Smith (9th Grade English)',
    time: '2 hours ago'
  },
];

// Mock data for students
const studentsData = [
  {
    key: '1',
    name: 'Peter Olugbenga',
    email: 'olasunkanmifinesse@gmail.com',
    grade: 'Grade 7',
    status: 'Pass',
  },
  {
    key: '2',
    name: 'Peter Olugbenga',
    email: 'olasunkanmifinesse@gmail.com',
    grade: 'Grade 7',
    status: 'Pass',
  },
  {
    key: '3',
    name: 'Peter Olugbenga',
    email: 'olasunkanmifinesse@gmail.com',
    grade: 'Grade 7',
    status: 'Pass',
  },
  {
    key: '4',
    name: 'Peter Olugbenga',
    email: 'olasunkanmifinesse@gmail.com',
    grade: 'Grade 7',
    status: 'Pass',
  },
  {
    key: '5',
    name: 'Peter Olugbenga',
    email: 'olasunkanmifinesse@gmail.com',
    grade: 'Grade 7',
    status: 'Pass',
  },
  {
    key: '6',
    name: 'Peter Olugbenga',
    email: 'olasunkanmifinesse@gmail.com',
    grade: 'Grade 7',
    status: 'Pass',
  },
  {
    key: '7',
    name: 'Peter Olugbenga',
    email: 'olasunkanmifinesse@gmail.com',
    grade: 'Grade 7',
    status: 'Pass',
  },
  {
    key: '8',
    name: 'Peter Olugbenga',
    email: 'olasunkanmifinesse@gmail.com',
    grade: 'Grade 7',
    status: 'Pass',
  },
];

const TeacherDetail = () => {
  const navigate = useNavigate();
  const auth = useRecoilValue(authAtom);
  const [activeTab, setActiveTab] = useState('teachers');
  const location = useLocation();
  const [studentDrawerVisible, setStudentDrawerVisible] = useState(false);
  const [studentForm] = Form.useForm();
  
  // Ensure we have teacher data even if not passed through navigation
  const teacher = {
    name: 'Ms Smith',
    email: 'olasunkanmifinesse@gmail.com',
    subject: 'English'
  };
  
  const showStudentDrawer = () => {
    setStudentDrawerVisible(true);
  };

  const closeStudentDrawer = () => {
    setStudentDrawerVisible(false);
    studentForm.resetFields();
  };

  const handleAddStudent = (values: any) => {
    // In a real app, this would call an API to add the student
    console.log('New student:', values);
    message.success('Student added successfully!');
    closeStudentDrawer();
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

          {/* Breadcrumb Navigation */}
          <div className="mb-6 bg-white p-4 border border-[#EAECF0] rounded-lg">
            <div className="flex items-center mb-2">
              <div className="text-sm text-[#667085]">
                <span className="cursor-pointer hover:text-[#4970FC]" onClick={() => navigate('/admin/teachers')}>Teachers</span> / <span className="text-[#101828] font-medium">{teacher.name}</span>
              </div>
            </div>
          </div>

          {/* Teacher Profile Section */}
          <div className="bg-white border border-[#EAECF0] rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start">
              {/* Avatar */}
              <div className="w-full md:w-1/3 mb-6 md:mb-0 flex justify-center">
                <div className="w-32 h-32 rounded-full bg-[#F9A826] flex items-center justify-center text-white text-5xl font-medium shadow-md">
                  P
                </div>
              </div>
              
              {/* Teacher Info */}
              <div className="w-full md:w-2/3 flex flex-col items-center md:items-start text-center md:text-left">
                <h2 className="text-2xl font-semibold text-[#101828] mb-2">{teacher.name}</h2>
                <p className="text-[#667085] mb-6">{teacher.email}</p>
                
                {/* Subject Info */}
                <div className="w-full flex justify-center md:justify-start">
                  <div className="mr-8">
                    <div className="text-sm text-[#667085] mb-1">Subject</div>
                    <div className="text-sm font-medium text-[#101828]">{teacher.subject}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="bg-white border border-[#EAECF0] rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-medium text-[#101828]">Classes</h3>
                  <button className="text-[#4970FC]">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 4H10M6 8H10M6 12H10M14 0H2C0.895431 0 0 0.895431 0 2V14C0 15.1046 0.895431 16 2 16H14C15.1046 16 16 15.1046 16 14V2C16 0.895431 15.1046 0 14 0Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
                <div>
                  {classesData.map(classItem => (
                    <div key={classItem.key} className="flex items-center justify-between py-3 border-b border-[#EAECF0] last:border-0">
                      <div className="text-sm text-[#101828]">{classItem.name}</div>
                      <button className="text-[#667085]">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="bg-white border border-[#EAECF0] rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-medium text-[#101828]">Recent activities</h3>
                </div>
                <div>
                  {activitiesData.map(activity => (
                    <div key={activity.key} className="py-3 border-b border-[#EAECF0] last:border-0">
                      <div className="flex justify-between">
                        <div>
                          <div className="text-sm text-[#101828] mb-1">{activity.description}</div>
                          <div className="text-xs text-[#667085]">{activity.time}</div>
                        </div>
                        <button className="text-[#667085] self-start">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="bg-white border border-[#EAECF0] rounded-lg">
              <div className="p-4 border-b border-[#EAECF0]">
                <h3 className="text-base font-medium text-[#101828]">Student list</h3>
              </div>
              <div className="p-4 flex justify-between items-center border-b border-[#EAECF0]">
                <div></div>
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
                  <Button 
                    type="primary" 
                    icon={<PlusOutlined />} 
                    className="bg-[#4970FC] hover:bg-[#3A5AD9] rounded-full h-9 flex items-center"
                    onClick={showStudentDrawer}
                  >
                    Add students
                  </Button>
                </div>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#EAECF0]">
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#667085] uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#667085] uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#667085] uppercase tracking-wider">Grade</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#667085] uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAECF0]">
                  {studentsData.map((student) => (
                    <tr key={student.key} className="hover:bg-[#F9FAFB]">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-[#F9A826] flex items-center justify-center text-white font-medium mr-3">
                            P
                          </div>
                          <div className="text-sm font-medium text-[#101828]">{student.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#667085]">{student.email}</td>
                      <td className="px-6 py-4 text-sm text-[#667085]">{student.grade}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#ECFDF3] text-[#027A48]">
                          <span className="mr-1.5 w-1.5 h-1.5 rounded-full bg-[#12B76A]"></span>
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-6 py-4 flex items-center justify-between border-t border-[#EAECF0]">
                <div className="text-sm text-[#667085]">
                  Page 1 of 1
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    disabled={true}
                    className="border border-[#D0D5DD] rounded-lg px-3 py-1 h-auto text-sm"
                  >
                    Previous
                  </Button>
                  <Button 
                    disabled={true}
                    className="border border-[#D0D5DD] rounded-lg px-3 py-1 h-auto text-sm"
                  >
                    Next
                  </Button>
                </div>
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

      {/* Add Student Drawer */}
      <Drawer
        title={
          <div className="flex items-center justify-between pr-5">
            <span className="text-lg font-semibold">Add New Student</span>
            <Button 
              type="text" 
              icon={<CloseOutlined />} 
              onClick={closeStudentDrawer} 
              className="flex items-center justify-center"
            />
          </div>
        }
        placement="right"
        closable={false}
        onClose={closeStudentDrawer}
        open={studentDrawerVisible}
        width={400}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div className="flex justify-end">
            <Button onClick={closeStudentDrawer} className="mr-2">
              Cancel
            </Button>
            <Button 
              type="primary" 
              onClick={() => studentForm.submit()} 
              className="bg-[#4970FC]"
            >
              Add Student
            </Button>
          </div>
        }
      >
        <Form
          form={studentForm}
          layout="vertical"
          onFinish={handleAddStudent}
          initialValues={{ grade: 'Grade 7' }}
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
              <Select.Option value="Grade 1">Grade 1</Select.Option>
              <Select.Option value="Grade 2">Grade 2</Select.Option>
              <Select.Option value="Grade 3">Grade 3</Select.Option>
              <Select.Option value="Grade 4">Grade 4</Select.Option>
              <Select.Option value="Grade 5">Grade 5</Select.Option>
              <Select.Option value="Grade 6">Grade 6</Select.Option>
              <Select.Option value="Grade 7">Grade 7</Select.Option>
              <Select.Option value="Grade 8">Grade 8</Select.Option>
              <Select.Option value="Grade 9">Grade 9</Select.Option>
              <Select.Option value="Grade 10">Grade 10</Select.Option>
              <Select.Option value="Grade 11">Grade 11</Select.Option>
              <Select.Option value="Grade 12">Grade 12</Select.Option>
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

export default TeacherDetail;
