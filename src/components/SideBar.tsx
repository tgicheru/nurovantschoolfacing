import React, { useMemo } from "react";
import Logo from "./Logo";
import { LuLogOut } from "react-icons/lu";
import { IoPlayBackOutline, IoPlayForwardOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiHomeAlt2 } from "react-icons/bi";
import { Avatar, Button, Divider, Drawer, Menu } from "antd";
import { isEqual } from "../context/utils";
import authAtom from "../atoms/auth/auth.atom";
import { useRecoilValue } from "recoil";
import { extractAvatar } from "../constants";
import { FaPlus } from "react-icons/fa";
import { BsGear } from "react-icons/bs";

type Props = {
  isOpen: boolean;
  onClose: any;
  onOpen: any;
  isMenuOpen: boolean;
  onMenuClose: any;
};
function SideBar({ isOpen, onOpen, onClose, isMenuOpen, onMenuClose }: Props) {
  const { pathname } = useLocation();

  const navigate = useNavigate();
  const items = [
    {
      key: "/",
      label: "Home",
      icon: <BiHomeAlt2 className="!text-lg !font-medium" />,
    },
    // {
    //   key: "/respondents",
    //   label: "Respondents",
    //   icon: <LuUser className='!text-lg !font-medium' />,
    // },
    // {
    //   key: "/results-database",
    //   label: "Results Database",
    //   icon: <LuClipboardList className='!text-lg !font-medium' />,
    // },
  ];

  const extras = useMemo(
    () => [
      {
        key: "hide",
        label: isOpen ? "Open" : "Hide",
        icon: !isOpen ? (
          <IoPlayBackOutline
            onClick={onOpen}
            className="!text-lg !font-medium"
          />
        ) : (
          <IoPlayForwardOutline
            onClick={onClose}
            className="!text-lg !font-medium"
          />
        ),
      },
      {
        key: "/settings",
        label: "Settings",
        icon: <BsGear className="!text-lg !font-medium" />,
      },
    ],
    [isOpen, onClose, onOpen]
  );

  const { user } = useRecoilValue(authAtom);

  const handleMenu = ({ key }: any) => {
    if (!isEqual(key, "hide")) return navigate(key);
    if (isOpen) return onClose();
    return onOpen();
  };
  const handleLogout = () => navigate("/auth/logout");

  const MenuContent = () => (
    <div
      className={`"w-full h-full flex flex-col justify-between items-center ${
        !isOpen && "px-3"
      } py-10 ${pathname === "/auth/info" && "hidden"}`}
    >
      <div className="w-full flex flex-col justify-center items-center gap-10">
        <Logo isIcon={isOpen} />
        <Menu
          style={{
            border: 0,
            background: "transparent",
            color: "#646462",
            fontSize: "16px",
            fontWeight: "500",
          }}
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={[pathname]}
          inlineCollapsed={isOpen}
          className="space-y-3"
          onClick={handleMenu}
          key="main-menu"
          mode="inline"
          items={items}
        />
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <Menu
          style={{
            border: 0,
            background: "transparent",
            color: "#646462",
            fontSize: "16px",
            fontWeight: "500",
          }}
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={[pathname]}
          inlineCollapsed={isOpen}
          className="space-y-3"
          onClick={handleMenu}
          key="extra-menu"
          items={extras}
          mode="inline"
        />
        <Divider />
        <div
          className={`w-full flex ${
            isOpen ? "justify-center" : "justify-between"
          } items-center`}
        >
          <div className="flex items-center gap-3">
            <Avatar alt="user" size="large" src={user?.info?.profile_img}>
              {(user?.info?.name !== null || user?.info?.name === undefined) &&
                extractAvatar(user?.info?.name)}
            </Avatar>
            <p
              hidden={isOpen}
              className="text-primary text-[12px] w-[100px] truncate"
            >
              {user?.info?.email}
            </p>
          </div>
          <Button
            hidden={isOpen}
            onClick={handleLogout}
            className="text-primary !p-0 !m-0"
            type="text"
            icon={<LuLogOut className="!text-lg !font-medium" />}
          />
        </div>
      </div>
    </div>
  );
  return (
    <div className="w-full h-full">
      <Drawer
        onClose={onMenuClose}
        open={isMenuOpen}
        closeIcon={false}
        placement="left"
        footer={false}
        width={250}
      >
        <MenuContent />
      </Drawer>

      <div className="w-full md:hidden bg-white fixed bottom-0 left-0 right-0 z-20">
        <Divider className="!m-0 !p-0">
          <Button
            icon={<FaPlus className="text-2xl" />}
            className="bg-primary"
            type="primary"
            shape="circle"
            size="large"
            hidden
          />
        </Divider>
        <div className="flex justify-between items-center gap-5 flex-nowrap overflow-x-auto p-5">
          {items?.map(({ key, icon, label }) => (
            <Link
              to={key}
              key={key}
              className={`${
                isEqual(key, pathname) ? "text-primary" : "text-silver"
              } flex flex-col justify-center items-center space-y-3 text-xs font-medium whitespace-nowrap`}
            >
              {icon}
              <p>{label}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
