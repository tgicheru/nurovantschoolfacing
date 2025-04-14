import React, { useMemo, useState } from 'react'
import { Avatar, Breadcrumb, Button, Divider, Drawer, Dropdown, Empty, Form, Input, Spin, Tabs } from 'antd'
import { useSearchParams } from 'react-router-dom'
import { useGetLectureById } from '../../../../hooks/lecture/lecture'
import { BorderHOC } from '../../../../components'
import moment from 'moment'
import { PiBookOpenText, PiDotsThreeOutline } from 'react-icons/pi'
import { TbCards, TbMessageQuestion } from 'react-icons/tb'
import { BsRepeat } from 'react-icons/bs'
import { CiViewList } from 'react-icons/ci'
import LessonPlanTab from '../tabs/lesson-plan'
import QuizTab from '../tabs/quiz'
import FlashcardTab from '../tabs/flashcard'
import RecapTab from '../tabs/recap'
import CreativeAssessmentTab from '../tabs/creative-assessment'
import { useGetAllLectureFeedbacks, usePostCourseFeedback } from '../../../../hooks/courses/courses'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { isEqual } from '../../../../context/utils'
import icon from '../../../../assets/icons/icon.png'
import { BiErrorCircle, BiLoader } from 'react-icons/bi'
import { LuSend } from 'react-icons/lu'
import { LiaShareAltSolid } from 'react-icons/lia'
import { useRecoilValue } from 'recoil'
import authAtom from '../../../../atoms/auth/auth.atom'

