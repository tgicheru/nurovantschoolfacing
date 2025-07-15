import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Card, Row, Col, Statistic, Spin, Alert, notification } from 'antd';
import { UserOutlined, BookOutlined, ReadOutlined, TeamOutlined, LoadingOutlined } from '@ant-design/icons';
import { useRecoilValue } from 'recoil';
import authAtom from '../../../atoms/auth/auth.atom';
import ProfileMenu from '../../../components/Header/ProfileMenu';
import { useAdminDashboardStats } from '../../../hooks/admin/admin';
import useOnboardingRedirect from '../../../hooks/useOnboardingRedirect';

const AdminOverview = () => {
  const navigate = useNavigate();
  const auth = useRecoilValue(authAtom);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Fetch real dashboard stats from API
  const { dashboardStats, isLoading, error, isAuthError, refetch } = useAdminDashboardStats();
  
  // Check if user needs onboarding
  useOnboardingRedirect();
  
  // Handle authentication errors
  useEffect(() => {
    if (isAuthError) {
      notification.error({
        message: 'Authentication Error',
        description: 'Your session has expired. Please log in again.',
        duration: 5
      });
      
      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate('/auth/admin-login');
      }, 2000);
    }
  }, [isAuthError, navigate]);
  
  // Use API data with default values for missing fields
  const stats = {
    totalTeachers: dashboardStats?.totalTeachers ?? 0,
    totalStudents: dashboardStats?.totalStudents ?? 0,
    totalCourses: dashboardStats?.totalCourses ?? 0,
    totalLectures: dashboardStats?.totalLectures ?? 0
  };
  
  // Log the actual stats for debugging
  console.log('Dashboard stats being displayed:', stats);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-[#EAECF0] px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/admin/dashboard" className="text-[#4970FC] font-semibold text-xl">
              NurovantAI
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button className="border border-[#D0D5DD] rounded-lg px-3 py-1 h-auto">
              Upgrade Plan
            </Button>
            <ProfileMenu userName="Peter" />
          </div>
        </div>
      </header>

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Show loading state */}
          {isLoading && (
            <div className="flex justify-center items-center mb-8">
              <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
              <span className="ml-2">Loading dashboard data...</span>
            </div>
          )}
          
          {/* Show error state */}
          {error && !isAuthError && (
            <Alert
              message="Error Loading Dashboard"
              description={
                <>
                  <p>Failed to load dashboard data. {error.message}</p>
                  <Button type="primary" onClick={() => refetch()} className="mt-2">
                    Try Again
                  </Button>
                </>
              }
              type="error"
              showIcon
              className="mb-8"
            />
          )}
          <div className="mb-8">
            <div className="flex space-x-8 border-b border-[#EAECF0]">
              <button 
                className={`py-2 px-1 ${activeTab === 'overview' ? 'text-[#4970FC] border-b-2 border-[#4970FC] font-medium' : 'text-[#667085]'}`}
                onClick={() => {
                  setActiveTab('overview');
                  navigate('/admin/dashboard');
                }}
              >
                Overview
              </button>
              <button 
                className={`py-2 px-1 ${activeTab === 'teachers' ? 'text-[#4970FC] border-b-2 border-[#4970FC] font-medium' : 'text-[#667085]'}`}
                onClick={() => {
                  setActiveTab('teachers');
                  navigate('/admin/teachers');
                }}
              >
                Teachers
              </button>
              <button 
                className={`py-2 px-1 ${activeTab === 'students' ? 'text-[#4970FC] border-b-2 border-[#4970FC] font-medium' : 'text-[#667085]'}`}
                onClick={() => {
                  setActiveTab('students');
                  navigate('/admin/students');
                }}
              >
                Students
              </button>
              {/* Curriculum tab commented out for now */}
              {/* <button 
                className={`py-2 px-1 ${activeTab === 'curriculum' ? 'text-[#4970FC] border-b-2 border-[#4970FC] font-medium' : 'text-[#667085]'}`}
                onClick={() => {
                  setActiveTab('curriculum');
                  navigate('/admin/curriculum');
                }}
              >
                Curriculum
              </button> */}
              <button 
                className={`py-2 px-1 ${activeTab === 'review' ? 'text-[#4970FC] border-b-2 border-[#4970FC] font-medium' : 'text-[#667085]'}`}
                onClick={() => {
                  setActiveTab('review');
                  navigate('/review-report');
                }}
              >
                Review & Report
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-[#101828]">Dashboard Overview</h1>
            <p className="text-[#667085]">Welcome to the NurovantAI admin dashboard.</p>
          </div>

          <div className="mb-8">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={8}>
                <Card bordered={false} className="shadow-sm">
                  <Statistic
                    title="Total Teachers"
                    value={stats.totalTeachers}
                    prefix={<UserOutlined className="text-[#4970FC] mr-2" />}
                    className="text-[#101828]"
                    loading={isLoading}
                  />
                  <div className="mt-2">
                    <Link to="/admin/teachers" className="text-[#4970FC] text-sm">
                      View all teachers
                    </Link>
                  </div>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card bordered={false} className="shadow-sm">
                  <Statistic
                    title="Total Students"
                    value={stats.totalStudents}
                    prefix={<TeamOutlined className="text-[#4970FC] mr-2" />}
                    className="text-[#101828]"
                    loading={isLoading}
                  />
                  <div className="mt-2">
                    <Link to="/admin/students" className="text-[#4970FC] text-sm">
                      View all students
                    </Link>
                  </div>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card bordered={false} className="shadow-sm">
                  <Statistic
                    title="Total Courses"
                    value={stats.totalCourses}
                    prefix={<BookOutlined className="text-[#4970FC] mr-2" />}
                    className="text-[#101828]"
                    loading={isLoading}
                  />
                  <div className="mt-2">
                    <Link to="#" className="text-[#4970FC] text-sm">
                      View all courses
                    </Link>
                  </div>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card bordered={false} className="shadow-sm">
                  <Statistic
                    title="Total Lectures"
                    value={stats.totalLectures}
                    prefix={<ReadOutlined className="text-[#4970FC] mr-2" />}
                    className="text-[#101828]"
                    loading={isLoading}
                  />
                  <div className="mt-2">
                    <Link to="#" className="text-[#4970FC] text-sm">
                      View all lectures
                    </Link>
                  </div>
                </Card>
              </Col>

            </Row>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-[#101828] mb-4">Quick Actions</h2>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={6}>
                <Button 
                  type="primary" 
                  className="bg-[#4970FC] h-auto py-2 px-4 w-full"
                  onClick={() => navigate('/admin/teachers')}
                >
                  Add New Teacher
                </Button>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Button 
                  type="default" 
                  className="border-[#D0D5DD] h-auto py-2 px-4 w-full"
                  onClick={() => navigate('/admin/students')}
                >
                  Add New Student
                </Button>
              </Col>
              {/* Curriculum quick action commented out for now */}
              {/* <Col xs={24} sm={12} md={6}>
                <Button 
                  type="default" 
                  className="border-[#D0D5DD] h-auto py-2 px-4 w-full"
                  onClick={() => navigate('/admin/curriculum')}
                >
                  Create New Course
                </Button>
              </Col> */}
              <Col xs={24} sm={12} md={6}>
                <Button 
                  type="default" 
                  className="border-[#D0D5DD] h-auto py-2 px-4 w-full"
                  onClick={() => navigate('/review-report')}
                >
                  Generate Reports
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </main>

      <footer className="border-t border-[#EAECF0] px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="text-sm text-[#667085]">
            © NurovantAI 2024. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-sm text-[#667085]">
            <Link to="#" className="hover:text-[#101828]">Contact</Link>
            <Link to="#" className="hover:text-[#101828]">Terms of service</Link>
            <Link to="#" className="hover:text-[#101828]">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminOverview;
