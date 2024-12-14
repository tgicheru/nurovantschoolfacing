import { Button, message, Progress, QRCode } from "antd";
import React, { useState } from "react";
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

// Define the type for our topic data
interface Topic {
  name: string;
  progress: number;
  color: string;
}

// Sample data

const DiscussContent = ({ data }: { data: any[] }) => {
  const navigate = useNavigate();
  const [topics, setTopics] = useState<Topic[]>([
    { name: "Algebraic expressions", progress: 50, color: "#FF9F43" },
    { name: "Equations", progress: 75, color: "#28C76F" },
    { name: "Graphing", progress: 20, color: "#00CFE8" },
    { name: "Problem solving", progress: 59, color: "#5A4AE3" },
    { name: "Functions", progress: 35, color: "#FF4B4B" },
    { name: "Arithmetic", progress: 70, color: "#9C27B0" },
  ]);

  // set all the topics data progress to 0
  const resetTopics = () => {
    setTopics(
      topics.map((topic) => {
        return { ...topic, progress: 0 };
      })
    );
  };

  const url = `https://app.nurovant.com/page/quiz/?id=673b06f088793a2c42ede9ec`;

  const handleCopy = () => {
    message.success("Copied to clipboard");
    navigator.clipboard.writeText(url);
  };
  return (
    <div>
      {data.length ? (
        <div className="w-full flex flex-col">
          <div className="flex flex-col w-full gap-6 py-4">
            <div className="flex flex-col gap-[5px]">
              <h2
                className="text-sm font-bold text-neutral-900"
                onClick={() => {
                  resetTopics();
                }}
              >
                Analysis Breakdown
              </h2>
              <p
                className="text-sm font-medium text-neutral-500"
                onClick={() => {
                  setTopics([
                    {
                      name: "Algebraic expressions",
                      progress: 50,
                      color: "#FF9F43",
                    },
                    { name: "Equations", progress: 75, color: "#28C76F" },
                    { name: "Graphing", progress: 20, color: "#00CFE8" },
                    { name: "Problem solving", progress: 59, color: "#5A4AE3" },
                    { name: "Functions", progress: 35, color: "#FF4B4B" },
                    { name: "Arithmetic", progress: 70, color: "#9C27B0" },
                  ]);
                }}
              >
                This chart shows the common questions and misconceptions
                experienced by students.{" "}
              </p>
            </div>
            <div
              className="w-full flex flex-col"
              onClick={() => {
                // navigate("/courses/lecture/discuss");
              }}
            >
              {topics.map((topic, index: number) => (
                <div className="w-full" key={index}>
                  <BorderHOC className="py-[0.5px] px-0">
                    <div className="border border-[#FBFBFB] flex items-center h-[70px]">
                      <span className="w-[110px]">{topic.name}</span>
                      <BorderHOC
                        className="!w-[0.5px] h-full mr-4"
                        padding="p-[0.5px]"
                      />
                      <div className="border-l border-l-[#FBFBFB] flex h-full items-center w-full">
                        <Progress
                          percent={topic.progress}
                          strokeColor={topic.color}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </BorderHOC>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex items-center justify-center py-[72px]">
          <div className="flex items-center justify-center flex-col gap-[15px] max-w-[198px]">
            <div className="flex flex-col items-center justify-center">
              <img src={EmptyState} alt="empty courses" />
              <span className="text-base font-bold text-neutral-900 text-center">
                You do not have any Chat Bot Analysis yet
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
