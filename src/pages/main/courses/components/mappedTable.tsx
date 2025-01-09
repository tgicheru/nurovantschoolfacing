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
import { GoDotFill } from "react-icons/go";

interface StandardData {
  name: string;
  coverage: number;
  status: "Aligned" | "Needs Work";
}

interface DataType {
  key: string;
  code: number;
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
      <span className="ml-2 text-sm text-gray-600 mr-1">{percent}% </span>

      {Array.from({ length: totalBlocks }).map((_, i) => (
        <div
          key={i}
          className={`h-4 w-[6px] rounded-sm ${
            i < filledBlocks ? "bg-blue-500" : "bg-gray-200"
          }`}
        />
      ))}
    </div>
  );
};

const columns: ColumnsType<DataType> = [
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
    width: 200,
  },
  {
    title: "Code Interpretation",
    dataIndex: "courseName",
    key: "courseName",
    width: 300,
  },
  {
    title: "Standard",
    dataIndex: "standards",
    key: "standards",
    width: 300,
    render: (standards: StandardData[]) => (
      <div className="space-y-6">
        {standards?.map((standard, index) => (
          <div key={index} className="flex gap-2 items-center">
            <GoDotFill className="text-[#6D6E71] h-2 w-2 shrink-0" />
            <div className="text-sm text-gray-600">{standard.name}</div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Coverage %",
    dataIndex: "standards",
    key: "coverage",
    width: 300,
    render: (standards: StandardData[]) => (
      <div className="space-y-6">
        {standards?.map((standard, index) => (
          <div key={index} className="space-y-1">
            <SegmentedProgress percent={standard.coverage} />
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Alignment",
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
    width: 400,
    render: (recommendations: string[]) =>
      recommendations ? (
        <ul className="list-disc pl-4 min-w-fit">
          {recommendations.map((rec, index) => (
            <li key={index} className="text-[#57585A] text-sm">
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
    code: 101.5,
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
    code: 102.5,
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
    code: 103.5,
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
    code: 105,
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
                className="font-fustat font-bold text-base"
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
