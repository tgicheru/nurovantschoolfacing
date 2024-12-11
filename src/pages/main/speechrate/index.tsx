import React, { useState } from 'react'
import { BorderHOC } from '../../../components'
import { Button, Divider, Drawer, Form, Input, Upload } from 'antd'
import { LuPlus, LuSearch, LuUploadCloud } from 'react-icons/lu'
import { RxDashboard } from 'react-icons/rx'
import { GoRows } from 'react-icons/go'
import EmptyDisplay from '../../../components/EmptyDisplay'
import { isEqual } from '../../../context/utils'
import { BsSoundwave } from 'react-icons/bs'
import { PiDotsThreeOutline } from 'react-icons/pi'
import moment from 'moment'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useAWSUpload } from '../../../hooks/otherhooks'
import { ImSpinner } from 'react-icons/im'
import { useSearchParams } from 'react-router-dom'
import DetailsSection from './sections/details'

type IconProp = {
  className?: string
}
function SpeechRate() {
  const [payload, setPayload] = useState<any>()
  const [params, setParams] = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)
  const [list, setList] = useState("grid")
  const onClose = () => setIsOpen(false)
  const onOpen = () => setIsOpen(true)
  const width = window.innerWidth
  const id = params.get("id")

  const handleOption = (e: any) => e?.stopPropagation()
  const handleView = () => setParams({id: "bytubytiyygvutfgbytty"})

  const lists = [
    { key: "grid", Icon: ({ className }: IconProp) => <RxDashboard className={className} /> },
    { key: "row", Icon: ({ className }: IconProp) => <GoRows className={className} /> },
  ]

  const props = (onChange: any) => ({
    name: "file",
    multiple: false,
    directory: false,
    method: undefined,
    showUploadList: false,
    className: "px-5 text-center space-y-2",
    onChange: ({ file }: { file: Blob | any }) => onChange(file?.originFileObj),
  })

  const {
    isLoading: postUplLoad,
    mutateAsync: postUplAction,
  } = useAWSUpload()

  const handleUpload = async (file: any, key: any) => await postUplAction(file).then((res: any) => setPayload({...payload, [key]: res?.Location}))

  if (id) return <DetailsSection />
  return (
    <div className='w-full py-5 space-y-5'>
      <div className='w-full'>
        <p className='text-2xl font-bold text-[#161617]'>Speech Rate 🎙️</p>
        <p className='text-sm font-semibold text-[#57585A]'>Elevate your teaching with effortless speech rating.</p>
      </div>

      <BorderHOC rounded='rounded-xl' className='w-full h-full'>
        <div className='w-full h-full p-5 space-y-2'>
          <div className='w-full h-full flex flex-col md:flex-row justify-between items-center gap-5'>
            <div className='flex items-center gap-2'>
              <p className='text-2xl font-bold text-[#161617]'>0</p>
              <p className='text-sm font-semibold text-[#57585A]'>speech rate(s)</p>
            </div>

            <div className='h-full flex items-center gap-2'>
              <Button icon={<LuSearch className='text-xl' />} type='text' />
              <Divider type='vertical' className='m-0 !h-[30px] !bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]' />
              {lists.map(({ Icon, key }) => {
                const isKey = isEqual(key, list)
                const handleList = () => setList(key)
                return (<Button className={String(isKey && "bg-[#E7E7E7]")} onClick={handleList} icon={<Icon className='text-lg' />} type='text' shape='circle' />)
              })}
              <Divider type='vertical'  className='m-0 !h-[30px] !bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]' />
              <Button onClick={onOpen} className='!text-sm !font-bold bg-[#4970FC]' icon={<LuPlus className='text-xl' />} size='large' type='primary' shape='round'>Check your Speech Rate</Button>
            </div>
          </div>

          <Divider className='m-0 !bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]' />

          <EmptyDisplay hidden className='w-full h-[50vh]'>
            <Button onClick={onOpen} className='!text-sm !font-bold bg-[#4970FC]' icon={<LuPlus className='text-xl' />} size='large' type='primary' shape='round'>Check your Speech Rate</Button>
          </EmptyDisplay>

          <div hidden={!isEqual(list, "grid")} className='w-full h-full'>
            <div className='w-full grid sm:grid-cols-2 md:grid-cols-3 gap-5'>
              <BorderHOC rounded='rounded-xl' className='w-full h-full' childClass='w-full h-full p-3 space-y-3 cursor-pointer' onClick={handleView}>
                <div className='flex justify-between items-center gap-5'>
                  <BorderHOC rounded='rounded-xl' childClass='p-3 bg-[#E1E7FF]' className='!w-auto'>
                    <BsSoundwave className='text-xl p-0.5 border rounded-full' />
                  </BorderHOC>
                  <Button onClick={handleOption} type='text' icon={<PiDotsThreeOutline className='text-2xl' />} />
                </div>

                <div className='md:col-span-2 space-y-1'>
                  <p className='text-sm font-bold text-[#161617]'>Algebra 101 Speech Rate</p>
                  <p className='text-xs font-medium text-[#57585A]'>Created . {moment().format("ll")} . {moment().format("LT")}</p>
                </div>
              </BorderHOC>
            </div>
          </div>

          <div hidden={!isEqual(list, "row")} className='w-full h-full'>
            <div className='w-full space-y-5 overflow-x-auto'>
              <BorderHOC rounded='rounded-xl' className='w-full h-full' childClass='p-2 flex flex-nowrap justify-between items-center gap-5overflow-x-auto cursor-pointer' onClick={handleView}>
                <div className='w-full flex items-center gap-10'>
                  <BorderHOC rounded='rounded-xl' childClass='p-3 bg-[#E1E7FF]' className='!w-auto'>
                    <BsSoundwave className='text-xl p-0.5 border rounded-full' />
                    </BorderHOC>
                  <div className='space-y-1'>
                    <p className='text-sm font-bold text-[#161617]'>Algebra 101 Questions</p>
                    <p className='text-xs font-medium text-[#57585A]'>Created . {moment().format("ll")} . {moment().format("LT")}</p>
                  </div>
                </div>
                <Button onClick={handleOption} type='text' icon={<PiDotsThreeOutline className='text-2xl' />} />
              </BorderHOC>
            </div>
          </div>
        </div>
      </BorderHOC>

      <Drawer
        open={isOpen}
        footer={false}
        onClose={onClose}
        closeIcon={false}
        width={width <= 500 ? width : 500}
        classNames={{ content: "!bg-transparent", wrapper: "!shadow-none" }}
      >
        <div className='w-full p-5 space-y-5 bg-white rounded-3xl'>
          <div className='w-full flex justify-between gap-5'>
            <div className=''>
              <p className='text-xl font-bold text-[#161617]'>Check your Speech Rate</p>
              <p className='text-sm font-medium text-[#57585A]'>Elevate your teaching with effortless speech rating.</p>
            </div>
            <Button onClick={onClose} icon={<AiOutlineCloseCircle className='text-xl' />} type='text' shape='circle' />
          </div>
          <Divider className='m-0 !bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]' />
          <Form layout='vertical'>
            <Form.Item label="Title" name="title">
              <Input placeholder='Enter title' size='large' />
            </Form.Item>
            <Form.Item label="Upload Source Material">
              <Upload.Dragger {...props((file: any) => handleUpload(file, "question_source"))} disabled={postUplLoad}>
                <p className="ant-upload-drag-icon">
                  {postUplLoad ? <ImSpinner className="!text-2xl mx-auto !animate-spin" /> : <LuUploadCloud className="!text-2xl mx-auto" />}
                </p>
                <p hidden={!payload?.question_source} className="text-sm">Document Uploaded.</p>
                <p hidden={payload?.question_source} className="text-sm"><span className='text-primary'>Click to upload</span> or drag and drop</p>
                <p hidden={payload?.question_source} className=" text-xs">File size no more than 10MB</p>
              </Upload.Dragger>
            </Form.Item>
            <Button className="bg-[#4970FC]" block size="large" type="primary" htmlType="submit" shape="round">Check your Speech Rate</Button>
          </Form>
        </div>
      </Drawer>
    </div>
  )
}

export default SpeechRate