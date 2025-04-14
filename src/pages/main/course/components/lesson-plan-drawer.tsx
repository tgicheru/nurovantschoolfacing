import { Avatar, Button, Divider, Drawer, Empty, Form, Input, Spin } from 'antd';
import React, { useMemo, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useGetAllLessonPlanAnalysis, usePostLessonPlanAnalyze } from '../../../../hooks/courses/courses';
import { LuSend } from 'react-icons/lu';
import { isEqual } from '../../../../context/utils';
import icon from '../../../../assets/icons/icon.png';
import { BiErrorCircle, BiLoader } from 'react-icons/bi';

function LessonPLanDrawer({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [chats, setChats] = useState<any>([])
  const onClose = () => setIsOpen(false)
  const onOpen = () => setIsOpen(true)
  const width = window.innerWidth
  const [form] = Form.useForm()

  const chatBox = document.getElementById("chat-box");
  const handleChatScroll = () => setTimeout(() => chatBox?.scroll({ top: chatBox?.scrollHeight, behavior: "smooth" }), 500);

  const {
    data: getAnalysisData,
    refetch: getAnalysisFetch,
    isLoading: getAnalysisLoad,
  } = useGetAllLessonPlanAnalysis(id)

  const {
    mutate: postAnalyzeAction,
    isError: postAnalyzeError,
    isLoading: postAnalyzeLoad,
  } = usePostLessonPlanAnalyze(id, getAnalysisFetch, getAnalysisFetch)

  const analysis: any = useMemo(() => [...(getAnalysisData?.data?.conversation || []), ...chats], [getAnalysisData, chats]);

  const handleSubmit = (payload: any) => {
    setChats([...chats, payload]);
    postAnalyzeAction(payload);
    handleChatScroll();
    form.resetFields();
  };


  return (
    <div>
      <Button onClick={onOpen} type='primary' size='large' shape='round'>Analyze Lesson Plan</Button>

      {/* create analysis option modal >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
      <Drawer
        open={isOpen}
        footer={false}
        onClose={onClose}
        closeIcon={false}
        width={width <= 500 ? width : 500}
        classNames={{ content: "!bg-transparent", wrapper: "!shadow-none" }}
      >
        <div className='w-full p-5 space-y-5 bg-white rounded-3xl'>
          <div className='w-full flex justify-between gap-5'>
            <div className=''>
              <p className='text-xl font-bold text-[#161617]'>FeedBack Panel</p>
              <p className='text-sm font-medium text-[#57585A]'>Make changes to your lesson plan through AI chat system.</p>
            </div>
            <Button onClick={onClose} icon={<AiOutlineCloseCircle className='text-xl' />} type='text' shape='circle' />
          </div>
          <Divider className='m-0 !bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]' />
          <Spin spinning={getAnalysisLoad}>
            <div className='w-full h-[65vh] overflow-y-auto space-y-5 pb-5' id='chat-box'>
              <div hidden={analysis?.length} className='py-5'>
                <Empty />
              </div>

              {analysis?.map((d: any) => {
                const isAI = isEqual(d?.role, "bot");
                const img = isAI ? icon : null;
                return (
                  <div className={`w-full flex gap-3 ${!isAI && "flex-row-reverse"}`}>
                    <div className="flex flex-col items-center">
                      <Avatar alt="nurovant" src={img} />
                    </div>
                    <div className="max-w-[80%] md:max-w-[70%] space-y-3">
                      <p
                        hidden={!isAI}
                        className="p-3 bg-[#F9F9F9] rounded-2xl !rounded-bl-none text-sm font-medium text-dark"
                      >
                        {d?.content || d?.instruction}
                      </p>
                      <p
                        hidden={isAI}
                        className="p-3 bg-[#DBE2FE] rounded-2xl text-sm font-medium text-dark"
                      >
                        <p className="flex justify-between items-center gap-3">
                          <span>{d?.content || d?.instruction}</span>
                          {d?.instruction && postAnalyzeLoad && (
                            <BiLoader className="animate-spin" />
                          )}
                          {d?.instruction && postAnalyzeError && (
                            <BiErrorCircle className="text-red-700" />
                          )}
                        </p>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Spin>
          <Form form={form} onFinish={handleSubmit}>
            <Form.Item name="instruction">
              <Input className='py-0 pr-0' size='large' placeholder='Write to the chat system...' suffix={
                <Button loading={postAnalyzeLoad} type='primary' size='large' htmlType='submit' icon={<LuSend />} />
              } />
            </Form.Item>
          </Form>
        </div>
      </Drawer>
    </div>
  )
}

export default LessonPLanDrawer