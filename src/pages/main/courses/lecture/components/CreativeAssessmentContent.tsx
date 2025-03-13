import { Card, Tabs, Typography, Descriptions, Table } from "antd";
import { useState, useMemo, useEffect } from "react";
import { BorderHOC } from "../../../../../components";
import { useSearchParams } from "react-router-dom";
import { BsChatDots } from "react-icons/bs";
import { Button, Dropdown, type MenuProps } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import EmptyState from "../../../../../assets/EmptyState.svg";

//for rubric
import { Collapse, Radio, Space } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import type { RadioChangeEvent } from "antd";
import styled from "styled-components";
import { WiStars } from "react-icons/wi";
import {
  useGetCreativeAssessment,
  useGetLessonPlan,
} from "../../../../../hooks/lecture/lecture";
import { format, parseISO } from "date-fns";

const { Panel } = Collapse;

// Styled Components
const StyledRadioGroup = styled(Radio.Group)`
  .ant-radio-wrapper {
    margin-right: 4px !important;
  }

  .ant-radio {
    border-color: #e5e7eb;
  }

  .ant-radio-inner {
    width: 24px;
    height: 24px;
    border-color: #e5e7eb;
  }

  .ant-radio-inner::after {
    width: 8px;
    height: 8px;
    background-color: #4f46e5;
  }

  .ant-radio-wrapper-checked .ant-radio-inner {
    border-color: #4f46e5;
  }
`;

const StyledCollapse = styled(Collapse)`
  .ant-collapse-header {
    padding: 8px 0 !important;
  }

  .ant-collapse-content-box {
    padding: 0 16px 16px !important;
  }
`;

interface CriteriaItem {
  key: string;
  name: string;
  description: string;
  details: string[];
}

const criteria: CriteriaItem[] = [
  {
    key: "participation",
    name: "Participation",
    description:
      "Consistently demonstrates deep understanding of Ohm's Law through active problem-solving and data...",
    details: [
      "Consistently demonstrates deep understanding of Ohm's Law through active problem-solving and data",
      "Actively participates in circuit building exercises, making precise measurements",
      "Effectively collaborates with peers in experimental setups and procedures",
      "Shows initiative in data collection and analysis",
    ],
  },
  {
    key: "understanding",
    name: "Understanding",
    description:
      "Demonstrates comprehensive understanding of magnetic field behavior and electromagnetic induction...",
    details: [
      "Comprehends core electromagnetic principles",
      "Applies theoretical knowledge to practical scenarios",
      "Explains complex electromagnetic phenomena clearly",
      "Makes connections between different concepts",
    ],
  },
  {
    key: "practical",
    name: "Practical Skills",
    description:
      "Demonstrates proficiency in setting up basic electrical circuits and measuring fundamental quantities...",
    details: [
      "Sets up circuits accurately and safely",
      "Takes precise measurements",
      "Follows proper experimental procedures",
      "Handles equipment with care and expertise",
    ],
  },
  {
    key: "competencies",
    name: "Competencies",
    description:
      "Shows thorough understanding of Maxwell's equations and their implications for electromagnetic waves...",
    details: [
      "Understands and applies Maxwell's equations",
      "Analyzes electromagnetic wave properties",
      "Solves complex field problems",
      "Demonstrates mathematical proficiency",
    ],
  },
  {
    key: "problem-solving",
    name: "Problem-Solving and Analytical Thinking",
    description:
      "Demonstrates advanced problem-solving skills in complex electromagnetic scenarios...",
    details: [
      "Applies analytical thinking to complex problems",
      "Develops creative solutions",
      "Shows logical reasoning",
      "Evaluates and validates results effectively",
    ],
  },
];

const handlePointsChange = (key: string) => (e: RadioChangeEvent) => {
  console.log(`${key} points changed to: ${e.target.value}`);
};

//rubric

const { Title, Text } = Typography;

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "Project-Based Learning",
  },
  {
    key: "2",
    label: "Traditional Learning",
  },
  {
    key: "3",
    label: "Blended Learning",
  },
];

const columns = [
  {
    title: "Duration(mins)",
    dataIndex: "duration",
    key: "duration",
    width: "150px",
  },
  {
    title: "Activity",
    dataIndex: "activity",
    key: "activity",
    render: (text: string, record: { link: string; prefix?: string }) => (
      <span>
        {record.prefix && `${record.prefix}: `}
        {record.link ? (
          <a href={record.link} className="text-blue-500 hover:text-blue-600">
            {text}
          </a>
        ) : (
          text
        )}
      </span>
    ),
  },
];

