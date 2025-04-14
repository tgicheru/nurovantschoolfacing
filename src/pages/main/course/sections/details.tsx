import React, { useState } from 'react'
import { useGetCourseById, useGetCourseStudents } from '../../../../hooks/courses/courses';
import { useSearchParams } from 'react-router-dom';
import { Avatar, Breadcrumb, Button, Divider, Drawer, Dropdown, Empty, Image, Modal, Spin } from 'antd';
import moment from 'moment';
import { PiBookOpenText, PiDotsThreeOutline } from 'react-icons/pi';
import { BorderHOC } from '../../../../components';
import { TbCards, TbFilterSearch, TbMessageQuestion } from 'react-icons/tb';
import { LuBook, LuPlus, LuSearch, LuUpload } from 'react-icons/lu';
import { RxDashboard } from 'react-icons/rx';
import { GoDotFill, GoRows } from 'react-icons/go';
import { handleObj, isEqual } from '../../../../context/utils';
import EmptyDisplay from '../../../../components/EmptyDisplay';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { BsRepeat } from 'react-icons/bs';
import { IoChatboxEllipsesOutline } from 'react-icons/io5';
import CourseLectureSection from './lecture';
import { AiOutlineCloseCircle } from 'react-icons/ai';

type IconProp = {
  className?: string
}

