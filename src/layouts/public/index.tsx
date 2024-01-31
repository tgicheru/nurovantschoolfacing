import React, { ReactComponentElement } from "react";
import logo from "../../assets/logo.png";
import { Image } from "antd";

type Props = {
  children: ReactComponentElement<any>;
};
const PublicLayout = ({ children }: Props) => {
  return (
    <div className="w-full h-screen bg-white py-[2.5rem] overflow-hidden">
      <div className="flex items-center justify-center w-full">
        <Image
          alt="logo"
          src={logo}
          preview={false}
          className="w-auto mx-auto"
        />
      </div>
      <div className="w-full flex justify-center items-center h-full">
        {children}
      </div>
    </div>
  );
};

export default PublicLayout;
