/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useEditCreativeAssessmentQuiz, useGetLectureById, usePostCreativeAssessment } from '../../../../hooks/lecture/lecture';
import { useSearchParams } from 'react-router-dom';
import { Button, Card, Collapse, Divider, Drawer, Form, Input, Select, Spin } from 'antd';
import EmptyDisplay from '../../../../components/EmptyDisplay';
import { LuPlus } from 'react-icons/lu';
import moment from 'moment';
import { BorderHOC } from '../../../../components';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BiStopwatch } from 'react-icons/bi';
import { handleCapitalize, isEqual } from '../../../../context/utils';

function CreativeAssessmentTab() {
  const [param] = useSearchParams()
  const lecture = param.get("lecture")
  const [payload, setPayload] = useState<any>({
    duration: { hours: 0, minutes: 0 },
    number_of_questions: 5
  })
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const onOpen = () => setIsOpen(true)
  const width = window.innerWidth
  const [form] = Form.useForm()

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

  const {
    mutate: patchAssessmentAction,
    isLoading: patchAssessmentLoad,
  } = useEditCreativeAssessmentQuiz(assessmentData?._id, getLectureFetch)

  useEffect(() => {form.setFieldsValue(assessmentData || payload); setPayload({ ...payload,
    number_of_questions: assessmentData?.number_of_questions || payload?.number_of_questions,
    duration: assessmentData?.duration || payload?.duration,
  })}, [assessmentData])

  const handleCreateAssessment = () => postAssessmentAction({ lecture_id: lecture! })
  const handleEditAssessment = (data: any) => patchAssessmentAction({...payload, ...data})
  return (
    <Spin spinning={getLectureLoad}>
      <div className='w-full'>
        <EmptyDisplay hidden={assessmentData} className='w-full h-[50vh]'>
          <Button loading={postAssessmentLoad} onClick={handleCreateAssessment} className='!text-sm !font-bold bg-[#4970FC]' icon={<LuPlus className='text-xl' />} size='large' type='primary' shape='round'>Generate material</Button>
        </EmptyDisplay>

        <div hidden={!assessmentData} className='w-full space-y-5'>
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
              <Button onClick={onOpen} type='primary' shape='round'>Edit Quiz</Button>
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

        {/* create option modal >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
        <Drawer
          open={isOpen}
          footer={false}
          onClose={onClose}
          closeIcon={false}
          width={width <= 500 ? width : 500}
          classNames={{ content: "!bg-transparent", wrapper: "!shadow-none" }}
        >
          <div className='w-full p-5 space-y-5 bg-white rounded-3xl'>
            <div className='w-full flex justify-between gap-5'>
              <div className=''>
                <p className='text-xl font-bold text-[#161617]'>Edit Quiz</p>
              </div>
              <Button onClick={onClose} icon={<AiOutlineCloseCircle className='text-xl' />} type='text' shape='circle' />
            </div>
            <Divider className='m-0 !bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]' />
            <Form onFinish={handleEditAssessment} form={form} layout='vertical' className='space-y-5 pb-5'>
              <div className='w-full bg-[#E1E7FF] p-5 text-center'>
                <Button className='text-primary !text-sm font-bold' icon={<BiStopwatch />} type='text'>Current Time Limit: {assessmentData?.duration?.hours} hours, {assessmentData?.duration?.minutes} minutes.</Button>
              </div>

              <Form.Item label="Quick Selection Options">
                <div className='flex gap-3 flex-wrap'>
                  {[
                    { key: "minutes", value: 15 },
                    { key: "minutes", value: 30 },
                    { key: "minutes", value: 45 },
                    { key: "hours", value: 1 },
                  ].map(({key, value}) => {
                    const isSelected = isEqual(payload?.duration?.[key], value)
                    const handleSelect = () => setPayload({...payload, duration: {...payload?.duration, [key]: Number(!isSelected && value)}})
                    return (<Button onClick={handleSelect} type={isSelected ? "primary" : "default"}>{value} {handleCapitalize(key)}</Button>)
                  })}
                </div>
              </Form.Item>
              <Form.Item label="Custom Input">
                <div className='flex items-center gap-5'>
                  <Form.Item label="Hours">
                    <Input value={payload?.duration?.hours} onChange={({target:{value:hours}}) => setPayload({...payload, duration: {...payload?.duration, hours}})} type='number' size='large' />
                  </Form.Item>
                  <p className='text-3xl font-bold text-primary'>:</p>
                  <Form.Item label="Minutes">
                    <Input value={payload?.duration?.minutes} onChange={({target:{value:minutes}}) => setPayload({...payload, duration: {...payload?.duration, minutes}})} type='number' size='large' />
                  </Form.Item>
                </div>
              </Form.Item>
              <Form.Item label="Numbers of Questions" name="number_of_questions">
                <Select placeholder='Select number of questions' size='large'>
                  {Array.from(Array(20).keys()).map(d => <Select.Option value={(d + 1)}>{(d + 1)}</Select.Option>)}
                </Select>
              </Form.Item>
              <Button loading={patchAssessmentLoad} htmlType='submit' size='large' type='primary' shape='round'>Save Changes</Button>
            </Form>
          </div>
        </Drawer>
      </div>
    </Spin>
  )
}

export default CreativeAssessmentTab