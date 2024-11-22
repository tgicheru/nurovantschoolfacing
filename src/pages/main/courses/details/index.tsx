import { Breadcrumb, Button, Modal } from "antd";
import DefaultBanner from "../../../../assets/default_banner.png";
import EmptyState from "../../../../assets/EmptyState.svg";
import React, { useState } from "react";
import { BorderHOC } from "../../../../components";
import { RiSearch2Line } from "react-icons/ri";
import { useNavigate } from "react-router";
import { RxDashboard } from "react-icons/rx";
import { GoRows } from "react-icons/go";
import { FaPlus } from "react-icons/fa";
import { FiUploadCloud } from "react-icons/fi";
import { BiBook } from "react-icons/bi";
import { PiBookOpenText, PiDotsThreeOutlineDuotone } from "react-icons/pi";
import { TbMessageQuestion, TbCards, TbFilterSearch } from "react-icons/tb";
import { BsRepeat } from "react-icons/bs";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

const CourseDetails = () => {
  const navigate = useNavigate();

  const course = {
    title: "Understanding Mathematics",
    createdAt: "Created 11 Nov, 2024 • 12:09PM",
    institution: "St. Calton High School",
    state: "Alabama",
    grade: "3-5 (Middle School)",
    image: DefaultBanner,
  };
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [isGridView, setIsGridView] = useState(true);
  const [lectures, setLectures] = useState<any[]>([]);

  const [isOpen, setIsOpen] = useState(true);
  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <Breadcrumb
        items={[
          {
            title: (
              <a href="/courses" className="hover:bg-none">
                Courses
              </a>
            ),
          },
          {
            title: <span className="">Understanding Mathematics</span>,
          },
        ]}
      />
      <div className="w-[581px] flex items-center gap-5">
        <div className="w-[186px] h-[140px] rounded-[10px] overflow-hidden">
          <img
            src={course.image}
            onLoadStart={() => {
              setIsLoadingImage(true);
            }}
            onLoad={() => {
              setIsLoadingImage(false);
            }}
            onError={(error) => {
              error.currentTarget.src = DefaultBanner;
              setIsLoadingImage(false);
            }}
            alt="business logo"
            className={`h-full w-full object-cover ${
              isLoadingImage ? "blur-sm" : ""
            }`}
          />
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <h2 className="text-[24px] leading-[32px] text-neutral-900 font-bold">
                {course.title}
              </h2>

              <button className="flex items-center justify-center">
                <PiDotsThreeOutlineDuotone className="text-[20px]" />
              </button>
            </div>
            <p className="text-sm text-neutral-600 font-medium">
              {course.createdAt}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-bold text-sm text-neutral-900">Institution</p>
              <p className="text-neutral-600 text-[12px] leading-[18px] font-medium">
                {course.institution}
              </p>
            </div>
            <div>
              <p className="font-bold text-sm text-neutral-900">State</p>
              <p className="text-neutral-600 text-[12px] leading-[18px] font-medium">
                {course.state}
              </p>
            </div>
            <div>
              <p className="font-bold text-sm text-neutral-900">Grade</p>
              <p className="text-neutral-600 text-[12px] leading-[18px] font-medium">
                {course.grade}
              </p>
            </div>
          </div>
        </div>
      </div>

      <BorderHOC className="" rounded="rounded-[10px]">
        <div className="w-full px-[15px] pt-[15px]">
          <div className="w-full pb-[10px]">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-1">
                <h1 className="text-neutral-900 text-[24px] leading-[32px] font-bold">
                  {lectures.length}
                </h1>
                <p className="text-sm font-semibold text-neutral-600">
                  Lecture(s)
                </p>
              </div>
              <div className="flex items-center gap-[10px] h-[40px]">
                <div
                  className="h-full flex items-center py-[8px] gap-[7px] px-3 cursor-pointer"
                  onClick={() => {}}
                >
                  <TbFilterSearch className="text-neutral-900 text-[24px]" />
                  <p className="text-sm font-bold text-neutral-900">Filter</p>
                </div>
                <BorderHOC className="h-full !w-[1px]" />
                <div className="w-[40px] flex items-center justify-center h-full">
                  <RiSearch2Line className="text-[24px]" />
                </div>
                <BorderHOC className="h-full !w-[1px]" />
                <div className="flex items-center gap-[5px] h-full">
                  <div
                    className={`w-[40px] flex items-center justify-center h-full rounded-[1000px] cursor-pointer ${
                      lectures.length && isGridView && "bg-[#E7E7E7]"
                    }`}
                    onClick={() => {
                      setIsGridView(true);
                    }}
                  >
                    <RxDashboard className="text-[24px]" />
                  </div>
                  <div
                    className={`w-[40px] flex items-center justify-center h-full rounded-[1000px] cursor-pointer ${
                      lectures.length && isGridView === false && "bg-[#E7E7E7]"
                    }`}
                    onClick={() => {
                      setIsGridView(false);
                    }}
                  >
                    <GoRows className="text-[24px]" />
                  </div>
                </div>
                <BorderHOC className="h-full !w-[1px]" />
                <Button
                  onClick={() => {
                    setIsOpen(true);
                  }}
                  className="bg-primary !rounded-[1000px]"
                  type="primary"
                  size="large"
                  icon={<FaPlus />}
                >
                  Create lecture
                </Button>
              </div>
            </div>
            <BorderHOC className="mt-[10px]" />
          </div>

          {lectures.length ? (
            <div className="w-full flex flex-col">
              {isGridView ? (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {lectures.map((lecture, idx) => (
                    <div
                      className="w-full cursor-pointer"
                      key={idx}
                      onClick={() => {
                        navigate("/courses/lecture");
                      }}
                    >
                      <BorderHOC className="" rounded="rounded-[10px]">
                        <div className=" p-4 w-full flex gap-4">
                          <div className="h-[50px] w-[50px]">
                            <BorderHOC rounded="rounded-[10px]">
                              <div className="h-[50px] w-[50px] flex-shrink-0 bg-[#FEEDD6] rounded-[10px] flex items-center justify-center">
                                <h5 className="text-[20px] leading-[30px] font-bold text-black">
                                  {lecture.title.charAt(0)}
                                </h5>
                              </div>
                            </BorderHOC>
                          </div>

                          <div className="w-full flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                              <div className="flex flex-col">
                                <h2 className="text-sm text-neutral-900 font-bold">
                                  {lecture.title}
                                </h2>
                                <p className="text-[12px] leading-[18px] text-neutral-600">
                                  {lecture.createdAt}
                                </p>
                              </div>

                              <button className="flex items-center justify-center">
                                <PiDotsThreeOutlineDuotone className="text-[20px]" />
                              </button>
                            </div>

                            <div className="w-full flex items-center justify-around">
                              <div className="w-[30px] h-[18px] flex items-center gap-[5px]">
                                <div className="h-[7px] w-[7px] rounded-full bg-primary"></div>
                                <PiBookOpenText />
                              </div>
                              <div className="w-[30px] h-[18px] flex items-center gap-[5px]">
                                <div className="h-[7px] w-[7px] rounded-full bg-[#F79009]"></div>
                                <TbMessageQuestion />
                              </div>
                              <div className="w-[30px] h-[18px] flex items-center gap-[5px]">
                                <div className="h-[7px] w-[7px] rounded-full bg-[#F79009]"></div>
                                <TbCards />
                              </div>
                              <div className="w-[30px] h-[18px] flex items-center gap-[5px]">
                                <div className="h-[7px] w-[7px] rounded-full bg-[#F79009]"></div>
                                <BsRepeat />
                              </div>
                              <div className="w-[30px] h-[18px] flex items-center gap-[5px]">
                                <div className="h-[7px] w-[7px] rounded-full bg-[#F79009]"></div>
                                <IoChatboxEllipsesOutline />
                              </div>
                            </div>
                          </div>
                        </div>
                      </BorderHOC>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col w-full gap-3 p-4">
                  {lectures.map((lecture, idx) => (
                    <div
                      className="w-full cursor-pointer"
                      key={idx}
                      onClick={() => {
                        navigate("/courses/lecture");
                      }}
                    >
                      <BorderHOC className="w-full" rounded="rounded-[10px]">
                        <div className="flex items-center gap-4 px-4 py-[10px]">
                          <div className="h-[50px] w-[50px]">
                            <BorderHOC rounded="rounded-[10px]">
                              <div className="h-[50px] flex-shrink-0 bg-[#FEEDD6] rounded-[10px] flex items-center justify-center">
                                <h5 className="text-[20px] leading-[30px] font-bold text-black">
                                  {lecture.title.charAt(0)}
                                </h5>
                              </div>
                            </BorderHOC>
                          </div>
                          <div className="flex items-center justify-around flex-1 gap-4">
                            <div className="flex flex-col gap-[5px]">
                              <h2 className="text-sm text-neutral-900 font-bold whitespace-nowrap">
                                {lecture.title}
                              </h2>
                              <p className="text-[12px] leading-[18px] text-neutral-600 whitespace-nowrap">
                                {lecture.createdAt}
                              </p>
                            </div>
                            <div>
                              <div className="flex items-center gap-1">
                                <PiBookOpenText />
                                <p className="font-bold text-sm text-neutral-900">
                                  Lesson Plan
                                </p>
                              </div>
                              <div className="flex items-center gap-1">
                                <div className="h-[7px] w-[7px] rounded-full bg-primary"></div>
                                <p className="text-neutral-600 text-[12px] leading-[18px] font-medium">
                                  Created
                                </p>
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center gap-1">
                                <TbMessageQuestion />
                                <p className="font-bold text-sm text-neutral-900">
                                  Quiz
                                </p>
                              </div>
                              <div className="flex items-center gap-1">
                                <div className="h-[7px] w-[7px] rounded-full bg-[#F79009]"></div>
                                <p className="text-neutral-600 text-[12px] leading-[18px] font-medium">
                                  Not Created
                                </p>
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center gap-1">
                                <TbCards />
                                <p className="font-bold text-sm text-neutral-900">
                                  Flashcards
                                </p>
                              </div>
                              <div className="flex items-center gap-1">
                                <div className="h-[7px] w-[7px] rounded-full bg-[#F79009]"></div>
                                <p className="text-neutral-600 text-[12px] leading-[18px] font-medium">
                                  Not Created
                                </p>
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center gap-1">
                                <BsRepeat />
                                <p className="font-bold text-sm text-neutral-900">
                                  Recap
                                </p>
                              </div>
                              <div className="flex items-center gap-1">
                                <div className="h-[7px] w-[7px] rounded-full bg-[#F79009]"></div>
                                <p className="text-neutral-600 text-[12px] leading-[18px] font-medium">
                                  Not Created
                                </p>
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center gap-1">
                                <IoChatboxEllipsesOutline />
                                <p className="font-bold text-sm text-neutral-900">
                                  Discuss
                                </p>
                              </div>
                              <div className="flex items-center gap-1">
                                <div className="h-[7px] w-[7px] rounded-full bg-[#F79009]"></div>
                                <p className="text-neutral-600 text-[12px] leading-[18px] font-medium">
                                  Not Created
                                </p>
                              </div>
                            </div>
                            <button className="flex items-center justify-center">
                              <PiDotsThreeOutlineDuotone className="text-[20px]" />
                            </button>
                          </div>
                        </div>
                      </BorderHOC>
                    </div>
                  ))}
                </div>
              )}
              <BorderHOC className="mt-[10px]" />
              <div className="flex items-center h-[60px] justify-between text-sm text-gray-600">
                <p className="text-sm text-neutral-900">Page 1 of 10</p>
                <div className="flex items-center gap-4">
                  <button className="">
                    <BorderHOC className="w-full" rounded="rounded-[1000px]">
                      <div className="py-[10px] w-[106px] flex items-center justify-center">
                        <span className="text-[#344054] text-sm">Previous</span>
                      </div>
                    </BorderHOC>
                  </button>

                  <button className="">
                    <BorderHOC className="w-full" rounded="rounded-[1000px]">
                      <div className="py-[10px] w-[80px] flex items-center justify-center">
                        <span className="text-[#344054] text-sm">Next</span>
                      </div>
                    </BorderHOC>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full flex items-center justify-center py-[72px]">
              <div className="flex items-center justify-center flex-col gap-[15px] max-w-[198px]">
                <div className="flex flex-col items-center justify-center">
                  <img src={EmptyState} alt="empty courses" />
                  <span className="text-base font-bold text-neutral-900 text-center">
                    You don’t have any lecture created yet
                  </span>
                </div>

                <Button
                  onClick={() => {}}
                  className="bg-primary !rounded-[1000px]"
                  type="primary"
                  size="large"
                  icon={<FaPlus />}
                >
                  Create lecture
                </Button>
              </div>
            </div>
          )}
        </div>
      </BorderHOC>

      {/* create lecture modal >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
      <Modal onCancel={onClose} closeIcon={false} footer={false} open={isOpen}>
        <div className="w-full pb-[10px]">
          <div className="flex flex-col gap-[5px]">
            <h3 className="text-[24px] leading-[32px] font-bold text-neutral-900">
              Create Lecture
            </h3>
            <p className="text-sm font-semibold text-neutral-600 max-w-[293px">
              {`Let's get you all set up by creating your first class.`}
            </p>
          </div>
        </div>
        <BorderHOC className="" />
        <div className="w-full pt-[50px] flex flex-col gap-5">
          <BorderHOC rounded="rounded-[10px]">
            <div
              className="px-5 py-[19px] gap-[9px] cursor-pointer"
              onClick={() => {
                setLectures((prev) => [
                  ...prev,
                  {
                    title: "Algebra",
                    createdAt: "Created 11 Nov, 2024 • 12:09PM",
                  },
                ]);
                onClose();
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-[30px] h-[30px] rounded-[7px] bg-[#6D326D] flex items-center justify-center">
                  <BiBook className="text-[18px] text-white transform scale-x-[-1]" />
                </div>
                <h5 className="text-base font-bold text-neutral-900">
                  Create a new lecture
                </h5>
              </div>
              <p className="text-sm font-semibold text-neutral-600 mt-2">
                Create a lecture for your students
              </p>
            </div>
          </BorderHOC>

          <BorderHOC rounded="rounded-[10px]">
            <div className="px-5 py-[19px] gap-[9px] cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-[30px] h-[30px] rounded-[7px] bg-[#368F8B] flex items-center justify-center">
                  <FiUploadCloud className="text-white" />
                </div>
                <h5 className="text-base font-bold text-neutral-900">
                  Create lectures with your calender
                </h5>
              </div>
              <p className="text-sm font-semibold text-neutral-600 mt-2">
                Import your school calender to create lectures
              </p>
            </div>
          </BorderHOC>
        </div>
      </Modal>
    </div>
  );
};

export default CourseDetails;
