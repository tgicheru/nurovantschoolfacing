import { Button } from "antd";
import React from "react";
import { LiaShareAltSolid } from "react-icons/lia";
import { useNavigate } from "react-router";

type ShareCoureButtonProps = {};

const ShareCourseButton = ({}: ShareCoureButtonProps) => {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        // disabled={!upldFile?.file}

        // loading={createCourseLoad}
        onClick={() => {
          navigate("/courses?type=mapped");
        }}
        className="bg-[#E1E7FF] hover:!bg-[#E1E7FF] !w-[154px] !h-[40px] flex items-center justify-center gap-2"
        type="primary"
        size="large"
        shape="round"
      >
        <span className="text-primary">Share Course</span>
        <LiaShareAltSolid className="text-primary text-[20px] flex-shrink-0" />
      </Button>
    </div>
  );
};

export default ShareCourseButton;
