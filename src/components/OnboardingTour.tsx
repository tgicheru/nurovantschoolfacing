import React, { useState, useEffect, useRef } from 'react';
import { Tour } from 'antd';
import type { TourProps } from 'antd';
import { useRecoilState } from 'recoil';
import authAtom from '../atoms/auth/auth.atom';
import { START_TOUR_EVENT } from './OnboardingModal';

const OnboardingTour: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [auth] = useRecoilState(authAtom);
  
  // References to DOM elements
  const overviewTabRef = useRef<HTMLElement | null>(null);
  const coursesTabRef = useRef<HTMLElement | null>(null);
  const calendarTabRef = useRef<HTMLElement | null>(null);
  const reviewReportTabRef = useRef<HTMLElement | null>(null);
  const studentGroupsSectionRef = useRef<HTMLElement | null>(null);
  const pacingGuideSectionRef = useRef<HTMLElement | null>(null);
  const performanceOverviewSectionRef = useRef<HTMLElement | null>(null);

  // Find and set references to DOM elements
  useEffect(() => {
    overviewTabRef.current = document.querySelector('.overview-tab') as HTMLElement;
    coursesTabRef.current = document.querySelector('.courses-tab') as HTMLElement;
    calendarTabRef.current = document.querySelector('.calendar-tab') as HTMLElement;
    reviewReportTabRef.current = document.querySelector('.review-report-tab') as HTMLElement;
    studentGroupsSectionRef.current = document.querySelector('.student-groups-section') as HTMLElement;
    pacingGuideSectionRef.current = document.querySelector('.pacing-guide-section') as HTMLElement;
    performanceOverviewSectionRef.current = document.querySelector('.performance-overview-section') as HTMLElement;
    
    console.log('DOM references set:', {
      overviewTab: !!overviewTabRef.current,
      coursesTab: !!coursesTabRef.current,
      calendarTab: !!calendarTabRef.current,
      reviewReportTab: !!reviewReportTabRef.current,
      studentGroupsSection: !!studentGroupsSectionRef.current,
      pacingGuideSection: !!pacingGuideSectionRef.current,
      performanceOverviewSection: !!performanceOverviewSectionRef.current
    });
  }, []);

  // Define the tour steps
  const steps: TourProps['steps'] = [
    {
      title: 'Overview Tab',
      description: 'Your Dashboard gives you a unified snapshot of your day, see upcoming lectures, today\'s sessions, and active courses at a glance.',
      target: () => overviewTabRef.current!,
      placement: 'bottom',
    },
    {
      title: 'Courses Tab',
      description: 'View and manage all your courses here. You can create new courses, edit existing ones, and track student progress.',
      target: () => coursesTabRef.current!,
      placement: 'bottom',
    },
    {
      title: 'Calendar Tab',
      description: 'View your schedule, upcoming lectures, and important deadlines in one place. Sync with your Google Calendar for seamless planning.',
      target: () => calendarTabRef.current!,
      placement: 'bottom',
    },
    {
      title: 'Review & Report Tab',
      description: 'Access detailed reports on student performance, attendance, and course progress. Generate insights to improve teaching effectiveness.',
      target: () => reviewReportTabRef.current!,
      placement: 'bottom',
    },
    {
      title: 'Student Groups',
      description: 'Create and manage groups of students for better organization and collaborative learning.',
      target: () => studentGroupsSectionRef.current!,
      placement: 'left',
    },
    {
      title: 'Pacing Guide',
      description: 'Define your course pace by grade level and sync to Google Calendar for seamless planning.',
      target: () => pacingGuideSectionRef.current!,
      placement: 'right',
    },
    {
      title: 'Performance Overview',
      description: 'Track key metrics like attendance, assignment completion, and test scores at a glance.',
      target: () => performanceOverviewSectionRef.current!,
      placement: 'top',
    },
  ];

  // Listen for the custom event to start the tour
  useEffect(() => {
    const handleStartTour = () => {
      console.log('Starting tour from event listener');
      startTour();
    };

    // Add event listener for the custom event
    document.addEventListener(START_TOUR_EVENT, handleStartTour);
    
    // Check if this is the first time the user is seeing the dashboard
    const hasCompletedTour = localStorage.getItem('hasCompletedTour');
    
    if (!hasCompletedTour && auth.isLoggedIn) {
      // Delay to allow the page to render fully
      const timer = setTimeout(() => {
        startTour();
      }, 1000);
      
      return () => {
        clearTimeout(timer);
        document.removeEventListener(START_TOUR_EVENT, handleStartTour);
      };
    }
    
    return () => {
      document.removeEventListener(START_TOUR_EVENT, handleStartTour);
    };
  }, [auth.isLoggedIn]);

  const startTour = () => {
    console.log('Starting tour...');
    setCurrentStep(0);
    setOpen(true);
  };

  const endTour = () => {
    setOpen(false);
    localStorage.setItem('hasCompletedTour', 'true');
  };

  const onChange = (current: number) => {
    console.log('Current step:', current);
    setCurrentStep(current);
  };

  return (
    <Tour
      open={open}
      onClose={endTour}
      steps={steps}
      current={currentStep}
      onChange={onChange}
      zIndex={1500}
      arrow={true}
      mask={false}
      placement="bottom"
      type="primary"
    />
  );
};

export default OnboardingTour;
