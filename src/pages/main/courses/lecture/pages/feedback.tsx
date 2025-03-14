import {
  Card,
  Typography,
  List,
  Table,
  Input,
  Avatar,
  Tag,
  ConfigProvider,
  Empty,
  Button,
} from "antd";
import { Icon } from "@iconify/react";
import type { ColumnsType } from "antd/es/table";
import { useGetLessonPlan } from "../../../../../hooks/lecture/lecture";
import { useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  useCreateFeedback,
  useGetLectureFeedback,
} from "../../../../../hooks/feedback/feedback";
import authAtom from "../../../../../atoms/auth/auth.atom";
import { useRecoilValue } from "recoil";
import { extractAvatar } from "../../../../../constants";
import { format, parseISO } from "date-fns";

const { Title, Text, Paragraph } = Typography;

interface FeedbackItem {
  id: string;
  sender: string;
  avatar: string;
  timestamp: string;
  content: string;
  bulletPoints?: string[];
}

interface DataType {
  key: string;
  criteria: string;
  points: number;
  description: string;
}

export default function FeedBackPage() {
  const [params, setParams] = useSearchParams();
  const { user } = useRecoilValue(authAtom);
  const course = params.get("course");
  const lecture = params.get("lecture");

  console.log("user", user);

  const {
    data: lessonPlanData,
    isLoading,
    isRefetching,
    refetch,
    isSuccess,
  } = useGetLessonPlan({
    course_id: course as string,
    lecture_id: lecture as string,
  });

  const { data: feedBackData, refetch: getLectureFeedbackRefetch } =
    useGetLectureFeedback(lecture as string);
  console.log("feedBackData", feedBackData);

  const { mutate, isLoading: createFeedbackLoading } = useCreateFeedback(() => {
    getLectureFeedbackRefetch();
  });

  //   useEffect(() => {
  //     refetch();
  //   }, [lessonPlanData]);

  console.log("lessonPlanData", lessonPlanData);

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

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    // const newFeedback: FeedbackItem = {
    //   id: Date.now().toString(),
    //   sender: "Nurovant Ai",
    //   avatar: "B",
    //   timestamp: new Date().toLocaleString("en-US", {
    //     day: "numeric",
    //     month: "short",
    //     year: "numeric",
    //     hour: "numeric",
    //     minute: "2-digit",
    //     hour12: true,
    //   }),
    //   content: inputValue,
    // };

    mutate({
      course_id: course as string,
      lecture_id: lecture as string,
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

  const learningObjectives = [
    "Identify the properties of electric charges and their interactions.",
    "Explain the concept of magnetic fields and their effects on moving charges.",
    "Assemble a basic circuit to demonstrate the flow of electricity.",
    "Predict the direction of a compass needle when placed near a magnet",
  ];

  const teacherResources = [
    "PowerPoint presentation with key concepts.",
    "Interactive whiteboard or projector for visuals.",
  ];

  const studentActivities = [
    "Magnets (one per group).",
    "Wires (5 pieces per group).",
    "Batteries (AA size, one per group).",
    "Lightbulbs (small, one per group).",
    "Compasses (one per group)",
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: "Criteria",
      dataIndex: "criteria",
      key: "criteria",
      width: "30%",
    },
    {
      title: "Points",
      dataIndex: "points",
      key: "points",
      width: "20%",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "50%",
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      criteria: "Participation",
      points: 5,
      description: "Actively engages in discussions and activities",
    },
    {
      key: "2",
      criteria: "Understanding",
      points: 5,
      description: "Correctly explains key concepts and principles",
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#4285F4",
          borderRadius: 6,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        },
      }}
    >
      <div
        className="lesson-feedback-container"
        style={{
          padding: "24px",
          maxWidth: "1200px",
          margin: "0 auto",
          backgroundColor: "#f5f5f5",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "24px",
            flexWrap: "wrap",
          }}
        >
          {/* Left side - Lesson Plan */}
          <Card
            style={{
              flex: "1 1 500px",
              borderRadius: "8px",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ padding: "16px" }}>
              <Text
                style={{
                  color: "#4285F4",
                  fontSize: "16px",
                  fontWeight: "normal",
                }}
              >
                By the end of this lesson, students will be able to
              </Text>

              <List
                itemLayout="horizontal"
                dataSource={learningObjectives}
                renderItem={(item) => (
                  <List.Item style={{ padding: "4px 0" }}>
                    <div style={{ display: "flex" }}>
                      <div style={{ marginRight: "8px" }}>•</div>
                      <div>{item}</div>
                    </div>
                  </List.Item>
                )}
              />

              <Text
                strong
                style={{
                  display: "block",
                  marginTop: "16px",
                  marginBottom: "8px",
                }}
              >
                For the Teacher
              </Text>

              <List
                itemLayout="horizontal"
                dataSource={teacherResources}
                renderItem={(item) => (
                  <List.Item style={{ padding: "4px 0" }}>
                    <div style={{ display: "flex" }}>
                      <div style={{ marginRight: "8px" }}>•</div>
                      <div>{item}</div>
                    </div>
                  </List.Item>
                )}
              />

              <Text
                strong
                style={{
                  display: "block",
                  marginTop: "16px",
                  marginBottom: "8px",
                }}
              >
                For Student Activities
              </Text>

              <List
                itemLayout="horizontal"
                dataSource={studentActivities}
                renderItem={(item) => (
                  <List.Item style={{ padding: "4px 0" }}>
                    <div style={{ display: "flex" }}>
                      <div style={{ marginRight: "8px" }}>•</div>
                      <div>{item}</div>
                    </div>
                  </List.Item>
                )}
              />

              <div style={{ marginTop: "24px" }}>
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  bordered
                  size="middle"
                />
              </div>
            </div>
          </Card>

          {/* Right side - Feedback Panel */}
          {/* Right side - Feedback Panel */}
          <Card
            className="flex-1 basis-[500px] rounded-lg shadow-sm flex flex-col h-[calc(100vh-48px)] max-h-[800px]"
            bodyStyle={{
              padding: 0,
              display: "flex",
              flexDirection: "column",
              height: "100%",
              overflow: "hidden",
            }}
            title={
              <div className="flex justify-between items-center">
                <Title level={4} className="m-0">
                  Feedback Panel
                </Title>
                <div className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-200 cursor-pointer">
                  <Icon icon="mdi:close" className="w-5 h-5 text-blue-500" />
                </div>
              </div>
            }
            headStyle={{ borderBottom: "1px solid #f0f0f0" }}
          >
            <div
              ref={feedbackContainerRef}
              className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
            >
              {feedBackData?.data?.length === 0 ? (
                <Empty
                  description="No feedback yet"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  className="m-auto"
                />
              ) : (
                feedBackData?.data?.map((item: any) => {
                  console.log("item", item);
                  return (
                    <div
                      key={item._id}
                      className="flex items-start flex-col flex-1"
                    >
                      <div className="flex items-center w-full mb-4">
                        <Avatar
                          alt="user"
                          size={48}
                          src={user?.info?.profile_img}
                          className="bg-red-400 mr-4 text-xl flex-shrink-0"
                        >
                          {extractAvatar(
                            `${item?.user_full_name}` || item?.user_email
                          )}
                        </Avatar>

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
                })
              )}
            </div>

            <div className="p-4 border-t border-gray bg-white flex">
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
          </Card>
        </div>
      </div>
    </ConfigProvider>
  );
}
