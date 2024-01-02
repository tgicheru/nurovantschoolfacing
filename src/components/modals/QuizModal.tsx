export const QuizModal = () => {
  return (
    <div className="flex flex-col gap-2 items-center bg-white w-full md:w-[530px] rounded-[24px] p-[24px] md:p-[32px] lg:py-[48px] text-black font-montserrat">
      <h1 className="text-[32px] leading-[44px] tracking-[-0.64px] font-bold text-[#1b1b1b]">
        Import Document
      </h1>
      <div className="w-full py-4 px-6 rounded-[8px] border border-[#eaecf0] flex flex-col gap-2">
        <img />

        <div className="flex flex-col items-center text-[#a2a2a1]">
          <span className="text-[14px] leading-[20px]">
            <span className="text-primary font-medium">Click to upload</span> or
            drag and drop
          </span>
          <span className="text-[12px] leading-[18px]">
            SVG, PNG, JPG or GIF (max. 800x400px)
          </span>
        </div>
      </div>
    </div>
  );
};
