import React from 'react'
import Logo from './Logo'
import { LuBook, LuCamera, LuUser } from "react-icons/lu"
import { BiHomeAlt2 } from "react-icons/bi"
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'antd'

function SideBar() {
  const { pathname } = useLocation()
  const items = [
    {
      key: "/",
      label: <Link to="/">Home</Link>,
      icon: <BiHomeAlt2 className='!text-lg !font-medium' />,
    },
    {
      key: "/computer-vision",
      label: <Link to="/computer-vision">Computer Vision</Link>,
      icon: <LuCamera className='!text-lg !font-medium' />,
    },
    {
      key: "/study-guide",
      label: <Link to="/study-guide">Study Guide</Link>,
      icon: <LuBook className='!text-lg !font-medium' />,
    },
    {
      key: "/profile",
      label: <Link to="/profile">Profile</Link>,
      icon: <LuUser className='!text-lg !font-medium' />,
    },
  ]
  return (
    <div className='w-full flex flex-col justify-center items-center px-3 space-y-10'>
      <Logo />
      <Menu
        style={{ border: 0, background: "transparent", color: "#A4B7FD", fontSize: "16px", fontWeight: "500" }}
        defaultSelectedKeys={[pathname]}
        defaultOpenKeys={[pathname]}
        className='space-y-3'
        mode="inline"
        items={items}
      />
    </div>
  )
}

export default SideBar