import { useRecoilState, useRecoilValue } from "recoil";
import React, { ReactComponentElement, useRef, useEffect } from "react";
import SideBar from "../../components/SideBar";
import menuAtom from "../../atoms/menu/menu.atom";
import { HiOutlineBell } from "react-icons/hi";
import { ModalContainer } from "../../components/ModalContainer";
import { useLocation, useNavigate } from "react-router";
import authAtom from "../../atoms/auth/auth.atom";
import { Avatar, Button, Dropdown } from "antd";
import { LuLogOut } from "react-icons/lu";
import { useGetProfile, useGetUserSub } from "../../hooks/profile/profile";
import Logo from "../../assets/newLogo.svg";
import { extractAvatar } from "../../constants";
import { FaChevronDown } from "react-icons/fa";
import { GoGear } from "react-icons/go";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";

type Props = {
  children: ReactComponentElement<any>;
};
const MainLayout = ({ children }: Props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useRecoilValue(authAtom);

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [pathname]);

  // get user profile
  useGetProfile();

  const items = [
    {
      key: "/",
      label: "Home",
      icon: "",
    },
    {
      key: "/speech-rate",
      label: "Speech Rate",
      icon: "",
    },
    {
      key: "/question-bank",
      label: "Question Bank",
      icon: "",
    },
    {
      key: "/proofreader",
      label: "Proof Reader",
      icon: "",
    },
    {
      key: "/gpt-zero",
      label: "GPT Zero",
      icon: "",
    },
  ];

  const menu = [
    {
      key: "/settings",
      icon: <GoGear className="!text-base" />,
      label: <Link to="/settings">Settings</Link>,
    },
    {
      key: "/auth/logout",
      icon: <FiLogOut className="!text-base" />,
      label: <Link to="/auth/logout">Logout</Link>,
    },
  ]

  const handleMenu = (key: any) => navigate(key);

  const activeLink = (item: { key: string; label: string; icon: string }) => {
    return pathname === item.key || pathname.startsWith(item.key + "/");
  };

  const handleLogout = () => navigate("/auth/logout");
  return (
    <ModalContainer>
      <div className="w-full h-screen flex flex-col p-0 m-0 bg-light font-montserrat">
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
        {/* <div
          className={`w-0 ${isOpen ? "md:!w-[5%]" : "md:!w-[20%]"} md:h-full ${
            pathname === "/auth/info" && "hidden"
          }`}
        >
          <SideBar isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </div> */}
        <div className="md:px-10 bg-white">
          <div className="flex justify-end md:justify-between items-center md:py-5">
            <img src={Logo} alt="logo" className="hidden lg:block" />

            <Dropdown menu={{items:menu}} trigger={["click"]}>
              <div className="hidden md:block">
                <div className="flex items-center gap-3">
                  <Avatar alt="user" size="large" src={user?.info?.profile_img}>
                    {extractAvatar(
                      user?.info?.name || user?.info?.email || "USER"
                    )}
                  </Avatar>
                  <div>
                    <p className="text-[14px] leading-[20px] font-semibold text-secondary">
                      {user?.info?.name}
                    </p>
                    <p className="text-[14px] leading-[20px] font-normal text-gray">
                      {user?.info?.email}
                    </p>
                  </div>

                  <FaChevronDown className="text-[14px] leading-[20px] cursor-pointer" />
                </div>
              </div>
            </Dropdown>
          </div>
          <div className="items-center flex-row gap-4 flex overflow-x-auto">
            {items.map((item) => (
              <div
                key={item.label}
                ref={activeLink(item) ? ref : null}
                className={`px-4 py-2 rounded-t-lg font-medium cursor-pointer ${
                  activeLink(item)
                    ? "bg-primary text-white"
                    : "text-[#414141] bg-[#F5F5F5]"
                }`}
                onClick={() => handleMenu(item.key)}
              >
                <span className="text-[14px] leading-[20px] whitespace-nowrap">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`w-full h-full bg-homeBg bg-center bg-no-repeat ${
            pathname === "/auth/info" ? "" : "pt-2"
          }`}
        >
          {/* main layout pages children  */}
          <div
            className={`w-full h-full ${
              pathname === "/auth/info" ? "" : "overflow-y-auto p-5 md:p-0"
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
