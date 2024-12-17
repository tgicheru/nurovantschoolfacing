import { Table } from "antd";
import { useState } from "react";
import type { TableProps } from "antd";

interface CourseData {
  key: string;
  sn: number;
  courseName: string;
  instructor: string;
  semester: string;
  status: string;
  enrollment: number;
}

export default function CourseTable() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([
    "1",
    "2",
    "3",
    "4",
  ]);

  const data: CourseData[] = [
    {
      key: "1",
      sn: 1,
      courseName: "Introduction to Python",
      instructor: "Dr. Jane Smith",
      semester: "Fall 2023",
      status: "Active",
      enrollment: 25,
    },
    {
      key: "2",
      sn: 2,
      courseName: "Introduction to Javascript",
      instructor: "Dr. Jane Smith",
      semester: "Fall 2023",
      status: "Active",
      enrollment: 25,
    },
    {
      key: "3",
      sn: 3,
      courseName: "Introduction to HTML",
      instructor: "Dr. Jane Smith",
      semester: "Fall 2023",
      status: "Active",
      enrollment: 25,
    },
    {
      key: "4",
      sn: 4,
      courseName: "Introduction to CSS",
      instructor: "Dr. Jane Smith",
      semester: "Fall 2023",
      status: "Active",
      enrollment: 25,
    },
    {
      key: "5",
      sn: 5,
      courseName: "Introduction to Python",
      instructor: "Dr. Jane Smith",
      semester: "Fall 2023",
      status: "Active",
      enrollment: 25,
    },
    {
      key: "6",
      sn: 6,
      courseName: "Introduction to Python",
      instructor: "Dr. Jane Smith",
      semester: "Fall 2023",
      status: "Active",
      enrollment: 25,
    },
  ];

  const columns: TableProps<CourseData>["columns"] = [
    {
      title: "S/N",
      dataIndex: "sn",
      width: "80px",
    },
    {
      title: "Course Name",
      dataIndex: "courseName",
    },
    {
      title: "Instructor",
      dataIndex: "instructor",
    },
    {
      title: "Semester",
      dataIndex: "semester",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Enrollment",
      dataIndex: "enrollment",
      align: "right",
    },
  ];

  const onSelectChange = (
    selectedRowKeys: React.Key[],
    selectedRows: CourseData[],
    info: { type: string }
  ) => {
    setSelectedRowKeys(selectedRowKeys as string[]);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [Table.SELECTION_ALL],
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-4 text-sm">
        <span>{selectedRowKeys.length}/9 Selected</span>
        <button
          onClick={() => setSelectedRowKeys([])}
          className="text-primary hover:text-primary ml-2"
        >
          Clear selection
        </button>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={false}
        className="[&_.ant-table-thead]:bg-[#E1E7FF]"
      />
    </div>
  );
}
