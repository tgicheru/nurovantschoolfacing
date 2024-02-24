/* eslint-disable react-hooks/exhaustive-deps */
import AuthContainer from "../../components/AuthContainer";
import { useEffect, useMemo, useState } from "react";
import { useUpdateInformation } from "../../hooks/auth/authentications";
import { useRecoilValue } from "recoil";
import authAtom from "../../atoms/auth/auth.atom";
import { isEqual } from "../../context/utils";
import { Button } from "antd";

function AuthPage() {
  const { user } = useRecoilValue(authAtom);
  const { isLoading, mutate } = useUpdateInformation();

  const [info, setInfo] = useState([
    {
      value: "",
      index: "experience",
      key: "teaching_experience",
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
      key: "prefered_communication",
      label: "How do you prefer to communicate? ",
      options: [["Email", "email"], ["Message", "message"], ["Video Call", "video_call"]],
    },
  ])

  const isNewUser = useMemo(() => !info?.some(d => d?.value), [info])
  useMemo(() => setInfo(info?.map(d => ({...d, value: user?.info?.[d?.key] || d?.value}))), [user])

  const handleSelect = (key: string, val: string) => setInfo(info?.map(d => ({...d, value: isEqual(d?.key, key) ? val : d?.value})))

  const handleSubmit = () => {
    const payload = Object.fromEntries(info?.map(d => ([d?.index, d?.value]))) 
    mutate(payload);
  };

  const HeaderText = ({ text }: { text: string }) => (
    <h3 className="text-[16px] leading-[24px] lg:text-[20px] lg:leading-[42px] tracking-[-0.4px] font-semibold text-[#646462]">
      {text}
    </h3>
  );
  return (
    <AuthContainer>
      <div className="w-full h-screen font-montserrat flex items-center justify-center py-6 lg:py-0">
        <div className="flex flex-col items-start w-full px-4 lg:px-[48px] text-[#1b1b1b] gap-5 lg:gap-[40px]">
          <div className="flex flex-col gap-4">
            <h1 className="text-[28px] lg:leading-[48px] tracking-[-0.56px] font-bold">
              General Information
            </h1>
            <span className="">Answer only a few questions and we’ll adapt  the platform to you needs</span>
          </div>

          <div className="flex flex-col gap-6">
            {info?.map(({key, label, options, value}) => (
              <div key={key} className="flex flex-col gap-2 lg:gap-0">
                <HeaderText text={label} />
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

          <Button
            size="large"
            type="primary"
            shape="round"
            loading={isLoading}
            onClick={handleSubmit}
            className="w-full md:w-[50%] bg-primary !h-[60px]"
          >{isNewUser ? "Get Started" : "Continue"}</Button>
        </div>
      </div>
    </AuthContainer>
  );
}

export default AuthPage;
