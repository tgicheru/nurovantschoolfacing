import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CreateStudentGroupModal from "../student-groups/CreateStudentGroupModal";

const studentData = {
  students: [
    { id: "1", name: "Freddie", grade: "F", color: "#FFB974" },
    { id: "2", name: "Alice", grade: "A", color: "#6CE9A6" },
    { id: "3", name: "Bob", grade: "B", color: "#FF8B8B" },
  ],
  totalCount: 21,
};

export default function StudentsContainer() {
  const navigate = useNavigate();
  const { students, totalCount } = studentData;
  const displayedStudents = students.slice(0, 3);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Default lecture ID - in a real app, this would come from props or context
  const defaultLectureId = "60f7d2e3c2a62b6f9c7a2f4b";

  const handleCreateGroup = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col items-start">
      <div className="flex items-center justify-between w-full mb-2">
        <h1 className="text-neutral-900 text-[14px] leading-[20px] font-bold">
          Student Groups
        </h1>
        <Button 
          type="primary"
          icon={<PlusOutlined />}
          size="small"
          onClick={handleCreateGroup}
          className="ml-2"
        >
          Create Group
        </Button>
      </div>
      
      <div 
        className="flex items-center cursor-pointer" 
        onClick={() => navigate("/course/students")}
      >
        <div className="relative flex items-center">
          {displayedStudents.map((student, index) => (
            <div
              key={student.id}
              className={`relative ${index > 0 ? "-ml-3" : ""} z-${30 - index * 10} flex items-center justify-center w-[28px] h-[28px] text-sm font-medium text-white rounded-full border-[2px] border-white`}
              style={{ backgroundColor: student.color }}
            >
              {student.grade}
            </div>
          ))}
        </div>
        <span className="ml-2 text-sm font-medium text-neutral-500">
          {totalCount}+
        </span>
      </div>
      
      {/* Student Group Creation Modal */}
      <CreateStudentGroupModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        lectureId={defaultLectureId}
        onSuccess={() => {
          // Refresh data or show success message
          console.log("Student group created successfully");
        }}
      />
    </div>
  );
}
