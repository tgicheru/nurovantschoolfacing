import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button, Divider, Form, Input } from "antd";
import { useEmailLogin } from "../../hooks/auth/authentications";

function LoginPage() {
  const { mutate, isLoading } = useEmailLogin();
  const [params] = useSearchParams();
  const mobile = params.get("mobile");

  return (
    <div className="w-full text-white px-5 sm:px-10 md:px-14 space-y-10 max-w-[500px] mx-auto">
      <div className="text-center flex flex-col items-center gap-2">
        <p className="text-4xl font-bold">
          Login With Your {mobile ? "Phone Number" : "Email"}
        </p>
        <p className="text-lg font-medium px-5">
          Let's get on to the world of learning.
        </p>
      </div>

      <Form onFinish={mutate} layout="vertical" className="space-y-5">
        <div className="relative">
          <label
            htmlFor="email"
            className="absolute z-10 -top-5 left-3 bg-[#86A0FD] !text-xs font-semibold text-white px-2 py-1 border-2 border-primary rounded-3xl"
          >
            Email
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
        </div>
        <div className="relative">
          <label
            htmlFor="password"
            className="absolute z-10 -top-5 left-3 bg-[#86A0FD] !text-xs font-semibold text-white px-2 py-1 border-2 border-primary rounded-3xl"
          >
            Password
          </label>
          <Form.Item name="password" className="!relative">
            <Input
              className="px-5 py-3 !text-white placeholder:!text-white rounded-xl !bg-[#6788FC] focus:bg-[#6788FC] hover:bg-[#6788FC] !border-none"
              placeholder="********"
              type="password"
              id="password"
              size="large"
              required
            />
          </Form.Item>
        </div>
        <Form.Item hidden name="type">
          <Input />
        </Form.Item>
        <Divider className="!text-white !border-white">Or</Divider>
        <Link
          className="text-center text-white underline block text-sm font-medium"
          to={mobile ? "/auth/login" : "/auth/login?mobile=true"}
        >
          Sign in with {mobile ? "email" : "phone number"}
        </Link>
        <Button
          className="!rounded-3xl !h-[50px] bg-white text-silver hover:!bg-white hover:!text-primary hover:!font-bold"
          loading={isLoading}
          htmlType="submit"
          type="primary"
          size="large"
          block
        >
          Login
        </Button>
      </Form>
    </div>
  );
}

export default LoginPage;
