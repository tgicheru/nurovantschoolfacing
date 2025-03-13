import React from "react";
import ChunkBox from "./ChunkBox";
import { BorderHOC } from "../../../../../../components";
import { useNavigate } from "react-router";

const OverallRecaps = ({ data }: any) => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col gap-3">
      <ChunkBox
        header={data?.title}
        text={data?.body}
        action={() => {
          navigate("/courses/lecture/recap/details");
        }}
      />
      <BorderHOC />
    </div>
  );
};

export default OverallRecaps;
