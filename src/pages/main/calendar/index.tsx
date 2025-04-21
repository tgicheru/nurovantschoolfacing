import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import authAtom from "../../../atoms/auth/auth.atom";
import { Card, Input, Select, Button, Calendar, Badge, Tooltip, Radio, Spin, Empty, List, Typography, Divider } from 'antd';
import { SearchOutlined, ReloadOutlined, ClockCircleOutlined, CalendarOutlined } from '@ant-design/icons';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useDashboardService, DashboardData, Lecture, CourseDeadline } from '../../../services/dashboard.service';
import { useQuery } from 'react-query';

const { Title, Text } = Typography;

// Define subject types with different colors
interface SubjectType {
  color: string;
  bgColor: string;
}

const subjectTypes: { [key: string]: SubjectType } = {
  algebra: { color: '#4970FC', bgColor: '#EBF0FF' },
  geometry: { color: '#8B5CF6', bgColor: '#F3E8FF' },
  calculus: { color: '#EC4899', bgColor: '#FCE7F3' },
  statistics: { color: '#10B981', bgColor: '#D1FAE5' },
  physics: { color: '#F59E0B', bgColor: '#FEF3C7' },
  chemistry: { color: '#EF4444', bgColor: '#FEE2E2' },
  biology: { color: '#06B6D4', bgColor: '#CFFAFE' },
  literature: { color: '#8B5CF6', bgColor: '#F3E8FF' },
  history: { color: '#F97316', bgColor: '#FFEDD5' },
  programming: { color: '#6366F1', bgColor: '#E0E7FF' },
  'discrete math': { color: '#4970FC', bgColor: '#EBF0FF' },
  'trigonometry': { color: '#8B5CF6', bgColor: '#F3E8FF' },
  'mathematical logic': { color: '#EC4899', bgColor: '#FCE7F3' },
  'functions': { color: '#10B981', bgColor: '#D1FAE5' },
  'probability': { color: '#F59E0B', bgColor: '#FEF3C7' },
  'advanced calculus': { color: '#EF4444', bgColor: '#FEE2E2' },
  'mathematical modeling': { color: '#06B6D4', bgColor: '#CFFAFE' }
};

