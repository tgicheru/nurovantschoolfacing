import { useState } from "react";
import {
  Table,
  Input,
  Button,
  Radio,
  Layout,
  Typography,
  Dropdown,
  Menu,
  Spin,
  notification,
} from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import type { Key } from "antd/es/table/interface";
import {
  useGetAllStudents,
  useUpdateStudentsGradeLevel,
} from "../../../../hooks/auth/authentications";
import { useSearchParams } from "react-router-dom";

const { Header, Content } = Layout;
const { Title } = Typography;

interface Student {
  email: string;
  name: string;
  reflectly_code: string;
  _id: string;
}

const students: Student[] = [
  {
    _id: "1",
    name: "Victoria Yellowe",
    email: "victoriayellowe@gmail.com",
    reflectly_code: "ABC74Y",
  },
  {
    _id: "2",
    name: "Priscilla Alade",
    email: "priscillaalade@gmail.com",
    reflectly_code: "ABC74Y",
  },
  {
    _id: "3",
    name: "Naomi Maduabuchi",
    email: "naomimaduabuchi@gmail.com",
    reflectly_code: "ABC74Y",
  },
  {
    _id: "4",
    name: "James Ebikake",
    email: "jamesebikake@gmail.com",
    reflectly_code: "ABC74Y",
  },
  {
    _id: "5",
    name: "Daniel Gambo",
    email: "danielgamboane@gmil.com",
    reflectly_code: "ABC74Y",
  },
  {
    _id: "6",
    name: "Priscilla Jegede",
    email: "priscillajegede@gmail.com",
    reflectly_code: "ABC74Y",
  },
];

export default function StudentAssignment() {
  const [params, setParams] = useSearchParams();
  const id = params.get("id");

  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [searchText, setSearchText] = useState("");
  const [gradeLevel, setGradeLevel] = useState("all");

  const [selectedGrade, setSelectedGrade] = useState<string>("Grade Level");

  const { data: studentsData, isLoading: isGetAllStudentsLoading } =
    useGetAllStudents();

  const {
    mutate: updateStudentsGradeLevel,
    isLoading: updateStudentsGradeLevelLoading,
  } = useUpdateStudentsGradeLevel(id!);

  const handleGradeSelection = (grade: "On" | "Above" | "Below") => {
    // map through studentsData and find only those that match the selectedRowKeys

    const students = studentsData?.data
      ?.filter((student: any) => selectedRowKeys.includes(student._id))
      ?.map((student: any) => ({
        name: student.name,
        email: student.email,
        id: student._id,
      }));

    const payload = {
      grade_level: grade,
      students,
    };

    if (students.length === 0) {
      notification.error({
        message: "Error!",
        description: "Please select a student to assign.",
      });
      return;
    } else {
      updateStudentsGradeLevel(payload);
    }
    // console.log("payload", payload);
  };

  console.log(studentsData);
  //   console.log("selectedRowKeys", selectedRowKeys);

  const columns = [
    {
      title: "S/N",
      key: "sn",
      width: "10%",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Student Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
      width: "35%",
    },
    {
      title: "Reflectly Code",
      dataIndex: "reflectly_code",
      key: "reflectly_code",
      width: "25%",
    },
  ];

  const filteredStudents = studentsData?.data?.filter(
    (student: any) =>
      (student.name &&
        student.name.toLowerCase().includes(searchText.toLowerCase())) ||
      (student.email &&
        student.email.toLowerCase().includes(searchText.toLowerCase()))
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: (
      newSelectedRowKeys: Key[],
      selectedRows: any[],
      info: { type: string }
    ) => {
      console.log(newSelectedRowKeys, selectedRows, info);

      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const handleGradeSelect: MenuProps["onClick"] = (e) => {
    setSelectedGrade(e.key);
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <span onClick={() => handleGradeSelection("On")}>Grade Level</span>
      ),
      key: "grade",
    },
    {
      label: (
        <span onClick={() => handleGradeSelection("Above")}>
          Above Grade Level
        </span>
      ),
      key: "above",
    },
    {
      label: (
        <span onClick={() => handleGradeSelection("Below")}>
          Below Grade Level
        </span>
      ),
      key: "below",
    },
  ];

  const dropdownMenu = <Menu onClick={handleGradeSelect} items={items} />;

  const isLoading = isGetAllStudentsLoading || updateStudentsGradeLevelLoading;

  return (
    <Spin spinning={isLoading}>
      <Layout className="min-h-screen bg-white font-montserrat">
        <div className="max-w-[1200px] mx-auto w-full px-6">
          <Header className="bg-white px-0 flex justify-between items-center h-20">
            <Title level={4} className="!mb-0 font-montserrat">
              Assign Student
            </Title>
            <Dropdown
              overlay={dropdownMenu}
              trigger={["click"]}
              placement="bottomRight"
            >
              <Button type="primary" className="bg-primary">
                <span className="mr-2">Assign Students</span>
                <DownOutlined />
              </Button>
            </Dropdown>
          </Header>
          <Content>
            <div className="mb-6">
              <Input
                placeholder="Search by name or email"
                prefix={<SearchOutlined className="text-gray-400" />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="max-w-md !font-montserrat placeholder:!font-montserrat"
              />
            </div>

            <Table
              rowKey={(record) => record._id}
              rowSelection={rowSelection}
              columns={columns}
              dataSource={filteredStudents}
              pagination={{
                total: filteredStudents?.length || 0,
                pageSize: 15,
                showSizeChanger: false,
              }}
              className="[&_.ant-table-thead_.ant-table-cell]:bg-[#F9FAFB]"
            />
          </Content>
        </div>
      </Layout>
    </Spin>
  );
}
