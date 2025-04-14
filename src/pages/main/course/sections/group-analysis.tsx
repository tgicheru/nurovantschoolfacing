import { Button, Spin } from 'antd';
import React from 'react'
import { LuChevronLeft, LuUpload } from 'react-icons/lu';
import { BorderHOC } from '../../../../components';
import { useNavigate } from 'react-router';
import { useGetGroupAnalysis } from '../../../../hooks/courses/courses';
import { useSearchParams } from 'react-router-dom';

function GroupAnalysisSection() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const id = params.get("id")

  const goBack = () => navigate(-1)

  const {
    data: getAnalysisData,
    isLoading: getAnalysisLoad,
  } = useGetGroupAnalysis(id)

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
            <Spin spinning={getAnalysisLoad}>
              <div className='w-full p-5'>

              </div>
            </Spin>
          </BorderHOC>
        </div>
      </Spin>
    </div>
  )
}

export default GroupAnalysisSection