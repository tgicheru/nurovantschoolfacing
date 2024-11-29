import React from "react";
import { BorderHOC } from "../../../../../../components";

const Participants = () => {
  const data: {
    name: string;
    score: {
      mark: number;
      total: number;
    };
    email: string;
    status: string;
  }[] = [
    {
      name: "Peter Olugbenga",
      score: {
        mark: 7,
        total: 14,
      },
      email: "Olasunkanmifinesse@gmail.com",
      status: "pass",
    },
  ];
  return (
    <div className="flex flex-col w-full gap-3 p-4">
      {data.map((student: any, idx) => (
        <div
          className="w-full cursor-pointer"
          key={idx}
          onClick={() => {
            // navigate("/courses/lecture/quiz");
          }}
        >
          <BorderHOC className="w-full" rounded="rounded-[10px]">
            <div className="flex items-center gap-4 px-4 py-[10px]">
              <div className="h-[43px] w-[43px]">
                <div className="h-[43px] flex-shrink-0 bg-[#FAB55B] rounded-[1000px] flex items-center justify-center">
                  <h5 className="text-[18px] leading-[28px] font-semibold text-white">
                    P
                  </h5>
                </div>
              </div>
              <div className="flex items-center flex-1 gap-[120px]">
                <div className="flex flex-col gap-[5px]">
                  <p className="text-[12px] leading-[18px] text-neutral-600 whitespace-nowrap">
                    Name
                  </p>
                  <h2 className="text-sm text-neutral-900 font-bold whitespace-nowrap">
                    {student.name}
                  </h2>
                </div>
                <div className="flex flex-col gap-[5px]">
                  <p className="text-[12px] leading-[18px] text-neutral-600 whitespace-nowrap">
                    Email
                  </p>
                  <h2 className="text-sm text-neutral-900 font-bold whitespace-nowrap">
                    {student.email}
                  </h2>
                </div>
                <div className="flex flex-col gap-[5px]">
                  <p className="text-[12px] leading-[18px] text-neutral-600 whitespace-nowrap">
                    Score
                  </p>
                  <h2 className="text-sm text-neutral-900 font-bold whitespace-nowrap">
                    {student.score.mark}/{student.score.total}
                  </h2>
                </div>

                <div className="flex flex-col gap-[5px]">
                  <p className="text-[12px] leading-[18px] text-neutral-600 whitespace-nowrap">
                    Status
                  </p>
                  <div className="w-[57px]">
                    <BorderHOC rounded="rounded-[100px]">
                      <div className="w-full flex items-center gap-1 justify-center bg-[#D1F9E7]">
                        <div className="w-[7px] h-[7px] rounded-full bg-[#128E55]"></div>
                        <span className="text-[12px] leading-[18px] font-semibold text-[#128E55]">
                          Pass
                        </span>
                      </div>
                    </BorderHOC>
                  </div>
                </div>
              </div>
            </div>
          </BorderHOC>
        </div>
      ))}
    </div>
  );
};

export default Participants;
