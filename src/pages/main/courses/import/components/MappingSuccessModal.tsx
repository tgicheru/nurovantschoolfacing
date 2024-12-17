import { Button, Modal } from "antd";
import { LikeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

interface MappingSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MappingSuccessModal({
  isOpen,
  onClose,
}: MappingSuccessModalProps) {
  const navigate = useNavigate();
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      closable={false}
      centered
      width={400}
      className="[&_.ant-modal-content]:p-8 !rounded-[20px]"
      style={{
        borderRadius: 20,
      }}
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-[#E6E9FF] flex items-center justify-center mb-6">
          <LikeOutlined className="text-3xl text-blue-600" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">
          Mapping Done Successfully
        </h2>
        <p className="text-gray-600 mb-8">
          Your mapping results have been done successfully.
        </p>
        <Button
          // disabled={!upldFile?.file}

          // loading={createCourseLoad}
          onClick={() => {
            onClose();
            navigate("/courses?type=mapped");
          }}
          className="bg-primary !w-[144px] !h-[48px]"
          type="primary"
          size="large"
          shape="round"
        >
          Go to Courses
        </Button>
      </div>
    </Modal>
  );
}
