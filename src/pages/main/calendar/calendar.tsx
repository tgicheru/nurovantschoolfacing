import React, { useState, useEffect } from 'react';
import { Calendar, Card, List, Typography, Button, Table, Empty, Tooltip, Tabs, Divider, Tag } from 'antd';
import { Column } from '@ant-design/charts';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import dayjs, { Dayjs } from 'dayjs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import authAtom from '../../../atoms/auth/auth.atom';
import { fetchDashboardData, fetchCalendarActivities, useDashboardService } from '../../../services/dashboard.service';
import './calendar.custom.css'; // We'll create this file for custom styles
import { BookOutlined, LeftOutlined, RightOutlined, ClockCircleOutlined, UserOutlined, FileTextOutlined, CheckCircleOutlined, ScheduleOutlined, PlayCircleOutlined } from '@ant-design/icons';
import MonthlyCalendarWidget, { LectureEvent } from './MonthlyCalendarWidget';

const { Title, Text } = Typography;

const timelineTimes = [
  '8:00 AM', '8:10 AM', '8:20 AM', '8:30 AM', '8:40 AM', '8:50 AM',
  '9:00 AM', '9:10 AM', '9:20 AM', '9:30 AM', '9:40 AM', '9:50 AM', 
  '10:00 AM', '10:10 AM', '10:20 AM', '10:30 AM', '10:40 AM', '10:50 AM',
  '11:00 AM', '11:10 AM', '11:20 AM', '11:30 AM', '11:40 AM', '11:50 AM',
  '12:00 PM', '12:10 PM', '12:20 PM', '12:30 PM', '12:40 PM', '12:50 PM',
  '1:00 PM', '1:10 PM', '1:20 PM', '1:30 PM', '1:40 PM', '1:50 PM',
  '2:00 PM', '2:10 PM', '2:20 PM', '2:30 PM', '2:40 PM', '2:50 PM',
  '3:00 PM', '3:10 PM', '3:20 PM', '3:30 PM', '3:40 PM', '3:50 PM'
];

