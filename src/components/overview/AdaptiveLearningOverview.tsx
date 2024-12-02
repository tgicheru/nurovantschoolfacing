import React from "react";
import { BorderHOC } from "../BorderHOC";
import ContainerPic from "../../assets/Container.svg";

export const AdaptiveLearningOverview = () => {
  return (
    <BorderHOC className="w-full" rounded="rounded-[10px]">
      <div className="w-full p-[25px] h-fit">
        <div className="w-full flex justify-between pb-[10px]">
          <h2 className="text-base font-bold text-neutral-900">
            Adaptive learning
          </h2>
          <div className="flex items-center gap-[10px]">
            <p className="text-sm font-bold text-neutral-900 whitespace-nowrap">
              Filter Lecture:
            </p>
            <BorderHOC rounded="rounded-[999px]">
              <div className="py-[8px] px-[10px]">
                <span className="text-sm font-semibold text-neutral-900">
                  Mathematics
                </span>
                {/* <BsArrowDown className="" /> */}
              </div>
            </BorderHOC>
          </div>
        </div>
        <BorderHOC />
        <div className="w-full pt-[25px] flex gap-[25px] h-full">
          <div className="flex flex-col gap-[19px] w-full">
            <h3 className="text-base text-neutral-900 font-bold">
              Students performance
            </h3>
            <img
              src={ContainerPic}
              alt="adaptive-learning-chart"
              className=""
            />
          </div>
          <BorderHOC className="!h-[345px] !w-[1px]" />
          <div className="flex flex-col gap-[19px] w-[80%]">
            <h3 className="text-base text-neutral-900 font-bold">
              Chunk Statistics
            </h3>

            {[
              {
                header: "Chunk Summary Statistics",
                subTexts: [
                  {
                    label: "Number of  Students:",
                    value: "100",
                  },
                  {
                    label: "Average Score:",
                    value: "48.1%",
                  },
                  {
                    label: "Needs Improvement:",
                    value: "54.0% of students",
                  },
                ],
              },
            ].map((section, index) => (
              <div className="flex flex-col gap-[15px]" key={index}>
                <h4 className="text-sm text-neutral-900 font-bold">
                  {section.header}
                </h4>
                <div className="flex flex-col gap-[10px]">
                  {section.subTexts.map((details, index) => (
                    <div
                      className="w-full flex items-center justify-between"
                      key={index}
                    >
                      <p className="text-sm text-neutral-500">
                        {details.label}
                      </p>
                      <span className="text-sm font-bold text-neutral-900">
                        {details.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <BorderHOC className="" />

            <h3 className="text-base text-neutral-900 font-bold">
              Performance Metrics
            </h3>

            {[
              {
                subTexts: [
                  {
                    label: "Meeting Expectation:",
                    value: "4.5% of students",
                  },
                  {
                    label: "Exceeding Expectation:",
                    value: "1.8% of students",
                  },
                  {
                    label: "Needs Improvement:",
                    value: "54.0% of students",
                  },
                ],
              },
            ].map((section, index) => (
              <div className="flex flex-col gap-[15px]" key={index}>
                <div className="flex flex-col gap-[10px]">
                  {section.subTexts.map((details, index) => (
                    <div
                      className="w-full flex items-center justify-between"
                      key={index}
                    >
                      <p className="text-sm text-neutral-500">
                        {details.label}
                      </p>
                      <span className="text-sm font-bold text-neutral-900">
                        {details.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BorderHOC>
  );
};
