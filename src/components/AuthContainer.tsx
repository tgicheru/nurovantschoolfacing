import React from "react";

type Props = {
  children: React.ReactNode;
};
const AuthContainer = ({ children }: Props) => {
  return (
    <div className="w-full flex flex-col lg:flex-row h-full items-center justify-center font-montserrat">
      {/* Left Section*/}
      <div className="w-full lg:w-[45%] h-full bg-authBg bg-cover hidden lg:block" />

      {/* Right Section*/}
      <div className="flex items-center justify-center w-full lg:w-[55%] h-full p-5">
        {children}
      </div>
    </div>
  );
};

export default AuthContainer;
