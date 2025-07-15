import React, { ReactComponentElement } from 'react';

type Props = {
  children: ReactComponentElement<any>;
};

/**
 * Onboarding layout component
 * Provides a clean, minimal layout for the onboarding/product tour screens
 */
const OnboardingLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-[#F5F7FF]">
      {children}
    </div>
  );
};

export default OnboardingLayout;
