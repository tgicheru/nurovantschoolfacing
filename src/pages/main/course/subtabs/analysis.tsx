import React, { useState } from 'react'
import { BorderHOC } from '../../../../components';
import { Button, Progress } from 'antd';
import EmptyDisplay from '../../../../components/EmptyDisplay';
import { LuPlus } from 'react-icons/lu';


interface Topic {
  name: string;
  progress: number;
  color: string;
}

function QuizResultAnalysisTab({ data }: { data: any }) {
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

  return (
    <div className='w-full'>
      <EmptyDisplay className='w-full h-[50vh]'>
        <Button className='!text-sm !font-bold bg-[#4970FC]' icon={<LuPlus className='text-xl' />} size='large' type='primary' shape='round'>Generate analysis</Button>
      </EmptyDisplay>

      <div hidden>
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
      </div>
    </div>
  )
}

export default QuizResultAnalysisTab