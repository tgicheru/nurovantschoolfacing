"use client"

import { ArrowLeftOutlined, UserOutlined, BookOutlined, BarChartOutlined } from "@ant-design/icons"
import { Button, Card, Select, Typography } from "antd"
import { Column } from "@ant-design/charts"

const { Title } = Typography

export default function TeacherInsights() {
  const data = [
    { day: "Mon", value: 80 },
    { day: "Tues", value: 65 },
    { day: "Wed", value: 85 },
    { day: "Thur", value: 75 },
    { day: "Fri", value: 70 },
  ]

  const config = {
    data,
    xField: "day",
    yField: "value",
    color: "#4F46E5",
    columnStyle: {
      radius: [4, 4, 0, 0],
    },
    yAxis: {
      min: 0,
      max: 100,
      tickInterval: 25,
    },
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Button icon={<ArrowLeftOutlined />} type="text">
            Back
          </Button>
          <Title level={4} className="!m-0">
            Teacher Insight
          </Title>
        </div>
        <Button type="primary" className="bg-[#4F46E5]">
          View Group Activities
        </Button>
      </div>

      {/* Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="hover:shadow-md transition-shadow">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-[#EEF2FF] rounded-lg">
              <UserOutlined className="text-[#4F46E5] text-lg" />
            </div>
            <p className="text-gray-600 m-0">Small groups showing better engagement</p>
          </div>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-[#EEF2FF] rounded-lg">
              <BookOutlined className="text-[#4F46E5] text-lg" />
            </div>
            <p className="text-gray-600 m-0">Concept review needed for Unit 3</p>
          </div>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-[#EEF2FF] rounded-lg">
              <BarChartOutlined className="text-[#4F46E5] text-lg" />
            </div>
            <p className="text-gray-600 m-0">Higher performance in practical tasks</p>
          </div>
        </Card>
      </div>

      {/* Performance Trends */}
      <Card className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <Title level={5} className="!m-0">
            Performance Trends
          </Title>
          <Select
            defaultValue="last7"
            style={{ width: 120 }}
            options={[
              { value: "last7", label: "Last 7 Days" },
              { value: "last30", label: "Last 30 Days" },
              { value: "last90", label: "Last 90 Days" },
            ]}
          />
        </div>
        <Column {...config} height={300} />
      </Card>

      {/* Quick Actions */}
      <div>
        <Title level={5}>Quick actions</Title>
        <Card hoverable className="cursor-pointer">
          <div className="flex flex-col gap-1">
            <span className="font-medium">Adjust Lesson Plan</span>
            <span className="text-gray-500 text-sm">Modify Lesson plan time, Lesson Objectives & t.c</span>
          </div>
        </Card>
      </div>
    </div>
  )
}

