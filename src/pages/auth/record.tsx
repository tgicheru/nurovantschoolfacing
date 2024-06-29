import { Button, Image } from 'antd'
import React, { useState } from 'react'
import recordIcon from '../../assets/icons/recordicon.png'
import { ReactMic } from 'react-mic'
import { FaPause, FaPlay, FaStop } from 'react-icons/fa'
import { useOnboarding } from '../../hooks/auth/authentications'
import { useAWSUpload } from '../../hooks/otherhooks'
import { useNavigate } from 'react-router'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { onboardingAtom } from '../../atoms/other/other.atom'
import authAtom from '../../atoms/auth/auth.atom'
import { useSetProfile } from '../../hooks/profile/profile'


function RecordPage() {
  const [payload, setPayload] = useRecoilState(onboardingAtom)
  const handleReset = useResetRecoilState(onboardingAtom)
  const { isLoggedIn } = useRecoilValue(authAtom)
  const [isRecord, setIsRecord] = useState(false)
  const [isPause, setIsPause] = useState(false)
  const onRecStop = () => setIsRecord(false)
  const onRecStart = () => setIsRecord(true)
  const onPause = () => setIsPause(!isPause)
  const navigate = useNavigate()

  const handleSuccess = () => {
    if(!isLoggedIn) navigate("/auth/login")
    if(isLoggedIn) navigate("/")
    handleReset()
  }
  const handleError = (res: any) => {
    const backMessage = "User with this email already exist"
    if (res?.message?.includes(backMessage)) navigate("/auth")
  }

  const {
    mutate: uplAction,
    isLoading: uplLoad,
  } = useAWSUpload((res: any) => setPayload({...payload, voice_url: res?.Location || payload?.voice_url}))

  const {
    mutate: putAction,
    isLoading: putLoad,
  } = useSetProfile(handleSuccess, handleError)

  const {
    mutate: postAction,
    isLoading: postLoad,
  } = useOnboarding(handleSuccess, handleError)

  const handleMutate = (data: any) => (isLoggedIn ? putAction(data) : postAction(data))

  const handleStop = async (data: any) => uplAction(data?.blob)

  const isRecorded = Boolean(payload?.voice_url)
  const handleSubmit = () => handleMutate(payload)
  const isLoading = (postLoad || uplLoad || putLoad)
  return (
    <div className='w-full h-full p-5 flex flex-col justify-center items-center text-center gap-5'>
      <Image src={recordIcon} alt='record icon' preview={false} />
      <p className='text-sm font-normal text-[#1B1B1B]'>Repeat the sentence into your microphone</p>
      <p className='text-2xl font-bold text-[#0F1632]'>"The quick brown fox jumps over the lazy dog."</p>
      <ReactMic
        pause={isPause}
        channelCount={1}
        record={isRecord}
        onStop={handleStop}
        mimeType="audio/wav"
        strokeColor="#4970fc"
        backgroundColor='transparent'
        className="w-[70vw] md:!w-[30vw] !min-h-[100px]"
      />
      <div className='flex items-center gap-5'>
        <Button onClick={onPause} loading={isLoading} hidden={!isRecord} icon={isPause ? <FaPlay /> : <FaPause />} className="bg-primary" size="large" type="primary" shape="circle" />
        <Button onClick={onRecStop} loading={isLoading} hidden={!isRecord} icon={<FaStop />} className="bg-primary" size="large" type="primary" shape="circle" />
      </div>
      <div className='flex items-center gap-5'>
        <Button onClick={onRecStart} loading={isLoading} hidden={isRecord} className="bg-primary" size="large" type="primary" shape="round">Start</Button>
        <Button onClick={handleSubmit} loading={isLoading} hidden={!isRecorded} className="bg-primary" size="large" type="primary" shape="round">Submit</Button>
      </div>
    </div>
  )
}

export default RecordPage