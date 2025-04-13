import React, { useState } from 'react'
import { useGetLectureById } from '../../../../hooks/lecture/lecture';
import { useSearchParams } from 'react-router-dom';
import { Button, Spin, Tabs } from 'antd';
import EmptyDisplay from '../../../../components/EmptyDisplay';
import { LuPlus } from 'react-icons/lu';
import { useGetQuiz, usePostQuiz } from '../../../../hooks/quiz/quiz';
import QuizQuestionsTab from '../subtabs/questions';
import QuizParticipantsTab from '../subtabs/participants';
import { AiOutlineUserAdd } from 'react-icons/ai';
import InviteModal from '../../../../components/modals/InviteModal';
import QuizResultAnalysisTab from '../subtabs/analysis';

function QuizTab() {
  const [param] = useSearchParams()
  const [tab, setTab] = useState("questions")
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const onOpen = () => setIsOpen(true)
  const lecture = param.get("lecture")

  const {
    data: getLectureData,
    refetch: getLectureFetch,
    isLoading: getLectureLoad,
  } = useGetLectureById({ id: lecture })

  const {
    data: getQuizData,
    refetch: getQuizFetch,
    isLoading: getQuizLoad,
  } = useGetQuiz({ quiz_id: getLectureData?.quiz?._id })

  const {
    mutate: postQuizAction,
    isLoading: postQuizLoad,
  } = usePostQuiz(() => {getLectureFetch(); getQuizFetch()})

  const quizData = (getQuizData?.data || getLectureData?.quiz)

  const tabs = [
    { key: "questions", label: "Quiz Questions", children: <QuizQuestionsTab data={quizData} /> },
    { key: "participants", label: "Participants", children: <QuizParticipantsTab data={quizData} /> },
    { key: "analysis", label: "Result Analysis", children: <QuizResultAnalysisTab data={quizData} /> },
  ]

  const handleCreateQuiz = () => postQuizAction({ lecture_id: lecture, duration: "30" })
  return (
    <Spin spinning={getLectureLoad || getQuizLoad}>
      <div className='w-full'>
        <EmptyDisplay hidden={getLectureData?.quiz} className='w-full h-[50vh]'>
          <Button loading={postQuizLoad} onClick={handleCreateQuiz} className='!text-sm !font-bold bg-[#4970FC]' icon={<LuPlus className='text-xl' />} size='large' type='primary' shape='round'>Generate material</Button>
        </EmptyDisplay>

        <div hidden={!getLectureData?.quiz} className='w-full space-y-5'>
          <Tabs activeKey={tab} onChange={setTab} items={tabs} tabBarExtraContent={{right: <Button onClick={onOpen} type='primary' shape='round' icon={<AiOutlineUserAdd />}>Invite Students</Button>}} />
        </div>

        <InviteModal value={quizData?._id} type='quiz' isOpen={isOpen} onClose={onClose} />
      </div>
    </Spin>
  )
}

export default QuizTab