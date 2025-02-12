import React from 'react'
import { Breadcrumb, Button, Tabs } from 'antd'
import { BorderHOC } from '../../../../components'
import { useGetSpeechRate } from '../../../../hooks/speechrate/speechrate'

type Props = {
  id?: string
}
function DetailsSection({
  id,
}: Props) {

  const {
    data: getSpeechRateData,
    isLoading: getSpeechRateLoad,
  } = useGetSpeechRate({ id })
  return (
    <div className='w-full space-y-5'>
      <Breadcrumb
        items={[
          { title: 'Speech Rate', href: "/speech-rate" },
          { title: (getSpeechRateData?.data?.name || 'Speech Rate Speakers') },
        ]}
        separator="/"
      />

      <p className='text-2xl font-bold text-[#161617]'>{getSpeechRateData?.data?.name || "Speech Rate Speakers"}</p>

      <BorderHOC loading={getSpeechRateLoad} rounded='rounded-xl' className='w-full h-full' childClass='w-full h-full p-5'>
        <Tabs
          items={getSpeechRateData?.data?.speakers?.map((d: any) => ({
            key: "speech-rate-".concat(d?.speaker),
            label: "Speech Rates (".concat(d?.speaker?.replaceAll("_", " "), ")"),
            children: (<div className='w-full h-full space-y-2'>
              <BorderHOC rounded='rounded-xl' childClass='px-5 py-2 flex flex-col md:flex-row justify-between items-center gap-5'>
                <div className='grid grid-cols-2 gap-5 md:gap-10'>
                  <div className='space-y-1'>
                    <p className='text-xs font-medium text-[#57585A]'>Name</p>
                    <p className='text-sm font-bold text-[#161617] capitalize'>{d?.speaker?.replaceAll("_", " ")}</p>
                  </div>
                  <div className='space-y-1'>
                    <p className='text-xs font-medium text-[#57585A]'>Time</p>
                    <p className='text-sm font-bold text-[#161617]'>{d?.munites}</p>
                  </div>
                </div>
                <div className='flex justify-end items-center gap-5'>
                  <p className='text-2xl font-bold text-[#161617]'>{d?.percentage}%</p>
                  <Button hidden type='text'>Preview</Button>
                </div>
              </BorderHOC>
            </div>)
          }))}
        />
      </BorderHOC>
    </div>
  )
}

export default DetailsSection