const fallbackEvents = [
  // Monday Events
  { time: '8:00 AM', title: 'Introduction: Demo with magnet/compass', link: '#', date: '2025-02-03' },
  { time: '8:10 AM', title: 'Quick write: Why circuits matter', link: '#', date: '2025-02-03' },
  { time: '8:20 AM', title: 'Interactive quiz: Kirchhoff laws', link: '#', date: '2025-02-03' },
  { time: '8:30 AM', title: 'Think-pair-share: Charge-flow ideas', link: '#', date: '2025-02-03' },
  { time: '8:40 AM', title: 'Think-pair-share: Charge-flow ideas', link: '#', date: '2025-02-03' },
  { time: '8:50 AM', title: 'Think-pair-share: Charge-flow ideas', link: '#', date: '2025-02-03' },
  { time: '9:00 AM', title: 'Lecture: Electric charges', link: '#', date: '2025-02-03' },
  { time: '9:10 AM', title: 'Group activity: Build a circuit', link: '#', date: '2025-02-03' },
  { time: '9:20 AM', title: 'Performance: Weekly Trend', link: '#', date: '2025-02-03' },
  { time: '9:30 AM', title: 'Closure: Exit ticket review', link: '#', date: '2025-02-03' },
  { time: '10:00 AM', title: 'Demo: How an electroscope works', link: '#', date: '2025-02-03' },
  { time: '10:30 AM', title: 'Cold call: Random student check', link: '#', date: '2025-02-03' },
  { time: '11:00 AM', title: 'Brainstorm: Household circuit examples', link: '#', date: '2025-02-03' },
  { time: '2:00 PM', title: 'Lab Session: Circuit Building', link: '#', date: '2025-02-03' },
  { time: '2:30 PM', title: 'Group Discussion: Ohm\'s Law', link: '#', date: '2025-02-03' },
  { time: '3:00 PM', title: 'Homework Review', link: '#', date: '2025-02-03' },

  // Tuesday Events
  { time: '8:00 AM', title: 'Morning Review: Yesterday\'s concepts', link: '#', date: '2025-02-04' },
  { time: '8:10 AM', title: 'Puzzle: Build a tricky circuit', link: '#', date: '2025-02-04' },
  { time: '8:20 AM', title: 'Puzzle: Build a tricky circuit', link: '#', date: '2025-02-04' },
  { time: '8:30 AM', title: 'Puzzle: Build a tricky circuit', link: '#', date: '2025-02-04' },
  { time: '8:30 AM', title: 'Data analysis: Graph voltage over time', link: '#', date: '2025-02-04' },
  { time: '9:00 AM', title: 'Lecture: Advanced Circuit Theory', link: '#', date: '2025-02-04' },
  { time: '9:30 AM', title: 'Hands-on Activity: Multimeter Usage', link: '#', date: '2025-02-04' },
  { time: '10:00 AM', title: 'Group Work: Circuit Analysis', link: '#', date: '2025-02-04' },
  { time: '10:30 AM', title: 'Quiz: Series vs Parallel Circuits', link: '#', date: '2025-02-04' },
  { time: '11:00 AM', title: 'Discussion: Real-world Applications', link: '#', date: '2025-02-04' },
  { time: '1:00 PM', title: 'Lab: Power Calculations', link: '#', date: '2025-02-04' },
  { time: '2:00 PM', title: 'Project Work: Circuit Design', link: '#', date: '2025-02-04' },
  { time: '3:00 PM', title: 'Presentation: Student Projects', link: '#', date: '2025-02-04' },

  // Wednesday Events
  { time: '8:00 AM', title: 'Introduction: Demo with magnet/compass', link: '#', date: '2025-02-05' },
  { time: '8:10 AM', title: 'Lecture: Build a circuit', link: '#', date: '2025-02-05' },
  { time: '8:30 AM', title: 'Group activity: Build a circuit', link: '#', date: '2025-02-05' },
  { time: '8:50 AM', title: 'Performance: Weekly Trend', link: '#', date: '2025-02-05' },
  { time: '9:00 AM', title: 'Closure: Exit ticket review', link: '#', date: '2025-02-05' },
  { time: '9:00 AM', title: 'Demo: How an electroscope works', link: '#', date: '2025-02-05' },
  { time: '9:20 AM', title: 'Cold call: Random student check', link: '#', date: '2025-02-05' },
  { time: '9:30 AM', title: 'Brainstorm: Household circuit examples', link: '#', date: '2025-02-05' },
  { time: '10:00 AM', title: 'Advanced Lab: Complex Circuits', link: '#', date: '2025-02-05' },
  { time: '10:30 AM', title: 'Troubleshooting Session', link: '#', date: '2025-02-05' },
  { time: '11:00 AM', title: 'Theory: Electromagnetic Induction', link: '#', date: '2025-02-05' },
  { time: '1:00 PM', title: 'Practical: Motor Construction', link: '#', date: '2025-02-05' },
  { time: '2:00 PM', title: 'Group Challenge: Circuit Competition', link: '#', date: '2025-02-05' },
  { time: '3:00 PM', title: 'Review: Week\'s Key Concepts', link: '#', date: '2025-02-05' },

  // Thursday Events
  { time: '8:00 AM', title: 'Morning Quiz: Circuit Basics', link: '#', date: '2025-02-06' },
  { time: '8:10 AM', title: 'Rotation: Component station tasks', link: '#', date: '2025-02-06' },
  { time: '8:30 AM', title: 'Brainstorm: Household circuit examples', link: '#', date: '2025-02-06' },
  { time: '9:00 AM', title: 'Lecture: Digital Electronics Intro', link: '#', date: '2025-02-06' },
  { time: '9:30 AM', title: 'Hands-on: Logic Gates', link: '#', date: '2025-02-06' },
  { time: '10:00 AM', title: 'Lab: Binary Number System', link: '#', date: '2025-02-06' },
  { time: '10:30 AM', title: 'Activity: Truth Tables', link: '#', date: '2025-02-06' },
  { time: '11:00 AM', title: 'Discussion: Computer Logic', link: '#', date: '2025-02-06' },
  { time: '1:00 PM', title: 'Project: Simple Calculator', link: '#', date: '2025-02-06' },
  { time: '2:00 PM', title: 'Group Work: Circuit Simulation', link: '#', date: '2025-02-06' },
  { time: '3:00 PM', title: 'Presentation: Digital Projects', link: '#', date: '2025-02-06' },

  // Friday Events
  { time: '8:00 AM', title: 'Mini lecture: Electric current basics', link: '#', date: '2025-02-07' },
  { time: '8:20 AM', title: 'Organizer: Venn circuit comparisons', link: '#', date: '2025-02-07' },
  { time: '8:30 AM', title: 'Organizer: Venn circuit comparisons', link: '#', date: '2025-02-07' },
  { time: '9:00 AM', title: 'Lecture: AC vs DC Current', link: '#', date: '2025-02-07' },
  { time: '9:30 AM', title: 'Demonstration: Oscilloscope Usage', link: '#', date: '2025-02-07' },
  { time: '10:00 AM', title: 'Lab: AC Circuit Analysis', link: '#', date: '2025-02-07' },
  { time: '10:30 AM', title: 'Activity: Frequency Measurement', link: '#', date: '2025-02-07' },
  { time: '11:00 AM', title: 'Discussion: Power Grid Systems', link: '#', date: '2025-02-07' },
  { time: '1:00 PM', title: 'Field Trip Prep: Power Plant Visit', link: '#', date: '2025-02-07' },
  { time: '2:00 PM', title: 'Group Project: Energy Efficiency', link: '#', date: '2025-02-07' },
  { time: '3:00 PM', title: 'Week Wrap-up: Key Takeaways', link: '#', date: '2025-02-07' },
];

