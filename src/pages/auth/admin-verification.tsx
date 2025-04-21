import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from 'antd';
import { useRecoilState } from 'recoil';
import authAtom from '../../atoms/auth/auth.atom';

const AdminVerificationPage = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useRecoilState(authAtom);
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
  
  // Handle OTP input changes
  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input if value is entered
      if (value !== '' && index < 3) {
        inputRefs[index + 1].current?.focus();
      }
    }
  };
  
  // Handle key press for backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };
  
  // Handle verification submission
  const handleVerify = () => {
    const otpValue = otp.join('');
    
    // Mock verification for now - in a real app, this would call an API
    if (otpValue.length === 4) {
      // Update auth state to indicate verification is complete
      setAuth({
        ...auth,
        verified: true
      });
      
      // Navigate to admin dashboard
      navigate('/admin/dashboard');
    }
  };
  
  // Check if all OTP fields are filled
  const isOtpComplete = otp.every(digit => digit !== '');
  
  return (
    <div className="min-h-screen w-full bg-[#FDF8F3] flex flex-col items-center justify-center">
      <div className="w-full max-w-md px-4">
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#101828] mb-2">Verify you're not a bot 🤖</h2>
          <p className="text-sm text-[#667085]">
            A 4 digit code will be sent to your email to verify your account.
          </p>
        </div>
        
        <div className="mb-8">
          <p className="text-sm font-medium text-[#101828] mb-3">4 Digit Code</p>
          <div className="flex justify-between gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-full h-14 text-center text-xl font-bold bg-[#F9FAFB] border border-[#EAECF0] rounded-lg focus:border-[#4970FC] focus:outline-none focus:ring-1 focus:ring-[#4970FC]"
              />
            ))}
          </div>
        </div>
        
        <Button
          onClick={handleVerify}
          disabled={!isOtpComplete}
          className={`w-full h-12 rounded-full font-medium ${
            isOtpComplete 
              ? 'bg-[#4970FC] text-white hover:bg-[#3A5AD9]' 
              : 'bg-[#EEF4FF] text-[#4970FC] cursor-not-allowed'
          }`}
          type={isOtpComplete ? 'primary' : 'default'}
        >
          Continue
        </Button>
        
        <div className="text-center mt-10 text-xs text-[#667085]">
          <p>By registering, you agree to our <Link to="/public/terms" className="text-[#4970FC]">Terms of Service</Link> and <Link to="/public/privacy" className="text-[#4970FC]">Privacy Policy</Link></p>
          <p className="mt-2">© NurovantAI 2024. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminVerificationPage;
