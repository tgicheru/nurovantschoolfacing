import React from 'react'
import { useGetLectureById, usePostCreativeAssessment } from '../../../../hooks/lecture/lecture';
import { useSearchParams } from 'react-router-dom';
import { Button, Card, Collapse, Spin } from 'antd';
import EmptyDisplay from '../../../../components/EmptyDisplay';
import { LuPlus } from 'react-icons/lu';
import moment from 'moment';
import { BorderHOC } from '../../../../components';

function CreativeAssessmentTab() {
  const [param] = useSearchParams()
  const lecture = param.get("lecture")

  const {
    data: getLectureData,
    refetch: getLectureFetch,
    isLoading: getLectureLoad,
  } = useGetLectureById({ id: lecture })

  const {
    data: getAssessmentData,
    mutate: postAssessmentAction,
    isLoading: postAssessmentLoad,
  } = usePostCreativeAssessment(getLectureFetch)

  const assessmentData = (getAssessmentData?.data || getLectureData?.creative_assessment)

  const handleCreateAssessment = () => postAssessmentAction({ lecture_id: lecture! })
  return (
    <Spin spinning={getLectureLoad}>
      <div className='w-full'>
        <EmptyDisplay hidden={getLectureData?.creative_assessment} className='w-full h-[50vh]'>
          <Button loading={postAssessmentLoad} onClick={handleCreateAssessment} className='!text-sm !font-bold bg-[#4970FC]' icon={<LuPlus className='text-xl' />} size='large' type='primary' shape='round'>Generate material</Button>
        </EmptyDisplay>

        <div hidden={!getLectureData?.creative_assessment} className='w-full space-y-5'>
          <Card className="!bg-[#E1E7FF]">
            <div className="flex items-center flex-1 justify-between">
              {[
                { label: "Created", value: moment(assessmentData?.createdAt).format("lll") },
                { label: "Group Size", value: assessmentData?.group_size },
                { label: "Duration (Hour)", value: String(assessmentData?.duration?.hours || "00")?.concat(" Hr") },
                { label: "Duration (Minutes)", value: String(assessmentData?.duration?.minutes || "00")?.concat(" Min") },
              ].map(({label, value}) => (
                <div key={label} className="flex flex-col gap-1">
                  <p className="text-sm text-neutral-900 font-bold whitespace-nowrap">{label}</p>
                  <p className="text-xs leading-[18px] text-neutral-600 whitespace-nowrap">{value}</p>
                </div>
              ))}
            </div>
          </Card>

          <div className='w-full flex justify-between gap-5'>
            <div className="w-full md:w-[300px] space-y-3">
              <BorderHOC className="!rounded-xl" childClass='!rounded-xl'>
                <div className="w-full p-5 space-y-3">
                  <p className='text-xl font-bold'>Key Topics</p>
                  <ul className="list-disc pl-6 space-y-2">
                    {assessmentData?.topics?.map((d: any, b: any) => {
                      return (<li key={b}>{d?.topic}</li>)
                    })}
                  </ul>
                </div>
              </BorderHOC>
              <Button type='primary' shape='round'>Edit Quiz</Button>
            </div>
            
            <div className='w-full'>
              <BorderHOC className="!rounded-xl" childClass='!rounded-xl'>
                <Collapse
                  bordered={false}
                  expandIconPosition='end'
                  items={assessmentData?.topics?.map((d: any, idx: number) => ({ key: d?.id, children: false,
                    label: <p className='text-sm font-normal text-[#1B1B1B]'>{idx + 1} : {d?.question}</p>,
                  }))}
                />
              </BorderHOC>
            </div>
          </div>
        </div>
      </div>
    </Spin>
  )
}

export default CreativeAssessmentTab