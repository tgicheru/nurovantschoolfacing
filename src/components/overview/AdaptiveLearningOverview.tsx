import React from "react";
import { BorderHOC } from "../BorderHOC";

export const AdaptiveLearningOverview = () => {
  return (
    <BorderHOC className="w-full" rounded="rounded-[10px]">
      <div className="w-full p-[25px]">
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
      </div>
    </BorderHOC>
  );
};
