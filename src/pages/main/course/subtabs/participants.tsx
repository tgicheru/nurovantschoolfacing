import React from 'react'
import CustomTable from '../../../../components/CustomTable'
import moment from 'moment'
import { formatNumber, statusType } from '../../../../context/utils'
import { Button, Tag } from 'antd'
import { LuEye } from 'react-icons/lu'
import { useGetQuizParticipants } from '../../../../hooks/quiz/quiz'

function QuizParticipantsTab({ data }: { data: any }) {
  const {
    data: getQuizParticipantsData,
    isLoading: getQuizParticipantsLoad,
  } = useGetQuizParticipants(data?._id)

    const column  = [
    {
      title: "Name",
      dataIndex: "user",
      render: (d: any) => d?.name || "NIL",
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
      title: "Score",
      render: (d: any) => formatNumber(d?.score)?.concat(" / ", d?.result?.length),
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
        const handleView = () => {}
        return <Button onClick={handleView} icon={<LuEye />}>Preview</Button>
      }
    }
  ]
  return (
    <div className='w-full'>
      <CustomTable
        column={column}
        pagination={false}
        loading={getQuizParticipantsLoad}
        data={getQuizParticipantsData?.data || []}
      />
    </div>
  )
}

export default QuizParticipantsTab