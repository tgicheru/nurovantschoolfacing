import { Button, Drawer, Form, Input, Select, Spin, UploadProps } from "antd";
import Dragger from "antd/es/upload/Dragger";
import React, { useState } from "react";
import { LuUploadCloud } from "react-icons/lu";
import { useGetQuestionBanks } from "../../../hooks/questionbank/questionbank";
import CustomTable from "../../../components/CustomTable";
import moment from "moment";

function QuestionBankPage() {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const onOpen = () => setIsOpen(true)

  const {
    data: getQBankData,
    isFetching: getQBankLoad,
  } = useGetQuestionBanks()

  const columns = [
    {
      title: "Name",
      render: (d: any) => <Button>{}</Button>
    },
    {
      title: "Variants",
      datIndex: "variants",
    },
    {
      title: "Date Generated",
      datIndex: "variants",
      render: (d: any) => moment().format("L")
    },
  ]

  const props = (onChange: any) => ({
    name: 'file',
    multiple: true,
    onChange({file}: any) {
      onChange?.(file)
    },
  })

  const DropComponent = ({ onChange }:{onChange: any}) => (
    <Dragger {...props(onChange)}>
      <p className="ant-upload-drag-icon">
        <LuUploadCloud className="!text-2xl mx-auto" />
      </p>
      <p className="ant-upload-text px-5">Upload the document containing your source material.</p>
      <p className="ant-upload-hint px-5">File size no more than 10MB</p>
    </Dragger>
  )
  return (
    <Spin spinning={getQBankLoad}>
      <div className="w-full p-5 md:px-10 space-y-5">
        <div className="flex justify-between items-center">
          <div />
          <Button onClick={onOpen} className="bg-[#4970FC]" size="large" type="primary" shape="round">Generate Question</Button>
        </div>
        <div className="w-full p-5 md:p-10 bg-white rounded-lg">
          <p className="text-lg font-semibold text-[#414141]">Streamline Lesson Planning with Automated Question Generation</p>
          <div className="min-h-[50vh] flex flex-col justify-center items-center gap-5" hidden={getQBankData?.data?.length}>
            <p className="text-sm font-medium text-[#1B2124]">Your generated questions would appear here</p>
            <Button onClick={onOpen} className="bg-[#4970FC]" size="large" type="primary" shape="round">Generate Question</Button>
          </div>
          <CustomTable
            column={columns}
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
          <Form layout="vertical">
            <Form.Item label="Title">
              <Input size="large" placeholder="Enter title" />
            </Form.Item>
            <Form.Item label="Variants">
              <Select size="large" placeholder="Select Variants">

              </Select>
            </Form.Item>
            <Form.Item label="Upload Source Material">
              <DropComponent onChange={() => {}} />
            </Form.Item>
            <Form.Item label="Upload List of Questions">
              <DropComponent onChange={() => {}} />
            </Form.Item>
            <Button className="bg-[#4970FC]" block size="large" type="primary" htmlType="submit" shape="round">Generate Question</Button>
          </Form>
        </Drawer>
      </div>
    </Spin>
  );
}

export default QuestionBankPage;
