import { useRecoilState, useRecoilValue } from "recoil";
import React, { ReactComponentElement } from "react";
import SideBar from "../../components/SideBar";
import menuAtom from "../../atoms/menu/menu.atom";
import { HiOutlineBell } from "react-icons/hi";
import { ModalContainer } from "../../components/ModalContainer";
import { useLocation } from "react-router";
import authAtom from "../../atoms/auth/auth.atom";

type Props = {
  children: ReactComponentElement<any>;
};
const MainLayout = ({ children }: Props) => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useRecoilState(menuAtom);
  const { user } = useRecoilValue(authAtom)
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);
  return (
    <ModalContainer>
      <div className="w-full h-screen flex p-0 m-0 bg-light font-montserrat">
        <div className="flex justify-between items-center md:hidden p-5">
          <div className="text-white space-y-">
            <p className="text-xl font-bold">{`Hello ${user?.info?.name}`}</p>
            <p className="text-sm font-normal">welcome to your dashboard</p>
          </div>
          <HiOutlineBell className="text-2xl text-white" />
        </div>
        {/* sidebar component can come in here  */}
        <div
          className={`w-0 md:w-[20%]${
            isOpen ? "!md:w-[5%]" : "w-full md:w-[20%]"
          } h-full ${pathname === "/info" && "hidden"}`}
        >
          <SideBar isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </div>

        <div className={`${isOpen ? "w-[95%]" : "w-full md:w-[80%]"} h-full ${pathname === "/info" ? "" : "pt-2"}`}>
          {/* main layout pages children  */}
          <div
            className={`w-full  h-full bg-white ${
              pathname === "/info" ? "" : " rounded-t-3xl md:rounded-t-none md:rounded-l-3xl overflow-y-auto p-5"
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default MainLayout;
