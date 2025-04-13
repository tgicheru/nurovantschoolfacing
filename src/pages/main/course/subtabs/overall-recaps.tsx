import React from 'react'

function OverallRecapTab({ data }: { data: any }) {
  return (
    <div className='w-full space-y-3'>
      <p className='text-base font-semibold text-dark'>{data?.title}</p>
      <p className='text-sm font-medium text-[#57585A]' dangerouslySetInnerHTML={{__html: data?.body}} />
    </div>
  )
}

export default OverallRecapTab