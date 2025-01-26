import React, { useState } from 'react'
import { BorderHOC } from '../../../../components'
import { isEqual } from '../../../../context/utils'
import { AiOutlineDownCircle } from 'react-icons/ai'
import { Breadcrumb, Button, Card, Collapse, Input, Popconfirm, Radio, Tabs } from 'antd'
import { useDeleteQuestionBankQuestion, useDeleteQuestionBankVariant, useGetQuestionBank, usePostQuestionBankQuestion, usePostQuestionBankVariant, usePutQuestionBank } from '../../../../hooks/questionbank/questionbank'
import { LuTrash } from 'react-icons/lu'

type Props = {
  id: string | undefined
}
function DetailsSection({
  id
}: Props) {
  const [tab, setTab] = useState<any>(undefined)
  const [payload, setPayload] = useState<any>({})
  const isCreateVariant = payload?.isCreateVar
  const handlePayClear = (e?: any) => {e?.stopPropagation?.(); setPayload({})}
  const handleVarCreate = () => {
    setTab(!isCreateVariant ? "variant-new" : undefined)
    setPayload({ isCreateVar: !isCreateVariant })
  }

  const {
    data: getQuestBankData,
    refetch: getQuestBankFetch,
    isLoading: getQuestBankLoad,
  } = useGetQuestionBank({ id })

  const handleSuccess = () => {
    getQuestBankFetch()
    setTab(undefined)
    handlePayClear()
  }

  const {
    mutate: putQuestBankAction,
    isLoading: putQuestBankLoad,
  } = usePutQuestionBank(id, handleSuccess)

  const {
    mutate: postQuestBankVarAction,
    isLoading: postQuestBankVarLoad,
  } = usePostQuestionBankVariant(id!, handleSuccess)

  const {
    mutate: postQuestBankQuestAction,
    isLoading: postQuestBankQuestLoad,
  } = usePostQuestionBankQuestion(id!, handleSuccess)

  const {
    mutate: deleteQuestBankVarAction,
    isLoading: deleteQuestBankVarLoad,
  } = useDeleteQuestionBankVariant(handleSuccess)

  const {
    mutate: deleteQuestBankQuestAction,
    isLoading: deleteQuestBankQuestLoad,
  } = useDeleteQuestionBankQuestion(handleSuccess)

  return (
    <div className='w-full space-y-5'>
      <Breadcrumb
        items={[
          { title: 'Question Bank', href: "/question-bank" },
          { title: (getQuestBankData?.data?.title || 'Question Bank Questions') },
        ]}
        separator="/"
      />

      <div className='w-full'>
        <p className='text-2xl font-bold text-[#161617]'>{getQuestBankData?.data?.title || "Question Bank Questions"}</p>
        <p className='text-sm font-semibold text-[#57585A]'>Here are some multiple variants of questions generated.</p>
      </div>

      <BorderHOC loading={getQuestBankLoad} rounded='rounded-xl' className='w-full h-full' childClass='w-full h-full p-5'>
        <Tabs
          activeKey={tab}
          onChange={setTab}
          tabBarExtraContent={{right: <Button onClick={handleVarCreate} hidden={isCreateVariant} type='primary'>Add Variant</Button>}}
          items={[
            ...(isCreateVariant ? [{ variant_number: "new" }] : []),
            ...(getQuestBankData?.data?.question_variant || []),
          ]?.map((d: any) => {
            const isCreateVar = (isCreateVariant && !d?.questions?.length)
            const answer = Object.entries(payload?.answer || {})?.[0]?.[0]
            const handleCreateVariant = () => postQuestBankVarAction(payload)
            const handleType = (e: any) => setPayload({...payload, question: e?.target?.value})
            const isCreate = (isEqual(d?.variant_number, payload?.variant_number) && payload?.isCreate)
            const handleSubmit = () => postQuestBankQuestAction({...payload, answer: {[answer]: payload?.options?.[answer]?.[1]}})
            const handleAns = ({target:{value}}: any) => setPayload({...payload, answer: {[value]: payload?.options?.[value]?.[1]}})
            const handleCreate = () => (isCreate ? handlePayClear() : setPayload({ variant_number: d?.variant_number, isCreate: true }))
            const handleDelVar = () => (isCreateVar ? handleVarCreate() : deleteQuestBankVarAction({ id, variant_number: d?.variant_number }))
            return {
              key: "variant-".concat(String(d?.variant_number)),
              label: <div className='flex items-center gap-3'>
                <p>Variant {d?.variant_number}</p>
                <Popconfirm title="Are you sure to delete variant?" onConfirm={handleDelVar}>
                  <Button loading={deleteQuestBankVarLoad} type='text' size='small' icon={<LuTrash className='!text-base' />} />
                </Popconfirm>
              </div>,
              children: (<BorderHOC rounded='rounded-xl' className='w-full h-full' childClass='space-y-5 p-5'>
                <div className='w-full space-y-2'>
                  <div className='w-full flex items-center gap-3'>
                    <p className='text-base font-bold text-[#57585A] whitespace-nowrap'>Main Question: {d?.main_question}</p>
                    <Input onChange={({target:{value:question}}) => setPayload({...payload, question})} hidden={!isCreateVar} placeholder='Enter main question' className='w-full' />
                    <Button onClick={handleCreateVariant} loading={postQuestBankVarLoad} hidden={!isCreateVar} type='primary'>Save</Button>
                    <Button onClick={handleVarCreate} loading={postQuestBankVarLoad} hidden={!isCreateVar}>Cancel</Button>
                  </div>
                  <div hidden={isCreateVar} className='w-full'>
                    <div className='w-full flex justify-between items-center gap-5'>
                      <p className='w-full text-xl font-bold text-[#161617]'>Questions:</p>
                      <Button onClick={handleCreate} type='primary' hidden={isCreate}>Add Question</Button>
                    </div>
                  </div>
                </div>

                <Card
                  hidden={!isCreate}
                  extra={<div className='flex items-center gap-5'>
                    <Button onClick={handleSubmit} loading={postQuestBankQuestLoad} type='primary'>Save</Button>
                    <Button onClick={handleCreate} loading={postQuestBankQuestLoad}>Cancel</Button>
                  </div>}
                  title={<Input value={payload?.question} onChange={handleType} size='small' placeholder='Enter question' className='w-full' bordered={false} />}
                >
                  <div className='space-y-3'>
                    <div className='space-y-2'>
                      <p className='text-sm font-bold text-[#161617]'>Options:</p>
                      <Radio.Group value={answer} onChange={handleAns} className='w-full text-sm font-normal text-[#161617] space-y-1'>
                        {Object.entries({
                          a: ["a", payload?.options?.["a"]?.[1]],
                          b: ["b", payload?.options?.["b"]?.[1]],
                          c: ["c", payload?.options?.["c"]?.[1]],
                          d: ["d", payload?.options?.["d"]?.[1]],
                        }).map(([k, v]) => {
                          const value = payload?.options?.[k]?.[1]
                          const handleOptType = (e: any) => setPayload({
                            ...payload,
                            options: {
                              ...payload?.options,
                              [k]: [k, e?.target?.value || value]
                            }
                          })
                          return (
                            <div className='!w-full flex gap-3'>
                              <Input prefix={k} value={value} onChange={handleOptType} size='small' placeholder='Enter option' className='w-full' />
                              <Radio value={k}>Answer</Radio>
                            </div>
                        )})}
                      </Radio.Group>
                    </div>

                    <div className='space-y-2'>
                      <p className='text-sm font-bold text-[#161617]'>Answer:</p>
                      {Object.entries(payload?.answer || {})?.map(([k, v]) => (
                        <p className='text-sm font-normal text-[#161617]'>{k?.concat(". ", String(payload?.options?.[k]?.[1]))}</p>
                      ))}
                    </div>
                  </div>
                </Card>

                {d?.questions?.map((b: any) => {
                  const isEdit = isEqual(payload?.isEdit, b?.id)
                  const value = b?.question?.question || b?.question
                  const isObj = isEqual(typeof b?.question, "object")
                  const handleProp = (e: any) => e?.stopPropagation?.() 
                  const handleOpen = (e?: any) => { handleProp(e)
                    setPayload({ id: b?.id,
                      variant_number: String(d?.variant_number),
                      ...(isObj ? b?.question : b),
                      question_id: b?.id,
                      isEdit: false,
                    })
                  }
                  const handleClose = (e: any) => {handleProp(e); handlePayClear()}
                  const handleSubmit = (e: any) => {handleProp(e); putQuestBankAction(payload)}
                  const handleEdit = (e: any) => {handleProp(e); setPayload({...payload, isEdit: b?.id})}
                  const handleCancel = (e: any) => {handleProp(e); setPayload({...payload, isEdit: false})}
                  const handleType = (e: any) => {handleProp(e); setPayload({...payload, question: e?.target?.value})}
                  const handleDelQuest = (e: any) => {handleProp(e); deleteQuestBankQuestAction({ id, variant_number: d?.variant_number, question_id: b?.id })}
                  return (
                    <Collapse
                      accordion
                      size='small'
                      onChange={handleOpen}
                      expandIconPosition='right'
                      key={"variant-".concat(d?.variant_number, "question-", b?.id)}
                      activeKey={"variant-".concat(payload?.variant_number, "question-", payload?.id)}
                      defaultActiveKey={"variant-".concat(payload?.variant_number, "question-", payload?.id)}
                      expandIcon={({ isActive }) => <div className='w-full h-full flex items-center gap-1'>
                        <Button onClick={handleEdit} hidden={!isActive || isEdit} type='text'>Edit</Button>
                        <Button onClick={handleSubmit} hidden={!isEdit} loading={putQuestBankLoad} type='text'>Save</Button>
                        <Button onClick={handleCancel} hidden={!isEdit} loading={putQuestBankLoad} type='text' danger>Cancel</Button>
                        <Popconfirm title="Are you sure?" onConfirm={handleDelQuest}>
                          <Button hidden={!isActive || isEdit} loading={deleteQuestBankQuestLoad} type='text' danger>Delete</Button>
                        </Popconfirm>
                        <AiOutlineDownCircle className={'!text-xl '.concat(isActive ? "rotate-180" : "")} onClick={(e) => (isActive ? handleClose(e) : handleOpen(e))} />
                      </div>}
                      items={[{
                        key: "variant-".concat(d?.variant_number, "question-", b?.id),
                        label: (<div className='!w-full' onClick={handleProp}>
                          <p hidden={isEdit} className='text-sm font-semibold text-[#161617]'>{b?.id + 1}. {value}</p>
                          <Input hidden={!isEdit} value={payload?.question} onChange={handleType} size='small' placeholder='Enter question' className='w-full' bordered={false} />
                        </div>),
                        children: (<div className='space-y-3'>
                          <div className='space-y-2'>
                            <p className='text-sm font-bold text-[#161617]'>Options:</p>
                            <ul className='text-sm font-normal text-[#161617] space-y-1'>
                              {Object.entries(b?.question?.options || b?.options || {}).map(([k, v]) => {
                                const value = payload?.options?.[k]?.[1]
                                const handleOptType = (e: any) => setPayload({
                                  ...payload,
                                  options: {
                                    ...payload?.options,
                                    [k]: [k, e?.target?.value || value]
                                  }})
                                return (
                                  <div className='!w-full'>
                                    <li hidden={isEdit}>{k}. {v?.[1 as keyof typeof v]}</li>
                                    <Input hidden={!isEdit} prefix={k} value={value} onChange={handleOptType} size='small' placeholder='Enter option' className='w-full' />
                                  </div>
                              )})}
                            </ul>
                          </div>

                          <div className='space-y-2'>
                            <p className='text-sm font-bold text-[#161617]'>Answer:</p>
                            {Object.entries(b?.question?.answer || b?.answer || {})?.map(([k, v]) => {
                              const value = payload?.answer?.[k]
                              const handleAnsType = (e: any) => setPayload({
                                ...payload,
                                answer: {[k]: e?.target?.value || value}
                              })
                              return (
                                <div className='!w-full'>
                                  <p hidden={isEdit} className='text-sm font-normal text-[#161617]'>{k?.concat(". ", String(v))}</p>
                                  <Input hidden={!isEdit} prefix={k} value={value} onChange={handleAnsType} size='small' placeholder='Enter answer' className='w-full' />
                                </div>
                              )
                            })}
                          </div>
                        </div>),
                      }]}
                    />
                  )
                })}
              </BorderHOC>)
          }})}
        />
      </BorderHOC>
    </div>
  )
}

export default DetailsSection