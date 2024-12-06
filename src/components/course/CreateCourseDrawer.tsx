import {
  Button,
  Divider,
  Drawer,
  Select,
  Spin,
  Upload,
  UploadProps,
} from "antd";
import React, { useState } from "react";
import { LuUploadCloud } from "react-icons/lu";
import { BorderHOC } from "../BorderHOC";
import { FiUploadCloud } from "react-icons/fi";
import { PiBookOpenText } from "react-icons/pi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdOutlineArrowBackIos } from "react-icons/md";
import DummyCoursePic from "../../assets/dummyCourse.svg";
import AWS from "aws-sdk";
// import { LoadingOutlined } from "@ant-design/icons";

type CreateCourseDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

type InitialValuesTypes = {
  course_name: string;
  course_image: string;
  curriculum: string;
  state: string;
  grade: string;
  institution: string;
  learning_standard: string;
};

const CreateCourseDrawer = ({ isOpen, onClose }: CreateCourseDrawerProps) => {
  const width = window.innerWidth;

  const [initialValues, setInitialValues] = useState<InitialValuesTypes>({
    course_name: "",
    course_image: "",
    curriculum: "",
    state: "",
    grade: "",
    institution: "",
    learning_standard: "",
  });

  const [steps, setSteps] = useState(0);
  const [upldFile, setUpldFile] = useState<any>({});

  const [courseUploadLoading, setCourseUploadLoading] = useState(false);
  const [curriculumUploadLoading, setCurriculumUploadLoading] = useState(false);
  const [learningStandardUploadLoading, setLearningStandardUploadLoading] =
    useState(false);

  const handleUpldFileClr = (key: "curriculum" | "learning_standard") => {
    // setUpldFile({});
    setInitialValues((prev) => ({
      ...prev,
      [key]: "",
    }));
  };

  const handleAWSUpload = (
    blob: any,
    type: "course_image" | "curriculum" | "learning_standard"
  ) => {
    if (type === "course_image") {
      setCourseUploadLoading(true);
    } else if (type === "curriculum") {
      setCurriculumUploadLoading(true);
    } else {
      setLearningStandardUploadLoading(true);
    }

    AWS.config.update({
      accessKeyId: process.env["REACT_APP_AWS_ACCESS_KEY_ID"],
      secretAccessKey: process.env["REACT_APP_AWS_SECRET_ACCESS_KEY"],
      // region: process.env["REACT_APP_AWS_REGION"],
      region: "us-east-1",
    });

    // Specify the bucket and key (object key) for the upload
    const uploadParams = {
      // Bucket: process.env["REACT_APP_S3_BUCKET"]!,
      Bucket: "nurovantfrontend",
      Key: `${new Date()
        .toLocaleTimeString([], { hour12: false })
        .split(":")
        .join("_")}--picture-${blob.size}.${blob.type}`, // You can customize the key based on your requirement
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
          if (type === "course_image") {
            setCourseUploadLoading(false);
          } else if (type === "curriculum") {
            setCurriculumUploadLoading(false);
          } else {
            setLearningStandardUploadLoading(false);
          }
        } else {
          console.log("File uploaded successfully", data);

          if (data && type === "course_image") {
            setInitialValues((prev) => ({
              ...prev,
              course_image: data.Location,
            }));
            setCourseUploadLoading(false);
          } else if (data && type === "curriculum") {
            setInitialValues((prev) => ({
              ...prev,
              curriculum: data.Location,
            }));
            setCurriculumUploadLoading(false);
          } else if (data) {
            setInitialValues((prev) => ({
              ...prev,
              learning_standard: data.Location,
            }));
            setLearningStandardUploadLoading(false);
          }
        }
      }
    );
  };

  const courseImageUploadProps: UploadProps = {
    name: "file",
    multiple: false,
    directory: false,
    method: undefined,
    accept: "image/*",
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

            handleAWSUpload(audioBlob, "course_image");
          }

          // Do something with the Blob, such as sending it to a server or processing it
          //   console.log(audioBlob);
        };

        // Read the content of the file as a data URL
        reader.readAsArrayBuffer(file?.originFileObj);
      }
    },
  };

  const curriculumUploadProps: UploadProps = {
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

            handleAWSUpload(audioBlob, "curriculum");
          }

          // Do something with the Blob, such as sending it to a server or processing it
          //   console.log(audioBlob);
        };

        // Read the content of the file as a data URL
        reader.readAsArrayBuffer(file?.originFileObj);
      }
    },
  };

  const uploadProps: UploadProps = {
    name: "file",
    multiple: false,
    directory: false,
    method: undefined,
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

            handleAWSUpload(audioBlob, "learning_standard");
          }

          // Do something with the Blob, such as sending it to a server or processing it
          //   console.log(audioBlob);
        };

        // Read the content of the file as a data URL
        reader.readAsArrayBuffer(file?.originFileObj);
      }
    },
  };

  return (
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
          {steps !== 0 && (
            <button
              onClick={() => {
                setSteps((prev) => prev - 1);
              }}
              className="flex items-start pt-1"
            >
              <MdOutlineArrowBackIos className="text-[20px] text-neutral-900" />
            </button>
          )}

          <div className="flex flex-col gap-[5px]">
            <h3 className="text-[24px] leading-[32px] font-bold text-neutral-900">
              {steps === 2 ? "One more thing!" : "Create Course"}
            </h3>
            <p className="text-sm font-semibold text-neutral-600 max-w-[293px">
              {steps === 1
                ? `Add the necessary details to your course.`
                : steps === 2
                ? `Set clear goals to guide and measure student 
progress effectively`
                : `Let's get you all set up by creating your first class.`}
            </p>
          </div>
        </div>
        <button onClick={onClose} className="flex items-start pt-1">
          <IoCloseCircleOutline className="text-[24px] text-neutral-900" />
        </button>
      </div>
      <BorderHOC className="" />
      {steps === 0 && (
        <div className="w-full pt-[50px] flex flex-col gap-5">
          <BorderHOC rounded="rounded-[10px]">
            <div
              className="px-5 py-[19px] gap-[9px] cursor-pointer"
              onClick={() => {
                setSteps(1);
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-[30px] h-[30px] rounded-[7px] bg-[#17B26A] flex items-center justify-center">
                  <PiBookOpenText className="text-[18px] text-white transform scale-x-[-1]" />
                </div>
                <h5 className="text-base font-bold text-neutral-900">
                  Create a new course
                </h5>
              </div>
              <p className="text-sm font-semibold text-neutral-600 mt-2">
                Create a course and add lectures for your students
              </p>
            </div>
          </BorderHOC>

          <BorderHOC rounded="rounded-[10px]">
            <div className="px-5 py-[19px] gap-[9px] cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-[30px] h-[30px] rounded-[7px] bg-[#F79009] flex items-center justify-center">
                  <FiUploadCloud className="text-white" />
                </div>
                <h5 className="text-base font-bold text-neutral-900">
                  Import from LMS
                </h5>
              </div>
              <p className="text-sm font-semibold text-neutral-600 mt-2">
                Create a course by uploading your LMS
              </p>
            </div>
          </BorderHOC>
        </div>
      )}

      {steps === 1 && (
        <div className="w-full pt-[50px] flex flex-col gap-5">
          <div className="w-full flex gap-5">
            <div className="flex flex-col gap-[6px] w-full">
              <h4 className="text-sm font-bold text-neutral-900">
                Courses Image
              </h4>

              <div className="w-full h-[95px] rounded-[10px] bg-[#F5F5F5] bg-opacity-90 flex items-center justify-center overflow-hidden">
                {courseUploadLoading ? (
                  <Spin />
                ) : initialValues.course_image.length ? (
                  <img
                    src={initialValues.course_image}
                    alt={"course_image"}
                    className="w-full object-cover"
                  />
                ) : (
                  <img src={DummyCoursePic} alt={"dummy picture"} />
                )}
              </div>
            </div>

            <div className="w-[135px] h-full flex items-end justify-end mt-auto">
              <button className="w-full mt-auto">
                <BorderHOC rounded="rounded-[1000px]">
                  <Upload {...courseImageUploadProps}>
                    <div className="flex items-center gap-[10px] justify-center px-2 w-full h-[40px] cursor-pointer">
                      <FiUploadCloud className="" />
                      <span className="text-[12px] leading-[18px] font-bold text-neutral-900 whitespace-nowrap">
                        Upload image
                      </span>
                    </div>
                  </Upload>
                </BorderHOC>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-[6px] w-full">
            <h4 className="text-sm font-bold text-neutral-900">Courses Name</h4>
            <input
              type="text"
              placeholder="Enter course name here"
              className="px-5 py-[14px] placeholder:text-[#CECFD0] text-sm font-bold bg-[#F5f5f5] bg-opacity-90 rounded-[10px]"
              onChange={(e: any) => {
                setInitialValues((prev) => ({
                  ...prev,
                  course_name: e.target.value,
                }));
              }}
            />
          </div>

          <div className="flex flex-col gap-[6px] w-full">
            <h4 className="text-sm font-bold text-neutral-900">
              Upload Curriculum
            </h4>
            <Upload.Dragger {...curriculumUploadProps} className="w-full">
              <p className="ant-upload-drag-icon">
                {curriculumUploadLoading ? (
                  <Spin />
                ) : (
                  <LuUploadCloud className="text-black text-2xl bg-light mx-auto" />
                )}
              </p>
              <p className="ant-upload-text">
                {initialValues?.curriculum?.length ? (
                  "Your file has been uploaded"
                ) : (
                  <>
                    <span className="text-primary">Click to upload</span> or
                    drag and drop
                  </>
                )}
              </p>
              <p className="ant-upload-hint">
                {initialValues.curriculum.length ? (
                  <Button
                    onClick={() => handleUpldFileClr("curriculum")}
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
            // disabled={!upldFile?.file}
            // onClick={handleUploadTest}
            // loading={loading}
            onClick={() => {
              // handleUpload();
              setSteps(2);
            }}
            className="bg-primary !w-full !h-[48px]"
            type="primary"
            size="large"
            shape="round"
          >
            Continue
          </Button>
        </div>
      )}

      {steps === 2 && (
        <div className="w-full pt-[50px] flex flex-col gap-5">
          <h4 className="text-base font-bold text-neutral-900">
            Learning Standard
          </h4>

          <div className="w-full flex gap-5 items-center">
            <div className="flex flex-col gap-[6px] w-full">
              <h4 className="text-sm font-bold text-neutral-900">State</h4>
              <Select
                placeholder="Select state"
                className=" placeholder:text-[#CECFD0] text-sm font-bold bg-[#F5f5f5] bg-opacity-90 rounded-[10px] !border-none h-[48px]"
                options={[
                  { label: "Lagos", value: "lagos" },
                  { label: "Abuja", value: "abuja" },
                ]}
              />
            </div>

            <div className="flex flex-col gap-[6px] w-full">
              <h4 className="text-sm font-bold text-neutral-900">Grade</h4>
              <Select
                placeholder="Select Grade"
                className=" placeholder:text-[#CECFD0] text-sm font-bold bg-[#F5f5f5] bg-opacity-90 rounded-[10px] !border-none !outline-none !focus:outline-none h-[48px]"
                options={[
                  { label: "Lagos", value: "lagos" },
                  { label: "Abuja", value: "abuja" },
                ]}
              />
            </div>
          </div>

          <div className="flex flex-col gap-[6px] w-full">
            <h4 className="text-sm font-bold text-neutral-900">Institution</h4>
            <Select
              placeholder="Select institution"
              className=" placeholder:text-[#CECFD0] text-sm font-bold bg-[#F5f5f5] bg-opacity-90 rounded-[10px] !border-none !outline-none !focus:outline-none h-[48px]"
              options={[
                { label: "Lagos", value: "lagos" },
                { label: "Abuja", value: "abuja" },
              ]}
            />
          </div>

          <Divider className="border-light">Or</Divider>

          <div className="flex flex-col gap-[6px] w-full">
            <h4 className="text-sm font-bold text-neutral-900">
              Upload Learning Standard
            </h4>
            <Upload.Dragger {...uploadProps} className="w-full">
              <p className="ant-upload-drag-icon">
                <LuUploadCloud className="text-black text-2xl bg-light mx-auto" />
              </p>
              <p className="ant-upload-text">
                {initialValues.learning_standard.length ? (
                  "Your file has been uploaded"
                ) : (
                  <>
                    <span className="text-primary">Click to upload</span> or
                    drag and drop
                  </>
                )}
              </p>
              <p className="ant-upload-hint">
                {initialValues.learning_standard.length ? (
                  <Button
                    onClick={() => handleUpldFileClr("learning_standard")}
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
            // disabled={!upldFile?.file}
            // onClick={handleUploadTest}
            // loading={loading}
            onClick={() => {
              // handleUpload();
              //   setCourses((prev) => [
              //     ...prev,
              //     {
              //       title: "Understanding Mathematics",
              //       createdAt: "Created 11 Nov, 2024 • 12:09PM",
              //       institution: "St. Calton High School",
              //       state: "Alabama",
              //       grade: "3-5 (Middle School)",
              //       image: DefaultBanner,
              //     },
              //   ]);
              onClose();
            }}
            className="bg-primary !w-full !h-[48px]"
            type="primary"
            size="large"
            shape="round"
          >
            Create Course
          </Button>
        </div>
      )}
    </Drawer>
  );
};

export default CreateCourseDrawer;
