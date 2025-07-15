import React, { useState } from 'react';
import { Button, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import OnboardingModal from './OnboardingModal';

const OnboardingButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Tooltip title="Start Onboarding Tour">
        <Button
          type="primary"
          shape="circle"
          icon={<QuestionCircleOutlined />}
          onClick={handleOpenModal}
          className="onboarding-button"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: 1000,
          }}
        />
      </Tooltip>

      <OnboardingModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </>
  );
};

export default OnboardingButton;
