import React from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useReset } from "../../hooks/auth/authentications";
import { isEqual } from "../../context/utils";

function ResetPage() {
  const navigate = useNavigate();
  const { id: reference_id } = useParams();
  const { mutate, isLoading } = useReset(() => navigate("/auth/login"));

  const handleSubmit = (data: any) => {
    if (isEqual(data?.password, data?.confirm)) return mutate({ ...data, reference_id })
    message.warning("Password and Confirm Password value doesn't match please recheck!")
  }
  return (
    <div className="w-full space-y-5">
      <div className="w-full">
        <p className="text-2xl font-bold text-[#161617]">Reset your password 🔐</p>
        <p className="text-sm font-semibold text-[#57585A]">Input your email and your new password to reset.</p>
      </div>

      <Form onFinish={handleSubmit} layout="vertical" className="space-y-5">
        <Form.Item label="Email" name="email" >
          <div className="w-full rounded-xl p-[1px] bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]">
            <Input placeholder="Enter email address here" className='h-[50px] !border-none bg-[#F5F5F5E5] !rounded-xl' size="large" required />
          </div>
        </Form.Item>

        <Form.Item label="Password" name="password" >
          <div className="w-full rounded-xl p-[1px] bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]">
            <Input.Password placeholder="Enter your new password" className='h-[50px] !border-none bg-[#F5F5F5E5] !rounded-xl' size="large" required />
          </div>
        </Form.Item>

        <Form.Item label="Confirm Password" name="confirm" >
          <div className="w-full rounded-xl p-[1px] bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]">
            <Input.Password placeholder="Confirm your new password" className='h-[50px] !border-none bg-[#F5F5F5E5] !rounded-xl' size="large" required />
          </div>
        </Form.Item>

        <Button
          block
          size="large"
          shape="round"
          type="primary"
          htmlType="submit"
          loading={isLoading}
          className="bg-primary !h-[50px]"
        >Continue</Button>
      </Form>
    </div>
  );
}

export default ResetPage;
