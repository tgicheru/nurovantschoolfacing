"use client"

import { useState } from "react"
import { Layout, Menu, Button, Select, Table, Typography } from "antd"
import { MessageOutlined } from "@ant-design/icons"

const { Header, Sider, Content } = Layout
const { Title } = Typography

const sidebarItems = [
  { key: "1", label: "Lesson Objectives" },
  { key: "2", label: "Materials Needed" },
  { key: "3", label: "Homework" },
  { key: "4", label: "Teacher's Note" },
  { key: "5", label: "Rubric and Scoring Guide" },
  { key: "6", label: "Activities" },
]

const scheduleData = [
  {
    key: "1",
    time: "8:00 - 8:05",
    activity: (
      <span>
        Introduction: <a href="#">Demo with magnet/compass</a>
      </span>
    ),
  },
  {
    key: "2",
    time: "8:05 - 8:20",
    activity: (
      <span>
        Lecture: <a href="#">Electric charges</a>
      </span>
    ),
  },
  {
    key: "3",
    time: "8:20 - 8:40",
    activity: (
      <span>
        Group activity: <a href="#">Build a circuit</a>
      </span>
    ),
  },
  {
    key: "4",
    time: "8:40 - 8:50",
    activity: (
      <span>
        Performance: <a href="#">Weekly Trend</a>
      </span>
    ),
  },
  {
    key: "5",
    time: "8:50 - 9:00",
    activity: (
      <span>
        Closure: <a href="#">Exit ticket review</a>
      </span>
    ),
  },
]

const columns = [
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
    width: "30%",
  },
  {
    title: "Activity",
    dataIndex: "activity",
    key: "activity",
  },
]

export default function LessonPlanner() {
  const [selectedKeys, setSelectedKeys] = useState(["1"])

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider theme="light" style={{ borderRight: "1px solid #f0f0f0" }}>
        <div style={{ padding: "16px" }}>
          <Title level={4}>Sections</Title>
        </div>
        <Menu
          mode="vertical"
          selectedKeys={selectedKeys}
          items={sidebarItems}
          onClick={({ key }) => setSelectedKeys([key])}
          style={{ border: "none" }}
        />
        <div style={{ padding: "16px" }}>
          <Button type="primary" ghost block>
            Analyze Lesson Plan
          </Button>
        </div>
        <div style={{ position: "absolute", bottom: "16px", left: "16px" }}>
          <Button type="primary" shape="circle" icon={<MessageOutlined />} size="large" />
        </div>
      </Sider>
      <Layout>
        <Content style={{ padding: "24px", backgroundColor: "#f5f5f5" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
            }}
          >
            <Select
              defaultValue="project-based"
              style={{ width: 200 }}
              options={[{ value: "project-based", label: "Project-Based Learning" }]}
            />
            <Button type="primary">Continuous Feedback loop</Button>
          </div>
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
            }}
          >
            <Table
              columns={columns}
              dataSource={scheduleData}
              pagination={false}
              style={{ borderRadius: "8px", overflow: "hidden" }}
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

