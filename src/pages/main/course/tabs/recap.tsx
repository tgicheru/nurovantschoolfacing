import React, { useState } from 'react'
import { useGetLectureById } from '../../../../hooks/lecture/lecture';
import { useSearchParams } from 'react-router-dom';
import { Button, Spin, Tabs } from 'antd';
import EmptyDisplay from '../../../../components/EmptyDisplay';
import { LuPlus } from 'react-icons/lu';
import { useGetRecap, usePostRecaps } from '../../../../hooks/recap/recap';
import MiniRecapTab from '../subtabs/mini-recaps';
import OverallRecapTab from '../subtabs/overall-recaps';
import TranscriptionTab from '../subtabs/transcription';

function RecapTab() {
  const [param] = useSearchParams()
  const lecture = param.get("lecture")
  const [tab, setTab] = useState("mini-recaps")

  const {
    data: getLectureData,
    refetch: getLectureFetch,
    isLoading: getLectureLoad,
  } = useGetLectureById({ id: lecture })

  const {
    data: getRecapData,
    refetch: getRecapFetch,
    isLoading: getRecapLoad,
  } = useGetRecap({ recap_id: getLectureData?.recap?._id })

  const {
    refetch: postRecapAction,
    isLoading: postRecapLoad,
  } = usePostRecaps(() => {getLectureFetch(); getRecapFetch()}, lecture!)

  const recapData = (getRecapData?.data || getLectureData?.recap)

  const tabs = [
    { key: "mini-recaps", label: "Mini Recaps", children: <MiniRecapTab data={recapData?.recaps?.mini_recaps} /> },
    { key: "overall-recaps", label: "Overall Recaps", children: <OverallRecapTab data={recapData?.recaps?.overall_recaps} /> },
    { key: "transcription", label: "Transcription", children: <TranscriptionTab data={recapData?.recaps?.transcriptions} /> },
  ]

  const handleCreateRecap = () => postRecapAction()
  return (
    <Spin spinning={getLectureLoad || getRecapLoad}>
      <div className='w-full'>
        <EmptyDisplay hidden={getLectureData?.recap} className='w-full h-[50vh]'>
          <Button loading={postRecapLoad} onClick={handleCreateRecap} className='!text-sm !font-bold bg-[#4970FC]' icon={<LuPlus className='text-xl' />} size='large' type='primary' shape='round'>Generate material</Button>
        </EmptyDisplay>

        <div hidden={!getLectureData?.recap} className='w-full space-y-5'>
          <Tabs activeKey={tab} onChange={setTab} items={tabs} />
        </div>
      </div>
    </Spin>
  )
}

export default RecapTab