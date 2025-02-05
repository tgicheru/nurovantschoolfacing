import { Button, Card, List, ConfigProvider } from "antd"
import { ArrowLeftOutlined, ExportOutlined } from "@ant-design/icons"

const pacingGuideObjectives = [
  "Solve linear equations with variables on both sides",
  "Graph linear inequalities on a coordinate plane",
  "Write equations from word problems",
]

const curriculumObjectives = [
  "Solve one-step linear equations",
  "Solve multi-step linear equations",
  "Graph linear inequalities",
  "Write and solve word problems involving linear equations",
]

function NumberCircle({ number }: { number: number }) {
  return (
    <div className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-sm mr-3">
      {number}
    </div>
  )
}

export default function CurriculumAlignment() {
  const handleBack = () => {
    window.location.href = "/courses/lecture" // Direct URL navigation
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#4318FF",
          borderRadius: 8,
        },
      }}
    >
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Button icon={<ArrowLeftOutlined />} type="text" onClick={handleBack} className="flex items-center">
            Back
          </Button>
          <h1 className="text-xl font-medium">Curriculum Alignment</h1>
          <Button type="primary" icon={<ExportOutlined />} className="bg-[#4318FF]">
            Export
          </Button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pacing Guide Objectives */}
          <Card className="shadow-sm">
            <h2 className="text-lg font-medium mb-4 flex items-center">
              <span className="i-[heroicons-outline/academic-cap] mr-2 text-gray-600" />
              Pacing Guide Objectives
            </h2>
            <List
              dataSource={pacingGuideObjectives}
              renderItem={(item, index) => (
                <List.Item className="bg-[#F4F7FE] rounded-lg p-4 mb-3">
                  <div className="flex items-center">
                    <NumberCircle number={index + 1} />
                    <span>{item}</span>
                  </div>
                </List.Item>
              )}
              className="flex flex-col gap-2"
            />
          </Card>

          {/* Curriculum Objectives */}
          <Card className="shadow-sm">
            <h2 className="text-lg font-medium mb-4 flex items-center">
              <span className="i-[heroicons-outline/book-open] mr-2 text-gray-600" />
              Curriculum Objectives
            </h2>
            <List
              dataSource={curriculumObjectives}
              renderItem={(item, index) => (
                <List.Item className="bg-[#F4F7FE] rounded-lg p-4 mb-3">
                  <div className="flex items-center">
                    <NumberCircle number={index + 1} />
                    <span>{item}</span>
                  </div>
                </List.Item>
              )}
              className="flex flex-col gap-2"
            />
          </Card>
        </div>
      </div>
    </ConfigProvider>
  )
}

