import { Breadcrumb, Button } from "antd";
import { AiOutlineUserAdd } from "react-icons/ai";
import React from "react";
import { BorderHOC } from "../../../../../components";
import { LabelComponent } from "../";
import { useSearchParams } from "react-router-dom";
import QuizQuestions from "../components/Quiz/QuizQuestions";
import Participants from "../components/Quiz/Participants";
import DiscussContent from "../components/DiscussContent";

const QuizPage = () => {
  const [param, setParam] = useSearchParams();

  const [activeTab, setActiveTab] = React.useState(
    param.get("tab") || "quiz-question"
  );

  const data: any[] = ["Well"];

  const handleTab = (tab: string) => {
    setParam({ tab });
    setActiveTab(tab);
  };

  const tabs = React.useMemo(
    () => [
      {
        key: "quiz-question",
        // column: lectureColumns,
        data: [],
        label: (isActive: boolean) => (
          <LabelComponent
            isActive={isActive}
            label="Quiz Questions"
            length={data?.length}
          />
        ),
        content: <QuizQuestions />,
      },
      {
        key: "participants",
        // column: quizColumns,
        data: data,
        label: (isActive: boolean) => (
          <LabelComponent
            isActive={isActive}
            label="Participants"
            length={data?.length}
          />
        ),
        content: <Participants />,
      },
      {
        key: "analysis",
        // column: quizColumns,
        data: data,
        label: (isActive: boolean) => (
          <LabelComponent
            isActive={isActive}
            label="Result Analysis"
            length={data?.length}
          />
        ),
        content: <DiscussContent data={data} />,
      },
    ],
    []
  );

  return (
    <div className="w-full flex flex-col">
      <Breadcrumb
        items={[
          {
            title: (
              <a href="/courses" className="hover:bg-none">
                Courses
              </a>
            ),
          },
          {
            title: "...",
          },
          {
            title: (
              <a href="/courses/lecture?tab=quiz" className="hover:bg-none">
                Quiz
              </a>
            ),
          },
          {
            title: <span className="">Algebra 101</span>,
          },
        ]}
      />
      <div className="w-full flex items-center justify-between pt-[25px] py-[35px]">
        <h2 className="text-[24px] leading-[32px] font-bold text-neutral-900">
          Algebra 101 Quiz
        </h2>
        <Button
          onClick={() => {}}
          className="bg-primary !rounded-[1000px]"
          type="primary"
          size="large"
          icon={<AiOutlineUserAdd className="text-[20px] text-white" />}
        >
          Invite Students
        </Button>
      </div>

      <BorderHOC className="" rounded="rounded-[10px]">
        <div className="w-full px-[15px] pt-[15px] min-h-[660px]">
          <div className="w-full pb-[10px]">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-5">
                {tabs.map((tab) => (
                  <div
                    key={tab.key}
                    className={`cursor-pointer ${
                      activeTab === tab.key
                        ? "border-b-[3px] border-primary text-primary"
                        : "text-neutral-900"
                    }`}
                    onClick={() => handleTab(tab.key)}
                  >
                    {tab.label(activeTab === tab.key)}
                  </div>
                ))}
              </div>
            </div>
            <BorderHOC className="" />
          </div>

          <div className="w-full">
            {tabs.find((tab) => tab.key === activeTab)?.content}
          </div>
        </div>
      </BorderHOC>
    </div>
  );
};

export default QuizPage;
