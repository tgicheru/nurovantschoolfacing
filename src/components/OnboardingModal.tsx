import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Typography } from 'antd';
import { ArrowRightOutlined, CloseOutlined } from '@ant-design/icons';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import authAtom from '../atoms/auth/auth.atom';
import CustomTourBalloon from './CustomTourBalloon';

const { Title, Paragraph } = Typography;

interface OnboardingStep {
  title: string;
  description: string;
  target: string; // CSS selector for the target element
}

interface OnboardingModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

// Define the event name as a constant for consistency
export const START_TOUR_EVENT = 'startOnboardingTour';

const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  const [visible, setVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [auth] = useRecoilState(authAtom);
  const [tourOpen, setTourOpen] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const navigate = useNavigate();
  
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

  // Define the onboarding steps
  const steps: OnboardingStep[] = [
    {
      title: 'Overview Tab',
      description: 'Your Dashboard gives you a unified snapshot of your day, see upcoming lectures, today\'s sessions, and active courses at a glance.',
      target: '.overview-tab'
    },
    {
      title: 'Courses Tab',
      description: 'View and manage all your courses here. You can create new courses, edit existing ones, and track student progress.',
      target: '.courses-tab'
    },
    {
      title: 'Calendar Tab',
      description: 'View your schedule, upcoming lectures, and important deadlines in one place. Sync with your Google Calendar for seamless planning.',
      target: '.calendar-tab'
    },
    {
      title: 'Review & Report Tab',
      description: 'Access detailed reports on student performance, attendance, and course progress. Generate insights to improve teaching effectiveness.',
      target: '.review-report-tab'
    },
    {
      title: 'Pacing Guide',
      description: 'Define your course pace by grade level and sync to Google Calendar for seamless planning.',
      target: '.pacing-guide-section'
    }
  ];

  // Show modal when component mounts if user hasn't completed onboarding or when isOpen prop changes
  useEffect(() => {
    // If isOpen prop is provided, use it to control visibility
    if (isOpen !== undefined) {
      setVisible(isOpen);
    } else {
      // Otherwise, use the default behavior
      const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
      
      if (!hasSeenOnboarding && auth.isLoggedIn) {
        setVisible(true);
      }
    }
  }, [auth.isLoggedIn, isOpen]);

  // Handle closing the modal
  const handleClose = () => {
    setVisible(false);
    // Mark that the user has seen the onboarding modal
    localStorage.setItem('hasSeenOnboarding', 'true');
    
    // Call the onClose prop if provided
    if (onClose) {
      onClose();
    }
  };

  // Define the tour steps with descriptions for each UI element and routing paths
  const tourSteps = [
    {
      title: 'NUROVANT AI',
      description: 'Your Dashboard gives you a unified snapshot of your day, see upcoming lectures, today\'s sessions, and active courses at a glance.',
      targetSelector: '.overview-tab',
      position: { top: 100, left: 200 }, // Fallback position
      path: '/dashboard' // Route to dashboard
    },
    {
      title: 'NUROVANT AI',
      description: 'View and manage all your courses here. You can create new courses, edit existing ones, and track student progress.',
      targetSelector: '.courses-tab',
      position: { top: 100, left: 300 }, // Fallback position
      path: '/course' // Route to course page
    },
    {
      title: 'NUROVANT AI',
      description: 'View your schedule, upcoming lectures, and important deadlines in one place. Sync with your Google Calendar for seamless planning.',
      targetSelector: '.calendar-tab',
      position: { top: 100, left: 400 }, // Fallback position
      path: '/calendar' // Route to calendar page
    },
    {
      title: 'NUROVANT AI',
      description: 'Access detailed reports on student performance, attendance, and course progress. Generate insights to improve teaching effectiveness.',
      targetSelector: '.review-report-tab',
      position: { top: 100, left: 500 }, // Fallback position
      path: '/reports' // Route to reports page
    },
    {
      title: 'NUROVANT AI',
      description: 'Define your course pace by grade level and sync to Google Calendar for seamless planning.',
      targetSelector: '.pacing-guide-section, .pacing-guide-tab, [data-tour="pacing-guide"]',
      position: { top: 200, left: 500 }, // Fallback position
      path: '/course?section=pacing-guide' // Route to pacing guide section
    },
  ];

  // Start the guided tour
  const startTour = () => {
    console.log('Starting tour...');
    setTourStep(0);
    setTourOpen(true);
    handleClose();
  };

  // Handle clicking on a specific step
  const handleStepClick = (index: number) => {
    // Navigate to the appropriate route
    if (tourSteps[index].path) {
      navigate(tourSteps[index].path);
    }
    
    // Close the modal
    handleClose();
    
    // No longer automatically starting the tour when clicking a list item
    // The tour will only start when the "Start tour" button is clicked
  };

  // Handle tour end
  const endTour = () => {
    setTourOpen(false);
    localStorage.setItem('hasCompletedTour', 'true');
  };

  // Handle tour step change
  const onTourChange = (current: number) => {
    console.log('Current tour step:', current);
    setTourStep(current);
  };

  // Get the position for the balloon based on the step
  const getBalloonPosition = (stepIndex: number) => {
    // For the 5th step (student groups button), use a fixed position
    if (stepIndex === 4) {
      // Fixed position for student groups button balloon
      return { top: 200, left: 100 };
    }
    
    // For the 6th step (class overview section), use a fixed position
    if (stepIndex === 5) {
      // Fixed position for class overview section balloon
      return { top: 300, left: 400 };
    }
    // Try to find the element first
    let element = null;
    let selector = '';
    
    if (stepIndex === 4) { // Student Groups button
      // Try multiple selectors to find the student groups button
      const selectors = [
        '.student-groups-button',
        '[data-tour="student-groups"]',
        '.sidebar-menu-item:nth-child(5)',
        '.sidebar a[href*="groups"]',
        'button:contains("Student Groups")',
        'a:contains("Student Groups")'
      ];
      
      for (const sel of selectors) {
        try {
          const el = document.querySelector(sel);
          if (el) {
            element = el as HTMLElement;
            selector = sel;
            break;
          }
        } catch (e) {
          // Ignore invalid selectors
        }
      }
    } else if (stepIndex === 5) { // Class Overview section
      // Try multiple selectors to find the class overview section
      const selectors = [
        '.class-overview-section',
        '[data-tour="class-overview"]',
        '.dashboard-metrics',
        '.metrics-container',
        '.overview-card',
        '.dashboard-card:first-child'
      ];
      
      for (const sel of selectors) {
        try {
          const el = document.querySelector(sel);
          if (el) {
            element = el as HTMLElement;
            selector = sel;
            break;
          }
        } catch (e) {
          // Ignore invalid selectors
        }
      }
    } else {
      // For other steps, use the provided selector
      selector = tourSteps[stepIndex].targetSelector.split(',')[0];
      element = document.querySelector(selector) as HTMLElement;
    }
    
    // If we found an element, highlight it
    if (element) {
      // Add highlight to the element
      element.style.boxShadow = '0 0 0 4px rgba(79, 70, 229, 0.3)';
      element.style.transition = 'box-shadow 0.3s ease';
      element.style.zIndex = '1000';
      
      const rect = element.getBoundingClientRect();
      
      // Special positioning for student groups button (step 4)
      if (stepIndex === 4) {
        return {
          top: rect.bottom + 15, // Position directly below the button
          left: Math.max(rect.left, 10), // Ensure it's not off-screen
        };
      }
      
      // Special positioning for class overview section (step 5)
      if (stepIndex === 5) {
        return {
          top: rect.top + (rect.height / 2) - 80, // Position at the middle of the section
          left: rect.right + 15, // Position to the right of the section
        };
      }
      
      // Default positioning for other steps
      return {
        top: rect.bottom + 10,
        left: rect.left + (rect.width / 2) - 160,
      };
    }
    
    // Direct positioning for specific steps regardless of element finding
    if (stepIndex === 4) { // Student Groups button
      // Force position directly on the student groups button area
      // These coordinates are based on common sidebar layouts
      const viewportHeight = window.innerHeight;
      const sidebarWidth = 250; // Typical sidebar width
      
      // Try to find any sidebar element to get better positioning
      const sidebar = document.querySelector('.sidebar, .side-nav, nav, aside');
      if (sidebar) {
        const sidebarRect = sidebar.getBoundingClientRect();
        // Position in the middle of the sidebar, about 40% down the page
        return { 
          top: viewportHeight * 0.4, 
          left: sidebarRect.left + (sidebarRect.width / 2) - 160
        };
      }
      
      // Fallback to a reasonable position for the student groups button
      return { top: viewportHeight * 0.4, left: sidebarWidth / 2 - 160 };
    } else if (stepIndex === 5) { // Class Overview section
      // Force position in the main content area where class overview typically is
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Try to find the main content area
      const mainContent = document.querySelector('main, .main-content, .content, #content');
      if (mainContent) {
        const contentRect = mainContent.getBoundingClientRect();
        // Position in the upper part of the main content
        return { 
          top: contentRect.top + 100, 
          left: contentRect.left + (contentRect.width / 2) - 160
        };
      }
      
      // Fallback to a reasonable position for the class overview section
      return { 
        top: viewportHeight * 0.25, 
        left: (viewportWidth - 250) / 2 + 250 - 160
      };
    }
    
    // Default fallback
    return tourSteps[stepIndex].position;
  };

  return (
    <>
      {/* Render the custom tour balloon if the tour is open */}
      {tourOpen && tourSteps[tourStep] && (
        <div style={{ 
          position: 'fixed', 
          zIndex: 1500, 
          ...getBalloonPosition(tourStep) 
        }}>
          <CustomTourBalloon
            title={tourSteps[tourStep].title}
            description={tourSteps[tourStep].description}
            currentStep={tourStep}
            totalSteps={tourSteps.length}
            selector={tourSteps[tourStep].targetSelector}
            onNext={() => {
              // Remove highlight from current element
              const currentSelector = tourSteps[tourStep].targetSelector.split(',')[0];
              const currentElement = document.querySelector(currentSelector) as HTMLElement;
              if (currentElement) {
                currentElement.style.boxShadow = '';
                currentElement.style.zIndex = '';
              }
              
              if (tourStep < tourSteps.length - 1) {
                setTourStep(tourStep + 1);
              } else {
                endTour();
              }
            }}
            onClose={() => {
              // Remove highlight from all elements
              tourSteps.forEach(step => {
                const selector = step.targetSelector.split(',')[0];
                const element = document.querySelector(selector) as HTMLElement;
                if (element) {
                  element.style.boxShadow = '';
                  element.style.zIndex = '';
                }
              });
              endTour();
            }}
          />
        </div>
      )}
      <Modal
        open={visible}
        footer={null}
        closable={true}
        closeIcon={<CloseOutlined />}
        onCancel={handleClose}
        width={600}
        title={
          <div className="flex justify-between items-center">
            <Title level={4} className="m-0">Finish onboarding</Title>
          </div>
        }
      >
        <Paragraph className="text-gray-600 mb-4 text-sm">
          Complete basic onboarding and explore all features.
        </Paragraph>

        <div className="space-y-3">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`flex items-center justify-between p-4 rounded-lg border hover:border-blue-300 cursor-pointer transition-all ${
                currentStep === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
              onClick={() => handleStepClick(index)}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-medium text-sm mt-0.5">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">{step.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{step.description}</p>
                </div>
              </div>
              <ArrowRightOutlined className="text-gray-400" />
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-4 space-x-3">
          <Button size="middle" onClick={handleClose}>Skip for now</Button>
          <Button size="middle" type="primary" onClick={startTour}>Start tour</Button>
        </div>
      </Modal>
    </>
  );
};

export default OnboardingModal;
