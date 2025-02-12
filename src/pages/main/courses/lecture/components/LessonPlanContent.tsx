import { Card, Tabs, Typography, Descriptions, Table } from "antd";
import { useState, useMemo } from "react";
import { BorderHOC } from "../../../../../components";
import { useSearchParams } from "react-router-dom";
import { BsChatDots } from "react-icons/bs";
import { Button, Dropdown, type MenuProps } from "antd"
import { DownOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"


//for rubric
import { Collapse, Radio, Space } from "antd"
import { CaretRightOutlined } from "@ant-design/icons"
import type { RadioChangeEvent } from "antd"
import styled from "styled-components"


const { Panel } = Collapse

// Styled Components
const StyledRadioGroup = styled(Radio.Group)`
  .ant-radio-wrapper {
    margin-right: 4px !important;
  }

  .ant-radio {
    border-color: #E5E7EB;
  }

  .ant-radio-inner {
    width: 24px;
    height: 24px;
    border-color: #E5E7EB;
  }

  .ant-radio-inner::after {
    width: 8px;
    height: 8px;
    background-color: #4F46E5;
  }

  .ant-radio-wrapper-checked .ant-radio-inner {
    border-color: #4F46E5;
  }
`

const StyledCollapse = styled(Collapse)`
  .ant-collapse-header {
    padding: 8px 0 !important;
  }

  .ant-collapse-content-box {
    padding: 0 16px 16px !important;
  }
`

interface CriteriaItem {
  key: string
  name: string
  description: string
  details: string[]
}

const criteria: CriteriaItem[] = [
  {
    key: "participation",
    name: "Participation",
    description: "Consistently demonstrates deep understanding of Ohm's Law through active problem-solving and data...",
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
    description: "Demonstrates comprehensive understanding of magnetic field behavior and electromagnetic induction...",
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
    description: "Demonstrates advanced problem-solving skills in complex electromagnetic scenarios...",
    details: [
      "Applies analytical thinking to complex problems",
      "Develops creative solutions",
      "Shows logical reasoning",
      "Evaluates and validates results effectively",
    ],
  },
]


  const handlePointsChange = (key: string) => (e: RadioChangeEvent) => {
    console.log(`${key} points changed to: ${e.target.value}`)
  }



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
]

const columns = [
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
    width: "150px",
  },
  {
    title: "Activity",
    dataIndex: "activity",
    key: "activity",
    render: (text: string, record: { link: string ; prefix?:string}) => (
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
]

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
]

// Sample data for each tab content
const lessonObjectives = [
  "Identify the properties of electric charges and their interactions.",
  "Explain the concept of magnetic fields and their effects on moving charges.",
  "Assemble a basic circuit to demonstrate the flow of electricity.",
  "Predict the direction of a compass needle when placed near a magnet",
];

const materialsNeeded = [
  "Batteries",
  "Wires",
  "LED bulbs",
  "Magnets",
  "Compass",
  "Circuit boards",
];

const homework = {
  assignment: "Complete worksheet on electric circuits",
  dueDate: "Next class",
  requirements: [
    "Draw circuit diagrams",
    "Calculate current in series circuits",
    "Explain magnetic field effects",
  ],
};

const LessonPlanContent = ({
  isGridView,
  data,
}: {
  isGridView: boolean;
  data: any[];
}) => {
  const [param, setParam] = useSearchParams();
  const [activeTab, setActiveTab] = useState(
    param.get("subTab") || "lesson-objectives"
  );
  const handleTab = (tab: string) => {
    setParam({ subTab: tab });
    setActiveTab(tab);
  };

  const tabs = useMemo(
    () => [
      {
        key: "lesson-objectives",
        // column: lectureColumns,
        data: [],
        label: "Lesson Objectives",
        children: <LessonObjectivesContent />,
      },
      {
        key: "materials-needed",
        // column: quizColumns,
        data: data,
        label: "Materials Needed",
        children: <MaterialsContent />,
      },
      {
        key: "homework",
        // column: flashcardColumns,
        data: data,
        label: "Homework",
        children: <HomeworkContent />,
      },
      {
        key: "teachers-note",
        // column: recapColumns,
        data: data,
        label: "Teachers Note",
        children: <TeachersNoteContent />,
      },
      {
        key: "rubic",
        // column: discussColumns,
        data: data,
        label: "Rubric and Scoring Guide",
        children: <RubricContent />,
      },
      {
        key: "activities",
        // column: discussColumns,
        data: data,
        label: "Activities",
        children: <ActivitiesContent />,
      },
    ],
    [data, isGridView]
  );

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header Card */}
      <Card className="mb-4" style={{ backgroundColor: "#E1E7FF" }}>
        <div className="flex items-center justify-between flex-1 gap-4">
          <div className="flex items-center flex-1 justify-between">
            <div className="flex flex-col gap-[5px]">
              <h2 className="text-sm text-neutral-900 font-bold whitespace-nowrap">
                {"Created"}
              </h2>
              <p className="text-[12px] leading-[18px] text-neutral-600 whitespace-nowrap">
                11 Nov. 2024 · 12:09PM
              </p>
            </div>
            <div className="flex flex-col gap-[5px]">
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
            </div>

            <div className="flex flex-col gap-[5px]">
              <h2 className="text-sm text-neutral-900 font-bold whitespace-nowrap">
                Unit Name
              </h2>
              <p className="text-[12px] leading-[18px] text-neutral-600 whitespace-nowrap">
                Electricity and Magnetism
              </p>
            </div>
            <div className="flex flex-col gap-[5px]">
              <h2 className="text-sm text-neutral-900 font-bold whitespace-nowrap">
                Lesson Duration
              </h2>
              <p className="text-[12px] leading-[18px] text-neutral-600 whitespace-nowrap">
                45 Mins
              </p>
            </div>
          </div>
        </div>
      </Card>

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

      <div className="w-full flex flex-col lg:flex-row gap-5">
        <div className="w-full lg:w-[294px]">
          <BorderHOC className="" rounded="rounded-[10px]">
            <div className="w-full  p-4">
              <Title level={4}>Lesson Objectives</Title>
              <ul className="list-disc pl-6 space-y-2">
                {tabs.map((tab) => (
                  <li
                    key={tab.key}
                    className={`cursor-pointer text-sm ${
                      activeTab === tab.key
                        ? "text-primary"
                        : "text-neutral-900"
                    }`}
                    onClick={() => handleTab(tab.key)}
                  >
                    {tab.label}
                  </li>
                ))}
              </ul>
            </div>
          </BorderHOC>
          <Link
      to="/courses/lecture/analyze"
      className="inline-block px-4 py-2 text-lg font-medium text-blue-600 border-2 border-blue-600 rounded-full hover:bg-blue-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 mt-4"
    >
      Analyze Lesson Plan
    </Link>
    <button
      className="p-3 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 mt-7"
      aria-label="Open chat"
    >
      <BsChatDots className="w-6 h-6" />
    </button>
        </div>

        <div className="w-full h-full">
          <BorderHOC className="" rounded="rounded-[10px]">
            <div className="w-full p-4">
              {tabs.find((tab) => tab.key === activeTab)?.children}
            </div>
          </BorderHOC>
        </div>
      </div>
    </div>
  );
};

