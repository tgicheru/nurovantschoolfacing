import { Button, Spin } from 'antd';
import React from 'react'
import { LuChevronLeft, LuUpload, LuUsers } from 'react-icons/lu';
import { BorderHOC } from '../../../../components';
import { useNavigate } from 'react-router';
import { useGetGroupAnalysis, useGetGroupDetails } from '../../../../hooks/courses/courses';
import { useSearchParams } from 'react-router-dom';
import { HiOutlineSparkles } from 'react-icons/hi2';

function GroupAnalysisSection() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const group = params.get("group")

  const goBack = () => navigate(-1)

  const {
    data: getAnalysisData,
    isLoading: getAnalysisLoad,
  } = useGetGroupAnalysis(group)

  const {
    data: getGroupData,
    isLoading: getGroupLoad,
  } = useGetGroupDetails(group)

  return (
    <div className='w-full space-y-5'>
      <div className='w-full flex justify-between items-center'>
        <Button onClick={goBack} className='text-primary' icon={<LuChevronLeft />} type='text'>Back</Button>
        <p className='text-2xl font-bold text-[#161617]'>{getGroupData?.data?.name} AI Grouping Analysis</p>
        <Button type='primary' shape='round' icon={<LuUpload />}>Export</Button>
      </div>

      <Spin spinning={getAnalysisLoad || getGroupLoad}>
        <div className='w-full space-y-5'>
          <BorderHOC rounded='rounded-2xl'>
            <div className='w-full grid grid-cols-2 gap-5 p-5'>
              <BorderHOC rounded='rounded-2xl'>
                <div className='p-5'>
                  <Button icon={<HiOutlineSparkles className='text-primary' />} type='text' size='large'>Group Formation Logic</Button>
                  <p className='text-base font-medium text-primary p-5 bg-[#E1E7FF4D] rounded-xl'>"{getAnalysisData?.data?.group_formation_logic}"</p>
                  <div>
                  </div>
                </div>
              </BorderHOC>

              <BorderHOC rounded='rounded-2xl'>
                <div className='p-5'>
                  <p className='text-base font-semibold text-primary'>Performance Metrics</p>
                  <div className='divide-y divide-[#D8B4E2]'>
                    {Object.entries(getAnalysisData?.data?.performance_metrics || {}).map(([k, v]) => {
                      const val = Number(Number(v)?.toFixed())
                      return (
                      <div className='flex justify-between items-center py-5'>
                        <p className='text-xs font-medium text-[#7C7C7C] capitalize'>{k?.replaceAll("_", " ")} <b className='text-primary'>({val}/5)</b></p>
                        <div className='flex items-center gap-2'>
                          {Array.from(Array(5).keys()).map(d => {
                            const num = (d + 1)
                            const isNum = (num <= val)
                            return (<p className={`px-2 py-1 rounded-full text-sm font-semibold bg-[#F9F9F9] text-[#7C7C7C] ${isNum && "!bg-[#E1E7FF] !text-primary"}`}>{num}</p>)
                          })}
                        </div>
                      </div>
                    )})}
                  </div>
                </div>
              </BorderHOC>
            </div>
          </BorderHOC>

          <BorderHOC rounded='rounded-2xl'>
            <div className='p-5 space-y-5'>
              <p className='text-xl font-semibold text-primary'>Individual Student Placement Logic</p>
              <BorderHOC rounded='rounded-2xl'>
                <div className='p-5 grid grid-cols-2 gap-5'>
                  {(getGroupData?.data?.students || [])?.map((d: any) => (
                    <div className='bg-[#E1E7FF66] p-3 space-y-1'>
                      <div className='flex justify-between items-center'>
                        <p className='text-base font-semibold text-primary'>{d?.name}</p>
                        <LuUsers className='text-base font-semibold text-primary' />
                      </div>
                      <p className='text-sm font-normal'>Strong in: {d?.strengths?.join(", ")}</p>
                      <p className='text-sm font-normal'>Areas for growth: {d?.areas_for_growth?.join(", ")}</p>
                      <p className='text-sm font-semibold text-primary'>Performance Metrics</p>
                      <div className='divide-y divide-[#D8B4E2]'>
                        {Object.entries(d?.performance_metrics || {}).map(([k, v]) => {
                          const val = Number(Number(v)?.toFixed())
                          return (
                          <div className='flex justify-between items-center py-2'>
                            <p className='text-xs font-medium text-[#7C7C7C] capitalize'>{k?.replaceAll("_", " ")} <b className='text-primary'>({val}/5)</b></p>
                            <div className='flex items-center gap-2'>
                              {Array.from(Array(5).keys()).map(d => {
                                const num = (d + 1)
                                const isNum = (num <= val)
                                return (<p className={`px-2 py-1 rounded-full text-sm font-semibold bg-[#F9F9F9] text-[#7C7C7C] ${isNum && "!bg-[#E1E7FF] !text-primary"}`}>{num}</p>)
                              })}
                            </div>
                          </div>
                        )})}
                      </div>
                    </div>
                  ))}
                </div>
              </BorderHOC>
            </div>
          </BorderHOC>
        </div>
      </Spin>
    </div>
  )
}

export default GroupAnalysisSection