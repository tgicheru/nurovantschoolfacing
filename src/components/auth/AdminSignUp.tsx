import React from 'react';
import { Form, Input, Button, Select, Typography, Card, notification } from 'antd';
import { useAdminSignUp } from '../../hooks/auth/auth';
import { AdminSignUpRequest } from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { Option } = Select;

const AdminSignUp: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { adminSignUp, isLoading, error } = useAdminSignUp();

  // State options
  const stateOptions = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 
    'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 
    'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 
    'Wisconsin', 'Wyoming'
  ];

  // Grade level options
  const gradeLevelOptions = [
    'Kindergarten', '1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade',
    '6th Grade', '7th Grade', '8th Grade', '9th Grade', '10th Grade', '11th Grade', '12th Grade'
  ];

  // Subject options
  const subjectOptions = [
    'Mathematics', 'English', 'Science', 'Social Studies', 'Art', 'Music', 
    'Physical Education', 'Foreign Language', 'Computer Science', 'Other'
  ];

  // Handle form submission
  const handleSubmit = async (values: AdminSignUpRequest) => {
    try {
      // Set user_type to ADMIN and skip verification
      values.user_type = 'ADMIN';
      values.skip_verification = true;
      
      // Call the adminSignUp mutation
      const response = await adminSignUp(values);
      
      if (response.success) {
        notification.success({
          message: 'Sign Up Successful',
          description: 'Your admin account has been created successfully.',
        });
        
        // Redirect directly to dashboard (bypassing verification)
        navigate('/main/overview');
      }
    } catch (err: any) {
      notification.error({
        message: 'Sign Up Failed',
        description: err.response?.data?.message || 'An error occurred during sign up.',
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-md">
        <div className="text-center mb-6">
          <Title level={3}>Admin Sign Up</Title>
          <p className="text-gray-500">Create your administrator account</p>
        </div>
        
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark={false}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="first_name"
              label="First Name"
              rules={[{ required: true, message: 'Please enter your first name' }]}
            >
              <Input placeholder="John" />
            </Form.Item>
            
            <Form.Item
              name="last_name"
              label="Last Name"
              rules={[{ required: true, message: 'Please enter your last name' }]}
            >
              <Input placeholder="Steve" />
            </Form.Item>
          </div>
          
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input placeholder="johnsteve@gmail.com" />
          </Form.Item>
          
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Please enter your password' },
              { min: 8, message: 'Password must be at least 8 characters' },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                message: 'Password must include uppercase, lowercase, number and special character'
              }
            ]}
          >
            <Input.Password placeholder="••••••••" />
          </Form.Item>
          
          <Form.Item
            name="state"
            label="State"
            rules={[{ required: true, message: 'Please select your state' }]}
          >
            <Select placeholder="Select state">
              {stateOptions.map(state => (
                <Option key={state} value={state}>{state}</Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            name="sex"
            label="Sex"
            rules={[{ required: true, message: 'Please select your sex' }]}
          >
            <Select placeholder="Select sex">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="grade_level"
            label="Grade Level"
            rules={[{ required: true, message: 'Please select your grade level' }]}
          >
            <Select placeholder="Select grade level">
              {gradeLevelOptions.map(grade => (
                <Option key={grade} value={grade}>{grade}</Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            name="subject"
            label="Subject"
            rules={[{ required: true, message: 'Please select your subject' }]}
          >
            <Select placeholder="Select subject">
              {subjectOptions.map(subject => (
                <Option key={subject} value={subject}>{subject}</Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              className="w-full bg-[#4970FC]" 
              loading={isLoading}
            >
              Create Admin Account
            </Button>
          </Form.Item>
          
          <div className="text-center mt-4">
            <p className="text-gray-500">
              Already have an account?{' '}
              <a href="/login" className="text-[#4970FC]">
                Sign In
              </a>
            </p>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default AdminSignUp;
