import React from 'react'
import { BorderHOC } from '../../../../components'
import { Breadcrumb, Collapse, Tabs, Tag } from 'antd'
import { AiOutlineDownCircle } from 'react-icons/ai'

type Props = {
  id?: string | null,
  handleSection: any,
  result?: string | null,
}
function ResultSection({
  handleSection,
  result,
  id,
}: Props) {
  const handleQuestions = () => handleSection(id)
  const handleParticipants = () => handleSection(id, {tab: "participants"})

  const tabs = [
    {
      key: "results",
      label: "Quiz Results",
      children: (<BorderHOC rounded='rounded-xl' className='w-full h-full' childClass='space-y-5 p-5'>
        <p className='text-xl font-bold text-[#161617]'>Questions</p>
        {Array.from(Array(10).keys())?.map((b: any) => {
          // #FDDBDB
          // #F04438
          return (
            <Collapse
              accordion
              size='small'
              expandIconPosition='right'
              className='bg-[#D1F9E7] border-[#17B26A]'
              expandIcon={({ isActive }) => <div className='w-full h-full flex items-center'>
                <Tag color='success' className='py-1 rounded-xl'>Pass</Tag>
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
                    <p className='text-sm font-bold text-[#161617]'>Selected Answer:</p>
                    <p className='text-sm font-normal text-[#161617]'>A home-sharing and experience platform</p>
                  </div>

                  <div className='space-y-2'>
                    <p className='text-sm font-bold text-[#161617]'>Correct Answer:</p>
                    <p className='text-sm font-normal text-[#161617]'>A home-sharing and experience platform</p>
                  </div>
                </div>),
              }]}
            />
          )
        })}
      </BorderHOC>) 
    },
  ]
  return (
    <div className='w-full space-y-5'>
      <Breadcrumb
        items={[
          { title: 'ALS Lectures', href: "/adaptive-learning" },
          { title: 'French 101 ALS', onClick: handleQuestions, className: "cursor-pointer" },
          { title: 'Participants', onClick: handleParticipants, className: "cursor-pointer" },
          { title: 'Quiz Result' },
        ]}
        separator="/"
      />

      <p className='text-2xl font-bold text-[#161617]'>French 101 ALS</p>

      <BorderHOC rounded='rounded-xl' className='w-full h-full' childClass='w-full h-full p-5'>
        <Tabs items={tabs} />
      </BorderHOC>
    </div>
  )
}

export default ResultSection