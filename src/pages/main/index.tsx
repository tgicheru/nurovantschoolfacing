import React from 'react';
import { Card, Row, Col, Typography, Button, Input, Select, List, Tag } from 'antd';
import { CalendarOutlined, BookOutlined, UserOutlined, BarChartOutlined, SearchOutlined, FileTextOutlined, TeamOutlined, ClockCircleOutlined, CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Column } from '@ant-design/charts';
import StudentGroupsSection from '../../components/StudentGroupsSection';
import PacingGuideSection from '../../components/PacingGuideSection';

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;

const MainDashboard: React.FC = () => {
  // Sample data for the dashboard
  const upcomingTasks = [
    { title: 'Exit Tickets to Review', count: '3 pending', icon: <FileTextOutlined /> },
    { title: 'Calendar Adjustments Needed', count: '2 suggested', icon: <CalendarOutlined /> },
    { title: 'Interventions to Assign', count: '5 students', icon: <TeamOutlined /> },
  ];

  const classOverview = [
    { class: 'Class 1', students: 100, subject: 'Algebra', score: '70%' },
    { class: 'Class 2', students: 80, subject: 'Algebra', score: '50%' },
    { class: 'Class 3', students: 95, subject: 'Algebra', score: '80%' },
  ];

  const calendarActivities = [
    { time: '8:00 - 8:05', title: 'Introduction: Demo with magnet/compass', link: 'Demo with magnet/compass' },
    { time: '8:05 - 8:20', title: 'Lecture: Electric charges', link: 'Electric charges' },
    { time: '8:20 - 8:40', title: 'Group activity: Build a circuit', link: 'Build a circuit' },
    { time: '8:40 - 8:50', title: 'Performance: Weekly Trend', link: 'Weekly Trend' },
    { time: '8:50 - 9:00', title: 'Closure: Exit ticket review', link: 'Exit ticket review' },
  ];

  const performanceData = [
    { week: 'Week 1', score: 80 },
    { week: 'Week 2', score: 65 },
    { week: 'Week 3', score: 65 },
    { week: 'Week 4', score: 78 },
    { week: 'Week 5', score: 65 },
    { week: 'Week 6', score: 65 },
    { week: 'Week 7', score: 80 },
    { week: 'Week 9', score: 70 },
    { week: 'Week 10', score: 35 },
  ];

  const upcomingDeadlines = [
    { title: 'Diphthong Assignments', class: 'Class C', due: 'October 5' },
    { title: 'Literature in English', class: 'Class A', due: 'October 22' },
    { title: 'Complete Reading Assignment', class: 'Class D', due: 'October 30' },
    { title: 'Finalize Group Report', class: 'Class E', due: 'November 5' },
  ];

  const upcomingLessons = [
    { title: 'Introduction to Shakespeare', class: 'Class B', date: 'October 15' },
    { title: 'Introduction to English', class: 'Class A', date: 'October 20' },
    { title: 'Introduction to Literature', class: 'Class C', date: 'October 25' },
    { title: 'Research methodology', class: 'Class D', date: 'October 30' },
  ];

  const barConfig = {
    data: performanceData,
    xField: 'week',
    yField: 'score',
    color: '#4970FC',
    columnWidthRatio: 0.6,
    height: 200,
    xAxis: { label: { style: { fill: '#888' } } },
    yAxis: { label: { style: { fill: '#888' } } },
    meta: {
      week: { alias: 'Week' },
      score: { alias: 'Score' },
    },
  };

  return (
    <div className="dashboard-container p-6">
      {/* Welcome Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <Title level={2} className="mb-2">Welcome back, Bolutife 👋</Title>
          <Paragraph className="text-gray-600 mb-0">Let's pick up where you left off.</Paragraph>
        </div>
        <div className="w-64">
          <Search
            placeholder="Search for student"
            prefix={<SearchOutlined />}
            className="w-full"
          />
        </div>
      </div>

      <Row gutter={[24, 24]}>
        {/* Upcoming Task Section */}
        <Col xs={24} lg={8}>
          <Card className="h-full shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileTextOutlined className="text-blue-500" />
                <Title level={5} className="m-0">Upcoming task</Title>
              </div>
            </div>
            <div className="space-y-3">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-md border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {task.icon}
                      <span className="font-medium text-sm">{task.title}</span>
                </div>
                    <Tag color="blue" className="text-xs">{task.count}</Tag>
              </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
        
        {/* Class Overview Section */}
        <Col xs={24} lg={8}>
          <Card className="h-full shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TeamOutlined className="text-green-500" />
                <Title level={5} className="m-0">Class Overview</Title>
              </div>
            </div>
            <div className="space-y-3">
              {classOverview.map((cls, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-md border border-gray-200">
                <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">{cls.class}</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                      {cls.students} students
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{cls.subject}</span>
                    <span className="font-medium">Average score: {cls.score}</span>
                </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        {/* Calendar Section */}
        <Col xs={24} lg={8}>
          <Card className="h-full shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CalendarOutlined className="text-purple-500" />
                <Title level={5} className="m-0">Calendar</Title>
              </div>
            </div>
            <div className="space-y-2">
              {calendarActivities.map((activity, index) => (
                <div key={index} className="p-2 bg-gray-50 rounded-md border border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 font-medium">{activity.time}</span>
                  </div>
                  <div className="text-sm mt-1">
                    <span className="text-gray-700">{activity.title.split(':')[0]}: </span>
                    <a href="#" className="text-blue-600 hover:underline">{activity.link}</a>
                </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} className="mt-6">
        {/* Student Performance Graph */}
        <Col xs={24} lg={16}>
          <Card className="shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Title level={5} className="m-0">Student performance</Title>
              <div className="flex gap-2">
                <Select defaultValue="Week 1 - Week 2" size="small" style={{ width: 120 }}>
                  <Select.Option value="Week 1 - Week 2">Week 1 - Week 2</Select.Option>
                </Select>
                <Select defaultValue="Class 1" size="small" style={{ width: 80 }}>
                  <Select.Option value="Class 1">Class 1</Select.Option>
                </Select>
              </div>
            </div>
            <Column {...barConfig} />
          </Card>
        </Col>
        
        {/* Upcoming Deadlines */}
        <Col xs={24} lg={8}>
          <Card className="shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Title level={5} className="m-0">Upcoming Deadlines</Title>
              <Select defaultValue="All classes" size="small" style={{ width: 100 }}>
                <Select.Option value="All classes">All classes</Select.Option>
              </Select>
            </div>
            <div className="space-y-3">
              {upcomingDeadlines.map((deadline, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-md border border-gray-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-sm">{deadline.title}</span>
                    <span className="text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">
                      {deadline.class}
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <ClockCircleOutlined className="mr-1" />
                    <span>Due: {deadline.due}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} className="mt-6">
        {/* Upcoming Lessons */}
        <Col xs={24} lg={12}>
          <Card className="shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Title level={5} className="m-0">Upcoming Lessons</Title>
              <Select defaultValue="Class B" size="small" style={{ width: 100 }}>
                <Select.Option value="Class B">Class B</Select.Option>
              </Select>
            </div>
            <div className="space-y-3">
              {upcomingLessons.map((lesson, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-md border border-gray-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-sm">{lesson.title}</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                      {lesson.class}
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <CalendarOutlined className="mr-1" />
                    <span>{lesson.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        {/* Performance Overview */}
        <Col xs={24} lg={12}>
          <div className="performance-overview-section p-4 bg-white rounded-lg shadow-sm border border-gray-100 h-full">
            <div className="flex justify-between items-center mb-4">
          <Title level={5} className="m-0">Performance Overview</Title>
          <Button type="link" className="p-0 review-report-section">View Reports</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">92%</div>
              <div className="text-xs text-gray-500">Average Attendance</div>
            </div>
          </div>
          <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">87%</div>
              <div className="text-xs text-gray-500">Assignment Completion</div>
            </div>
          </div>
          <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">76%</div>
              <div className="text-xs text-gray-500">Average Test Score</div>
            </div>
          </div>
        </div>
      </div>
        </Col>
      </Row>
    </div>
  );
};

export default MainDashboard;
