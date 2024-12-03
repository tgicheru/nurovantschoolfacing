import { useRecoilState, useRecoilValue } from "recoil";
import React, {
  ReactComponentElement,
  useRef,
  useEffect,
  useState,
} from "react";
import SideBar from "../../components/SideBar";
import menuAtom from "../../atoms/menu/menu.atom";
import { HiOutlineBell } from "react-icons/hi";
import { ModalContainer } from "../../components/ModalContainer";
import { useLocation, useNavigate } from "react-router";
import authAtom from "../../atoms/auth/auth.atom";
import { Avatar, Button, Drawer, Dropdown } from "antd";
import { LuLogOut, LuMenu } from "react-icons/lu";
import { useGetProfile, useGetUserSub } from "../../hooks/profile/profile";
import Logo from "../../assets/logo-copy.svg";
import { extractAvatar } from "../../constants";
import { FaChevronDown } from "react-icons/fa";
import { GoGear } from "react-icons/go";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useWindowSize } from "../../hooks/useWindowSize";
import { BorderHOC } from "../../components";
import NotificationStatusImg from "../../assets/notification-status.svg";

type Props = {
  children: ReactComponentElement<any>;
};
const MainLayout = ({ children }: Props) => {
  const { width } = useWindowSize();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useRecoilState(menuAtom);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onMenuClose = () => setIsMenuOpen(false);
  const onMenuOpen = () => setIsMenuOpen(true);
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);
  const { pathname } = useLocation();
  const { user } = useRecoilValue(authAtom);
  const [isMobile, setIsMobile] = useState<null | boolean>(null);

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [pathname]);

  useEffect(() => {
    if (width) {
      if (width < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
  }, [width]);

  // get user profile
  // useGetProfile();

  const items = [
    {
      key: "/",
      label: "Overview",
      icon: "",
    },
    {
      key: "/courses",
      label: "Courses",
      icon: "",
    },
    {
      key: "/adaptive-learning",
      label: "Adaptive Learning",
      icon: "",
    },
    {
      key: "/question-tracker",
      label: "Question Tracker",
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
    // {
    //   key: "/proofreader",
    //   label: "Proof Reader",
    //   icon: "",
    // },
    // {
    //   key: "/gpt-zero",
    //   label: "GPT Zero",
    //   icon: "",
    // },
  ];

  const menu = [
    {
      key: "1",
      label: (
        <div>
          <p className="text-[14px] leading-[20px] font-semibold text-secondary">
            {user?.info?.name}
          </p>
          <p className="text-[14px] leading-[20px] font-normal text-gray">
            {user?.info?.email}
          </p>
        </div>
      ),
      disabled: true,
    },
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
  ];

  const handleMenu = (key: any) => {
    navigate(key);
    onMenuClose();
  };

  const activeLink = (item: { key: string; label: string; icon: string }) => {
    return pathname === item.key || pathname.startsWith(item.key + "/");
  };

  const handleLogout = () => navigate("/auth/logout");
  return (
    <ModalContainer>
      <div className="w-full h-screen overflow-hidden flex flex-col p-0 m-0 bg-white font-fustat">
        {/* <div className="flex justify-between items-center md:hidden p-5">
          <div className="text-dark truncate">
            <p className="text-xl font-bold">{`Hello ${user?.info?.name}`}</p>
            <p className="text-sm font-normal">welcome to your dashboard</p>
          </div>
          
          <Button
            icon={<LuMenu className="!text-2xl !font-medium !bg-transparent" />}
            className="text-[#101828] !p-0 !m-0"
            onClick={onMenuOpen}
            type="text"
          />
        </div> */}
        {/* sidebar component can come in here  */}
        {/* <div className={`w-0 hidden ${isOpen ? "block md:!w-[5%]" : "hidden"}`}>
          <SideBar
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            isMenuOpen={isMenuOpen}
            onMenuClose={onMenuClose}
          />
        </div> */}
        <div className="w-full bg-white sticky top-0 z-10">
          <div className="w-full">
            <BorderHOC padding="pb-[1px]">
              <div className="flex justify-between items-center py-4 px-4 md:px-0 lg:px-[100px]">
                <Link to="/">
                  <img
                    src={Logo}
                    alt="logo"
                    className="hidden lg:block w-[139px]"
                  />
                </Link>

                <div className="flex items-center gap-[50px]">
                  <div className="w-[122px] h-[40px]">
                    <BorderHOC rounded="rounded-[1000px]">
                      <div className="py-[10px] w-full px-[14px] items-center justify-center bg-gradient-to-bl from-[#ffffff] to-[#FCF5EB] rounded-[1000px]">
                        <p className="text-sm font-bold text-neutral-900 text-center">
                          Upgrade Plan
                        </p>
                      </div>
                    </BorderHOC>
                  </div>

                  <div className="flex items-center gap-[25px]">
                    <button
                      onClick={() => {}}
                      className="h-[40px] w-[40px] flex items-center justify-center"
                    >
                      <img
                        src={NotificationStatusImg}
                        alt="notification"
                        className="w-[20px] h-[20px]"
                      />
                    </button>
                    <Dropdown menu={{ items: menu }} trigger={["click"]}>
                      <div className="cursor-pointer">
                        <div className="flex items-center gap-3">
                          <Avatar
                            alt="user"
                            size="large"
                            src={user?.info?.profile_img}
                          >
                            {extractAvatar(
                              user?.info?.name || user?.info?.email || "USER"
                            )}
                          </Avatar>
                        </div>
                      </div>
                    </Dropdown>
                  </div>
                </div>

                <Button
                  icon={
                    <LuMenu className="!text-2xl !font-medium !bg-transparent" />
                  }
                  className="text-[#101828] !p-0 !m-0 md:hidden"
                  onClick={onMenuOpen}
                  type="text"
                />
              </div>
            </BorderHOC>
          </div>
          <div className="max-w-7xl w-full mx-auto">
            <BorderHOC padding="pb-[1px]">
              <div className=" items-center flex-row gap-4 flex overflow-x-auto max-w-7xl mx-auto py-4">
                {items.map((item) => (
                  <div
                    key={item.label}
                    ref={activeLink(item) ? ref : null}
                    className={`px-3 py-[10px] rounded-[100px] font-medium cursor-pointer ${
                      activeLink(item)
                        ? "bg-prim-50 text-primary"
                        : "text-neutral-700 hidden md:block"
                    }`}
                    onClick={() => handleMenu(item.key)}
                  >
                    <span className="text-[14px] leading-[20px] whitespace-nowrap">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </BorderHOC>
          </div>

          <Drawer
            onClose={onMenuClose}
            open={isMobile ? isMenuOpen : false}
            closeIcon={false}
            placement="left"
            footer={false}
            width={250}
          >
            <div className="items-center flex-col gap-4 flex overflow-x-auto">
              <img src={Logo} alt="logo" className="mb-8" />

              {items.map((item) => (
                <div
                  key={item.label}
                  ref={activeLink(item) ? ref : null}
                  className={`px-4 py-2 rounded-t-lg font-medium cursor-pointer w-full ${
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
          </Drawer>
        </div>

        <div className="w-full h-full overflow-y-auto">
          {/* main layout pages children  */}
          <div className="w-full h-full overflow-y-auto p-5 lg:max-w-7xl lg:mx-auto">
            {children}
          </div>
        </div>

        {/* Static footer at bottom of screen */}
        <div className="w-full bg-white py-4">
          <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
            <p className="text-[14px] leading-[20px] text-neutral-600">
              &copy; NurovantAI 2024. All rights reserved..
            </p>
            <div className="flex items-center gap-[10px]">
              <p className="text-[14px] leading-[20px] text-neutral-600">
                Contact
              </p>
              <p className="text-[14px] leading-[20px] text-neutral-600">
                Terms of Service
              </p>
              <p className="text-[14px] leading-[20px] text-neutral-600">
                Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default MainLayout;
