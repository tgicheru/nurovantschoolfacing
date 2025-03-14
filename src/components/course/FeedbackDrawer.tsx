import { Button, Drawer, Spin } from "antd";
import { useState } from "react";
import { BorderHOC } from "../BorderHOC";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useRecoilValue } from "recoil";
import authAtom from "../../atoms/auth/auth.atom";
import { useNavigate } from "react-router";
import { Icon } from "@iconify/react";
import { useGetAllFeedback } from "../../hooks/feedback/feedback";
import { useSearchParams } from "react-router-dom";
import FeedbackDetailView from "./FeedbackDetailView";

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
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);
  const { data: allFeedback, isLoading: allFeedbackLoading } =
    useGetAllFeedback();

  const handleFeedbackClick = (feedback: any) => {
    setSelectedFeedback(feedback);
  };

  const handleBack = () => {
    setSelectedFeedback(null);
  };

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
        }}
        maskClosable={true}
        maskClassName="!bg-[rgba(0,0,0,0.3)]"
        closeIcon={false}
        rootClassName="!pr-[20px] !pt-[20px] !shadow-none"
      >
        {selectedFeedback ? (
          <FeedbackDetailView
            feedback={selectedFeedback}
            onClose={onClose}
            onBack={handleBack}
          />
        ) : (
          <>
            <div className="w-full flex justify-between pb-6">
              <div className="flex gap-3">
                <div className="flex flex-col gap-[5px]">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[24px] leading-[32px] font-bold text-neutral-900">
                      Feedback Panel
                    </h3>
                    <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm">
                      {allFeedback?.data?.length || 0}
                    </span>
                  </div>
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
                      className="px-5 py-[19px] gap-[9px] cursor-pointer bg-[#E1E7FF] hover:bg-[#D3DCFF] transition-colors"
                      onClick={() => handleFeedbackClick(item)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1 flex-col">
                          <h5 className="text-[24px] leading-[20px] font-bold text-neutral-900">
                            {item?.lecture?.title}
                          </h5>
                          <p className="text-sm font-semibold text-neutral-600">
                            Created:{" "}
                            {new Date(item.createdAt).toLocaleString("en-US", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </p>
                        </div>

                        <div className="relative flex items-center">
                          {displayedStudents.map((student, index) => (
                            <div
                              key={student.id}
                              className={`relative ${
                                index > 0 ? "-ml-3" : ""
                              } z-[${
                                30 - index * 10
                              }] flex items-center justify-center w-[28px] h-[28px] text-sm font-medium text-white rounded-full border-[2px] border-white`}
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
                    >
                      Generate Feedback
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </Drawer>
    </Spin>
  );
};

export default FeedbackDrawer;
