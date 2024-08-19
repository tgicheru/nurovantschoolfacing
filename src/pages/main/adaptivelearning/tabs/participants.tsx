import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useGetAdaptiveLearning, useGetALQuizParticipants, usePostGenerateALReport, usePostUploadALReport } from '../../../../hooks/adaptivelearning/adaptivelearning'
import { Alert, Button, Collapse, Drawer, Input, message, Modal, QRCode, Spin, Tag } from 'antd'
import { IoMailOutline } from 'react-icons/io5'
import CustomTable from '../../../../components/CustomTable'
import moment from 'moment'
import { statusType } from '../../../../context/utils'
import { LuEye } from 'react-icons/lu'
import { MdClose } from 'react-icons/md'
import CustomPagination from '../../../../components/CustomPagination'
import { BiStats } from 'react-icons/bi'


function ParticipantsTab() {
  const [isAnalOpen, setIsAnalOpen] = useState(false)
  const [selected, setSelected] = useState<any>({})
  const onAnalClose = () => setIsAnalOpen(false)
  const onAnalOpen = () => setIsAnalOpen(true)
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const [limit, setLimit] = useState(10)
  const onOpen = () => setIsOpen(true)
  const [page, setPage] = useState(1)
  const [params] = useSearchParams()
  const width = window.innerWidth
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
    refetch: getALFetch,
    isLoading: getALLoad,
  } = useGetAdaptiveLearning(id!)

  const {
    data: getALParticipantsData,
    refetch: getALParticipantsFetch,
    isLoading: getALParticipantsLoad,
  } = useGetALQuizParticipants(getALData?.data?.quiz?._id)

  const handleFetch = () => {getALFetch(); getALParticipantsFetch()}

  const {
    isLoading: postGenALReportLoad,
    mutateAsync: postGenALReportAction,
  } = usePostGenerateALReport(handleFetch)

  const {
    mutate: postUpALReportAction,
    isLoading: postUpALReportLoad,
  } = usePostUploadALReport(handleFetch)

  const handleGenerateReport = async () => await postGenALReportAction(getALData?.data?.quiz?._id).then(() => postUpALReportAction(getALData?.data?.quiz?._id))

  const isParticipants = getALParticipantsData?.data?.length
  const inviteLink = "https://app.nurovant.com/adaptive-learning/quiz/".concat(id!)
  const isALSCompleted = (getALData?.data?.quiz?.aws_path && getALData?.data?.quiz?.knowledge_graph_id)
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
  const actionLoad = (postUpALReportLoad || postGenALReportLoad)
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

        <div hidden={!isParticipants} className='space-y-5'>
          <div className='flex justify-between items-center'>
            <div />
            <Button
              size="large"
              type="primary"
              icon={<BiStats />}
              loading={actionLoad}
              onClick={onAnalOpen}
              hidden={isALSCompleted}
              className="bg-primary !rounded-2xl"
            >Process ALS</Button>
          </div>

          <CustomTable
            column={column}
            pagination={10}
            data={getALParticipantsData?.data}
          />
        </div>

        <Modal
          okText="Proceed"
          open={isAnalOpen}
          onCancel={onAnalClose}
          onOk={handleGenerateReport}
          okButtonProps={{ type: "primary",
            className: "bg-primary mt-5",
            hidden: isALSCompleted,
            loading: actionLoad,
          }}
          title="Generate Score Report (Note: can only be done once)"
        >
          <div className='space-y-3'>
            <p>This process will generate an overall participant score report that will be processed by the Adaptive Learning System.</p>
            <p>PLease note that the quiz in question will be permanently closed after this process, so please be sure the number of expected participants are met before proceeding with this action.</p>
          </div>
        </Modal>

        <Drawer
          open={isOpen}
          onClose={onClose}
          width={(width <= 500) ? width : (width / 2)}
          footer={<CustomPagination pageSize={limit} onSizeChange={(b: any, d: any) => setLimit(d)} onChange={setPage} current={page}  total={selected?.result?.length} />}
          title={<div className='flex justify-between items-center gap-5'>
            <p className='text-xl font-semibold text-[#414141] capitalize'>{selected?.user?.user_name || selected?.user?.email || "NIL"}</p>
            <div className='flex items-center gap-5 md:gap-10'>
              <Tag className={`${previewStatus?.col} ${previewStatus?.bg} rounded-xl text-sm font-medium p-1 px-5 border-0`}>{isPreviewPass ? "Pass" : "Fail"}</Tag>
              <Button onClick={onClose} type='primary' className='bg-primary' icon={<MdClose />}>Close</Button>
            </div>
          </div>}
        >
          <div className='space-y-3'>
            {selected?.result?.slice(((page - 1) * limit), (page * limit))?.map((d: any) => (
              <Alert
                showIcon
                type={d?.status ? "success" : "error"}
                message={<Collapse ghost expandIcon={() => ""} className='!m-0 !p-0' items={[{ key: d?.id,
                  label: <p className='text-base font-normal text-[#1B1B1B]'>{d?.question}</p>,
                  children: <div className='space-y-2 font-medium'>
                    <p>Selected Answer : {d?.user_answer}</p>
                    <p>Correct Answer : {d?.answer}</p>
                  </div>
                }]} />}
                action={<Tag className={`${statusType?.[d?.status as keyof typeof statusType]?.col} ${statusType?.[d?.status as keyof typeof statusType]?.bg} rounded-xl text-sm font-medium p-1 px-5 border-0`}>{d?.status ? "Pass" : "Fail"}</Tag>}
              />
            ))}
          </div>
        </Drawer>
      </div>
    </Spin>
  )
}

export default ParticipantsTab