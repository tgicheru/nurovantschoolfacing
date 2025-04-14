import React, { useState } from 'react'
import { BorderHOC } from '../../../components'
import { Button, Divider, Drawer, Dropdown, Form, Input, Upload, Image, Select } from 'antd'
import { LuDownload, LuPlus, LuSearch, LuUpload, LuUploadCloud } from 'react-icons/lu'
import { RxDashboard } from 'react-icons/rx'
import { GoRows } from 'react-icons/go'
import EmptyDisplay from '../../../components/EmptyDisplay'
import { isEqual } from '../../../context/utils'
import { PiBookOpenText, PiDotsThreeOutline } from 'react-icons/pi'
import moment from 'moment'
import { CgImage } from "react-icons/cg"
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useAWSUpload, useGetJurisdiction, useGetSingleJurisdiction, useGetStandardSet } from '../../../hooks/otherhooks'
import { ImSpinner } from 'react-icons/im'
import { useSearchParams } from 'react-router-dom'
import { TbFilterSearch } from 'react-icons/tb'
import InviteModal from '../../../components/modals/InviteModal'
import { useCreateCourse, useGetCourses } from '../../../hooks/courses/courses'
import { FiBook, FiUploadCloud } from 'react-icons/fi'
import { grades, states } from '../../../constants'
import { FaChevronLeft } from 'react-icons/fa'
import CourseDetails from './sections/details'
import ContinuousFeedbackSection from './sections/feedbacks'
import GroupActivitiesSection from './sections/group-activities'
import GroupAnalysisSection from './sections/group-analysis'
import SetupGroupActivity from './sections/setup-group-activity'
import PacingGuideSection from './sections/pacing-guide'
import PacingGuideModal from './components/pacing-guide-modal'

