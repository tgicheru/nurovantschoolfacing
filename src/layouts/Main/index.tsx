import { useRecoilState, useRecoilValue } from "recoil";
import React, { ReactComponentElement } from "react";
import SideBar from "../../components/SideBar";
import menuAtom from "../../atoms/menu/menu.atom";
import { HiOutlineBell } from "react-icons/hi";
import { ModalContainer } from "../../components/ModalContainer";
import { useLocation, useNavigate } from "react-router";
import authAtom from "../../atoms/auth/auth.atom";
import { Button } from "antd";
import { LuLogOut } from "react-icons/lu";

type Props = {
  children: ReactComponentElement<any>;
};
const MainLayout = ({ children }: Props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useRecoilState(menuAtom);
  const { user } = useRecoilValue(authAtom)
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const handleLogout = () => navigate("/auth/logout");
  return (
    <ModalContainer>
      <div className="w-full h-screen flex flex-col md:flex-row p-0 m-0 bg-light font-montserrat">
        <div className="flex justify-between items-center md:hidden p-5">
          <div className="text-dark truncate">
            <p className="text-xl font-bold">{`Hello ${user?.info?.name}`}</p>
            <p className="text-sm font-normal">welcome to your dashboard</p>
          </div>
          <Button
            onClick={handleLogout}
            className="text-primary !p-0 !m-0"
            type="text"
            icon={<LuLogOut className="!text-lg !font-medium" />}
          />
        </div>
        {/* sidebar component can come in here  */}
        <div
          className={`w-0 ${
            isOpen ? "md:!w-[5%]" : "md:!w-[20%]"
          } md:h-full ${pathname === "/info" && "hidden"}`}
        >
          <SideBar isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </div>

        <div className={`w-full h-full ${isOpen ? "md:!w-[95%]" : "md:!w-[80%]"} ${pathname === "/info" ? "" : "pt-2"}`}>
          {/* main layout pages children  */}
          <div
            className={`w-full h-full bg-white ${
              pathname === "/info" ? "" : "rounded-t-3xl md:rounded-t-none md:!rounded-l-3xl overflow-y-auto p-5 md:p-0"
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
