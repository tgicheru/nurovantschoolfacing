/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Divider, Input, Popconfirm, Radio, Space, Spin, Tag } from 'antd'
import React, { useMemo, useState } from 'react'
import { MdCancel } from "react-icons/md";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetQuiz, usePostQuizAnswer } from '../../../../hooks/quiz/quiz';
import { isEqual } from '../../../../context/utils';
import { useRecoilValue } from 'recoil';
import authAtom from '../../../../atoms/auth/auth.atom';

type Props = {
}
function QuizQuestionsSection({}: Props) {
  const navigate = useNavigate()
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [params, setParams] = useSearchParams();
  const [questions, setQuestions] = useState<any>([]);
  const [activeQuest, setActiveQuest] = useState(0);
  const id = params.get("id");
  
  const { user } = useRecoilValue(authAtom)
  const resetQuest = () => setActiveQuest(0);
  const goBack = () => navigate("/");

  const {
    data: getQuizData,
    isLoading: getQuizLoad,
  } = useGetQuiz(id!)

  const {
    data: postAnsData,
    mutate: postAnsAction,
    isLoading: postAnsLoad,
  } = usePostQuizAnswer(resetQuest)

  useMemo(() => setQuestions([
    ...(getQuizData?.data?.questions || [])?.map((d: any) => ({...d, mcq: true})),
    ...(getQuizData?.data?.oeq || [])?.map((d: any) => ({...d, oeq: true}))
  ] || []), [getQuizData])

  useMemo(() => setQuestions([
    ...(postAnsData?.data?.result || [])?.map((d: any) => ({
      answered: true,
      ...d,
    })),
  ] || questions), [postAnsData])
  

  const CurrentQuest: any = useMemo(
    () => questions?.[activeQuest],
    [activeQuest, questions]
  );

  const handleAnswer = (res: any) => {
    setQuestions(questions?.map((d: any, idx: number) => ({
      ...d,
      response: isEqual(idx, activeQuest) ? (res || "") : (d?.response || "")
    })))
  }

  const handleSubmit = () => {
    const payload = {
      mcqsubmission: questions?.filter((d: any) => d?.mcq)?.map((d: any) => ({question: d?.question, answer: d?.response})),
      oeqsubmission: questions?.filter((d: any) => d?.oeq)?.map((d: any) => ({question: d?.question, answer: d?.response})),
      quiz_id: getQuizData?.data?._id,
      user_name: user?.info?.name,
      user_id: user?.info?._id,
      duration_used: "120",
    }
    postAnsAction(payload)
  }
  return (
    <Spin spinning={getQuizLoad}>
      <div className="w-full min-h-[95vh] flex flex-col justify-between items-center md:py-5 space-y-5">
        <div className="w-full flex items-center px-5 md:px-10 gap-5">
          <MdCancel
            className='cursor-pointer text-3xl'
            onClick={goBack}
          />
          <div className='w-full pb-1 flex flex-nowrap items-center gap-3 overflow-x-auto'>
            {questions?.map((d: any, idx: number) => (
              <Button
                type='primary'
                onClick={() => setActiveQuest(idx)}
                className={`!w-[150px] !h-[13px] ${isEqual(idx, activeQuest) ? "bg-primary" : "bg-fint"}`}
              />
            ))}
          </div>
        </div>

        <div className='w-full flex flex-col justify-center items-center gap-10'>
          <div className='w-[50%] grid grid-cols-1 md:grid-cols-2 gap-5 mx-auto border border-[#f7f6f8] rounded-lg shadow-xl px-5 py-10'>
            <div className='space-y-5'>
              <span className='px-4 py-2 border border-[#F2F2FA] rounded-3xl'>{activeQuest+1}/{questions?.length}</span>
              <p className='text-base text-dark font-medium'>{CurrentQuest?.question}</p>
            </div>
            {CurrentQuest?.answered ? (
              <div className='space-y-3'>
                <p>Correct Answer: {CurrentQuest?.answer}</p>
                <p>Your Answer: {CurrentQuest?.user_answer}</p>
                <p>Status: <Tag color={CurrentQuest?.status ? "success" : "error"}>{CurrentQuest?.statue? "Correct" : "Incorrect"}</Tag></p>
              </div>
            ) : (
              CurrentQuest?.mcq ? (
                <Radio.Group  onChange={(e) => handleAnswer(e?.target?.value)} value={CurrentQuest?.response}>
                  <Space direction="vertical">
                    {CurrentQuest?.options?.map((d: any) => (
                      <Radio value={d}>{d}</Radio>
                    ))}
                  </Space>
                </Radio.Group>
              ) : (
                <Input.TextArea
                  onChange={(e) => handleAnswer(e?.target?.value)}
                  placeholder='Enter your answer'
                  value={CurrentQuest?.response}
                  rows={5}
                />
              )
            )}
          </div>
          <Popconfirm
            okButtonProps={{type: "primary", className: "bg-primary"}}
            description="details will be submitted by clicking OK"
            title="Are you sure to end session?"
            onConfirm={handleSubmit}
          >
            <Button
              className='!font-bold'
              loading={postAnsLoad}
              type='text'
              danger
            >
              End Session
            </Button>
          </Popconfirm>
        </div>

        <div className='w-full'>
          <Divider />
          <div className='flex gap-10 justify-center items-center'>
            <Button
              className='border-primary text-primary rounded-xl'
              onClick={() => setActiveQuest(activeQuest-1)}
              disabled={!activeQuest}
              size='large'
            >
              Prev
            </Button>
            <Button
              className='border-primary text-primary rounded-xl'
              disabled={isEqual(activeQuest+1, questions?.length)}
              onClick={() => setActiveQuest(activeQuest+1)}
              size='large'
            >
              Next
            </Button>
          </div>  
        </div>
      </div>
    </Spin>
  )
}

export default QuizQuestionsSection