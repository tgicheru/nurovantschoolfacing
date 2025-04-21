import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from 'antd';
import { useRecoilState } from 'recoil';
import authAtom from '../../atoms/auth/auth.atom';

// SVG icons for the role cards
const AdminIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.3333 10.6667V6C21.3333 5.07333 20.5933 4.33333 19.6667 4.33333H4.33333C3.40667 4.33333 2.66667 5.07333 2.66667 6V10.6667" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 20.3333C13.1046 20.3333 14 19.4379 14 18.3333C14 17.2288 13.1046 16.3333 12 16.3333C10.8954 16.3333 10 17.2288 10 18.3333C10 19.4379 10.8954 20.3333 12 20.3333Z" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19.6667 20.3333H14" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 18.3333H4.33333" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21.3333 10.6667H2.66667V14.6667H21.3333V10.6667Z" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EducatorIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.05 2.53L4.03002 6.46C2.10002 7.72 2.10002 10.54 4.03002 11.8L10.05 15.73C11.13 16.44 12.91 16.44 13.99 15.73L19.98 11.8C21.9 10.54 21.9 7.73 19.98 6.47L13.99 2.54C12.91 1.82 11.13 1.82 10.05 2.53Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5.63 13.08L5.62 17.77C5.62 19.04 6.6 20.4 7.8 20.8L10.99 21.86C11.54 22.04 12.45 22.04 13.01 21.86L16.2 20.8C17.4 20.4 18.38 19.04 18.38 17.77V13.13" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21.4 15V9" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const StudentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 15C14.0711 15 15.75 13.3211 15.75 11.25C15.75 9.17893 14.0711 7.5 12 7.5C9.92893 7.5 8.25 9.17893 8.25 11.25C8.25 13.3211 9.92893 15 12 15Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5.98126 18.6913C6.54555 17.5806 7.40438 16.6478 8.46318 15.9963C9.52197 15.3448 10.7399 15 11.9813 15C13.2226 15 14.4405 15.3448 15.4993 15.9963C16.5581 16.6478 17.417 17.5806 17.9813 18.6913" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const RoleSelectionPage = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useRecoilState(authAtom);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole) {
      // Update auth state with the selected role
      setAuth({
        ...auth,
        role: selectedRole,
        isAdmin: selectedRole === 'admin'
      });
      
      // Navigate to the next step based on role
      if (selectedRole === 'admin') {
        navigate('/auth/admin-signup');
      } else if (selectedRole === 'educator') {
        navigate('/auth'); // Normal auth flow for educators
      } else if (selectedRole === 'student') {
        // Redirect to external student app URL
        window.location.href = 'https://app.nurovant.com/auth';
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FDF8F3] flex flex-col items-center justify-center">
      <div className="w-full max-w-md px-4">
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#101828] mb-2">Let's get you started</h2>
          <p className="text-sm text-[#667085]">
            What type of user are you? This will determine the features you'll have access to.
          </p>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div 
            className={`flex flex-col items-center justify-center py-5 px-4 rounded-lg cursor-pointer transition-all ${
              selectedRole === 'admin' 
                ? 'bg-[#EEF4FF] border border-[#4970FC]' 
                : 'bg-[#F9FAFB] border border-[#EAECF0] hover:border-[#D0D5DD]'
            }`}
            onClick={() => handleRoleSelect('admin')}
          >
            <div className={`mb-2 ${selectedRole === 'admin' ? 'text-[#4970FC]' : 'text-[#292D32]'}`}>
              <AdminIcon />
            </div>
            <span className={`text-sm font-medium ${selectedRole === 'admin' ? 'text-[#4970FC]' : 'text-[#101828]'}`}>
              Admin
            </span>
          </div>
          
          <div 
            className={`flex flex-col items-center justify-center py-5 px-4 rounded-lg cursor-pointer transition-all ${
              selectedRole === 'educator' 
                ? 'bg-[#EEF4FF] border border-[#4970FC]' 
                : 'bg-[#F9FAFB] border border-[#EAECF0] hover:border-[#D0D5DD]'
            }`}
            onClick={() => handleRoleSelect('educator')}
          >
            <div className={`mb-2 ${selectedRole === 'educator' ? 'text-[#4970FC]' : 'text-[#292D32]'}`}>
              <EducatorIcon />
            </div>
            <span className={`text-sm font-medium ${selectedRole === 'educator' ? 'text-[#4970FC]' : 'text-[#101828]'}`}>
              An educator
            </span>
          </div>
          
          <div 
            className={`flex flex-col items-center justify-center py-5 px-4 rounded-lg cursor-pointer transition-all ${
              selectedRole === 'student' 
                ? 'bg-[#EEF4FF] border border-[#4970FC]' 
                : 'bg-[#F9FAFB] border border-[#EAECF0] hover:border-[#D0D5DD]'
            }`}
            onClick={() => handleRoleSelect('student')}
          >
            <div className={`mb-2 ${selectedRole === 'student' ? 'text-[#4970FC]' : 'text-[#292D32]'}`}>
              <StudentIcon />
            </div>
            <span className={`text-sm font-medium ${selectedRole === 'student' ? 'text-[#4970FC]' : 'text-[#101828]'}`}>
              A student
            </span>
          </div>
        </div>
        
        <Button
          onClick={handleContinue}
          disabled={!selectedRole}
          className={`w-full h-12 rounded-full font-medium ${
            selectedRole 
              ? 'bg-[#4970FC] text-white hover:bg-[#3A5AD9]' 
              : 'bg-[#EEF4FF] text-[#4970FC] cursor-not-allowed'
          }`}
          type={selectedRole ? 'primary' : 'default'}
        >
          Continue
        </Button>
        
        <div className="text-center mt-6">
          <p className="text-sm text-[#667085]">
            Not new here? {
              selectedRole === 'student' ? (
                <a href="https://app.nurovant.com/auth" className="text-[#4970FC] font-medium">Login</a>
              ) : (
                <Link to={selectedRole === 'admin' ? "/auth/admin-login" : "/auth/login"} className="text-[#4970FC] font-medium">Login</Link>
              )
            }
          </p>
        </div>
        
        <div className="text-center mt-10 text-xs text-[#667085]">
          <p>By registering, you agree to our <Link to="/public/terms" className="text-[#4970FC]">Terms of Service</Link> and <Link to="/public/privacy" className="text-[#4970FC]">Privacy Policy</Link></p>
          <p className="mt-2">© NurovantAI 2024. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionPage;
