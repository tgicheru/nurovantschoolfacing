import { Breadcrumb, Button, Collapse, Input, Tabs } from 'antd'
import React, { useState } from 'react'
import { BorderHOC } from '../../../../components'
import { isEqual } from '../../../../context/utils'
import { AiOutlineDownCircle } from 'react-icons/ai'

function DetailsSection() {
  const [payload, setPayload] = useState<any>({})
  return (
    <div className='w-full space-y-5'>
      <Breadcrumb
        items={[
          { title: 'Question Bank', href: "/question-bank" },
          { title: 'Algebra 101 Questions' },
        ]}
        separator="/"
      />

      <div className='w-full'>
        <p className='text-2xl font-bold text-[#161617]'>Algebra 101 Questions</p>
        <p className='text-sm font-semibold text-[#57585A]'>Here are some multiple variants of questions generated.</p>
      </div>

      <BorderHOC rounded='rounded-xl' className='w-full h-full' childClass='w-full h-full p-5'>
        <Tabs
          items={Array.from(Array(10).keys()).map(d => ({
            key: "variant-".concat(String(d)),
            label: "Variant ".concat(String(d + 1)),
            children: (<BorderHOC rounded='rounded-xl' className='w-full h-full' childClass='space-y-5 p-5'>
              <p className='text-xl font-bold text-[#161617]'>Questions</p>
              
              {Array.from(Array(10).keys())?.map((b: any) => {
                const isEdit = isEqual(payload?.id, b)
                const handleEdit = () => setPayload({
                  question: String(b?.question?.question || b?.question),
                  variant_number: String(b?.variant_number),
                  // question_id: String(b?.id),
                  id: b,
                })
                const handleCancel = () => setPayload({})
                return (
                  <Collapse
                    accordion
                    size='small'
                    expandIconPosition='right'
                    expandIcon={({ isActive }) => <div className='w-full h-full flex items-center'>
                      <Button onClick={handleEdit} hidden={!isActive || isEdit} type='text'>Edit</Button>
                      <Button onClick={handleCancel} hidden={!isEdit} type='text'>Save</Button>
                      <Button onClick={handleCancel} hidden={!isEdit} type='text' danger>Cancel</Button>
                      <AiOutlineDownCircle className='!text-xl' />
                    </div>}
                    items={[{
                      key: b,
                      label: (<div className='!w-full flex justify-between items-center gap-5'>
                        <p hidden={isEdit} className='text-sm font-semibold text-[#161617]'>{b+1}. What is the main inspiration for the proposed mobile app design?</p>
                        <Input hidden={!isEdit} value={b} onChange={({target:{value:question}}) => setPayload({...payload, question})} size='small' placeholder='Enter question' className='w-full' bordered={false} />
                      </div>),
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
          }))}
        />
      </BorderHOC>
    </div>
  )
}

export default DetailsSection