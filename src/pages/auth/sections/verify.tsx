import { Button, Form } from "antd";
import React, { useState } from "react";
import OtpInput from "react-otp-input";
import Countdown from "react-countdown";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useResend, useVerify } from "../../../hooks/auth/authentications";

function VerifySection() {
  const otpLen = 4;
  const navigate = useNavigate();
  const [otp, setOTP] = useState("");
  const [params] = useSearchParams();
  const email = params.get("email");

  const { mutate, isLoading } = useVerify();

  const handleSubmit = () => navigate("/")
  const [timeLapse, setTimeLapse] = useState(Date.now() + 30000);
  const { mutate: resendAction, isLoading: resendLoad } = useResend();
  const handleResend = () => {
    resendAction({ email });
    setTimeLapse(Date.now() + 30000);
  };

  return (
    <div className="w-full space-y-5">
      <div className="w-full">
        <p className="text-2xl font-bold text-[#161617]">Verify you’re not a bot 🤖</p>
        <p className="text-sm font-semibold text-[#57585A]">A 4 digit code will be sent to your email to verify your account.</p>
      </div>

      <p className="text-sm font-bold text-[#161617]">4 Digit-Code</p>

      <Form onFinish={handleSubmit} layout="vertical" className="space-y-5">
        <Form.Item>
          <OtpInput
            value={otp}
            onChange={setOTP}
            numInputs={otpLen}
            renderInput={(props) => (
              <div className="w-full mx-3 rounded-xl p-[1px] bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]">
                <input
                  {...props}
                  className="!w-full h-[70px] text-[40px] font-extrabold rounded-xl"
                />
              </div>
            )}
          />
        </Form.Item>

        <div hidden className="text-center text-base font-normal">
          <Countdown
            autoStart
            date={timeLapse}
            renderer={({ seconds }) =>
              !seconds ? (
                <Button
                  loading={resendLoad}
                  onClick={handleResend}
                  className="!bg-transparent !p-0 !m-0 font-bold !underline hover:!text-silver"
                  size="large"
                  type="text"
                >
                  Resend Code
                </Button>
              ) : (<span>Resend in {String(seconds).padStart(2, "0")} seconds</span>)
            }
          />
        </div>

        <Button
          block
          size="large"
          shape="round"
          type="primary"
          htmlType="submit"
          loading={isLoading}
          disabled={otp.length !== otpLen}
          className="bg-primary !h-[50px]"
        >Continue</Button>
      </Form>
    </div>
  );
}

export default VerifySection;