function LessonObjectivesContent() {
  return (
    <div className="p-4">
      <Title level={5} className="!text-primary mb-4">
        By the end of this lesson, students will be able to
      </Title>
      <ul className="list-disc pl-6 space-y-2">
        {lessonObjectives.map((objective, index) => (
          <li key={index}>{objective}</li>
        ))}
      </ul>
    </div>
  );
}

function MaterialsContent() {
  return (
    <div className="p-4">
      <Title level={5} className="!text-primary">
        For the Teacher
      </Title>
      <ul className="list-disc pl-6 space-y-2">
        {[
          "PowerPoint presentation with key concepts",
          "Interactive whiteboard or projector for visuals",
        ].map((material, index) => (
          <li key={index}>{material}</li>
        ))}
      </ul>
      <Title level={5} className="mt-4 !text-primary">
        For Student Activities
      </Title>
      <ul className="list-disc pl-6 space-y-2">
        {[
          "Magnets (one per group).",
          "Wires (5 pieces per group)",
          "Batteries (AA size, one per group)",
          "Lightbulbs (small, one per group).",
          "Compasses (one per group)",
        ].map((material, index) => (
          <li key={index}>{material}</li>
        ))}
      </ul>
    </div>
  );
}

function HomeworkContent() {
  return (
    <div className="p-4">
      <Title level={5} className="mt-4">
        Complete the Electricity and Magnetism Worksheet:
      </Title>
      <ul className="list-disc pl-6 space-y-2">
        {[
          "Define electric charges and their interactions",
          "Draw and label a simple circuit.",
          "Describe how a compass reacts to a nearby magnet",
        ].map((req, index) => (
          <li key={index}>{req}</li>
        ))}
      </ul>
    </div>
  );
}

function TeachersNoteContent() {
  return (
    <div className="p-4">
      <ul className="list-disc pl-6 space-y-2">
        {[
          "Check all demo materials before class.",
          "Offer hints to students struggling with circuit-building.",
          "Collect homework to review next lesson.",
        ].map((req, index) => (
          <li key={index}>{req}</li>
        ))}
      </ul>
    </div>
  );
}

function RubricContent() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="space-y-4">
        {/* Table Header */}
        <div className="grid grid-cols-[200px_auto_1fr] items-start gap-8 pb-2 border-b border-gray-200">
          <Text className="text-sm font-medium text-gray-500">Criteria</Text>
          <Text className="text-sm font-medium text-gray-500">Points</Text>
          <Text className="text-sm font-medium text-gray-500">Student Responses May Include</Text>
        </div>
        {/* Table Body */}
        {criteria.map((item) => (
          <div key={item.key} className="border-b border-gray-100 pb-2 last:border-b-0">
            <div className="grid grid-cols-[200px_auto_1fr] items-start gap-8">
              <Text className="text-sm text-gray-900 pt-2">{item.name}</Text>
              <StyledRadioGroup onChange={handlePointsChange(item.key)} className="flex items-center gap-1 pt-1.5">
                <Space>
                  {[1, 2, 3, 4, 5].map((point) => (
                    <Radio key={point} value={point}>
                      <span className="flex items-center justify-center w-6 h-6 text-sm">{point}</span>
                    </Radio>
                  ))}
                </Space>
              </StyledRadioGroup>
              <StyledCollapse
                ghost
                expandIcon={({ isActive }) => (
                  <CaretRightOutlined rotate={isActive ? 90 : 0} className="text-gray-400" />
                )}
              >
                <Panel header={<Text className="text-sm text-gray-600">{item.description}</Text>} key="1">
                  <ul className="list-disc pl-5 space-y-2">
                    {item.details.map((detail, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </Panel>
              </StyledCollapse>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivitiesContent() {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <Dropdown menu={{ items }} trigger={["click"]}>
          <Button className="text-gray-600">
            Project-Based Learning <DownOutlined />
          </Button>
        </Dropdown>
        <Button type="primary" className="bg-blue-500">
          Continuous Feedback loop
        </Button>
      </div>
      <Table columns={columns} dataSource={data} pagination={false} className="bg-gray-50 rounded-lg" />
    </div>
  );
}

export default LessonPlanContent;
