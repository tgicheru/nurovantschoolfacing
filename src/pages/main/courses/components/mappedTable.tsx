"use client";

import { Table, Tag, Button, Dropdown, Menu } from "antd";
import {
  CheckCircleFilled,
  WarningFilled,
  MoreOutlined,
  DownloadOutlined,
  ShareAltOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

interface StandardData {
  name: string;
  coverage: number;
  status: "Aligned" | "Needs Work";
}

interface DataType {
  key: string;
  courseName: string;
  standards: StandardData[];
  recommendations?: string[];
}

// Custom progress bar component that shows segmented blocks
const SegmentedProgress = ({ percent }: { percent: number }) => {
  const totalBlocks = 10;
  const filledBlocks = Math.round((percent / 100) * totalBlocks);

  return (
    <div className="flex gap-[2px]">
      {Array.from({ length: totalBlocks }).map((_, i) => (
        <div
          key={i}
          className={`h-4 w-8 rounded-sm ${
            i < filledBlocks ? "bg-blue-500" : "bg-gray-200"
          }`}
        />
      ))}
      <span className="ml-2 text-sm text-gray-600">{percent}%</span>
    </div>
  );
};

const columns: ColumnsType<DataType> = [
  {
    title: "Course Name",
    dataIndex: "courseName",
    key: "courseName",
    width: 200,
  },
  {
    title: "Coverage %",
    dataIndex: "standards",
    key: "coverage",
    width: 300,
    render: (standards: StandardData[]) => (
      <div className="space-y-6">
        {standards.map((standard, index) => (
          <div key={index} className="space-y-1">
            <div className="text-sm text-gray-600">{standard.name}</div>
            <SegmentedProgress percent={standard.coverage} />
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Status",
    dataIndex: "standards",
    key: "status",
    width: 150,
    render: (standards: StandardData[]) => (
      <div className="space-y-6">
        {standards.map((standard, index) => (
          <div key={index} className="py-2">
            {standard.status === "Aligned" ? (
              <Tag color="success" icon={<CheckCircleFilled />}>
                Aligned
              </Tag>
            ) : (
              <Tag color="error" icon={<WarningFilled />}>
                Needs Work
              </Tag>
            )}
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Recommendation",
    dataIndex: "recommendations",
    key: "recommendations",
    render: (recommendations: string[]) =>
      recommendations ? (
        <ul className="list-disc pl-4">
          {recommendations.map((rec, index) => (
            <li key={index} className="text-gray-600">
              {rec}
            </li>
          ))}
        </ul>
      ) : (
        "--"
      ),
  },
  {
    title: "Actions",
    key: "actions",
    width: 80,
    render: () => {
      const items = [
        {
          key: "export",
          icon: <DownloadOutlined />,
          label: "Export",
        },
        {
          key: "share",
          icon: <ShareAltOutlined />,
          label: "Share",
        },
        {
          key: "delete",
          icon: <DeleteOutlined />,
          label: "Delete",
          danger: true,
        },
      ];

      const menu = (
        <Menu
          items={items}
          onClick={({ key }) => {
            console.log("Selected:", key);
          }}
        />
      );

      return (
        <Dropdown overlay={menu} trigger={["click"]}>
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      );
    },
  },
];

const data: DataType[] = [
  {
    key: "1",
    courseName: "Algebraic Equations",
    standards: [
      {
        name: "Next Generation Science Standards",
        coverage: 80,
        status: "Aligned",
      },
      {
        name: "CA Standards",
        coverage: 20,
        status: "Needs Work",
      },
      {
        name: "Texas Essential Knowledge and Skills",
        coverage: 20,
        status: "Needs Work",
      },
    ],
    recommendations: [
      "Add practical examples or case studies",
      "Increase the numbers of equations",
      "Add more tables to indicate better clarity",
    ],
  },
  {
    key: "2",
    courseName: "Algebraic Equations",
    standards: [
      {
        name: "Next Generation Science Standards",
        coverage: 80,
        status: "Aligned",
      },
      {
        name: "CA Standards",
        coverage: 20,
        status: "Needs Work",
      },
    ],
    recommendations: [
      "Add practical examples or case studies",
      "Increase the numbers of equations",
      "Add more tables to indicate better clarity",
    ],
  },
  {
    key: "3",
    courseName: "Linear Functions",
    standards: [
      {
        name: "Next Generation Science Standards",
        coverage: 90,
        status: "Aligned",
      },
      {
        name: "CA Standards",
        coverage: 75,
        status: "Aligned",
      },
    ],
    recommendations: [
      "Include more real-world applications",
      "Add interactive graphing examples",
    ],
  },
  {
    key: "4",
    courseName: "Geometry Basics",
    standards: [
      {
        name: "Next Generation Science Standards",
        coverage: 60,
        status: "Needs Work",
      },
      {
        name: "CA Standards",
        coverage: 85,
        status: "Aligned",
      },
      {
        name: "Texas Essential Knowledge and Skills",
        coverage: 70,
        status: "Aligned",
      },
    ],
    recommendations: [
      "Add more visual demonstrations",
      "Include 3D geometry concepts",
      "Enhance problem-solving sections",
    ],
  },
];

export default function CourseStandardsTable() {
  return (
    <div className="p-4">
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        className="bg-white"
        components={{
          header: {
            cell: ({
              children,
              ...restProps
            }: {
              children: React.ReactNode;
              [key: string]: any;
            }) => (
              <th
                {...restProps}
                style={{ ...restProps.style, backgroundColor: "#E1E7FF" }}
              >
                {children}
              </th>
            ),
          },
        }}
      />
    </div>
  );
}
