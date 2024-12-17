import React from "react";
import CourseTable from "../../../../components/course/CourseTable";
import { BorderHOC } from "../../../../components";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { Button } from "antd";

const CourseImport = () => {
  return (
    <div>
      <div className="w-full flex flex-col gap-[25px]">
        <div className="w-full flex flex-1 items-center">
          <div className="flex items-center gap-1">
            <button onClick={() => {}} className="flex items-start">
              <MdOutlineArrowBackIos className="text-[20px] text-primary" />
            </button>
            <span className="text-primary text-sm">Back</span>
          </div>
          <div className="w-full flex items-center justify-center">
            <h3 className="text-[24px] leading-[32px] font-bold text-neutral-900">
              Select Course to Import
            </h3>
          </div>
        </div>
        <BorderHOC />
      </div>
      <CourseTable />

      <Button
        // disabled={!upldFile?.file}

        // loading={createCourseLoad}
        onClick={() => {
          // navigate("/courses/import");
        }}
        className="bg-primary !w-[144px] !h-[48px] "
        type="primary"
        size="large"
        shape="round"
      >
        Continue
      </Button>
    </div>
  );
};

export default CourseImport;
