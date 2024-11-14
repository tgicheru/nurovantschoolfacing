import React from "react";
import { useRecoilValue } from "recoil";
import authAtom from "../../../atoms/auth/auth.atom";
import BorderHOC from "../../../components/BorderHOC";

const OverviewPage = () => {
  const { user } = useRecoilValue(authAtom);

  const metricsData = [
    {
      name: "Lectures",
      value: "6",
    },
    {
      name: "Questions bank",
      value: "0",
    },
    {
      name: "Students",
      value: "100",
    },
    {
      name: "Adaptive learning",
      value: "12",
    },
  ];

  return (
    <div className="w-full py-[40px]">
      <div className="flex flex-col gap-[5px] mb-[25px]">
        <h1 className="text-neutral-900 text-[24px] leading-[32px] font-bold">
          Welcome back
          {user?.info?.name ? `, ${user?.info?.name?.split(" ")[0]} ` : ""} 👋
        </h1>
        <p className="text-sm font-semibold text-neutral-600">
          Let&apos;s pick up where you left off.
        </p>
      </div>

      <div className="w-full flex flex-col gap-[15px]">
        <div className="w-full grid grid-cols-4 gap-[14px]">
          {metricsData.map((metric, index) => (
            <div key={index}>
              <BorderHOC
                className="overflow-hidden"
                padding="p-[1px]"
                rounded={"rounded-[10px]"}
              >
                <div className="flex flex-col gap-[5px] rounded-[10px]">
                  <p className="text-[14px] leading-[20px] font-semibold text-neutral-900">
                    {metric.name}
                  </p>
                  <p className="text-[14px] leading-[20px] font-normal text-neutral-600">
                    {metric.value}
                  </p>
                </div>
              </BorderHOC>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
