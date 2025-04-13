import { Button, Checkbox, DatePicker, Form, Input, Spin, Tabs, Upload } from 'antd'
import React, { useState } from 'react'
import { LuChevronDown, LuChevronLeft, LuClock, LuUploadCloud, LuUsers } from 'react-icons/lu'
import { useNavigate } from 'react-router'
import { BorderHOC } from '../../../../components'
import { useGetGroupDetails, usePostGroupActivity } from '../../../../hooks/courses/courses'
import { useSearchParams } from 'react-router-dom'
import { useAWSUpload } from '../../../../hooks/otherhooks'
import { ImSpinner } from 'react-icons/im'
import { isEqual } from '../../../../context/utils'

function SetupGroupActivity() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [payload, setPayload] = useState<any>()
  const [tab, setTab] = useState("basic-settings")
  const group = params.get("group")

  const goBack = () => navigate(-1)

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
    data: getDetailsData,
    isLoading: getDetailsLoad,
  } = useGetGroupDetails(group)

  const {
    mutate: postActivityAction,
    isLoading: postActivityLoad,
  } = usePostGroupActivity(goBack)

  const handleNext = (data?: any) => {
    const key = { "basic-settings": "group-information", "group-information": "materials-instructions" }?.[tab]
    if (!key) return postActivityAction({...data, ...payload, groupId: group})
    setTab(key)
  }
  const handleUpload = async (file: any, key: any) => await postUplAction(file).then((res: any) => setPayload({...payload, [key]: [res?.Location]}))


  const tabs = [
    { key: "basic-settings", label: " Basic Settings", children: (
      <div className='md:w-1/2 mx-auto p-5'>
        <Form.Item label="Activity Title" name="activity_title">
          <Input size='large' placeholder='Enter activity title' />
        </Form.Item>
        <div className='grid md:grid-cols-2 gap-5'>
          <Form.Item label="Duration" name="duration">
            <Input type='number' size='large' placeholder='Enter duration' prefix={<LuClock  className='text-primary'/>} suffix="Minutes" />
          </Form.Item>
          <Form.Item label="Date" name="date">
            <DatePicker size='large' format="YYYY-MM-DD" className='w-full' />
          </Form.Item>
        </div>
        <div className='flex justify-end items-end'>
          <Button onClick={handleNext} size='large' type='primary' shape='round'>Next</Button>
        </div>
      </div>
    )},
    { key: "group-information", label: "Group Information", children: (
      <div className='md:w-1/2 mx-auto p-5 space-y-3'>
        <div className='grid md:grid-cols-2 gap-5'>
          <Form.Item label="Group Size">
            <BorderHOC rounded='rounded-xl'>
              <div className='bg-[#F5F5F5E5] py-3 px-5 flex justify-between items-center'>
                <LuUsers className='text-primary' />
                <p className='text-sm font-medium text-[#57585A]'>Number of Group Members: {getDetailsData?.data?.group_size}</p>
              </div>
            </BorderHOC>
          </Form.Item>
          <Form.Item label="Group Type">
            <BorderHOC rounded='rounded-xl'>
              <div className='bg-[#F5F5F5E5] py-3 px-5 flex justify-between items-center'>
                <p className='text-sm font-medium text-[#57585A]'>{getDetailsData?.data?.group_type?.replaceAll("_", " ")}</p>
                <LuChevronDown className='text-primary' />
              </div>
            </BorderHOC>
          </Form.Item>
        </div>
        <BorderHOC rounded='rounded-xl'>
          <div className='w-full bg-[#FCFCFC] rounded-xl p-5 space-y-3'>
            <p className='text-base font-medium text-primary'>Current Class</p>
            <div className='grid sm:grid-cols-2 gap-3'>
              {(getDetailsData?.data?.students || []).map((d: any) => (
                <BorderHOC rounded='rounded-xl'>
                  <div className='bg-[#E1E7FF] py-3 px-5'>
                    <p className='text-sm font-medium text-[#57585A]'>{d?.name}</p>
                  </div>
                </BorderHOC>
              ))}
            </div>
          </div>
        </BorderHOC>
        <div className='flex justify-between items-center'>
          <Button onClick={() => setTab("basic-settings")} size='large' shape='round'>Previous</Button>
          <Button onClick={handleNext} size='large' type='primary' shape='round'>Next</Button>
        </div>
      </div>
    )},
    { key: "materials-instructions", label: "Materials &  Instructions", children: (
      <div className='md:w-1/2 mx-auto p-5'>
        <Form.Item label="Activity Instructions" name="activity_instruction">
          <Input.TextArea size='large' placeholder='Enter detailed instructions for students' />
        </Form.Item>
        <Form.Item label="Resources">
          <Upload.Dragger {...props((file: any) => handleUpload(file, "resources_url"))} disabled={postUplLoad}>
            <p className="ant-upload-drag-icon">
              {postUplLoad ? <ImSpinner className="!text-2xl mx-auto !animate-spin" /> : <LuUploadCloud className="!text-2xl mx-auto" />}
            </p>
            <p hidden={!payload?.resources_url} className="text-sm">Document Uploaded.</p>
            <p hidden={payload?.resources_url} className="text-sm"><span className='text-primary'>Click to upload</span> or drag and drop</p>
            <p hidden={payload?.resources_url} className=" text-xs">File size no more than 10MB</p>
          </Upload.Dragger>
        </Form.Item>
        <Form.Item label="Activity Type">
          {[
            "Problem-solving exercises",
            "Concept explanation tasks",
            "Interactive quizzes"
          ].map(d => {
            const isSelected = payload?.activity_type?.includes(d)
            const handleCheck = (e: any) => { const { checked, value } = e?.target
              if (checked) return setPayload({...payload, activity_type: [...(payload?.activity_type || []), value]})
              setPayload({...payload, activity_type: payload?.activity_type?.filter((b: string) => !isEqual(b, value))})
            }
            return <div className='py-1'>
              <Checkbox onChange={handleCheck} checked={isSelected} value={d}>{d}</Checkbox>
            </div>
          })}
        </Form.Item>
        <div className='flex justify-between items-center'>
          <Button onClick={() => setTab("group-information")} size='large' shape='round'>Previous</Button>
          <Button loading={postActivityLoad} size='large' type='primary' shape='round' htmlType='submit'>Save & Publish</Button>
        </div>
      </div>
    )}
  ]
  return (
    <div className='w-full space-y-5'>
      <div className='w-full flex justify-between items-center'>
        <Button onClick={goBack} className='text-primary' icon={<LuChevronLeft />} type='text'>Back</Button>
        <p className='text-2xl font-bold text-[#161617]'>SetUp {getDetailsData?.data?.name} Activity</p>
        <div />
      </div>

      <BorderHOC rounded='rounded-xl'>
        <Spin spinning={getDetailsLoad}>
          <Form onFinish={handleNext} layout='vertical' className='py-5'>
            <Tabs activeKey={tab} onChange={setTab} items={tabs} centered />
          </Form>
        </Spin>
      </BorderHOC>
    </div>
  )
}

export default SetupGroupActivity