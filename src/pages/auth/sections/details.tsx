import React from 'react'
import { Link } from "react-router-dom"
import { Button, Divider, Form, Input, Select } from 'antd'
import OAuth from '../components/oauth';
import { grades, states, subjects } from '../../../constants';

type Props = {
  handleSection: any
}
function DetailsSection({ handleSection }: Props) {
  const [form] = Form.useForm()

  const handleSubmit = () => handleSection()
  return (
    <div className='w-full space-y-5'>
      <div className="w-full">
        <p className="text-2xl font-bold text-[#161617]">Sign up your account</p>
        <p className="text-sm font-semibold text-[#57585A]">Fill in these details to get your account running.</p>
      </div>

      <OAuth successAction={() => handleSection("other")} />

      <Divider className='text-sm font-semibold text-[#6D6E71]'>Or</Divider>

      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-5'>
          <Form.Item label="First Name" name="first_name">
            <div className="w-full rounded-xl p-[1px] bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]">
              <Input placeholder="Enter your first name here" className='h-[50px] !border-none bg-[#F5F5F5E5] !rounded-xl' size="large" required />
            </div>
          </Form.Item>
          <Form.Item label="Last Name" name="last_name">
            <div className="w-full rounded-xl p-[1px] bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]">
              <Input placeholder="Enter your last name here" className='h-[50px] !border-none bg-[#F5F5F5E5] !rounded-xl' size="large" required />
            </div>
          </Form.Item>
        </div>
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
        <Form.Item label="State" name="state" >
          <Select placeholder="Select state" className='!h-[50px]' size="large" options={states} />
        </Form.Item>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-5'>
          <Form.Item label="Grade Level" name="grade_level" >
            <Select placeholder="Select grade level" className='!h-[50px]' size="large" options={grades} />
          </Form.Item>
          <Form.Item label="Subject" name="subject" >
            <Select placeholder="Select subject" className='!h-[50px]' size="large" options={subjects} />
          </Form.Item>
        </div>
        <Button className="bg-primary !h-[50px]" size="large" block type="primary" htmlType="submit" shape="round">Continue</Button>
      </Form>

      <div className='flex justify-center items-center gap-2'>
        <p className='text-base font-medium'>Already have an account? </p>
        <Link className="block text-base font-medium text-primary" to="/auth/login">Sign In</Link>
      </div>
    </div>
  )
}

export default DetailsSection