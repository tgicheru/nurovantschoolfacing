import { Button, Spin, Tabs } from 'antd'
import React, { useState } from 'react'
import { useGetAdaptiveLearning } from '../../../../hooks/adaptivelearning/adaptivelearning'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { HiArrowLeft } from 'react-icons/hi'
import QuestionsTab from '../tabs/questions'
import ParticipantsTab from '../tabs/participants'
import InviteModal from '../../../../components/modals/InviteModal'
import { FaPlus } from 'react-icons/fa'

function DetailsSection() {
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const tab = (params.get("tab") || "questions")
  const [activeTab, setActiveTab] = useState(tab)
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const onOpen = () => setIsOpen(true)
  const id = params.get("id")

  const handleBack = () => navigate("/adaptive-learning")
  const inviteLink = "https://app.nurovant.com/adaptive-learning/quiz/".concat(id!)

  const handleTab = (tab: any) => {
    setParams({id: id!, tab})
    setActiveTab(tab)
  }

  const {
    data: getALData,
    isLoading: getALLoad,
  } = useGetAdaptiveLearning(id!)

  const tabs = [
    {
      key: "questions",
      label: "Quiz Questions",
      children: <QuestionsTab />,
    },
    {
      key: "participants",
      label: "Quiz Participants",
      children: <ParticipantsTab />,
    },
  ]

  const isALSCompleted = (getALData?.data?.quiz?.aws_path && getALData?.data?.quiz?.knowledge_graph_id)
  return (
    <Spin spinning={getALLoad}>
      <div className="w-full h-full min-h-screen p-5 md:p-10">
        <div className='bg-white p-5 md:p-10 rounded-xl space-y-5'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <Button
              type='text'
              size='large'
              onClick={handleBack}
              icon={<HiArrowLeft className='text-xl font-bold' />}
              className='!items-center text-xl font-semibold text-[#414141] !bg-transparent'
            >{getALData?.data?.lecture?.lecture_title}</Button>

            <Button
              size="large"
              type="primary"
              onClick={onOpen}
              icon={<FaPlus />}
              hidden={isALSCompleted}
              className="bg-primary !rounded-2xl"
            >Share Invite</Button>
          </div>
          
          <Tabs
            items={tabs}
            onChange={handleTab}
            activeKey={activeTab}
          />

          <InviteModal
            isOpen={isOpen}
            onClose={onClose}
            otherValue={inviteLink}
          />
        </div>
      </div>
    </Spin>
  )
}

export default DetailsSection