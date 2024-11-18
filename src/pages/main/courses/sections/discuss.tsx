/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Button, Divider, Form, Image, Input, Spin } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { isEqual } from "../../../../context/utils";
import Loading from "../../../../components/loading";
import icon from "../../../../assets/icons/icon.png";
import { RiArrowGoBackFill } from "react-icons/ri";
import {
  useGetDiscuss,
  usePostDiscussChat,
} from "../../../../hooks/discuss/discuss";
import DiscussIcon from "../../../../assets/icons/discussicon";
import moment from "moment";
import { useMemo, useState } from "react";
import { FaArrowDownLong } from "react-icons/fa6";
import { BiErrorCircle, BiLoader } from "react-icons/bi";

function DiscussSection() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [chats, setChats] = useState<any>([]);
  const handleClear = () => setChats([]);
  const id = params.get("id");

  const chatBox = document.getElementById("chat-box");
  const handleChatScroll = () =>
    setTimeout(
      () => chatBox?.scroll({ top: chatBox?.scrollHeight, behavior: "smooth" }),
      500
    );

  const [form] = Form.useForm();
  const goBack = () => navigate("/?tab=discuss");

  const {
    data: getDiscussData,
    refetch: getDiscussFetch,
    isLoading: getDiscussLoad,
    isLoading: getDiscissFetching,
  } = useGetDiscuss(
    id!,
    () => {
      handleChatScroll();
      handleClear();
    },
    handleClear
  );

  const memoData: any = useMemo(
    () => [...(getDiscussData?.data?.chats || []), ...chats],
    [getDiscussData, chats]
  );

  const {
    isError: postDisChatErr,
    mutate: postDisChatAction,
    isLoading: postDisChatLoad,
  } = usePostDiscussChat(getDiscussFetch);

  const handleSubmit = (d: any) => {
    const payload = { id, ...d };
    setChats([...chats, payload]);
    postDisChatAction(payload);
    handleChatScroll();
    form.resetFields();
  };

  if (getDiscussLoad) return <Loading />;
  return (
    <Spin spinning={getDiscussLoad}>
      <div className="w-full min-h-[95vh] flex flex-col md:justify-between items-center md:py-5 relative bg-white">
        <div className="w-full">
          <div className="w-full flex items-center px-5 md:px-10 gap-5">
            <RiArrowGoBackFill
              className="cursor-pointer text-xl text-[#646462]"
              onClick={goBack}
            />
            <p className="text-[28px] font-bold text-dark">
              {getDiscussData?.data?.name}
            </p>
          </div>

          <Divider className="!mb-0" />
        </div>

        <div
          hidden={Boolean(!memoData?.length)}
          className="w-full h-[55vh] md:h-[70vh] overflow-y-auto space-y-10 p-5"
          id="chat-box"
        >
          {memoData?.map((d: any) => {
            const isAI = isEqual(d?.sender, "nurovant");
            return (
              <div className="w-full flex gap-3">
                <div className="w-[10%] md:w-[5%]">
                  <Image
                    preview={false}
                    hidden={!isAI}
                    alt="nurovant"
                    src={icon}
                  />
                </div>
                <div className="max-w-[80%] md:max-w-[70%] space-y-3">
                  <p
                    hidden={!isAI}
                    className="p-3 bg-[#F9F9F9] rounded-2xl !rounded-bl-none text-sm font-medium text-dark"
                  >
                    {d?.message}
                  </p>
                  <p
                    hidden={isAI}
                    className="p-3 bg-primary rounded-2xl text-sm font-medium text-white"
                  >
                    <p className="flex justify-between items-center gap-3">
                      <span>{d?.message || d?.question}</span>
                      {d?.question && postDisChatLoad && (
                        <BiLoader className="animate-spin" />
                      )}
                      {d?.question && postDisChatErr && (
                        <BiErrorCircle className="text-red-500" />
                      )}
                    </p>
                  </p>
                  {/* <p className='text-xs font-medium txet-[#838382]'>{moment(d?.date).startOf('hour').fromNow()}</p> */}
                </div>
              </div>
            );
          })}
        </div>

        <div hidden={Boolean(memoData?.length)} className="w-full h-full">
          <div className="w-full h-full flex flex-col justify-center items-center gap-3 text-center">
            <DiscussIcon bg="#4970FC" color="#D6FFFA" />
            <p className="text-xl font-normal text-[#646462]">
              Hey there, I’m here to assist you with any
              <br /> questions you have about the content of the
              <br /> document
            </p>
            <div className="flex justify-center items-center gap-3">
              {[
                "What's this material about?",
                "Summary of this material",
                "Keywords regarding this material",
              ].map((question) => (
                <Button
                  onClick={() => handleSubmit({ question })}
                  className="text-primary bg-[#C2CFFE] !rounded-2xl !h-[40px]"
                  type="primary"
                  size="small"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <Form form={form} onFinish={handleSubmit} className="!w-full px-5">
          <Form.Item name="question">
            <Input
              required
              size="large"
              placeholder="Type a message"
              className="!h-[50px] !rounded-2xl"
            />
          </Form.Item>
          <Button
            loading={postDisChatLoad}
            className="bg-primary"
            htmlType="submit"
            type="primary"
            shape="round"
            size="large"
          >
            Send
          </Button>
        </Form>

        <Button
          className="w-auto bg-primary !fixed !bottom-48 right-5 md:!right-0 md:!left-0 md:!mx-auto"
          hidden={Boolean(!memoData?.length)}
          loading={getDiscissFetching}
          onClick={handleChatScroll}
          icon={<FaArrowDownLong />}
          shape="circle"
          type="primary"
        />
      </div>
    </Spin>
  );
}

export default DiscussSection;