function CourseDetailsSection() {
  const [page, setPage] = useState(1)
  const [list, setList] = useState("grid")
  const [isOpt, setIsOpt] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [param, setParam] = useSearchParams()
  const onCloseOpt = () => setIsOpt(false)
  const onClose = () => setIsOpen(false)
  const onOpenOpt = () => setIsOpt(true)
  const onOpen = () => setIsOpen(true)
  const lecture = param.get("lecture")
  const width = window.innerWidth
  const id = param.get("id")

  const handleView = (lecture: any, tab?: any) => setParam(handleObj({ id, lecture, tab }) as any)

  const lists = [
    { key: "grid", Icon: ({ className }: IconProp) => <RxDashboard className={className} /> },
    { key: "row", Icon: ({ className }: IconProp) => <GoRows className={className} /> },
  ]

  const {
    data: getCourseData,
    isLoading: getCourseLoad,
  } = useGetCourseById({ course_id: id });

  const {
    data: getStudentsData,
    isLoading: getStudentsLoad,
  } = useGetCourseStudents(id!)

  const { lectures, pages, handleNext, handlePrev } = {
    handleNext: () => setPage(page + 1),
    handlePrev: () => setPage(page - 1),
    pages: Math.ceil(getCourseData?.data?.lectures?.length / 9),
    lectures: [...(getCourseData?.data?.lectures || [])]?.slice(((page - 1) * 9), (page * 9)),
  }


  if (lecture) return <CourseLectureSection />
  return (
    <Spin spinning={getCourseLoad}>
      <div className='w-full space-y-5'>
        <Breadcrumb
          items={[
            { title: "Courses", href: "/courses" },
            { title: getCourseData?.data?.course_title },
          ]}
        />

        <div className='w-full flex items-center gap-10 xl:gap-20'>
          <Image height={150} src={getCourseData?.data?.course_image} alt={getCourseData?.data?.course_title} />
          <div className='space-y-3'>
            <div className='flex justify-between items-center'>
              <div>
                <p className='text-2xl font-bold text-[#161617]'>{getCourseData?.data?.course_title}</p>
                <p className='text-xs font-medium text-[#57585A]'>Created . {moment(getCourseData?.data?.createdAt).format("ll")} . {moment(getCourseData?.data?.createdAt).format("LT")}</p>
              </div>
              <Dropdown menu={{ items: [
                { key: "delete", label: "Delete", disabled: false },
              ]}}>
                <Button type='text' icon={<PiDotsThreeOutline className='text-2xl' />} />
              </Dropdown>
            </div>

            <div className='w-full grid grid-cols-3 gap-3'>
              {[
                { label: "Institution", value: getCourseData?.data?.institution },
                { label: "State", value: getCourseData?.data?.state },
                { label: "Grade", value: getCourseData?.data?.grade },
              ].map(({label, value}) => (
                <div key={label} className='space-y-1'>
                  <p className='text-sm font-bold text-[#161617]'>{label}</p>
                  <p className='text-xs font-medium text-[#57585A] truncate'>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <BorderHOC loading={getCourseLoad} rounded='rounded-xl' className='w-full h-full'>
          <div className='w-full h-full p-5 space-y-2'>
            <div className='w-full h-full flex flex-col md:flex-row justify-between items-center gap-5'>
              <div className='flex items-center gap-2'>
                <p className='text-2xl font-bold text-[#161617]'>{getCourseData?.data?.lectures?.length}</p>
                <p className='text-sm font-semibold text-[#57585A]'>lecture(s)</p>
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
                <Button onClick={onOpen} loading={getStudentsLoad} size='large' type='text'>
                  <div>
                    <p className='text-sm font-bold text-[#161617]'>Students</p>
                    <p className='text-xs font-semibold text-[#57585A]'>--  {getStudentsData?.data?.length}  --</p>
                  </div>
                </Button>
              </div>
            </div>
  
            <Divider className='m-0 !bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]' />
  
            <EmptyDisplay hidden={getCourseData?.data?.lectures?.length} className='w-full h-[50vh]'>
              <Button onClick={onOpenOpt} className='!text-sm !font-bold bg-[#4970FC]' icon={<LuPlus className='text-xl' />} size='large' type='primary' shape='round'>Create lecture</Button>
            </EmptyDisplay>
  
            <div hidden={!getCourseData?.data?.lectures?.length} className='w-full space-y-3'>
              <div hidden={!isEqual(list, "grid")} className='w-full h-full'>
                <div className='w-full grid sm:grid-cols-2 md:grid-cols-3 gap-5'>
                  {lectures?.map((d: any) => {
                    const onView = () => handleView(d?._id)
                    return (
                    <BorderHOC key={d?._id} rounded='rounded-xl' className='w-full h-full' childClass='w-full h-full p-3 space-y-3'>
                      <div className='w-full flex justify-between items-center'>
                        <div className='flex items-center gap-3'>
                          <BorderHOC className='!rounded-xl'>
                            <Avatar shape='square' size="large" className='bg-[#FEEDD6] text-black'>{d?.title?.at(0)}</Avatar>
                          </BorderHOC>
                          <div>
                            <p className='text-sm font-medium text-[#161617] capitalize'>{d?.title}</p>
                            <p className='text-xs font-medium text-[#57585A]'>Created . {moment(d?.createdAt).format("ll")} . {moment(d?.createdAt).format("LT")}</p>
                          </div>
                        </div>

                        <Dropdown menu={{ items: [
                          { key: "view", label: "View", onClick: onView },
                          { key: "delete", label: "Delete", disabled: true },
                        ]}}>
                          <Button type='text' icon={<PiDotsThreeOutline className='text-2xl' />} />
                        </Dropdown>
                      </div>

                      <p className='text-xs font-medium text-[#57585A]'>{d?.sub_topic}</p>
  
                      <div className='w-full flex justify-between items-center gap-3'>
                        {[
                          { Icon: () => <PiBookOpenText />, label: "Lesson Plan", value: d?.lesson_plan, action: () => handleView(d?._id, "lesson_plan") },
                          { Icon: () => <TbMessageQuestion />, label: "Quiz", value: d?.quiz, action: () => handleView(d?._id, "quiz") },
                          { Icon: () => <TbCards />, label: "Flash Cards", value: d?.flash_card, action: () => handleView(d?._id, "flash_card") },
                          { Icon: () => <BsRepeat />, label: "Recaps", value: d?.recap, action: () => handleView(d?._id, "recap") },
                          { Icon: () => <IoChatboxEllipsesOutline />, label: "Creative Assessment", value: d?.creative_assessment, action: () => handleView(d?._id, "creative_assessment") },
                        ].map(({Icon, label, value, action}) => (
                          <div key={label} className='flex items-center gap-1 cursor-pointer' title={label} onClick={action}>
                            <GoDotFill color={value ? "#4970FC" : "#F79009"} />
                            <Icon />
                          </div>
                        ))}
                      </div>
                    </BorderHOC>
                  )})}
                </div>
              </div>
  
              <div hidden={!isEqual(list, "row")} className='w-full h-full'>
                <div className='w-full space-y-5 overflow-x-auto'>
                  {lectures?.map((d: any) => {
                    const onView = () => handleView(d?._id)
                    return (
                    <BorderHOC rounded='rounded-xl' className='w-full h-full' childClass='p-2 flex flex-nowrap justify-between items-center gap-5 overflow-x-auto'>
                      <div className='w-full flex items-center flex-nowrap gap-10 relative overflow-x-auto'>
                        <BorderHOC className='!rounded-xl'>
                          <Avatar shape='square' size="large" className='bg-[#FEEDD6] text-black'>{d?.title?.at(0)}</Avatar>
                        </BorderHOC>
                        <div className='space-y-1'>
                          <p className='text-sm font-bold text-[#161617]'>{d?.title}</p>
                          <p className='text-xs font-medium text-[#57585A]'>Created . {moment(d?.createdAt).format("ll")} . {moment(d?.createdAt).format("LT")}</p>
                        </div>
                        {[
                          { Icon: () => <PiBookOpenText />, label: "Lesson Plan", value: d?.lesson_plan, action: () => handleView(d?._id, "lesson_plan") },
                          { Icon: () => <TbMessageQuestion />, label: "Quiz", value: d?.quiz, action: () => handleView(d?._id, "quiz") },
                          { Icon: () => <TbCards />, label: "Flash Cards", value: d?.flash_card, action: () => handleView(d?._id, "flash_card") },
                          { Icon: () => <BsRepeat />, label: "Recaps", value: d?.recap, action: () => handleView(d?._id, "recap") },
                          { Icon: () => <IoChatboxEllipsesOutline />, label: "Creative Assessment", value: d?.creative_assessment, action: () => handleView(d?._id, "creative_assessment") },
                        ].map(({Icon, label, value, action}) => (
                          <div key={label} className=''>
                            <Button onClick={action} icon={<Icon />} type='text'>{label}</Button>
                            <div onClick={action} className='flex items-center gap-1'>
                              <GoDotFill color={value ? "#4970FC" : "#F79009"} />
                              <p className='text-xs font-medium tex-[#57585A]'>{value ? "Created" : "Not Created"}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Dropdown menu={{ items: [
                        { key: "view", label: "View", onClick: onView },
                        { key: "delete", label: "Delete", disabled: true },
                      ] }}>
                        <Button type='text' icon={<PiDotsThreeOutline className='text-2xl' />} />
                      </Dropdown>
                    </BorderHOC>
                  )})}
                </div>
              </div>
  
              <Divider className='m-0 !bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]' />
  
              <div className='w-full flex justify-between items-center'>
                <p className='text-sm font-normal text-[#161617]'>Page {page} of {pages}</p>
  
                <div className='flex items-center gap-3'>
                  <Button onClick={handlePrev} disabled={!(page - 1)} shape='round' size='large'>Previous</Button>
                  <Button onClick={handleNext} disabled={(page === pages)} shape='round' size='large'>Next</Button>
                </div>
              </div>
            </div>
          </div>
        </BorderHOC>

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
                <p className='text-2xl font-bold text-[#161617]'>Create lecture</p>
                <p className='text-sm font-semibold text-[#57585A]'>Let’s get you all set up by creating your first class.</p>
              </div>
              <Button onClick={onCloseOpt} type='text' icon={<IoIosCloseCircleOutline className='text-2xl text-primary' />} />
            </div>
            <Divider className='m-0 !bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]' />
            <div className='space-y-5 pb-5'>
              {[
                { title: "Create a new lecture", label: "Create a lecture for your students", Icon: () => <LuBook />, color: "bg-[#6D326D]" },
                { title: "Create lectures with your calendar", label: "Import your school calender to create lectures", Icon: () => <LuUpload />, color: "bg-[#368F8B]" },
              ].map(({ Icon, color, label, title }) => <BorderHOC rounded='rounded-xl' className='w-full h-full hover:shadow' childClass='py-3 px-3 space-y-2 cursor-pointer'>
                <div className='flex items-center gap-3'>
                  <Button className={" ".concat(color)} type='primary' icon={<Icon />} />
                  <p className='text-base font-bold text-[#161617]'>{title}</p>
                </div>
                <p className='text-sm font-semibold text-[#57585A]'>{label}</p>
              </BorderHOC>)}
            </div>
          </div>
        </Modal>

        {/* course students modal >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
        <Drawer
          open={isOpen}
          footer={false}
          closeIcon={false}
          onClose={onClose}
          width={width <= 500 ? width : 500}
          classNames={{ content: "!bg-transparent", wrapper: "!shadow-none" }}
        >
          <div className='w-full p-5 space-y-5 bg-white rounded-3xl'>
            <div className='w-full flex justify-between gap-5'>
              <div className='w-full'>
                <p className='text-xl font-bold text-[#161617]'>Course Students</p>
                <p className='text-sm font-medium text-[#57585A]'>These are the students under this course</p>
              </div>
              <Button onClick={onClose} icon={<AiOutlineCloseCircle className='text-xl' />} type='text' shape='circle' />
            </div>
            <Divider className='m-0 !bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]' />
            <div className='w-full h-[80vh] overflow-y-auto space-y-5'>
              <div hidden={getStudentsData?.data?.length} className='py-10'>
                <Empty description="No student under this course" />
              </div>
              
              <div className='space-y-2'>
                {getStudentsData?.data?.map((d: any) => {return(
                  <BorderHOC rounded='!rounded-xl'>
                    <div className='w-full px-3 py-1'>
                      <p className='text-base font-medium'>Name: <b className='text-primary'>{d?.name}</b></p>
                      <p className='text-base font-normal'>Email: <b>{d?.email}</b></p>
                    </div>
                  </BorderHOC>
                )})}
              </div>
            </div>
          </div>
        </Drawer>
      </div>
    </Spin>
  )
}

export default CourseDetailsSection