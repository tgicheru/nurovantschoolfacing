import { Alert, Button, Form, Input, Modal, QRCode, message } from "antd";
import { IoMailOutline } from "react-icons/io5";

type Props = {
  type: "quiz" | "flashcard" | "recap" | string;
  otherValue?: string;
  isOpen: boolean;
  value: string;
  onClose: any;
};
function InviteModal({ isOpen, onClose, value, otherValue, type }: Props) {
  const urlType = {
    recap: `https://nurovant-webapp.vercel.app/recap/?id=${value}`,
    quiz: `https://nurovant-webapp.vercel.app/page/quiz/?id=${value}`,
    flashcard: `https://nurovant-webapp.vercel.app/flashcard/?id=${value}`,
  }

  const url = (otherValue || urlType?.[type as keyof typeof urlType])

  const handleCopy = () => {message.success("Copied to clipboard"); navigator.clipboard.writeText(url)};
  return (
    <Modal onCancel={onClose} closeIcon={false} open={isOpen} footer={false}>
      <Form
        layout="vertical"
        className="flex flex-col md:flex-row justify-between gap-5"
      >
        <div className="w-full md:w-[35%] space-y-3 text-center">
          <QRCode value={url} className="!w-full" />
          <p className="text-sm font-medium text-[#646462]">Scan Bar code</p>
        </div>
        <div className="w-full">
          <p className="text-[32px] font-semibold text-secondary capitalize">
            Invitation
          </p>
          <Form.Item label="Send invites to participants" name="email">
            <Input
              className="!rounded-xl"
              placeholder="Enter quiz name"
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
            message="Invitees would only be able to access the quiz from the Nurovant mobile app"
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
