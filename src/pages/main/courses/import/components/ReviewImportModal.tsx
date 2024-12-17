import { Button, Modal, Table } from "antd";
import { ArrowLeftOutlined, FilePdfOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";
import { MdOutlineArrowBackIos } from "react-icons/md";

interface CourseData {
  key: string;
  courseName: string;
  learningObjectives: string;
  modulesLesson: string;
  resources: string;
  assessments: string;
}

interface ReviewImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  setShowSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ReviewImportModal({
  isOpen,
  onClose,
  setShowSuccess,
}: ReviewImportModalProps) {
  const data: CourseData[] = [
    {
      key: "1",
      courseName: "Introduction to Python",
      learningObjectives: 'Objective 1: "JS Syntax"',
      modulesLesson: 'Module 1: "Introduction"',
      resources: "JS Basics",
      assessments: 'Quiz: "Syntax Quiz"',
    },
    {
      key: "2",
      courseName: "Introduction to JavaScript",
      learningObjectives: 'Objective 1: "JS Syntax"',
      modulesLesson: 'Module 1: "Introduction"',
      resources: "JS Basics",
      assessments: 'Quiz: "Syntax Quiz"',
    },
    {
      key: "3",
      courseName: "Introduction to HTML",
      learningObjectives: 'Objective 1: "JS Syntax"',
      modulesLesson: 'Module 1: "Introduction"',
      resources: "JS Basics",
      assessments: 'Quiz: "Syntax Quiz"',
    },
    {
      key: "4",
      courseName: "Introduction to Python",
      learningObjectives: 'Objective 1: "JS Syntax"',
      modulesLesson: 'Module 1: "Introduction"',
      resources: "JS Basics",
      assessments: 'Quiz: "Syntax Quiz"',
    },
    {
      key: "5",
      courseName: "Python Basics",
      learningObjectives: 'Objective 1: "JS Syntax"',
      modulesLesson: 'Module 1: "Introduction"',
      resources: "JS Basics",
      assessments: 'Quiz: "Syntax Quiz"',
    },
  ];

  const columns: TableProps<CourseData>["columns"] = [
    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "courseName",
    },
    {
      title: "Learning Objectives",
      dataIndex: "learningObjectives",
      key: "learningObjectives",
    },
    {
      title: "Modules & Lesson",
      dataIndex: "modulesLesson",
      key: "modulesLesson",
    },
    {
      title: "Resources",
      dataIndex: "resources",
      key: "resources",
      render: (text) => (
        <div className="flex items-center gap-1">
          <span>PDF</span>
          <FilePdfOutlined />
          <span>"{text}"</span>
        </div>
      ),
    },
    {
      title: "Assessments & Rubrics",
      dataIndex: "assessments",
      key: "assessments",
    },
    {
      title: "",
      key: "action",
      render: () => (
        <a href="#" className="text-blue-600 hover:text-blue-800">
          Edit
        </a>
      ),
    },
  ];

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={1200}
      maskClosable={true}
      closeIcon={null}
      className="[&_.ant-modal-content]:p-0"
      title={
        <div className="w-full flex flex-1 items-center p-6 ">
          <div className="flex items-center gap-1">
            <button onClick={() => {}} className="flex items-start">
              <MdOutlineArrowBackIos className="text-[20px] text-primary" />
            </button>
            <span className="text-primary text-sm">Back</span>
          </div>
          <div className="w-full flex items-center justify-center">
            <h3 className="text-[24px] leading-[32px] font-bold text-neutral-900">
              Select Course to Import
            </h3>
          </div>
        </div>
      }
    >
      <div className="px-6 pb-6">
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          className="[&_.ant-table-thead]:bg-[#E6E9FF]"
        />
        <Button
          // disabled={!upldFile?.file}

          // loading={createCourseLoad}
          onClick={() => {
            // navigate("/courses/import");
            onClose();
            setShowSuccess(true);
          }}
          className="bg-primary !w-[144px] !h-[48px] mt-5"
          type="primary"
          size="large"
          shape="round"
        >
          Start Mapping
        </Button>
      </div>
    </Modal>
  );
}
