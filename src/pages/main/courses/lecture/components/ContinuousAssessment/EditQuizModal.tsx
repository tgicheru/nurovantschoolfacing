import { useState } from "react";
import { Modal, Button, Input, Select, Switch } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { FiClock } from "react-icons/fi";
import { useEditCreativeAssessmentQuiz } from "../../../../../../hooks/lecture/lecture";

type EditQuizModalProps = {
  open?: boolean;
  onClose?: () => void;
  duration: {
    hours: number;
    minutes: number;
  };
  id: string;
  number_of_questions: number;
};

export default function EditQuizModal({
  open = true,
  onClose = () => {},
  duration,
  id,
  number_of_questions,
}: EditQuizModalProps) {
  const { mutate, isLoading } = useEditCreativeAssessmentQuiz(id, () => {
    onClose();
  });

  const [timeLimit, setTimeLimit] = useState(
    (duration?.hours || 0) * 60 + duration?.minutes
  );
  const [customHours, setCustomHours] = useState("02");
  const [customMinutes, setCustomMinutes] = useState("00");
  const [numberOfQuestions, setNumberOfQuestions] = useState(
    number_of_questions || 5
  );
  const [selectedOption, setSelectedOption] = useState("45");

  const handleTimeOptionClick = (minutes: string) => {
    setSelectedOption(minutes);
    setTimeLimit(Number.parseInt(minutes));
  };

  const handleSaveChanges = () => {
    // Save logic here
    mutate({
      duration: {
        hours: selectedOption === "custom" ? Number(customHours) : 0,
        minutes:
          selectedOption === "custom"
            ? Number(customMinutes)
            : Number(selectedOption),
      },
      number_of_questions: numberOfQuestions,
    });
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={500}
      closeIcon={
        <CloseCircleOutlined
          style={{
            color: "#4f7df3",
            fontSize: "20px",
          }}
        />
      }
      title={
        <div
          style={{ fontSize: "28px", fontWeight: "bold", padding: "10px 0" }}
        >
          Edit Quiz
        </div>
      }
      centered
    >
      <div style={{ padding: "0 10px" }}>
        <div
          style={{
            backgroundColor: "#e8efff",
            padding: "16px",
            borderRadius: "8px",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <FiClock
            style={{ color: "#4f7df3", fontSize: "20px", marginRight: "10px" }}
          />
          <span style={{ color: "#4f7df3", fontSize: "18px" }}>
            Current Time Limit: {timeLimit} minutes.
          </span>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <h3 style={{ fontSize: "18px", marginBottom: "16px" }}>
            Quick Selection Options
          </h3>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <Button
              type={selectedOption === "15" ? "primary" : "default"}
              shape="round"
              size="large"
              style={{
                backgroundColor: selectedOption === "15" ? "#4f7df3" : "white",
                borderColor: "#4f7df3",
                color: selectedOption === "15" ? "white" : "#4f7df3",
                height: "48px",
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                paddingLeft: "20px",
                paddingRight: "20px",
              }}
              onClick={() => handleTimeOptionClick("15")}
            >
              15 Minutes
              {selectedOption === "15" && (
                <CloseCircleOutlined
                  style={{ marginLeft: "8px", fontSize: "16px" }}
                />
              )}
            </Button>
            <Button
              type={selectedOption === "30" ? "primary" : "default"}
              shape="round"
              size="large"
              style={{
                backgroundColor: selectedOption === "30" ? "#4f7df3" : "white",
                borderColor: "#4f7df3",
                color: selectedOption === "30" ? "white" : "#4f7df3",
                height: "48px",
                fontSize: "16px",
                paddingLeft: "20px",
                paddingRight: "20px",
              }}
              onClick={() => handleTimeOptionClick("30")}
            >
              30 Minutes
            </Button>
            <Button
              type={selectedOption === "45" ? "primary" : "default"}
              shape="round"
              size="large"
              style={{
                backgroundColor: selectedOption === "45" ? "#4f7df3" : "white",
                borderColor: "#4f7df3",
                color: selectedOption === "45" ? "white" : "#4f7df3",
                height: "48px",
                fontSize: "16px",
                paddingLeft: "20px",
                paddingRight: "20px",
              }}
              onClick={() => handleTimeOptionClick("45")}
            >
              45 Minutes
            </Button>
            <Button
              type={selectedOption === "60" ? "primary" : "default"}
              shape="round"
              size="large"
              style={{
                backgroundColor: selectedOption === "60" ? "#4f7df3" : "white",
                borderColor: "#4f7df3",
                color: selectedOption === "60" ? "white" : "#4f7df3",
                height: "48px",
                fontSize: "16px",
                paddingLeft: "20px",
                paddingRight: "20px",
              }}
              onClick={() => handleTimeOptionClick("60")}
            >
              1 hour
            </Button>
          </div>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <div className="w-full flex items-center gap-2 mb-4">
            <h3 style={{ fontSize: "18px" }}>Custom Time Limit</h3>
            <Switch
              checked={selectedOption === "custom"}
              onChange={(checked) => {
                if (checked) {
                  setSelectedOption("custom");
                } else {
                  setSelectedOption("45");
                }
              }}
            />
          </div>
          <h3 style={{ fontSize: "18px", marginBottom: "16px" }}>
            Custom Input
          </h3>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              <div style={{ marginBottom: "8px" }}>Hour</div>
              <Input
                value={customHours}
                onChange={(e) => setCustomHours(e.target.value)}
                style={{
                  width: "80px",
                  height: "48px",
                  borderRadius: "8px",
                  borderColor: "#4f7df3",
                  fontSize: "18px",
                  textAlign: "center",
                }}
              />
            </div>
            <div
              style={{
                margin: "0 16px",
                fontSize: "24px",
                fontWeight: "bold",
                color: "#4f7df3",
                marginTop: "20px",
              }}
            >
              :
            </div>
            <div>
              <div style={{ marginBottom: "8px" }}>Min</div>
              <Input
                value={customMinutes}
                onChange={(e) => setCustomMinutes(e.target.value)}
                style={{
                  width: "80px",
                  height: "48px",
                  borderRadius: "8px",
                  borderColor: "#4f7df3",
                  fontSize: "18px",
                  textAlign: "center",
                }}
              />
            </div>
          </div>
        </div>

        <div style={{ marginBottom: "32px" }}>
          <h3 style={{ fontSize: "18px", marginBottom: "16px" }}>
            Numbers of Questions
          </h3>
          <Select
            value={numberOfQuestions}
            onChange={(value) => setNumberOfQuestions(value)}
            style={{ width: "100%", height: "48px", borderRadius: "8px" }}
            options={[
              { value: 5, label: "5" },
              { value: 10, label: "10" },
              { value: 15, label: "15" },
              { value: 20, label: "20" },
            ]}
            size="large"
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "16px",
          }}
        >
          <Button
            type="primary"
            size="large"
            style={{
              backgroundColor: "#4f7df3",
              height: "48px",
              borderRadius: "24px",
              fontSize: "16px",
              paddingLeft: "32px",
              paddingRight: "32px",
            }}
            onClick={handleSaveChanges}
            loading={isLoading}
            disabled={isLoading}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </Modal>
  );
}
