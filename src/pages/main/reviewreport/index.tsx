import React, { useState } from 'react'
import { BorderHOC } from '../../../components'
import { Button, DatePicker, Divider, Drawer, Form, Input, Modal, Radio, Select, TableColumnProps, Upload } from 'antd'
import { LuPlus, LuSearch, LuUploadCloud } from 'react-icons/lu'
import { HiOutlineSparkles } from 'react-icons/hi2'
import EmptyDisplay from '../../../components/EmptyDisplay'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useAWSUpload } from '../../../hooks/otherhooks'
import { ImSpinner } from 'react-icons/im'
import { CiEdit, CiMenuKebab } from "react-icons/ci"
import { useSearchParams } from 'react-router-dom'
import { TbFilterSearch } from 'react-icons/tb'
import CustomTable from '../../../components/CustomTable'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { isEqual } from '../../../context/utils'
import moment from 'moment'
import { LiaShareAltSolid } from 'react-icons/lia'
import { FiDownloadCloud } from 'react-icons/fi'

function ReviewReport() {
  const [actForm, setActForm] = useState("objective")
  const [isCreate, setIsCreate] = useState(false)
  const onCloseCreate = () => setIsCreate(false)
  const [payload, setPayload] = useState<any>()
  const [params, setParams] = useSearchParams()
  const onOpenCreate = () => setIsCreate(true)
  const [isView, setIsView] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpt, setIsOpt] = useState(false)
  const onOpenView = () => setIsView(true)
  const onCloseOpt = () => setIsOpt(false)
  const onOpenOpt = () => setIsOpt(true)
  const onCloseView = () => {
    setIsView(false)
    setParams({})
  }
  const onClose = () => {
    setActForm("objective")
    setIsOpen(false)
  }
  const onOpen = () => setIsOpen(true)
  const width = window.innerWidth
  // const id = params.get("id")

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

  const handleView = () => {
    setParams({id: "bytubytiyygvutfgbytty"})
    onCloseCreate()
    onCloseOpt()
    onOpenView()
    onClose()
  }

  const handleSubmit = () => {
    if(!isEqual(actForm, "course")) return setActForm("course")
    handleView()
  } 

  const handleUpload = async (file: any, key: any) => await postUplAction(file).then((res: any) => setPayload({...payload, [key]: res?.Location}))

  const CoverageDisplay = ({ percent = 0 }: { percent?: number }) => (
    <div className='w-full flex items-center gap-1'>
      <p className='text-sm font-medium text-[#57585A]'>{percent}%</p>
      {Array.from(Array(20).keys()).map(d => {
        const isActive = (((d + 1) / 2) <= (percent / 10))
        return <div className={'h-[20px] p-0.5 bg-[#E1E7FF] '.concat(String(isActive && "!bg-[#4970FC]"))} />
      })}
    </div>
  )

  const GenerateForm = () => {
    const { key, label, btnText } = [
      { key: "objective", label: "Learning Objectives", btnText: "Next" },
      { key: "course", label: "Course Content", btnText: "Generate Report" },
    ].find(({ key }) => isEqual(key, actForm)) || { key: "", label: "" }
    return (
    <Form layout='vertical' onFinish={handleSubmit}>
      <Form.Item label={label} name={key}>
        <Input.TextArea rows={5} placeholder={'Enter '.concat(label.toLowerCase())} size='large' />
      </Form.Item>
      <Divider className='m-0'>Or</Divider>
      <Form.Item label={"Upload ".concat(label)}>
        <Upload.Dragger {...props((file: any) => handleUpload(file, key))} disabled={postUplLoad}>
          <p className="ant-upload-drag-icon">
            {postUplLoad ? <ImSpinner className="!text-2xl mx-auto !animate-spin" /> : <LuUploadCloud className="!text-2xl mx-auto" />}
          </p>
          <p hidden={!payload?.[key]} className="text-sm">Document Uploaded.</p>
          <p hidden={payload?.[key]} className="text-sm"><span className='text-primary'>Click to upload</span> or drag and drop</p>
          <p hidden={payload?.[key]} className=" text-xs">File size no more than 10MB</p>
        </Upload.Dragger>
      </Form.Item>
      <Button className="bg-[#4970FC]" block size="large" type="primary" htmlType="submit" shape="round">{btnText}</Button>
    </Form>
  )}

  const column: TableColumnProps[] = [
    {
      title: "Objective",
      render: () => <p className='text-base font-semibold text-[#57585A]'>Understand Newton's Laws</p>,
    },
    {
      title: "Coverage %",
      render: () => <CoverageDisplay percent={25} />
    },
    {
      title: "Status",
      render: () => {
        const { text, color } = [
        { key: true, text: "Aligned ✅", color: "text-[#17B26A]" },
        { key: false, text: "⚠️ Needs Work", color: "text-[#DC1E11]"}
      ].find(({ key }) => key) || { text: "Undefined", color: "text-[#57585A]" }
      return <p className={'text-base font-semibold '.concat(color)}>{text}</p>
    }},
    {
      title: "Recommendation",
      render: () => "Add practical examples or case studies",
    },
    {
      title: "Actions",
      render: () => <Button onClick={handleView} type='text' icon={<CiMenuKebab className='text-2xl text-[#4970FC]' />} />
    }
  ]
  return (
    <div className='w-full py-5 space-y-5'>
      <div className='w-full'>
        <p className='text-2xl font-bold text-[#161617]'>Review & Report 📊</p>
        <p className='text-sm font-semibold text-[#57585A]'>Generate insights and tailored reports with ease</p>
      </div>

      <BorderHOC rounded='rounded-xl' className='w-full h-full'>
        <div className='w-full h-full p-5 space-y-2'>
          <div className='w-full h-full flex flex-col md:flex-row justify-between items-center gap-5'>
            <div className='flex items-center gap-2'>
              <p className='text-2xl font-bold text-[#161617]'>0</p>
              <p className='text-sm font-semibold text-[#57585A]'>report(s)</p>
            </div>

            <div className='h-full flex items-center gap-2'>
              <Button icon={<TbFilterSearch className='text-xl' />} type='text'>Filter</Button>
              <Divider type='vertical' className='m-0 !h-[30px] !bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]' />
              <Button icon={<LuSearch className='text-xl' />} type='text' />
              <Divider type='vertical'  className='m-0 !h-[30px] !bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]' />
              <Button onClick={onOpenOpt} className='!text-sm !font-bold bg-[#4970FC]' icon={<HiOutlineSparkles className='text-xl' />} size='large' type='primary' shape='round'>Generate Reports</Button>
            </div>
          </div>

          <Divider className='m-0 !bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]' />

          <EmptyDisplay hidden className='w-full h-[50vh]' description='You don’t have any review <br /> & report yet'>
            <Button onClick={onOpenOpt} className='!text-sm !font-bold bg-[#4970FC]' icon={<HiOutlineSparkles className='text-xl' />} size='large' type='primary' shape='round'>Generate Reports</Button>
          </EmptyDisplay>

          <div hidden={false} className='w-full h-full'>
            <CustomTable
              pagination={false}
              column={column}
              data={[{}]}
              bordered
            />
          </div>
        </div>
      </BorderHOC>

      {/* view report details modal >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
      <Modal
        open={isView}
        footer={false}
        closeIcon={false}
        onCancel={onCloseView}
        width={width <= 500 ? width : 900}
        classNames={{ content: "!bg-transparent !shadow-none" }}
      >
        <div className='w-full p-5 space-y-5 bg-white rounded-3xl'>
          <div className='flex justify-between'>
            <div className=''>
              <p className='text-2xl font-bold text-[#161617]'>Program Review Report</p>
              <p className='text-sm font-semibold text-[#57585A]'>Generated: {moment().format("LLL")}</p>
              <p className='text-sm font-semibold text-[#57585A]'>Purpose: Accreditation | Corporate Partners | Internal Review</p>
            </div>
            <div className='flex items-center gap-3'>
              <Button type='text' shape='round' icon={<CiEdit className='text-2xl' />} className='!text-primary' size='small'>Edit</Button>
              <Button type='text' shape='circle' icon={<LiaShareAltSolid className='text-2xl text-primary' />} />
              <Button type='text' shape='circle' icon={<FiDownloadCloud className='text-xl text-primary' />} />
            </div>
          </div>
          <Divider className='m-0 !bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]' />
          <div className='w-full h-full'>
            <CustomTable
              column={[
                { title: "Category", dataIndex: "category" },
                { title: "Result", dataIndex: "result" },
              ]}
              data={[
                { category: "Content Coverage", result: "75% aligned with the uploaded content" },
                { category: "Coverage Gaps", result: "[⚠️ 2 Areas Detected]" },
                { category: "Recommendations", result: "Include real-world problems and quizzes." },
              ]}
              pagination={false}
              bordered
            />
          </div>
          <Button onClick={onCloseView} className='!text-sm !font-bold bg-[#4970FC]' size='large' type='primary' shape='round'>Go to Dashboard</Button>
        </div>
      </Modal>

      {/* generate option modal >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
      <Modal
        open={isOpt}
        footer={false}
        closeIcon={false}
        onCancel={onCloseOpt}
        width={width <= 500 ? width : 500}
        classNames={{ content: "!bg-transparent !shadow-none" }}
      >
        <div className='w-full p-5 space-y-5 bg-white rounded-3xl'>
          <div className='flex justify-between'>
            <div className=''>
              <p className='text-2xl font-bold text-[#161617]'>Create Report & Review</p>
              <p className='text-sm font-semibold text-[#57585A]'>Generate insights and tailored reports with ease</p>
            </div>
            <Button onClick={onCloseOpt} type='text' icon={<IoIosCloseCircleOutline className='text-2xl text-primary' />} />
          </div>
          <Divider className='m-0 !bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]' />
          <div className='space-y-5 pb-5'>
            {[
              { title: "Generate Report", label: "Generate Report Based on Learning Objectives or Content", Icon: () => <HiOutlineSparkles />, color: "bg-[#4970FC]", action: onOpen },
              { title: "Create Custom Report", label: "Create Custom Reports For Accreditation purpose", Icon: () => <LuPlus />, color: "bg-[#F79009]", action: onOpenCreate },
            ].map(({ Icon, color, label, title, action }) => <BorderHOC onClick={action} rounded='rounded-xl' className='w-full h-full hover:shadow' childClass='py-3 px-3 space-y-2 cursor-pointer'>
              <div className='flex items-center gap-3'>
                <Button className={" ".concat(color)} type='primary' icon={<Icon />} />
                <p className='text-base font-bold text-[#161617]'>{title}</p>
              </div>
              <p className='text-sm font-semibold text-[#57585A]'>{label}</p>
            </BorderHOC>)}
          </div>
        </div>
      </Modal>

      {/* generate drawer >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
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
              <p className='text-xl font-bold text-[#161617]'>Generate Report</p>
              <p className='text-sm font-medium text-[#57585A]'>Add the necessary details to generate your report.</p>
            </div>
            <Button onClick={onClose} icon={<AiOutlineCloseCircle className='text-xl' />} type='text' shape='circle' />
          </div>
          <Divider className='m-0 !bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]' />
          <GenerateForm />
        </div>
      </Drawer>

      {/* create custom drawer >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
      <Drawer
        footer={false}
        open={isCreate}
        closeIcon={false}
        onClose={onCloseCreate}
        width={width <= 500 ? width : 500}
        classNames={{ content: "!bg-transparent", wrapper: "!shadow-none" }}
      >
        <div className='w-full p-5 space-y-5 bg-white rounded-3xl'>
          <div className='w-full flex justify-between gap-5'>
            <div className=''>
              <p className='text-xl font-bold text-[#161617]'>Create Custom Report</p>
              <p className='text-sm font-medium text-[#57585A]'> Create Custom Reports For Accreditation purpose</p>
            </div>
            <Button onClick={onCloseCreate} icon={<AiOutlineCloseCircle className='text-xl' />} type='text' shape='circle' />
          </div>
          <Divider className='m-0 !bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]' />
          <Form layout='vertical' onFinish={handleSubmit}>
            <Form.Item label="Report Title" name="title">
              <Input placeholder='Enter report title' size='large' />
            </Form.Item>
            <Form.Item label="Report Purpose" name="purpose">
              <Select mode='multiple' placeholder='Select report purpose' size='large' options={["Accreditation Body", "Corporate Partner", "Internal Review"].map(d => ({ label: d, value: d }))} />
            </Form.Item>
            <Form.Item label="Select Focus Area" name="focus">
              <Radio.Group size='large'>
                {["Learning Objective Alignment", "Student Performance Analysis", "Content Gaps", "AI Recommendations"].map(d => (
                  <Radio value={d}>{d}</Radio>
                ))}
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Time Range">
              <div className='w-full grid grid-cols-2 gap-5'>
                <Form.Item label="From" name="from">
                  <DatePicker size='large' className='w-full' />
                </Form.Item>
                <Form.Item label="To" name="to">
                  <DatePicker size='large' className='w-full' />
                </Form.Item>
              </div>
            </Form.Item>
            <Form.Item label="Report Format" name="format">
              <Select mode='multiple' placeholder='Select report format' size='large' options={["PDF", "EXCEL", "MS WORD"].map(d => ({ label: d, value: d }))} />
            </Form.Item>
            <Button className="bg-[#4970FC]" block size="large" type="primary" htmlType="submit" shape="round">Generate Custom Report</Button>
          </Form>
        </div>
      </Drawer>
    </div>
  )
}

export default ReviewReport