const fallbackLessons = [
  { title: 'Discrete Mathematics Overview', course: 'Mathematics', date: '2025-02-10', startTime: '09:00', endTime: '10:00' },
  { title: 'Trigonometry Basics', course: 'Mathematics', date: '2025-02-12', startTime: '10:00', endTime: '11:00' },
  { title: 'Mathematical Logic and Proofs', course: 'Mathematics', date: '2025-02-14', startTime: '11:00', endTime: '12:00' },
  { title: 'Functions and Graphs', course: 'Mathematics', date: '2025-02-16', startTime: '14:00', endTime: '15:00' },
  { title: 'Probability Theory', course: 'Mathematics', date: '2025-02-18', startTime: '15:00', endTime: '16:00' },
];
const fallbackModifications = [
  { title: 'Discrete Mathematics Overview', course: 'Mathematics', date: '2025-02-01', startTime: '09:00', endTime: '10:00' },
  { title: 'Trigonometry Basics', course: 'Mathematics', date: '2025-02-03', startTime: '10:00', endTime: '11:00' },
  { title: 'Mathematical Logic and Proofs', course: 'Mathematics', date: '2025-02-05', startTime: '11:00', endTime: '12:00' },
  { title: 'Advanced Calculus Techniques', course: 'Mathematics', date: '2025-02-07', startTime: '14:00', endTime: '15:00' },
  { title: 'Mathematical Modeling', course: 'Mathematics', date: '2025-02-09', startTime: '15:00', endTime: '16:00' },
];
const fallbackClassData = [
  { class: 'Class 1', students: 100, subject: 'Algebra', score: '70%' },
  { class: 'Class 2', students: 100, subject: 'Algebra', score: '70%' },
  { class: 'Class 3', students: 100, subject: 'Algebra', score: '70%' },
  { class: 'Class 4', students: 100, subject: 'Algebra', score: '70%' },
];
const fallbackPerformanceData = [
  { week: 'Week 1', score: 80 },
  { week: 'Week 2', score: 70 },
  { week: 'Week 3', score: 75 },
  { week: 'Week 4', score: 90 },
  { week: 'Week 5', score: 78 },
  { week: 'Week 6', score: 85 },
  { week: 'Week 7', score: 88 },
  { week: 'Week 8', score: 82 },
  { week: 'Week 9', score: 77 },
  { week: 'Week 10', score: 50 },
];

// Sample lecture events for the monthly calendar
const sampleLectureEvents: LectureEvent[] = [
  { date: '2025-02-03', title: 'Introduction to Algebra', time: '8:00 AM - 9:30 AM' },
  { date: '2025-02-05', title: 'Linear Equations', time: '9:00 AM - 10:30 AM' },
  { date: '2025-02-05', title: 'Group Activity: Problem Solving', time: '2:00 PM - 3:30 PM' },
  { date: '2025-02-07', title: 'Quadratic Functions', time: '8:00 AM - 9:30 AM' },
  { date: '2025-02-10', title: 'Review Session', time: '10:00 AM - 11:30 AM' },
  { date: '2025-02-12', title: 'Midterm Exam', time: '9:00 AM - 11:00 AM' },
  { date: '2025-02-14', title: 'Graphing Techniques', time: '8:00 AM - 9:30 AM' },
  { date: '2025-02-17', title: 'Student Presentations', time: '2:00 PM - 4:00 PM' },
  { date: '2025-02-19', title: 'Advanced Topics', time: '9:00 AM - 10:30 AM' },
  { date: '2025-02-21', title: 'Practice Problems', time: '8:00 AM - 9:30 AM' },
  { date: '2025-02-24', title: 'Final Review', time: '10:00 AM - 12:00 PM' },
  { date: '2025-02-26', title: 'Final Exam', time: '9:00 AM - 11:00 AM' },
];

