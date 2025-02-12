import React, { useState } from 'react'
import { BorderHOC } from '../../../components'
import { Button, Divider, Drawer, Dropdown, Form, Input, Modal, Tag, Upload } from 'antd'
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
import { useDeleteQuestionTracker, useGetQuestionTrackers, usePostQuestionTracker } from '../../../hooks/questiontracker/questiontracker'
import RecordSection from './sections/record'

type IconProp = {
  className?: string
}
function QuestionTracker() {
  const [isRecOpen, setIsRecOpen] = useState(false)
  const [payload, setPayload] = useState<any>()
  const [params, setParams] = useSearchParams()
  const onRecClose = () => setIsRecOpen(false)
  const [isOpen, setIsOpen] = useState(false)
  const [list, setList] = useState("grid")
  const onClose = () => setIsOpen(false)
  const onOpen = () => setIsOpen(true)
  const width = window.innerWidth
  const [form] = Form.useForm()
  const id = params.get("id")

  const handleOption = (e: any) => e?.stopPropagation()
  const handleView = (id: string) => setParams({id})

  const {
    data: getQuestTrackData,
    refetch: getQuestTrackFetch,
    isLoading: getQuestTrackLoad,
  } = useGetQuestionTrackers({}, (res: any) => setIsRecOpen(res && !res?.is_voice_recorded))

  const {
    mutate: postQuestTrackAction,
    isLoading: postQuestTrackLoad,
  } = usePostQuestionTracker(() => {
    getQuestTrackFetch()
    form.resetFields()
    setPayload({})
    onClose()
  })

  const {
    mutate: deleteQuestTrackAction,
    isLoading: deleteQuestTrackLoad,
  } = useDeleteQuestionTracker(getQuestTrackFetch)

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

  const handleSubmit = (data: any) => postQuestTrackAction({ ...data, ...payload, feature_type: "question_tracker" })

  const handleUpload = async (file: any, key: any) => await postUplAction(file).then((res: any) => setPayload({...payload, [key]: res?.Location}))

  if (id) return <DetailsSection id={id} />
  return (
    <div className='w-full py-5 space-y-5'>
      <div className='w-full'>
        <p className='text-2xl font-bold text-[#161617]'>Question Tracker 🙋</p>
        <p className='text-sm font-semibold text-[#57585A]'>Enhance your teaching with effortless question tracking.</p>
      </div>

      <BorderHOC loading={getQuestTrackLoad} rounded='rounded-xl' className='w-full h-full'>
        <div className='w-full h-full p-5 space-y-2'>
          <div className='w-full h-full flex flex-col md:flex-row justify-between items-center gap-5'>
            <div className='flex items-center gap-2'>
              <p className='text-2xl font-bold text-[#161617]'>{getQuestTrackData?.data?.length}</p>
              <p className='text-sm font-semibold text-[#57585A]'>question tracker(s)</p>
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
              <Button onClick={onOpen} className='!text-sm !font-bold bg-[#4970FC]' icon={<LuPlus className='text-xl' />} size='large' type='primary' shape='round'>Create Question Tracker</Button>
            </div>
          </div>

          <Divider className='m-0 !bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]' />

          <EmptyDisplay hidden={getQuestTrackData?.data?.length} className='w-full h-[50vh]'>
            <Button onClick={onOpen} className='!text-sm !font-bold bg-[#4970FC]' icon={<LuPlus className='text-xl' />} size='large' type='primary' shape='round'>Create Question Tracker</Button>
          </EmptyDisplay>

          <div hidden={!getQuestTrackData?.data?.length} className='w-full'>
            <div hidden={!isEqual(list, "grid")} className='w-full h-full'>
              <div className='w-full grid sm:grid-cols-2 md:grid-cols-3 gap-5'>
                {getQuestTrackData?.data?.map((d: any) => {
                  const isReady = isEqual(d?.status?.toLowerCase(), "success")
                  const onView = () => (isReady ? handleView(d?._id) : {}) 
                  const onDelete = (e: any) => {e?.stopPropagation?.(); deleteQuestTrackAction(d?._id)} 
                  return (
                    <BorderHOC key={d?._id} rounded='rounded-xl' className='w-full h-full' childClass='w-full h-full p-3 space-y-3'>
                      <div className='flex justify-between items-center gap-5'>
                        <BorderHOC rounded='rounded-xl' childClass='p-3 bg-[#E1E7FF]' className='!w-auto'>
                          <BsSoundwave className='text-xl p-0.5 border rounded-full' />
                        </BorderHOC>
                        <Dropdown menu={{ items: [
                          { key: "view", label: "View", onClick: onView, disabled: !isReady },
                          { key: "delete", label: "Delete", onClick: onDelete },
                        ] }}>
                          <Button onClick={handleOption} loading={deleteQuestTrackLoad} type='text' icon={<PiDotsThreeOutline className='text-2xl' />} />
                        </Dropdown>
                      </div>

                      <div className='w-full flex justify-between items-end'>
                        <div className='md:col-span-2 space-y-1'>
                          <p className='text-sm font-bold text-[#161617]'>{d?.name}</p>
                          <p className='text-xs font-medium text-[#57585A]'>Created . {moment(d?.createdAt).format("ll")} . {moment(d?.createdAt).format("LT")}</p>
                        </div>
                        <Tag color={d?.status?.toLowerCase()}>{d?.status}</Tag>
                      </div>
                    </BorderHOC>
                )})}
              </div>
            </div>

            <div hidden={!isEqual(list, "row")} className='w-full h-full'>
              <div className='w-full space-y-5 overflow-x-auto'>
                {getQuestTrackData?.data?.map((d: any) => {
                  const isReady = isEqual(d?.status?.toLowerCase(), "success")
                  const onView = () => (isReady ? handleView(d?._id) : {}) 
                  const onDelete = (e: any) => {e?.stopPropagation?.(); deleteQuestTrackAction(d?._id)} 
                  return (
                    <BorderHOC rounded='rounded-xl' className='w-full h-full' childClass='p-2 flex flex-nowrap justify-between items-center gap-5overflow-x-auto'>
                      <div className='w-full flex items-center gap-10'>
                        <BorderHOC rounded='rounded-xl' childClass='p-3 bg-[#E1E7FF]' className='!w-auto'>
                          <BsSoundwave className='text-xl p-0.5 border rounded-full' />
                          </BorderHOC>
                        <div className='space-y-1'>
                          <p className='text-sm font-bold text-[#161617]'>{d?.name}</p>
                          <p className='text-xs font-medium text-[#57585A]'>Created . {moment(d?.createdAt).format("ll")} . {moment(d?.createdAt).format("LT")}</p>
                        </div>
                      </div>
                      <div className='flex justify-end items-center'>
                        <Tag color={d?.status?.toLowerCase()}>{d?.status}</Tag>
                        <Dropdown menu={{ items: [
                          { key: "view", label: "View", onClick: onView, disabled: !isReady },
                          { key: "delete", label: "Delete", onClick: onDelete },
                        ] }}>
                          <Button onClick={handleOption} loading={deleteQuestTrackLoad} type='text' icon={<PiDotsThreeOutline className='text-2xl' />} />
                        </Dropdown>
                      </div>
                    </BorderHOC>
                  )
                })}
              </div>
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
              <p className='text-xl font-bold text-[#161617]'>Create Question Tracker</p>
              <p className='text-sm font-medium text-[#57585A]'>Automatically capture and organize student questions from each lesson recording.</p>
            </div>
            <Button onClick={onClose} icon={<AiOutlineCloseCircle className='text-xl' />} type='text' shape='circle' />
          </div>
          <Divider className='m-0 !bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]' />
          <Form layout='vertical' onFinish={handleSubmit} form={form}>
            <Form.Item label="Title" name="name">
              <Input placeholder='Enter title' size='large' />
            </Form.Item>
            <Form.Item label="Upload Source Material">
              <Upload.Dragger {...props((file: any) => handleUpload(file, "file_url"))} disabled={postUplLoad}>
                <p className="ant-upload-drag-icon">
                  {postUplLoad ? <ImSpinner className="!text-2xl mx-auto !animate-spin" /> : <LuUploadCloud className="!text-2xl mx-auto" />}
                </p>
                <p hidden={!payload?.file_url} className="text-sm">Document Uploaded.</p>
                <p hidden={payload?.file_url} className="text-sm"><span className='text-primary'>Click to upload</span> or drag and drop</p>
                <p hidden={payload?.file_url} className=" text-xs">File size no more than 10MB</p>
              </Upload.Dragger>
            </Form.Item>
            <Button loading={postQuestTrackLoad} className="bg-[#4970FC]" block size="large" type="primary" htmlType="submit" shape="round">Generate Question Tracker</Button>
          </Form>
        </div>
      </Drawer>

      <Modal
        footer={false}
        open={isRecOpen}
        onCancel={onRecClose}
      >
        <RecordSection successAction={getQuestTrackFetch} />
      </Modal>
    </div>
  )
}

export default QuestionTracker