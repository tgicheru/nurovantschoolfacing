import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Button, Card, Table, Tag } from 'antd';
import { useRecoilValue } from 'recoil';
import authAtom from '../../../atoms/auth/auth.atom';
import ProfileMenu from '../../../components/Header/ProfileMenu';

const StudentDetail = () => {
  const navigate = useNavigate();
  const auth = useRecoilValue(authAtom);
  const [activeTab, setActiveTab] = useState('students');
  const location = useLocation();
  
  // Get student data from location state or use default
  const student = location.state?.student || {
    name: 'Peter Olugbenga',
    email: 'olasunkanmifinesse@gmail.com',
    subject: 'English',
    grade: '9th Grade'
  };

  // Mock data for subjects
  const subjects = [
    { key: '1', name: 'Mathematics', arrow: '>' },
    { key: '2', name: 'English', arrow: '>' },
    { key: '3', name: 'English', arrow: '>' },
    { key: '4', name: 'English', arrow: '>' },
    { key: '5', name: 'English', arrow: '>' },
  ];

  // Mock data for recent activities
  const activities = [
    { key: '1', activity: 'Assignment submission', time: '2 hours ago', arrow: '>' },
    { key: '2', activity: 'Assignment submission', time: '2 hours ago', arrow: '>' },
    { key: '3', activity: 'Assignment submission', time: '2 hours ago', arrow: '>' },
  ];

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
            <ProfileMenu userName="Peter" />
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

          {/* Breadcrumb */}
          <div className="mb-6 bg-white p-4 border border-[#EAECF0] rounded-lg">
            <div className="flex items-center mb-2">
              <div className="text-sm text-[#667085]">
                <span 
                  className="cursor-pointer hover:text-[#4970FC]"
                  onClick={() => navigate('/admin/students')}
                >
                  Students
                </span> / <span className="text-[#101828] font-medium">{student.name}</span>
              </div>
            </div>
          </div>

          {/* Student Profile */}
          <div className="bg-white border border-[#EAECF0] rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div className="w-full md:w-1/3 mb-6 md:mb-0 flex justify-center">
                <div className="w-32 h-32 rounded-full bg-[#F9A826] flex items-center justify-center text-white text-5xl font-medium shadow-md">
                  P
                </div>
              </div>
              <div className="w-full md:w-2/3 flex flex-col items-center md:items-start text-center md:text-left">
                <h2 className="text-2xl font-semibold text-[#101828] mb-1">{student.name}</h2>
                <p className="text-[#667085] mb-4">{student.email}</p>
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="bg-[#F9FAFB] p-3 rounded-lg">
                    <div className="text-sm text-[#667085]">Subject</div>
                    <div className="font-medium text-[#101828]">{student.subject}</div>
                  </div>
                  <div className="bg-[#F9FAFB] p-3 rounded-lg">
                    <div className="text-sm text-[#667085]">Grade</div>
                    <div className="font-medium text-[#101828]">{student.grade}</div>
                  </div>
                  <div className="bg-[#F9FAFB] p-3 rounded-lg">
                    <div className="text-sm text-[#667085]">Status</div>
                    <div className="font-medium text-[#027A48] flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#12B76A] mr-1.5"></span>
                      Active
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Subjects Section */}
            <div className="bg-white border border-[#EAECF0] rounded-lg overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b border-[#EAECF0]">
                <h3 className="font-medium text-[#101828]">Subjects</h3>
              </div>
              <div className="divide-y divide-[#EAECF0]">
                {subjects.map((subject) => (
                  <div key={subject.key} className="flex justify-between items-center p-4 hover:bg-[#F9FAFB]">
                    <div className="font-medium text-[#101828]">{subject.name}</div>
                    <div className="text-[#667085]">{subject.arrow}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities Section */}
            <div className="bg-white border border-[#EAECF0] rounded-lg overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b border-[#EAECF0]">
                <h3 className="font-medium text-[#101828]">Recent activities</h3>
              </div>
              <div className="divide-y divide-[#EAECF0]">
                {activities.map((activity) => (
                  <div key={activity.key} className="flex justify-between items-center p-4 hover:bg-[#F9FAFB]">
                    <div>
                      <div className="font-medium text-[#101828]">{activity.activity}</div>
                      <div className="text-sm text-[#667085]">{activity.time}</div>
                    </div>
                    <div className="text-[#667085]">{activity.arrow}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance Section */}
          <div className="bg-white border border-[#EAECF0] rounded-lg overflow-hidden mb-8">
            <div className="flex justify-between items-center p-4 border-b border-[#EAECF0]">
              <h3 className="font-medium text-[#101828]">Performance</h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#F9FAFB] p-4 rounded-lg">
                  <div className="text-sm text-[#667085] mb-1">Overall Progress</div>
                  <div className="text-xl font-semibold text-[#101828]">75%</div>
                </div>
                <div className="bg-[#F9FAFB] p-4 rounded-lg">
                  <div className="text-sm text-[#667085] mb-1">Assignments Completed</div>
                  <div className="text-xl font-semibold text-[#101828]">12/15</div>
                </div>
                <div className="bg-[#F9FAFB] p-4 rounded-lg">
                  <div className="text-sm text-[#667085] mb-1">Average Score</div>
                  <div className="text-xl font-semibold text-[#101828]">B+</div>
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
    </div>
  );
};

export default StudentDetail;
