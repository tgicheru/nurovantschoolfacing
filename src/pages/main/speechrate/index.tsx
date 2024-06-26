import React, { useEffect, useMemo, useState } from "react";
import { CustomButton } from "../../../components";
import { Button, Drawer, Modal, Spin, Upload, UploadProps } from "antd";
import { LuInbox } from "react-icons/lu";
import { FiUploadCloud } from "react-icons/fi";
import { useWindowSize } from "../../../hooks/useWindowSize";
import { useAWSUpload } from "../../../hooks/otherhooks";
import { IoArrowBackSharp } from "react-icons/io5";
import CustomTable from "../../../components/CustomTable";
import { FaPlus } from "react-icons/fa";
import moment from "moment";
import {
  useGetQuestionTracker,
  usePostQuestionTracker,
} from "../../../hooks/questiontracker/questiontracker";
import { useSearchParams } from "react-router-dom";
import { demoQuestionTracker } from "../../../constants";

function SpeechRatePage() {
  const { width } = useWindowSize();
  const [param, setParam] = useSearchParams();

  const [open, setOpen] = useState(false);
  const [upldFile, setUpldFile] = useState<any>({});
  const [upldFileData, setUpldFileData] = useState<any>({});
  const [isMobile, setIsMobile] = useState<null | boolean>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [selected, setSelected] = useState<any>({});
  const [selectedQuestion, setSelectedQuestion] = useState<any>({});
  const isSelected = Object.values(selected)?.some((d) => d);
  const [editModal, setEditModal] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (width) {
      if (width < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
  }, [width]);

  const uploadProps: UploadProps = {
    name: "file",
    multiple: false,
    directory: false,
    method: undefined,
    className: "!w-full",
    showUploadList: false,
    onChange({ file }: { file: Blob | any }) {
      setUpldFile({
        file: file?.originFileObj,
        fileobj: file,
      });
      // console.log(file);

      if (file?.originFileObj) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          // Create a Blob from the loaded data
          // if (e.target?.result instanceof ArrayBuffer) {
          //   const audioBlob = new Blob([e.target.result], { type: file.type });
          //   setAudioBlob(audioBlob);
          // }
          // Do something with the Blob, such as sending it to a server or processing it
          // console.log(audioBlob);
        };

        // Read the content of the file as a data URL
        reader.readAsArrayBuffer(file?.originFileObj);
      }
    },
  };

  const {
    data: getQuestionTrackerData,
    refetch: getQuestionTrackerRefetch,
    isLoading: getQuestionTrackerLoad,
  } = useGetQuestionTracker();

  const {
    mutate: postQuestionTrackerAction,
    isLoading: postQuestionTrackerLoad,
  } = usePostQuestionTracker(() => {
    getQuestionTrackerRefetch();
    onClose();
    setTitle("");
  });

  const { mutate: uploadFileAction } = useAWSUpload(
    (res: any) => {
      setUpldFileData(res);
      postQuestionTrackerAction({
        title,
        s3_url: res?.Location,
      });
      setIsLoading(false);
      onClose();
    },
    () => setIsLoading(false),
    "content"
  );

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleUpldFileClr = () => setUpldFile({});

  const handleAction = (action: string, id: string) => {
    setParam({ action, id });
    // onGenOpen();
  };

  const column = useMemo(() => {
    return [
      {
        title: (
          <span className="text-[14px] leading-[20px] font-normal text-[#1B2124] font-montserrat">
            Name
          </span>
        ),
        dataIndex: "title",
        key: "title",
        render: (text: any, record: any) => (
          <span
            className="text-primary cursor-pointer font-medium font-montserrat text-[14px] leading-[20px]"
            onClick={() => {
              // handleAction("view", record._id);
              setSelected(record);
            }}
          >
            {text}
          </span>
        ),
      },

      {
        title: (
          <span className="text-[14px] leading-[20px] font-normal text-[#1B2124] font-montserrat">
            Date Generated
          </span>
        ),
        dataIndex: "createdAt",
        key: "createdAt",
        render: (d: any) => (
          <span className="font-montserrat text-[14px] leading-[20px]">
            {moment(d).format("L")}
          </span>
        ),
      },
    ];
  }, []);

  return (
    <Spin spinning={getQuestionTrackerLoad}>
      <div className="px-5 md:px-10 flex justify-end items-center">
        <Button
          onClick={() => showDrawer()}
          className="bg-primary !rounded-2xl mt-4"
          type="primary"
          size="large"
          icon={<FaPlus />}
        >
          Create
        </Button>
      </div>
      <div
        className={`md:mx-10 py-6 my-6 px-8 rounded-[8px] flex items-center justify-center flex-col relative bg-white h-screen md:h-fit font-montserrat `}
      >
        {!isSelected ? (
          <h1 className="text-[18px] leading-[27px] font-semibold absolute top-6 left-8">
            Elevate Your Teaching with Effortless Speech Rating
          </h1>
        ) : (
          <div className="w-full flex flex-row items-start gap-2">
            <div
              className="py-1 cursor-pointer"
              onClick={() => {
                setSelected({});
              }}
            >
              <IoArrowBackSharp className="text-[20px] leading-[20px]" />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-[20px]  font-semibold text-[#414141]">
                {selected.title}
              </h1>
              <p className="text-[14px] leading-[20px] font-medium text-[#1B1B1B]">
                The Speech Rate for your Lecture, Neatly Organized and Ready for
                Review
              </p>
            </div>
          </div>
        )}
        <div
          className={`flex flex-col gap-3 items-center justify-center ${
            getQuestionTrackerData?.data?.length
              ? "hidden"
              : "h-[100px] md:h-[400px]"
          }`}
        >
          <p className="text-[14px] text-center leading-[24px] font-medium text-[#1B2124]">
            Your generated speech rate per individual would appear here
          </p>
          <CustomButton
            text="Upload Document"
            type="button"
            onClick={() => {
              showDrawer();
            }}
          />
        </div>

        <div
          className={`pb-[50px] md:py-[50px] w-full h-full ${
            getQuestionTrackerData?.data?.length ? "" : "hidden"
          }`}
        >
          {isSelected ? (
            <div className="flex flex-col w-full gap-4 max-w-[849px] mt-4 md:mt-0">
              {selected?.speakers?.map((speaker: any, i: number) => (
                <div className="w-full rounded-[8px] border-[1.5px] border-[#E6E9ED] flex flex-row items-start justify-between p-4">
                  <div className="flex flex-row items-center justify-between gap-1 max-w-[70%]">
                    <div className="flex flex-col gap-2 items-start">
                      <h3 className="text-[16px] leading-[20px] font-semibold">
                        Name:{" "}
                        <span className="text-[16px] font-normal leading-[20px] ">
                          {speaker?.speaker}
                        </span>
                      </h3>

                      <h3 className="text-[16px] leading-[20px] font-semibold">
                        Time:{" "}
                        <span className="text-[16px] font-normal leading-[20px] ">
                          {speaker?.munites}
                        </span>
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-2xl md:text-4xl font-bold text-[#1B2124]">
                      {speaker?.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <CustomTable
              data={getQuestionTrackerData?.data}
              column={column}
              pagination={false}
            />
          )}
        </div>

        <Drawer
          placement="right"
          closable={false}
          onClose={onClose}
          open={open}
          width={isMobile ? "80%" : "40%"}
        >
          <h2 className="text-[20px] leading-[30px] font-semibold tracking-[2%] font-montserrat">
            Track your Questions with Ease
          </h2>
          <p className="text-[16px] leading-[24px] font-montserrat mb-4 text-[#414141]">
            Automatically Extract and Organize Student Questions from Every
            Lesson Recording
          </p>
          <div className="flex flex-col items-start gap-3">
            <div className="flex flex-col gap-1 w-full">
              <h4 className="text-[16px] leading-[24px] font-medium font-montserrat">
                Title
              </h4>
              <input
                type="text"
                className="w-full border border-[#cecccc] rounded-[8px] p-3 font-montserrat"
                value={title}
                placeholder="Enter the title of the document"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <p className="text-[14px] leading-[23px] text-[#646462] font-medium font-montserrat">
              Upload Source Material
            </p>
            <Upload.Dragger {...uploadProps}>
              <p className="ant-upload-drag-icon">
                <FiUploadCloud className="text-[#414141] text-5xl mx-auto" />
              </p>

              {/* <p className="ant-upload-hint">
                          {upldFile?.file ? (
                            <Button
                              className="!bg-white !text-primary !font-bold !w-[60%] !h-[50px] !rounded-3xl"
                              type="primary"
                              size="large"
                            >
                              Upload PDF
                            </Button>
                          ) : (
                            "MP3, M4A, WAV, PDF"
                          )}
                        </p> */}
              <p className="ant-upload-text text-[#303030] font-montserrat">
                {upldFile?.file ? (
                  "Your file has been uploaded"
                ) : (
                  <div className="flex flex-col gap-1 items-center justify-center">
                    <span className="text-[12px] leading-[20px] font-medium">
                      Upload the document containing your source material.
                    </span>
                    <span className="text-[#81868C] text-[12px] leading-[18px]">
                      File size no more than 10MB
                    </span>
                  </div>
                )}
              </p>
              <p className="ant-upload-hint !text-white/50">
                {upldFile?.file ? (
                  <Button
                    onClick={handleUpldFileClr}
                    type="text"
                    className="!bg-white !font-bold !w-[60%] !h-[50px] !rounded-3xl"
                    danger
                    size="large"
                  >
                    Delete
                  </Button>
                ) : (
                  "File size no more than 10MB"
                )}
              </p>
            </Upload.Dragger>

            <Button
              className="bg-primary !h-[50px]"
              disabled={!upldFile?.file}
              // disabled={false}
              onClick={() => {
                // setIsLoading(true);
                uploadFileAction(upldFile?.file);
                // postQuestionTrackerAction({
                //   title,
                //   s3_url:
                //     "s3://teacher-storage-bucket/twitter_unreal_stories_mono.wav",
                // });
              }}
              type="primary"
              size="large"
              shape="round"
              loading={postQuestionTrackerLoad}
              block
            >
              Generate Questions
            </Button>
          </div>
        </Drawer>
      </div>
    </Spin>
  );
}

export default SpeechRatePage;
