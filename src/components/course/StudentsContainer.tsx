import { useNavigate } from "react-router";

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

  return (
    <div
      className="flex flex-col items-start cursor-pointer"
      onClick={() => {
        navigate("/courses/students");
      }}
    >
      <h1 className="text-neutral-900 text-[14px] leading-[20px] font-bold">
        Students
      </h1>
      <div className="flex items-center">
        <div className="relative flex items-center">
          {displayedStudents.map((student, index) => (
            <div
              key={student.id}
              className={`relative ${index > 0 ? "-ml-3" : ""} z-${
                30 - (index - 1) * 10
              } flex items-center justify-center w-[28px] h-[28px] text-sm font-medium text-white rounded-full border-[2px] border-white`}
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
    </div>
  );
}
