import { Button, Tabs, Tag } from 'antd'
import React, { useMemo, useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import CustomPagination from '../../../../components/CustomPagination';
import CustomTable from '../../../../components/CustomTable';
import { isEqual } from '../../../../context/utils';
import { ColumnsType } from 'antd/es/table';
import InviteModal from '../../../../components/modals/InviteModal';

type Props = {
}
function QuizSection({}: Props) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isInvite, setIsInvite] = useState(false);
  const [activeTab, setActiveTab] = useState("participants");
  const onInvClose = () => setIsInvite(false);
  const onInvOpen = () => setIsInvite(true);
  
  const participantColumns: ColumnsType<any> = [
    {
      title: "Name",
      dataIndex: "",
      render: () => <p>John Doe</p>,
    },
    {
      title: "Email",
      dataIndex: "",
      render: () => <p>johndoe@gmail.com</p>,
    },
    {
      title: "Score",
      dataIndex: "",
      render: () => <p>20</p>,
    },  
  ];

  const tabs = useMemo(
    () => [
      {
        key: "participants",
        column: participantColumns,
        label: (
          <div className="flex items-center gap-3">
            <p>Participants</p>
            <Tag className="!bg-lit !border-0">1</Tag>
          </div>
        ),
      },
      {
        key: "questions",
        label: (
          <div className="flex items-center gap-3">
            <p>Questions</p>
            <Tag className="!bg-lit !border-0">1</Tag>
          </div>
        ),
      },
    ],
    []
  );

  const column = useMemo(
    () => tabs.find((d) => isEqual(d.key, activeTab))?.column,
    [activeTab, tabs]
  );
  return (
    <div className="w-full h-full md:py-5 space-y-5">
      <div className="flex justify-between items-center px-5 md:px-10">
        <p className="text-3xl font-bold text-secondary cursor-pointer">
          Quiz 01
        </p>
        <Button
          onClick={onInvOpen}
          className="bg-primary !rounded-2xl"
          type="primary"
          size="large"
          icon={<FaPlus />}
        >
          Invite Member
        </Button>
      </div>

      <div className="w-full">
        <div className="flex justify-between items-center px-5 md:px-10">
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
        <div>
          <CustomTable column={column} pagination={false} />
        </div>
      </div>

      {/* invite modal >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
      <InviteModal
        isOpen={isInvite}
        onClose={onInvClose}
      />
    </div>
  )
}

export default QuizSection