const rubicColumns = [
  {
    title: "Criteria",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Activity",
    dataIndex: "activity",
    key: "activity",
    render: (text: string, record: { link: string; prefix?: string }) => (
      <span>
        {record.prefix && `${record.prefix}: `}
        {record.link ? (
          <a href={record.link} className="text-blue-500 hover:text-blue-600">
            {text}
          </a>
        ) : (
          text
        )}
      </span>
    ),
  },
];
const data = [
  {
    key: "1",
    time: "8:00 - 8:05",
    activity: "Demo with magnet/compass",
    prefix: "Introduction",
    link: "#",
  },
  {
    key: "2",
    time: "8:05 - 8:20",
    activity: "Electric charges",
    prefix: "Lecture",
    link: "#",
  },
  {
    key: "3",
    time: "8:20 - 8:40",
    activity: "Build a circuit",
    prefix: "Group activity",
    link: "#",
  },
  {
    key: "4",
    time: "8:40 - 8:50",
    activity: "Weekly Trend",
    prefix: "Performance",
    link: "#",
  },
  {
    key: "5",
    time: "8:50 - 9:00",
    activity: "Exit ticket review",
    prefix: "Closure",
    link: "#",
  },
];

// Sample data for each tab content

const CreativeAssessmentContent = ({
  isGridView,
  data,
  lectureRefetch,
}: {
  isGridView: boolean;
  data: any;
  lectureRefetch: any;
}) => {
  const [params, setParams] = useSearchParams();
  const id = params.get("id");
  const mainTab = params.get("tab");
  const [activeTab, setActiveTab] = useState(
    params.get("subTab") || "lesson-objectives"
  );
  console.log("dataC", data);
  const handleTab = (tab: string) => {
    setParams({ tab: mainTab as string, id: id as string, subTab: tab });
    setActiveTab(tab);
  };

  const {
    data: creativeAssessmentData,
    isLoading,
    isRefetching,
    refetch,
    isSuccess,
  } = useGetCreativeAssessment({
    lecture_id: id as string,
  });

  const tabs = useMemo(
    () => [
      {
        key: "lesson-objectives",
        // column: lectureColumns,
        data: [],
        label: "Lesson Objectives",
        children: (
          <LessonObjectivesContent
            data={
              creativeAssessmentData?.data?.objectives ||
              data?.lesson_plan?.objectives
            }
          />
        ),
      },
      {
        key: "materials-needed",
        // column: quizColumns,
        data: data,
        label: "Materials Needed",
        children: (
          <MaterialsContent
            data={
              creativeAssessmentData?.data?.materials_needed ||
              data?.lesson_plan?.materials_needed
            }
          />
        ),
      },
      {
        key: "homework",
        // column: flashcardColumns,
        data: data,
        label: "Homework",
        children: (
          <HomeworkContent
            data={
              creativeAssessmentData?.data?.homework ||
              data?.lesson_plan?.homework
            }
          />
        ),
      },
      {
        key: "teachers-note",
        // column: recapColumns,
        data: data,
        label: "Teachers Note",
        children: (
          <TeachersNoteContent
            data={
              creativeAssessmentData?.data?.teachers_note ||
              data?.lesson_plan?.teachers_note
            }
          />
        ),
      },
      {
        key: "rubic",
        // column: discussColumns,
        data: data,
        label: "Rubric and Scoring Guide",
        children: (
          <RubricContent
            data={
              creativeAssessmentData?.data?.rubic_scoring_guide ||
              data?.lesson_plan?.rubic_scoring_guide
            }
          />
        ),
      },
      {
        key: "activities",
        // column: discussColumns,
        data: data,
        label: "Activities",
        children: (
          <ActivitiesContent
            data={
              creativeAssessmentData?.data?.activities ||
              data?.lesson_plan?.activities
            }
          />
        ),
      },
    ],
    [data, creativeAssessmentData?.data]
  );

  useEffect(() => {
    if (isSuccess) {
      lectureRefetch();
    }
  }, [isSuccess, lectureRefetch]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header Card */}
      {(creativeAssessmentData?.data || data?.lesson_plan) && (
        <Card className="mb-4" style={{ backgroundColor: "#E1E7FF" }}>
          <div className="flex items-center justify-between flex-1 gap-4">
            <div className="flex items-center flex-1 justify-between">
              <div className="flex flex-col gap-[5px]">
                <h2 className="text-sm text-neutral-900 font-bold whitespace-nowrap">
                  {"Created"}
                </h2>
                <p className="text-[12px] leading-[18px] text-neutral-600 whitespace-nowrap">
                  {data?.lesson_plan?.createdAt &&
                    data?.lesson_plan?.createdAt &&
                    format(
                      parseISO(data?.lesson_plan?.createdAt),
                      "dd MMM, yyyy • hh:mma"
                    )}
                </p>
              </div>
              {/* <div className="flex flex-col gap-[5px]">
                <h2 className="text-sm text-neutral-900 font-bold whitespace-nowrap">
                  {"Subject"}
                </h2>
                <p className="text-[12px] leading-[18px] text-neutral-600 whitespace-nowrap">
                  Physics
                </p>
              </div>
              <div className="flex flex-col gap-[5px]">
                <h2 className="text-sm text-neutral-900 font-bold whitespace-nowrap">
                  Grade Level
                </h2>
                <p className="text-[12px] leading-[18px] text-neutral-600 whitespace-nowrap">
                  Grade 8
                </p>
              </div> */}

              <div className="flex flex-col gap-[5px]">
                <h2 className="text-sm text-neutral-900 font-bold whitespace-nowrap">
                  Unit Name
                </h2>
                <p className="text-[12px] leading-[18px] text-neutral-600 whitespace-nowrap">
                  {data?.unit}
                </p>
              </div>
              <div className="flex flex-col gap-[5px]">
                <h2 className="text-sm text-neutral-900 font-bold whitespace-nowrap">
                  Lesson Duration
                </h2>
                <p className="text-[12px] leading-[18px] text-neutral-600 whitespace-nowrap">
                  {data?.lesson_plan?.duration} Mins
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Main Content */}
      {/* <div className="flex gap-4">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          tabPosition="left"
          className="min-w-[200px]"
          items={[
            {
              key: "1",
              label: "Lesson Objectives",
              children: <LessonObjectivesContent />,
            },
            {
              key: "2",
              label: "Materials Needed",
              children: <MaterialsContent />,
            },
            {
              key: "3",
              label: "Homework",
              children: <HomeworkContent />,
            },
            {
              key: "4",
              label: "Teachers Note",
              children: <TeachersNoteContent />,
            },
            {
              key: "5",
              label: "Rubric and Scoring Guide",
              children: <RubricContent />,
            },
            {
              key: "6",
              label: "Activities",
              children: <ActivitiesContent />,
            },
          ]}
        />
      </div> */}

      {data?.creative_assessment && (
        <div className="w-full flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-[294px] flex-shrink-0">
            <BorderHOC className="" rounded="rounded-[10px]">
              <div className="w-full  p-4">
                <Title level={4}>Key Topics</Title>
                <ul className="list-disc pl-6 space-y-2">
                  {data?.creative_assessment?.topics?.map((topic: any) => (
                    <li key={topic?._id} className={`cursor-pointer text-sm`}>
                      {topic?.topic}
                    </li>
                  ))}
                </ul>
              </div>
            </BorderHOC>
            <Button
              onClick={() => {
                // refetch();
              }}
              className="bg-primary !rounded-[1000px] mt-4 px-4"
              type="primary"
              size="large"
              loading={false}
            >
              Edit
            </Button>
          </div>

          <div className="w-full h-full">
            <BorderHOC className="" rounded="rounded-[10px]">
              <div className="w-full p-4 flex flex-col gap-3">
                <h3 className="text-[20px] leading-[20px] font-semibold">
                  Questions
                </h3>
                {data?.creative_assessment?.topics?.map(
                  (topic: any, index: number) => (
                    <BorderHOC className="" rounded="rounded-[10px]">
                      <div className="w-full p-4 flex gap-2 text-sm">
                        <span>{index + 1}.</span>
                        <p>{topic?.question}</p>
                      </div>
                    </BorderHOC>
                  )
                )}
              </div>
            </BorderHOC>
          </div>
        </div>
      )}

      {!data?.creative_assessment && (
        <div className="w-full flex items-center justify-center py-[72px]">
          <div className="flex items-center justify-center flex-col gap-[15px] max-w-[198px]">
            <div className="flex flex-col items-center justify-center">
              <img src={EmptyState} alt="empty courses" />
              <span className="text-base font-bold text-neutral-900 text-center">
                You do not have any Creative Assessment yet
              </span>
            </div>

            <Button
              onClick={() => {
                refetch();
              }}
              className="bg-primary !rounded-[1000px]"
              type="primary"
              size="large"
              loading={isLoading || isRefetching}
              icon={<WiStars className="text-[34px]" />}
            >
              Generate Assessment
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

function LessonObjectivesContent({ data }: { data: string[] }) {
  return (
    <div className="p-4">
      <Title level={5} className="!text-primary mb-4">
        By the end of this lesson, students will be able to
      </Title>
      <ul className="list-disc pl-6 space-y-2">
        {data?.map((objective, index) => (
          <li key={index}>{objective}</li>
        ))}
      </ul>
    </div>
  );
}

function MaterialsContent({ data }: { data: string[] }) {
  return (
    <div className="p-4">
      {/* <Title level={5} className="!text-primary">
        For the Teacher
      </Title>
      <ul className="list-disc pl-6 space-y-2">
        {[
          "PowerPoint presentation with key concepts",
          "Interactive whiteboard or projector for visuals",
        ].map((material, index) => (
          <li key={index}>{material}</li>
        ))}
      </ul> */}
      <Title level={5} className="mt-4 !text-primary">
        For Student Activities
      </Title>
      <ul className="list-disc pl-6 space-y-2">
        {data?.map((material, index) => (
          <li key={index}>{material}</li>
        ))}
      </ul>
    </div>
  );
}

function HomeworkContent({ data }: { data: string[] }) {
  return (
    <div className="p-4">
      <Title level={5} className="mt-4">
        Complete the Electricity and Magnetism Worksheet:
      </Title>
      <ul className="list-disc pl-6 space-y-2">
        {data?.map((req, index) => (
          <li key={index}>{req}</li>
        ))}
      </ul>
    </div>
  );
}

function TeachersNoteContent({ data }: { data: string[] }) {
  return (
    <div className="p-4">
      <ul className="list-disc pl-6 space-y-2">
        {data?.map((req, index) => (
          <li key={index}>{req}</li>
        ))}
      </ul>
    </div>
  );
}

function RubricContent({ data }: { data: any }) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="space-y-4">
        {/* Table Header */}
        <div className="grid grid-cols-[200px_auto_1fr] items-start gap-8 pb-2 border-b border-gray-200">
          <Text className="text-sm font-medium text-gray-500">Criteria</Text>
          <Text className="text-sm font-medium text-gray-500">Points</Text>
          <Text className="text-sm font-medium text-gray-500">
            Student Responses May Include
          </Text>
        </div>
        {/* Table Body */}
        {data?.criteria.map(
          (item: {
            title: string;
            _id: string;
            criteria_grade_breakdown: {
              _id: string;
              excellent: string;
              good: string;
              needs_improvement: string;
            };
          }) => (
            <div
              key={item._id}
              className="border-b border-gray-100 pb-2 last:border-b-0"
            >
              <div className="grid grid-cols-[200px_auto_1fr] items-start gap-8">
                <Text className="text-sm text-gray-900 pt-2">{item.title}</Text>
                <StyledRadioGroup
                  onChange={handlePointsChange(item._id)}
                  className="flex items-center gap-1 pt-1.5"
                >
                  <Space>
                    {[1, 2, 3, 4, 5].map((point) => (
                      <Radio key={point} value={point}>
                        <span className="flex items-center justify-center w-6 h-6 text-sm">
                          {point}
                        </span>
                      </Radio>
                    ))}
                  </Space>
                </StyledRadioGroup>
                <StyledCollapse
                  ghost
                  expandIcon={({ isActive }) => (
                    <CaretRightOutlined
                      rotate={isActive ? 90 : 0}
                      className="text-gray-400"
                    />
                  )}
                >
                  <Panel
                    header={
                      <Text className="text-sm text-gray-600">
                        {"Criteria Grade Breakdown"}
                      </Text>
                    }
                    key="1"
                  >
                    <ul className="list-disc pl-5 space-y-2">
                      {Object.keys(item.criteria_grade_breakdown)?.map(
                        (detail, index) => (
                          <li
                            key={index}
                            className={`text-sm text-gray-600 ${
                              detail === "_id" && "hidden"
                            }`}
                          >
                            {detail}:{" "}
                            {
                              item.criteria_grade_breakdown[
                                detail as keyof typeof item.criteria_grade_breakdown
                              ]
                            }
                          </li>
                        )
                      )}
                    </ul>
                  </Panel>
                </StyledCollapse>
              </div>
            </div>
          )
        )}
      </div>

      {/* <Table
        columns={rubicColumns}
        dataSource={data?.criteria}
        pagination={false}
        className="bg-gray-50 rounded-lg"
      /> */}
    </div>
  );
}

function ActivitiesContent({ data }: { data: any }) {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        className="bg-gray-50 rounded-lg"
      />
    </div>
  );
}

export default CreativeAssessmentContent;
