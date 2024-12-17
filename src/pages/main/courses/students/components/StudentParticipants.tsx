import { useNavigate } from "react-router";
import { BorderHOC } from "../../../../../components";
import { useState } from "react";
import PerformanceDrawer from "./PerformanceDrawer";

const StudentParticipants = () => {
  const navigate = useNavigate();
  const data: {
    name: string;
    email: string;
  }[] = [
    {
      name: "Peter Olugbenga",
      email: "Olasunkanmifinesse@gmail.com",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
    // setSteps(0);
  };
  return (
    <div className="flex flex-col w-full gap-3 p-4">
      {data.map((student: any, idx) => (
        <div className="w-full cursor-pointer" key={idx} onClick={() => {}}>
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

                <div className="flex w-full flex-1 items-center justify-end">
                  <span
                    className="text-sm font-bold cursor-pointer"
                    onClick={() => {
                      setIsOpen(true);
                    }}
                  >
                    View Performance
                  </span>
                </div>
              </div>
            </div>
          </BorderHOC>
        </div>
      ))}

      <PerformanceDrawer isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default StudentParticipants;
