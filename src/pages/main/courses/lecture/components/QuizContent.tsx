import { Button, Form, Input, message } from "antd";
import React from "react";
import { WiStars } from "react-icons/wi";
import { BorderHOC } from "../../../../../components";
import { PiDotsThreeOutlineDuotone } from "react-icons/pi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useLocation, useNavigate, useParams } from "react-router";
import EmptyState from "../../../../../assets/EmptyState.svg";
import { RiFileCopy2Line } from "react-icons/ri";
import { BsQrCodeScan } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";
import { usePostQuiz } from "../../../../../hooks/quiz/quiz";
import { format, parseISO } from "date-fns";

export const TruncatedText = ({
  text,
  limit,
  className = "",
}: {
  text: string;
  limit: number;
  className?: string;
}) => {
  // Check if text length exceeds limit
  const truncatedText =
    text.length > limit ? `${text.slice(0, limit)}...` : text;

  return <span className={className}>{truncatedText}</span>;
};

const QuizContent = ({
  isGridView,
  data,
}: {
  isGridView: boolean;
  data: any;
}) => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const lecture_id = params.get("id");
  const url = `https://app.nurovant.com/page/quiz/?id=${data?.quiz?._id}`;
  const { pathname } = useLocation();
  const dataArray = data?.quiz ? [data?.quiz] : [];

  const { mutate: postQuizAction, isLoading: postQuizLoad } = usePostQuiz(
    (res: any) => {
      message.success("Quiz created successfully");
      navigate(`/courses/lecture/quiz?id=${res?.data?._id}`);
    }
  );

  const handleCopy = () => {
    message.success("Copied to clipboard");
    navigator.clipboard.writeText(url);
  };
  return (
    <div>
      {dataArray?.length ? (
        <div className="w-full flex flex-col">
          {isGridView ? (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {dataArray?.map((quiz: any, idx) => (
                <div
                  className="w-full cursor-pointer"
                  key={idx}
                  onClick={() => {
                    navigate(`${pathname}/quiz?id=${quiz._id}`);
                  }}
                >
                  <BorderHOC className="" rounded="rounded-[10px]">
                    <div className=" p-4 w-full flex flex-col gap-4 ">
                      <div className="flex w-full items-center justify-between">
                        <div className="h-[50px] w-[50px]">
                          <BorderHOC rounded="rounded-[10px]">
                            <div className="h-[50px] w-[50px] flex-shrink-0 bg-[#FDDBDB] rounded-[10px] flex items-center justify-center">
                              <h5 className="text-[24px] leading-[30px] font-bold text-black">
                                <IoDocumentTextOutline className="text-[]" />
                              </h5>
                            </div>
                          </BorderHOC>
                        </div>

                        <button className="flex items-center justify-center">
                          <PiDotsThreeOutlineDuotone className="text-[20px]" />
                        </button>
                      </div>
                      <div className="w-full flex items-center justify-between">
                        <div className="flex flex-col">
                          <h2 className="text-sm text-neutral-900 font-bold">
                            {data?.title} Quiz
                          </h2>
                          <p className="text-[12px] leading-[18px] text-neutral-600">
                            {quiz?.createdAt &&
                              quiz?.createdAt &&
                              format(
                                parseISO(quiz?.createdAt),
                                "dd MMM, yyyy • hh:mma"
                              )}
                          </p>
                        </div>
                        <BsQrCodeScan />
                      </div>
                    </div>
                  </BorderHOC>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col w-full gap-3 p-4">
              {dataArray?.map((quiz: any, idx) => (
                <div
                  className="w-full cursor-pointer"
                  key={idx}
                  onClick={() => {
                    navigate(`${pathname}/quiz?id=${quiz._id}`);
                  }}
                >
                  <BorderHOC className="w-full" rounded="rounded-[10px]">
                    <div className="flex items-center gap-4 px-4 py-[10px]">
                      <div className="h-[50px] w-[50px]">
                        <BorderHOC rounded="rounded-[10px]">
                          <div className="h-[50px] flex-shrink-0 bg-[#FDDBDB] rounded-[10px] flex items-center justify-center">
                            <h5 className="text-[24px] leading-[30px] font-bold text-black">
                              <IoDocumentTextOutline className="text-[]" />
                            </h5>
                          </div>
                        </BorderHOC>
                      </div>
                      <div className="flex items-center justify-between flex-1 gap-4">
                        <div className="flex items-center flex-1 gap-[50px]">
                          <div className="flex flex-col gap-[5px]">
                            <h2 className="text-sm text-neutral-900 font-bold whitespace-nowrap">
                              {data?.title} Quiz
                            </h2>
                            <p className="text-[12px] leading-[18px] text-neutral-600 whitespace-nowrap">
                              {quiz?.createdAt &&
                                quiz?.createdAt &&
                                format(
                                  parseISO(quiz?.createdAt),
                                  "dd MMM, yyyy • hh:mma"
                                )}
                            </p>
                          </div>
                          <div className="flex flex-col gap-[5px]">
                            <h2 className="text-sm text-neutral-900 font-bold whitespace-nowrap">
                              {"Students"}
                            </h2>
                            <p className="text-[12px] leading-[18px] text-neutral-600 whitespace-nowrap">
                              -- --
                            </p>
                          </div>
                          <div className="flex flex-col">
                            <h2 className="text-sm text-neutral-900 font-bold whitespace-nowrap">
                              Invitation Link
                            </h2>

                            <div className="w-[324px] h-[28px] flex items-center gap-[5px]">
                              <BorderHOC rounded="rounded-[7px]" className="">
                                <div className="h-[28px] w-full bg-white flex overflow-hidden rounded-[7px]">
                                  <div className="h-full w-full pl-[10px] pr-[2px] py-[5px] flex items-center">
                                    <TruncatedText
                                      className="text-[12px] leading-[18px] font-bold text-neutral-900"
                                      text={url}
                                      limit={30}
                                    />
                                  </div>
                                  <BorderHOC className="h-full !w-[1px]" />
                                  <button
                                    className="h-full bg-[#F5F5F5] p-[5px] flex items-center gap-[5px]"
                                    onClick={() => {
                                      handleCopy();
                                    }}
                                  >
                                    <RiFileCopy2Line className="text-[16px]" />
                                    <span className="text-[12px] leading-[18px] font-bold text-black">
                                      copy
                                    </span>
                                  </button>
                                </div>
                              </BorderHOC>

                              <button
                                className="w-[34px] h-[28px]"
                                onClick={() => {}}
                              >
                                <BorderHOC rounded="rounded-[5px]">
                                  <div className="h-[28px] w-[34px] flex-shrink-0  rounded-[5px] flex items-center justify-center py-[6px] px-[9px]">
                                    {/* <QRCode
                                      value={"https://ant.design/" || "-"}
                                      size={16}
                                    /> */}
                                    <BsQrCodeScan />
                                  </div>
                                </BorderHOC>
                              </button>
                            </div>
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
        </div>
      ) : (
        <div className="w-full flex items-center justify-center py-[72px]">
          <div className="flex items-center justify-center flex-col gap-[15px] max-w-[198px]">
            <div className="flex flex-col items-center justify-center">
              <img src={EmptyState} alt="empty courses" />
              <span className="text-base font-bold text-neutral-900 text-center">
                You do not have any quiz created yet
              </span>
            </div>

            <Button
              onClick={() => {
                postQuizAction({ lecture_id, duration: "30" });
              }}
              className="bg-primary !rounded-[1000px]"
              type="primary"
              size="large"
              loading={postQuizLoad}
              icon={<WiStars className="text-[34px]" />}
            >
              Generate quiz
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizContent;
