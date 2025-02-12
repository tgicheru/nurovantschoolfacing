import React, { useState } from 'react'
import { BorderHOC } from '../../../../components'
import { Avatar, Breadcrumb, Button, Collapse, Empty, Tabs, Tag } from 'antd'
import { AiOutlineDownCircle, AiOutlineUserAdd } from 'react-icons/ai'
import InviteModal from '../../../../components/modals/InviteModal'
import { useGetAdaptiveLearning, useGetALQuizParticipants } from '../../../../hooks/adaptivelearning/adaptivelearning'
import { TbReportAnalytics } from 'react-icons/tb'

type Props = {
  id?: string | null,
  inviteURL: string,
  handleSection: any,
  tab?: string | null,
}
function DetailsSection({
  handleSection,
  inviteURL,
  tab,
  id,
}: Props) {
  const [actTab, setActTab] = useState(tab || "questions")
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const onOpen = () => setIsOpen(true)

  const {
    data: getALSData,
    isLoading: getALSLoad,
  } = useGetAdaptiveLearning(id!)

  const {
    data: getALSResultsData,
    isLoading: getALSResultsLoad,
  } = useGetALQuizParticipants(id!)

  const isParticipants = (getALSResultsData?.data?.length)
  const handleTab = (tab: string) => {setActTab(tab); handleSection(id, {tab})}
  const handleView = () => handleSection(id, {tab, result: "vrdtbfytfrdtrdbytr"})

  const tabs = [
    {
      key: "questions",
      label: "Quiz questions (".concat(getALSData?.data?.als_questions?.length || 0, ")"),
      children: (<BorderHOC rounded='rounded-xl' className='w-full h-full' childClass='space-y-5 p-5'>
        <p className='text-xl font-bold text-[#161617]'>Questions</p>
        {getALSData?.data?.als_questions?.map((d: any, idx: number) => (
          <Collapse
            accordion
            size='small'
            expandIconPosition='right'
            expandIcon={({ isActive }) => <div className='w-full h-full flex items-center'>
              <AiOutlineDownCircle className='!text-xl' />
            </div>}
            items={[{
              key: d?.id,
              label: (<p className='text-sm font-semibold text-[#161617]'>{idx+1}. {d?.question}</p>),
              children: (<div className='space-y-3'>
                <div className='space-y-2'>
                  <p className='text-sm font-bold text-[#161617]'>Options:</p>
                  <ul className='text-sm font-normal text-[#161617]'>
                    {d?.options?.map((b: any, edx: number) => <li>{edx + 1}. {b}</li>)}
                  </ul>
                </div>

                <div className='space-y-2'>
                  <p className='text-sm font-bold text-[#161617]'>Answer:</p>
                  <p className='text-sm font-normal text-[#161617]'>{d?.answer}</p>
                </div>
              </div>),
            }]}
          />
        ))}
      </BorderHOC>) 
    },
    {
      key: "participants",
      label: "Participants (".concat(getALSResultsData?.data?.length || 0, ")"),
      children: (<div className='w-full h-full space-y-2'>
        <div hidden={getALSResultsData?.data?.length}>
          <Empty description="no participants yet!" />
        </div>

        {(getALSResultsData?.data || [])?.map((b: any) => {
          return (
            <BorderHOC rounded='rounded-xl' childClass='px-5 py-2 flex flex-col md:flex-row justify-between items-center gap-5'>
              <Avatar className='bg-[#FAB55B]'>P</Avatar>
              <div className='space-y-1'>
                <p className='text-xs font-medium text-[#57585A]'>Name</p>
                <p className='text-sm font-bold text-[#161617]'>Peter Olugbenga</p>
              </div>
              <div className='space-y-1'>
                <p className='text-xs font-medium text-[#57585A]'>Email</p>
                <p className='text-sm font-bold text-[#161617]'>olasunkanmifinesse@gmail.com</p>
              </div>
              <div className='space-y-1'>
                <p className='text-xs font-medium text-[#57585A]'>Score</p>
                <p className='text-sm font-bold text-[#161617]'>7/14</p>
              </div>
              <div className='space-y-1'>
                <p className='text-xs font-medium text-[#57585A]'>Status</p>
                <Tag color='success' className='rounded-xl'>Pass</Tag>
              </div>
              <Button onClick={handleView} type='text'>Preview</Button>
            </BorderHOC>
          )
        })}
      </div>)
    }
  ]

  const isLoading = (getALSLoad || getALSResultsLoad)
  return (
    <div className='w-full space-y-5'>
      <Breadcrumb
        items={[
          { title: 'ALS Lectures', href: "/adaptive-learning" },
          { title: (getALSData?.data?.name || "ALS Lecture") },
        ]}
        separator="/"
      />

      <div className='w-full flex justify-between items-center gap-5'>
        <p className='text-2xl font-bold text-[#161617]'>{getALSData?.data?.name || "ALS Lecture"}</p>
        <Button onClick={onOpen} type='primary' shape='round' icon={<AiOutlineUserAdd />}>Invite Students</Button>
      </div>

      <BorderHOC loading={isLoading} rounded='rounded-xl' className='w-full h-full' childClass='w-full h-full p-5'>
        <Tabs
          items={tabs}
          activeKey={actTab}
          onChange={handleTab}
          defaultActiveKey={actTab}
          tabBarExtraContent={{ right: <Button hidden={!isParticipants} type='primary' shape='round' icon={<TbReportAnalytics />}>Generate Report</Button> }}
        />
      </BorderHOC>

      <InviteModal isOpen={isOpen} onClose={onClose} otherValue={inviteURL} />
    </div>
  )
}

export default DetailsSection