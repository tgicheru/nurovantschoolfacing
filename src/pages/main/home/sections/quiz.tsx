/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Collapse, Divider, Drawer, Spin, Tabs, Tag } from 'antd'
import React, { useMemo, useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import CustomPagination from '../../../../components/CustomPagination';
import CustomTable from '../../../../components/CustomTable';
import { isEqual, statusType } from '../../../../context/utils';
import { ColumnsType } from 'antd/es/table';
import InviteModal from '../../../../components/modals/InviteModal';
import { PiCaretDownBold, PiCaretUpBold } from 'react-icons/pi';
import { LuTrash } from 'react-icons/lu';
import { useSearchParams } from 'react-router-dom';
import { useGetQuiz, useGetQuizParticipants } from '../../../../hooks/quiz/quiz';
import { BsEye } from 'react-icons/bs';

type Props = {
}
function QuizSection({}: Props) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [params, setParams] = useSearchParams();
  const [isInvite, setIsInvite] = useState(false);
  const [selected, setSelected] = useState<any>({});
  const [isPreview, setIsPreview] = useState(false);
  const [activeTab, setActiveTab] = useState("participants");
  const onPreClose = () => setIsPreview(false);
  const onInvClose = () => setIsInvite(false);
  const onPreOpen = () => setIsPreview(true);
  const onInvOpen = () => setIsInvite(true);
  const id = params.get("id");

  const {
    data: getQuizData,
    isLoading: getQuizLoad,
  } = useGetQuiz(id!)

  const {
    data: getQuizPartData,
    isLoading: getQuizPartLoad,
  } = useGetQuizParticipants(id!)

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

  // const handlePreview = (data: any) => {
  //   setSelected(data)
  //   onPreOpen()
  // }

  const participantColumns: ColumnsType<any> = [
    {
      title: "Name",
      dataIndex: "user_name",
      render: (d) => <p>{d || "NIL"}</p>,
    },
    {
      title: "Email",
      dataIndex: "user_email",
      render: (d) => <p>{d || "NIL"}</p>,
    },
    {
      title: "Score",
      render: (d) => <p>{d?.score || 0} / {d?.result?.length}</p>,
    },
    {
      title: "Status",
      render: (d) => {
        const { pass } = handleResult(d?.score, d?.result?.length)
        const status = statusType?.[String(pass) as keyof typeof statusType]
        return <Tag className={`${status?.col} ${status?.bg} rounded-xl text-sm font-medium p-1 px-5 border-0`}>{pass ? "Pass" : "Fail"}</Tag>
      },
    },
    // {
    //   title: "Action",
    //   render: (d) => <Button onClick={() => handlePreview(d)} icon={<BsEye />}>Preview</Button>,
    // },
  ];

  const handleDelete = () => alert("delete this")

  const tabs = useMemo(
    () => [
      {
        key: "participants",
        label: (
          <div className="flex items-center gap-3">
            <p>Participants</p>
            <Tag className="!bg-lit !border-0">{getQuizPartData?.data?.length}</Tag>
          </div>
        ),
        component: (<CustomTable column={participantColumns} data={getQuizPartData?.data} pagination={false} />)
      },
      {
        key: "questions",
        label: (
          <div className="flex items-center gap-3">
            <p>Questions</p>
            <Tag className="!bg-lit !border-0">{[...(getQuizData?.data?.questions||[]), ...(getQuizData?.data?.oeq||[])]?.length}</Tag>
          </div>
        ),
        component: (
          <div className='w-full h-full p-5 grid grid-cols-1 md:grid-cols-3 gap-5 md:divide-x divide-black'>
            <div className='w-full space-y-5'>
              <p className='text-xl font-semibold text-dark'>Meta Data / Key Topics</p>
              <ul className='space-y-2 !list-disc px-5'>
                {getQuizData?.data?.metadata?.map((d: any) => (
                  <li className='text-base font-medium text-gray'>{d}</li>
                ))}
              </ul>
            </div>
            <Collapse
              accordion
              bordered={false}
              defaultActiveKey={['1']}
              className='md:col-span-2'
              expandIconPosition='right'
              style={{ background: "#fff" }}
              expandIcon={({ isActive }) => (isActive ? <PiCaretUpBold className='text-lg' /> : <PiCaretDownBold className='text-lg' />)}
              items={[...(getQuizData?.data?.questions||[]), ...(getQuizData?.data?.oeq||[])]?.map((d: any, idx: number) => ({
                key: d?.question,
                children: <div className='space-y-3'>
                  <p>Options</p>
                  <ol className='px-5 list-decimal'>
                    {d?.options?.map((o: string) => <li>{o}</li>)}
                  </ol>
                  <p>Answer: {d?.answer}</p>
                </div>,
                label: `${idx+1}, ${d?.question}`,
                extra: <Button onClick={handleDelete} hidden className='!m-0 !p-0' type='text' icon={<LuTrash />} />,
                style: {
                  marginBottom: 20,
                  border: '1px solid #E6E9ED',
                  borderRadius: "10px",
                },
              }))}
            />
          </div>
        )
      },
    ],
    [getQuizData, getQuizPartData]
  );

  const CurrentTab = useMemo(
    () => tabs.find((d) => isEqual(d.key, activeTab)),
    [activeTab, tabs]
  );

  const isLoading = (getQuizLoad || getQuizPartLoad)
  return (
    <Spin spinning={isLoading}>
      <div className="w-full h-full md:py-5 space-y-5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 sm:px-5 md:px-10">
          <p className="text-3xl font-bold text-secondary cursor-pointer">
            {getQuizData?.data?.name}
          </p>
          <Button
            size="large"
            type="primary"
            onClick={onInvOpen}
            className="bg-primary !rounded-2xl"
            icon={<FaPlus />}
          >Invite Member</Button>
        </div>

        <div className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:px-5 md:px-10">
            <Tabs
              defaultActiveKey={activeTab}
              onChange={setActiveTab}
              activeKey={activeTab}
              className="!p-0 !m-0"
              items={tabs}
            />
            <CustomPagination
              hidden
              total={75}
              sizeChanger
              size="small"
              current={page}
              pageSize={limit}
              onChange={setPage}
            />
          </div>
          <Divider className='md:m-0 md:p-0' />
          <div className='bg-white'>{CurrentTab?.component}</div>
        </div>

        {/* invite modal >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
        <InviteModal
          onClose={onInvClose}
          isOpen={isInvite}
          type='quiz'
          value={id!}
        />

        {/* preview modal >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
        <Drawer
          // width={100}
          open={isPreview}
          closeIcon={false}
          onClose={onPreClose}
          title={<div className='flex justify-between items-center gap-5'>
            <p className='text-xl font-semibold text-[#414141] capitalize'>{selected?.user_name || "NIL"}</p>
            <Tag className={`${previewStatus?.col} ${previewStatus?.bg} rounded-xl text-sm font-medium p-1 px-5 border-0`}>{isPreviewPass ? "Pass" : "Fail"}</Tag>
        </div>}
        >
          {"hello"}
        </Drawer>
      </div>
    </Spin>
  )
}

export default QuizSection