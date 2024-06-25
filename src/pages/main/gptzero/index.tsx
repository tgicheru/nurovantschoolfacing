import { Button, Form, Input, Modal, Spin } from "antd";
import React, { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useGetGptZeros, usePostGptZero } from "../../../hooks/gptzero/gptzero";
import { BsJournalText } from "react-icons/bs";
import moment from "moment";

function GptZeroPage() {
  const [selected, setSelected] = useState<any>({})
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const onOpen = () => setIsOpen(true)
  const [query, setQuery] = useState({
    search: ""
  })

  const isSelected = Object.values(selected)?.some(d => d)

  const {
    data: getGptsData,
    refetch: getGptsFetch,
    isFetching: getGptsLoad,
  } = useGetGptZeros()

  const handleSuccess = () => {
    getGptsFetch()
    onClose()
  }

  const {
    mutate: postGptAction,
    isLoading: postGptLoad,
  } = usePostGptZero(handleSuccess)

  const getData = useMemo(() => {
    const data = (getGptsData?.data || [])
    if(!query) return (getGptsData?.data || [])
    return data?.filter((d: any) => d?.title?.toLowerCase()?.includes(query?.search?.toLowerCase()))
  }, [getGptsData, query])

  const selectKeys = ["burstiness", "label", "perplexity", "perplexity_per_line"]

  return (
    <Spin spinning={getGptsLoad}>
      <div className="w-full p-5 md:px-10 space-y-5">
        <div className="flex justify-between items-center">
          <div />
          <Button loading={postGptLoad} onClick={onOpen} className="bg-[#4970FC]" size="large" type="primary" shape="round">Upload</Button>
        </div>
        <div className="w-full flex flex-col md:flex-row justify-between gap-5">
          <div className="w-full md:w-[25%]">
            <div className="w-full bg-white p-5 md:py-10 rounded-lg space-y-5">
              <p className="text-lg font-semibold text-[#414141]">Uploaded Documents</p>
              <Form onFinish={setQuery}>
                <Form.Item name="search">
                  <Input placeholder="Search your files here" size="large" prefix={<Button htmlType="submit" type="text" icon={<FiSearch />} />} />
                </Form.Item>
              </Form>
              <div hidden={!getGptsData?.data?.length} className="space-y-2">
                {getData?.map((d: any) => {
                  const handleSelect = () => setSelected(d)
                  return (
                    <div onClick={handleSelect} className="w-full flex items-center gap-2 whitespace-nowrap truncate cursor-pointer">
                      <BsJournalText className="!text-sm !font-medium !text-[#676767]" />
                      <p className="text-sm font-medium text-[#676767]">{d?.title}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="w-full md:w-[75%] min-h-[80vh] bg-white px-5 rounded-lg grid grid-cols-1 md:grid-cols-3 md:divide-x divide-[#EFEFEF]">
            <div className="md:col-span-2 p-5 md:py-10">
              {isSelected ? (
                <div className="space-y-2">
                  <p className="text-xl font-semibold text-[#414141]">{selected?.title}</p>
                  <p className="text-xs font-normal text-[#414141]">Created at <b>{moment(selected?.createdAt).format("LLLL")}</b></p>
                  <p className="text-sm font-medium text-[#414141] my-5" dangerouslySetInnerHTML={{__html: selected?.text}} />
                </div>
              ) : (
                <div className="w-full h-full flex flex-col justify-center items-center space-y-5">
                  <p className="text-sm font-medium text-[#1B2124]">Paste or upload text in English to get started</p>
                  <Button loading={postGptLoad} onClick={onOpen} className="bg-[#4970FC]" size="large" type="primary" shape="round">Upload Document</Button>
                </div>
              )}
            </div>

            <div className="text-center p-5 md:py-10 space-y-3">
              <p className="text-[48px] font-bold text-[#414141]">{selectKeys?.reduce((a, b) => a + Number(selected?.[b] || 0), 0)?.toFixed(2)}%</p>
              <p className="text-sm font-medium text-[#676767]">of text likely to be AI generated</p>
              <ol className="!list-disc space-y-3">
                {selectKeys?.map(d => (
                  <li className="!list-disc text-sm font-medium text-[#676767] flex justify-between items-center capitalize">
                    <span>{d?.replaceAll("_", " ")}</span>
                    <span>{Number(selected?.[d] || 0)?.toFixed(2) || "--"} %</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <Modal
          open={isOpen}
          footer={false}
          onCancel={onClose}
          title="Paste Text Document"
        >
          <Form onFinish={postGptAction} layout="vertical">
            <Form.Item label="Title" name="title">
              <Input placeholder="Enter document title" size="large" />
            </Form.Item>
            <Form.Item label="Text" name="text">
              <Input.TextArea rows={5} placeholder="Enter document text to analyze" size="large" />
            </Form.Item>
            <Button loading={postGptLoad} className="bg-[#4970FC]" size="large" type="primary" htmlType="submit" shape="round" block>Submit</Button>
          </Form>
        </Modal>
      </div>
    </Spin>
  );
}

export default GptZeroPage;
