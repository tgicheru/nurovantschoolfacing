import type React from "react"
import { useState } from "react"
import { Layout, Card, Tabs, Button, Badge, Drawer, Progress, Form, Input, Radio, Upload } from "antd"
import {
  LeftOutlined,
  UserOutlined,
  ArrowUpOutlined,
  BookOutlined,
  CloseOutlined,
  UploadOutlined,
  QuestionCircleOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons"
import type { CSSProperties } from "react"

const { Content } = Layout

// Styles object
const styles: Record<string, CSSProperties> = {
  layout: {
    minHeight: "100vh",
    background: "#f5f5f5",
  },
  header: {
    display: "flex",
    alignItems: "center",
    padding: "16px 24px",
    background: "white",
    borderBottom: "1px solid #f0f0f0",
  },
  backButton: {
    padding: 0,
    color: "#1677ff",
  },
  title: {
    marginLeft: "16px",
    fontSize: "20px",
    fontWeight: 500,
  },
  tabsContainer: {
    padding: "0 24px",
    background: "white",
  },
  content: {
    padding: "24px",
  },
  contentHeader: {
    fontSize: "18px",
    fontWeight: 500,
    marginBottom: "24px",
  },
  groupsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "16px",
  },
  groupCard: {
    borderRadius: "8px",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  groupCardHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  groupCardHeader: {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "16px",
  },
  groupIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    background: "#f0f5ff",
    borderRadius: "8px",
    color: "#1677ff",
    fontSize: "20px",
  },
  groupInfo: {
    marginLeft: "12px",
    flex: 1,
  },
  groupName: {
    fontWeight: 500,
    marginBottom: "4px",
  },
  groupSubject: {
    color: "#666",
    fontSize: "14px",
  },
  statusBadge: {
    marginLeft: "auto",
  },
  groupCardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editButton: {
    padding: 0,
  },
  participants: {
    color: "#666",
    fontSize: "14px",
  },
  scrollTopButton: {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
  },
  linkWrapper: {
    textDecoration: "none",
    color: "inherit",
    display: "block",
  },
  sectionTitle: {
    fontSize: "16px",
    fontWeight: 500,
    marginBottom: "16px",
  },
  pairingCard: {
    padding: "16px",
    border: "1px solid #f0f0f0",
    borderRadius: "8px",
  },
  pairingGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  memberInfo: {
    fontWeight: 500,
  },
  memberRole: {
    color: "#666",
    fontSize: "14px",
  },
  swapItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  noteIcon: {
    marginLeft: "8px",
  },
  uploadBox: {
    border: "1px dashed #d9d9d9",
    borderRadius: "8px",
    padding: "48px 0",
    textAlign: "center",
    marginBottom: "16px",
  },
  generateButton: {
    width: "100%",
  },
  activityType: {
    marginBottom: "16px",
  },
  radioGroup: {
    display: "flex",
    flexDirection: "column",
  },
  drawerTitle: {
    display: "flex",
    alignItems: "center",
  },
  drawerFooter: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "16px",
  },
  dissolveButton: {
    color: "#ff4d4f",
  },
}

interface Group {
  id: number
  name: string
  subject: string
  participants: number
}

const groups: Group[] = [
  { id: 1, name: "Group 1", subject: "Mathematics", participants: 4 },
  { id: 2, name: "Group 2", subject: "Literature", participants: 4 },
  { id: 3, name: "Group 3", subject: "Mathematics", participants: 4 },
  { id: 4, name: "Group 4", subject: "Mathematics", participants: 4 },
  { id: 5, name: "Group 5", subject: "Literature", participants: 4 },
  { id: 6, name: "Group 6", subject: "Mathematics", participants: 4 },
]

