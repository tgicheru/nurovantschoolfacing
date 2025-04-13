import React from 'react'

function TranscriptionTab({ data }: { data: any }) {
  return (
    <div className='w-full space-y-5'>
      <div className='w-full space-y-3'>
        <p className='text-base font-semibold text-dark'>{data?.title}</p>
        <p className='text-sm font-medium text-[#57585A]' dangerouslySetInnerHTML={{__html: data?.body}} />
      </div>

      <p className='text-base font-semibold text-dark'>Key Points</p>

      <ul className='w-full list-disc px-5'>
        {(data?.key_points || []).map((d: any) => (
          <li>{d}</li>
        ))}
      </ul>
    </div>
  )
}

export default TranscriptionTab