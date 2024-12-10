import { Button, Drawer, Form, Input, Select, Spin } from "antd";
import Dragger from "antd/es/upload/Dragger";
import React, { useState } from "react";
import { LuUploadCloud } from "react-icons/lu";
import { useGetQuestionBanks, usePostQuestionBank } from "../../../hooks/questionbank/questionbank";
import CustomTable from "../../../components/CustomTable";
import moment from "moment";
import { useAWSUpload } from "../../../hooks/otherhooks";
import { useSearchParams } from "react-router-dom";
import DetailsSection from "./sections/details-old";
import { handleObj } from "../../../context/utils";
import { ImSpinner } from "react-icons/im";

function QuestionBankPage() {
  const [params, setParams] = useSearchParams()
  const [payload, setPayload] = useState<any>({
    // question_source: "https://nurovantfrontend.s3.amazonaws.com/McGraw-Hill-PhysicsDemystified.pdf",
    // user_content: "https://nurovantfrontend.s3.amazonaws.com/test.txt",
  })
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const onOpen = () => setIsOpen(true)
  const [form] = Form.useForm()
  const id = params.get("id")


  const {
    data: getQBankData,
    refetch: getQBankFetch,
    isLoading: getQBankLoad,
  } = useGetQuestionBanks()

  const columns = [
    {
      title: "Name",
      render: (d: any) => {
        const handleView = () => setParams({id: d?._id})
        return <Button onClick={handleView} className="text-primary" type="text">{d?.title}</Button>
      }
    },
    {
      title: "Variants",
      dataIndex: "number_of_question",
    },
    {
      title: "Date Generated",
      datIndex: "createdAt",
      render: (d: any) => moment(d).format("L")
    },
  ]

  const props = (onChange: any) => ({
    name: "file",
    multiple: false,
    directory: false,
    method: undefined,
    showUploadList: false,
    onChange: ({ file }: { file: Blob | any }) => onChange(file?.originFileObj),
  })

  const {
    isLoading: postUplLoad,
    mutateAsync: postUplAction,
  } = useAWSUpload()

  const handleUpload = async (file: any, key: any) => await postUplAction(file).then((res: any) => setPayload({...payload, [key]: res?.Location}))

  const {
    mutateAsync: postQBankAction,
    isLoading: postQBankLoad,
  } = usePostQuestionBank(getQBankFetch)

  const handleSubmit = async (data: any) => await postQBankAction(handleObj({...data, ...payload})).then(() => {
    form.resetFields()
    setPayload({})
    onClose()
  })

  const actionLoad = (postUplLoad || postQBankLoad)

  if(id) return <DetailsSection />
  return (
    <Spin spinning={getQBankLoad}>
      <div className="w-full p-5 md:px-10 space-y-5">
        <div className="flex justify-between items-center">
          <div />
          <Button onClick={onOpen} className="bg-[#4970FC]" size="large" type="primary" shape="round">Generate Question</Button>
        </div>
        <div className="w-full p-5 md:p-10 bg-white rounded-lg space-y-5">
          <p className="text-lg font-semibold text-[#414141]">Streamline Lesson Planning with Automated Question Generation</p>
          <div hidden={getQBankData?.data?.length}>
            <div className="min-h-[50vh] flex flex-col justify-center items-center gap-5">
              <p className="text-sm font-medium text-[#1B2124]">Your generated questions would appear here</p>
              <Button onClick={onOpen} className="bg-[#4970FC]" size="large" type="primary" shape="round">Generate Question</Button>
            </div>
          </div>
          <CustomTable
            column={columns}
            data={getQBankData?.data}
            hidden={!getQBankData?.data?.length}
          />
        </div>

        <Drawer
          open={isOpen}
          onClose={onClose}
          title={<div className="">
            <p className="text-xl font-semibold text-[#414141]">Track Your Questions with Ease</p>
            <p className="text-base font-normal text-[#414141]">Organise and monitor classroom questions for effective teaching.</p>
          </div>}
        >
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item name="title" label="Title">
              <Input size="large" placeholder="Enter title" />
            </Form.Item>
            <Form.Item name="number_of_question" label="Variants">
              <Select size="large" placeholder="Select Variants">
                {Array.from(Array(10).keys()).map(d => {
                  const variant = ((d + 1) * 10)
                  return (<Select.Option value={variant}>{variant}</Select.Option>)
                })}
              </Select>
            </Form.Item>
            <Form.Item label="Upload Source Material">
              <Dragger {...props((file: any) => {handleUpload(file, "question_source")})} disabled={postUplLoad}>
                <p className="ant-upload-drag-icon">
                  {postUplLoad ? <ImSpinner className="!text-2xl mx-auto !animate-spin" /> : <LuUploadCloud className="!text-2xl mx-auto" />}
                </p>
                <p hidden={!payload?.question_source} className="ant-upload-text px-5">Document Uploaded.</p>
                <p hidden={payload?.question_source} className="ant-upload-text px-5">Upload the document containing your source material.</p>
                <p hidden={payload?.question_source} className="ant-upload-hint px-5">File size no more than 10MB</p>
              </Dragger>
            </Form.Item>
            <Form.Item label="Upload List of Questions">
              <Dragger {...props((file: any) => {handleUpload(file, "user_content")})} disabled={postUplLoad}>
                <p className="ant-upload-drag-icon">
                  {postUplLoad ? <ImSpinner className="!text-2xl mx-auto !animate-spin" /> : <LuUploadCloud className="!text-2xl mx-auto" />}
                </p>
                <p hidden={!payload?.user_content} className="ant-upload-text px-5">Document Uploaded.</p>
                <p hidden={payload?.user_content} className="ant-upload-text px-5">Upload the document with your list of questions.</p>
                <p hidden={payload?.user_content} className="ant-upload-hint px-5">It is recommended to upload files in the ".txt" format for improved output.</p>
              </Dragger>
            </Form.Item>
            <Button loading={actionLoad} className="bg-[#4970FC]" block size="large" type="primary" htmlType="submit" shape="round">Generate Question</Button>
          </Form>
        </Drawer>
      </div>
    </Spin>
  );
}

export default QuestionBankPage;
