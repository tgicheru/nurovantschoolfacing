"use client"

import { useState } from "react"
import { Button, Card, Col, Row, Statistic, Switch, Tooltip, Modal } from "antd"
import { InfoCircleOutlined, UserOutlined, BookOutlined, CloseOutlined } from "@ant-design/icons"
import { Column } from "@ant-design/charts"

export default function ContinuousFeedback() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const weeklyData = [
    { day: "Mon", type: "Participation", value: 60 },
    { day: "Mon", type: "Engagement", value: 85 },
    { day: "Mon", type: "Understanding", value: 65 },
    { day: "Tues", type: "Participation", value: 62 },
    { day: "Tues", type: "Engagement", value: 80 },
    { day: "Tues", type: "Understanding", value: 65 },
    { day: "Wed", type: "Participation", value: 63 },
    { day: "Wed", type: "Engagement", value: 78 },
    { day: "Wed", type: "Understanding", value: 64 },
    { day: "Thur", type: "Participation", value: 61 },
    { day: "Thur", type: "Engagement", value: 82 },
    { day: "Thur", type: "Understanding", value: 63 },
    { day: "Fri", type: "Participation", value: 62 },
    { day: "Fri", type: "Engagement", value: 79 },
    { day: "Fri", type: "Understanding", value: 64 },
  ]

  const config = {
    data: weeklyData,
    isGroup: true,
    xField: "day",
    yField: "value",
    seriesField: "type",
    columnStyle: (record: { type: string }) => {
      const colorMap = {
        Participation: "#4F46E5",
        Engagement: "#22C55E",
        Understanding: "#A855F7",
      }
      return {
        fill: colorMap[record.type as keyof typeof colorMap],
        radius: [4, 4, 0, 0],
      }
    },
    legend: {
      marker: {
        symbol: "square",
      },
    },
    yAxis: {
      min: 0,
      max: 100,
      tickInterval: 25,
    },
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Continuous Feedback</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch size="small" />
            <span className="text-sm text-gray-600">Enable 5-minute refresh</span>
          </div>
          <Button type="primary" danger onClick={() => setIsModalOpen(true)}>
            Exit Ticket
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <Row gutter={16} className="mb-8">
        <Col span={8}>
          <Card>
            <Statistic title="On Track" value={24} suffix="/30" valueStyle={{ color: "#4F46E5" }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="New in Progress" value={12} valueStyle={{ color: "#22C55E" }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Applied Track" value={8} valueStyle={{ color: "#A855F7" }} />
          </Card>
        </Col>
      </Row>

      {/* Chart */}
      <Card className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <h3 className="text-lg font-medium m-0">Weekly Learning Progress</h3>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#4F46E5]"></span>
              <span>Participation</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#22C55E]"></span>
              <span>Engagement</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#A855F7]"></span>
              <span>Understanding</span>
            </div>
          </div>
        </div>
        <Column {...config} height={300} />
      </Card>

      {/* Bottom Section */}
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Student Progress Distribution">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  Exceeding
                </span>
                <span>8 students</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                  Meeting
                </span>
                <span>15 students</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                  Approaching
                </span>
                <span>5 students</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  Below
                </span>
                <span>2 students</span>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title={
              <div className="flex items-center gap-2">
                Recommended Actions
                <Tooltip title="Actions based on student performance">
                  <InfoCircleOutlined className="text-gray-400" />
                </Tooltip>
              </div>
            }
          >
            <div className="space-y-4">
              <div className="p-3 bg-red-50 rounded-lg">
                <h4 className="font-medium text-red-700">Review Needed</h4>
                <p className="text-sm text-red-600">5 students struggling with current concept</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-700">Ready to Advance</h4>
                <p className="text-sm text-green-600">8 students showing mastery</p>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Exit Ticket Modal */}
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={400}
        closeIcon={<CloseOutlined className="text-gray-600" />}
        title="Exit Ticket Performance Analysis"
        className="rounded-2xl"
        bodyStyle={{ padding: "24px" }}
      >
        <div className="space-y-6 px-2">
          {/* Performance Level Banner */}
          <div className="bg-blue-50 p-3 rounded-lg flex items-center gap-2 text-blue-600">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-blue-600"
            >
              <path
                d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z"
                fill="currentColor"
              />
            </svg>
            Performance Level: Medium
          </div>

          {/* Student Count */}
          <div className="flex items-center gap-2 text-gray-700">
            <UserOutlined />
            <span>Total Students: </span>
            <span className="font-medium">25</span>
          </div>

          {/* Topics */}
          <div className="flex items-center gap-2 text-gray-700">
            <BookOutlined />
            <span>Topics: </span>
            <span className="font-medium">Algebra Basics, Linear Equations</span>
          </div>

          {/* Action Buttons */}
          <div>
            <p className="text-gray-700 mb-4">Choose Next Action:</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <Button type="primary" className="bg-blue-500">
                Continue as planned
              </Button>
              <Button>Modify Calendar</Button>
              <Button>Reschedule</Button>
            </div>
            <Button type="primary" block className="bg-blue-500">
              Update Calendar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

