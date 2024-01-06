import React from "react";
import { Link } from "react-router-dom";
import { Button, Divider, Form, Input } from "antd";
import { useEmailRegister } from "../../hooks/auth/authentications";

function RegisterPage() {
  const { mutate, isLoading } = useEmailRegister();
  return (
    <div className="w-full text-white px-5 sm:px-10 md:px-14 space-y-10 max-w-[500px] mx-auto">
      <div className="text-center">
        <p className="text-4xl font-bold">Got an Email?</p>
        <p className="text-lg font-medium px-5">
          Power up your teaching one email at a time.
        </p>
      </div>

      <Form
        onFinish={mutate}
        initialValues={{ email: "", type: "sign_up" }}
        layout="vertical"
        className="space-y-5 relative"
      >
        <label
          htmlFor="email"
          className="absolute z-10 -top-5 left-3 bg-[#86A0FD] !text-xs font-semibold text-white px-2 py-1 border-2 border-primary rounded-3xl"
        >
          Teacher Email
        </label>
        <Form.Item name="email" className="!relative">
          <Input
            className="px-5 py-3 !text-white placeholder:!text-white rounded-xl !bg-[#6788FC] focus:bg-[#6788FC] hover:bg-[#6788FC] !border-none"
            placeholder="Enter your email"
            size="large"
            type="email"
            id="email"
            required
          />
        </Form.Item>
        <Form.Item hidden name="type">
          <Input required />
        </Form.Item>
        {/* <Divider className="!text-white !border-white">Or</Divider>
        <Link
          className="text-center text-white underline block text-sm font-medium"
          to="/auth/phone"
        >
          Sign up with phone number
        </Link> */}
        <Button
          loading={isLoading}
          block
          className="!rounded-3xl !h-[50px] bg-white text-silver hover:!bg-white hover:!text-primary hover:!font-bold"
          size="large"
          type="primary"
          htmlType="submit"
        >
          Proceed
        </Button>
      </Form>
    </div>
  );
}

export default RegisterPage;
