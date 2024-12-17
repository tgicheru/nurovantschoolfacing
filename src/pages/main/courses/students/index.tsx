import { Breadcrumb } from "antd";
import React from "react";
import { BorderHOC, ContentHeader } from "../../../../components";
import { RxDashboard } from "react-icons/rx";
import { GoRows } from "react-icons/go";
import { useSearchParams } from "react-router-dom";
import { LabelComponent } from "../lecture";
import StudentParticipants from "./components/StudentParticipants";
import { IoPersonOutline } from "react-icons/io5";

const StudentDetails = () => {
  const [param, setParam] = useSearchParams();

  const [activeTab, setActiveTab] = React.useState(
    param.get("tab") || "students"
  );

  const handleTab = (tab: string) => {
    setParam({ tab });
    setActiveTab(tab);
  };

  const tabs = React.useMemo(
    () => [
      {
        key: "students",
        // column: lectureColumns,
        data: [],
        label: (isActive: boolean) => (
          <LabelComponent
            isActive={isActive}
            label="Students"
            length={data?.length}
            icon={
              <IoPersonOutline
                className={`${isActive ? "text-primary" : "text-neutral-400"}`}
              />
            }
          />
        ),
        content: <StudentParticipants />,
      },
    ],
    []
  );

  const data = [];
  const [isGridView, setIsGridView] = React.useState(true);

  return (
    <div className="w-full flex flex-col gap-5">
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
            title: <span className="">Students</span>,
          },
        ]}
      />

      <ContentHeader
        headerText={`Courses 📚`}
        subText={`Organize and manage your course materials.`}
      />

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

              <div className="flex items-center gap-[10px] h-[40px]">
                <div className="flex items-center gap-[5px] h-full">
                  <div
                    className={`w-[40px] flex items-center justify-center h-full rounded-[1000px] cursor-pointer ${
                      data?.length && isGridView && "bg-[#E7E7E7]"
                    }`}
                    onClick={() => {
                      setIsGridView(true);
                    }}
                  >
                    <RxDashboard className="text-[24px]" />
                  </div>
                  <div
                    className={`w-[40px] flex items-center justify-center h-full rounded-[1000px] cursor-pointer ${
                      data?.length && isGridView === false && "bg-[#E7E7E7]"
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

export default StudentDetails;
