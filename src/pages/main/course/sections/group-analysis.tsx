import { Button, Spin } from 'antd';
import React from 'react'
import { LuChevronLeft, LuUpload } from 'react-icons/lu';
import { BorderHOC } from '../../../../components';
import { useNavigate } from 'react-router';

function GroupAnalysisSection() {
  const navigate = useNavigate()

  const goBack = () => navigate(-1)

  return (
    <div className='w-full space-y-5'>
      <div className='w-full flex justify-between items-center'>
        <Button onClick={goBack} className='text-primary' icon={<LuChevronLeft />} type='text'>Back</Button>
        <p className='text-2xl font-bold text-[#161617]'>AI Grouping Analysis</p>
        <Button type='primary' shape='round' icon={<LuUpload />}>Export</Button>
      </div>

      <Spin spinning={false}>
        <div className='w-full space-y-5'>
          <BorderHOC rounded='rounded-2xl'>
            <div>

            </div>
          </BorderHOC>
        </div>
      </Spin>
    </div>
  )
}

export default GroupAnalysisSection