import { Button, Spin, Tabs } from 'antd'
import React, { useState } from 'react'
import { useGetAdaptiveLearning } from '../../../../hooks/adaptivelearning/adaptivelearning'
import { useSearchParams } from 'react-router-dom'
import { HiArrowLeft } from 'react-icons/hi'

function DetailsSection() {
  const [params, setParams] = useSearchParams()
  const tab = (params.get("tab") || "questions")
  const [activeTab, setActiveTab] = useState(tab)
  const id = params.get("id")

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
      label: "Generated Quiz Questions",
      children: "hello"
    },
    {
      key: "participants",
      label: "Quiz Participants",
      children: "hello"
    },
  ]
  return (
    <Spin spinning={getALLoad}>
      <div className="w-full h-full min-h-screen p-5 md:p-10">
        <div className='bg-white p-5 md:p-10 rounded-xl space-y-5'>
          <Button
            type='text'
            size='large'
            icon={<HiArrowLeft className='text-xl font-bold' />}
            className='items-center text-xl font-semibold text-[#414141]'
          >{getALData?.data?.lecture?.lecture_title}</Button>
          
          <Tabs
            items={tabs}
            onChange={handleTab}
            activeKey={activeTab}
          />
        </div>
      </div>
    </Spin>
  )
}

export default DetailsSection