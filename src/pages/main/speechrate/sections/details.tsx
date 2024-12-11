import React from 'react'
import { Breadcrumb, Button, Tabs } from 'antd'
import { BorderHOC } from '../../../../components'

function DetailsSection() {
  return (
    <div className='w-full space-y-5'>
      <Breadcrumb
        items={[
          { title: 'Speech Rate', href: "/question-tracker" },
          { title: 'Algebra 101 Questions' },
        ]}
        separator="/"
      />

      <p className='text-2xl font-bold text-[#161617]'>Algebra 101 Speech Rate</p>

      <BorderHOC rounded='rounded-xl' className='w-full h-full' childClass='w-full h-full p-5'>
        <Tabs
          items={Array.from(Array(3).keys()).map(d => ({
            key: "speech-rate-".concat(String(d)),
            label: "Speech Rates (".concat(String(d + 1), ")"),
            children: (<div className='w-full h-full space-y-2'>
              {Array.from(Array(d + 1).keys())?.map((b: any) => {
                return (
                  <BorderHOC rounded='rounded-xl' childClass='px-5 py-2 flex flex-col md:flex-row justify-between items-center gap-5'>
                    <div className='grid grid-cols-2 gap-5 md:gap-10'>
                      <div className='space-y-1'>
                        <p className='text-xs font-medium text-[#57585A]'>Name</p>
                        <p className='text-sm font-bold text-[#161617]'>Teacher</p>
                      </div>
                      <div className='space-y-1'>
                        <p className='text-xs font-medium text-[#57585A]'>Time</p>
                        <p className='text-sm font-bold text-[#161617]'>1 minutes, 21 seconds</p>
                      </div>
                    </div>
                    <div className='flex justify-end items-center gap-5'>
                      <p className='text-2xl font-bold text-[#161617]'>85.98%</p>
                      <Button type='text'>Preview</Button>
                    </div>
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