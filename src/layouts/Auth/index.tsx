import React, { ReactComponentElement } from "react";

type Props = {
  children: ReactComponentElement<any>;
};
const AuthLayout = ({ children }: Props) => {
  return (
    <div className="w-full min-h-screen auth-layout flex justify-center items-center">
      <div className="w-full md:w-[50%] lg:w-[35%] mx-auto">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
