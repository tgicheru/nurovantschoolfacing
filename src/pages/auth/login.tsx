import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Divider, Form, Input } from 'antd'
import OAuth from './components/oauth';
import { useLogin } from '../../hooks/auth/authentications';

function LoginPage() {
  const navigate = useNavigate()
  const toHome = () => navigate("/")
  const { mutate, isLoading } = useLogin(toHome)
  return (
    <div className='w-full space-y-5'>
      <div className="w-full">
        <p className="text-2xl font-bold text-[#161617]">Login</p>
        <p className="text-sm font-semibold text-[#57585A]">Welcome Back, glad to see you! 😊</p>
      </div>

      <OAuth successAction={toHome} />

      <Divider className='text-sm font-semibold text-[#6D6E71]'>Or</Divider>

      <Form onFinish={mutate} layout="vertical">
        <Form.Item label="Email" name="email" >
          <div className="w-full rounded-xl p-[1px] bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]">
            <Input placeholder="Enter email address here" className='h-[50px] !border-none bg-[#F5F5F5E5] !rounded-xl' size="large" required />
          </div>
        </Form.Item>
        <Form.Item label="Password" name="password">
          <div className="w-full rounded-xl p-[1px] bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]">
            <Input.Password placeholder="Enter password" className='h-[50px] !border-none bg-[#F5F5F5E5] !rounded-xl' size="large" required />
          </div>
        </Form.Item>
        <Link className="block text-base font-medium text-primary mb-5" to="/auth/forgot">Forgot Password</Link>
        <Button loading={isLoading} className="bg-primary !h-[50px]" size="large" block type="primary" htmlType="submit" shape="round">Continue</Button>
      </Form>

      <div className='flex justify-center items-center gap-2'>
        <p className='text-base font-medium'>Don't have an account? </p>
        <Link className="block text-base font-medium text-primary" to="/auth">Sign Up</Link>
      </div>
    </div>
  )
}

export default LoginPage