import { Button, Dropdown, Table } from 'antd'
import React from 'react'
import { handleCapitalize, isEqual } from '../../../../context/utils'
import { FaAngleDown } from 'react-icons/fa'

function ScoringGuideTab({ data }: { data: any }) {
  const scores = Object.entries(data?.scoring_guide || {})?.filter(([k]) => !isEqual(k, "_id"))
  const columns = [
    { title: "Criteria", dataIndex: "title", render: (d: any) => <p className='capitalize'>{d?.replaceAll("_", " ")}</p> },
    { title: "Points", render: () => <div className='flex items-center gap-5'>{scores.map(([k, v]) => <p className='text-xs capitalize'>{k?.replaceAll("_", " ")} : {String(v)} ,</p>)}</div> },
    { title: "Student Responses May Include", dataIndex: "criteria_grade_breakdown", render: (d: any) => {
      const criteria = Object.entries(d || [])?.filter(([k]) => !isEqual(k, "_id"))
      return <Dropdown menu={{items: criteria.map(([key, val]) => ({key, label: <p>{handleCapitalize(key?.replaceAll("_", " "))}: {String(val)}</p>}))}}>
        <Button icon={<FaAngleDown />} type='text'>Criteria Grade Breakdown</Button>
      </Dropdown>
    }},
  ]
  return (
    <div className='w-full space-y-5'>
      <p className='text-xl font-bold text-primary'>Overall Scoring Guide</p>
      <Table columns={columns} dataSource={data?.criteria} pagination={false} />
    </div>
  )
}

export default ScoringGuideTab