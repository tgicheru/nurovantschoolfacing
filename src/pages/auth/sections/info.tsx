/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState } from "react";
import { isEqual } from "../../../context/utils";
import { Button } from "antd";

function InformationSection({
  payload,
  handleNext,
}:{ payload?: any; handleNext: any }) {
  const [info, setInfo] = useState([
    {
      value: "",
      index: "experience",
      key: "years_of_experience",
      label: "How many years of teaching experience do you have?",
      options: [["0 - 1 year", "0-1"], ["2 - 4 years", "2-4"], ["> 5 years", ">5"]],
    },
    {
      value: "",
      index: "application",
      key: "used_similar_app",
      options: [["Yes", "yes"], ["No", "no"]],
      label: "Have you used any similar teacher-facing applications before?",
    },
    {
      value: "",
      index: "communication",
      key: "communication_method",
      label: "How do you prefer to communicate? ",
      options: [["Email", "email"], ["Message", "message"], ["Video Call", "video_call"], ["Voice Call", "voice_call"]],
    },
  ])

  useMemo(() => setInfo(info?.map(d => ({...d, value: payload?.[d?.key] || d?.value}))), [payload])

  const handleSelect = (key: string, val: string) => setInfo(info?.map(d => ({...d, value: isEqual(d?.key, key) ? val : d?.value})))
  const handleSubmit = () => handleNext(Object.fromEntries(info?.map(d => ([d?.key, d?.value]))));

  const isEnabled = info?.every(d => d?.value)
  return (
    <div className='flex flex-col justify-center items-center text-center gap-3'>
      <p className='text-2xl font-semibold text-[#1B1B1B]'>General Information</p>
      <p className='text-sm font-normal text-[#1B1B1B]'>Answer only a few questions and we’ll adapt  the platform to you needs</p>

      <div className="flex flex-col gap-5">
        {info?.map(({key, label, options, value}) => (
          <div key={key} className="w-full space-y-3 !text-start">
            <p className="text-lg font-semibold text-[#646462]">{label}</p>
            <div className="flex items-center gap-4">
              {options?.map(([idx, val]) => {
                const isChecked = isEqual(value, val)
                const handleOption = () => handleSelect(key, val)
                return (
                <div className={`flex items-center justify-center px-4 py-4 rounded-[16px] border cursor-pointer 
                  ${isChecked ? " border-primary bg-[#c2cffe]" : " border-[#e0e0e0]"}`}
                  onClick={handleOption}
                  key={idx}
                >
                  <span className={`${isChecked ? "text-primary" : "text-[#838382]"} font-medium text-[14px] lg:text-[16px]`}>
                    {idx}
                  </span>
                </div>
              )})}
            </div>
          </div>
        ))}
      </div>

      <Button onClick={handleSubmit} disabled={!isEnabled} className="bg-primary !h-[50px] my-5" size="large" block type="primary" shape="round">Next</Button>
    </div>
  );
}

export default InformationSection;
