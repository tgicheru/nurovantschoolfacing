import React from 'react'

function LearningObjectiveTab({ data }: { data: any }) {
  return (
    <div className='w-full space-y-5'>
      <p className='text-xl font-bold text-primary'>By the end of this lesson, students will be able to</p>
      <ul className="list-disc pl-5 space-y-2">
        {data?.map((d: any, i: number) => (<li key={i}>{d}</li>))}
      </ul>
    </div>
  )
}

export default LearningObjectiveTab