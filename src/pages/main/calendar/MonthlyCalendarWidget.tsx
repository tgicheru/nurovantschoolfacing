import React, { useState } from 'react';
import { Card, Button, Typography } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import './MonthlyCalendarWidget.css';

const { Text } = Typography;

export interface LectureEvent {
  date: string; // ISO date string e.g. "2024-06-10"
  title: string;
  time: string; // e.g. "8:00 AM - 10:00 AM"
}

interface MonthlyCalendarWidgetProps {
  events?: LectureEvent[];
  onDateSelect?: (date: Dayjs) => void;
  selectedDate?: Dayjs;
}

const MonthlyCalendarWidget: React.FC<MonthlyCalendarWidgetProps> = ({
  events = [],
  onDateSelect,
  selectedDate = dayjs()
}) => {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());
  const today = dayjs();

  // Get the first day of the month and the number of days in the month
  const firstDayOfMonth = currentMonth.startOf('month');
  const daysInMonth = currentMonth.daysInMonth();
  
  // Get the day of week for the first day (0 = Sunday, 1 = Monday, etc.)
  const firstDayWeekday = firstDayOfMonth.day();
  
  // Calculate how many days from previous month to show
  const daysFromPrevMonth = firstDayWeekday === 0 ? 6 : firstDayWeekday - 1;
  
  // Generate calendar grid
  const generateCalendarDays = () => {
    const days = [];
    
    // Add days from previous month
    const prevMonth = currentMonth.subtract(1, 'month');
    const daysInPrevMonth = prevMonth.daysInMonth();
    for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
      days.push({
        date: prevMonth.date(daysInPrevMonth - i),
        isCurrentMonth: false,
        isToday: false,
        events: []
      });
    }
    
    // Add days from current month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = currentMonth.date(i);
      const dateString = date.format('YYYY-MM-DD');
      const dayEvents = events.filter(event => event.date === dateString);
      
      days.push({
        date,
        isCurrentMonth: true,
        isToday: date.isSame(today, 'day'),
        events: dayEvents
      });
    }
    
    // Add days from next month to complete the grid
    const remainingDays = 42 - days.length; // 6 rows * 7 days = 42
    const nextMonth = currentMonth.add(1, 'month');
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: nextMonth.date(i),
        isCurrentMonth: false,
        isToday: false,
        events: []
      });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const handlePreviousMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, 'month'));
  };

  const handleDateClick = (date: Dayjs) => {
    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  const getEventColor = (index: number) => {
    const colors = ['#52c41a', '#722ed1', '#1890ff', '#fa8c16', '#eb2f96', '#13c2c2'];
    return colors[index % colors.length];
  };

  return (
    <Card className="monthly-calendar-widget">
      {/* Header */}
      <div className="calendar-header">
        <Button 
          type="text" 
          icon={<LeftOutlined />} 
          onClick={handlePreviousMonth}
          className="calendar-nav-button"
        />
        <Text className="calendar-month-title">
          {currentMonth.format('MMMM YYYY')}
        </Text>
        <Button 
          type="text" 
          icon={<RightOutlined />} 
          onClick={handleNextMonth}
          className="calendar-nav-button"
        />
      </div>

      {/* Week days header */}
      <div className="calendar-weekdays">
        {weekDays.map(day => (
          <div key={day} className="calendar-weekday">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="calendar-grid">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`calendar-day ${
              !day.isCurrentMonth ? 'other-month' : ''
            } ${day.isToday ? 'today' : ''} ${
              selectedDate && day.date.isSame(selectedDate, 'day') ? 'selected' : ''
            }`}
            onClick={() => handleDateClick(day.date)}
          >
            <div className="day-number">{day.date.date()}</div>
            <div className="day-events">
              {day.events.slice(0, 3).map((event, eventIndex) => (
                <div
                  key={eventIndex}
                  className="day-event"
                  style={{ backgroundColor: getEventColor(eventIndex) }}
                  title={`${event.title} - ${event.time}`}
                >
                  <Text className="event-title">{event.title}</Text>
                  <Text className="event-time">{event.time}</Text>
                </div>
              ))}
              {day.events.length > 3 && (
                <div className="more-events">
                  +{day.events.length - 3} more
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default MonthlyCalendarWidget; 