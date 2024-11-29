import { Button, Drawer, Form, Input, Spin, Tag } from 'antd';
import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import CustomTable from '../../../components/CustomTable';
import VideoRecordIcon from '../../../assets/icons/videorecordicon';
import Dragger from 'antd/es/upload/Dragger';
import { ImSpinner } from 'react-icons/im';
import { LuUploadCloud } from 'react-icons/lu';
import { useAWSUploadALS } from '../../../hooks/otherhooks';
import { handleObj, isEqual, statusType } from '../../../context/utils';
import { useGetAllAdaptiveLearning, usePostAdaptiveLearning } from '../../../hooks/adaptivelearning/adaptivelearning';
import moment from 'moment';
import { useSearchParams } from 'react-router-dom';
import DetailsSection from './sections/details';

function AdaptiveLearning() {
  const [isOpen, setIsOpen] = useState(false)
  const [payload, setPayload] = useState<any>({})
  const [params, setParams] = useSearchParams()
  const onClose = () => setIsOpen(false) 
  const onOpen = () => setIsOpen(true) 
  const [form] = Form.useForm()
  const id = params.get("id")

  const props = (onChange: any) => ({
    name: "file",
    multiple: false,
    directory: false,
    method: undefined,
    showUploadList: false,
    onChange: ({ file }: { file: Blob | any }) => onChange(file?.originFileObj),
  })

  const {
    data: getALsData,
    isLoading: getALsLoad,
  } = useGetAllAdaptiveLearning()

  const {
    isLoading: postALLoading,
    mutateAsync: postALAction,
  } = usePostAdaptiveLearning()

  const {
    isLoading: postUplLoad,
    mutateAsync: postUplAction,
  } = useAWSUploadALS()

  const handleUpload = async (file: any, key: any) => await postUplAction(file).then((res: any) => setPayload({...payload, [key]: res?.Location}))

  const handleSubmit = async (data: any) => await postALAction(handleObj({...data, ...payload})).then(() => {
    form.resetFields()
    setPayload({})
    onClose()
  })

  const column = [
    {
      title: "Lecture Title",
      render: (d: any) => {
        const handleView = () => setParams({id: d?._id})
        const isCreated = isEqual(d?.lecture_status?.toLowerCase(), "created")
        return <Button disabled={!isCreated} onClick={handleView} className="text-primary" type="text">{d?.lecture_title}</Button>
      }
    },
    {
      title: "Status",
      dataIndex: "lecture_status",
      render: (d: any) => {
        const status = statusType?.[d?.toLowerCase() as keyof typeof statusType]
        return <Tag className={`${status?.col} ${status?.bg} rounded-xl text-sm font-medium p-1 px-5 border-0`}>{d}</Tag>
      }
    },
    {
      title: "Creation Date",
      dataIndex: "createdAt",
      render: (d: any) => moment(d).format("LL")
    }
  ]

  const actionLoad = (postALLoading)
  if (id) return <DetailsSection />
  return (
    <Spin spinning={getALsLoad}>
      <div className="w-full h-full min-h-screen md:pb-5 space-y-5 my-6 font-montserrat">
        <div className="px-5 md:px-10 flex justify-end items-center">
          <Button
            size="large"
            type="primary"
            onClick={onOpen}
            className="bg-primary !rounded-2xl"
            icon={<FaPlus />}
          >Create</Button>
        </div>

        <div
          hidden={!getALsData?.data?.length}
          className="w-full space-y-5 px-4 md:px-10 bg-white"
        >
          <div className="pb-[50px] md:pb-0">
            <CustomTable
              column={column}
              pagination={false}
              data={getALsData?.data}
            />
          </div>
        </div>

        <div hidden={getALsData?.data?.length}>
          <div className="h-full flex flex-col justify-center items-center bg-white rounded-[16px] pb-7 px-5 md:px-10 ">
            <VideoRecordIcon bg="#4970FC" color="#fff" />
            <p className="text-[40px] font-semibold text-secondary mb-5">Adaptive Learning System</p>
            <Button
              size="large"
              type="primary"
              onClick={onOpen}
              className="bg-primary !px-20 !rounded-2xl"
            >Create</Button>
          </div>
        </div>

        <Drawer
          open={isOpen}
          onClose={onClose}
          title="Create A New ALS Lecture"
        >
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item name="lecture_title" label="Lecture Title">
              <Input size="large" placeholder="Enter title" />
            </Form.Item>
            <Form.Item label="Upload Lecture Material">
              <Dragger {...props((file: any) => {handleUpload(file, "lecture_material")})} disabled={postUplLoad}>
                <p className="ant-upload-drag-icon">
                  {postUplLoad ? <ImSpinner className="!text-2xl mx-auto !animate-spin" /> : <LuUploadCloud className="!text-2xl mx-auto" />}
                </p>
                <p hidden={!payload?.lecture_material} className="ant-upload-text px-5">Document Uploaded.</p>
                <p hidden={payload?.lecture_material} className="ant-upload-text px-5">Upload the document containing your lecture material.</p>
                <p hidden={payload?.lecture_material} className="ant-upload-hint px-5">File size no more than 10MB.</p>
              </Dragger>
            </Form.Item>
            <Form.Item label="Upload Lecture TextBook">
              <Dragger {...props((file: any) => {handleUpload(file, "lecture_textbook")})} disabled={postUplLoad}>
                <p className="ant-upload-drag-icon">
                  {postUplLoad ? <ImSpinner className="!text-2xl mx-auto !animate-spin" /> : <LuUploadCloud className="!text-2xl mx-auto" />}
                </p>
                <p hidden={!payload?.lecture_textbook} className="ant-upload-text px-5">Document Uploaded.</p>
                <p hidden={payload?.lecture_textbook} className="ant-upload-text px-5">Upload the document containing your lecture textbook.</p>
                <p hidden={payload?.lecture_textbook} className="ant-upload-hint px-5">File size no more than 10MB.</p>
              </Dragger>
            </Form.Item>
            <Button loading={actionLoad} className="bg-[#4970FC]" block size="large" type="primary" htmlType="submit" shape="round">Create ALS Lecture</Button>
          </Form>
        </Drawer>
      </div>
    </Spin>
  )
}

export default AdaptiveLearning