function CourseLectureSection() {
  const [param, setParam] = useSearchParams()
  const [tab, setTab] = useState(param.get("tab") || "lesson_plan")
  const [isOpen, setIsOpen] = useState(false)
  const [chats, setChats] = useState<any>([])
  const { user } = useRecoilValue(authAtom)
  const onClose = () => setIsOpen(false)
  const onOpen = () => setIsOpen(true)
  const lecture = param.get("lecture")
  const width = window.innerWidth
  const [form] = Form.useForm()
  const id = param.get("id")

  const chatBox = document.getElementById("chat-box");
  const handleChatScroll = () => setTimeout(() => chatBox?.scroll({ top: chatBox?.scrollHeight, behavior: "smooth" }), 500);

  const {
    data: getLectureData,
    isLoading: getLectureLoad,
  } = useGetLectureById({ id: lecture })

  const {
    data: getAllFeedbacksData,
    refetch: getAllFeedbacksFetch,
    isLoading: getAllFeedbacksLoad,
  } = useGetAllLectureFeedbacks(lecture!)

  const {
    mutate: postFeedbackAction,
    isError: postFeedbackError,
    isLoading: postFeedbackLoad,
  } = usePostCourseFeedback(getAllFeedbacksFetch, getAllFeedbacksFetch)

  const handleLectures = () => setParam({ id } as any)
  const handleTab = (tab: any) => {setTab(tab); setParam({ id, lecture, tab } as any)}


  const tabs = [
    { key: "lesson_plan", children: <LessonPlanTab />, label: <div className='flex items-center gap-2'><PiBookOpenText /> <p>Lesson Plan</p></div> },
    { key: "quiz", children: <QuizTab />, label: <div className='flex items-center gap-2'><TbMessageQuestion /> <p>Quiz</p></div>  },
    { key: "flash_card", children: <FlashcardTab />, label: <div className='flex items-center gap-2'><TbCards /> <p>Flash Cards</p></div> },
    { key: "recap", children: <RecapTab />, label: <div className='flex items-center gap-2'><BsRepeat /> <p>Recaps</p></div> },
    { key: "creative_assessment", children: <CreativeAssessmentTab />, label: <div className='flex items-center gap-2'><CiViewList /> <p>Creative Assessment</p></div> },
    // { key: "chat_bot_analysis", label: <div className='flex items-center gap-2'><IoChatboxEllipsesOutline /> <p>Chat Bot Analysis</p></div> },
  ]

  const analysis: any = useMemo(() => [...(getAllFeedbacksData?.data || [])]?.reverse(), [getAllFeedbacksData]);

  const handleSubmit = (payload: any) => {
    setChats([...chats, payload]);
    postFeedbackAction({
      ...payload,
      lecture_id: lecture,
      user_email: user?.email,
      user_full_name: (user?.first_name + " " + user?.last_name),
    });
    handleChatScroll();
    form.resetFields();
  };

  return (
    <Spin spinning={getLectureLoad}>
      <div className='w-full space-y-5'>
        <div className='w-full flex justify-between items-center'>
          <Breadcrumb
            items={[
              { title: "Courses", href: "/courses" },
              { title: "Lectures", onClick: handleLectures, className: "cursor-pointer" },
              { title: getLectureData?.title },
            ]}
          />
        </div>

        <div className='w-full flex justify-between items-center'>
          <div className='flex items-center gap-3'>
            <BorderHOC className='!rounded-xl'>
              <Avatar shape='square' size="large" className='bg-[#FEEDD6] text-black'>{getLectureData?.title?.at(0)}</Avatar>
            </BorderHOC>
            <div>
              <p className='text-sm font-bold text-[#161617] capitalize'>{getLectureData?.title}</p>
              <p className='text-xs font-medium text-[#57585A]'>Created . {moment(getLectureData?.createdAt).format("ll")} . {moment(getLectureData?.createdAt).format("LT")}</p>
            </div>
          </div>

          <Dropdown menu={{ items: [
            { key: "view", label: "View", disabled: true },
            { key: "delete", label: "Delete", disabled: true },
          ]}}>
            <Button type='text' icon={<PiDotsThreeOutline className='text-2xl' />} />
          </Dropdown>
        </div>

        <BorderHOC loading={getLectureLoad} rounded='rounded-xl' className='w-full h-full'>
          <div className='w-full h-full p-5 space-y-2'>
            <Tabs activeKey={tab} onChange={handleTab} items={tabs} tabBarExtraContent={{right: (
              <Button onClick={onOpen } className='bg-[#E1E7FF] text-primary' size='large' shape='round' icon={<LiaShareAltSolid className='text-xl' />} type='primary' iconPosition='end'>Continuous Feedback Loop</Button>
            )}} />
          </div>
        </BorderHOC>

        {/* create course feedback modal >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
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
                <p className='text-xl font-bold text-[#161617]'>Continuous FeedBack Panel</p>
                {/* <p className='text-sm font-medium text-[#57585A]'>Make changes to your lesson plan through AI chat system.</p> */}
              </div>
              <Button onClick={onClose} icon={<AiOutlineCloseCircle className='text-xl' />} type='text' shape='circle' />
            </div>
            <Divider className='m-0 !bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]' />
            <Spin spinning={getAllFeedbacksLoad}>
              <div className='w-full h-[70vh] overflow-y-auto space-y-5 pb-5' id='chat-box'>
                <div hidden={analysis?.length} className='py-5'>
                  <Empty />
                </div>
  
                {analysis?.map((d: any) => {
                  const isAI = isEqual(d?.role, "bot");
                  const img = isAI ? icon : null;
                  return (
                    <div className={`w-full flex gap-3 ${!isAI && "flex-row-reverse"}`}>
                      <div className=" flex flex-col items-center">
                        <Avatar alt="nurovant" src={img} />
                      </div>
                      <div className={`max-w-[80%] md:max-w-[70%] space-y-3 ${!isAI && "text-end"}`}>
                        <p
                          hidden={!isAI}
                          className="p-3 bg-[#F9F9F9] rounded-2xl !rounded-bl-none text-sm font-medium text-dark"
                        >
                          {d?.message}
                        </p>
                        <p
                          hidden={isAI}
                          className="p-3 bg-[#DBE2FE] rounded-2xl text-sm font-medium text-dark"
                        >
                          <p className="flex justify-between items-center gap-3">
                            <span>{d?.message}</span>
                            {d?.message && postFeedbackLoad && (
                              <BiLoader className="animate-spin" />
                            )}
                            {d?.message && postFeedbackError && (
                              <BiErrorCircle className="text-red-700" />
                            )}
                          </p>
                        </p>
                        <p className='text-xs'>{moment(d?.created_at).format("lll")}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Spin>
            <Form form={form} onFinish={handleSubmit}>
              <Form.Item name="message">
                <Input className='py-0 pr-0' size='large' placeholder='Write to the chat system...' suffix={
                  <Button loading={postFeedbackLoad} type='primary' size='large' htmlType='submit' icon={<LuSend />} />
                } />
              </Form.Item>
            </Form>
          </div>
        </Drawer>
      </div>
    </Spin>
  )
}

export default CourseLectureSection