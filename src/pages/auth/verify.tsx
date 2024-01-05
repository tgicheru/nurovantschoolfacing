import { Button, Form } from "antd";
import React, { useState } from "react";
import OtpInput from "react-otp-input";
import Countdown from "react-countdown";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useResend, useVerify } from "../../hooks/auth/authentications";

function VerifyPage() {
  const otpLen = 4;
  const { id } = useParams();
  const navigate = useNavigate();
  const [otp, setOTP] = useState("");
  const [params] = useSearchParams();
  const email = params.get("email");
  const mobile = params.get("mobile");
  const country = params.get("country");
  const decodedMobile = decodeURIComponent(
    mobile!?.replace(/%(?![0-9A-Fa-f]{2})/g, "")
  );

  const successAction = () => {
    if (mobile)
      navigate(`/auth/password?mobile=${decodedMobile}&country=${country}`);
    else navigate(`/auth/password?email=${email}`);
  };
  const { mutate, isLoading } = useVerify(successAction);
  const onSubmit = () => mutate({ reference_id: id!, otp } as any);
  const [timeLapse, setTimeLapse] = useState(Date.now() + 30000);
  const { mutate: resendAction, isLoading: resendLoad } = useResend();
  const handleResend = () => {
    resendAction({ email });
    setTimeLapse(Date.now() + 30000);
  };

  return (
    <div className="w-full text-white px-5 py-10 md:p-14 space-y-5 max-w-[500px] mx-auto">
      <div className="text-center space-y-3">
        <p className="text-4xl font-bold">
          Verify {email ? "Email Address" : "Phone number"}
        </p>
        <p className="text-lg font-normal">
          Code is sent to <b>{email ? email : `+${mobile}`}</b>
        </p>
      </div>

      <Form onFinish={onSubmit} layout="vertical" className="space-y-5">
        <Form.Item className="">
          <OtpInput
            value={otp}
            onChange={setOTP}
            numInputs={otpLen}
            renderInput={(props) => (
              <input
                {...props}
                className="!w-full h-[70px] mx-2 text-[40px] font-extrabold text-white !bg-[#DBE2FE] rounded-xl"
              />
            )}
          />
        </Form.Item>
        <div className="text-white text-center text-base font-normal">
          <Countdown
            autoStart
            date={timeLapse}
            renderer={({ seconds }) =>
              !seconds ? (
                <Button
                  loading={resendLoad}
                  onClick={handleResend}
                  className="!bg-transparent !p-0 !m-0 font-bold !underline text-white hover:!text-silver"
                  size="large"
                  type="text"
                >
                  Resend Code
                </Button>
              ) : (
                <span className="text-white">
                  Resend in {String(seconds).padStart(2, "0")} seconds
                </span>
              )
            }
          />
        </div>
        <Button
          loading={isLoading}
          disabled={otp.length !== otpLen}
          block
          className="!rounded-3xl !h-[50px] bg-white disabled:bg-transparent disabled:text-white text-silver hover:!bg-white hover:!text-primary hover:!font-bold"
          size="large"
          type="primary"
          htmlType="submit"
        >
          Verify & Create Account
        </Button>
      </Form>
    </div>
  );
}

export default VerifyPage;
