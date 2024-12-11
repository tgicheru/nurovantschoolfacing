import { Breadcrumb, Button, Input, Tabs } from 'antd'
import React, { useState } from 'react'
import { BorderHOC } from '../../../../components'
import { isEqual } from '../../../../context/utils'
import { AiOutlineCloseCircle, AiOutlineEdit } from 'react-icons/ai'

function DetailsSection() {
  const [payload, setPayload] = useState<any>({})
  return (
    <div className='w-full space-y-5'>
      <Breadcrumb
        items={[
          { title: 'Question Tracker', href: "/question-tracker" },
          { title: 'Algebra 101 Questions' },
        ]}
        separator="/"
      />

      <div className='w-full'>
        <p className='text-2xl font-bold text-[#161617]'>Algebra 101 Question Tracker</p>
        <p className='text-sm font-semibold text-[#57585A]'>All your students questions neatly organized and ready for review</p>
      </div>

      <BorderHOC rounded='rounded-xl' className='w-full h-full' childClass='w-full h-full p-5'>
        <Tabs
          items={Array.from(Array(3).keys()).map(d => ({
            key: "questions-".concat(String(d)),
            label: "Questions (".concat(String(d + 1), ")"),
            children: (<div className='w-full h-full space-y-2'>
              {Array.from(Array(d + 1).keys())?.map((b: any) => {
                const isEdit = isEqual(payload?.id, b)
                const handleEdit = () => setPayload({
                  question: String(b?.question?.question || b?.question),
                  variant_number: String(b?.variant_number),
                  // question_id: String(b?.id),
                  id: b,
                })
                const handleCancel = () => setPayload({})
                return (
                  <BorderHOC rounded='rounded-xl' childClass='px-3 py-2 flex justify-between items-center gap-5'>
                    <p hidden={isEdit} className='text-sm font-semibold text-[#161617]'>{b+1}. Question: What is the main inspiration for the proposed mobile app design?</p>
                    <Input hidden={!isEdit} value={b} onChange={({target:{value:question}}) => setPayload({...payload, question})} size='small' placeholder='Enter question' className='w-full' bordered={false} />
                    <Button onClick={handleCancel} hidden={!isEdit} type='text' icon={<AiOutlineCloseCircle className='text-xl' />} />
                    <Button onClick={handleEdit} hidden={isEdit} type='text' icon={<AiOutlineEdit className='text-xl' />} />
                  </BorderHOC>
                )
              })}
            </div>)
          }))}
        />
      </BorderHOC>
    </div>
  )
}

export default DetailsSection