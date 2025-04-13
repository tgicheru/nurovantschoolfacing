import React from 'react'

function TeachersNoteTab({ data }: { data: any }) {
  return (
    <div className='w-full space-y-5'>
      <p className='text-xl font-bold text-primary'>Note For You</p>
      <ul className="list-disc pl-5 space-y-2">
        {data?.map((d: any, i: number) => (<li key={i}>{d}</li>))}
      </ul>
    </div>
  )
}

export default TeachersNoteTab