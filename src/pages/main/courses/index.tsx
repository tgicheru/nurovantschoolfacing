import { Button, Spin } from "antd";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { BorderHOC, ContentHeader } from "../../../components";
import { TbFilterSearch } from "react-icons/tb";
import { RiSearch2Line } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { GoRows } from "react-icons/go";
import { useNavigate } from "react-router";
import EmptyState from "../../../assets/EmptyState.svg";
import { PiDotsThreeOutlineDuotone } from "react-icons/pi";
import { useGetCourses } from "../../../hooks/courses/courses";
import DefaultBanner from "../../../assets/default_banner.png";
import CreateCourseDrawer from "../../../components/course/CreateCourseDrawer";

const Home = () => {
  const width = window.innerWidth;
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
    // setSteps(0);
  };

  const {
    data: getCoursesData,
    refetch: getCoursesFetch,
    isLoading: getCoursesLoad,
  } = useGetCourses({ limit, page });
  // console.log(getCoursesData);

  const onOpen = () => setIsOpen(true);

  const [isGridView, setIsGridView] = useState(true);
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  return (
    <Spin spinning={getCoursesLoad}>
      <div className="w-full h-full min-h-screen md:pb-5 space-y-5 my-6">
        <ContentHeader
          headerText={`Courses 📚`}
          subText={`Organize and manage your lecture materials.`}
        />

        <BorderHOC className="" rounded="rounded-[10px]">
          <div className="w-full px-[15px] pt-[15px]">
            <div className="w-full pb-[10px]">
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <h1 className="text-neutral-900 text-[24px] leading-[32px] font-bold">
                    {getCoursesData?.data?.length}
                  </h1>
                  <p className="text-sm font-semibold text-neutral-600">
                    Course
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
                    {getCoursesData?.data?.map((course: any, idx: number) => (
                      <div
                        className="w-full cursor-pointer"
                        key={idx}
                        onClick={() => {
                          navigate("/courses/details");
                        }}
                      >
                        <BorderHOC className="" rounded="rounded-[10px]">
                          <div className="space-y-4 p-4 w-full">
                            <div className="w-full rounded-[10px] overflow-hidden">
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
                    {getCoursesData?.data?.map((course: any, idx: number) => (
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
                <BorderHOC className="mt-[10px]" />
                <div className="flex items-center h-[60px] justify-between text-sm text-gray-600">
                  <p className="text-sm text-neutral-900">Page 1 of 10</p>
                  <div className="flex items-center gap-4">
                    <button className="">
                      <BorderHOC className="w-full" rounded="rounded-[1000px]">
                        <div className="py-[10px] w-[106px] flex items-center justify-center">
                          <span className="text-[#344054] text-sm">
                            Previous
                          </span>
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
        <CreateCourseDrawer isOpen={isOpen} onClose={onClose} />
      </div>
    </Spin>
  );
};

export default Home;
