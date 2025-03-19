import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Avatar, Button, Input, Spin, Typography } from "antd";
import { Icon } from "@iconify/react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { extractAvatar } from "../../constants";
import { parseISO, format } from "date-fns";
import {
  useCreateFeedback,
  useGetLectureFeedback,
} from "../../hooks/feedback/feedback";
import { FeedbackItem } from "../../pages/main/courses/lecture/pages/feedback";
import { useRecoilValue } from "recoil";
import authAtom from "../../atoms/auth/auth.atom";

interface FeedbackMessage {
  id: string;
  sender: string;
  avatar: string;
  role: string;
  timestamp: string;
  content: string;
}

interface FeedbackDetailViewProps {
  feedback: any;
  onClose: () => void;
  onBack: () => void;
  refetch: any;
}

const { Text } = Typography;

const FeedbackDetailView: React.FC<FeedbackDetailViewProps> = ({
  feedback,
  onClose,
  onBack,
  refetch,
}) => {
  const { user } = useRecoilValue(authAtom);
  const {
    mutate,
    isLoading: createFeedbackLoading,
    isSuccess,
    data,
  } = useCreateFeedback(() => {
    //   getLectureFeedbackRefetch();
  });
  const {
    data: feedBackData,
    refetch: getLectureFeedbackRefetch,
    isLoading,
  } = useGetLectureFeedback(feedback?.lecture?._id as string);

  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([]);
  const [inputValue, setInputValue] = useState("");

  const feedbackContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the latest message when feedbackItems changes
  useEffect(() => {
    if (feedbackContainerRef.current && feedbackItems.length > 0) {
      feedbackContainerRef.current.scrollTop =
        feedbackContainerRef.current.scrollHeight;
    }
  }, [feedbackItems]);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      getLectureFeedbackRefetch();
    }
  }, [isSuccess, refetch, getLectureFeedbackRefetch]);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    console.log(feedback?.feedbacks?.course?._id);
    console.log(feedback?.feedbacks?.lecture?._id);
    console.log(feedback?.feedbacks?.user_email);
    console.log(feedback?.feedbacks?.user_full_name);

    mutate({
      course_id: feedback?.feedbacks[0]?.course?._id as string,
      lecture_id: feedback?.lecture?._id as string,
      user_email: user?.email,
      user_full_name: `${user?.first_name} ${user?.last_name}`,
      message: inputValue,
    });

    // setFeedbackItems([...feedbackItems, newFeedback]);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  const [messages, setMessages] = useState<FeedbackMessage[]>([
    {
      id: "1",
      sender: "Nurovant Ai",
      avatar: "B",
      role: "Educator",
      timestamp: "11 Nov. 2024, 12:09PM",
      content:
        "The explanation of quadratic equations is clear, but it would be helpful to include more real-life examples to show practical applications, like calculating areas or optimizing profits in business scenarios.",
    },
    {
      id: "2",
      sender: "Nurovant Ai",
      avatar: "G",
      role: "Educator",
      timestamp: "11 Nov. 2024, 12:09PM",
      content:
        "The step-by-step breakdown of solving quadratic equations is excellent, but consider adding a short recap video at the end of the lesson to reinforce key concepts for students who might need extra support.",
    },
  ]);
  const [replyText, setReplyText] = useState("");

  return (
    <Spin spinning={isLoading}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="w-full flex justify-between pb-6">
          <div className="flex gap-3 items-center">
            <button onClick={onBack} className="p-1">
              <Icon
                icon="mdi:arrow-left"
                className="text-[24px] text-neutral-900"
              />
            </button>
            <div className="flex flex-col gap-[5px]">
              <div className="flex items-center gap-2">
                <h3 className="text-[24px] leading-[32px] font-bold text-neutral-900">
                  Feedback Panel
                </h3>
                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full flex-shrink-0 text-sm">
                  {messages.length}
                </span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="flex items-start pt-1">
            <IoCloseCircleOutline className="text-[24px] text-neutral-900" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-1">
          {/* {messages.map((message) => (
          <div key={message.id} className="mb-6">
            <div className="flex items-start gap-4">
              <Avatar
                size={48}
                style={{
                  backgroundColor:
                    message.avatar === "B"
                      ? "#F87171"
                      : message.avatar === "G"
                      ? "#FFB974"
                      : "#6CE9A6",
                  fontSize: "20px",
                }}
              >
                {message.avatar}
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-white px-3 py-1 rounded-full text-sm border border-gray-200">
                    {message.sender}
                  </span>
                  <span className="text-neutral-600 text-sm">
                    {message.role}
                  </span>
                </div>
                <div className="bg-[#EEF2FF] rounded-lg p-4">
                  <p className="text-neutral-900">{message.content}</p>
                </div>
                <button className="mt-2 text-sm text-neutral-600">Reply</button>
              </div>
            </div>
          </div>
        ))} */}
          {(feedBackData?.data?.length > 0
            ? feedBackData.data
                ?.slice() // Create a shallow copy of the array
                ?.sort(
                  (a: any, b: any) =>
                    new Date(a?.created_at).getTime() -
                    new Date(b?.created_at).getTime()
                )
            : feedback?.feedbacks
          )?.map((item: any) => {
            return (
              <div key={item._id} className="flex items-start flex-col flex-1">
                <div className="flex items-center w-full mb-4">
                  <div className="bg-red-400 mr-4 text-xl flex-shrink-0 h-[48px] w-[48px] rounded-full flex items-center justify-center text-white">
                    {extractAvatar(
                      `${item?.user_full_name}` || item?.user_email
                    )}
                  </div>

                  <div className="flex items-center justify-between w-full">
                    <div className="border border-[#DCDBEF] h-[36px] w-fit rounded-[50px] p-[10px] flex items-center justify-center">
                      <span className="text-sm text-neutral-600 font-semibold">
                        {item?.user_full_name}
                      </span>
                    </div>
                    <Text
                      type="secondary"
                      className="text-sm text-neutral-600 font-semibold"
                    >
                      {format(
                        parseISO(item?.createdAt),
                        "dd MMM, yyyy • hh:mma"
                      )}
                    </Text>
                  </div>
                </div>
                <div className="flex-1 max-w-[80%] w-full ml-auto">
                  <div className="mb-2 bg-indigo-50 border-none rounded-lg px-[20px] py-[14px]">
                    <span className="text-[14px] leading-[22px] text-black font-medium">
                      {item.message}
                    </span>

                    {/* {item.bulletPoints && (
                                    <List
                                      className="mt-2"
                                      itemLayout="horizontal"
                                      dataSource={item.bulletPoints}
                                      renderItem={(point) => (
                                        <List.Item className="py-1 px-0 border-none">
                                          <div className="flex">
                                            <div className="mr-2">•</div>
                                            <div>{point}</div>
                                          </div>
                                        </List.Item>
                                      )}
                                    />
                                  )} */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reply Input */}
        <div className="mt-4 flex gap-2 border-t pt-4 pb-3">
          <Input
            placeholder="Type a reply"
            className="rounded-lg py-3 px-4 flex-1 mr-2"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            className="!bg-primary"
            onClick={handleSendMessage}
            icon={
              <Icon
                icon="mdi:send"
                width="24"
                height="24"
                style={{ color: "white" }}
              />
            }
            loading={createFeedbackLoading}
          />
        </div>
      </div>
    </Spin>
  );
};

export default FeedbackDetailView;
