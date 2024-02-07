import { CustomButton } from "../../components";
import AuthContainer from "../../components/AuthContainer";
import { useState } from "react";
import { useUpdateInformation } from "../../hooks/auth/authentications";

const HeaderText = ({ text }: { text: string }) => (
  <h3 className="text-[16px] leading-[24px] lg:text-[20px] lg:leading-[42px] tracking-[-0.4px] font-semibold text-[#646462]">
    {text}
  </h3>
);
function AuthPage() {
  const { mutate } = useUpdateInformation();

  const [teachingExperience, setTeachingExperience] = useState<string>("0-1");
  const [similarApp, setSimilarApp] = useState<string>("yes");
  const [communication, setCommunication] = useState<string>("email");

  const [selected, setSelected] = useState<number>(0);
  const [selected2, setSelected2] = useState<number>(0);
  const [selected3, setSelected3] = useState<number>(0);

  const handleSubmit = () => {
    mutate({
      experience: teachingExperience,
      application: similarApp,
      communication: communication,
    } as any);
  };

  return (
    <AuthContainer>
      <div className="w-full h-screen font-montserrat flex items-center justify-center py-6 lg:py-0">
        <div className="flex flex-col items-start w-full px-4 lg:px-[48px] text-[#1b1b1b] gap-5 lg:gap-[40px]">
          <div className="flex flex-col gap-4">
            <h1 className="text-[28px] lg:leading-[48px] tracking-[-0.56px] font-bold">
              General Information
            </h1>
            <span className="">{`Answer only a few questions and we’ll adapt  the platform to you needs`}</span>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 lg:gap-0">
              <HeaderText text="How many years of teaching experience do you have?" />
              <div className="flex items-center gap-4">
                {["0-1", "2-4", ">5"].map((item, index: number) => (
                  <div
                    className={`flex items-center justify-center px-4 py-4 rounded-[16px] border cursor-pointer ${
                      selected === index
                        ? "border-primary bg-[#c2cffe]"
                        : "border-[#e0e0e0]"
                    }`}
                    key={index}
                    onClick={() => {
                      setSelected(index);
                      setTeachingExperience(item);
                    }}
                  >
                    <span
                      className={`${
                        selected === index ? "text-primary" : "text-[#838382]"
                      } font-medium text-[14px] lg:text-[16px]`}
                    >
                      {item} {index === 0 ? "year" : "years"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <HeaderText text="How you used any similar teacher-facing applications before?" />
              <div className="flex items-center gap-4">
                {["Yes", "No"].map((item, index: number) => (
                  <div
                    className={`flex items-center justify-center p-4 rounded-[16px] border cursor-pointer ${
                      selected2 === index
                        ? "border-primary bg-[#c2cffe]"
                        : "border-[#e0e0e0]"
                    }`}
                    key={index}
                    onClick={() => {
                      setSelected2(index);
                      setSimilarApp(item.toLowerCase());
                    }}
                  >
                    <span
                      className={`${
                        selected2 === index ? "text-primary" : "text-[#838382]"
                      } font-medium text-[14px] lg:text-[16px]`}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <HeaderText text="How do you prefer to communicate?" />
              <div className="flex items-center gap-4">
                {["Email", "Message", "Video Call"].map(
                  (item, index: number) => (
                    <div
                      className={`flex items-center justify-center p-4 rounded-[16px] border cursor-pointer ${
                        selected3 === index
                          ? "border-primary bg-[#c2cffe]"
                          : "border-[#e0e0e0]"
                      }`}
                      key={index}
                      onClick={() => {
                        setSelected3(index);
                        setCommunication(item.toLowerCase());
                      }}
                    >
                      <span
                        className={`${
                          selected3 === index
                            ? "text-primary"
                            : "text-[#838382]"
                        } font-medium text-[14px] lg:text-[16px]`}
                      >
                        {item}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <CustomButton
            text="Get Started"
            onClick={() => {
              handleSubmit();
            }}
          />
        </div>
      </div>
    </AuthContainer>
  );
}

export default AuthPage;
