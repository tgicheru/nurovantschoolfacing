import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Divider, notification, Select } from 'antd';
import { useRecoilState } from 'recoil';
import authAtom from '../../atoms/auth/auth.atom';
import OAuth from './components/oauth';
import { useAdminSignUp } from '../../hooks/auth/auth';
import { AdminSignUpRequest } from '../../services/auth.service';

const AdminSignupPage = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useRecoilState(authAtom);
  const { adminSignUp, isLoading } = useAdminSignUp();
  
  // State options for dropdown
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

  // Subject options
  const subjectOptions = [
    'Mathematics', 'English', 'Science', 'Social Studies', 'Art', 'Music', 
    'Physical Education', 'Foreign Language', 'Computer Science', 'Other'
  ];

  // Grade level options
  const gradeLevelOptions = [
    'Kindergarten', '1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade',
    '6th Grade', '7th Grade', '8th Grade', '9th Grade', '10th Grade', '11th Grade', '12th Grade'
  ];
  
  // Handle form submission with real API integration
  const handleSignup = async (values: any) => {
    try {
      console.log('Form values:', values); // Debug form values
      
      // Prepare admin signup data
      const signupData: AdminSignUpRequest = {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        password: values.password,
        state: values.state,
        sex: values.sex,
        grade_level: values.grade_level,
        subject: values.subject,
        user_type: 'ADMIN',
        skip_verification: true // Skip verification step
      };
      
      // Call the admin signup API
      const response = await adminSignUp(signupData);
      
      if (response.success) {
        // Update local auth state
        setAuth({
          ...auth,
          user: response.data.user,
          isAdmin: true,
          token: response.data.token
        });
        
        notification.success({
          message: 'Sign Up Successful',
          description: 'Your admin account has been created successfully.'
        });
        
        // Navigate directly to admin dashboard (bypassing verification)
        navigate('/admin/dashboard');
      }
    } catch (err: any) {
      console.error('Signup error:', err); // Debug error
      notification.error({
        message: 'Sign Up Failed',
        description: err.response?.data?.message || 'An error occurred during sign up.'
      });
    }
  };
  
  const toHome = () => navigate('/');

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="w-full mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Admin Sign Up</h1>
        <p className="text-sm font-medium text-neutral-600">Create your admin account to manage the platform</p>
      </div>
      
      <OAuth successAction={toHome} />
      
      <Divider className="text-sm font-medium text-neutral-500">Or</Divider>
      
      <Form layout="vertical" onFinish={handleSignup} className="w-full" initialValues={{ sex: 'male' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item 
            label="First Name" 
            name="first_name"
            rules={[{ required: true, message: 'Please enter your first name' }]}
          >
            <div className="w-full rounded-xl p-[1px] bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]">
              <Input 
                placeholder="John" 
                className="h-[50px] !border-none bg-[#F5F5F5E5] !rounded-xl" 
                size="large" 
              />
            </div>
          </Form.Item>
          
          <Form.Item 
            label="Last Name" 
            name="last_name"
            rules={[{ required: true, message: 'Please enter your last name' }]}
          >
            <div className="w-full rounded-xl p-[1px] bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]">
              <Input 
                placeholder="Steve" 
                className="h-[50px] !border-none bg-[#F5F5F5E5] !rounded-xl" 
                size="large" 
              />
            </div>
          </Form.Item>
        </div>
        
        <Form.Item 
          label="Email" 
          name="email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <div className="w-full rounded-xl p-[1px] bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]">
            <Input 
              placeholder="Enter your email address" 
              className="h-[50px] !border-none bg-[#F5F5F5E5] !rounded-xl" 
              size="large" 
            />
          </div>
        </Form.Item>
        
        <Form.Item 
          label="Password" 
          name="password"
          rules={[
            { required: true, message: 'Please enter a password' },
            { min: 8, message: 'Password must be at least 8 characters' }
          ]}
        >
          <div className="w-full rounded-xl p-[1px] bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]">
            <Input.Password 
              placeholder="Create a password" 
              className="h-[50px] !border-none bg-[#F5F5F5E5] !rounded-xl" 
              size="large" 
            />
          </div>
        </Form.Item>
        
        <Form.Item 
          label="Confirm Password" 
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm your password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match'));
              },
            }),
          ]}
        >
          <div className="w-full rounded-xl p-[1px] bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]">
            <Input.Password 
              placeholder="Confirm your password" 
              className="h-[50px] !border-none bg-[#F5F5F5E5] !rounded-xl" 
              size="large" 
            />
          </div>
        </Form.Item>
        
        <Form.Item 
          label="State" 
          name="state"
          rules={[{ required: true, message: 'Please select your state' }]}
        >
          <Select
            placeholder="Select state"
            className="h-[50px] !rounded-xl"
            size="large"
            style={{ width: '100%' }}
            options={stateOptions.map(state => ({ label: state, value: state }))}
          />
        </Form.Item>
        
        <Form.Item 
          label="Sex" 
          name="sex"
          rules={[{ required: true, message: 'Please select your sex' }]}
        >
          <Select
            placeholder="Select sex"
            className="h-[50px] !rounded-xl"
            size="large"
            style={{ width: '100%' }}
            options={[
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' },
              { label: 'Other', value: 'other' }
            ]}
          />
        </Form.Item>
        
        <Form.Item 
          label="Grade Level" 
          name="grade_level"
          rules={[{ required: true, message: 'Please select your grade level' }]}
        >
          <Select
            placeholder="Select grade level"
            className="h-[50px] !rounded-xl"
            size="large"
            style={{ width: '100%' }}
            options={gradeLevelOptions.map(grade => ({ label: grade, value: grade }))}
          />
        </Form.Item>
        
        <Form.Item 
          label="Subject" 
          name="subject"
          rules={[{ required: true, message: 'Please select your subject' }]}
        >
          <Select
            placeholder="Select subject"
            className="h-[50px] !rounded-xl"
            size="large"
            style={{ width: '100%' }}
            options={subjectOptions.map(subject => ({ label: subject, value: subject }))}
          />
        </Form.Item>
        
        <Button 
          type="primary" 
          htmlType="submit"
          className="bg-primary !h-[50px] mt-4" 
          size="large" 
          block 
          shape="round"
          loading={isLoading}
        >
          Create Admin Account
        </Button>
      </Form>
      
      <div className="flex justify-center items-center gap-2 mt-6">
        <p className="text-base font-medium text-neutral-600">Already have an account?</p>
        <Button 
          type="link" 
          className="p-0 text-base font-medium text-primary"
          onClick={() => navigate('/auth/admin-login')}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default AdminSignupPage;
