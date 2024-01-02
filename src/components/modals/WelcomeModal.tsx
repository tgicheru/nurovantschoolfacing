import WelcomeLogo from "../../assets/WelcomeLogo.svg";

export const WelcomeModal = () => {
  return (
    <div className="flex flex-col gap-2 items-center bg-white w-full md:w-[530px] rounded-[8px] p-[24px] md:p-[32px] text-black">
      <img src={WelcomeLogo} alt="welcome logo" />

      <h1 className="text-[32px] leading-[44px] tracking-[-0.64px] font-bold text-[#1b1b1b]">
        Welcome
      </h1>
      <p className="text-[14px] leading-[24px]">Here's your dashboard</p>
      <div className="w-full flex items-center justify-center p-2">
        <span className="cursor-pointer text-primary font-bold text-[18px] tracking-[-0.3px]">
          Done
        </span>
      </div>
    </div>
  );
};
