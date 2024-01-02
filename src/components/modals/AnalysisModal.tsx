import Spinner from "../../assets/spinner.svg";

export const AnalysisModal = () => {
  return (
    <div className="flex flex-col gap-2 items-center bg-white w-full md:w-[530px] rounded-[8px] p-[24px] md:p-[32px] text-black font-montserrat">
      <img src={Spinner} alt="welcome logo" />

      <h1 className="text-[32px] leading-[44px] tracking-[-0.64px] font-bold text-[#1b1b1b]">
        Analyzing your content
      </h1>
      <p className="text-[14px] leading-[24px]">
        Please hold on while we analyze your content{" "}
      </p>
    </div>
  );
};
