import React from 'react'
import { useGetAdaptiveLearning, useGetALQuiz, usePostALQuiz } from '../../../../hooks/adaptivelearning/adaptivelearning'
import { useSearchParams } from 'react-router-dom'
import { Button, Spin } from 'antd'
import { ImSpinner } from 'react-icons/im'

function QuestionsTab() {
  const [params] = useSearchParams()
  const id = params.get("id")

  const {
    data: getALData,
    refetch: getALFetch,
    isLoading: getALLoad,
  } = useGetAdaptiveLearning(id!)

  const {
    data: getALQuizData,
    refetch: getALQuizFetch,
    isLoading: getALQuizLoad,
  } = useGetALQuiz(id!)

  const {
    mutate: postALQuizAction,
    isLoading: postALQuizLoad,
  } = usePostALQuiz(() => {getALFetch(); getALQuizFetch()})

  const handleCreateQuiz = () => postALQuizAction(id!)

  const isSaved = ["quizResult_saved", "knowledgeGraph_saved"].includes(getALData?.data?.quiz?.status)
  const isCreated = Object.keys(getALData?.data?.quiz || {"": ""})?.every(d => d)
  const isLectureQuizReady = (isSaved && isCreated)

  const fetchLoad = (getALLoad || getALQuizLoad)
  return (
    <Spin spinning={fetchLoad}>
      <div className='w-full'>
        <div hidden={isLectureQuizReady} className='w-full'>
          <div className='h-[40vh] flex flex-col justify-center items-center gap-5'>
            {!isSaved && <ImSpinner className='text-5xl text-primary font-bold animate-spin' />}
            <p hidden={isSaved} className='text-base font-medium text-[#1B2124]'>Quiz Generation in Progress...</p>
            <p hidden={isSaved} className='text-sm font-medium text-[#1B2124]'>Please wait while it is being processed or come back later.</p>
            <p hidden={isCreated} className='text-base font-medium text-[#1B2124]'>Generate Quiz From Lecture</p>
            <Button
              size='large'
              type='primary'
              hidden={isCreated}
              loading={postALQuizLoad}
              className='bg-primary'
              onClick={handleCreateQuiz}
            >Generate Questions</Button>
          </div>
        </div>

        <div hidden={!isLectureQuizReady} className='w-full'>

        </div>
      </div>
    </Spin>
  )
}

export default QuestionsTab