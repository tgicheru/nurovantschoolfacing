import { Button, Checkbox, DatePicker, Divider, Form, Input, Modal, Select, Upload } from 'antd'
import React, { useState } from 'react'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { usePostPacingGuide, usePostPacingGuideLesson } from '../../../../hooks/courses/courses';
import { useSearchParams } from 'react-router-dom';
import { ImSpinner } from 'react-icons/im';
import { LuPlus, LuUpload, LuUploadCloud } from 'react-icons/lu';
import { useAWSUpload } from '../../../../hooks/otherhooks';

function PacingGuideModal({
  successAction,
  isUpload = false,
  isAddLecture = false,
}: { isUpload?: boolean, isAddLecture?: boolean, successAction?: any }) {
  const [params, setParams] = useSearchParams()
  const [payload, setPayload] = useState<any>({
    integrateWithGoogleCalendar: false
  })
  const [isCreate, setIsCreate] = useState(false)
  const onCloseCreate = () => setIsCreate(false)
  const onOpenCreate = () => setIsCreate(true)
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const onOpen = () => setIsOpen(true)
  const width = window.innerWidth
  const id = params.get("id")

  const props = (onChange: any) => ({
    name: "file",
    multiple: false,
    directory: false,
    method: undefined,
    showUploadList: false,
    className: "px-5 text-center space-y-2",
    onChange: ({ file }: { file: Blob | any }) => onChange(file?.originFileObj),
  })

  const {
    isLoading: postUplLoad,
    mutateAsync: postUplAction,
  } = useAWSUpload()

  const {
    mutate: postLessonAction,
    isLoading: postLessonLoad,
  } = usePostPacingGuideLesson(successAction)

  const {
    mutate: postPaceGuideAction,
    isLoading: postPaceGuideLoad,
  } = usePostPacingGuide((res: any) => {setParams({section: "pacing-guide", id: res?.data?._id}); successAction?.(res)});

  const handlePacingGuide = (data: any) => postPaceGuideAction(payload)
  const handlePacingGuideLesson = (data: any) => postLessonAction({id, lesson: {...data, ...payload}})
  const handleUpload = async (file: any, key: any) => await postUplAction(file).then((res: any) => setPayload({...payload, [key]: res?.Location}))

  return (
    <div>
      <Button hidden={!isUpload} onClick={onOpen} type="primary" icon={<LuUpload />} loading={postPaceGuideLoad} shape='round' size='large'>Create Pacing Guide</Button>
      <Button hidden={!isAddLecture} onClick={onOpenCreate} size='large' type='primary' icon={<LuPlus />}>Add New Lecture</Button>

      {/* upload pacing guide modal >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
      <Modal
        open={isOpen}
        footer={false}
        closeIcon={false}
        onCancel={onClose}
        width={width <= 500 ? width : 500}
        classNames={{ content: "!bg-transparent !shadow-none" }}
      >
        <div className='w-full p-5 space-y-5 bg-white rounded-3xl'>
          <div className='flex justify-between'>
            <p className='text-2xl font-bold text-[#161617]'>Import Pacing Guide</p>
            <Button onClick={onClose} type='text' icon={<IoIosCloseCircleOutline className='text-2xl text-primary' />} />
          </div>
          <Divider className='m-0 !bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]' />
          <Form onFinish={handlePacingGuide} layout='vertical'>
            <Form.Item label="Upload Pacing Guide Document">
              <Upload.Dragger {...props((file: any) => handleUpload(file, "pacing_guide_url"))} disabled={postUplLoad}>
                <p className="ant-upload-drag-icon">
                  {postUplLoad ? <ImSpinner className="!text-2xl mx-auto !animate-spin" /> : <LuUploadCloud className="!text-2xl mx-auto" />}
                </p>
                <p hidden={!payload?.pacing_guide_url} className="text-sm">Document Uploaded.</p>
                <p hidden={payload?.pacing_guide_url} className="text-sm"><span className='text-primary'>Click to upload</span> or drag and drop</p>
                <p hidden={payload?.pacing_guide_url} className=" text-xs">File size no more than 10MB</p>
              </Upload.Dragger>
            </Form.Item>
            <Form.Item label="Integrate With Google Calendar">
              <Checkbox checked={payload?.integrateWithGoogleCalendar} onChange={(e) => setPayload({...payload, integrateWithGoogleCalendar: e?.target?.checked})}>Integrate With Google Calendar</Checkbox>
            </Form.Item>
            <div className='rounded-xl bg-[#4970FC0A] p-5 space-y-2'>
              <p className='text-base font-semibold text-primary'>Before you upload</p>
              <ul className='px-5 list-disc'>
                {[
                  "Ensure your file includes weekly breakdowns",
                  "Check that learning objectives are clearly defined",
                  "Verify all resources are listed",
                ].map(d => <li>{d}</li>)}
              </ul>
            </div>
            <Button loading={postPaceGuideLoad} disabled={!payload?.pacing_guide_url} className="bg-[#4970FC]" block size="large" type="primary" htmlType='submit' shape="round">Continue</Button>
          </Form>
        </div>
      </Modal>

      {/* add lecture to pacing guide modal >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
      <Modal
        footer={false}
        open={isCreate}
        closeIcon={false}
        onCancel={onCloseCreate}
        width={width <= 500 ? width : 500}
        classNames={{ content: "!bg-transparent !shadow-none" }}
      >
        <div className='w-full p-5 space-y-5 bg-white rounded-3xl'>
          <div className='flex justify-between'>
            <p className='text-2xl font-bold text-[#161617]'>Add Lecture Topic</p>
            <Button onClick={onCloseCreate} type='text' icon={<IoIosCloseCircleOutline className='text-2xl text-primary' />} />
          </div>
          <Divider className='m-0 !bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]' />
          <Form onFinish={handlePacingGuideLesson} layout='vertical'>
            <Form.Item label="Lecture Topic" name="topic">
              <Input placeholder='Enter lecture topic' size='large' />
            </Form.Item>
            <Form.Item label="Topic Description" name="description">
              <Input.TextArea placeholder='Enter topic description' size='large' />
            </Form.Item>
            <Form.Item label="Lecture Date">
              <DatePicker.RangePicker onChange={(e, d) => setPayload({...payload, lecture_start_date: d?.[0], lecture_end_date: d?.[1]})} size='large' className='w-full' />
            </Form.Item>
            <Form.Item label="Objectives" name="objectives">
              <Select mode='tags' placeholder='Enter objectives' size='large' />
            </Form.Item>
            <Form.Item label="Activities" name="activities">
              <Select mode='tags' placeholder='Enter activities' size='large' />
            </Form.Item>
            <Button loading={postLessonLoad} className="bg-[#4970FC]" block size="large" type="primary" htmlType='submit' shape="round">Save & Update</Button>
          </Form>
        </div>
      </Modal>
    </div>
  )
}

export default PacingGuideModal