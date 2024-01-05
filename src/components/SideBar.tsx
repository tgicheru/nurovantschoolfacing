import React, { useMemo } from "react";
import Logo from "./Logo";
import { LuClipboardList, LuLogOut, LuUser } from "react-icons/lu";
import { IoPlayBackOutline, IoPlayForwardOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { BiHomeAlt2 } from "react-icons/bi";
import { BsGear } from "react-icons/bs";
import { Avatar, Button, Divider, Menu } from "antd";
import { isEqual } from "../context/utils";
import authAtom from "../atoms/auth/auth.atom";
import { useRecoilValue } from "recoil";
import { extractAvatar } from "../constants";

type Props = {
  isOpen: boolean;
  onClose: any;
  onOpen: any;
};
function SideBar({ isOpen, onOpen, onClose }: Props) {
  const { pathname } = useLocation();

  const navigate = useNavigate();
  const items = useMemo(
    () => [
      {
        key: "/",
        label: isOpen ? "" : "Home",
        icon: <BiHomeAlt2 className="!text-lg !font-medium" />,
      },
      // {
      //   key: "/respondents",
      //   label: isOpen ? "" : "Respondents",
      //   icon: <LuUser className='!text-lg !font-medium' />,
      // },
      // {
      //   key: "/results-database",
      //   label: isOpen ? "" : "Results Database",
      //   icon: <LuClipboardList className='!text-lg !font-medium' />,
      // },
    ],
    [isOpen]
  );

  const extras = useMemo(
    () => [
      {
        key: "hide",
        label: isOpen ? "" : "Hide",
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
      // {
      //   key: "/settings",
      //   label: isOpen ? "" : "Settings",
      //   icon: <BsGear className="!text-lg !font-medium" />,
      // },
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
  return (
    <div
      className={`"w-full h-full flex flex-col justify-between items-center px-3 py-10 ${
        pathname === "/info" && "hidden"
      }`}
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
          className="space-y-3"
          onClick={handleMenu}
          mode="inline"
          items={items}
        />
      </div>
      <div className="w-full">
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
          className="space-y-3"
          onClick={handleMenu}
          items={extras}
          mode="inline"
        />
        <Divider />
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Avatar alt="user" size="large">
              {(user?.info?.name !== null || user?.info?.name === undefined) &&
                extractAvatar(user?.info?.name)}
            </Avatar>
            <p hidden={isOpen} className="text-primary text-[12px] w-[100px] truncate">
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
}

export default SideBar;
