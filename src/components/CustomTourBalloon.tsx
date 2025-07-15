import React, { useEffect } from 'react';
import { Button } from 'antd';

interface CustomTourBalloonProps {
  title: string;
  description: string;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onClose: () => void;
  selector?: string;
}

const CustomTourBalloon: React.FC<CustomTourBalloonProps> = ({
  title,
  description,
  currentStep,
  totalSteps,
  onNext,
  onClose,
  selector
}) => {
  // Add highlight effect to the active element
  useEffect(() => {
    if (selector) {
      const targetElement = document.querySelector(selector) as HTMLElement;
      if (targetElement) {
        // Save original styles
        const originalBoxShadow = targetElement.style.boxShadow;
        const originalTransition = targetElement.style.transition;
        const originalZIndex = targetElement.style.zIndex;
        
        // Apply highlight effect
        targetElement.style.boxShadow = '0 0 0 4px rgba(79, 70, 229, 0.3)';
        targetElement.style.transition = 'box-shadow 0.3s ease';
        targetElement.style.zIndex = '1000';
        
        // Restore original styles when component unmounts
        return () => {
          targetElement.style.boxShadow = originalBoxShadow;
          targetElement.style.transition = originalTransition;
          targetElement.style.zIndex = originalZIndex;
        };
      }
    }
  }, [selector]);
  return (
    <div className="custom-tour-balloon">
      <div className="tour-header">
        <div className="logo-container">
          <div className="logo-circle">
            <span role="img" aria-label="owl">🦉</span>
          </div>
          <h3 className="logo-title">{title}</h3>
        </div>
      </div>
      <div className="tour-content">
        <p className="tour-description">{description}</p>
      </div>
      <div className="tour-footer">
        <span className="step-indicator">{currentStep + 1} of {totalSteps}</span>
        <Button 
          type="primary" 
          className="next-button" 
          onClick={currentStep === totalSteps - 1 ? onClose : onNext}
        >
          {currentStep === totalSteps - 1 ? 'Finish' : 'Next'}
        </Button>
      </div>

      <style>{`
        .custom-tour-balloon {
          position: absolute;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          padding: 20px;
          width: 320px;
          z-index: 1000;
        }
        
        .tour-header {
          margin-bottom: 12px;
        }
        
        .logo-container {
          display: flex;
          align-items: center;
        }
        
        .logo-circle {
          width: 40px;
          height: 40px;
          background-color: #e8eeff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          font-size: 20px;
        }
        
        .logo-title {
          font-size: 18px;
          font-weight: 600;
          margin: 0;
          color: #333;
        }
        
        .tour-content {
          border-top: 1px solid #f0f0f0;
          padding-top: 12px;
          margin-bottom: 16px;
        }
        
        .tour-description {
          margin: 0;
          font-size: 15px;
          line-height: 1.5;
          color: #333;
        }
        
        .tour-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .step-indicator {
          font-size: 14px;
          color: #666;
        }
        
        .next-button {
          background-color: #4f46e5;
          border-radius: 20px;
          padding: 4px 20px;
          height: auto;
          font-size: 14px;
          font-weight: 500;
          border: none;
        }
        
        .next-button:hover {
          background-color: #4338ca;
        }
      `}</style>
    </div>
  );
};

export default CustomTourBalloon;