type IconProp = {
  className?: string
}
function CoursePage() {
  const [isCreate, setIsCreate] = useState(false)
  const [payload, setPayload] = useState<any>()
  const [params, setParams] = useSearchParams()
  const onOpenCreate = () => setIsCreate(true)
  const [isOpen, setIsOpen] = useState(false)
  const [isScan, setIsScan] = useState(false)
  const [list, setList] = useState("grid")
  const onClose = () => setIsOpen(false)
  const unScan = () => setIsScan(false)
  const section = params.get("section")
  const onOpen = () => setIsOpen(true)
  const width = window.innerWidth
  const [form] = Form.useForm()
  const [limit] = useState(10)
  const id = params.get("id")
  const [page] = useState(1)
  const onCloseCreate = () => {
    setIsCreate(false)
    setPayload({})
  }
  
  const three_month = new Date()
  three_month.setMonth(three_month.getMonth() + 3)
  const end_date = three_month.toISOString().split("T")[0]
  const start_date = new Date().toISOString().split("T")[0]

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
  } = useAWSUpload()

  const {
    data: getJuriesData,
    isLoading: getJuriesLoad,
  } = useGetJurisdiction()
  
  const {
    data: getJuryData,
    isLoading: getJuryLoad,
  } = useGetSingleJurisdiction(payload?.standard)

  const {
    data: getStanSetData,
    isLoading: getStanSetLoad,
  } = useGetStandardSet(payload?.jurisdiction);

  const {
    data: getAllCoursesData,
    refetch: getAllCoursesFetch,
    isLoading: getAllCoursesLoad,
  } = useGetCourses({limit, page}, ["page"])

  const {
    mutate: postCourseAction,
    isLoading: postCourseLoad,
  } = useCreateCourse(() => {
    getAllCoursesFetch()
    form.resetFields()
    onCloseCreate()
    setPayload({})
    onClose()
  })

  const jurisdictions = getJuriesData?.data?.map((d: any) => ({value: d?.id, label: d?.title}))
  const jurisdiction = getJuryData?.data?.standardSets?.map((d: any) => ({value: d?.id, label: d?.title}))

  const handleUpload = async (file: any, key: any) => await postUplAction(file).then((res: any) => setPayload({...payload, [key]: res?.Location}))
  const handleSubmit = (data: any) => postCourseAction({...data, ...payload, start_date, end_date, learning_standards: [getStanSetData?.data], learning_standard_url: ""})

  const options = [
    {
      key: "course",
      color: "bg-[#17B26A]",
      title: "Create a new course",
      Icon: () => <PiBookOpenText />,
      description: "Create a course and add lectures for your students",
      steps: [
        { title: "Create course", description: "Add the necessary details to your course.", next: () => setPayload({...payload, step: 1}) },
        { title: "One more thing!", description: "Set clear goals to guide and measure student progress effectively", back: () => setPayload({...payload, step: 0}) },
      ]
    },
    {
      key: "lms",
      color: "bg-[#F79009]",
      title: "Import from LMS",
      Icon: () => <FiUploadCloud />,
      description: "Create a course by uploading your LMS",
    },
    {
      key: "lecture",
      color: "bg-[#4970FC]",
      Icon: () => <FiBook />,
      title: "Create Quick Lecture",
      description: "Inputting a specific theme, subtopic, or learning goal ",
    },
  ]

  const sections = [
    { key: "pacing-guide", Component: () => <PacingGuideSection /> },
    { key: "group-analysis", Component: () => <GroupAnalysisSection /> },
    { key: "group-activities", Component: () => <GroupActivitiesSection /> },
    { key: "setup-group-activity", Component: () => <SetupGroupActivity /> },
    { key: "continuous-feedback", Component: () => <ContinuousFeedbackSection /> },
  ]

  const currentOption = options?.find(({ key }) => isEqual(payload?.type, key))
  const currentStep = (currentOption?.steps || [])?.at(payload?.step || 0)

  if (section) return sections?.find(({key}) => isEqual(section, key))?.Component?.() || null
  if (id) return <CourseDetails />
  return (
    <div className='w-full py-5 space-y-5'>
      <div className='w-full flex justify-between items-center'>
        <div>
          <p className='text-2xl font-bold text-[#161617]'>Courses 📚</p>
          <p className='text-sm font-semibold text-[#57585A]'>Organize and manage your lecture materials.</p>
        </div>

        <div className="flex items-center gap-3">
          <div>
            <p className='text-sm font-bold text-[#161617]'>Students</p>
            <p className='text-xs font-semibold text-[#57585A]'>-- --</p>
          </div>
          <Button onClick={() => setParams({section: "pacing-guide"})} shape='round' size='large' icon={<LuDownload />}>My Pacing Guides</Button>
          <PacingGuideModal isUpload />
        </div>
      </div>

      <BorderHOC loading={getAllCoursesLoad} rounded='rounded-xl' className='w-full h-full'>
        <div className='w-full h-full p-5 space-y-2'>
          <div className='w-full h-full flex flex-col md:flex-row justify-between items-center gap-5'>
            <div className='flex items-center gap-2'>
              <p className='text-2xl font-bold text-[#161617]'>{getAllCoursesData?.data?.length}</p>
              <p className='text-sm font-semibold text-[#57585A]'>course(s)</p>
            </div>

            <div className='h-full flex items-center gap-2'>
              <Button icon={<TbFilterSearch className='text-xl' />} type='text'>Filter</Button>
              {/* <Button className='bg-[#E1E7FF] text-primary' size='large' shape='round' icon={<LiaShareAltSolid className='text-xl' />} type='primary' iconPosition='end'>Share Course</Button> */}
              <Divider type='vertical' className='m-0 !h-[30px] !bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]' />
              <Button icon={<LuSearch className='text-xl' />} type='text' />
              <Divider type='vertical' className='m-0 !h-[30px] !bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]' />
              {lists.map(({ Icon, key }) => {
                const isKey = isEqual(key, list)
                const handleList = () => setList(key)
                return (<Button className={String(isKey && "bg-[#E7E7E7]")} onClick={handleList} icon={<Icon className='text-lg' />} type='text' shape='circle' />)
              })}
              <Divider type='vertical'  className='m-0 !h-[30px] !bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]' />
              <Button onClick={onOpen} className='!text-sm !font-bold bg-[#4970FC]' icon={<LuPlus className='text-xl' />} size='large' type='primary' shape='round'>Create course</Button>
            </div>
          </div>

          <Divider className='m-0 !bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]' />

          <EmptyDisplay hidden={getAllCoursesData?.data?.length} className='w-full h-[50vh]'>
            <Button onClick={onOpen} className='!text-sm !font-bold bg-[#4970FC]' icon={<LuPlus className='text-xl' />} size='large' type='primary' shape='round'>Create course</Button>
          </EmptyDisplay>

          <div hidden={!getAllCoursesData?.data?.length} className='w-full space-y-3'>
            <div hidden={!isEqual(list, "grid")} className='w-full h-full'>
              <div className='w-full grid sm:grid-cols-2 md:grid-cols-3 gap-5'>
                {getAllCoursesData?.data?.map((d: any) => {
                  const onView = () => handleView(d?._id)
                  return (
                  <BorderHOC key={d?._id} rounded='rounded-xl' className='w-full h-full' childClass='w-full h-full p-3 space-y-3'>
                    <div className='w-full h-[100px] flex justify-center items-center'>
                      <Image className='!w-full !rounded-xl' height={100} src={d?.course_image} alt={d?.course_title} />
                    </div>
                    <div className='flex justify-between items-center gap-5'>
                      <div>
                        <p className='text-sm font-medium text-[#161617] capitalize'>{d?.course_title}</p>
                        <p className='text-xs font-medium text-[#57585A]'>Created . {moment(d?.createdAt).format("ll")} . {moment(d?.createdAt).format("LT")}</p>
                      </div>
                      <Dropdown menu={{ items: [
                        { key: "view", label: "View", onClick: onView },
                        { key: "delete", label: "Delete", disabled: true },
                      ]}}>
                        <Button onClick={handleOption} type='text' icon={<PiDotsThreeOutline className='text-2xl' />} />
                      </Dropdown>
                    </div>

                    <div className='w-full grid grid-cols-3 gap-3'>
                      {[
                        { label: "Institution", value: d?.institution },
                        { label: "State", value: d?.state },
                        { label: "Grade", value: d?.grade },
                      ].map(({label, value}) => (
                        <div key={label} className='space-y-1'>
                          <p className='text-sm font-bold text-[#161617]'>{label}</p>
                          <p className='text-xs font-medium text-[#57585A] truncate'>{value}</p>
                        </div>
                      ))}
                    </div>
                  </BorderHOC>
                )})}
              </div>
            </div>

            <div hidden={!isEqual(list, "row")} className='w-full h-full'>
              <div className='w-full space-y-5 overflow-x-auto'>
                {getAllCoursesData?.data?.map((d: any) => {
                  const onView = () => handleView(d?._id)
                  return (
                  <BorderHOC rounded='rounded-xl' className='w-full h-full' childClass='p-2 flex flex-nowrap justify-between items-center gap-5 overflow-x-auto'>
                    <div className='w-full flex items-center gap-10 relative'>
                      <div className='w-[100px] h-[10px] flex justify-center items-center relative'>
                        <Image className='!rounded-xl' height={50} src={d?.course_image} alt={d?.course_title} />
                      </div>
                      <div className='space-y-1'>
                        <p className='text-sm font-bold text-[#161617]'>{d?.course_title}</p>
                        <p className='text-xs font-medium text-[#57585A]'>Created . {moment(d?.createdAt).format("ll")} . {moment(d?.createdAt).format("LT")}</p>
                      </div>
                      <div className='space-y-1'>
                        <p className='text-sm font-bold text-[#161617]'>Institution</p>
                        <p className='text-xs font-medium text-[#57585A]'>{d?.institution}</p>
                      </div>
                      <div className='space-y-1'>
                        <p className='text-sm font-bold text-[#161617]'>State</p>
                        <p className='text-xs font-medium text-[#57585A]'>{d?.state}</p>
                      </div>
                      <div className='space-y-1'>
                        <p className='text-sm font-bold text-[#161617]'>Grade</p>
                        <p className='text-xs font-medium text-[#57585A]'>{d?.grade}</p>
                      </div>
                    </div>
                    <Dropdown menu={{ items: [
                      { key: "view", label: "View", onClick: onView },
                      { key: "delete", label: "Delete", disabled: true },
                    ] }}>
                      <Button onClick={handleOption} type='text' icon={<PiDotsThreeOutline className='text-2xl' />} />
                    </Dropdown>
                  </BorderHOC>
                )})}
              </div>
            </div>

            <Divider className='m-0 !bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]' />

            <div className='w-full flex justify-between items-center'>
              <p className='text-sm font-normal text-[#161617]'>Page 1 of 10</p>

              <div className='flex items-center gap-3'>
                <Button shape='round' size='large'>Previous</Button>
                <Button shape='round' size='large'>Next</Button>
              </div>
            </div>
          </div>
        </div>
      </BorderHOC>

      {/* create option modal >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
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
              <p className='text-xl font-bold text-[#161617]'>Create course</p>
              <p className='text-sm font-medium text-[#57585A]'>Let’s get you all set up by creating your first class.</p>
            </div>
            <Button onClick={onClose} icon={<AiOutlineCloseCircle className='text-xl' />} type='text' shape='circle' />
          </div>
          <Divider className='m-0 !bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]' />
          <div className='space-y-5 pb-5'>
            {options.map(({ key, Icon, color, description, title }) => {
              const handleAction = () => {setPayload({...payload, type: key}); onOpenCreate()}
              return (<BorderHOC onClick={handleAction} key={key} rounded='rounded-xl' className='w-full h-full hover:shadow' childClass='py-3 px-3 space-y-2 cursor-pointer'>
                <div className='flex items-center gap-3'>
                  <Button className={" ".concat(color)} type='primary' icon={<Icon />} />
                  <p className='text-base font-bold text-[#161617]'>{title}</p>
                </div>
                <p className='text-sm font-semibold text-[#57585A]'>{description}</p>
              </BorderHOC>
            )})}
          </div>
        </div>
      </Drawer>

      {/* create course modal >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
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
            <Button hidden={!currentStep?.back} onClick={currentStep?.back} icon={<FaChevronLeft className='text-xl' />} type='text' shape='circle' />
            <div className='w-full'>
              <p className='text-xl font-bold text-[#161617]'>{currentStep?.title}</p>
              <p className='text-sm font-medium text-[#57585A]'>{currentStep?.description}</p>
            </div>
            <Button onClick={onCloseCreate} icon={<AiOutlineCloseCircle className='text-xl' />} type='text' shape='circle' />
          </div>
          <Divider className='m-0 !bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]' />
          <Form layout='vertical' onFinish={handleSubmit} form={form}>
            {/* first step >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
            <div hidden={payload?.step} className='w-full'>
              <Form.Item label="Courses Image">
                <div className='w-full flex justify-between items-end gap-5'>
                  <div className='w-full'>
                    <BorderHOC childClass='!h-[100px] !rounded-2xl flex justify-center align-center' className='w-full rounded-2xl'>
                      <Image className='!w-full !h-full mx-auto flex justify-center items-center' src={payload?.course_image} placeholder={<CgImage className='text-5xl' />} />
                    </BorderHOC>
                  </div>
                  <Upload {...props((file: any) => handleUpload(file, "course_image"))} className='!p-0' disabled={postUplLoad}>
                    <Button loading={postUplLoad} shape='round' icon={<LuUpload />}>Upload Image</Button>
                  </Upload>
                </div>
              </Form.Item>
              <Form.Item label="Courses Name" name="course_title">
                <Input size='large' placeholder='Enter course name' />
              </Form.Item>
              <Form.Item label="Upload Curriculum">
                <Upload.Dragger {...props((file: any) => handleUpload(file, "curriculum_url"))} disabled={postUplLoad}>
                  <p className="ant-upload-drag-icon">
                    {postUplLoad ? <ImSpinner className="!text-2xl mx-auto !animate-spin" /> : <LuUploadCloud className="!text-2xl mx-auto" />}
                  </p>
                  <p hidden={!payload?.curriculum_url} className="text-sm">Document Uploaded.</p>
                  <p hidden={payload?.curriculum_url} className="text-sm"><span className='text-primary'>Click to upload</span> or drag and drop</p>
                  <p hidden={payload?.curriculum_url} className=" text-xs">File size no more than 10MB</p>
                </Upload.Dragger>
              </Form.Item>
              <Button loading={getStanSetLoad} onClick={currentStep?.next} className="bg-[#4970FC]" block size="large" type="primary" shape="round">Continue</Button>
            </div>

            {/* last step >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
            <div hidden={!payload?.step} className='w-full'>
              <p className='text-base font-bold text-[#161617]'>Learning Standard</p>
              <div className='w-full grid grid-cols-2 gap-5'>
                <Form.Item label="State" name="state" rules={[{required: true}]}>
                  <Select onChange={state => setPayload({...payload, state})} placeholder="Select state" size="large" options={states} />
                </Form.Item>
                <Form.Item label="Grade" name="grade" rules={[{required: true}]}>
                  <Select onChange={grade => setPayload({...payload, grade})} placeholder="Select state" size="large" options={grades} />
                </Form.Item>
              </div>
              <Form.Item label="Institution" name="institution" rules={[{required: true}]}>
                <Input size='large' placeholder='Enter institution name' required />
              </Form.Item>
              <Form.Item label="Select your preferred learning standard" name="standard" rules={[{required: true}]}>
                <Select showSearch onChange={standard => setPayload({...payload, standard})} placeholder="Select learning standard" size="large" options={jurisdictions} loading={getJuriesLoad} filterOption={(d, b: any) => (b?.label || "").toLowerCase().includes(d.toLowerCase())} />
              </Form.Item>
              <Form.Item label="Select your preferred jurisdiction" name="jurisdiction" rules={[{required: true}]}>
                <Select showSearch onChange={jurisdiction => setPayload({...payload, jurisdiction})} placeholder="Select learning standard" size="large" options={jurisdiction} loading={getJuryLoad} filterOption={(d, b: any) => (b?.label || "").toLowerCase().includes(d.toLowerCase())} />
              </Form.Item>
              <Button loading={postCourseLoad} className="bg-[#4970FC]" block size="large" type="primary" htmlType='submit' shape="round">Create Course</Button>
            </div>
          </Form>
        </div>
      </Drawer>

      <InviteModal isOpen={isScan} onClose={unScan} otherValue={inviteURL.concat(payload?.id)} />
    </div>
  )
}

export default CoursePage