const GroupActivities: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [drawerStep, setDrawerStep] = useState<"edit" | "activity">("edit")
  const [form] = Form.useForm()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleEditGroup = (e: React.MouseEvent, group: Group) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedGroup(group)
    setDrawerStep("edit")
    setIsDrawerOpen(true)
    // You can add any additional logic here if needed for the new route
  }

  const handleNext = () => {
    setDrawerStep("activity")
  }

  const handleBack = () => {
    setDrawerStep("edit")
  }

  const handleClose = () => {
    setIsDrawerOpen(false)
    setDrawerStep("edit")
    form.resetFields()
  }

  const renderDrawerContent = () => {
    if (drawerStep === "edit") {
      return (
        <>
          <div style={styles.sectionTitle}>Current Pairing</div>
          <div style={styles.pairingCard}>
            <div style={styles.pairingGrid}>
              <div>
                <div style={styles.memberInfo}>Alex Chen</div>
                <div style={styles.memberRole}>Mentor</div>
                <Progress percent={95} size="small" />
              </div>
              <div>
                <div style={styles.memberInfo}>Sam Smith</div>
                <div style={styles.memberRole}>Mentee</div>
                <Progress percent={60} size="small" />
              </div>
            </div>
          </div>

          <div style={styles.sectionTitle}>Available for swap</div>
          {[
            { name: "Alex Chen", role: "Can be mentor", rating: 95 },
            { name: "Alex Chen", role: "Needs Mentoring", rating: 50 },
            { name: "Alex Chen", role: "Teacher", rating: null },
          ].map((member, index) => (
            <div key={index} style={styles.swapItem}>
              <div>
                <div style={styles.memberInfo}>{member.name}</div>
                <div style={styles.memberRole}>{member.role}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                {member.rating && (
                  <span style={{ color: member.rating >= 80 ? "#52c41a" : "#ff4d4f" }}>{member.rating}%</span>
                )}
                <Button type="link">Swap</Button>
              </div>
            </div>
          ))}
        </>
      )
    }

    return (
      <Form form={form} layout="vertical">
        <Form.Item
          label={
            <span>
              Note
              <QuestionCircleOutlined style={styles.noteIcon} />
            </span>
          }
          name="note"
        >
          <Input.TextArea placeholder="Ensure the group work is directly following the learning objectives" rows={4} />
        </Form.Item>

        <div>
          <div style={styles.sectionTitle}>Last Quiz Result</div>
          <div style={styles.uploadBox}>
            <Upload.Dragger multiple={false}>
              <p>
                <UploadOutlined /> Upload
              </p>
            </Upload.Dragger>
          </div>
          <Button type="primary" icon={<ThunderboltOutlined />} style={styles.generateButton}>
            Generate
          </Button>
        </div>

        <Form.Item label="Activity Type" name="activityType" style={styles.activityType}>
          <Radio.Group style={styles.radioGroup}>
            <Radio value="problem-solving">Problem-solving exercises</Radio>
            <Radio value="concept">Concept explanation tasks</Radio>
            <Radio value="quiz">Interactive quizzes</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    )
  }

  const renderDrawerFooter = () => {
    if (drawerStep === "edit") {
      return (
        <div style={styles.drawerFooter}>
          <Button danger type="text" style={styles.dissolveButton}>
            Dissolve Group
          </Button>
          <Button type="primary" onClick={handleNext}>
            Next 1/2
          </Button>
        </div>
      )
    }

    return (
      <div style={styles.drawerFooter}>
        <Button onClick={handleBack}>Back</Button>
        <Button type="primary">Complete Set Up</Button>
      </div>
    )
  }

  return (
    <Layout style={styles.layout}>
      {/* Header */}
      <div style={styles.header}>
        <Button type="link" style={styles.backButton} icon={<LeftOutlined />}>
          Back
        </Button>
        <span style={styles.title}>Group Activities</span>
      </div>

      {/* Tabs */}
      <div style={styles.tabsContainer}>
        <Tabs
          defaultActiveKey="all"
          items={[
            { key: "all", label: "All" },
            { key: "peer", label: "Peer to peer" },
            { key: "teacher", label: "Teacher to Student" },
          ]}
        />
      </div>

      {/* Content */}
      <Content style={styles.content}>
        <div style={styles.contentHeader}>Active Groups</div>
        <div style={styles.groupsGrid}>
          {groups.map((group) => (
            <a href={`/courses/lecture/groupAnalysis`} key={group.id} style={styles.linkWrapper}>
              <Card style={styles.groupCard} hoverable>
                <div style={styles.groupCardHeader}>
                  <div style={styles.groupIcon}>
                    <BookOutlined />
                  </div>
                  <div style={styles.groupInfo}>
                    <div style={styles.groupName}>{group.name}</div>
                    <div style={styles.groupSubject}>{group.subject}</div>
                  </div>
                  <Badge style={styles.statusBadge} color="green" text="In Progress" />
                </div>
                <div style={styles.groupCardFooter}>
                  <Button type="link" style={styles.editButton} onClick={(e) => handleEditGroup(e, group)}>
                    Edit Group
                  </Button>
                  <span style={styles.participants}>
                    <UserOutlined /> {group.participants} Participants
                  </span>
                </div>
              </Card>
            </a>
          ))}
        </div>
      </Content>

      <Button type="primary" style={styles.scrollTopButton} icon={<ArrowUpOutlined />} onClick={scrollToTop} />

      {/* Edit Group Drawer */}
      <Drawer
        open={isDrawerOpen}
        onClose={handleClose}
        width={400}
        closeIcon={<CloseOutlined />}
        title={
          <div style={styles.drawerTitle}>
            {drawerStep === "edit" ? (
              <>
                <UserOutlined />
                <span>Edit {selectedGroup?.name}</span>
              </>
            ) : (
              "Activity Settings"
            )}
          </div>
        }
        footer={renderDrawerFooter()}
      >
        {renderDrawerContent()}
      </Drawer>
    </Layout>
  )
}

export default GroupActivities

