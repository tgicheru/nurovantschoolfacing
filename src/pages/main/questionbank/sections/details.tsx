/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Collapse, Input, Spin, Tabs } from 'antd'
import React, { useMemo, useState } from 'react'
import { useGetQuestionBank, usePutQuestionBank } from '../../../../hooks/questionbank/questionbank'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FaArrowLeft, FaRegSave } from 'react-icons/fa'
import { TbEdit } from 'react-icons/tb'
import { AiTwotoneCloseCircle } from 'react-icons/ai'
import { isEqual } from '../../../../context/utils'

function DetailsSection() {
  const [payload, setPayload] = useState<any>({})
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const id = params.get("id")

  const goBack = () => navigate(-1)
  const handleClear = () => setPayload({})


  const {
    data: getQBankData,
    refetch: getQBankFetch,
    isLoading: getQBankLoad,
  } = useGetQuestionBank(id)

  const {
    mutate: putQBankAction,
    isLoading: putQBankLoad,
  } = usePutQuestionBank(id, getQBankFetch)

  const handleSubmit = () => putQBankAction({...payload, question_bank_id: id})

  const tabs = useMemo(() => getQBankData?.data?.question_variant?.map((d: any) => ({
    key: d?.variant_number,
    label: `Variant ${d?.variant_number}`,
    children: (<div className='space-y-5'>
      <p className='text-base font-normal text-[#010101]'>{d?.main_question}</p>
      {d?.questions?.map((b: any) => {
        const isEdit = (isEqual(payload?.variant_number, d?.variant_number) && isEqual(payload?.question_id, b?.id))
        const handleEdit = () => setPayload({
          variant_number: d?.variant_number,
          question: b?.question,
          question_id: b?.id,
        })
        return (<div className='flex justify-between items-center gap-5 p-3 border border-[#E6E9ED] rounded-lg'>
          <p hidden={isEdit} className='text-base font-normal text-[#010101]'>{b?.id+1}. {b?.question}</p>
          <Button hidden={isEdit} onClick={handleEdit} title='Edit Question' type='text' icon={<TbEdit className='text-xl' />} />
          <Input hidden={!isEdit} value={payload?.question} onChange={({target:{value:question}}) => setPayload({...payload, question})} size='large' placeholder='Enter question' className='w-full' bordered={false} />
          <Button hidden={!isEdit} loading={putQBankLoad} onClick={handleSubmit} title='Save Changes' type='text' icon={<FaRegSave className='text-xl' />} />
          <Button hidden={!isEdit} onClick={handleClear} title='Cancel' type='text' icon={<AiTwotoneCloseCircle className='text-xl' />} />
        </div>)
      })}
    </div>)
  })), [getQBankData, payload, putQBankLoad])

  return (
    <Spin spinning={getQBankLoad}>
      <div className="w-full p-5 md:px-10 space-y-5">
        <div className="w-full p-5 md:p-10 bg-white rounded-lg space-y-5">
          <div className='flex items-center gap-5'>
            <Button onClick={goBack} className='!p-0 !m-0 !bg-transparent' type='text' size='large' icon={<FaArrowLeft />} />
            <p className='text-xl font-semibold text-[#414141]'>{getQBankData?.data?.title}</p>
          </div>
          <p className='text-sm font-normal text-[#1B1B1B]'>Here are the multiple versions of questions generated</p>
          <Tabs items={tabs} />
        </div>
      </div>
    </Spin>
  )
}

export default DetailsSection