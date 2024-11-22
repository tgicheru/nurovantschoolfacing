import { Breadcrumb, Button, Tabs, Tag } from "antd";
import React from "react";
import { BorderHOC } from "../../../../components";
import { PiBookOpenText, PiDotsThreeOutlineDuotone } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { GoRows } from "react-icons/go";
import { TbCards, TbMessageQuestion } from "react-icons/tb";
import { BsRepeat } from "react-icons/bs";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import EmptyState from "../../../../assets/EmptyState.svg";
import { WiStars } from "react-icons/wi";
import { useNavigate } from "react-router";
import LessonPlanContent from "./components/LessonPlanContent";
import QuizContent from "./components/QuizContent";
import FlashCardsContent from "./components/FlashCardsContent";
import RecapContent from "./components/RecapContent";
import DiscussContent from "./components/DiscussContent";

const LabelComponent = ({
  isActive,
  label,
  icon,
  length,
}: {
  isActive: boolean;
  label: string;
  icon: React.ReactNode;
  length: number;
}) => {
  return (
    <div className="flex justify-center px-[9px] h-[39px]">
      <div className="flex flex-row gap-[5px] items-center">
        {icon}
        <p
          className={`text-sm  ${
            isActive
              ? "text-primary font-bold"
              : "text-neutral-400 font-semibold"
          }`}
        >
          {label}
        </p>
        <Tag
          className={`!bg-lit !border-0 h-6 w-6 rounded-[100px] flex items-center justify-center ${
            isActive ? "!bg-[#E1E7FF] text-primary" : "text-neutral-400"
          }`}
        >
          {length}
        </Tag>
      </div>
    </div>
  );
};

const LectureDetail = () => {
  const navigate = useNavigate();
  const lecture = {
    title: "Algebra",
    createdAt: "Created 11 Nov, 2024 • 12:09PM",
  };

  const [isGridView, setIsGridView] = React.useState(true);
  const [data, setData] = React.useState([
    {
      title: "Algebra",
      createdAt: "Created 11 Nov, 2024 • 12:09PM",
    },
  ]);
  const [activeTab, setActiveTab] = React.useState("lesson plan");

  const tabs = React.useMemo(
    () => [
      {
        key: "lesson plan",
        // column: lectureColumns,
        data: [],
        label: (isActive: boolean) => (
          <LabelComponent
            isActive={isActive}
            label="Lesson Plan"
            icon={
              <PiBookOpenText
                className={`${isActive ? "text-primary" : "text-neutral-400"}`}
              />
            }
            length={data?.length}
          />
        ),
        content: <LessonPlanContent data={data} isGridView={isGridView} />,
      },
      {
        key: "quiz",
        // column: quizColumns,
        data: data,
        label: (isActive: boolean) => (
          <LabelComponent
            isActive={isActive}
            label="Quiz"
            icon={
              <TbMessageQuestion
                className={`${isActive ? "text-primary" : "text-neutral-400"}`}
              />
            }
            length={data?.length}
          />
        ),
        content: <QuizContent data={data} isGridView={isGridView} />,
      },
      {
        key: "flash-cards",
        // column: flashcardColumns,
        data: data,
        label: (isActive: boolean) => (
          <LabelComponent
            isActive={isActive}
            label="Flash Cards"
            icon={
              <TbCards
                className={`${isActive ? "text-primary" : "text-neutral-400"}`}
              />
            }
            length={data?.length}
          />
        ),
        content: <FlashCardsContent data={data} isGridView={isGridView} />,
      },
      {
        key: "recaps",
        // column: recapColumns,
        data: data,
        label: (isActive: boolean) => (
          <LabelComponent
            isActive={isActive}
            label="Recaps"
            icon={
              <BsRepeat
                className={`${isActive ? "text-primary" : "text-neutral-400"}`}
              />
            }
            length={data?.length}
          />
        ),
        content: <RecapContent data={data} isGridView={isGridView} />,
      },
      {
        key: "discuss",
        // column: discussColumns,
        data: data,
        label: (isActive: boolean) => (
          <LabelComponent
            isActive={isActive}
            label="Discuss"
            icon={
              <IoChatboxEllipsesOutline
                className={`${isActive ? "text-primary" : "text-neutral-400"}`}
              />
            }
            length={data?.length}
          />
        ),
        content: <DiscussContent data={data} isGridView={isGridView} />,
      },
    ],
    [
      data,
      isGridView,
      setData,
      activeTab,
      setActiveTab,
      setIsGridView,
      navigate,
    ]
  );

  const handleTab = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <Breadcrumb
        items={[
          {
            title: (
              <a href="/courses/details" className="hover:bg-none">
                Lectures
              </a>
            ),
          },
          {
            title: <span className="">Algebra 101</span>,
          },
        ]}
      />

      <div className="flex items-center gap-4">
        <div className="h-[50px] w-[50px]">
          <BorderHOC rounded="rounded-[10px]">
            <div className="h-[50px] w-[50px] flex-shrink-0 bg-[#FEEDD6] rounded-[10px] flex items-center justify-center">
              <h5 className="text-[20px] leading-[30px] font-bold text-black">
                {lecture.title.charAt(0)}
              </h5>
            </div>
          </BorderHOC>
        </div>

        <div className="flex items-center justify-between w-[255px]">
          <div className="flex flex-col">
            <h2 className="text-sm text-neutral-900 font-bold">
              {lecture.title}
            </h2>
            <p className="text-[12px] leading-[18px] text-neutral-600">
              {lecture.createdAt}
            </p>
          </div>

          <button className="flex items-center justify-center">
            <PiDotsThreeOutlineDuotone className="text-[20px]" />
          </button>
        </div>
      </div>

      <BorderHOC className="" rounded="rounded-[10px]">
        <div className="w-full px-[15px] pt-[15px]">
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

              <div className="flex justify-center gap-[10px] h-[40px]">
                <div className="flex justify-center gap-[5px] h-full">
                  <div
                    className={`w-[40px] flex items-center justify-center h-full rounded-[1000px] cursor-pointer ${
                      data.length && isGridView && "bg-[#E7E7E7]"
                    }`}
                    onClick={() => {
                      setIsGridView(true);
                    }}
                  >
                    <RxDashboard className="text-[24px]" />
                  </div>
                  <div
                    className={`w-[40px] flex items-center justify-center h-full rounded-[1000px] cursor-pointer ${
                      data.length && isGridView === false && "bg-[#E7E7E7]"
                    }`}
                    onClick={() => {
                      setIsGridView(false);
                    }}
                  >
                    <GoRows className="text-[24px]" />
                  </div>
                </div>
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

export default LectureDetail;
