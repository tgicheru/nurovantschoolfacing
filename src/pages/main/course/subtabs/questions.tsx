import React from 'react'
import { BorderHOC } from '../../../../components'
import { Collapse } from 'antd'

function QuizQuestionsTab({ data }: { data: any }) {
  return (
    <div className='w-full'>
      <div className='w-full flex justify-between gap-5'>
        <div className="w-full md:w-[300px] space-y-3">
          <BorderHOC className="!rounded-xl" childClass='!rounded-xl'>
            <div className="w-full p-5 space-y-3">
              <p className='text-xl font-bold'>Key Topics</p>
              <ul className="list-disc pl-6 space-y-2">
                {data?.quiz_topics?.map((d: any, b: any) => {
                  return (<li key={b}>{d}</li>)
                })}
              </ul>
            </div>
          </BorderHOC>
        </div>
        
        <div className='w-full'>
          <BorderHOC className="!rounded-xl" childClass='!rounded-xl'>
            <Collapse
              bordered={false}
              expandIconPosition='end'
              items={[...(data?.mcq || []), ...(data?.oeq || [])]?.map((d: any, idx: number) => ({ key: d?.id,
                label: <p className='text-base font-normal text-[#1B1B1B]'>{idx + 1} : {d?.question}</p>,
                children: <div className='space-y-2'>
                  <p>Options</p>
                  <ol className='px-5 list-decimal'>
                    {d?.options?.map((o: string) => <li>{o}</li>)}
                  </ol>
                  <p>Answer: {d?.answer}</p>
                </div>
              }))}
            />
          </BorderHOC>
        </div>
      </div>
    </div>
  )
}

export default QuizQuestionsTab