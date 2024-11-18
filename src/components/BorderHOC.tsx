import React from "react";

type IBorderHOC = {
  padding?: string;
  className?: string;
  children: React.ReactNode;
  rounded?: string;
};

export const BorderHOC = ({
  padding = "p-[1px]",
  className,
  children,
  rounded,
}: IBorderHOC) => {
  return (
    <div
      className={`w-full h-fit bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40] overflow-hidden ${className} ${padding} ${rounded}`}
    >
      <div className={`w-full h-fit bg-white ${rounded}`}>{children}</div>
    </div>
  );
};
