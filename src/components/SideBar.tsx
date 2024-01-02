import React, { useMemo } from 'react'
import Logo from './Logo'
import { LuClipboardList, LuLogOut, LuUser } from "react-icons/lu"
import { IoPlayBackOutline, IoPlayForwardOutline } from "react-icons/io5"
import { Link, useLocation } from 'react-router-dom'
import { BiHomeAlt2 } from "react-icons/bi"
import { BsGear } from "react-icons/bs"
import { Avatar, Button, Divider, Menu } from 'antd'

type Props = {
  isOpen: boolean,
  onClose: any,
  onOpen: any,
}
function SideBar({
  isOpen,
  onOpen,
  onClose,
}: Props) {
  const { pathname } = useLocation()
  const items = useMemo(() => [
    {
      key: "/",
      label: <Link hidden={!isOpen} to="/">Home</Link>,
      icon: <BiHomeAlt2 className='!text-lg !font-medium' />,
    },
    // {
    //   key: "/respondents",
    //   label: <Link to="/respondents">Respondents</Link>,
    //   icon: <LuUser className='!text-lg !font-medium' />,
    // },
    // {
    //   key: "/results-database",
    //   label: <Link to="/results-database">Results Database</Link>,
    //   icon: <LuClipboardList className='!text-lg !font-medium' />,
    // },
  ], [isOpen])

  const extras = useMemo(() => [
    {
      key: "hide",
      label: <Button onClick={onOpen} hidden={!isOpen} className='!bg-none !p-0 !m-0 text-base font-medium' type='text'>Hide</Button>,
      icon: isOpen ? <IoPlayBackOutline onClick={onClose} className='!text-lg !font-medium' /> : <IoPlayForwardOutline onClick={onOpen} className='!text-lg !font-medium' />,
    },
    {
      key: "/settings",
      label: <Link hidden={!isOpen} to="/settings">Settings</Link>,
      icon: <BsGear className='!text-lg !font-medium' />,
    },
  ], [isOpen, onClose, onOpen])

  const handleMenu = (d: any) => console.log(d)
  return (
    <div className='w-full h-full flex flex-col justify-between items-center px-3 py-10'>
      <div className='w-full flex flex-col justify-center items-center gap-10'>
        <Logo isIcon={!isOpen} />
        <Menu
          style={{ border: 0, background: "transparent", color: "#646462", fontSize: "16px", fontWeight: "500" }}
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={[pathname]}
          className='space-y-3'
          key="upper-menu"
          id="upper-menu"
          mode="inline"
          items={items}
        />
      </div>
      <div className='w-full'>
        <Menu
          style={{ border: 0, background: "transparent", color: "#646462", fontSize: "16px", fontWeight: "500" }} 
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={[pathname]}
          onChange={handleMenu}
          className='space-y-3'
          key="lower-menu"
          id="lower-menu"
          items={extras}
          mode="inline"
        />
        <Divider />
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-3'>
            <Avatar alt='user' size="large">AD</Avatar>
            <p hidden={!isOpen} className='text-primary'>olivia@nurovant.ai</p>
          </div>
          <Button hidden={!isOpen} className='text-primary !p-0 !m-0' type='text' icon={<LuLogOut className='!text-lg !font-medium' />} />
        </div>
      </div>
    </div>
  )
}

export default SideBar