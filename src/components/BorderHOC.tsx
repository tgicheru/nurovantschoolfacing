import React from "react";

type IBorderHOC = {
  padding?: string;
  rounded?: string;
  className?: string;
  childClass?: string;
  children?: React.ReactNode;
};

export const BorderHOC = ({
  padding = "p-[1px]",
  childClass,
  className,
  children,
  rounded,
}: IBorderHOC) => {
  return (
    <div
      className={`w-full h-fit bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40] overflow-hidden bg-opacity-75 ${className} ${padding} ${rounded}`}
    >
      <div className={`w-full h-fit bg-white ${rounded} ${childClass}`}>{children}</div>
    </div>
  );
};