const CalendarPage: React.FC = () => {
  const navigate = useNavigate();
  const auth = useRecoilValue(authAtom);
  const [value, setValue] = useState<Dayjs>(() => dayjs());
  const [selectedMode, setSelectedMode] = useState<CalendarMode>('month');
  const dashboardService = useDashboardService();

  // Fetch dashboard data using React Query
  const { data: dashboardData, isLoading, error, refetch } = useQuery<DashboardData>(
    'dashboardData',
    async () => {
      const data = await dashboardService.fetchDashboardData();
      return data;
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  // Get course title by course ID
  const getCourseTitle = (courseId: string): string => {
    if (!dashboardData?.userCourses) return 'Unknown Course';
    
    const course = dashboardData.userCourses.find(c => c._id === courseId);
    return course?.course_title || 'Unknown Course';
  };

  // Get subject type based on lecture title
  const getSubjectType = (title: string): string => {
    const lowerTitle = title.toLowerCase();
    
    if (lowerTitle.includes('algebra')) return 'algebra';
    if (lowerTitle.includes('geometry')) return 'geometry';
    if (lowerTitle.includes('calculus')) return 'calculus';
    if (lowerTitle.includes('math')) return 'discrete math';
    if (lowerTitle.includes('number')) return 'trigonometry';
    if (lowerTitle.includes('data')) return 'statistics';
    if (lowerTitle.includes('fraction')) return 'probability';
    if (lowerTitle.includes('measurement')) return 'functions';
    
    // Default subject type
    return 'algebra';
  };

  // Navigate to lecture detail page
  const navigateToLecture = (lectureId: string, courseId: string) => {
    navigate(`/course?id=${courseId}&lecture=${lectureId}`);
  };

  // Handle calendar cell rendering
  const dateCellRender = (value: Dayjs) => {
    if (!dashboardData?.upcomingLectures) return null;
    
    const dateStr = value.format('YYYY-MM-DD');
    const lectures = dashboardData.upcomingLectures.filter(lecture => lecture.date === dateStr);
    
    if (lectures.length === 0) return null;
    
    return (
      <ul className="events p-0 m-0 list-none">
        {lectures.slice(0, 3).map((lecture, index) => {
          const subject = getSubjectType(lecture.title);
          
          return (
            <li key={index} className="mb-2">
              <div 
                className="cursor-pointer rounded-md p-1 hover:brightness-95 transition-all"
                style={{ backgroundColor: subjectTypes[subject]?.bgColor || '#EBF0FF' }}
                onClick={() => navigateToLecture(lecture._id, lecture.course)}
              >
                <Tooltip title={`${lecture.title} - ${getCourseTitle(lecture.course)}`}>
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-1 flex-shrink-0" 
                      style={{ backgroundColor: subjectTypes[subject]?.color || '#4970FC' }}
                    ></div>
                    <Text 
                      strong 
                      className="text-xs truncate block w-full" 
                      style={{ color: subjectTypes[subject]?.color || '#4970FC' }}
                    >
                      {lecture.title.length > 20 ? `${lecture.title.substring(0, 20)}...` : lecture.title}
                    </Text>
                  </div>
                </Tooltip>
              </div>
            </li>
          );
        })}
        {lectures.length > 3 && (
          <li>
            <div className="text-xs font-medium text-gray-500 bg-gray-100 rounded-md p-1 text-center">
              +{lectures.length - 3} more
            </div>
          </li>
        )}
      </ul>
    );
  };

  // Handle calendar header rendering
  const headerRender = ({ value, type, onChange, onTypeChange }: any) => {
    const start = 0;
    const end = 12;
    const monthOptions = [];

    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];

    for (let i = start; i < end; i++) {
      monthOptions.push(
        <Select.Option key={i} value={i}>
          {months[i]}
        </Select.Option>,
      );
    }

    const year = value.year();
    const month = value.month();
    const options = [];
    for (let i = year - 10; i < year + 10; i += 1) {
      options.push(
        <Select.Option key={i} value={i}>
          {i}
        </Select.Option>,
      );
    }
    return (
      <div className="calendar-header flex justify-between items-center mb-4">
        <div className="calendar-header-left flex items-center gap-2">
          <Button 
            type="text"
            shape="circle"
            icon={<LeftCircleOutlined className="text-xl text-gray-500" />}
            onClick={() => {
              const newValue = value.clone().subtract(1, 'month');
              onChange(newValue);
            }}
          />
          <Select
            size="small"
            dropdownMatchSelectWidth={false}
            value={month}
            onChange={(newMonth) => {
              const newValue = value.clone().month(newMonth);
              onChange(newValue);
            }}
          >
            {monthOptions}
          </Select>
          <Select
            size="small"
            dropdownMatchSelectWidth={false}
            className="my-year-select"
            value={year}
            onChange={(newYear) => {
              const newValue = value.clone().year(newYear);
              onChange(newValue);
            }}
          >
            {options}
          </Select>
          <Button 
            type="text"
            shape="circle"
            icon={<RightCircleOutlined className="text-xl text-gray-500" />}
            onClick={() => {
              const newValue = value.clone().add(1, 'month');
              onChange(newValue);
            }}
          />
        </div>
        <div className="calendar-header-right flex items-center gap-2">
          <Button 
            icon={<ReloadOutlined />} 
            size="small" 
            onClick={() => refetch()}
            loading={isLoading}
          >
            Refresh
          </Button>
          <Radio.Group 
            value={selectedMode} 
            onChange={(e) => {
              setSelectedMode(e.target.value);
              onTypeChange(e.target.value);
            }}
          >
            <Radio.Button value="month">Month</Radio.Button>
            <Radio.Button value="year">Year</Radio.Button>
          </Radio.Group>
        </div>
      </div>
    );
  };

  return (
    <div className="p-3 sm:p-6">
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
        <Title level={4} className="mb-2 sm:mb-0">Calendar</Title>
        <div className="w-full sm:w-auto">
          <Input 
            prefix={<SearchOutlined className="text-gray-400" />} 
            placeholder="Search lectures" 
            className="w-full sm:w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Main Calendar */}
        <div className="lg:col-span-2 bg-white p-3 sm:p-6 rounded-lg shadow-sm overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-64 sm:h-96">
              <Spin size="large" />
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-64 sm:h-96">
              <Empty 
                description="Error loading calendar data" 
                image={Empty.PRESENTED_IMAGE_SIMPLE} 
              />
            </div>
          ) : (
            <div className="min-w-[320px]">
              <Calendar 
                value={value}
                onChange={(newValue) => setValue(newValue)}
                mode={selectedMode}
                dateCellRender={dateCellRender}
                headerRender={headerRender}
                className="custom-calendar"
                fullscreen={false}
              />
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Upcoming Lectures */}
          <Card 
            title={
              <div className="flex items-center gap-2">
                <CalendarOutlined className="text-[#4970FC]" />
                <span className="text-sm sm:text-base">Upcoming Lectures</span>
              </div>
            } 
            className="mb-4 sm:mb-6"
            bodyStyle={{ padding: '12px 16px' }}
          >
            {isLoading ? (
              <div className="flex justify-center items-center py-4">
                <Spin />
              </div>
            ) : !dashboardData?.upcomingLectures || dashboardData.upcomingLectures.length === 0 ? (
              <Empty description="No upcoming lectures" image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
              <List
                dataSource={dashboardData.upcomingLectures.slice(0, 5)}
                renderItem={(lecture) => {
                  const subject = getSubjectType(lecture.title);
                  return (
                    <List.Item 
                      className="hover:bg-gray-50 rounded-lg cursor-pointer transition-all"
                      onClick={() => navigateToLecture(lecture._id, lecture.course)}
                    >
                      <div className="w-full">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center max-w-[70%]">
                            <div 
                              className="w-2 sm:w-3 h-12 rounded-l-md mr-2" 
                              style={{ backgroundColor: subjectTypes[subject]?.color || '#4970FC' }}
                            ></div>
                            <Text 
                              strong 
                              style={{ fontSize: '13px' }}
                              ellipsis={{ tooltip: lecture.title }}
                            >
                              {lecture.title}
                            </Text>
                          </div>
                          <Badge 
                            className="ml-1 sm:ml-2 flex-shrink-0"
                            color={lecture.status === 'PENDING' ? '#faad14' : '#52c41a'} 
                            text={<Text style={{ fontSize: '11px' }}>{lecture.status}</Text>} 
                          />
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 pl-4 sm:pl-5 gap-1 sm:gap-0">
                          <Text type="secondary" style={{ fontSize: '11px' }} ellipsis>{getCourseTitle(lecture.course)}</Text>
                          <div className="flex items-center bg-gray-100 px-2 py-1 rounded-md text-nowrap">
                            <ClockCircleOutlined className="mr-1 text-gray-500" />
                            <Text type="secondary" style={{ fontSize: '11px' }}>
                              {lecture.date} {lecture.startTime && lecture.endTime ? 
                                `(${lecture.startTime}-${lecture.endTime})` : ''}
                            </Text>
                          </div>
                        </div>
                      </div>
                    </List.Item>
                  );
                }}
              />
            )}
          </Card>

          {/* Pending Deadlines */}
          <Card 
            title={
              <div className="flex items-center gap-2">
                <ClockCircleOutlined className="text-[#faad14]" />
                <span className="text-sm sm:text-base">Pending Deadlines</span>
              </div>
            }
            bodyStyle={{ padding: '12px 16px' }}
          >
            {isLoading ? (
              <div className="flex justify-center items-center py-4">
                <Spin />
              </div>
            ) : !dashboardData?.upcomingCourseDeadlines || dashboardData.upcomingCourseDeadlines.length === 0 ? (
              <Empty description="No pending deadlines" image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
              <List
                dataSource={dashboardData.upcomingCourseDeadlines}
                renderItem={(item) => {
                  const { course, lecture } = item;
                  const subject = getSubjectType(lecture.title);
                  return (
                    <List.Item 
                      className="hover:bg-gray-50 rounded-lg cursor-pointer transition-all"
                      onClick={() => navigateToLecture(lecture._id, lecture.course)}
                    >
                      <div className="w-full">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center max-w-[70%]">
                            <div 
                              className="w-2 sm:w-3 h-12 rounded-l-md mr-2" 
                              style={{ backgroundColor: subjectTypes[subject]?.color || '#F59E0B' }}
                            ></div>
                            <Text 
                              strong 
                              style={{ fontSize: '13px' }}
                              ellipsis={{ tooltip: lecture.title }}
                            >
                              {lecture.title}
                            </Text>
                          </div>
                          <Badge 
                            className="ml-1 sm:ml-2 flex-shrink-0"
                            color="#faad14" 
                            text={<Text style={{ fontSize: '11px' }}>{lecture.status}</Text>} 
                          />
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 pl-4 sm:pl-5 gap-1 sm:gap-0">
                          <Text type="secondary" style={{ fontSize: '11px' }} ellipsis>{course.course_title}</Text>
                          <div className="flex items-center bg-gray-100 px-2 py-1 rounded-md text-nowrap">
                            <ClockCircleOutlined className="mr-1 text-gray-500" />
                            <Text type="secondary" style={{ fontSize: '11px' }}>
                              {lecture.date} {lecture.startTime && lecture.endTime ? 
                                `(${lecture.startTime}-${lecture.endTime})` : ''}
                            </Text>
                          </div>
                        </div>
                      </div>
                    </List.Item>
                  );
                }}
              />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
