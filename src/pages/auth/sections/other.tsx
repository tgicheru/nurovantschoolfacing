import { Button, Form, Select } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router'
import { grades, states, subjects } from '../../../constants'

function OtherSection() {
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const handleSubmit = () => navigate("/")
  return (
    <div className='w-full space-y-5'>
      <div className="w-full">
        <p className="text-2xl font-bold text-[#161617]">One more step</p>
        <p className="text-sm font-semibold text-[#57585A]">Fill in these details to get your account running.</p>
      </div>

      <Form form={form} onFinish={handleSubmit} layout="vertical">
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
    </div>
  )
}

export default OtherSection