import React from "react";
import { LuSearch } from "react-icons/lu";

export const UploadedDocuments = () => {
  return (
    <div className="bg-white px-4 py-8 flex flex-col gap-[22px] rounded-[8px] w-full lg:w-[317px] h-fit">
      <h2 className="text-[#414141] font-semibold text-[18px] leading-[27px]">
        Uploaded Documents
      </h2>
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex items-center gap-3 bg-[#F5F5F5] py-4 px-2 rounded-[8px]">
          <LuSearch size={20} className="cursor-pointer" onClick={() => {}} />
          <input
            type="text"
            placeholder="Search your files here"
            className="outline-none focus:ring-0 bg-inherit text-[14px] leading-[20px]"
          />
        </div>
      </div>
    </div>
  );
};
