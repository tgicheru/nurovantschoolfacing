import React from "react";
import { BorderHOC } from "../../../../../../components";
import { Collapse, CollapseProps } from "antd";
import { MdArrowForwardIos } from "react-icons/md";

const QuizQuestions = () => {
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <span className="text-sm font-semibold text-neutral-900">
          1. What is the main inspiration for the proposed mobile app design?
        </span>
      ),
      children: (
        <div className="border-t border-t-[#E5E5E5] w-full pt-5 flex flex-col gap-[10px] relative">
          <h4 className="text-sm font-bold text-neutral-900">Option:</h4>
          <ol className="list-decimal pl-6">
            {[
              "A popular e-commerce website",
              "A social media platform",
              "A ride-hailing service",
              "A home-sharing and experience platform",
            ].map((item, index) => (
              <li key={index} className="text-sm text-neutral-900">
                {item}
              </li>
            ))}
          </ol>
          <div>
            <h4 className="text-sm font-bold text-neutral-900">Answer:</h4>
            <span className="text-sm text-neutral-900">
              A home-sharing and experience platform
            </span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full flex flex-row gap-5">
      <div className="w-[300px] min-w-[29%]">
        <BorderHOC className="" rounded="rounded-[10px]">
          <div className="flex flex-col gap-5 px-[15px] py-[10px]">
            <h2 className="text-[20px] leading-[30px] font-bold text-[#161617]">
              Key Topics
            </h2>
            <ul className="list-disc pl-4 flex flex-col gap-[14px]">
              {[
                "Bottom menu with icons",
                "Multiple listings before checkout",
                "Property information",
                "Merchant information popups",
                "Homepage with category based listings",
                "Minimalist style",
              ].map((item, index) => (
                <li
                  key={index}
                  className="text-sm text-neutral-900 font-semibold"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </BorderHOC>
      </div>
      <div className="min-w-[776px] w-full">
        <BorderHOC rounded="rounded-[10px]">
          <div className="w-full h-[526px] overflow-y-auto flex flex-col gap-5 px-[15px] py-[10px]">
            <h2 className="text-[20px] leading-[30px] font-bold text-[#161617]">
              Questions
            </h2>
            <Collapse
              bordered={false}
              items={items}
              ghost
              expandIcon={({ isActive }) => (
                <div className="w-6 h-6 rounded-[50px] border border-neutral-900 flex items-center justify-center">
                  <MdArrowForwardIos
                    className={`${isActive ? "rotate-90" : ""}`}
                  />
                </div>
              )}
              style={{
                borderRadius: "10px",
                border: "1px solid #E5E5E5",
              }}
              //   className="!border !border-neutral-900"
              expandIconPosition="right"
            />

            <Collapse
              bordered={false}
              items={items}
              ghost
              expandIcon={({ isActive }) => (
                <div className="w-6 h-6 rounded-[50px] border border-neutral-900 flex items-center justify-center">
                  <MdArrowForwardIos
                    className={`${isActive ? "rotate-90" : ""}`}
                  />
                </div>
              )}
              style={{
                borderRadius: "10px",
                border: "1px solid #E5E5E5",
              }}
              //   className="!border !border-neutral-900"
              expandIconPosition="right"
            />

            <Collapse
              bordered={false}
              items={items}
              ghost
              expandIcon={({ isActive }) => (
                <div className="w-6 h-6 rounded-[50px] border border-neutral-900 flex items-center justify-center">
                  <MdArrowForwardIos
                    className={`${isActive ? "rotate-90" : ""}`}
                  />
                </div>
              )}
              style={{
                borderRadius: "10px",
                border: "1px solid #E5E5E5",
              }}
              //   className="!border !border-neutral-900"
              expandIconPosition="right"
            />

            <Collapse
              bordered={false}
              items={items}
              ghost
              expandIcon={({ isActive }) => (
                <div className="w-6 h-6 rounded-[50px] border border-neutral-900 flex items-center justify-center">
                  <MdArrowForwardIos
                    className={`${isActive ? "rotate-90" : ""}`}
                  />
                </div>
              )}
              style={{
                borderRadius: "10px",
                border: "1px solid #E5E5E5",
              }}
              //   className="!border !border-neutral-900"
              expandIconPosition="right"
            />
          </div>
        </BorderHOC>
      </div>
    </div>
  );
};

export default QuizQuestions;
