import React from 'react'
import { Spin } from 'antd'

function Loading() {
  return (<Spin spinning className='w-full h-[90vh] bg-white flex justify-center items-center rounded-xl shadow-xl text-blue' size="large" />)
}

export default Loading