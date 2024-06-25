import React, { useEffect, useState } from "react";
import { CustomButton } from "../../../components";
import { Button, Drawer, Upload, UploadProps } from "antd";
import { LuInbox } from "react-icons/lu";
import { FiUploadCloud } from "react-icons/fi";
import { useWindowSize } from "../../../hooks/useWindowSize";
import { useAWSUpload } from "../../../hooks/otherhooks";

function QuestionTrackerPage() {
  const { width } = useWindowSize();
  const [open, setOpen] = useState(false);
  const [upldFile, setUpldFile] = useState<any>({});
  const [upldFileData, setUpldFileData] = useState<any>({});
  const [isMobile, setIsMobile] = useState<null | boolean>(null);
  const [isLoading, setIsLoading] = useState(false);

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
      console.log(file);

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

  const { mutate: uploadFileAction } = useAWSUpload(
    (res: any) => {
      setUpldFileData(res);
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

  return (
    <div className="md:mx-10 py-6 my-6 px-8 rounded-[8px] flex items-center justify-center relative bg-white h-screen md:h-[429px] font-montserrat">
      <h1 className="text-[18px] leading-[27px] font-semibold absolute top-6 left-8">
        Elevate Your Teaching with Effortless Question Tracking
      </h1>
      <div className="flex flex-col gap-3 items-center justify-center">
        <p className="text-[14px] leading-[24px] font-medium text-[#1B2124]">
          Your generated questions would appear here
        </p>
        <CustomButton
          text="Upload Document"
          type="button"
          onClick={() => {
            showDrawer();
          }}
        />
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
          Automatically Extract and Organize Student Questions from Every Lesson
          Recording
        </p>
        <div className="flex flex-col items-start gap-3">
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
            onClick={() => {
              setIsLoading(true);
              uploadFileAction(upldFile?.file);
            }}
            type="primary"
            size="large"
            shape="round"
            block
          >
            Generate Questions
          </Button>
        </div>
      </Drawer>
    </div>
  );
}

export default QuestionTrackerPage;
