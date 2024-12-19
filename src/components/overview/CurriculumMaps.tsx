import { useState } from "react";
import DefaultBanner from "../../assets/default_banner.png";
import EmptyState from "../../assets/EmptyState.svg";

import CreateCourseDrawer from "../course/CreateCourseDrawer";
import { BorderHOC } from "../BorderHOC";
import { useGetCourses } from "../../hooks/courses/courses";
import { RxDashboard } from "react-icons/rx";
import { GoRows } from "react-icons/go";
import { Button } from "antd";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router";
import { PiDotsThreeOutlineDuotone } from "react-icons/pi";

const CurriculumMaps = () => {
  const navigate = useNavigate();
  const course = {
    title: "Understanding Mathematics",
    createdAt: "11 Nov, 2024 • 12:09PM",
    institution: "St. Calton High School",
    state: "Alabama",
    grade: "3-5 (Middle School)",
    image: DefaultBanner,
  };

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
    // setSteps(0);
  };

  const {
    data: getCoursesData,
    refetch: getCoursesFetch,
    isLoading: getCoursesLoad,
  } = useGetCourses({});
  // console.log(getCoursesData);

  const onOpen = () => setIsOpen(true);

  const [isGridView, setIsGridView] = useState(true);
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  return (
    <div>
      <BorderHOC className="" rounded="rounded-[10px]">
        <div className="w-full px-[15px] py-[15px]">
          <div className="w-full pb-[10px]">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-1">
                <p className="text-sm font-semibold text-neutral-600">
                  Curriculum Maps
                </p>
              </div>
              <div className="flex items-center gap-[10px] h-[40px]">
                <div className="flex items-center gap-[5px] h-full">
                  <div
                    className={`w-[40px] flex items-center justify-center h-full rounded-[1000px] cursor-pointer ${
                      getCoursesData?.data?.length &&
                      isGridView &&
                      "bg-[#E7E7E7]"
                    }`}
                    onClick={() => {
                      setIsGridView(true);
                    }}
                  >
                    <RxDashboard className="text-[24px]" />
                  </div>
                  <div
                    className={`w-[40px] flex items-center justify-center h-full rounded-[1000px] cursor-pointer ${
                      getCoursesData?.data?.length &&
                      isGridView === false &&
                      "bg-[#E7E7E7]"
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
                  onClick={onOpen}
                  className="bg-primary !rounded-[1000px]"
                  type="primary"
                  size="large"
                  icon={<FaPlus />}
                >
                  Create course
                </Button>
              </div>
            </div>
            <BorderHOC className="mt-[10px]" />
          </div>

          {getCoursesData?.data?.length ? (
            <div className="w-full flex flex-col">
              {isGridView ? (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {getCoursesData?.data
                    ?.slice(0, 3)
                    .map((course: any, idx: number) => (
                      <div
                        className="w-full cursor-pointer"
                        key={idx}
                        onClick={() => {
                          navigate(`/courses/details?type=mapped`);
                        }}
                      >
                        <BorderHOC className="" rounded="rounded-[10px]">
                          <div className="space-y-4 p-4 w-full">
                            <div className="w-full rounded-[10px] overflow-hidden">
                              <img
                                src={course.course_image}
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
                                className={`h-[93px] w-full object-cover ${
                                  isLoadingImage ? "blur-sm" : ""
                                }`}
                              />
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex flex-col gap-[5px]">
                                <h2 className="text-sm text-neutral-900 font-bold">
                                  {course.title}
                                </h2>
                                <p className="text-[12px] leading-[18px] text-neutral-600">
                                  {course.createdAt}
                                </p>
                              </div>

                              <button className="flex items-center justify-center">
                                <PiDotsThreeOutlineDuotone className="text-[20px]" />
                              </button>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="font-bold text-sm text-neutral-900">
                                  Institution
                                </p>
                                <p className="text-neutral-600 text-[12px] leading-[18px] font-medium">
                                  {course.institution}
                                </p>
                              </div>
                              <div>
                                <p className="font-bold text-sm text-neutral-900">
                                  State
                                </p>
                                <p className="text-neutral-600 text-[12px] leading-[18px] font-medium">
                                  {course.state}
                                </p>
                              </div>
                              <div>
                                <p className="font-bold text-sm text-neutral-900">
                                  Grade
                                </p>
                                <p className="text-neutral-600 text-[12px] leading-[18px] font-medium">
                                  {course.grade}
                                </p>
                              </div>
                            </div>
                          </div>
                        </BorderHOC>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="flex flex-col w-full gap-3 p-4">
                  {getCoursesData?.data
                    ?.slice(0, 3)
                    ?.map((course: any, idx: number) => (
                      <div
                        className="w-full cursor-pointer"
                        key={idx}
                        onClick={() => {
                          navigate("/courses/details");
                        }}
                      >
                        <BorderHOC className="w-full" rounded="rounded-[10px]">
                          <div className="flex items-center gap-4 px-4 py-[10px]">
                            <div className="w-[98px] rounded-[10px] overflow-hidden">
                              <img
                                src={course.course_image}
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
                                className={`h-[53px] w-full object-cover ${
                                  isLoadingImage ? "blur-sm" : ""
                                }`}
                              />
                            </div>
                            <div className="flex items-center justify-around flex-1 gap-4">
                              <div className="flex flex-col gap-[5px]">
                                <h2 className="text-sm text-neutral-900 font-bold whitespace-nowrap">
                                  {course.title}
                                </h2>
                                <p className="text-[12px] leading-[18px] text-neutral-600 whitespace-nowrap">
                                  {course.createdAt}
                                </p>
                              </div>
                              <div>
                                <p className="font-bold text-sm text-neutral-900">
                                  Students
                                </p>
                                <p className="text-neutral-600 text-[12px] leading-[18px] font-medium">
                                  -- --
                                </p>
                              </div>
                              <div>
                                <p className="font-bold text-sm text-neutral-900">
                                  Grade
                                </p>
                                <p className="text-neutral-600 text-[12px] leading-[18px] font-medium">
                                  {course.grade}
                                </p>
                              </div>
                              <div>
                                <p className="font-bold text-sm text-neutral-900">
                                  State
                                </p>
                                <p className="text-neutral-600 text-[12px] leading-[18px] font-medium">
                                  {course.state}
                                </p>
                              </div>
                              <div>
                                <p className="font-bold text-sm text-neutral-900">
                                  Institution
                                </p>
                                <p className="text-neutral-600 text-[12px] leading-[18px] font-medium">
                                  {course.institution}
                                </p>
                              </div>
                            </div>
                          </div>
                        </BorderHOC>
                      </div>
                    ))}
                </div>
              )}
            </div>
          ) : (
            <div className="w-full flex items-center justify-center py-[72px]">
              <div className="flex items-center justify-center flex-col gap-[15px] max-w-[198px]">
                <div className="flex flex-col items-center justify-center">
                  <img src={EmptyState} alt="empty courses" />
                  <span className="text-base font-bold text-neutral-900 text-center">
                    You don’t have any course created yet
                  </span>
                </div>

                <Button
                  onClick={onOpen}
                  className="bg-primary !rounded-[1000px]"
                  type="primary"
                  size="large"
                  icon={<FaPlus />}
                >
                  Create course
                </Button>
              </div>
            </div>
          )}
        </div>
      </BorderHOC>

      {/* Create Course Drawer >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
      <CreateCourseDrawer
        isOpen={isOpen}
        onClose={onClose}
        refetch={getCoursesFetch}
      />
    </div>
  );
};

export default CurriculumMaps;
