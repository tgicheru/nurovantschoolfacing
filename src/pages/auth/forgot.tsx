import React from "react";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useForget } from "../../hooks/auth/authentications";

function ForgotPage() {
  const navigate = useNavigate();
  const { mutate, isLoading } = useForget(({ message }: any) => {
    const words = message?.split(" ")
    const email = words?.[words?.length - 1]
    navigate(`/auth?section=verify&type=FORGOT_PASSWORD&email=${email}`)
  });
  const handleSubmit = (data: any) => mutate({ ...data, otp_type: "FORGOT_PASSWORD" })
  return (
    <div className="w-full space-y-5">
      <div className="w-full">
        <p className="text-2xl font-bold text-[#161617]">Forgotten your password 🔐</p>
        <p className="text-sm font-semibold text-[#57585A]">Input your email to get 4 digit code for approval to reset you password.</p>
      </div>

      <Form onFinish={handleSubmit} layout="vertical" className="space-y-5">
        <Form.Item label="Email" name="email" >
          <div className="w-full rounded-xl p-[1px] bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]">
            <Input placeholder="Enter email address here" className='h-[50px] !border-none bg-[#F5F5F5E5] !rounded-xl' size="large" required />
          </div>
        </Form.Item>

        <Link className="block text-base font-medium text-primary mb-5" to="/auth/login">Account Login</Link>

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

export default ForgotPage;
