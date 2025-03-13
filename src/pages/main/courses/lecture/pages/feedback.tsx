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
} from "antd";
import { Icon } from "@iconify/react";
import type { ColumnsType } from "antd/es/table";
import { useGetLessonPlan } from "../../../../../hooks/lecture/lecture";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  useCreateFeedback,
  useGetLectureFeedback,
} from "../../../../../hooks/feedback/feedback";
import authAtom from "../../../../../atoms/auth/auth.atom";
import { useRecoilValue } from "recoil";

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

  //   console.log(lessonPlanData);

  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const newFeedback: FeedbackItem = {
      id: Date.now().toString(),
      sender: "Nurovant Ai",
      avatar: "B",
      timestamp: new Date().toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      content: inputValue,
    };

    setFeedbackItems([...feedbackItems, newFeedback]);
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
          <Card
            style={{
              flex: "1 1 500px",
              borderRadius: "8px",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            }}
            title={
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Title level={4} style={{ margin: 0 }}>
                  Feedback Panel
                </Title>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #e8e8e8",
                    cursor: "pointer",
                  }}
                >
                  <Icon
                    icon="mdi:close"
                    width="20"
                    height="20"
                    style={{ color: "#4285F4" }}
                  />
                </div>
              </div>
            }
            headStyle={{ borderBottom: "1px solid #f0f0f0" }}
          >
            {feedbackItems.length === 0 ? (
              <Empty
                description="No feedback yet"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                style={{ margin: "40px 0" }}
              />
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  marginBottom: "16px",
                }}
              >
                {feedbackItems.map((item) => (
                  <div
                    key={item.id}
                    style={{ display: "flex", alignItems: "flex-start" }}
                  >
                    <Avatar
                      size={48}
                      style={{
                        backgroundColor: "#F87171",
                        marginRight: "16px",
                        fontSize: "20px",
                      }}
                    >
                      {item.avatar}
                    </Avatar>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "4px",
                        }}
                      >
                        <Tag
                          color="white"
                          style={{
                            marginRight: "8px",
                            border: "1px solid #e8e8e8",
                          }}
                        >
                          {item.sender}
                        </Tag>
                        <Text type="secondary" style={{ fontSize: "14px" }}>
                          {item.timestamp}
                        </Text>
                      </div>

                      <Card
                        style={{
                          marginBottom: "8px",
                          backgroundColor: "#EEF2FF",
                          border: "none",
                          borderRadius: "8px",
                        }}
                        bodyStyle={{ padding: "16px" }}
                      >
                        <Paragraph style={{ margin: 0 }}>
                          {item.content}
                        </Paragraph>

                        {item.bulletPoints && (
                          <List
                            style={{ marginTop: "8px" }}
                            itemLayout="horizontal"
                            dataSource={item.bulletPoints}
                            renderItem={(point) => (
                              <List.Item
                                style={{ padding: "4px 0", border: "none" }}
                              >
                                <div style={{ display: "flex" }}>
                                  <div style={{ marginRight: "8px" }}>•</div>
                                  <div>{point}</div>
                                </div>
                              </List.Item>
                            )}
                          />
                        )}
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: "flex", marginTop: "24px" }}>
              <Input
                placeholder="Type a reply"
                style={{
                  borderRadius: "8px",
                  padding: "12px 16px",
                  flex: 1,
                  marginRight: "8px",
                }}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: "#4F46E5",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={handleSendMessage}
              >
                <Icon
                  icon="mdi:send"
                  width="24"
                  height="24"
                  style={{ color: "white" }}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </ConfigProvider>
  );
}
