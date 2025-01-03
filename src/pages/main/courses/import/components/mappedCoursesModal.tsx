import {
  Button,
  Divider,
  Drawer,
  Input,
  Select,
  Spin,
  Upload,
  UploadProps,
} from "antd";
import React, { useEffect, useState } from "react";
import { LuUploadCloud } from "react-icons/lu";

import { FiUploadCloud } from "react-icons/fi";
import { PiBookOpenText, PiXCircleBold } from "react-icons/pi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdOutlineArrowBackIos } from "react-icons/md";
import DummyCoursePic from "../../../../../assets/dummyCourse.svg";
import DeleteIcon from "../../../../../assets/trash.svg";
import AWS from "aws-sdk";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { useNavigate, useNavigation } from "react-router";
import authAtom from "../../../../../atoms/auth/auth.atom";
import { useCreateCourse } from "../../../../../hooks/courses/courses";
import { BorderHOC } from "../../../../../components";
import { grades, states } from "../../../../../constants";
import SearchableSelect from "../../../../../components/SearchableSelect";
import {
  useGetJurisdiction,
  useGetSingleJurisdiction,
  useGetStandardSet,
} from "../../../../../hooks/otherhooks";
import TextArea from "antd/es/input/TextArea";
// import { LoadingOutlined } from "@ant-design/icons";

type CreateCourseDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  refetch: any;
  setShowSuccess: React.Dispatch<React.SetStateAction<boolean>>;
};

type InitialValuesTypes = {
  course_title: string;
  course_image: string;
  curriculum_url: string;
  state: string;
  grade: string;
  institution: string;
  learning_standard_url: string;
  learning_standards: any[];
  additional_notes: string;
};

export function removeSpacesFromPdfName(pdfName: string) {
  const trimmedName = pdfName.trim();
  return trimmedName.replace(/[^a-zA-Z0-9.]/g, "");
}

const MappedCoursesDrawer = ({
  isOpen,
  onClose,
  refetch,
  setShowSuccess,
}: CreateCourseDrawerProps) => {
  const navigate = useNavigate();
  const width = window.innerWidth;
  const { user } = useRecoilValue(authAtom);

  const [steps, setSteps] = useState(0);
  const [upldFile, setUpldFile] = useState<any>({});

  const [courseUploadLoading, setCourseUploadLoading] = useState(false);
  const [curriculumUploadLoading, setCurriculumUploadLoading] = useState(false);
  const [learningStandardUploadLoading, setLearningStandardUploadLoading] =
    useState(false);

  const handleUpldFileClr = (
    key: "curriculum_url" | "learning_standard_url"
  ) => {
    // setUpldFile({});
    setInitialValues((prev) => ({
      ...prev,
      [key]: "",
    }));
  };

  const [selectedJurisdiction, setSelectedJurisdiction] = useState("");
  const [stateStandards, setStateStandards] = useState<
    { id: string; title: string }[]
  >([]);
  const [selectedJurisdictionDetail, setSelectedJurisdictionDetail] =
    useState("");

  const { data: jurisdictionData } = useGetJurisdiction();
  const { data: singleJurisdictionData } =
    useGetSingleJurisdiction(selectedJurisdiction);

  const { data: standardSet } = useGetStandardSet(selectedJurisdictionDetail);
  const { mutate: createCourse, isLoading: createCourseLoad } = useCreateCourse(
    () => {
      onClose();
      refetch();
    }
  );

  const [initialValues, setInitialValues] = useState<InitialValuesTypes>({
    course_title: "",
    course_image: "",
    curriculum_url: "",
    state: "",
    grade: "",
    institution: "",
    additional_notes: "",
    learning_standard_url: "",
    learning_standards: [standardSet?.data],
  });

  const removeStandard = (id: string) => {
    const filtered = stateStandards.filter((item) => item.id !== id);
    setStateStandards(filtered);
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
      rootClassName=" pr-6 !pt-[20px] !shadow-none "
    >
      <div className="w-full  flex justify-between pb-6">
        <div className="flex gap-3">
          <button
            onClick={() => {
              if (steps === 3) {
                setSteps(1);
              } else {
                setSteps((prev) => prev - 1);
              }
            }}
            className="flex items-start pt-1"
          >
            <MdOutlineArrowBackIos className="text-[20px] text-neutral-900" />
          </button>
          <div className="">
            <h1 className="font-bold text-[#161617] text-2xl">
              Mapping Standards
            </h1>
            <p className="text-[#57585A] font-semibold">
              Align Course to Standards & Grades
            </p>
          </div>
        </div>
        <button onClick={onClose} className="flex items-start pt-1">
          <IoCloseCircleOutline className="text-[24px] text-neutral-900" />
        </button>
      </div>
      <BorderHOC className="" />

      <div className="w-full pt-[50px] flex flex-col gap-6">
        <div className="flex flex-col gap-[6px] w-full">
          <h4 className="text-sm font-bold text-neutral-900">State</h4>

          <Select
            placeholder="Select state"
            className="!h-[50px] !bg-[#F5F5F5E5]"
            size="large"
            options={states}
            onChange={(value) => {
              setInitialValues((prev) => ({
                ...prev,
                state: value as string,
              }));
            }}
            style={{ backgroundColor: "#F5F5F5E5" }}
          />
        </div>

        <div className="flex flex-col gap-[6px] w-full">
          <h4 className="text-sm font-bold text-neutral-900">Select Grade</h4>
          <Select
            placeholder="Select grade level"
            className="!h-[50px]"
            size="large"
            options={grades}
            onChange={(value) => {
              setInitialValues((prev) => ({
                ...prev,
                grade: value as string,
              }));
            }}
          />
        </div>

        <div className="flex flex-col gap-[6px] w-full">
          <h4 className="text-sm font-bold text-neutral-900">
            Select State Standard
          </h4>
          <SearchableSelect
            items={jurisdictionData?.data}
            placeholder="Select preferred learning standard"
            className="!h-[50px] !w-full"
            onSelect={(value: string) => {
              setSelectedJurisdiction(value);
              const selected = jurisdictionData?.data.find(
                (item: { id: string; title: string }) => item.id === value
              )?.title;
              setStateStandards([
                ...stateStandards,
                { id: value, title: selected },
              ]);
              // postSingleJurisdication({
              //   id: value,
              // });
            }}
          />

          <div
            className={`flex flex-wrap gap-2 items-center min-w-0 max-h-32 overflow-y-auto ${
              stateStandards.length > 0 ? "mt-6" : ""
            }`}
          >
            {stateStandards.map((standard, i) => (
              <div
                key={i}
                className="bg-[#4970FC] text-white flex gap-2 items-center min-w-fit p-4 px-5 rounded-[10px]"
              >
                <p>{standard.title}</p>
                <PiXCircleBold
                  className="text-[20px] shrink-0"
                  onClick={() => removeStandard(standard.id)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-[6px] w-full">
          <h4 className="text-sm font-bold text-neutral-900">Code</h4>
          <Input className="h-[48px]" />
        </div>

        <div className="flex flex-col gap-[6px] w-full">
          <h4 className="text-sm font-bold text-neutral-900">
            Additional Notes (Optional)
          </h4>
          <TextArea className="max-h-[162px] resize-none" />
        </div>
      </div>

      <div className="mt-20 mb-5">
        <Button
          // disabled={!upldFile?.file}
          onClick={() => setShowSuccess(true)}
          // loading={loading}

          className="bg-primary !w-full !h-[48px]"
          type="primary"
          size="large"
          shape="round"
        >
          Proceed
        </Button>
      </div>
    </Drawer>
  );
};

export default MappedCoursesDrawer;
