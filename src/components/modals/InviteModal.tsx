import { Button, Divider, Input, Modal, QRCode, message } from "antd";
import { LuCopy } from "react-icons/lu";

type Props = {
  type?: "quiz" | "flashcard" | "recap" | string;
  otherValue?: string;
  isOpen: boolean;
  value?: string;
  onClose: any;
};
function InviteModal({ isOpen, onClose, value, otherValue, type }: Props) {
  const width = window.innerWidth
  const urlType = {
    recap: `https://app.nurovant.com/recap/?id=${value}`,
    quiz: `https://app.nurovant.com/page/quiz/?id=${value}`,
    flashcard: `https://app.nurovant.com/flashcard/?id=${value}`,
  }

  const url = (otherValue || urlType?.[type as keyof typeof urlType])

  const handleCopy = async () => await navigator.clipboard.writeText(url).then(() => message.success("Copied to clipboard"));
  return (
    <Modal
      open={isOpen}
      footer={false}
      onCancel={onClose}
      closeIcon={false}
      width={width <= 500 ? width : 500}
      classNames={{ content: "!bg-transparent !shadow-none" }}
    >
      <div className='w-full p-5 space-y-5 bg-white rounded-3xl'>
        <div className=''>
          <p className='text-xl font-bold text-[#161617]'>Invite students to your quiz</p>
          <p className='text-sm font-medium text-[#57585A]'>Send an invite to your students</p>
        </div>
        <Divider className='m-0 !bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]' />
        <div className='space-y-2'>
          <p className='text-sm font-bold text-[#161617]'>Invitation Link</p>
          <Input value={url} readOnly className='py-0 pr-0 rounded-lg' suffix={<Button onClick={handleCopy} className='rounded-r-lg' size='large' icon={<LuCopy />}>copy</Button>} />
        </div>
        <Divider className='m-0'>or</Divider>
        <div className='space-y-2'>
          <p className='text-sm font-bold text-[#161617]'>Scan Bar Code</p>
          <QRCode className='!w-full !h-full' value={url} />
        </div>
      </div>
    </Modal>
  );
}

export default InviteModal;
