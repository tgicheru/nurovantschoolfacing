import { Button, Image } from 'antd'
import React, { useState } from 'react'
import recordIcon from '../../assets/icons/recordicon.png'
import { ReactMic } from 'react-mic'
import { FaPause, FaPlay, FaStop } from 'react-icons/fa'


function RecordPage() {
  const [isRecord, setIsRecord] = useState(false)
  const [isPause, setIsPause] = useState(false)
  const onRecStop = () => setIsRecord(false)
  const onRecStart = () => setIsRecord(true)
  const onPause = () => setIsPause(!isPause)
  return (
    <div className='w-full h-full flex flex-col justify-center items-center text-center gap-5'>
      <Image src={recordIcon} alt='record icon' preview={false} />
      <p className='text-sm font-normal text-[#1B1B1B]'>Repeat the sentence into your microphone</p>
      <p className='text-2xl font-bold text-[#0F1632]'>"The quick brown fox jumps over the lazy dog."</p>
      <ReactMic
        // onStop={onStop}
        pause={isPause}
        channelCount={1}
        record={isRecord}
        mimeType="audio/wav"
        strokeColor="#4970fc"
        backgroundColor='transparent'
        className="w-[40vw] md:!w-[30vw] !h-[100px]"
      />
      <div className='flex items-center gap-5'>
        <Button onClick={onPause} hidden={!isRecord} icon={isPause ? <FaPlay /> : <FaPause />} className="bg-primary" size="large" type="primary" shape="circle" />
        <Button onClick={onRecStop} hidden={!isRecord} icon={<FaStop />} className="bg-primary" size="large" type="primary" shape="circle" />
      </div>
      <Button onClick={onRecStart} hidden={isRecord} className="bg-primary" size="large" type="primary" shape="round">Start</Button>
    </div>
  )
}

export default RecordPage