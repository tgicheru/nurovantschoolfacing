import { useRecoilState } from "recoil";
import React, { ReactComponentElement } from "react";
import SideBar from "../../components/SideBar";
import menuAtom from "../../atoms/menu/menu.atom";
import { ModalContainer } from "../../components/ModalContainer";
import { useLocation } from "react-router";

type Props = {
  children: ReactComponentElement<any>;
};
const MainLayout = ({ children }: Props) => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useRecoilState(menuAtom);
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);
  return (
    <ModalContainer>
      <div className="w-full h-screen flex p-0 m-0 bg-light font-montserrat">
        {/* sidebar component can come in here  */}
        <div
          className={`${
            isOpen ? "w-[5%]" : "w-full md:w-[20%]"
          } h-full ${pathname === "/info" && "hidden"}`}
        >
          <SideBar isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </div>

        <div className={`${isOpen ? "w-[95%]" : "w-full md:w-[80%]"} h-full ${pathname === "/info" ? "" : "pt-2"}`}>
          {/* main layout pages children  */}
          <div
            className={`w-full  h-full bg-white ${
              pathname === "/info" ? "" : "rounded-l-3xl overflow-y-auto py-5"
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
