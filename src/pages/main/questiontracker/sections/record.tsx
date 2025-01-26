import { Button, Image, Tabs } from 'antd'
import React, { useState } from 'react'
import { ReactMic } from 'react-mic'
import { FaPause, FaPlay, FaStop } from 'react-icons/fa'
import recordIcon from '../../../../assets/icons/recordicon.png'
import { useAWSUpload } from '../../../../hooks/otherhooks'
import { getBase64 } from '../../../../context/utils'
import { LuUploadCloud } from 'react-icons/lu'
import Dragger from 'antd/es/upload/Dragger'
import { ImSpinner } from 'react-icons/im'
import { usePostVoiceTracker } from '../../../../hooks/questiontracker/questiontracker'

type Props = {
  successAction?: any
}

function RecordSection({ successAction }: Props) {
  const [payload, setPayload] = useState<any>()
  const [isRecord, setIsRecord] = useState(false)
  const [isPause, setIsPause] = useState(false)
  const onRecStop = () => setIsRecord(false)
  const onRecStart = () => setIsRecord(true)
  const onPause = () => setIsPause(!isPause)
  const [record, setRecord] = useState("")

  const {
    mutate: uplAction,
    isLoading: uplLoad,
  } = useAWSUpload((res: any) => {setPayload({...payload, voice_url: res?.Location || payload?.voice_url})})

  const {
    mutate: postVoiceTrackAction,
    isLoading: postVoiceTrackLoad,
  } = usePostVoiceTracker((res: any) => successAction?.(res))

  // const handleStop = async (data: any) => uplAction(data?.blob)
  const handleStop = async (data: any) => {
    await getBase64(data?.blob).then((res: any) => setRecord(res))
    uplAction(data?.blob)
  }

  const props = {
    name: "file",
    multiple: false,
    directory: false,
    method: undefined,  
    className: "!w-full",
    showUploadList: false,
    accept: ".m4a, .mp3, .wav, .wma, .aac, .flac",
    onChange: ({ file }: { file: Blob | any }) => uplAction(file?.originFileObj),
  }

  const isRecorded = Boolean(payload?.voice_url)
  const isLoading = (uplLoad || postVoiceTrackLoad)
  const handleSubmit = () => postVoiceTrackAction(payload)
  return (
    <div className='w-full h-full p-5 flex flex-col justify-center items-center text-center gap-5'>
      <Image src={recordIcon} alt='record icon' preview={false} />
      <p className='text-sm font-normal text-[#1B1B1B]'>Please record or upload an audio file of you repeating the sentence below for your voice recognition tracking</p>
      <p className='text-xl font-bold text-[#0F1632]'>"The quick brown fox jumps over the lazy dog."</p>

      <Tabs
        centered
        className='!w-full'
        items={[
          {
            key: "record",
            label: "Record Audio",
            children: (
              <div className='w-full space-y-5'>
                <div hidden={Boolean(record)}>
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
                </div>
                <div className='w-full flex justify-center items-center gap-3'>
                  <audio hidden={!record} src={record} controls />
                  <Button onClick={onRecStart} loading={isLoading} hidden={isRecord} className="bg-primary" size="large" type="primary" shape="round">{isRecorded ? "Restart" : "Start"}</Button>
                </div>
                <div hidden={!isRecord}>
                  <div className='w-full flex justify-center items-center gap-5'>
                    <Button onClick={onPause} loading={isLoading} icon={isPause ? <FaPlay /> : <FaPause />} className="bg-primary" size="large" type="primary" shape="circle" />
                    <Button onClick={onRecStop} loading={isLoading} icon={<FaStop />} className="bg-primary" size="large" type="primary" shape="circle" />
                  </div>
                </div>
              </div>
            )
          },
          {
            key: "upload",
            label: "Upload Audio",
            children: (
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  {isLoading ? (<ImSpinner className="!text-2xl mx-auto animate-spin" />) : (<LuUploadCloud className="!text-2xl mx-auto" />)}
                </p>
                <p hidden={!payload?.voice_url} className="ant-upload-text px-5">Document Uploaded.</p>
                <p hidden={payload?.voice_url} className="ant-upload-text px-5"> Click to upload audio document.</p>
                <p hidden={payload?.voice_url} className="ant-upload-hint px-5">File type must be of audio type </p>
              </Dragger>
            )
          }
        ]}
      />
      <Button onClick={handleSubmit} loading={isLoading} hidden={!isRecorded} className="bg-primary" size="large" type="primary" shape="round" icon={<LuUploadCloud />}>Submit Audio For Tracking</Button>
    </div>
  )
}

export default RecordSection