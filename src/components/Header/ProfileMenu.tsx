import React from 'react';
import { Dropdown, Menu, Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LogoutOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import { useSetRecoilState } from 'recoil';
import authAtom from '../../atoms/auth/auth.atom';

interface ProfileMenuProps {
  userName?: string;
  avatarColor?: string;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ 
  userName = 'User', 
  avatarColor = '#F9A826' 
}) => {
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authAtom);
  
  // Get the first letter of the user name for the avatar
  const avatarText = userName.charAt(0).toUpperCase();
  
  const handleLogout = () => {
    // Clear authentication state
    setAuth({
      isLoggedIn: false,
      user: null,
      token: null,
      onBoarded: false,
      role: null,
      isAdmin: false,
    });
    
    // Navigate to login page
    navigate('/auth/admin-login');
  };
  
  const menu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />} onClick={() => navigate('/settings')}>
        Profile
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />} onClick={() => navigate('/settings')}>
        Settings
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );
  
  return (
    <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium cursor-pointer" style={{ backgroundColor: avatarColor }}>
        {avatarText}
      </div>
    </Dropdown>
  );
};

export default ProfileMenu;
