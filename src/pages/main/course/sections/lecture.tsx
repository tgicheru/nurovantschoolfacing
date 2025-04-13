import React, { useState } from 'react'
import { Avatar, Breadcrumb, Button, Dropdown, Spin, Tabs } from 'antd'
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

function CourseLectureSection() {
  const [param, setParam] = useSearchParams()
  const [tab, setTab] = useState(param.get("tab") || "lesson_plan")
  const lecture = param.get("lecture")
  const id = param.get("id")

  const {
    data: getLectureData,
    isLoading: getLectureLoad,
  } = useGetLectureById({ id: lecture })

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
            <Tabs activeKey={tab} onChange={handleTab} items={tabs} />
          </div>
        </BorderHOC>
      </div>
    </Spin>
  )
}

export default CourseLectureSection