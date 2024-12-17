import React from "react";

type ContentHeaderProps = {
  headerText: string;
  subText: string;
  marginBottom?: string;
};

export const ContentHeader = ({
  headerText,
  subText,
  marginBottom = "mb-[25px]",
}: ContentHeaderProps) => {
  return (
    <div className={`flex flex-col gap-[5px] ${marginBottom}`}>
      <h1 className="text-neutral-900 text-[24px] leading-[32px] font-bold">
        {headerText}
      </h1>
      <p className="text-sm font-semibold text-neutral-600">{subText}</p>
    </div>
  );
};
