import { useRecoilState } from "recoil";
import React, { ReactComponentElement } from "react";
import SideBar from "../../components/SideBar";
import menuAtom from "../../atoms/menu/menu.atom";

type Props = {
  children: ReactComponentElement<any>;
};
const MainLayout = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useRecoilState(menuAtom)
  const onClose = () => setIsOpen(false)
  const onOpen = () => setIsOpen(true)
  return (
    <div className="w-full h-screen flex p-0 m-0 bg-light font-Inter">
      {/* sidebar component can come in here  */}
      <div className={`${isOpen?"w-[5%]":"w-full md:w-[20%] lg:w-[25%]"} h-full`}>
        <SideBar isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      </div>

      <div className="w-full h-full pt-2">
        {/* main layout pages children  */}
        <div className="w-full h-full bg-white rounded-l-3xl overflow-y-auto py-5">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
