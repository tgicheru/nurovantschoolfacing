import React from "react";
import ChunkBox from "./ChunkBox";
import { BorderHOC } from "../../../../../../components";
import { useNavigate } from "react-router";

const MiniRecaps = ({ data }: any) => {
  const navigate = useNavigate();
  console.log({ miniRecaps: data });
  return (
    <>
      {data?.map((recaps: any, index: number) => (
        <div className="w-full flex flex-col gap-3" key={index}>
          <ChunkBox
            header={recaps?.title}
            text={recaps?.body}
            action={() => {
              navigate("/courses/lecture/recap/details");
            }}
          />
          {data.length - 1 !== index && <BorderHOC />}
        </div>
      ))}
    </>
  );
};

export default MiniRecaps;
