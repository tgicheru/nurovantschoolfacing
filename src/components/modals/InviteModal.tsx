import { Alert, Button, Form, Input, Modal, QRCode } from 'antd'
import React from 'react'
import { IoMailOutline } from 'react-icons/io5'

type Props = {
  isOpen: boolean,
  onClose: any,
}
function InviteModal({
  isOpen,
  onClose,
}: Props) {
  return (
    <Modal
      onCancel={onClose}
      closeIcon={false}
      open={isOpen}
      footer={false}
    >
      <Form layout="vertical" className="flex flex-col md:flex-row justify-between gap-5">
        <div className="w-full md:w-[35%] space-y-3 text-center">
          <QRCode value="https://nurovant.ai" className="!w-full" />
          <p className="text-sm font-medium text-[#646462]">Scan Bar code</p>
        </div>
        <div className="w-full">
          <p className="text-[32px] font-semibold text-secondary capitalize">Invitation</p>
          <Form.Item label="Send invites to participants" name="email">
            <Input
              className="!rounded-xl"
              placeholder="Enter quiz name"
              suffix={<Button className="text-primary" type="text" size="small" icon={<IoMailOutline />}>
                Copy link
              </Button>}
              size="large"
              required
            />
          </Form.Item>
          <Alert
            message="Invitees would only be able to access the quiz from the Nurovant mobile app"
            className="!rounded-xl text-success border-success bg-[#DEF2E6]"
            type="success"
          />
          <Button
            className="bg-primary !w-full"
            htmlType="submit"
            type="primary"
            size="large"
            shape="round"
          >
            Send Invitation
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default InviteModal