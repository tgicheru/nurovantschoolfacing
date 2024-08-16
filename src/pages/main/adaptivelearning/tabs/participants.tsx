import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useGetAdaptiveLearning, useGetALQuizParticipants } from '../../../../hooks/adaptivelearning/adaptivelearning'
import { Alert, Button, Drawer, Input, message, QRCode, Spin, Tag } from 'antd'
import { IoMailOutline } from 'react-icons/io5'
import CustomTable from '../../../../components/CustomTable'
import moment from 'moment'
import { statusType } from '../../../../context/utils'
import { LuEye } from 'react-icons/lu'
import { MdClose } from 'react-icons/md'

function ParticipantsTab() {
  const [selected, setSelected] = useState<any>({})
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const onOpen = () => setIsOpen(true)
  const [params] = useSearchParams()
  const id = params.get("id")


  const handleResult = (result?: any, quests?: any) => {
    const res = Number(result || selected?.score || 0);
    const len = Number(quests || selected?.result?.length || 0);
    const percentage = Number(((res / len) * 100).toFixed() || 0);
    const pass = percentage >= 50;
    const title = pass ? "Well Done!" : "More Studying Required!";
    const context = pass ? "Nuro is proud of you (´•‿•`)" : "Better Score Next Time (´•╭╮•`)";
    const score = `${res}/${len}`;
    return { score, percentage, context, pass, title };
  };

  const { pass: isPreviewPass } = handleResult()
  const previewStatus = statusType?.[String(isPreviewPass) as keyof typeof statusType]

  const {
    data: getALData,
    isLoading: getALLoad,
  } = useGetAdaptiveLearning(id!)

  const {
    data: getALParticipantsData,
    isLoading: getALParticipantsLoad,
  } = useGetALQuizParticipants(getALData?.data?.quiz?._id)

  const isParticipants = getALParticipantsData?.data?.length
  const inviteLink = "https://app.nurovant.com/page/als_quiz/".concat(id!)
  const handleCopy = () => {message.success("Copied to clipboard"); navigator.clipboard.writeText(inviteLink)};

  const column  = [
    {
      title: "Name",
      dataIndex: "user",
      render: (d: any) => d?.full_name || d?.name || "NIL",
    },
    {
      title: "Email",
      dataIndex: "user",
      render: (d: any) => d?.email || "NIL",
    },
    {
      title: "Timestamp",
      dataIndex: "createdAt",
      render: (d: any) => moment(d).format("lll"),
    },
    {
      title: "Pass/Fail",
      render: (d: any) => {
        const isPass = (Math.floor((Number(d?.score) / d?.result?.length) * 100) >= 50)
        const status = statusType?.[(isPass ? "success" : "error") as keyof typeof statusType]
        return <Tag className={`${status?.col} ${status?.bg} rounded-xl text-sm font-medium p-1 px-5 border-0`}>{isPass ? "Pass" : "Fail"}</Tag>
      }
    },
    {
      render: (d: any) => {
        const handleView = () => {onOpen(); setSelected(d)}
        return <Button onClick={handleView} icon={<LuEye />}>Preview</Button>
      }
    }
  ]

  const fetchLoad = (getALLoad || getALParticipantsLoad)
  return (
    <Spin spinning={fetchLoad}>
      <div className='w-full'>
        <div hidden={isParticipants} className='w-full'>
          <div className='md:w-[40%] mx-auto min-h-[40vh] flex flex-col justify-center items-center gap-5'>
            <QRCode value={inviteLink} className="!w-auto !md:w-full !mx-auto" />
            <p className='text-base font-medium text-[#646462]'>Send invites to participants</p>
            <Input
              readOnly
              size='large'
              value={inviteLink}
              className="!rounded-xl"
              placeholder='Invite Link'
              defaultValue={inviteLink}
              suffix={
                <Button
                  type="text"
                  size="small"
                  onClick={handleCopy}
                  icon={<IoMailOutline />}
                  className="text-primary"
                >Copy link</Button>
              }
            />
            <Alert
              message="Invitees would be able to access this material from the web interface."
              className="!rounded-xl text-success border-success bg-[#DEF2E6]"
              type="success"
            />
          </div>
        </div>

        <div hidden={!isParticipants}>
          <CustomTable
            column={column}
            pagination={false}
            data={getALParticipantsData?.data}
          />
        </div>

        <Drawer
          open={isOpen}
          onClose={onClose}
          width={window.innerWidth}
          title={<div className='flex justify-between items-center gap-5'>
            <p className='text-xl font-semibold text-[#414141] capitalize'>{selected?.user?.user_name || selected?.user?.email || "NIL"}</p>
            <div className='flex items-center gap-5 md:gap-10'>
              <Tag className={`${previewStatus?.col} ${previewStatus?.bg} rounded-xl text-sm font-medium p-1 px-5 border-0`}>{isPreviewPass ? "Pass" : "Fail"}</Tag>
              <Button onClick={onClose} type='primary' className='bg-primary' icon={<MdClose />}>Close</Button>
            </div>
          </div>}
        >
          {"hello"}
        </Drawer>
      </div>
    </Spin>
  )
}

export default ParticipantsTab