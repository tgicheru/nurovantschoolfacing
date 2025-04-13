import React, { useState } from 'react'
import { Button, Dropdown, Input, Spin, Tag } from 'antd'
import { LuChevronLeft, LuUpload } from 'react-icons/lu'
import { useNavigate } from 'react-router'
import { BorderHOC } from '../../../../components'
import { useDeletePacingGuide, useDeletePacingGuideLecture, useGetAllPacingGuides, useGetPacingGuide } from '../../../../hooks/courses/courses'
import { PiDotsThreeOutline } from 'react-icons/pi'
import { useSearchParams } from 'react-router-dom'
import moment from 'moment'

function PacingGuideSection() {
  const [params, setParams] = useSearchParams()
  const [search, setSearch] = useState("")
  const section = params.get("section")
  const navigate = useNavigate()
  const id = params.get("id")

  const goBack = () => navigate(-1)

  const {
    data: getAllPacesData,
    refetch: getAllPacesFetch,
    isLoading: getAllPacesLoad,
  } = useGetAllPacingGuides()

  const {
    data: getPaceData,
    refetch: getPaceFetch,
    isLoading: getPaceLoad,
  } = useGetPacingGuide(id)

  const handleFetch = () => {getAllPacesFetch(); getPaceFetch()}

  const {
    mutate: deletePaceAction,
    isLoading: deletePaceLoad,
  } = useDeletePacingGuide(handleFetch)

  const {
    mutate: deletePaceLectureAction,
    isLoading: deletePaceLectureLoad,
  } = useDeletePacingGuideLecture(handleFetch)

  const handleDelete = () => deletePaceAction({ id: getPaceData?._id,
    pacing_guide_url: getPaceData?.pacing_guide_url,
    lecture_id: getPaceData?._id,
  })

  if (id) return (
    <div className='w-full space-y-5'>
      <div className='w-full flex justify-between items-center'>
        <Button onClick={goBack} className='text-primary' icon={<LuChevronLeft />} type='text'>Back</Button>
        <p className='text-2xl font-bold text-[#161617]'>Pacing Guide {}</p>
        <Button href={getPaceData?.ics_file_url} disabled={!getPaceData?.ics_file_url} type='primary' shape='round' icon={<LuUpload />}>Export</Button>
      </div>

      <BorderHOC rounded='rounded-xl'>
        <Spin spinning={getPaceLoad}>
          <div className='p-5 space-y-5'>
            <div className='p-5'>
              <div className='flex justify-between items-center'>
                <p className=''>{getPaceData?.course_name}</p>
                <Dropdown menu={{ items: [
                  { key: "delete", label: "Delete", onClick: handleDelete },
                ] }}>
                  <Button loading={deletePaceLoad} type='text' icon={<PiDotsThreeOutline className='text-2xl' />} />
                </Dropdown>
              </div>
              <p className='text-sm font-normal text-[#7C7C7C]'>Grade Level: {getPaceData?.grade_level}</p>
              <p className='text-sm font-normal text-[#7C7C7C]'>Creation Date: {moment(getPaceData?.created_at).format("ll")}</p>
              <div className='flex items-center gap-3'>
                <p className='text-sm font-normal text-[#7C7C7C]'>Google Calendar Integration: </p>
                <Tag color={getPaceData?.is_integrated_with_google_calendar ? "success" : "processing"}>{getPaceData?.is_integrated_with_google_calendar ? "Active" : "Inactive"}</Tag>
              </div>
            </div>

            <p className='text-base font-semibold text-primary'>Lectures / Lessons: </p>

            <div className='grid grid-cols-3'>
              <Input value={search} onChange={({target:{value}}) => setSearch(value)} size='large' placeholder='Search through lessons' />
            </div>

            <div className='w-full grid md:grid-cols-2 xl:grid-cols-4 gap-5'>
              {getPaceData?.lectures?.filter((d: any) => search ? d?.topic?.toLowerCase()?.includes(search?.toLowerCase()) : true)?.map((d: any) => {
                const onDelete = () => deletePaceLectureAction({id, lesson_id: d?._id})
                return (
                <BorderHOC rounded='rounded-xl' className='!h-full'>
                  <div className='space-y-2 p-5 h-full'>
                    <div className='flex justify-between items-center'>
                      <p className='text-sm'>{d?.topic}</p>
                      <Dropdown menu={{ items: [
                        { key: "delete", label: "Delete", onClick: onDelete },
                      ] }}>
                        <Button loading={deletePaceLectureLoad} type='text' icon={<PiDotsThreeOutline className='text-2xl' />} />
                      </Dropdown>
                    </div>
                    <p className='text-xs font-normal text-[#7C7C7C]'>Standard Code: {d?.standard_code}</p>
                    <p className='text-xs font-normal text-[#7C7C7C]'>{d?.description}</p>
                    <p className='text-xs font-normal text-primary'>Objectives: </p>
                    <ul className='pl-5 list-disc text-xs'>
                      {d?.objectives?.map((d: any) => <li>{d}</li>)}
                    </ul>
                    <p className='text-xs font-normal text-primary'>Activities: </p>
                    <ul className='pl-5 list-disc text-xs'>
                      {d?.activities?.map((d: any) => <li>{d}</li>)}
                    </ul>
                  </div>
                </BorderHOC>
              )})}
            </div>
          </div>
        </Spin>
      </BorderHOC>
    </div>
  )

  return (
    <div className='w-full space-y-5'>
      <div className='w-full flex justify-between items-center'>
        <Button onClick={goBack} className='text-primary' icon={<LuChevronLeft />} type='text'>Back</Button>
        <p className='text-2xl font-bold text-[#161617]'>Pacing Guides</p>
        <div />
      </div>

      <BorderHOC rounded='rounded-xl'>
        <Spin spinning={getAllPacesLoad}>
          <div className='w-full grid md:grid-cols-2 xl:grid-cols-3 gap-5 p-5'>
            {getAllPacesData?.map((d: any) => {
              const onDelete = () => deletePaceAction({ id: d?._id,
                pacing_guide_url: d?.pacing_guide_url,
                lecture_id: d?._id,
              })
              const onView = () => setParams({section, id: d?._id} as any)
              return (
              <BorderHOC rounded='rounded-xl'>
                <div className='p-5 space-y-'>
                  <div className='flex justify-between items-center'>
                    <p className=''>{d?.course_name}</p>
                    <Dropdown menu={{ items: [
                      { key: "view", label: "View", onClick: onView },
                      { key: "delete", label: "Delete", onClick: onDelete },
                    ] }}>
                      <Button loading={deletePaceLoad} type='text' icon={<PiDotsThreeOutline className='text-2xl' />} />
                    </Dropdown>
                  </div>
                  <p className='text-sm font-normal text-[#7C7C7C]'>Grade Level: {d?.grade_level}</p>
                  <p className='text-sm font-normal text-[#7C7C7C]'>Creation Date: {moment(d?.created_at).format("ll")}</p>
                  <div className='flex items-center gap-3'>
                    <p className='text-sm font-normal text-[#7C7C7C]'>Google Calendar Integration: </p>
                    <Tag color={d?.is_integrated_with_google_calendar ? "success" : "processing"}>{d?.is_integrated_with_google_calendar ? "Active" : "Inactive"}</Tag>
                  </div>
                </div>
              </BorderHOC>
            )})}
          </div>
        </Spin>
      </BorderHOC>
    </div>
  )
}

export default PacingGuideSection