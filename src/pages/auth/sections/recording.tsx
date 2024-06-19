import React from 'react'
import { Button, Image } from 'antd'
import recordIcon from '../../../assets/icons/recordicon.png'
import { useNavigate } from 'react-router'

function RecordingSection() {
  const navigate = useNavigate()
  const handleNext = () => navigate("/auth/record")

  const notes = [
    {title: "Location", description: "Place your device centrally so everyone can be heard clearly."},
    {title: "Audio", description: "Use external speakers or headphones to avoid feedback."},
    {title: "Position", description: "Turn the screen towards your students to capture their voices better."},
  ]
  return (
    <div className='flex flex-col justify-center items-center text-center gap-3'>
      <p className='text-2xl font-semibold text-[#1B1B1B]'>Let’s make your first recording</p>
      <Image src={recordIcon} alt='record icon' preview={false} />
      <div className='w-full grid grid-cols-1 sm:grid-cols-3 gap-5'>
        {notes?.map(({description, title}) => (<div className='text-center space-y-2'>
          <p className='text-lg font-medium text-[#182554]'>{title}</p>
          <p className='text-sm font-normal text-[#1B1B1B]'>{description}</p>
        </div>))}
      </div>
      <Button onClick={handleNext} className="w-[50%] bg-primary !h-[50px] my-5" size="large" type="primary" shape="round">Let's Record</Button>
    </div>
  )
}

export default RecordingSection