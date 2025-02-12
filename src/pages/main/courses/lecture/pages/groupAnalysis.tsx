import type React from "react"
import { Layout, Card, Typography, Button, Space } from "antd"
import { LeftOutlined, ExportOutlined, UserOutlined } from "@ant-design/icons"

const { Header, Content } = Layout
const { Title, Text } = Typography

const GroupAnalysis: React.FC = () => {
  const performanceMetrics = [
    { label: "Quiz Score (5/5)", defaultSelected: 4 },
    { label: "Participation (5/5)", defaultSelected: 2 },
    { label: "Lab Work (5/5)", defaultSelected: 3 },
    { label: "Peer Reviews (5/5)", defaultSelected: 4 },
  ]

  const students = [
    {
      id: 1,
      name: "Student 1",
      strengths: "Strong in: Theory, Problem-solving",
      areas: "Areas for growth: Practical application",
    },
    {
      id: 2,
      name: "Student 2",
      strengths: "Strong in: Theory, Problem-solving",
      areas: "Areas for growth: Practical application",
    },
    {
      id: 3,
      name: "Student 3",
      strengths: "Strong in: Theory, Problem-solving",
      areas: "Areas for growth: Practical application",
    },
    {
      id: 4,
      name: "Student 4",
      strengths: "Strong in: Theory, Problem-solving",
      areas: "Areas for growth: Practical application",
    },
  ]

  const RatingDisplay: React.FC<{ selected: number }> = ({ selected }) => {
    return (
      <div style={{ display: "flex", gap: "4px" }}>
        {[1, 2, 3, 4, 5].map((number) => (
          <div
            key={number}
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: number <= selected ? "#1677ff" : "#f0f0f0",
              color: number <= selected ? "white" : "#666",
              fontSize: "12px",
              cursor: "default",
            }}
          >
            {number}
          </div>
        ))}
      </div>
    )
  }

  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <Header
        style={{
          background: "#fff",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <Space>
          <a href="/courses/lecture/groupActivity">
            <Button type="text" icon={<LeftOutlined />} style={{ color: "#1677ff" }}>
              Back
            </Button>
          </a>
          <Title level={5} style={{ margin: 0 }}>
            AI Grouping Analysis
          </Title>
        </Space>
        <Button type="primary" icon={<ExportOutlined />}>
          Export
        </Button>
      </Header>

      <Content style={{ padding: "24px" }}>
        <Space direction="vertical" size={24} style={{ width: "100%", display: "flex" }}>
          {/* Group Formation Logic */}
          <Card bordered={false} style={{ borderRadius: "8px" }}>
            <Space direction="vertical" size={24} style={{ width: "100%" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                  <div style={{ width: "20px", height: "20px", display: "flex", alignItems: "center" }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M17.5 13.3333V6.66667C17.4997 6.37439 17.4225 6.08772 17.2763 5.83529C17.13 5.58285 16.9198 5.37263 16.6667 5.22667L10.8333 1.89333C10.58 1.74738 10.2931 1.67017 10 1.67017C9.70692 1.67017 9.42003 1.74738 9.16667 1.89333L3.33333 5.22667C3.08022 5.37263 2.87004 5.58285 2.72375 5.83529C2.57745 6.08772 2.5003 6.37439 2.5 6.66667V13.3333C2.5003 13.6256 2.57745 13.9123 2.72375 14.1647C2.87004 14.4172 3.08022 14.6274 3.33333 14.7733L9.16667 18.1067C9.42003 18.2526 9.70692 18.3298 10 18.3298C10.2931 18.3298 10.58 18.2526 10.8333 18.1067L16.6667 14.7733C16.9198 14.6274 17.13 14.4172 17.2763 14.1647C17.4225 13.9123 17.4997 13.6256 17.5 13.3333Z"
                        stroke="#1677FF"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <Text strong style={{ color: "#1677ff", fontSize: "16px" }}>
                    Group Formation Logic
                  </Text>
                </div>
                <Card
                  style={{
                    background: "#f0f5ff",
                    borderRadius: "8px",
                    border: "none",
                  }}
                >
                  <Text style={{ color: "#1677ff" }}>
                    "I analyzed student performance across multiple dimensions to create balanced groups that promote
                    peer learning and collaboration."
                  </Text>
                </Card>
              </div>

              <div>
                <Text strong style={{ fontSize: "14px", display: "block", marginBottom: "12px" }}>
                  Group's Rationale
                </Text>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    color: "#666",
                  }}
                >
                  <li style={{ marginBottom: "8px" }}>• Strong in numerical concepts</li>
                  <li style={{ marginBottom: "8px" }}>• Mixed practical skills levels</li>
                  <li>• Complementary communication styles</li>
                </ul>
              </div>

              <div>
                <Text strong style={{ fontSize: "14px", display: "block", marginBottom: "16px" }}>
                  Performance Metrics
                </Text>
                <Space direction="vertical" size={16} style={{ width: "100%" }}>
                  {performanceMetrics.map((metric, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ color: "#666" }}>{metric.label}</Text>
                      <RatingDisplay selected={metric.defaultSelected} />
                    </div>
                  ))}
                </Space>
              </div>
            </Space>
          </Card>

          {/* Individual Student Placement Logic */}
          <Card bordered={false} style={{ borderRadius: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
              <div style={{ width: "20px", height: "20px", display: "flex", alignItems: "center" }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M17.5 13.3333V6.66667C17.4997 6.37439 17.4225 6.08772 17.2763 5.83529C17.13 5.58285 16.9198 5.37263 16.6667 5.22667L10.8333 1.89333C10.58 1.74738 10.2931 1.67017 10 1.67017C9.70692 1.67017 9.42003 1.74738 9.16667 1.89333L3.33333 5.22667C3.08022 5.37263 2.87004 5.58285 2.72375 5.83529C2.57745 6.08772 2.5003 6.37439 2.5 6.66667V13.3333C2.5003 13.6256 2.57745 13.9123 2.72375 14.1647C2.87004 14.4172 3.08022 14.6274 3.33333 14.7733L9.16667 18.1067C9.42003 18.2526 9.70692 18.3298 10 18.3298C10.2931 18.3298 10.58 18.2526 10.8333 18.1067L16.6667 14.7733C16.9198 14.6274 17.13 14.4172 17.2763 14.1647C17.4225 13.9123 17.4997 13.6256 17.5 13.3333Z"
                    stroke="#1677FF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <Text strong style={{ color: "#1677ff", fontSize: "16px" }}>
                Individual Student Placement Logic
              </Text>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "16px",
              }}
            >
              {students.map((student) => (
                <Card
                  key={student.id}
                  bordered={false}
                  style={{
                    background: "#f8f9ff",
                    borderRadius: "8px",
                  }}
                >
                  <Space align="start">
                    <div
                      style={{
                        background: "#e6f4ff",
                        borderRadius: "50%",
                        width: "32px",
                        height: "32px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <UserOutlined style={{ color: "#1677ff" }} />
                    </div>
                    <div>
                      <Text strong>{student.name}</Text>
                      <div style={{ color: "#666", marginTop: "4px", fontSize: "14px", lineHeight: "1.5715" }}>
                        {student.strengths}
                        <br />
                        {student.areas}
                      </div>
                    </div>
                  </Space>
                </Card>
              ))}
            </div>
          </Card>
        </Space>
      </Content>
    </Layout>
  )
}

export default GroupAnalysis

