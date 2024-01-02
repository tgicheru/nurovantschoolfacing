import { CustomButton } from "../../components";
import { Link } from "react-router-dom";
import AuthContainer from "../../components/AuthContainer";
import { useState } from "react";

function AuthPage() {
  const [selected, setSelected] = useState<number>(0);
  const [selected2, setSelected2] = useState<number>(0);
  const [selected3, setSelected3] = useState<number>(0);

  return (
    <AuthContainer>
      <div className="w-full h-full font-montserrat flex items-center justify-center">
        <div className="flex flex-col items-start w-full px-[48px] text-[#1b1b1b] gap-[40px]">
          <div className="flex flex-col gap-4">
            <h1 className="text-[28px] leading-[48px] tracking-[-0.56px] font-bold">
              General Information
            </h1>
            <span className="">{`Answer only a few questions and we’ll adapt  the platform to you needs`}</span>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <h3 className="text-[20px] leading-[42px] tracking-[-0.4px] font-semibold text-[#646462]">
                How many years of teaching experience do you have?
              </h3>
              <div className="flex items-center gap-4">
                {["0 - 1 year", "2 - 4 years", ">5 years"].map(
                  (item, index: number) => (
                    <div
                      className={`flex items-center justify-center p-4 rounded-[16px] border cursor-pointer ${
                        selected === index
                          ? "border-primary bg-[#c2cffe]"
                          : "border-[#e0e0e0]"
                      }`}
                      key={index}
                      onClick={() => setSelected(index)}
                    >
                      <span
                        className={`${
                          selected === index ? "text-primary" : "text-[#838382]"
                        } font-medium`}
                      >
                        {item}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <h3 className="text-[20px] leading-[42px] tracking-[-0.4px] font-semibold text-[#646462]">
                How you used any similar teacher-facing applications before?
              </h3>
              <div className="flex items-center gap-4">
                {["Yes", "No"].map((item, index: number) => (
                  <div
                    className={`flex items-center justify-center p-4 rounded-[16px] border cursor-pointer ${
                      selected2 === index
                        ? "border-primary bg-[#c2cffe]"
                        : "border-[#e0e0e0]"
                    }`}
                    key={index}
                    onClick={() => setSelected2(index)}
                  >
                    <span
                      className={`${
                        selected2 === index ? "text-primary" : "text-[#838382]"
                      } font-medium`}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              <h3 className="text-[20px] leading-[42px] tracking-[-0.4px] font-semibold text-[#646462]">
                How do you prefer to communicate?
              </h3>
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
                      onClick={() => setSelected3(index)}
                    >
                      <span
                        className={`${
                          selected3 === index
                            ? "text-primary"
                            : "text-[#838382]"
                        } font-medium`}
                      >
                        {item}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <CustomButton text="Get Started" onClick={() => {}} />
        </div>
      </div>
    </AuthContainer>
  );
}

export default AuthPage;
