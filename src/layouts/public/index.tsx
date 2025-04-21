import React, { ReactComponentElement } from "react";
import logo from "../../assets/logo.png";
import { Image } from "antd";
import { useLocation } from "react-router-dom";

type Props = {
  children: ReactComponentElement<any>;
};
const PublicLayout = ({ children }: Props) => {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <div className="w-full min-h-screen bg-white overflow-y-auto">
      {!isAdminRoute && (
        <div className="flex items-center justify-center w-full py-[2.5rem]">
          <Image
            alt="logo"
            src={logo}
            preview={false}
            className="w-auto mx-auto"
          />
        </div>
      )}
      <div className={isAdminRoute ? 'w-full' : 'w-full flex justify-center items-center h-full py-[2.5rem]'}>
        {children}
      </div>
    </div>
  );
};

export default PublicLayout;