const columns = [
  { title: 'Class', dataIndex: 'class', key: 'class' },
  { title: 'Number of Students', dataIndex: 'students', key: 'students' },
  { title: 'Subject taught', dataIndex: 'subject', key: 'subject' },
  { title: 'Average score', dataIndex: 'score', key: 'score' },
];

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

function getWeekDates(selectedDate: Dayjs) {
  // Get Monday of the week
  const monday = selectedDate.startOf('week').add(1, 'day');
  return weekDays.map((_, i) => monday.add(i, 'day'));
}

export default function CustomCalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs('2025-02-05'));
  const [activeTab, setActiveTab] = useState<string>('monthly');
  const [dateRange, setDateRange] = useState<{ start: Dayjs; end: Dayjs }>({
    start: dayjs('2025-02-05').startOf('week').add(1, 'day'), // Monday
    end: dayjs('2025-02-05').startOf('week').add(5, 'day')    // Friday
  });
  const [selectedLecture, setSelectedLecture] = useState<any>(null);
  
  const auth = useRecoilValue(authAtom);
  const dashboardService = useDashboardService();
  const navigate = useNavigate();
  
  // Update date range when selected date changes
  useEffect(() => {
    const weekStart = selectedDate.startOf('week').add(1, 'day'); // Monday
    const weekEnd = selectedDate.startOf('week').add(5, 'day');   // Friday
    setDateRange({ start: weekStart, end: weekEnd });
  }, [selectedDate]);
  
  // Fetch teacher lectures data based on selected date range
  const { data: teacherLecturesData, isLoading: lecturesLoading } = useQuery({
    queryKey: ['teacherLectures'],
    queryFn: async () => {
      // Create authenticated axios instance
      const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL || '',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${auth?.token}`
        }
      });
      
      const response = await axiosInstance.get('/teacher_api/lecture/all');
      return response.data;
    },
    enabled: !!auth?.token,
  });

  const { data: dashboardData } = useQuery({
    queryKey: ['dashboardData'],
    queryFn: () => fetchDashboardData(),
    enabled: !!auth?.token,
  });
  
  // Use real data if available, otherwise fallback
  const lessons = dashboardData?.upcomingLessons || fallbackLessons;
  const modifications = dashboardData?.recentModifications || fallbackModifications;
  const events = dashboardData?.events || fallbackEvents;
  const classData = dashboardData?.classPerformance || fallbackClassData;
  const performanceData = dashboardData?.performanceData || fallbackPerformanceData;

  // Transform API lecture data to calendar events and filter by date range
  const apiLectures = teacherLecturesData?.data?.lectures || [];
  
  // Filter lectures by the selected date range
  const filteredLectures = apiLectures.filter((lecture: any) => {
    const lectureDate = dayjs(lecture.date);
    return lectureDate.isAfter(dateRange.start.subtract(1, 'day')) && 
           lectureDate.isBefore(dateRange.end.add(1, 'day'));
  });
  
  const transformedLectures = filteredLectures.map((lecture: any) => ({
    time: lecture.startTime ? dayjs(lecture.startTime, 'HH:mm').format('h:mm A') : '9:00 AM',
    title: lecture.title,
    link: '#',
    date: lecture.date,
    status: lecture.status,
    course: lecture.course?.course_title || 'Unknown Course',
    course_objective: lecture.course?.course_objective,
    unit: lecture.unit,
    sub_topic: lecture.sub_topic,
    topics: lecture.topics,
    lesson_plan: lecture.lesson_plan,
    quiz: lecture.quiz,
    flash_card: lecture.flash_card,
    recap: lecture.recap,
    creative_assessment: lecture.creative_assessment,
    _id: lecture._id,
    endTime: lecture.endTime ? dayjs(lecture.endTime, 'HH:mm').format('h:mm A') : '10:00 AM',
    startTime: lecture.startTime ? dayjs(lecture.startTime, 'HH:mm').format('h:mm A') : '9:00 AM'
  }));

  const barConfig = {
    data: performanceData,
    xField: 'week',
    yField: 'score',
    color: '#597ef7',
    columnWidthRatio: 0.6,
    height: 200,
    xAxis: { label: { style: { fill: '#888' } } },
    yAxis: { label: { style: { fill: '#888' } } },
    meta: {
      week: { alias: 'Week' },
      score: { alias: 'Score' },
    },
    isGroup: false,
    isStack: false,
    seriesField: undefined,
    barWidthRatio: undefined,
    barStyle: undefined,
  };

  // Timeline event mapping - combine API data with fallback
  const allEvents = [...transformedLectures, ...fallbackEvents];
  const eventMap = Object.fromEntries(allEvents.map((ev: any) => [ev.time, ev]));

  const [weekLectures, setWeekLectures] = useState<any[]>([]);
  const weekDates = getWeekDates(selectedDate);

  useEffect(() => {
    const fetchWeek = async () => {
      const start = weekDates[0].format('YYYY-MM-DD');
      const end = weekDates[4].format('YYYY-MM-DD');
      const lectures = await fetchCalendarActivities(start, end);
      setWeekLectures(lectures);
    };
    fetchWeek();
    // eslint-disable-next-line
  }, [selectedDate]);

  // Helper: get event for a day and time
  const getEvent = (date: Dayjs, time: string) => {
    // First try to get from API lectures
    const apiEvent = transformedLectures.find((ev: any) => {
      return (
        ev.date === date.format('YYYY-MM-DD') &&
        ev.time === time
      );
    });
    
    if (apiEvent) return apiEvent;
    
    // Then try to get from weekLectures (API data)
    const weekEvent = weekLectures.find((ev: any) => {
      return (
        ev.date === date.format('YYYY-MM-DD') &&
        ev.startTime && dayjs(ev.startTime, 'HH:mm').format('h:mm A') === time
      );
    });
    
    if (weekEvent) return weekEvent;
    
    // Fallback to static events
    return fallbackEvents.find((ev: any) => {
      return (
        ev.date === date.format('YYYY-MM-DD') &&
        ev.time === time
      );
    });
  };

  // Helper: is date in selected week
  const isDateInSelectedWeek = (date: Dayjs) => {
    const weekStart = weekDates[0];
    const weekEnd = weekDates[4];
    return (
      (date.isAfter(weekStart, 'day') || date.isSame(weekStart, 'day')) &&
      (date.isBefore(weekEnd, 'day') || date.isSame(weekEnd, 'day'))
    );
  };

  // Get upcoming lessons from API data (PENDING status)
  const upcomingLessonsFromAPI = apiLectures
    .filter((lecture: any) => lecture.status === 'PENDING')
    .slice(0, 5)
    .map((lecture: any) => ({
      title: lecture.title,
      course: lecture.course?.course_title || 'Unknown Course',
      date: lecture.date,
      startTime: lecture.startTime,
      endTime: lecture.endTime,
      unit: lecture.unit,
      sub_topic: lecture.sub_topic
    }));

  // Get recent modifications (completed lectures)
  const recentModificationsFromAPI = apiLectures
    .filter((lecture: any) => lecture.status === 'COMPLETED')
    .slice(0, 5)
    .map((lecture: any) => ({
      title: lecture.title,
      course: lecture.course?.course_title || 'Unknown Course',
      date: lecture.date,
      startTime: lecture.startTime,
      endTime: lecture.endTime,
      unit: lecture.unit,
      sub_topic: lecture.sub_topic
    }));

  // Get lectures for the selected week
  const weekLecturesData = filteredLectures.map((lecture: any) => ({
    date: lecture.date,
    title: lecture.title,
    startTime: lecture.startTime,
    endTime: lecture.endTime,
    status: lecture.status,
    course: lecture.course?.course_title,
    course_objective: lecture.course?.course_objective,
    unit: lecture.unit,
    sub_topic: lecture.sub_topic,
    topics: lecture.topics,
    lesson_plan: lecture.lesson_plan,
    quiz: lecture.quiz,
    flash_card: lecture.flash_card,
    recap: lecture.recap,
    creative_assessment: lecture.creative_assessment,
    _id: lecture._id
  }));

  // Handle date selection from calendar
  const handleDateSelect = (date: Dayjs) => {
    setSelectedDate(date);
    // Update the week view to show the week containing the selected date
    const weekStart = date.startOf('week').add(1, 'day'); // Monday
    const weekEnd = date.startOf('week').add(5, 'day');   // Friday
    setDateRange({ start: weekStart, end: weekEnd });
  };

  // Handle lecture click
  const handleLectureClick = (lecture: any) => {
    setSelectedLecture(lecture);
  };

  // Handle opening lecture
  const handleOpenLecture = () => {
    if (selectedLecture) {
      // Navigate to course page with course ID and lecture ID as query parameters
      const courseId = selectedLecture.course?._id || selectedLecture._id;
      const lectureId = selectedLecture._id;
      navigate(`/course?id=${courseId}&lecture=${lectureId}`);
    }
  };

  return (
    <div className="calendar-root">
      <div className="calendar-main-grid">
        {/* Sidebar */}
        <div className="calendar-sidebar">
          <Card className="calendar-card calendar-date-card">
            <Calendar 
              fullscreen={false}
              value={selectedDate}
              onSelect={handleDateSelect}
              headerRender={({ value, onChange }) => {
                const current = value.clone();
                const prevMonth = () => onChange(current.subtract(1, 'month'));
                const nextMonth = () => onChange(current.add(1, 'month'));
                return (
                  <div className="calendar-custom-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <Button size="small" onClick={prevMonth}>&lt;</Button>
                    <span className="calendar-header-date" style={{ fontWeight: 600 }}>{current.format('MMMM YYYY')}</span>
                    <Button size="small" onClick={nextMonth}>&gt;</Button>
                  </div>
                );
              }}
              dateFullCellRender={date => {
                const isSelected = date.isSame(selectedDate, 'date');
                const isToday = date.isSame(dayjs(), 'date');
                const inWeek = isDateInSelectedWeek(date);
                return (
                  <div
                    className={
                      'calendar-date-cell' +
                      (isSelected ? ' selected-date-circle' : '') +
                      (isToday ? ' today-date-circle' : '') +
                      (inWeek ? ' week-highlight-cell' : '')
                    }
                    style={{
                      border: inWeek ? '2px solid #2f54eb' : undefined,
                      background: isSelected ? '#2f54eb' : isToday ? '#e6f7ff' : inWeek ? '#f0f5ff' : undefined,
                      color: isSelected ? '#fff' : isToday ? '#2f54eb' : '#222',
                      fontWeight: isSelected || isToday ? 700 : 400,
                      borderRadius: '50%',
                      width: 36,
                      height: 36,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto',
                      transition: 'all 0.2s',
                      cursor: 'pointer',
                    }}
                  >
                    {date.date()}
                  </div>
                );
              }}
            />
          </Card>
          <Card title="Upcoming Lessons" className="calendar-card calendar-list-card">
            <List
              dataSource={upcomingLessonsFromAPI.length > 0 ? upcomingLessonsFromAPI : lessons}
              renderItem={(item: any) => (
                <List.Item className="calendar-list-item">
                  <BookOutlined style={{ color: '#2f54eb', marginRight: 8 }} />
                  <span>{item.title}</span>
                  {item.course && <span style={{ fontSize: '12px', color: '#666', marginLeft: 8 }}>({item.course})</span>}
                  {item.date && <span style={{ fontSize: '12px', color: '#666', marginLeft: 8 }}>({item.date})</span>}
                  {item.startTime && item.endTime && <span style={{ fontSize: '12px', color: '#666', marginLeft: 8 }}>({item.startTime} - {item.endTime})</span>}
                </List.Item>
              )}
            />
          </Card>
          <Card title="Recent Modifications" className="calendar-card calendar-list-card">
            <List
              dataSource={recentModificationsFromAPI.length > 0 ? recentModificationsFromAPI : modifications}
              renderItem={(item: any) => (
                <List.Item className="calendar-list-item">
                  <BookOutlined style={{ color: '#2f54eb', marginRight: 8 }} />
                  <span>{item.title}</span>
                  {item.course && <span style={{ fontSize: '12px', color: '#666', marginLeft: 8 }}>({item.course})</span>}
                  {item.date && <span style={{ fontSize: '12px', color: '#666', marginLeft: 8 }}>({item.date})</span>}
                  {item.startTime && item.endTime && <span style={{ fontSize: '12px', color: '#666', marginLeft: 8 }}>({item.startTime} - {item.endTime})</span>}
                </List.Item>
              )}
            />
          </Card>
        </div>
        {/* Main Timeline */}
        <div className="calendar-timeline-section">
          <Card className="calendar-card calendar-timeline-card">
            <div className="calendar-timeline-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Button type="text" size="small" icon={<LeftOutlined />} />
                  <span style={{ fontWeight: 600, fontSize: 18 }}>
                    {dateRange.start.format('MMM D')} - {dateRange.end.format('D, YYYY')}
                  </span>
                  <Button type="text" size="small" icon={<RightOutlined />} />
                </div>
              </div>
              <Button className="calendar-timeline-view-btn">Week</Button>
            </div>
            <div className="calendar-week-grid">
              <div className="calendar-time-column">
                <div className="calendar-time-header">GMT+1</div>
                {timelineTimes.map((time) => (
                  <div key={time} className="calendar-time-slot">
                    {time}
                  </div>
                ))}
              </div>
              {weekDates.map((date, colIdx) => (
                <div key={colIdx} className="calendar-day-column">
                  <div 
                    className={`calendar-day-header ${date.isSame(selectedDate, 'date') ? 'selected-day' : ''}`}
                    onClick={() => handleDateSelect(date)}
                  >
                    <div className="day-name">{weekDays[colIdx]}</div>
                    <div className="day-number">{date.format('D')}</div>
                  </div>
                  {timelineTimes.map((time, rowIdx) => {
                    const event = getEvent(date, time);
                    // Also check for events that might span multiple time slots
                    const spanningEvent = weekLecturesData.find((lecture: any) => {
                      const lectureStartTime = lecture.startTime ? dayjs(lecture.startTime, 'HH:mm').format('h:mm A') : '9:00 AM';
                      const lectureEndTime = lecture.endTime ? dayjs(lecture.endTime, 'HH:mm').format('h:mm A') : '10:00 AM';
                      const currentTime = dayjs(time, 'h:mm A');
                      const startTime = dayjs(lectureStartTime, 'h:mm A');
                      const endTime = dayjs(lectureEndTime, 'h:mm A');
                      
                      return (
                        lecture.date === date.format('YYYY-MM-DD') &&
                        currentTime.isAfter(startTime.subtract(1, 'minute')) &&
                        currentTime.isBefore(endTime.add(1, 'minute'))
                      );
                    });
                    
                    const displayEvent = event || spanningEvent;
                    
                  return (
                      <div key={rowIdx} className="calendar-time-cell">
                        {displayEvent ? (
                          <div 
                            className="calendar-event-block" 
                            style={{
                              backgroundColor: displayEvent.status === 'PENDING' ? '#e6f7ff' : '#f6ffed',
                              border: displayEvent.status === 'PENDING' ? '1px solid #91d5ff' : '1px solid #b7eb8f',
                              borderRadius: '4px',
                              padding: '4px 8px',
                              margin: '2px',
                              fontSize: '11px',
                              cursor: 'pointer',
                              position: 'relative',
                              transition: 'all 0.2s ease'
                            }}
                            onClick={() => handleLectureClick(displayEvent)}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'scale(1.02)';
                              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'scale(1)';
                              e.currentTarget.style.boxShadow = 'none';
                            }}
                          >
                            <div className="event-content">
                              <div style={{ fontWeight: 'bold', fontSize: '10px' }}>
                                {displayEvent.title}
                              </div>
                              {displayEvent.course && (
                                <div style={{ fontSize: '9px', color: '#666' }}>
                                  {displayEvent.course}
                                </div>
                              )}
                              {displayEvent.startTime && displayEvent.endTime && (
                                <div style={{ fontSize: '9px', color: '#666' }}>
                                  {displayEvent.startTime} - {displayEvent.endTime}
                                </div>
                              )}
                        </div>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </Card>

          
          {/* Lecture Details Section */}
          {selectedLecture && (
            <Card 
              className="calendar-card calendar-details-card" 
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <FileTextOutlined style={{ color: '#2f54eb' }} />
                  <span>Lecture Details</span>
                </div>
              }
              style={{ marginTop: 16 }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                {/* Left Column - Basic Info */}
                <div>
                  <div style={{ marginBottom: 16 }}>
                    <Title level={4} style={{ marginBottom: 8, color: '#2f54eb' }}>
                      {selectedLecture.title}
                    </Title>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                      <Tag color={selectedLecture.status === 'PENDING' ? 'blue' : 'green'} icon={selectedLecture.status === 'PENDING' ? <ScheduleOutlined /> : <CheckCircleOutlined />}>
                        {selectedLecture.status}
                      </Tag>
                      <Text type="secondary">
                        <ClockCircleOutlined style={{ marginRight: 4 }} />
                        {selectedLecture.startTime} - {selectedLecture.endTime}
                      </Text>
                    </div>
                    {selectedLecture.course && (
                      <Text strong style={{ display: 'block', marginBottom: 8 }}>
                        Course: {selectedLecture.course}
                      </Text>
                    )}
                    {selectedLecture.unit && (
                      <Text style={{ display: 'block', marginBottom: 4 }}>
                        Unit: {selectedLecture.unit}
                      </Text>
                    )}
                    {selectedLecture.sub_topic && (
                      <Text style={{ display: 'block', marginBottom: 8 }}>
                        Sub-topic: {selectedLecture.sub_topic}
                      </Text>
                    )}
                  </div>
                  
                  {/* Course Objectives */}
                  {selectedLecture.course_objective && (
                    <div style={{ marginBottom: 16 }}>
                      <Title level={5} style={{ marginBottom: 8 }}>
                        <BookOutlined style={{ marginRight: 8 }} />
                        Course Objectives
                      </Title>
                      <Text style={{ lineHeight: 1.6, color: '#666' }}>
                        {selectedLecture.course_objective}
                      </Text>
                    </div>
                  )}
            </div>
            
                {/* Right Column - Topics and Additional Info */}
                <div>
                  {/* Topics */}
                  {selectedLecture.topics && selectedLecture.topics.length > 0 && (
                    <div style={{ marginBottom: 16 }}>
                      <Title level={5} style={{ marginBottom: 8 }}>
                        <FileTextOutlined style={{ marginRight: 8 }} />
                        Topics Covered
                      </Title>
                      <ul style={{ paddingLeft: 16, margin: 0 }}>
                        {selectedLecture.topics.map((topic: string, index: number) => (
                          <li key={index} style={{ marginBottom: 4, color: '#666' }}>
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Lesson Plan Info */}
                  {selectedLecture.lesson_plan && (
                    <div style={{ marginBottom: 16 }}>
                      <Title level={5} style={{ marginBottom: 8 }}>
                        <UserOutlined style={{ marginRight: 8 }} />
                        Lesson Plan
                      </Title>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <Text type="secondary">
                          Duration: {selectedLecture.lesson_plan.duration} minutes
                        </Text>
              </div>
                      {selectedLecture.lesson_plan.materials_needed && selectedLecture.lesson_plan.materials_needed.length > 0 && (
                        <div>
                          <Text strong style={{ display: 'block', marginBottom: 4 }}>Materials Needed:</Text>
                          <ul style={{ paddingLeft: 16, margin: 0 }}>
                            {selectedLecture.lesson_plan.materials_needed.map((material: string, index: number) => (
                              <li key={index} style={{ marginBottom: 2, color: '#666', fontSize: '12px' }}>
                                {material}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Quiz Info */}
                  {selectedLecture.quiz && (
                    <div style={{ marginBottom: 16 }}>
                      <Title level={5} style={{ marginBottom: 8 }}>
                        <CheckCircleOutlined style={{ marginRight: 8 }} />
                        Quiz Details
                      </Title>
                      <Text style={{ display: 'block', marginBottom: 4 }}>
                        Duration: {selectedLecture.quiz.duration} minutes
                      </Text>
                      {selectedLecture.quiz.mcq && (
                        <Text style={{ display: 'block', marginBottom: 4 }}>
                          Questions: {selectedLecture.quiz.mcq.length} MCQ
                        </Text>
                      )}
                    </div>
                  )}
                  
                  {/* Flash Cards Info */}
                  {selectedLecture.flash_card && (
                    <div style={{ marginBottom: 16 }}>
                      <Title level={5} style={{ marginBottom: 8 }}>
                        <BookOutlined style={{ marginRight: 8 }} />
                        Flash Cards
                      </Title>
                      <Text style={{ display: 'block', marginBottom: 4 }}>
                        Grade Level: {selectedLecture.flash_card.grade_level}
                      </Text>
                      {selectedLecture.flash_card.flash_cards && (
                        <Text style={{ display: 'block', marginBottom: 4 }}>
                          Cards: {selectedLecture.flash_card.flash_cards.length}
                        </Text>
                      )}
                          </div>
                  )}
                        </div>
                      </div>
              
              {/* Action Buttons */}
              <Divider />
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                <Button type="default" onClick={() => setSelectedLecture(null)}>
                  Close
                </Button>
                <Button 
                  type="primary" 
                  icon={<PlayCircleOutlined />}
                  onClick={handleOpenLecture}
                >
                  Open Lecture
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
