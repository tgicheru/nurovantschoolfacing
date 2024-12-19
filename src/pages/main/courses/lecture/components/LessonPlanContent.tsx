import { Card, Tabs, Typography, Descriptions, Table } from "antd";
import { useState, useMemo } from "react";
import { BorderHOC } from "../../../../../components";
import { useSearchParams } from "react-router-dom";

const { Title, Text } = Typography;

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
    <div className="p-4">
      <Title level={4}>Rubric and Scoring Guide</Title>
      <Table
        dataSource={[
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
            description: "Correctly explains key concepts",
          },
          {
            key: "3",
            criteria: "Practical Skills",
            points: 5,
            description: "Successfully builds a working circuit.",
          },
          {
            key: "4",
            criteria: "Completeness",
            points: 5,
            description: "Finishes all components of the worksheet.",
          },
        ]}
        columns={[
          {
            title: "Criteria",
            dataIndex: "criteria",
            key: "criteria",
            width: "25%",
          },
          {
            title: "Points",
            dataIndex: "points",
            key: "points",
            width: "15%",
          },
          {
            title: "Description",
            dataIndex: "description",
            key: "description",
          },
        ]}
        pagination={false}
        bordered
      />
    </div>
  );
}

function ActivitiesContent() {
  return (
    <div className="p-4">
      <Title level={4}>Class Activities</Title>
      <Table
        dataSource={[
          {
            key: "1",
            time: "8:00 - 8:05",
            activity: "Introduction: Demo with magnet/compass",
          },
          {
            key: "2",
            time: "8:05 - 8:20",
            activity: "Lecture: Electric charges",
          },
          {
            key: "3",
            time: "8:20 - 8:40",
            activity: "Group activity: Build a circuit",
          },
          {
            key: "4",
            time: "8:40 - 8:50",
            activity: "Class discussion: Magnetic fields",
          },
          {
            key: "5",
            time: "8:50 - 9:00",
            activity: "Closure: Exit ticket review",
          },
        ]}
        columns={[
          {
            title: "Time",
            dataIndex: "time",
            key: "time",
            width: "30%",
          },
          {
            title: "Activity",
            dataIndex: "activity",
            key: "activity",
          },
        ]}
        pagination={false}
        bordered
        className="[&_.ant-table-thead_.ant-table-cell]:bg-gray-50"
      />
    </div>
  );
}

export default LessonPlanContent;
