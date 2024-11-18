import React from "react";
import ExportImage from "../../assets/export.svg";
import { BorderHOC } from "../BorderHOC";

export const QuickActions = () => {
  const options = [
    {
      name: "Create a course",
      detail: `Create a new course for students at any academic level.`,
    },
    {
      name: "Create quizes",
      detail: `Create a new course for students at any academic level.`,
    },
    {
      name: "Create Adaptive Learning System",
      detail: `Create a new course for students at any academic level.`,
    },
  ];
  return (
    <div className="w-full flex flex-col gap-[15px]">
      <h2 className="text-base font-bold text-neutral-900">Quick Actions</h2>
      <div className="w-full grid grid-cols-3 gap-[15px]">
        {options.map((option, index) => (
          <div key={index}>
            <BorderHOC
              className="overflow-hidden"
              padding="p-[1px]"
              rounded={"rounded-[10px]"}
            >
              <div className="border border-neutral-200 rounded-[10px] p-6">
                <div className="flex items-center w-full justify-between">
                  <h4 className="text-[15px] leading-[23px] font-bold text-neutral-900">
                    {option.name}
                  </h4>
                  <img src={ExportImage} alt="export-img" />
                </div>
                <p className="text-[13px] leading-[19px] text-neutral-500 max-w-[252px]">
                  {option.detail}
                </p>
              </div>
            </BorderHOC>
          </div>
        ))}
      </div>
    </div>
  );
};
