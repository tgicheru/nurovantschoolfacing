import { Breadcrumb } from "antd";
import React from "react";
import { BorderHOC } from "../../../../../components";
import { useSearchParams } from "react-router-dom";
import { LabelComponent } from "..";
import MiniRecaps from "../components/Recap/MiniRecaps";
import OverallRecaps from "../components/Recap/OverallRecaps";
import Transcription from "../components/Recap/Transcription";

const RecapLecturePage = () => {
  const [param, setParam] = useSearchParams();

  const [activeTab, setActiveTab] = React.useState(
    param.get("tab") || "mini-recaps"
  );

  const data: any[] = [];

  const handleTab = (tab: string) => {
    setParam({ tab });
    setActiveTab(tab);
  };

  const tabs = React.useMemo(
    () => [
      {
        key: "mini-recaps",
        // column: lectureColumns,
        data: [],
        label: (isActive: boolean) => (
          <LabelComponent isActive={isActive} label="Mini Recaps" />
        ),
        content: <MiniRecaps />,
      },
      {
        key: "overall-recaps",
        // column: quizColumns,
        data: data,
        label: (isActive: boolean) => (
          <LabelComponent isActive={isActive} label="Overall Recaps" />
        ),
        content: <OverallRecaps />,
      },
      {
        key: "transcription",
        // column: quizColumns,
        data: data,
        label: (isActive: boolean) => (
          <LabelComponent isActive={isActive} label="Transcription" />
        ),
        content: <Transcription />,
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
              <a href="/courses/lecture?tab=recaps" className="hover:bg-none">
                Recap
              </a>
            ),
          },
          {
            title: <span className="">Algebra 101</span>,
          },
        ]}
      />
      <h2 className="text-[24px] leading-[32px] font-bold text-neutral-900 pt-[25px] pb-[43px]">
        Algebra 101 Recap
      </h2>
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

export default RecapLecturePage;
