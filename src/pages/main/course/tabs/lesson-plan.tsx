import React, { useState } from 'react'
import { useGetLectureById, useGetLessonPlan } from '../../../../hooks/lecture/lecture';
import { useSearchParams } from 'react-router-dom';
import { Button, Card, Spin } from 'antd';
import EmptyDisplay from '../../../../components/EmptyDisplay';
import { LuPlus } from 'react-icons/lu';
import moment from 'moment';
import { BorderHOC } from '../../../../components';
import { isEqual } from '../../../../context/utils';
import LearningObjectiveTab from '../subtabs/learning-objective';
import MaterialsNeededTab from '../subtabs/materials-needed';
import HomeworkTab from '../subtabs/homework';
import TeachersNoteTab from '../subtabs/teachers-note';
import ScoringGuideTab from '../subtabs/scoring-guide';
import ActivitiesTab from '../subtabs/activities';
import LessonPLanDrawer from '../components/lesson-plan-drawer';

function LessonPlanTab() {
  const [param, setParam] = useSearchParams()
  const [tab, setTab] = useState("lesson")
  const lecture = param.get("lecture")
  const id = param.get("id")

  const {
    data: getLectureData,
    refetch: getLectureFetch,
    isLoading: getLectureLoad,
  } = useGetLectureById({ id: lecture })

  const {
    data: getLessonPlanData,
    refetch: getLessonPlanFetch,
    isLoading: getLessonPlanLoad,
  } = useGetLessonPlan({ course_id: id, lecture_id: lecture }, getLectureFetch)

  const lessonPlanData = (getLessonPlanData?.data || getLectureData?.lesson_plan)

  const tabs = [
    { key: "lesson", label: "Lesson Objectives", Component: () => <LearningObjectiveTab data={lessonPlanData?.objectives} /> },
    { key: "materials", label: "Materials Needed", Component: () => <MaterialsNeededTab data={lessonPlanData?.materials_needed} /> },
    { key: "homework", label: "Homework", Component: () => <HomeworkTab data={lessonPlanData?.homework} /> },
    { key: "note", label: "Teachers Note", Component: () => <TeachersNoteTab data={lessonPlanData?.teachers_note} /> },
    { key: "scoring", label: "Rubric and Scoring Guide", Component: () => <ScoringGuideTab data={lessonPlanData?.rubic_scoring_guide} /> },
    { key: "activities", label: "Activities", Component: () => <ActivitiesTab data={getLectureData} /> },
    { key: "group", label: "Group Activities", action: () => setParam({id, lecture, section: "group-activities"} as any) },
  ]

  const CurrentComponent = () => (tabs?.find(({key}) => isEqual(tab, key))?.Component?.() || <></>)
  return (
    <Spin spinning={getLectureLoad}>
      <div className='w-full'>
        <EmptyDisplay hidden={lessonPlanData} className='w-full h-[50vh]'>
          <Button loading={getLessonPlanLoad} onClick={getLessonPlanFetch as any} className='!text-sm !font-bold bg-[#4970FC]' icon={<LuPlus className='text-xl' />} size='large' type='primary' shape='round'>Generate material</Button>
        </EmptyDisplay>

        <div hidden={!lessonPlanData} className='w-full space-y-5'>
          <Card className="!bg-[#E1E7FF]">
            <div className="flex items-center flex-1 justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-neutral-900 font-bold whitespace-nowrap">Created</p>
                <p className="text-xs leading-[18px] text-neutral-600 whitespace-nowrap">{moment(lessonPlanData?.createdAt).format("lll")}</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-neutral-900 font-bold whitespace-nowrap">Unit Name</p>
                <p className="text-[12px] leading-[18px] text-neutral-600 whitespace-nowrap">{getLectureData?.unit}</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-neutral-900 font-bold whitespace-nowrap">Lesson Duration</p>
                <p className="text-[12px] leading-[18px] text-neutral-600 whitespace-nowrap">{lessonPlanData?.duration} Mins</p>
              </div>
            </div>
          </Card>

          <div className='w-full flex justify-between gap-5'>
            <div className="w-full md:w-[250px] space-y-3">
              <BorderHOC className="!rounded-xl" childClass='!rounded-xl'>
                <div className="w-full p-5 space-y-3">
                  <p className='text-xl font-bold'>Lesson Objectives</p>
                  <ul className="list-disc pl-6 space-y-2">
                    {tabs.map(({key, label, action}) => {
                      const isActive = isEqual(tab, key)
                      const handleTab = () => (action ? action() : setTab(key))
                      return (<li key={key} className={`${isActive && '!text-primary'}`}>
                        <Button onClick={handleTab} type='text' size='small' className={`${isActive && '!text-primary'}`}>{label}</Button>
                      </li>)
                    })}
                  </ul>
                </div>
              </BorderHOC>
              <LessonPLanDrawer id={lessonPlanData?._id} />
            </div>
            
            <div className='w-full'>
              <BorderHOC className="!rounded-xl" childClass='!rounded-xl p-5'>
                <CurrentComponent />
              </BorderHOC>
            </div>
          </div>
        </div>
      </div>
    </Spin>
  )
}

export default LessonPlanTab