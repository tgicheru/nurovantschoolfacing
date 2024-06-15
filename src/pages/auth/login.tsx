import React from 'react'
import { Link } from 'react-router-dom'
import AppleIcon from "../../assets/Apple.svg";
import GoogleIcon from "../../assets/Google.svg";
import AuthContainer from '../../components/AuthContainer'
import { Button, Divider, Form, Input, notification } from 'antd'
import { useEmailLogin } from '../../hooks/auth/authentications';
import { signInWithPopup } from 'firebase/auth';
import { appleProvider, auth, provider } from '../../firebaseAuth/config';

function LoginPage() {
  const { mutate, isLoading } = useEmailLogin();

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
    <AuthContainer>
      <div className="w-full md:w-[90%] rounded-lg p-5 md:p-10 bg-white space-y-5">
        <div className="flex justify-between items-center">
          <div className="">
            <p className="text-2xl font-semibold text-[#1B1B1B]">Hey there!</p>
            <p className="text-sm font-normal text-[#1B1B1B]">Capturing knowledge one step at a time</p>
          </div>
          <Link className="block text-base font-medium text-primary" to="/auth">Create a new account</Link>
        </div>

        <Form onFinish={mutate} layout="vertical">
          <Form.Item label="Email" name="email">
            <Input placeholder="Enter full name" size="large" required />
          </Form.Item>
          <Form.Item label="  Password" name="password">
            <Input.Password placeholder="Enter password" size="large" required />
          </Form.Item>
          <Button loading={isLoading} className="bg-primary !h-[50px]" size="large" block type="primary" htmlType="submit" shape="round">Log in</Button>
        </Form>

        <Divider className="text-sm font-normal">Or sign in with</Divider>

        {/* Other login options */}
        <div className="flex w-full items-center justify-center flex-row gap-5">
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
    </AuthContainer>
  )
}

export default LoginPage