import React from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useNavigate } from "react-router";

const BackButton = ({ text }: { text: string }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex items-center gap-[5px] cursor-pointer"
      onClick={() => {
        navigate(-1);
      }}
    >
      <button className="flex items-start">
        <MdOutlineArrowBackIos className="text-[14px] text-neutral-900" />
      </button>
      <h2 className="text-sm font-bold text-neutral-900">{text}</h2>
    </div>
  );
};

export default BackButton;
