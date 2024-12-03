import React, { useMemo } from 'react'
import AppleIcon from "../../../assets/Apple.svg";
import GoogleIcon from "../../../assets/Google.svg";
import { Link } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider, appleProvider } from "../../../firebaseAuth/config";
import { useOAuthRegister } from "../../../hooks/auth/authentications";
import { Button, Divider, Form, Input, notification } from 'antd'

function DetailsSection({
  payload,
  handleNext,
}:{ payload?: any; handleNext: any }) {
  const [form] = Form.useForm()
  const {isLoading,  mutate } = useOAuthRegister();

  useMemo(() => form.setFieldsValue(payload), [form, payload])

  const handleGoogleLogin = () => signInWithPopup(auth, provider)
    .then((res) => mutate({
        role: "teacher",
        sign_up_type: "google",
        email: res?.user?.email,
        name: res?.user?.displayName,
      } as unknown as void))
    .catch((err) => notification.error({message: "Error!", description: err?.message}));

  const handleAppleLogin = () => signInWithPopup(auth, appleProvider)
    .then((res) => mutate({
        role: "teacher",
        sign_up_type: "apple",
        email: res?.user?.email,
        name: res?.user?.displayName,
      } as unknown as void))
    .catch((err) => notification.error({message: "Error!", description: err?.message}));
  return (
    <div className='space-y-5'>
      <div className="flex flex-col md:flex-row justify-between items-center gap-3">
        <div className="">
          <p className="text-2xl font-semibold text-[#1B1B1B]">Hey there!</p>
          <p className="text-sm font-normal text-[#1B1B1B]">Capturing knowledge one step at a time</p>
        </div>
        <Link className="block text-base font-medium text-primary" to="/auth/login">Sign into my account</Link>
      </div>

      <Form form={form} onFinish={handleNext} layout="vertical">
        <Form.Item label="Full Name" name="full_name">
          <Input placeholder="Enter full name" size="large" required />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input placeholder="Enter email" size="large" required />
        </Form.Item>
        <Form.Item label="Set Password" name="password">
          <Input.Password placeholder="Enter password" size="large" required />
        </Form.Item>
        <Button className="bg-primary !h-[50px]" size="large" block type="primary" htmlType="submit" shape="round">Sign Up</Button>
      </Form>

      <Divider className="text-sm font-normal">Or sign up with</Divider>

      {/* Other login options */}
      <div className="flex w-full items-center justify-center flex-row gap-5 !hidden">
        <Button
          type="text"
          size="large"
          loading={isLoading}
          onClick={handleAppleLogin}
          className="!bg-transparent !p-0 !m-0 !w-[100px]"
          icon={<img src={AppleIcon} alt="apple-icon" />}
        />
        <Button
          type="text"
          size="large"
          loading={isLoading}
          onClick={handleGoogleLogin}
          className="!bg-transparent !p-0 !m-0 !w-[100px]"
          icon={<img src={GoogleIcon} alt="google-icon" />}
        />
      </div>
    </div>
  )
}

export default DetailsSection