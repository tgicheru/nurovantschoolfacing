import { Alert, Button, Form, Input, Modal, QRCode, message } from "antd";
import { IoMailOutline } from "react-icons/io5";

type Props = {
  type?: "quiz" | "flashcard" | "recap" | string;
  otherValue?: string;
  isOpen: boolean;
  value?: string;
  onClose: any;
};
function InviteModal({ isOpen, onClose, value, otherValue, type }: Props) {
  const urlType = {
    recap: `https://app.nurovant.com/recap/?id=${value}`,
    quiz: `https://app.nurovant.com/page/quiz/?id=${value}`,
    flashcard: `https://app.nurovant.com/flashcard/?id=${value}`,
  }

  const url = (otherValue || urlType?.[type as keyof typeof urlType])

  const handleCopy = () => {message.success("Copied to clipboard"); navigator.clipboard.writeText(url)};
  return (
    <Modal onCancel={onClose} closeIcon={false} open={isOpen} footer={false}>
      <Form
        layout="vertical"
        initialValues={{ url }}
        className="flex flex-col md:flex-row justify-between gap-5"
      >
        <div className="w-full md:w-[35%] space-y-3 text-center">
          <QRCode value={url} className="!w-auto !md:w-full !mx-auto" />
          <p className="text-sm font-medium text-[#646462]">Scan Bar code</p>
        </div>
        <div className="w-full">
          <p className="text-[32px] font-semibold text-secondary capitalize">
            Invitation
          </p>
          <Form.Item label="Send invites to participants" name="url">
            <Input
              className="!rounded-xl"
              placeholder="Enter url"
              defaultValue={url}
              value={url}
              readOnly
              suffix={
                <Button
                  className="text-primary"
                  type="text"
                  size="small"
                  onClick={handleCopy}
                  icon={<IoMailOutline />}
                >
                  Copy link
                </Button>
              }
              size="large"
              required
            />
          </Form.Item>
          <Alert
            message="Invitees would be able to access this material from the web interface."
            className="!rounded-xl text-success border-success bg-[#DEF2E6]"
            type="success"
          />
          {/* <Button
            className="bg-primary !w-full mt-5"
            htmlType="submit"
            type="primary"
            size="large"
            shape="round"
          >
            Send Invitation
          </Button> */}
        </div>
      </Form>
    </Modal>
  );
}

export default InviteModal;
