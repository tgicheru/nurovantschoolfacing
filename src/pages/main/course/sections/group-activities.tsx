import { Avatar, Button, Checkbox, Divider, Drawer, Form, Input, Popconfirm, Spin, Tag, Upload } from 'antd'
import React, { useState } from 'react'
import { LuChevronLeft, LuUploadCloud, LuUsers } from 'react-icons/lu'
import { BorderHOC } from '../../../../components'
import { BiEditAlt } from 'react-icons/bi'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDeleteStudentGroup, useGetStudentGroup, useGetStudentGroups, usePutStudentGroup, usePutStudentGroupSwap } from '../../../../hooks/courses/courses'
import { PiBookOpenText } from 'react-icons/pi'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useAWSUpload } from '../../../../hooks/otherhooks'
import { ImSpinner } from 'react-icons/im'
import { isEqual } from '../../../../context/utils'

function GroupActivitiesSection() {
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const [payload, setPayload] = useState<any>({})
  const [isOpen, setIsOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isSwap, setIsSwap] = useState(false)
  const onCloseSwap = () => setIsSwap(false)
  const onCloseEdit = () => setIsEdit(false)
  const onOpenEdit = () => setIsEdit(true)
  const onOpenSwap = () => setIsSwap(true)
  const onClose = () => setIsOpen(false)
  const lecture = params.get("lecture")
  const onOpen = () => setIsOpen(true)
  const width = window.innerWidth
  const id = params.get("id")

  const goBack = () => navigate(-1)
  const handleAnalysis = () => setParams({id, lecture, section: "group-analysis"} as any)

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
    data: getStudGroupsData,
    refetch: getStudGroupsFetch,
    isLoading: getStudGroupsLoad,
  } = useGetStudentGroups({ lecture_id: lecture! }, ["lecture_id"])

  const {
    isLoading: getStudGroupLoad,
  } = useGetStudentGroup(payload?._id, (res: any) => setPayload({...payload,
    activity_type: res?.data?.at(0)?.activity_type,
    activity: res?.data?.at(0)
  }))

  const handleSuccess = () => {
    getStudGroupsFetch()
    setPayload({})
    onCloseEdit()
    onClose()
  }

  const {
    mutate: deleteStudGroupAction,
    isLoading: deleteStudGroupLoad,
  } = useDeleteStudentGroup(handleSuccess)

  const {
    mutate: putStudGroupAction,
    isLoading: putStudGroupLoad,
  } = usePutStudentGroup(handleSuccess)

  const {
    mutate: putStudGroupSwapAction,
    isLoading: putStudGroupSwapLoad,
  } = usePutStudentGroupSwap(handleSuccess)

  const sourceGroup = getStudGroupsData?.data?.find((d: any) => isEqual(d?._id, payload?.swap?.sourceGroupId))
  const targetGroup = getStudGroupsData?.data?.find((d: any) => isEqual(d?._id, payload?.swap?.targetGroupId))
  const sourceStudent = sourceGroup?.students?.find((d: any) => isEqual(d?._id, payload?.swap?.sourceStudentId))
  const targetStudent = targetGroup?.students?.find((d: any) => isEqual(d?._id, payload?.swap?.targetStudentId))

  const handleSwap = () => putStudGroupSwapAction(payload?.swap)
  const handleClearSwap = () => setPayload({...payload, swap: {}})
  const handleDissolveGroup = () => deleteStudGroupAction(payload?._id)
  const handleSubmit = (data: any) => putStudGroupAction({...payload, ...data, activityId: payload?.activity?._id})
  const handleUpload = async (file: any, key: any) => await postUplAction(file).then((res: any) => setPayload({...payload, [key]: res?.Location}))
  return (
    <div className='w-full space-y-5'>
      <div className='w-full flex justify-between items-center'>
        <Button onClick={goBack} className='text-primary' icon={<LuChevronLeft />} type='text'>Back</Button>
        <p className='text-2xl font-bold text-[#161617]'>Group Activities</p>
        <Button onClick={handleAnalysis} type='primary' shape='round'>Grouping Analysis</Button>
      </div>

      <Spin spinning={getStudGroupsLoad}>
        <BorderHOC rounded='rounded-2xl'>
          <div className='w-full space-y-5 p-5'>
            <div className='flex justify-between items-center'>
              <p className='text-base'>Active Groups</p>
              <Button onClick={onOpenSwap} className='text-primary border-primary' shape='round' icon={<BiEditAlt />}>Edit Groups</Button>
            </div>

            <div className='w-full grid md:grid-cols-2 xl:grid-cols-3 gap-5'>
              {getStudGroupsData?.data?.map((d: any) => {
                const active = Boolean(d?.activities?.length)
                const handleEdit = () => {setPayload({...payload, ...d}); onOpen()}
                const handleSetup = () => { if (active) return handleEdit()
                  setParams({id, lecture, group: d?._id, section: "setup-group-activity"} as any)
                }
                return (
                  <BorderHOC rounded='rounded-lg'>
                    <div className='p-3 space-y-2'>
                      <div className='w-full flex justify-between items-center'>
                        <div className='flex items-center gap-3'>
                          <Avatar size="large" className='bg-[#E1E7FF]' shape='square' icon={<PiBookOpenText className='text-primary' />} />
                          <div>
                            <Button onClick={handleSetup} className='text-base font-bold' type='text'>{d?.name}</Button>
                            <p className='text-sm font-normal text-[#7C7C7C]'>{d?.subject}</p>
                          </div>
                        </div>

                        <Tag className='capitalize'>{d?.status?.replaceAll("_", " ")}</Tag>
                      </div>

                      <Divider className='m-0 !bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]' />

                      <div className='w-full flex justify-between items-center'>
                        <Button onClick={handleEdit} disabled={!active} className="text-primary underline" type='text'>Edit Group</Button>
                        <Button onClick={handleEdit} className='text-[#7C7C7C]' type='text' icon={<LuUsers />}>{d?.group_size} Participants</Button>
                      </div>
                    </div>
                  </BorderHOC>
                )
              })}
            </div>
          </div>
        </BorderHOC>
      </Spin>

      {/* edit activity modal >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
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
            <div className='flex items-center gap-2'>
              <LuUsers className='text-xl font-bold' />
              <p className='text-xl font-bold text-[#161617]'>Edit {payload?.name}</p>
            </div>
            <Button onClick={onClose} icon={<AiOutlineCloseCircle className='text-xl' />} type='text' shape='circle' />
          </div>
          <Divider className='m-0 !bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]' />
          <Spin spinning={getStudGroupLoad}>
            <div className='space-y-5 pb-5'>
              <p className='text-base font-medium text-primary'>Current Pairing</p>

              {payload?.students?.filter((d: any) => d?.isMentor)?.map((d: any) => {
                const mentee = payload?.students?.find((b: any) => isEqual(b?._id, d?.isMentor))
                return (
                <div className='w-full p-3 grid grid-cols-2 rounded-xl bg-[#E1E7FF4F]'>
                  <div className='text-center'>
                    <p className='text-lg font-medium'>{d?.name}</p>
                    <p className='text-base font-medium text-[#7C7C7C]'>Mentor</p>
                    <p className='text-sm font-medium text-[#008000]'>Avg Score: {d?.avgScore?.toFixed()}</p>
                  </div>
                  <div className='text-center'>
                    <p className='text-lg font-medium'>{mentee?.name}</p>
                    <p className='text-base font-medium text-[#7C7C7C]'>Mentee</p>
                    <p className='text-sm font-medium text-[#FF0000]'>Avg Score: {mentee?.avgScore?.toFixed()}</p>
                  </div>
                </div>
              )})}

              <p className='text-base font-medium'>Available for swap</p>

              <div className='space-y-3'>
                {payload?.students?.map((d: any) => {
                  const type = { mentee: "Needs Mentoring", mentor: "Can be Mentor" }
                  const handleSwap = () => { onOpenSwap(); onClose();
                    setPayload({ ...payload, swap: {
                      sourceGroupId: payload?._id,
                      sourceStudentId: d?._id
                    }})
                  }
                  return (
                    <BorderHOC rounded='rounded-xl'>
                      <div className='flex justify-between items-center px-5 py-3'>
                        <div className=''>
                          <p className='text-base font-medium'>{d?.name}</p>
                          <p className='text-sm font-normal text-[#7C7C7C]'>{type?.[d?.role as keyof typeof type]}</p>
                        </div>
                        <div className='flex items-center gap-3'>
                          <p className='text-sm font-medium text-[#008000]'>Avg Score: {d?.avgScore?.toFixed()}</p>
                          <Button onClick={handleSwap} className='text-primary' type='text'>Swap</Button>
                        </div>
                      </div>
                    </BorderHOC>
                )})}
              </div>
            </div>
          </Spin>
          <Divider className='m-0 !bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]' />

          <div className='flex justify-between items-center'>
            <Popconfirm title="You sure to dissolve group?" onConfirm={handleDissolveGroup}>
              <Button loading={deleteStudGroupLoad} icon={<AiOutlineCloseCircle className='text-xl' />} type='text' danger>Dissolve Group</Button>
            </Popconfirm>
            <Button onClick={() => {onOpenEdit(); onClose()}} hidden={!payload?.activity} type='primary' shape='round'>Next 1/2</Button>
          </div>
        </div>
      </Drawer>

      {/* edit details modal >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
      <Drawer
        open={isEdit}
        footer={false}
        closeIcon={false}
        onClose={onCloseEdit}
        width={width <= 500 ? width : 500}
        classNames={{ content: "!bg-transparent", wrapper: "!shadow-none" }}
      >
        <Form onFinish={handleSubmit} layout='vertical' className='w-full p-5 space-y-5 bg-white rounded-3xl'>
          <div className='w-full flex justify-between gap-5'>
            <div className=''>
              <Button onClick={() => {onCloseEdit(); onOpen()}} className='text-xl font-bold text-[#161617]' type='text' icon={<LuChevronLeft />}>Activity Settings</Button>
              <p className='text-sm font-medium'>Ensure the group work is directly following the learning objectives</p>
            </div>
            <Button onClick={onCloseEdit} icon={<AiOutlineCloseCircle className='text-xl' />} type='text' shape='circle' />
          </div>
          <Divider className='m-0 !bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]' />

          <div className='space-y-5 pb-5'>
            <Form.Item label="Note" name="note">
              <Input size='large' placeholder='Enter group note' />
            </Form.Item>
            <Form.Item label="Last Quiz Result">
              <Upload.Dragger {...props((file: any) => handleUpload(file, "lastQuizResult"))} disabled={postUplLoad}>
                <p className="ant-upload-drag-icon">
                  {postUplLoad ? <ImSpinner className="!text-2xl mx-auto !animate-spin" /> : <LuUploadCloud className="!text-2xl mx-auto" />}
                </p>
                <p hidden={!payload?.lastQuizResult} className="text-sm">Document Uploaded.</p>
                <p hidden={payload?.lastQuizResult} className="text-sm"><span className='text-primary'>Click to upload</span> or drag and drop</p>
                <p hidden={payload?.lastQuizResult} className=" text-xs">File size no more than 10MB</p>
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
          </div>

          <Divider className='m-0 !bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]' />
          <div className='flex justify-between items-center'>
            <div />
            <Button type='primary' shape='round' loading={putStudGroupLoad} htmlType='submit'>Complete Set Up</Button>
          </div>
        </Form>
      </Drawer>

      {/* swap modal >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
      <Drawer
        open={isSwap}
        footer={false}
        closeIcon={false}
        onClose={onCloseSwap}
        width={width <= 500 ? width : 500}
        classNames={{ content: "!bg-transparent", wrapper: "!shadow-none" }}
      >
        <div className='w-full p-5 space-y-5 bg-white rounded-3xl'>
          <div className='w-full flex justify-between gap-5'>
            <div className='flex items-center gap-2'>
              <LuUsers className='text-xl font-bold' />
              <p className='text-xl font-bold text-[#161617]'>Student Group Manager</p>
            </div>
            <Button onClick={onCloseSwap} icon={<AiOutlineCloseCircle className='text-xl' />} type='text' shape='circle' />
          </div>
          <Divider className='m-0 !bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]' />

          <div hidden={!(sourceGroup || targetGroup)} className='space-y-5'>
            <div hidden={!sourceGroup} className=''>
              <BorderHOC rounded='!rounded-xl'>
                <div className='p-3 space-y-3'>
                  <p className='text-base font-medium text-primary'>{sourceGroup?.name}</p>
                  <div className='w-full flex justify-between items-center bg-primary text-white rounded-xl px-3 py-2'>
                    <p className='text-base font-normal'>{sourceStudent?.name}</p>
                    <p className='text-base font-normal'>Avg Score: {sourceStudent?.avgScore?.toFixed()}</p>
                  </div>
                </div>
              </BorderHOC>
            </div>

            <Divider>Swap Member With</Divider>

            <div hidden={!targetGroup} className=''>
              <BorderHOC rounded='!rounded-xl'>
                <div className='p-3 space-y-3'>
                  <p className='text-base font-medium text-primary'>{targetGroup?.name}</p>
                  <div className='w-full flex justify-between items-center bg-primary text-white rounded-xl px-3 py-2'>
                    <p className='text-base font-normal'>{targetStudent?.name}</p>
                    <p className='text-base font-normal'>Avg Score: {targetStudent?.avgScore?.toFixed()}</p>
                  </div>
                </div>
              </BorderHOC>
            </div>
          </div>

          <div hidden={(sourceGroup && targetGroup)} className='space-y-5 pb-5'>
            {getStudGroupsData?.data?.filter((d: any) => (!isEqual(d?._id, payload?.swap?.sourceGroupId)))?.map((d: any) => {
              return (
              <BorderHOC rounded='!rounded-xl'>
                <div className='p-3 space-y-3'>
                  <p className='text-base font-medium text-primary'>{d?.name}</p>
                  {d?.students?.map((b: any) => {
                    const isSource = payload?.swap?.sourceGroupId
                    const isSelected = (
                      isEqual(b?._id, payload?.swap?.sourceStudentId) ||
                      isEqual(b?._id, payload?.swap?.targetStudentId)
                    )
                    const handleSwap = () => setPayload({ ...payload, swap: {
                      sourceGroupId: payload?.swap?.sourceGroupId || d?._id,
                      sourceStudentId: payload?.swap?.sourceStudentId || b?._id,
                      ...(isSource ? {targetStudentId: b?._id, targetGroupId: d?._id} : {})
                    }})
                    return (
                      <div className='w-full flex items-center gap-3 cursor-pointer' onClick={handleSwap}>
                        <Checkbox checked={isSelected} />
                        <div className='!w-full flex justify-between items-center bg-[#E1E7FF38] rounded-xl px-3 py-2'>
                          <p className='text-base font-normal'>{b?.name}</p>
                          <p className='text-base font-normal'>Avg Score: {b?.avgScore?.toFixed()}</p>
                        </div>
                      </div>
                    )})}
                </div>
              </BorderHOC>
            )})}
          </div>

          <Divider className='m-0 !bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]' />
          <div className='flex justify-between items-center'>
            <Button hidden={!sourceGroup} onClick={handleClearSwap} shape='round' htmlType='submit'>Clear Swap</Button>
            <Button hidden={!(sourceGroup && targetGroup)} onClick={handleSwap} type='primary' shape='round' loading={putStudGroupSwapLoad}>Confirm Swap</Button>
          </div>
        </div>
      </Drawer>
    </div>
  )
}

export default GroupActivitiesSection