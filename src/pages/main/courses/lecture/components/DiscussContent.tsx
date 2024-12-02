import { Button, message, QRCode } from "antd";
import React from "react";
import { WiStars } from "react-icons/wi";
import { BorderHOC } from "../../../../../components";
import { PiBookOpenText, PiDotsThreeOutlineDuotone } from "react-icons/pi";
import { TbCards, TbMessageQuestion } from "react-icons/tb";
import { BsRepeat } from "react-icons/bs";
import {
  IoChatboxEllipsesOutline,
  IoDocumentTextOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router";
import EmptyState from "../../../../../assets/EmptyState.svg";
import { RiFileCopy2Line } from "react-icons/ri";
import { TruncatedText } from "./QuizContent";

const DiscussContent = ({
  isGridView,
  data,
}: {
  isGridView: boolean;
  data: any[];
}) => {
  const navigate = useNavigate();

  const url = `https://app.nurovant.com/page/quiz/?id=673b06f088793a2c42ede9ec`;

  const handleCopy = () => {
    message.success("Copied to clipboard");
    navigator.clipboard.writeText(url);
  };
  return (
    <div>
      {data.length ? (
        <div className="w-full flex flex-col">
          {isGridView ? (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.map((lecture: any, idx) => (
                <div
                  className="w-full cursor-pointer"
                  key={idx}
                  onClick={() => {
                    navigate("/courses/lecture/discuss");
                  }}
                >
                  <BorderHOC className="" rounded="rounded-[10px]">
                    <div className=" p-4 w-full flex flex-col gap-4 ">
                      <div className="flex w-full items-center justify-between">
                        <div className="h-[50px] w-[50px]">
                          <BorderHOC rounded="rounded-[10px]">
                            <div className="h-[50px] w-[50px] flex-shrink-0 bg-[#FDDBDB] rounded-[10px] flex items-center justify-center">
                              <h5 className="text-[24px] leading-[30px] font-bold text-black">
                                <IoDocumentTextOutline className="text-[]" />
                              </h5>
                            </div>
                          </BorderHOC>
                        </div>

                        <button className="flex items-center justify-center">
                          <PiDotsThreeOutlineDuotone className="text-[20px]" />
                        </button>
                      </div>
                      <div className="flex flex-col">
                        <h2 className="text-sm text-neutral-900 font-bold">
                          {"Algebra 101 Discuss"}
                        </h2>
                        <p className="text-[12px] leading-[18px] text-neutral-600">
                          {lecture.createdAt}
                        </p>
                      </div>
                    </div>
                  </BorderHOC>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col w-full gap-3 p-4">
              {data.map((lecture: any, idx) => (
                <div
                  className="w-full cursor-pointer"
                  key={idx}
                  onClick={() => {
                    navigate("/courses/lecture/discuss");
                  }}
                >
                  <BorderHOC className="w-full" rounded="rounded-[10px]">
                    <div className="flex items-center gap-4 px-4 py-[10px]">
                      <div className="h-[50px] w-[50px]">
                        <BorderHOC rounded="rounded-[10px]">
                          <div className="h-[50px] flex-shrink-0 bg-[#FDDBDB] rounded-[10px] flex items-center justify-center">
                            <h5 className="text-[24px] leading-[30px] font-bold text-black">
                              <IoDocumentTextOutline className="text-[]" />
                            </h5>
                          </div>
                        </BorderHOC>
                      </div>
                      <div className="flex items-center justify-between flex-1 gap-4">
                        <div className="flex flex-col gap-[5px]">
                          <h2 className="text-sm text-neutral-900 font-bold whitespace-nowrap">
                            {"Algebra 101 Discuss"}
                          </h2>
                          <p className="text-[12px] leading-[18px] text-neutral-600 whitespace-nowrap">
                            {lecture.createdAt}
                          </p>
                        </div>

                        <button className="flex items-center justify-center">
                          <PiDotsThreeOutlineDuotone className="text-[20px]" />
                        </button>
                      </div>
                    </div>
                  </BorderHOC>
                </div>
              ))}
            </div>
          )}
          {/* <BorderHOC className="mt-[10px]" />
          <div className="flex items-center h-[60px] justify-between text-sm text-gray-600">
            <p className="text-sm text-neutral-900">Page 1 of 10</p>
            <div className="flex items-center gap-4">
              <button className="">
                <BorderHOC className="w-full" rounded="rounded-[1000px]">
                  <div className="py-[10px] w-[106px] flex items-center justify-center">
                    <span className="text-[#344054] text-sm">Previous</span>
                  </div>
                </BorderHOC>
              </button>

              <button className="">
                <BorderHOC className="w-full" rounded="rounded-[1000px]">
                  <div className="py-[10px] w-[80px] flex items-center justify-center">
                    <span className="text-[#344054] text-sm">Next</span>
                  </div>
                </BorderHOC>
              </button>
            </div>
          </div> */}
        </div>
      ) : (
        <div className="w-full flex items-center justify-center py-[72px]">
          <div className="flex items-center justify-center flex-col gap-[15px] max-w-[198px]">
            <div className="flex flex-col items-center justify-center">
              <img src={EmptyState} alt="empty courses" />
              <span className="text-base font-bold text-neutral-900 text-center">
                You do not have any discuss created yet
              </span>
            </div>

            <Button
              onClick={() => {}}
              className="bg-primary !rounded-[1000px]"
              type="primary"
              size="large"
              icon={<WiStars className="text-[30px]" />}
            >
              Generate Discuss
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscussContent;
