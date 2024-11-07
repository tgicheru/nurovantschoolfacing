import React, { useState } from 'react'
import { useGetAdaptiveLearning, useGetALQuiz, usePostALQuiz } from '../../../../hooks/adaptivelearning/adaptivelearning'
import { useSearchParams } from 'react-router-dom'
import { Button, Collapse, Spin } from 'antd'
import { ImSpinner } from 'react-icons/im'
import CustomPagination from '../../../../components/CustomPagination'
import { isEqual } from '../../../../context/utils'

function QuestionsTab() {
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
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

  // const isSaved = ["knowledgeGraph_saved", "quizResult_saved"].includes(getALData?.data?.quiz?.status)
  const isGenerating = isEqual(getALData?.data?.quiz?.status, "awaiting_QuizResult")
  const isCreated = Object.keys(getALData?.data?.quiz || {"": ""})?.every(d => d)
  const isLectureQuizReady = (!isGenerating && isCreated)

  const fetchLoad = (getALLoad || getALQuizLoad)
  return (
    <Spin spinning={fetchLoad}>
      <div className='w-full'>
        <div hidden={isLectureQuizReady} className='w-full'>
          <div className='h-[40vh] flex flex-col justify-center items-center gap-5'>
            {!isGenerating && <ImSpinner className='text-5xl text-primary font-bold animate-spin' />}
            <p hidden={isGenerating} className='text-base font-medium text-[#1B2124]'>Quiz Generation in Progress...</p>
            <p hidden={isGenerating} className='text-sm font-medium text-[#1B2124]'>Please wait while it is being processed or come back later.</p>
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

        <div hidden={!isLectureQuizReady} className='w-full space-y-10'>
          <Collapse
            expandIconPosition='end'
            items={getALQuizData?.data?.als_questions?.slice(((page - 1) * limit), (page * limit))?.map((d: any, idx: number) => ({ key: d?.id,
              label: <p className='text-base font-normal text-[#1B1B1B]'>{idx + 1} : {d?.question}</p>,
              children: <div className='space-y-2'>
                <p>Options</p>
                <ol className='px-5 list-decimal'>
                  {d?.options?.map((o: string) => <li>{o}</li>)}
                </ol>
                <p>Answer: {d?.answer}</p>
              </div>
            }))}
          />

          <CustomPagination
            current={page}
            pageSize={limit}
            onChange={setPage}
            onSizeChange={(b: any, d: any) => setLimit(d)}
            total={getALQuizData?.data?.als_questions?.length}
          />
        </div>
      </div>
    </Spin>
  )
}

export default QuestionsTab