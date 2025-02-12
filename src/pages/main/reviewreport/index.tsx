import React, { useRef, useState } from 'react'
import { BorderHOC } from '../../../components'
import { Button, DatePicker, Divider, Drawer, Form, Input, Modal, Radio, Select, TableColumnProps, Upload } from 'antd'
import { LuPlus, LuSearch, LuUploadCloud } from 'react-icons/lu'
import { HiOutlineSparkles } from 'react-icons/hi2'
import EmptyDisplay from '../../../components/EmptyDisplay'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useAWSUpload } from '../../../hooks/otherhooks'
import { ImSpinner } from 'react-icons/im'
import { CiEdit, CiMenuKebab } from "react-icons/ci"
import { TbFilterSearch } from 'react-icons/tb'
import CustomTable from '../../../components/CustomTable'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { isEqual } from '../../../context/utils'
import moment from 'moment'
import generatePDF from 'react-to-pdf'
import { LiaShareAltSolid } from 'react-icons/lia'
import { FiDownloadCloud } from 'react-icons/fi'
import { useGetReviewReports, usePostReviewReport, usePostReviewReportCreate } from '../../../hooks/reviewreport/reviewreport'

function ReviewReport() {
  const [actForm, setActForm] = useState("learning_objectives")
  const [isCreate, setIsCreate] = useState(false)
  const [selected, setSelected] = useState<any>()
  const onCloseCreate = () => setIsCreate(false)
  const [payload, setPayload] = useState<any>()
  const onOpenCreate = () => setIsCreate(true)
  const [isView, setIsView] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpt, setIsOpt] = useState(false)
  const onOpenView = () => setIsView(true)
  const onCloseOpt = () => setIsOpt(false)
  const onOpenOpt = () => setIsOpt(true)
  const targetRef = useRef()
  const onCloseView = () => {
    setIsView(false)
  }
  const onClose = () => {
    setActForm("learning_objectives")
    setIsOpen(false)
  }
  const onOpen = () => setIsOpen(true)
  const width = window.innerWidth

  const handlePrint = () => generatePDF( targetRef, {
    filename: "review_&_report".concat(".pdf")
  })

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

  const {
    data:  getRepsData,
    refetch: getRepsFetch,
    isLoading: getRepsLoad,
  } = useGetReviewReports()

  const handleSuccess = () => {
    onCloseCreate()
    getRepsFetch()
    onCloseView()
    onCloseOpt()
    onClose()
  }

  const {
    mutate: postRepAction,
    isLoading: postRepLoad,
  } = usePostReviewReport(handleSuccess)

  const {
    mutate: postRepCreateAction,
    isLoading: postRepCreateLoad,
  } = usePostReviewReportCreate(handleSuccess)

  const handleView = (data: any) => {
    setSelected(data)
    onCloseCreate()
    onCloseOpt()
    onOpenView()
    onClose()
  }

  const handleCreate = () => {
    setPayload({...payload, create: true})
    onOpen()
  }

  const handleNext = () => {
    setPayload({...payload, create: false})
    onOpenCreate()
  }

  const handleSubmit = (data: any) => {
    const payData = {...data, ...payload, focus_area: [data?.focus_area], time_range: {from: payload?.from, to: payload?.to} }
    if (!isEqual(actForm, "course_content")) return setActForm("course_content")
    if (payload?.create) return handleNext()
    if (isCreate) return postRepCreateAction(payData)
    postRepAction({...data, ...payload})
  } 

  const handleUpload = async (file: any, key: any) => await postUplAction(file).then((res: any) => setPayload({...payload, [key]: res?.Location}))

  const CoverageDisplay = ({ percent = 0 }: { percent?: number }) => (
    <div className='w-full flex items-center gap-1'>
      <p className='text-sm font-medium text-[#57585A]'>{percent}%</p>
      {Array.from(Array(20).keys()).map(d => {
        const isActive = (((d + 1) / 2) <= (Number(percent) / 10))
        return <div className={'h-[20px] p-0.5 bg-[#E1E7FF] '.concat(String(isActive && "!bg-[#4970FC]"))} />
      })}
    </div>
  )

  const column: TableColumnProps[] = [
    {
      title: "Objective",
      render: (d) => <p className='text-base font-semibold text-[#57585A]'>{d?.report_title || moment(d?.createdAt).format("lll").concat(" Objective")}</p>,
    },
    {
      title: "Coverage %",
      render: (d) => <CoverageDisplay percent={d?.coverage_percentage} />
    },
    {
      title: "Status",
      render: (d) => {
        const num = Number(d?.coverage_percentage)
        const { text, color } = [
        { key: (num >= 80), text: "Aligned ✅", color: "text-[#17B26A]" },
        { key: (num >= 50 && num < 80), text: "Average ✅", color: "text-[#4970FC]" },
        { key: (num < 50), text: "⚠️ Needs Work", color: "text-[#DC1E11]"}
      ].find(({ key }) => key) || { text: "Undefined", color: "text-[#57585A]" }
      return <p className={'text-base font-semibold '.concat(color)}>{text}</p>
    }},
    {
      title: "Recommendation",
      render: (d) => <p className='truncate'>{d?.recommendations?.at(0) || "NIL"}</p>,
    },
    {
      fixed: "right",
      title: "Actions",
      render: (d) => <Button onClick={() => handleView(d)} type='text' icon={<CiMenuKebab className='text-2xl text-[#4970FC]' />} />
    }
  ]

  const { key, label, btnText } = [
    { key: "learning_objectives", label: "Learning Objectives", btnText: "Next" },
    { key: "course_content", label: "Course Content", btnText: (payload?.create ? "Next" : "Generate Report") },
  ].find(({ key }) => isEqual(key, actForm)) || { key: "", label: "" }
  const uploadKey = key.concat("_url")
  return (
    <div className='w-full py-5 space-y-5'>
      <div className='w-full'>
        <p className='text-2xl font-bold text-[#161617]'>Review & Report 📊</p>
        <p className='text-sm font-semibold text-[#57585A]'>Generate insights and tailored reports with ease</p>
      </div>

      <BorderHOC loading={getRepsLoad} rounded='rounded-xl' className='w-full h-full'>
        <div className='w-full h-full p-5 space-y-2'>
          <div className='w-full h-full flex flex-col md:flex-row justify-between items-center gap-5'>
            <div className='flex items-center gap-2'>
              <p className='text-2xl font-bold text-[#161617]'>{getRepsData?.data?.length}</p>
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

          <EmptyDisplay hidden={getRepsData?.data?.length} className='w-full h-[50vh]' description='You don’t have any review <br /> & report yet'>
            <Button onClick={onOpenOpt} className='!text-sm !font-bold bg-[#4970FC]' icon={<HiOutlineSparkles className='text-xl' />} size='large' type='primary' shape='round'>Generate Reports</Button>
          </EmptyDisplay>

          <div hidden={!getRepsData?.data?.length} className='w-full h-full'>
            <CustomTable
              data={getRepsData?.data}
              pagination={false}
              column={column}
              bordered
            />
          </div>
        </div>
      </BorderHOC>

      {/* view report details modal >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
      <Modal
        open={isView}
        footer={false}
        style={{top: 0}}
        closeIcon={false}
        onCancel={onCloseView}
        width={width <= 500 ? width : 900}
        classNames={{ content: "!bg-transparent !shadow-none" }}
      >
        <div className='w-full h-full'>
          <div className='w-full h-full p-5 space-y-5 bg-white rounded-3xl'>
            <div className='flex justify-between'>
              <div className=''>
                <p className='text-2xl font-bold text-[#161617] !capitalize'>{selected?.review_type?.toLowerCase()} Review Report</p>
                <p className='text-sm font-semibold text-[#57585A]'>Generated: {moment(selected?.createdAt).format("LLL")}</p>
                <p className='text-sm font-semibold text-[#57585A]' hidden={!selected?.focus_area?.length}>Focus Area: {selected?.focus_area?.join(" | ")}</p>
                <p className='text-sm font-semibold text-[#57585A]' hidden={!selected?.review_purpose?.length}>Purpose: {selected?.review_purpose?.join(" | ")}</p>
              </div>
              <div className='flex items-center gap-3'>
                <Button hidden type='text' shape='round' icon={<CiEdit className='text-2xl' />} className='!text-primary' size='small'>Edit</Button>
                <Button hidden type='text' shape='circle' icon={<LiaShareAltSolid className='text-2xl text-primary' />} />
                <Button onClick={handlePrint} type='text' shape='circle' icon={<FiDownloadCloud className='text-xl text-primary' />} />
              </div>
            </div>
            <Divider className='m-0 !bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]' />
            <div ref={targetRef as any} className='w-full h-full'>
              <CustomTable
                column={[
                  { title: "Category", dataIndex: "category", fixed: "left" },
                  { title: "Result", dataIndex: "result" },
                ]}
                data={[
                  { category: "Content Coverage", result: selected?.coverage_percentage?.concat("% aligned with the uploaded content") },
                  { category: "Coverage Gaps", result: `[⚠️ ${selected?.recommendations?.length} Areas Detected]` },
                  { category: "Recommendations", result: <ul className='!list-disc px-2'>
                    {selected?.recommendations?.map((d: any) => (
                      <li className='text-sm whitespace-normal'>{d}</li>
                    ))}
                  </ul> },
                  { category: "Section & Details", result: <div className='divide-y'>
                    {selected?.section_and_details?.map((d: any) => (
                      <div className='grid md:grid-cols-2 gap-x-5 gap-y-1 py-3'>
                        <p className='text-sm'>ID: <b>{d?.standard_id}</b></p>
                        <p className='text-sm'>Score: <b>{d?.score}</b></p>
                        <p className='md:col-span-2 text-sm whitespace-normal'>Feedback: <b>{d?.feedback}</b></p>
                      </div>
                    ))}
                  </div> }
                ]}
                pagination={false}
                bordered
              />
            </div>
            <Button onClick={onCloseView} className='!text-sm !font-bold bg-[#4970FC]' size='large' type='primary' shape='round'>Go to Dashboard</Button>
          </div>
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
              { title: "Create Custom Report", label: "Create Custom Reports For Accreditation purpose", Icon: () => <LuPlus />, color: "bg-[#F79009]", action: handleCreate },
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
          <Form layout='vertical' onFinish={handleSubmit}>
            <Form.Item label={label} name={key}>
              <Input.TextArea rows={5} placeholder={'Enter '.concat(label.toLowerCase())} onChange={({target:{value}}) => setPayload({...payload, [key]: value})} size='large' />
            </Form.Item>
            <Divider className='m-0'>Or</Divider>
            <Form.Item label={"Upload ".concat(label)}>
              <Upload.Dragger {...props((file: any) => handleUpload(file, uploadKey))} disabled={postUplLoad}>
                <p className="ant-upload-drag-icon">
                  {postUplLoad ? <ImSpinner className="!text-2xl mx-auto !animate-spin" /> : <LuUploadCloud className="!text-2xl mx-auto" />}
                </p>
                <p hidden={!payload?.[uploadKey]} className="text-sm">Document Uploaded.</p>
                <p hidden={payload?.[uploadKey]} className="text-sm"><span className='text-primary'>Click to upload</span> or drag and drop</p>
                <p hidden={payload?.[uploadKey]} className=" text-xs">File size no more than 10MB</p>
              </Upload.Dragger>
            </Form.Item>
            <Button loading={postRepLoad} className="bg-[#4970FC]" block size="large" type="primary" htmlType="submit" shape="round">{btnText}</Button>
          </Form>
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
            <Form.Item label="Report Title" name="report_title">
              <Input placeholder='Enter report title' size='large' />
            </Form.Item>
            <Form.Item label="Report Purpose" name="review_purpose">
              <Select mode='multiple' placeholder='Select report purpose' size='large' options={["Accreditation Body", "Corporate Partner", "Internal Review"].map(d => ({ label: d, value: d }))} />
            </Form.Item>
            <Form.Item label="Select Focus Area" name="focus_area">
              <Radio.Group size='large'>
                {["Learning Objective Alignment", "Student Performance Analysis", "Content Gaps", "AI Recommendations"].map(d => (
                  <Radio value={d}>{d}</Radio>
                ))}
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Time Range">
              <div className='w-full grid grid-cols-2 gap-5'>
                <Form.Item label="From">
                  <DatePicker.YearPicker size='large' className='w-full' onChange={(d, from) => setPayload({...payload, from})} />
                </Form.Item>
                <Form.Item label="To">
                  <DatePicker.YearPicker size='large' className='w-full' onChange={(d, to) => setPayload({...payload, to})} />
                </Form.Item>
              </div>
            </Form.Item>
            <Form.Item label="Report Format" name="report_format">
              <Select placeholder='Select report format' size='large' options={["PDF", "EXCEL", "MS WORD"].map(d => ({ label: d, value: d }))} />
            </Form.Item>
            <Button loading={postRepCreateLoad} className="bg-[#4970FC]" block size="large" type="primary" htmlType="submit" shape="round">Generate Custom Report</Button>
          </Form>
        </div>
      </Drawer>
    </div>
  )
}

export default ReviewReport