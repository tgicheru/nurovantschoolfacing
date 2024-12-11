import React, { useState } from 'react'
import { BorderHOC } from '../../../../components'
import { Avatar, Breadcrumb, Button, Collapse, Tabs, Tag } from 'antd'
import { AiOutlineDownCircle, AiOutlineUserAdd } from 'react-icons/ai'
import InviteModal from '../../../../components/modals/InviteModal'

type Props = {
  id?: string | null,
  handleSection: any,
  tab?: string | null,
}
function DetailsSection({
  handleSection,
  tab,
  id,
}: Props) {
  const [actTab, setActTab] = useState(tab || "questions")
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const onOpen = () => setIsOpen(true)

  const handleTab = (tab: string) => {setActTab(tab); handleSection(id, {tab})}
  const handleView = () => handleSection(id, {tab, result: "vrdtbfytfrdtrdbytr"})

  const tabs = [
    {
      key: "questions",
      label: "Quiz questions (10)",
      children: (<BorderHOC rounded='rounded-xl' className='w-full h-full' childClass='space-y-5 p-5'>
        <p className='text-xl font-bold text-[#161617]'>Questions</p>
        {Array.from(Array(10).keys())?.map((b: any) => {
          return (
            <Collapse
              accordion
              size='small'
              expandIconPosition='right'
              expandIcon={({ isActive }) => <div className='w-full h-full flex items-center'>
                <AiOutlineDownCircle className='!text-xl' />
              </div>}
              items={[{
                key: b,
                label: (<p className='text-sm font-semibold text-[#161617]'>{b+1}. What is the main inspiration for the proposed mobile app design?</p>),
                children: (<div className='space-y-3'>
                  <div className='space-y-2'>
                    <p className='text-sm font-bold text-[#161617]'>Options:</p>
                    <ul className='text-sm font-normal text-[#161617]'>
                      {[
                        "A popular e-commerce website",
                        "A social media platform",
                        "A ride-hailing service",
                        "A home-sharing and experience platform"
                      ].map((d, idx) => <li>{idx + 1}. {d}</li>)}
                      {/* {Object.values(b?.question?.options || {})?.map(([k, v]: any) => <li>{String(k)}. {String(v)}</li>)} */}
                    </ul>
                  </div>

                  <div className='space-y-2'>
                    <p className='text-sm font-bold text-[#161617]'>Answer:</p>
                    <p className='text-sm font-normal text-[#161617]'>A home-sharing and experience platform</p>
                  </div>
                </div>),
              }]}
            />
          )
        })}
      </BorderHOC>) 
    },
    {
      key: "participants",
      label: "Participants (5)",
      children: (<div className='w-full h-full space-y-2'>
        {Array.from(Array(5).keys())?.map((b: any) => {
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
  return (
    <div className='w-full space-y-5'>
      <Breadcrumb
        items={[
          { title: 'ALS Lectures', href: "/adaptive-learning" },
          { title: 'French 101 ALS' },
        ]}
        separator="/"
      />

      <div className='w-full flex justify-between items-center gap-5'>
        <p className='text-2xl font-bold text-[#161617]'>French 101 ALS</p>
        <Button onClick={onOpen} type='primary' shape='round' icon={<AiOutlineUserAdd />}>Invite Students</Button>
      </div>

      <BorderHOC rounded='rounded-xl' className='w-full h-full' childClass='w-full h-full p-5'>
        <Tabs activeKey={actTab} defaultActiveKey={actTab} onChange={handleTab} items={tabs} />
      </BorderHOC>

      <InviteModal isOpen={isOpen} onClose={onClose} />
    </div>
  )
}

export default DetailsSection