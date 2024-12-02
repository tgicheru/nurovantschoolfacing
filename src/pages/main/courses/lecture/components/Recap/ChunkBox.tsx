import React from "react";

type ChunkBoxType = {
  header: string;
  text: string;
  action: () => void;
};

const ChunkBox = ({ header, text, action }: ChunkBoxType) => {
  return (
    <div className="w-full flex flex-col gap-[10px]">
      <h3 className="text-[20px] leading-[30px] font-bold text-neutral-900">
        {header}
      </h3>
      <p className="text-sm font-semibold text-neutral-700">{text}</p>
      <div className="flex items-center justify-center w-full py-[10px]">
        <button onClick={action} className="text-sm">
          View full chunk
        </button>
      </div>
    </div>
  );
};

export default ChunkBox;
