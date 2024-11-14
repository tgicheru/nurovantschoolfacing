import React from "react";
import { useRecoilValue } from "recoil";
import authAtom from "../../../atoms/auth/auth.atom";
import BorderHOC from "../../../components/BorderHOC";
import AddItemImg from "../../../assets/additem.svg";
import QuickActions from "../../../components/overview/QuickActions";

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
                <div className="flex flex-col p-6">
                  <div className="flex items-center w-full justify-between">
                    <p className="text-[14px] leading-[20px] font-medium text-neutral-600">
                      {metric.name}
                    </p>
                    <img src={AddItemImg} alt="addItem-img" />
                  </div>
                  <p className="text-[48px] leading-[60px] font-bold text-neutral-900">
                    {metric.value}
                  </p>
                </div>
              </BorderHOC>
            </div>
          ))}
        </div>

        <QuickActions />
      </div>
    </div>
  );
};

export default OverviewPage;
