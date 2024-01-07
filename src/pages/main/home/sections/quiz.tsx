import { Button, Collapse, Divider, Spin, Tabs, Tag } from 'antd'
import React, { useMemo, useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import CustomPagination from '../../../../components/CustomPagination';
import CustomTable from '../../../../components/CustomTable';
import { isEqual } from '../../../../context/utils';
import { ColumnsType } from 'antd/es/table';
import InviteModal from '../../../../components/modals/InviteModal';
import { PiCaretDownBold, PiCaretUpBold } from 'react-icons/pi';
import { LuTrash } from 'react-icons/lu';
import { useSearchParams } from 'react-router-dom';
import { useGetQuiz, useGetQuizParticipants } from '../../../../hooks/quiz/quiz';

type Props = {
}
function QuizSection({}: Props) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [params, setParams] = useSearchParams();
  const [isInvite, setIsInvite] = useState(false);
  const [activeTab, setActiveTab] = useState("participants");
  const onInvClose = () => setIsInvite(false);
  const onInvOpen = () => setIsInvite(true);
  const id = params.get("id");

  const {
    data: getQuizData,
    isFetching: getQuizLoad,
  } = useGetQuiz(id!)

  const {
    data: getQuizPartData,
    isFetching: getQuizPartLoad,
  } = useGetQuizParticipants(id!)

  const participantColumns: ColumnsType<any> = [
    {
      title: "Name",
      dataIndex: "user_full_name",
      render: (d) => <p>{d || "NIL"}</p>,
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (d) => <p>{d || "NIL"}</p>,
    },
    {
      title: "Score",
      dataIndex: "score",
      render: (d) => <p>{d || 0}</p>,
    },  
  ];

  const handleDelete = () => alert("delete this")

  const tabs = useMemo(
    () => [
      {
        key: "participants",
        action: (
          <Button
            onClick={onInvOpen}
            className="bg-primary !rounded-2xl"
            type="primary"
            size="large"
            icon={<FaPlus />}
          >
            Invite Member
          </Button>
        ),
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
        action: (
          <Button
            onClick={onInvOpen}
            className="bg-primary !rounded-2xl"
            type="primary"
            size="large"
            icon={<FaPlus />}
          >
            Create
          </Button>
        ),
        label: (
          <div className="flex items-center gap-3">
            <p>Questions</p>
            <Tag className="!bg-lit !border-0">{[...(getQuizData?.data?.questions||[]), ...(getQuizData?.data?.oeq||[])]?.length}</Tag>
          </div>
        ),
        component: (
          <div className='w-full md:w-[60%] p-5'>
            <Collapse
              accordion
              bordered={false}
              defaultActiveKey={['1']}
              expandIconPosition='right'
              expandIcon={({ isActive }) => (isActive ? <PiCaretUpBold className='text-lg' /> : <PiCaretDownBold className='text-lg' />)}
              style={{ background: "#fff" }}
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
          {CurrentTab?.action}
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
              total={75}
              pageSize={limit}
              sizeChanger
              current={page}
              size="small"
              onChange={setPage}
            />
          </div>
          <Divider className='md:m-0 md:p-0' />
          {CurrentTab?.component}
        </div>

        {/* invite modal >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
        <InviteModal
          onClose={onInvClose}
          isOpen={isInvite}
          value={id!}
        />
      </div>
    </Spin>
  )
}

export default QuizSection