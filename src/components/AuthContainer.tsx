import React from "react";
import VideoIcon from "../assets/videoicon.svg";

type Props = {
  children: React.ReactNode;
};
const AuthContainer = ({ children }: Props) => {
  return (
    <div className="w-full flex flex-col lg:flex-row h-full lg:h-screen overflow-hidden items-center justify-center font-montserrat bg-white">
      {/* Left Section*/}

      <div className="w-full lg:w-[45%] bg-primary h-full bg-pattern bg-no-repeat hidden lg:flex flex-col items-center justify-center gap-[18px] text-white">
        <img src={VideoIcon} alt="video-icon" />
        <div className="flex flex-col items-center justify-center gap-[24px]">
          <h1 className="text-[44px] leading-[48px] font-bold tracking-[-0.88px] text-center">
            Record Live Lectures
          </h1>
          <p className="text-[16px] leading-[25px] font-medium tracking-[0.32px] text-center max-w-[427px]">
            Capturing Knowledge, One Live Lecture at a Time.
          </p>
        </div>
      </div>

      {/* Right Section*/}
      <div className="flex items-center justify-center w-full lg:w-[55%] bg-white h-full">
        {children}
      </div>
    </div>
  );
};

export default AuthContainer;
