import WelcomeLogo from "../../assets/WelcomeLogo.svg";

export const SuccessModal = () => {
  return (
    <div className="flex flex-col gap-2 items-center bg-white w-full md:w-[530px] rounded-[8px] p-[24px] md:p-[32px] text-black">
      <img src={WelcomeLogo} alt="welcome logo" />

      <h1 className="text-[32px] leading-[44px] tracking-[-0.64px] font-bold text-[#1b1b1b]">
        Success
      </h1>
      <p className="text-[14px] leading-[24px]">Your Quiz have been saved!</p>
      <div className="w-full flex items-center justify-center p-2">
        <span className="cursor-pointer text-primary font-medium text-[18px] tracking-[-0.3px]">
          View Quiz
        </span>
      </div>
    </div>
  );
};
