import React, { useState } from 'react'
import { BorderHOC } from '../../../components'
import { Button, Divider, Drawer, Dropdown, Form, Input, Tag, Upload } from 'antd'
import { LuCopy, LuPlus, LuSearch, LuUploadCloud } from 'react-icons/lu'
import { RxDashboard } from 'react-icons/rx'
import { GoRows } from 'react-icons/go'
import EmptyDisplay from '../../../components/EmptyDisplay'
import { handleCopy, isEqual } from '../../../context/utils'
import { PiDotsThreeOutline } from 'react-icons/pi'
import moment from 'moment'
import { CgNotes } from "react-icons/cg"
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useAWSUploadALS } from '../../../hooks/otherhooks'
import { ImSpinner } from 'react-icons/im'
import { useSearchParams } from 'react-router-dom'
import DetailsSection from './sections/details'
import { TbFilterSearch } from 'react-icons/tb'
import { BiQrScan } from 'react-icons/bi'
import InviteModal from '../../../components/modals/InviteModal'
import ResultSection from './sections/results'
import { useDeleteAdaptiveLearning, useGetAllAdaptiveLearning, usePostAdaptiveLearning } from '../../../hooks/adaptivelearning/adaptivelearning'

type IconProp = {
  className?: string
}
function AdaptiveLearning() {
  const [payload, setPayload] = useState<any>()
  const [params, setParams] = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)
  const [isScan, setIsScan] = useState(false)
  const [list, setList] = useState("grid")
  const onClose = () => setIsOpen(false)
  const unScan = () => setIsScan(false)
  const onOpen = () => setIsOpen(true)
  const onScan = () => setIsScan(true)
  const result = params.get("result")
  const width = window.innerWidth
  const [form] = Form.useForm()
  const tab = params.get("tab")
  const id = params.get("id")

  const handleOption = (e: any) => e?.stopPropagation()
  const handleView = (id?: any, other?: any) => setParams({id, ...(other || {})})
  const inviteURL = "https://app.nurovant.com/als?section=quiz&id=".concat(id || "")

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
  } = useAWSUploadALS()

  const {
    data: getAllALSData,
    refetch: getAllALSFetch,
    isLoading: getAllALSLoad,
  } = useGetAllAdaptiveLearning()

  const {
    mutate: postALSAction,
    isLoading: postALSLoad,
  } = usePostAdaptiveLearning(() => {
    form.resetFields()
    getAllALSFetch()
    setPayload({})
    onClose()
  })

  const {
    mutate: deleteALSAction,
    isLoading: deleteALSLoad,
  } = useDeleteAdaptiveLearning(getAllALSFetch)


  const handleSubmit = (data: any) => postALSAction({...data, ...payload})
  const handleUpload = async (file: any, key: any) => await postUplAction(file).then((res: any) => setPayload({...payload, [key]: res?.Location}))

  if (result) return <ResultSection id={id} result={result} handleSection={handleView} />
  if (id) return <DetailsSection id={id} tab={tab} handleSection={handleView} inviteURL={inviteURL} />
  return (
    <div className='w-full py-5 space-y-5'>
      <div className='w-full'>
        <p className='text-2xl font-bold text-[#161617]'>Adaptive Learning 📚</p>
        <p className='text-sm font-semibold text-[#57585A]'>Organize and manage your lecture materials.</p>
      </div>

      <BorderHOC loading={getAllALSLoad} rounded='rounded-xl' className='w-full h-full'>
        <div className='w-full h-full p-5 space-y-2'>
          <div className='w-full h-full flex flex-col md:flex-row justify-between items-center gap-5'>
            <div className='flex items-center gap-2'>
              <p className='text-2xl font-bold text-[#161617]'>{getAllALSData?.data?.length}</p>
              <p className='text-sm font-semibold text-[#57585A]'>lectures(s)</p>
            </div>

            <div className='h-full flex items-center gap-2'>
              <Button icon={<TbFilterSearch className='text-xl' />} type='text'>Filter</Button>
              <Divider type='vertical' className='m-0 !h-[30px] !bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]' />
              <Button icon={<LuSearch className='text-xl' />} type='text' />
              <Divider type='vertical' className='m-0 !h-[30px] !bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]' />
              {lists.map(({ Icon, key }) => {
                const isKey = isEqual(key, list)
                const handleList = () => setList(key)
                return (<Button className={String(isKey && "bg-[#E7E7E7]")} onClick={handleList} icon={<Icon className='text-lg' />} type='text' shape='circle' />)
              })}
              <Divider type='vertical'  className='m-0 !h-[30px] !bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]' />
              <Button onClick={onOpen} className='!text-sm !font-bold bg-[#4970FC]' icon={<LuPlus className='text-xl' />} size='large' type='primary' shape='round'>Create ALS lecture</Button>
            </div>
          </div>

          <Divider className='m-0 !bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]' />

          <EmptyDisplay hidden={getAllALSData?.data?.length} className='w-full h-[50vh]'>
            <Button onClick={onOpen} className='!text-sm !font-bold bg-[#4970FC]' icon={<LuPlus className='text-xl' />} size='large' type='primary' shape='round'>Create ALS lecture</Button>
          </EmptyDisplay>

          <div hidden={!getAllALSData?.data?.length} className='w-full'>
            <div hidden={!isEqual(list, "grid")} className='w-full h-full'>
              <div className='w-full grid sm:grid-cols-2 md:grid-cols-3 gap-5'>
                {getAllALSData?.data?.map((d: any) => {
                  const onView = () => handleView(d?._id)
                  const onDelete = () => deleteALSAction(d?._id)  
                  const isReady = isEqual(d?.status, "quizResult_saved")
                  return (
                  <BorderHOC key={d?._id} rounded='rounded-xl' className='w-full h-full' childClass='w-full h-full p-3 space-y-3'>
                    <div className='flex justify-between items-center gap-5'>
                      <BorderHOC rounded='rounded-xl' childClass='p-3 bg-[#E1E7FF]' className='!w-auto'>
                        <CgNotes className='text-xl' />
                      </BorderHOC>
                      <Dropdown menu={{ items: [
                      { key: "view", label: "View", onClick: onView, disabled: !isReady },
                      { key: "delete", label: "Delete", onClick: onDelete },
                      ] }}>
                        <Button onClick={handleOption} loading={deleteALSLoad} type='text' icon={<PiDotsThreeOutline className='text-2xl' />} />
                      </Dropdown>
                    </div>

                    <div className='w-full flex justify-between items-end'>
                      <div className='md:col-span-2 space-y-1'>
                        <p className='text-sm font-bold text-[#161617]'>{d?.name}</p>
                        <p className='text-xs font-medium text-[#57585A]'>Created . {moment(d?.createdAt).format("ll")} . {moment(d?.createdAt).format("LT")}</p>
                      </div>
                      <Tag>{d?.status}</Tag>
                    </div>
                  </BorderHOC>
                )})}
              </div>
            </div>

            <div hidden={!isEqual(list, "row")} className='w-full h-full'>
              <div className='w-full space-y-5 overflow-x-auto'>
                {getAllALSData?.data?.map((d: any) => {
                  const url = inviteURL.concat(d?._id)
                  const onView = () => handleView(d?._id)
                  const onDelete = () => deleteALSAction(d?._id)  
                  const isReady = isEqual(d?.status, "quizResult_saved")
                  const onCopy = (e: any) => {handleOption(e); handleCopy(url)}
                  return (
                  <BorderHOC rounded='rounded-xl' className='w-full h-full' childClass='p-2 flex flex-nowrap justify-between items-center gap-5overflow-x-auto'>
                    <div className='w-full flex items-center gap-10'>
                      <BorderHOC rounded='rounded-xl' childClass='p-3 bg-[#E1E7FF]' className='!w-auto'>
                        <CgNotes className='text-xl' />
                      </BorderHOC>
                      <div className='space-y-1'>
                        <p className='text-sm font-bold text-[#161617]'>{d?.name}</p>
                        <p className='text-xs font-medium text-[#57585A]'>Created . {moment(d?.createdAt).format("ll")} . {moment(d?.createdAt).format("LT")}</p>
                      </div>
                      <div className='space-y-1'>
                        <p className='text-sm font-bold text-[#161617]'>Students</p>
                        <p className='text-xs font-medium text-[#57585A]'>-- --</p>
                      </div>
                      <div className=''>
                        <p className='text-sm font-bold text-[#161617]'>Invitation Link</p>
                        <div className='flex items-center gap-2'>
                          <Input value={url} readOnly className='pr-0 rounded-md' size='small' suffix={<Button onClick={onCopy} disabled={!isReady} className='rounded-r-md' size='small' icon={<LuCopy />}>copy</Button>} />
                          <Button onClick={(e) => {setPayload({...payload, id: d?._id}); onScan()}} disabled={!isReady} className='rounded-md' size='small' icon={<BiQrScan />} />
                        </div>
                      </div>
                    </div>
                    <Tag>{d?.status}</Tag>
                    <Dropdown menu={{ items: [
                      { key: "view", label: "View", onClick: onView, disabled: !isReady },
                      { key: "delete", label: "Delete", onClick: onDelete },
                    ] }}>
                      <Button onClick={handleOption} loading={deleteALSLoad} type='text' icon={<PiDotsThreeOutline className='text-2xl' />} />
                    </Dropdown>
                  </BorderHOC>
                )})}
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
              <p className='text-xl font-bold text-[#161617]'>Create a new ALS lecture</p>
              <p className='text-sm font-medium text-[#57585A]'>Add the necessary details to your course.</p>
            </div>
            <Button onClick={onClose} icon={<AiOutlineCloseCircle className='text-xl' />} type='text' shape='circle' />
          </div>
          <Divider className='m-0 !bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]' />
          <Form layout='vertical' onFinish={handleSubmit} form={form}>
            <Form.Item label="Lecture Title" name="name">
              <Input placeholder='Enter title' size='large' />
            </Form.Item>
            <Form.Item label="Upload Lecture Material">
              <Upload.Dragger {...props((file: any) => handleUpload(file, "lecture_material"))} disabled={postUplLoad}>
                <p className="ant-upload-drag-icon">
                  {postUplLoad ? <ImSpinner className="!text-2xl mx-auto !animate-spin" /> : <LuUploadCloud className="!text-2xl mx-auto" />}
                </p>
                <p hidden={!payload?.lecture_material} className="text-sm">Document Uploaded.</p>
                <p hidden={payload?.lecture_material} className="text-sm"><span className='text-primary'>Click to upload</span> or drag and drop</p>
                <p hidden={payload?.lecture_material} className=" text-xs">File size no more than 10MB</p>
              </Upload.Dragger>
            </Form.Item>
            <Form.Item label="Upload Lecture Textbook">
              <Upload.Dragger {...props((file: any) => handleUpload(file, "lecture_textbook"))} disabled={postUplLoad}>
                <p className="ant-upload-drag-icon">
                  {postUplLoad ? <ImSpinner className="!text-2xl mx-auto !animate-spin" /> : <LuUploadCloud className="!text-2xl mx-auto" />}
                </p>
                <p hidden={!payload?.lecture_textbook} className="text-sm">Document Uploaded.</p>
                <p hidden={payload?.lecture_textbook} className="text-sm"><span className='text-primary'>Click to upload</span> or drag and drop</p>
                <p hidden={payload?.lecture_textbook} className="text-xs">It is recommended to upload files in the ".txt" format for improved output.</p>
              </Upload.Dragger>
            </Form.Item>
            <Button loading={postALSLoad} className="bg-[#4970FC]" block size="large" type="primary" htmlType="submit" shape="round">Create ALS lecture</Button>
          </Form>
        </div>
      </Drawer>

      <InviteModal isOpen={isScan} onClose={unScan} otherValue={inviteURL.concat(payload?.id)} />
    </div>
  )
}

export default AdaptiveLearning