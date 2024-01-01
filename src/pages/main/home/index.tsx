import moment from 'moment'
import React, { useMemo, useState } from 'react'
import { Button, Form, Input, Modal, Tabs, Tag, Upload, UploadProps } from 'antd'
import { FaPlus } from 'react-icons/fa6'
import { TbCards } from "react-icons/tb";
import { PiRepeatFill } from "react-icons/pi";
import { IoIosVideocam } from "react-icons/io";
import { LuUploadCloud } from 'react-icons/lu';
import { useSearchParams } from 'react-router-dom';
import VideoRecordIcon from '../../../assets/icons/videorecordicon'
import CustomPagination from '../../../components/CustomPagination';
import CustomTable from '../../../components/CustomTable';
import { ColumnsType } from 'antd/es/table';
import { BiTestTube } from 'react-icons/bi';
import { isEqual } from '../../../context/utils';
import { IoMailOutline } from 'react-icons/io5';
import QuizSection from './sections/quiz';

function Home() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [param, setParam] = useSearchParams()
  const [activeTab, setActiveTab] = useState(param.get("tab") || "lecture")
  const [isGenerate, setIsGenerate] = useState(false)
  const [upldFile, setUpldFile] = useState<any>({})
  const [isCreate, setIsCreate] = useState(false)
  const handleUpldFileClr = () => setUpldFile({})
  const onGenClose = () => setIsGenerate(false)
  const onGenOpen = () => setIsGenerate(true)
  const [isOpen, setIsOpen] = useState(false)
  const onCreClose = () => setIsCreate(false)
  const activeSection = param.get("section")
  const onCreOpen = () => setIsCreate(true)
  const activeAction = param.get("action")
  const onClose = () => setIsOpen(false)
  const onOpen = () => setIsOpen(true)

  const handleAction = (action: string) => {
    setParam({action})
    onGenOpen()
  }

  const handleViewQuiz = (id: string) => setParam({id, section: "quiz"})
  
  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    directory: false,
    method: undefined,
    showUploadList: false,
    className: "!w-full md:!w-[80%]",
    onChange({file}) {
      setUpldFile({
        file: file?.originFileObj,
        fileobj: file,
      });
    },
  };

  const lectureColumns: ColumnsType<any> = [
    {
      title: "Name",
      dataIndex: "",
      render: () => <p>Untitled 01</p>
    },
    {
      title: "Date uploaded",
      dataIndex: "",
      render: () => <p>{moment().format("L")}</p>
    },
    {
      title: "Actions",
      dataIndex: "",
      render: () => <div className='flex items-center gap-3'>
        <Button onClick={()=>handleAction('quiz')} className='text-primary' type='text' icon={<BiTestTube />}>Quiz</Button>
        <Button onClick={()=>handleAction('flashcards')} className='text-primary' type='text' icon={<TbCards />}>Flashcards</Button>
        <Button onClick={()=>handleAction('recaps')} className='text-primary' type='text' icon={<PiRepeatFill />}>Recaps</Button>
      </div>
    }
  ]

  const quizColumns: ColumnsType<any> = [
    {
      title: "Name",
      dataIndex: "",
      render: () => <Button
        onClick={()=>handleViewQuiz("n7r5")}
        className='text-primary'
        type='text'
      >Quiz 01</Button>
    },
    {
      title: "Date uploaded",
      dataIndex: "",
      render: () => <p>{moment().format("L")}</p>
    },
    {
      title: "Participants",
      dataIndex: "",
      render: () => <p>0</p>
    },
    {
      title: "Actions",
      dataIndex: "",
      render: () => <div className='flex items-center gap-3'>
        <Button className='text-primary' type='text' icon={<IoMailOutline />}>Send Invitation</Button>
      </div>
    }
  ]

  const flashcardColumns: ColumnsType<any> = [
    {
      title: "Name",
      dataIndex: "",
      render: () => <p>Untitled 01</p>
    },
    {
      title: "Date uploaded",
      dataIndex: "",
      render: () => <p>{moment().format("L")}</p>
    },
    {
      title: "Participants",
      dataIndex: "",
      render: () => <p>0</p>
    },
    {
      title: "Actions",
      dataIndex: "",
      render: () => <div className='flex items-center gap-3'>
        <Button className='text-primary' type='text' icon={<IoMailOutline />}>Send Invitation</Button>
      </div>
    }
  ]

  const tabs = useMemo(() => [
    {
      key: 'lecture',
      column: lectureColumns,
      label: <div className='flex items-center gap-3'>
        <p>Lecture</p>
        <Tag className='!bg-lit !border-0'>1</Tag>
      </div>,
    },
    {
      key: 'quiz',
      column: quizColumns,
      label: <div className='flex items-center gap-3'>
        <p>Quiz</p>
        <Tag className='!bg-lit !border-0'>0</Tag>
      </div>,
    },
    {
      key: 'flash-cards',
      column: flashcardColumns,
      label: <div className='flex items-center gap-3'>
        <p>Flash cards</p>
        <Tag className='!bg-lit !border-0'>1</Tag>
      </div>,
    },
    {
      key: 'recaps',
      label: <div className='flex items-center gap-3'>
        <p>Recaps</p>
        <Tag className='!bg-lit !border-0'>1</Tag>
      </div>,
    },
  ], [])

  const handleTab = (tab: string) => {setParam({tab}); setActiveTab(tab)}
  const column = useMemo(() => tabs.find(d => isEqual(d.key, activeTab))?.column, [activeTab, tabs])

  const CreateContent = useMemo(() => [
    {
      key: "quiz",
      component: (
        <Form layout='vertical'>
          <Form.Item label="Name of Quiz" name="name">
            <Input className='!rounded-xl' placeholder='Enter quiz name' size='large' />
          </Form.Item>
          <Form.Item label="Select no of Questions">
            <div className='grid grid-cols-3 gap-3'>
              {Array.from(Array(3).keys()).map(idx => (
                <Button className='!rounded-xl' size='large'>{`${(idx+1)*10} Questions`}</Button>
              ))}
            </div>
          </Form.Item>
          <Form.Item label="Quiz Duration">
            <div className='grid grid-cols-3 gap-3'>
              {Array.from(Array(3).keys()).map(idx => (
                <Button className='!rounded-xl' size='large'>{`${(idx+1)*10} mins`}</Button>
              ))}
            </div>
          </Form.Item>
          <Button className='bg-primary !w-full' htmlType='submit' type='primary' size='large' shape='round'>Save Quiz</Button>
        </Form>
      )
    },
    {
      key: "flashcards",
      component: (
        <Form layout='vertical'>
          <Form.Item label="Name of Flash cards" name="name">
            <Input className='!rounded-xl' placeholder='Enter flash cards name' size='large' />
          </Form.Item>
          <Button className='bg-primary !w-full' htmlType='submit' type='primary' size='large' shape='round'>Save Flash-Cards</Button>
        </Form>
      )
    },
    {
      key: "recaps",
      component: (
        <Form layout='vertical'>
          <Form.Item label="Name of Recaps" name="name">
            <Input className='!rounded-xl' placeholder='Enter recaps name' size='large' />
          </Form.Item>
          <Button className='bg-primary !w-full' htmlType='submit' type='primary' size='large' shape='round'>Save Recaps</Button>
        </Form>
      )
    }
  ]?.find(d => isEqual(d.key, activeAction))?.component, [activeAction])

  const SectionContent = useMemo(() => [
    {
      key: "quiz",
      conponent: <QuizSection />
    },
  ].find(d => isEqual(d.key, activeSection))?.conponent, [activeSection])
  if (SectionContent) return SectionContent;
  return (
    <div className='w-full h-full md:py-5 space-y-5'>
      <div className='flex justify-between items-center px-5 md:px-10'>
        <div>
          <p className='text-3xl font-bold text-secondary'>Hello Lanre</p>
          <p className='text-base font-normal text-gray'>Welcome to your dashboard</p>
        </div>
        <Button onClick={onOpen} className='bg-primary !rounded-2xl' type='primary' size='large' icon={<FaPlus />}>Create</Button>
      </div>

      <div className='w-full'>
        <div className='flex justify-between items-center px-5 md:px-10'>
          <Tabs activeKey={activeTab} defaultActiveKey={activeTab} items={tabs} onChange={handleTab} className='!p-0 !m-0' />
          <CustomPagination total={75} pageSize={limit} sizeChanger current={page} size='small' onChange={setPage} />
        </div>
        <div>
          <CustomTable column={column} pagination={false} />
        </div>
      </div>

      <div className='w-full h-full flex flex-col justify-center items-center'>
        <VideoRecordIcon bg='#4970FC' color='#fff' />
        <p className='text-[40px] font-semibold text-secondary mb-5'>Lectures</p>
        <Button onClick={onOpen} className='bg-primary !px-20 !rounded-2xl' type='primary' size='large'>Create New</Button>
      </div>

      {/* upload document modal >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
      <Modal
        onCancel={onClose}
        closeIcon={false}
        footer={false}
        open={isOpen}
      >
        <div className='flex flex-col justify-center items-center gap-5'>
          <p className='text-[32px] font-semibold text-secondary'>Import Document</p>
          <Upload.Dragger {...uploadProps}>
            <p className="ant-upload-drag-icon">
              <LuUploadCloud className='text-gray text-2xl bg-light mx-auto' />
            </p>
            <p className="ant-upload-text">{upldFile?.file ? "Your file has been uploaded" : `${(<b className='text-primary'>Click to upload</b>)} or drag and drop`}</p>
            <p className="ant-upload-hint">{upldFile?.file ? <Button onClick={handleUpldFileClr} type='text' danger size='large'>Delete</Button> : "SVG, PNG, JPG or GIF (max. 800x400px)"}</p>
          </Upload.Dragger>
          <Button className='text-primary !text-base !font-medium' type='text' size='large' icon={<IoIosVideocam />}>Make a live recording</Button>
          <Button disabled={!upldFile?.file} onClick={onClose} className='bg-primary !w-full md:!w-[70%]' type='primary' size='large' shape='round'>Create Lecture</Button>
        </div>
      </Modal>

      {/* generate from content modal >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
      <Modal
        onCancel={onGenClose}
        open={isGenerate}
        closeIcon={false}
        footer={false}
        width={350}
      >
        <div className='flex flex-col justify-center items-center gap-3'>
          <p className='text-[32px] font-semibold text-secondary capitalize'>{activeAction}</p>
          <p className='text-sm font-normal text-secondary capitalize'>{`Create ${activeAction} from this content`}</p>
          <Button onClick={onCreOpen} className='bg-primary !w-full' type='primary' size='large' shape='round'>Generate</Button>
        </div>
      </Modal>

      {/* create from content modal >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
      <Modal
        onCancel={onCreClose}
        closeIcon={false}
        open={isCreate}
        footer={false}
      >
        <div className='space-y-5'>
          <div className='text-center'>
            <p className='text-[32px] font-semibold text-secondary capitalize'>{` Create ${activeAction}`}</p>
            <p className='text-sm font-normal text-secondary capitalize'>{`Please fill the information below to personalise your ${activeAction}.`}</p>
          </div>
          {CreateContent}
        </div>
      </Modal>
    </div>
  )
}

export default Home