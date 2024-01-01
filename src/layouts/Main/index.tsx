import React, { ReactComponentElement } from "react";
import SideBar from "../../components/SideBar";

type Props = {
  children: ReactComponentElement<any>;
};
const MainLayout = ({ children }: Props) => {
  return (
    <div className="w-full h-screen flex p-0 m-0 font-Inter">
      {/* sidebar component can come in here  */}
      <div className="w-full md:w-[20%] lg:w-[25%] bg-gray">
        <SideBar />
      </div>

      <div className="w-full h-full pt-2">
        {/* main layout pages children  */}
        <div className="w-full h-full bg-white rounded-l-3xl overflow-y-auto p-5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
