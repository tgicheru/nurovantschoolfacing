import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button, Checkbox, Form, Input } from "antd";
import { FaCheckCircle } from "react-icons/fa";
import { usePassword } from "../../hooks/auth/authentications";

function RegisterPage() {
  const pswdCheck = new RegExp(
    /^(?=.*?[0-9])(?=.*?[$&+,:;=?@#|'<>.^*()%!-])(?=.*?[A-Z]).*$/
  );
  const [isAgree, setIsAgree] = useState(false);
  const [password, setPassword] = useState("");
  const [params] = useSearchParams();
  const email = params.get("email");
  const mobile = params.get("mobile");
  const country = params.get("country");
  const decodedMobile = mobile!?.trimStart().replace(/ /g, "");
  const { mutate, isLoading } = usePassword(
    email ? "/api/teachers/signup_email" : "/api/auth/register_mobile"
  );
  const onSubmit = () => {
    if (email) {
      mutate({ email, password } as any);
      return;
    } else {
      mutate({ mobile: `+${decodedMobile}`, password, country } as any);
      return;
    }
  };
  return (
    <div className="w-full text-white px-5 sm:px-10 md:px-14 space-y-10 max-w-[500px] mx-auto">
      <div className="text-center">
        <p className="text-4xl font-bold">Set a password</p>
        <p className="text-lg font-medium px-5">
          Set your password & Secure your quest!
        </p>
      </div>

      <Form
        onFinish={onSubmit}
        layout="vertical"
        className="space-y-5 relative"
      >
        <label
          htmlFor="password"
          className="absolute z-10 -top-5 left-3 bg-[#86A0FD] !text-xs font-semibold text-white px-2 py-1 border-2 border-primary rounded-3xl"
        >
          Password
        </label>
        <Form.Item name="password" className="!relative">
          <Input
            className="px-5 py-3 !text-white placeholder:!text-white rounded-xl !bg-[#6788FC] focus:bg-[#6788FC] hover:bg-[#6788FC] !border-none"
            onChange={({ target: { value } }) => setPassword(value)}
            placeholder="********"
            value={password}
            type="password"
            id="password"
            size="large"
            required
          />
        </Form.Item>
        <div className="text-[#C2CFFE] space-y-4">
          <p className="flex items-center gap-2 text-sm font-medium">
            <FaCheckCircle
              className={`text-lg ${password.length >= 8 && "text-[#27CA40]"}`}
            />
            <span>8 characters long</span>
          </p>
          <p className="flex items-center gap-2 text-sm font-medium">
            <FaCheckCircle
              className={`text-lg ${
                password && pswdCheck.test(password) && "text-[#27CA40]"
              }`}
            />
            <span>Alphanumeric Characters</span>
          </p>
          <Checkbox
            checked={isAgree}
            onChange={({ target: { checked } }) => setIsAgree(checked)}
            className="!text-[14px] text-white font-normal flex items-start justify-start"
            style={{
              display: "flex",
              alignContent: "start",
            }}
          >
            By Clicking on this box, you agree to our{" "}
            <Link
              to="https://www.nurovant.com/termofservice.html"
              target="_blank"
              className="font-semibold underline"
            >
              Terms & Condition
            </Link>
          </Checkbox>
        </div>
        <Button
          loading={isLoading}
          disabled={
            !(password.length >= 8) || !pswdCheck.test(password) || !isAgree
          }
          block
          className="!rounded-3xl !h-[50px] bg-white disabled:bg-transparent disabled:text-white text-silver hover:!bg-white hover:!text-primary hover:!font-bold"
          size="large"
          type="primary"
          htmlType="submit"
        >
          Set Password
        </Button>
      </Form>
    </div>
  );
}

export default RegisterPage;
