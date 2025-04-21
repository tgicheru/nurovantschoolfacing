import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import authAtom from "../../../atoms/auth/auth.atom";
import { Card, Input, Select, Button, Tabs, Badge } from 'antd';
import { SearchOutlined, ReloadOutlined, ArrowRightOutlined, LeftOutlined } from '@ant-design/icons';
import { FiClock, FiCalendar, FiUsers, FiChevronRight } from 'react-icons/fi';

const { TabPane } = Tabs;

const ClassDetailPage = () => {
  const navigate = useNavigate();
  const { classId } = useParams();
  const { user } = useRecoilValue(authAtom);
  const [activeTab, setActiveTab] = useState('deadlines');

  // Mock data for upcoming deadlines
  const deadlines = [
    {
      title: 'Stylizing Assignments',
      dueDate: 'October 5',
      class: 'Class 5'
    },
    {
      title: 'Reading Assignment',
      dueDate: 'October 30',
      class: 'Class D'
    },
    {
      title: 'Finalize Group Report',
      dueDate: 'November 5',
      class: 'Class C'
    }
  ];

  // Mock data for upcoming lessons
  const lessons = [
    {
      title: 'Introduction to English',
      date: 'October 20',
      class: 'Class A'
    },
    {
      title: 'Introduction to Literature',
      date: 'October 28',
      class: 'Class D'
    },
    {
      title: 'Research methodology',
      date: 'October 30',
      class: 'Class D'
    }
  ];

  // Mock data for groups
  const groups = [
    { id: 1, name: 'Algebra group' },
    { id: 2, name: 'Geometry group' },
    { id: 3, name: 'Biology study group' },
    { id: 4, name: 'Chemistry enthusiasts' },
    { id: 5, name: 'History buffs' },
    { id: 6, name: 'Literature lovers' },
    { id: 7, name: 'Physics explorers' },
    { id: 8, name: 'Art and Design club' }
  ];

  // Mock data for calendar
  const calendarData = [
    {
      time: '8:00 - 8:05',
      activity: 'Introduction: Setting with materials/handouts',
      link: true
    },
    {
      time: '8:05 - 8:20',
      activity: 'Lecture: Electric charges',
      link: true
    },
    {
      time: '8:20 - 8:40',
      activity: 'Group activity: Build a circuit',
      link: true
    },
    {
      time: '8:40 - 8:50',
      activity: 'Performance: Weekly Test',
      link: true
    },
    {
      time: '8:50 - 9:00',
      activity: 'Closure: Exit ticket review',
      link: true
    }
  ];

  // Mock data for student performance
  const performanceData = [
    { week: 'Week 1', score: 85 },
    { week: 'Week 2', score: 78 },
    { week: 'Week 3', score: 80 },
    { week: 'Week 4', score: 88 },
    { week: 'Week 5', score: 82 },
    { week: 'Week 6', score: 79 },
    { week: 'Week 7', score: 90 },
    { week: 'Week 8', score: 85 },
    { week: 'Week 9', score: 65 }
  ];

  // Mock data for exit ticket results
  const exitTicketData = {
    totalStudents: 25,
    averageScore: "78%",
    aboveProfilenicy: 17,
    aboveProfilenicyPercent: "68%",
    belowProfilenicy: 8,
    belowProfilenicyPercent: "32%"
  };

  // Mock data for overall student performance
  const overallPerformanceData = {
    attendancePercentage: "92%",
    needingSupport: "20%",
    rapidImprovement: "54.4% of students"
  };

  return (
    <div className="w-full py-[20px]">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center mb-4">
        <Link to="/main" className="text-[#667085] hover:text-[#4970FC] flex items-center">
          <span>Overview</span>
        </Link>
        <span className="mx-2 text-[#667085]">/</span>
        <span className="text-[#101828]">Class {classId}</span>
      </div>

      {/* Header with Search */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-[#101828]">
          Class {classId}
        </h1>
        <div className="w-64">
          <Input 
            placeholder="Search for student" 
            prefix={<SearchOutlined className="text-gray-400" />} 
            className="rounded-lg"
          />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Left Column - Deadlines */}
        <Card className="col-span-1" title={
          <div className="flex justify-between items-center">
            <span>Upcoming Deadlines</span>
            <Button type="text" icon={<ReloadOutlined />} />
          </div>
        }>
          {deadlines.map((deadline, index) => (
            <div key={index} className="flex justify-between items-center p-3 border-b last:border-b-0">
              <div>
                <p className="font-medium">{deadline.title}</p>
                <p className="text-sm text-[#667085]">{deadline.class}</p>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                <span className="text-sm">Due: {deadline.dueDate}</span>
              </div>
            </div>
          ))}
        </Card>

        {/* Middle Column - Lessons */}
        <Card className="col-span-1" title={
          <div className="flex justify-between items-center">
            <span>Upcoming Lessons</span>
            <Button type="text" icon={<ReloadOutlined />} />
          </div>
        }>
          {lessons.map((lesson, index) => (
            <div key={index} className="flex justify-between items-center p-3 border-b last:border-b-0">
              <div>
                <p className="font-medium">{lesson.title}</p>
                <p className="text-sm text-[#667085]">{lesson.class}</p>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm">{lesson.date}</span>
              </div>
            </div>
          ))}
        </Card>

        {/* Right Column - Groups */}
        <Card className="col-span-1" title={
          <div className="flex justify-between items-center">
            <span>Groups</span>
            <Button type="text" icon={<ReloadOutlined />} />
          </div>
        }>
          {groups.map((group, index) => (
            <div 
              key={index} 
              className="flex justify-between items-center p-3 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
              onClick={() => navigate(`/groups`)}
            >
              <div>
                <p className="font-medium">Group {group.id} - {group.name}</p>
              </div>
              <FiChevronRight className="text-[#4970FC]" />
            </div>
          ))}
        </Card>
      </div>

      {/* Calendar Section */}
      <Card className="mb-6" title={
        <div className="flex justify-between items-center">
          <span>Calendar</span>
          <Button type="text" icon={<ReloadOutlined />} />
        </div>
      }>
        <div className="grid grid-cols-5 gap-4 mb-4">
          <div className="col-span-1">
            <p className="text-sm font-medium text-[#667085]">Time</p>
          </div>
          <div className="col-span-4">
            <p className="text-sm font-medium text-[#667085]">Activity</p>
          </div>
        </div>
        {calendarData.map((item, index) => (
          <div 
            key={index} 
            className="grid grid-cols-5 gap-4 mb-2 hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer"
            onClick={() => navigate(`/courses/activities/${encodeURIComponent(item.activity)}`)}
          >
            <div className="col-span-1">
              <p className="text-sm">{item.time}</p>
            </div>
            <div className="col-span-4 flex justify-between items-center">
              <p className="text-sm text-[#4970FC]">{item.activity}</p>
              <ArrowRightOutlined className="text-[#4970FC] text-xs" />
            </div>
          </div>
        ))}
      </Card>

      {/* Student Performance Section */}
      <Card className="mb-6" title={
        <div className="flex justify-between items-center">
          <span>Student performance</span>
          <div className="flex items-center gap-2">
            <Select 
              defaultValue="1" 
              style={{ width: 120 }}
              options={[
                { value: '1', label: 'Week 1 - Week 9' },
                { value: '2', label: 'Week 10 - Week 18' },
              ]}
            />
          </div>
        </div>
      }>
        <div className="h-64">
          <div className="flex h-full">
            {performanceData.map((item, index) => (
              <div key={index} className="flex flex-col items-center justify-end h-full flex-1">
                <div 
                  className="w-8 bg-[#4970FC] opacity-70 rounded-t-md" 
                  style={{ height: `${item.score}%` }}
                ></div>
                <p className="text-xs mt-2">{item.week.split(' ')[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Exit Ticket Results */}
        <Card title="Exit Ticket Results">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-[#667085]">Total Students:</span>
              <span className="font-medium">{exitTicketData.totalStudents}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[#667085]">Average Score:</span>
              <span className="font-medium">{exitTicketData.averageScore}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[#667085]">Students Above Proficiency:</span>
              <span className="font-medium">{exitTicketData.aboveProfilenicy} ({exitTicketData.aboveProfilenicyPercent})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[#667085]">Students Below Proficiency:</span>
              <span className="font-medium">{exitTicketData.belowProfilenicy} ({exitTicketData.belowProfilenicyPercent})</span>
            </div>
          </div>
        </Card>

        {/* Overall Student Performance */}
        <Card title="Overall Student Performance">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-[#667085]">Student Meeting Attendance:</span>
              <span className="font-medium">{overallPerformanceData.attendancePercentage}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[#667085]">Students Needing Support:</span>
              <span className="font-medium">{overallPerformanceData.needingSupport}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[#667085]">Rapid Improvement:</span>
              <span className="font-medium">{overallPerformanceData.rapidImprovement}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <div className="text-xs text-[#667085] mt-4">
        © NurovantAI 2024. All rights reserved.
      </div>
    </div>
  );
};

export default ClassDetailPage;
