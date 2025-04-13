import { Button, Select, Table } from 'antd';
import React from 'react'
import { useSearchParams } from 'react-router-dom';

function ActivitiesTab({ data }: { data: any }) {
  const [params, setParams] = useSearchParams()
  const lecture = params.get("lecture")
  const id = params.get("id")

  const handleFeedback = () => setParams({id, lecture, section: "continuous-feedback"} as any)

  const items = [
    { value: "1", label: "Project-Based Learning" },
    { value: "2", label: "Traditional Learning" },
    { value: "3", label: "Blended Learning" },
  ]

  const columns = [
    { title: "Activity", render: (d: any) => (<a href={d?.link} className="text-blue-500 hover:text-blue-600">{d?.activity}</a>)},
    { title: "Duration (mins)", dataIndex: "duration" },
    { title: "Short Description", dataIndex: "short_description" },
  ]
  return (
    <div className='w-full space-y-5'>
      <div className="flex justify-between items-center mb-4">
        <Select size='large' placeholder="Project Based Learning" options={items} />
        <Button type="primary" size='large' onClick={handleFeedback}>Continuous Feedback Loop</Button>
      </div>
      <Table columns={columns} dataSource={data?.lesson_plan?.activities} pagination={false} />
    </div>
  )
}

export default ActivitiesTab