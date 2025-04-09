import { Breadcrumb, Button, Spin, Tabs, Tag } from "antd";
import React, { useState } from "react";
import { BorderHOC } from "../../../../components";
import { PiBookOpenText, PiDotsThreeOutlineDuotone } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { GoRows } from "react-icons/go";
import { TbCards, TbMessageQuestion } from "react-icons/tb";
import { BsRepeat } from "react-icons/bs";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import EmptyState from "../../../../assets/EmptyState.svg";
import { WiStars } from "react-icons/wi";
import { useNavigate } from "react-router";
import LessonPlanContent from "./components/LessonPlanContent";
import QuizContent from "./components/QuizContent";
import FlashCardsContent from "./components/FlashCardsContent";
import RecapContent from "./components/RecapContent";
import DiscussContent from "./components/DiscussContent";
import { useSearchParams } from "react-router-dom";
import { CiViewList } from "react-icons/ci";
import AWS from "aws-sdk";
import { Modal, Upload, Checkbox, ConfigProvider } from "antd";
import {
  DownloadOutlined,
  UploadOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import type { UploadProps } from "antd";
import router from "../../../../router";
import {
  useGeneratePacingGuide,
  useGetLectureById,
  usePostPacingGuide,
} from "../../../../hooks/lecture/lecture";
import { parseISO, format } from "date-fns";
import CreativeAssessmentContent from "./components/CreativeAssessmentContent";
import { Icon } from "@iconify/react";
import authAtom from "../../../../atoms/auth/auth.atom";
import { useRecoilValue } from "recoil";
import { LuUploadCloud } from "react-icons/lu";

export const LabelComponent = ({
  isActive,
  label,
  icon,
  length,
}: {
  isActive: boolean;
  label: string;
  icon?: React.ReactNode;
  length?: number;
}) => {
  return (
    <div className="flex justify-center px-[9px] h-[39px]">
      <div className="flex flex-row gap-[5px] items-center">
        {icon}
        <p
          className={`text-sm  ${
            isActive
              ? "text-primary font-bold"
              : "text-neutral-400 font-semibold"
          }`}
        >
          {label}
        </p>
        {length ? (
          <Tag
            className={`!bg-lit !border-0 h-6 w-6 rounded-[100px] flex items-center justify-center ${
              isActive ? "!bg-[#E1E7FF] text-primary" : "text-neutral-400"
            }`}
          >
            {length}
          </Tag>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

const LectureDetail = () => {
  const navigate = useNavigate();
  const { user } = useRecoilValue(authAtom);
  const [param, setParam] = useSearchParams();
  const id = param.get("id");

  const {
    data: lectureData,
    isLoading,
    refetch,
    isError,
    error,
  } = useGetLectureById({ id });
  // console.log(lectureData);

  const [isGridView, setIsGridView] = React.useState(true);
  const [data, setData] = React.useState([
    {
      title: "Algebra",
      createdAt: "Created 11 Nov, 2024 • 12:09PM",
    },
  ]);
  const [activeTab, setActiveTab] = React.useState(
    param.get("tab") || "lesson-plan"
  );

  const {
    data: pacingGuideData,
    isLoading: isPacingGuideLoading,
    isRefetching: isPacingGuideRefetching,
    refetch: pacingGuideRefetch,
    isSuccess: isPacingGuideSuccess,
  } = useGeneratePacingGuide(
    {
      lecture_id: id as string,
    },
    (res: any) => {
      console.log("res", res);
      if (res?.data?.success) {
        navigate("/courses/lecture/curriculum-alignment");
      }
    }
  );

  const { mutate: createPacingGuide, isLoading: createPacingGuideLoading } =
    usePostPacingGuide((res: any) => {
      console.log("res", res);
      handleContinue();
    });

  const tabs = React.useMemo(
    () => [
      {
        key: "lesson-plan",
        // column: lectureColumns,
        data: lectureData?.lesson_plan,
        label: (isActive: boolean) => (
          <LabelComponent
            isActive={isActive}
            label="Lesson Plan"
            icon={
              <PiBookOpenText
                className={`${isActive ? "text-primary" : "text-neutral-400"}`}
              />
            }
            length={lectureData?.lesson_plan !== null ? 1 : 0}
          />
        ),
        content: (
          <LessonPlanContent
            data={lectureData}
            isGridView={isGridView}
            lectureRefetch={refetch}
          />
        ),
      },
      {
        key: "quiz",
        // column: quizColumns,
        data: lectureData?.quiz,
        label: (isActive: boolean) => (
          <LabelComponent
            isActive={isActive}
            label="Quiz"
            icon={
              <TbMessageQuestion
                className={`${isActive ? "text-primary" : "text-neutral-400"}`}
              />
            }
            length={lectureData?.quiz !== null ? 1 : 0}
          />
        ),
        content: <QuizContent data={lectureData} isGridView={isGridView} />,
      },
      {
        key: "flash-cards",
        // column: flashcardColumns,
        data: lectureData?.flash_card,
        label: (isActive: boolean) => (
          <LabelComponent
            isActive={isActive}
            label="Flash Cards"
            icon={
              <TbCards
                className={`${isActive ? "text-primary" : "text-neutral-400"}`}
              />
            }
            length={lectureData?.flash_card !== null ? 1 : 0}
          />
        ),
        content: (
          <FlashCardsContent data={lectureData} isGridView={isGridView} />
        ),
      },
      {
        key: "recaps",
        // column: recapColumns,
        data: data,
        label: (isActive: boolean) => (
          <LabelComponent
            isActive={isActive}
            label="Recaps"
            icon={
              <BsRepeat
                className={`${isActive ? "text-primary" : "text-neutral-400"}`}
              />
            }
            length={lectureData?.recap !== null ? 1 : 0}
          />
        ),
        content: <RecapContent data={lectureData} isGridView={isGridView} />,
      },
      {
        key: "analysis",
        // column: discussColumns,
        data: data,
        label: (isActive: boolean) => (
          <LabelComponent
            isActive={isActive}
            label="Chat Bot Analysis"
            icon={
              <IoChatboxEllipsesOutline
                className={`${isActive ? "text-primary" : "text-neutral-400"}`}
              />
            }
            length={data?.length}
          />
        ),
        content: <DiscussContent data={data} />,
      },
      {
        key: "creative-assessment",
        // column: discussColumns,
        data: data,
        label: (isActive: boolean) => (
          <LabelComponent
            isActive={isActive}
            label="Creative Assessment"
            icon={
              <CiViewList
                className={`${isActive ? "text-primary" : "text-neutral-400"}`}
              />
            }
            length={lectureData?.creative_assessment !== null ? 1 : 0}
          />
        ),
        content: (
          <CreativeAssessmentContent
            data={lectureData}
            isGridView={isGridView}
            lectureRefetch={refetch}
          />
        ),
      },
    ],
    [data, isGridView, lectureData]
  );

  const handleTab = (tab: string) => {
    setParam({ tab, id: id as string });
    setActiveTab(tab);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [upldFile, setUpldFile] = useState<any>({});

  const handleAWSUpload = (blob: any) => {
    setIsUploadLoading(true);
    AWS.config.update({
      accessKeyId: process.env["REACT_APP_AWS_ACCESS_KEY_ID"],
      secretAccessKey: process.env["REACT_APP_AWS_SECRET_ACCESS_KEY"],
      // region: process.env["REACT_APP_AWS_REGION"],
      region: "us-east-2",
    });

    // Specify the bucket and key (object key) for the upload
    const uploadParams = {
      Bucket: process.env["REACT_APP_S3_BUCKET"]!,
      Key: `${new Date()
        .toLocaleTimeString([], { hour12: false })
        .split(":")
        .join("_")}--${user?._id}`, // You can customize the key based on your requirement
      Body: blob,
      ContentType: blob.type,
    };

    const s3 = new AWS.S3();

    // Upload the file
    s3.upload(
      uploadParams,
      (err: Error | null, data: AWS.S3.ManagedUpload.SendData | undefined) => {
        if (err) {
          console.error("Error uploading file", err);
          setIsUploadLoading(false);
        } else {
          console.log("File uploaded successfully", data);

          setUrl(data?.Location as string);
          setIsUploadLoading(false);
        }
      }
    );
  };

  const [url, setUrl] = useState("");
  const [isUploadLoading, setIsUploadLoading] = useState(false);

  const uploadProps: UploadProps = {
    name: "file",
    multiple: false,
    directory: false,
    method: undefined,
    accept: ".pdf, .svg, .png, .jpg, .jpeg",
    showUploadList: false,
    className: "!w-full md:!w-[80%]",
    onChange({ file }: { file: Blob | any }) {
      setUpldFile({
        file: file?.originFileObj,
        fileobj: file,
      });

      console.log(file?.originFileObj);

      if (file?.originFileObj) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          // Create a Blob from the loaded data
          if (e.target?.result instanceof ArrayBuffer) {
            const audioBlob = new Blob([e.target.result], { type: file.type });
            // setAudioBlob(audioBlob);

            handleAWSUpload(audioBlob);
          }

          // Do something with the Blob, such as sending it to a server or processing it
          //   console.log(audioBlob);
        };

        // Read the content of the file as a data URL
        reader.readAsArrayBuffer(file?.originFileObj);
      }
    },
  };

  const handleContinue = async () => {
    setIsModalOpen(false); // Close the modal
    router.call("/courses/lecture/curriculumAlignment"); // Navigate to the specified route
    // Navigate to the specified route
  };

  return (
    <Spin spinning={isLoading}>
      <div className="w-full flex flex-col gap-9 justify-end">
        <div className="ml-auto flex gap-3 mt-16">
          <Button
            icon={<Icon icon={"solar:export-outline"} fontSize={16} />}
            className="flex items-center border-primary text-primary hover:!text-primary hover:!border-primary h-[40px] rounded-[1000px]"
          >
            Export to LMS
          </Button>

          <Button
            type="primary"
            className="flex items-center bg-primary hover:!bg-primary/90 h-[40px] rounded-[1000px]"
            icon={<Icon icon={"solar:export-outline"} fontSize={16} />}
            onClick={() => {
              setIsModalOpen(true);
              // pacingGuideRefetch();
            }}
            loading={isPacingGuideLoading || isPacingGuideRefetching}
          >
            Import Pacing Guide
          </Button>

          <Modal
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
            width={472}
            closeIcon={<CloseOutlined className="text-gray-500" />}
            title={<h2 className="text-xl font-medium">Import Pacing Guide</h2>}
            className="rounded-2xl"
          >
            <div className="flex flex-col gap-[6px] w-full mt-6">
              <Upload.Dragger {...uploadProps} className="w-full">
                <p className="ant-upload-drag-icon">
                  {isUploadLoading ? (
                    <Spin />
                  ) : (
                    <LuUploadCloud className="text-black text-2xl bg-light mx-auto" />
                  )}
                </p>
                <p className="ant-upload-text">
                  {url?.length ? (
                    "Your file has been uploaded"
                  ) : (
                    <>
                      <span className="text-primary">Click to upload</span> or
                      drag and drop
                    </>
                  )}
                </p>
                <p className="ant-upload-hint">
                  {url.length ? (
                    <Button
                      onClick={() => {
                        setUrl("");
                      }}
                      type="text"
                      danger
                      size="large"
                    >
                      Delete
                    </Button>
                  ) : (
                    "SVG, PNG, JPG or GIF (max. 800x400px)"
                  )}
                </p>
              </Upload.Dragger>
            </div>
            <Button
              disabled={!url.length}
              loading={createPacingGuideLoading}
              onClick={() => {
                createPacingGuide({
                  lecture_id: id as string,
                  pacing_guide_url: url,
                });
              }}
              className="bg-primary !w-full !h-[48px] mt-6"
              type="primary"
              size="large"
              shape="round"
            >
              Continue
            </Button>
          </Modal>
        </div>

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
              title: (
                <a
                  href={`/courses/details?id=${lectureData?.course}`}
                  className="hover:bg-none"
                >
                  Lectures
                </a>
              ),
            },
            {
              title: <span className="">{lectureData?.title}</span>,
            },
          ]}
        />

        <div className="flex items-center gap-4">
          <div className="h-[50px] w-[50px]">
            <BorderHOC rounded="rounded-[10px]">
              <div className="h-[50px] w-[50px] flex-shrink-0 bg-[#FEEDD6] rounded-[10px] flex items-center justify-center">
                <h5 className="text-[20px] leading-[30px] font-bold text-black">
                  {lectureData?.title.charAt(0)}
                </h5>
              </div>
            </BorderHOC>
          </div>

          <div className="flex items-center justify-between w-[255px]">
            <div className="flex flex-col">
              <h2 className="text-sm text-neutral-900 font-bold">
                {lectureData?.title}
              </h2>
              <p className="text-[12px] leading-[18px] text-neutral-600">
                {lectureData?.createdAt &&
                  format(
                    parseISO(lectureData?.createdAt),
                    "dd MMM, yyyy • hh:mma"
                  )}
              </p>
            </div>

            <button className="flex items-center justify-center">
              <PiDotsThreeOutlineDuotone className="text-[20px]" />
            </button>
          </div>
        </div>

        <BorderHOC className="" rounded="rounded-[10px]">
          <div className="w-full px-[15px] pt-[15px] min-h-[435px]">
            <div className="w-full pb-[10px]">
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-5">
                  {tabs.map((tab) => (
                    <div
                      key={tab.key}
                      className={`cursor-pointer ${
                        activeTab === tab.key
                          ? "border-b-[3px] border-primary text-primary"
                          : "text-neutral-900"
                      }`}
                      onClick={() => handleTab(tab.key)}
                    >
                      {tab.label(activeTab === tab.key)}
                    </div>
                  ))}
                </div>

                <div className="flex justify-center gap-[10px] h-[40px]">
                  <div className="flex justify-center gap-[5px] h-full">
                    <div
                      className={`w-[40px] flex items-center justify-center h-full rounded-[1000px] cursor-pointer ${
                        data.length && isGridView && "bg-[#E7E7E7]"
                      }`}
                      onClick={() => {
                        setIsGridView(true);
                      }}
                    >
                      <RxDashboard className="text-[24px]" />
                    </div>
                    <div
                      className={`w-[40px] flex items-center justify-center h-full rounded-[1000px] cursor-pointer ${
                        data.length && isGridView === false && "bg-[#E7E7E7]"
                      }`}
                      onClick={() => {
                        setIsGridView(false);
                      }}
                    >
                      <GoRows className="text-[24px]" />
                    </div>
                  </div>
                </div>
              </div>
              <BorderHOC className="" />
            </div>

            <div className="w-full">
              {tabs.find((tab) => tab.key === activeTab)?.content}
            </div>
          </div>
        </BorderHOC>
      </div>
    </Spin>
  );
};

export default LectureDetail;
