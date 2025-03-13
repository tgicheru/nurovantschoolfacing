import {
  Button,
  Divider,
  Drawer,
  Select,
  Spin,
  Upload,
  UploadProps,
} from "antd";
import React, { useEffect, useState } from "react";
import { LuUploadCloud } from "react-icons/lu";
import { BorderHOC } from "../BorderHOC";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useRecoilValue } from "recoil";
import authAtom from "../../atoms/auth/auth.atom";
import SearchableSelect from "../SearchableSelect";
import { useNavigate, useNavigation } from "react-router";
import { Icon } from "@iconify/react";
import {
  useGetAllFeedback,
  useGetCourseFeedback,
} from "../../hooks/feedback/feedback";
import { useSearchParams } from "react-router-dom";
// import { LoadingOutlined } from "@ant-design/icons";

type CreateCourseDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function removeSpacesFromPdfName(pdfName: string) {
  const trimmedName = pdfName.trim();
  return trimmedName.replace(/[^a-zA-Z0-9.]/g, "");
}

const studentData = {
  students: [
    { id: "1", name: "Freddie", grade: "F", color: "#FFB974" },
    { id: "2", name: "Alice", grade: "A", color: "#6CE9A6" },
    { id: "3", name: "Bob", grade: "B", color: "#FF8B8B" },
  ],
  totalCount: 21,
};

const FeedbackDrawer = ({ isOpen, onClose }: CreateCourseDrawerProps) => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const id = params.get("id");
  const width = window.innerWidth;
  const { user } = useRecoilValue(authAtom);
  const { students, totalCount } = studentData;
  const displayedStudents = students.slice(0, 3);
  const { data } = useGetCourseFeedback(id as string);
  const { data: allFeedback, isLoading: allFeedbackLoading } =
    useGetAllFeedback();
  console.log("allFeedback", allFeedback);

  return (
    <Spin spinning={allFeedbackLoading}>
      <Drawer
        open={isOpen}
        onClose={onClose}
        width={width <= 500 ? width : 512}
        styles={{
          header: {
            borderRadius: 20,
          },
        }}
        footer={false}
        style={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          marginTop: 20,
          marginRight: 20,
          boxShadow: "none",
          // boxShadow: undefined,
        }}
        maskClosable={true}
        // mask={false}
        maskClassName="!bg-[rgba(0,0,0,0.3)]"
        closeIcon={false}
        className=""
        // classNames={}
        rootClassName="!pr-[20px] !pt-[20px] !shadow-none "
      >
        <div className="w-full flex justify-between pb-6">
          <div className="flex gap-3">
            <div className="flex flex-col gap-[5px]">
              <h3 className="text-[24px] leading-[32px] font-bold text-neutral-900">
                Feedback Panel
              </h3>
            </div>
          </div>
          <button onClick={onClose} className="flex items-start pt-1">
            <IoCloseCircleOutline className="text-[24px] text-neutral-900" />
          </button>
        </div>
        <BorderHOC className="" />
        <div className="w-full pt-[20px] flex flex-col gap-3">
          {allFeedback?.data?.length > 0 ? (
            allFeedback?.data?.map((item: any, index: number) => (
              <BorderHOC rounded="rounded-[10px]" key={index}>
                <div
                  className="px-5 py-[19px] gap-[9px] cursor-pointer bg-[#E1E7FF]"
                  onClick={() => {
                    //   setSteps(1);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 flex-col">
                      <h5 className="text-[24px] leading-[20px] font-bold text-neutral-900">
                        Algebra 101
                      </h5>
                      <p className="text-sm font-semibold text-neutral-600">
                        Created : 11 Nov. 2024. 12:09PM
                      </p>
                    </div>

                    <div className="relative flex items-center">
                      {displayedStudents.map((student, index) => (
                        <div
                          key={student.id}
                          className={`relative ${index > 0 ? "-ml-3" : ""} z-${
                            30 - (index - 1) * 10
                          } flex items-center justify-center w-[28px] h-[28px] text-sm font-medium text-white rounded-full border-[2px] border-white`}
                          style={{ backgroundColor: student.color }}
                        >
                          {student.grade}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </BorderHOC>
            ))
          ) : (
            <div className="w-full flex items-center justify-center h-full">
              <div className="flex items-center justify-center flex-col gap-[15px] max-w-[198px]">
                <div className="flex flex-col items-center justify-center">
                  <Icon
                    icon="fluent:person-feedback-28-filled"
                    fontSize={28}
                    className="text-[108px] text-primary"
                  />
                  <span className="text-base font-bold text-neutral-900 text-center">
                    You do not have any feedback
                  </span>
                </div>

                <Button
                  onClick={() => {
                    // refetch();
                  }}
                  className="bg-primary !rounded-[1000px]"
                  type="primary"
                  size="large"
                  // loading={isLoading || isRefetching}
                >
                  Generate Feedback
                </Button>
              </div>
            </div>
          )}
        </div>
      </Drawer>
    </Spin>
  );
};

export default FeedbackDrawer;
