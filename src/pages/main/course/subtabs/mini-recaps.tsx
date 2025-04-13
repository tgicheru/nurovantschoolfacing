import React from 'react'

function MiniRecapTab({ data }: { data: any }) {
  return (
    <div className='w-full space-y-5'>
      {(data || []).map((d: any) => (
        <div className='w-full space-y-3'>
          <p className='text-base font-semibold text-dark'>{d?.title}</p>
          <p className='text-sm font-medium text-[#57585A]' dangerouslySetInnerHTML={{__html: d?.body}} />
        </div>
      ))}
    </div>
  )
}

export default MiniRecapTab