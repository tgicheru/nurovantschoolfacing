import React from 'react'
import { Image } from 'antd'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

function Logo() {
  return (
    <Link to="/" className="w-full block logo-bg">
      <Image alt="logo" src={logo} preview={false} className='w-auto mx-auto' />
    </Link>
  )
}

export default Logo