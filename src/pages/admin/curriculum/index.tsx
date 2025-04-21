import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Input, Upload, message, Dropdown, Menu } from 'antd';
import { SearchOutlined, PlusOutlined, FilterOutlined, MoreOutlined, UploadOutlined, EyeOutlined } from '@ant-design/icons';
import ProfileMenu from '../../../components/Header/ProfileMenu';
import { useRecoilValue } from 'recoil';
import authAtom from '../../../atoms/auth/auth.atom';

// SVG icons
const GridViewIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.33333 2.5H2.5V8.33333H8.33333V2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17.5 2.5H11.6667V8.33333H17.5V2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17.5 11.6667H11.6667V17.5H17.5V11.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.33333 11.6667H2.5V17.5H8.33333V11.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ListViewIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.66667 5H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.66667 10H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.66667 15H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2.5 5H2.50833" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2.5 10H2.50833" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2.5 15H2.50833" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Function to get a random subject-related image
const getSubjectImage = (subject: string) => {
  // Define image collections for different subjects
  const subjectImages: Record<string, string[]> = {
    'Mathematics': [
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=500&auto=format&fit=crop'
    ],
    'English': [
      'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526243741027-444d633d7365?q=80&w=500&auto=format&fit=crop'
    ],
    'Science': [
      'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1564325724739-bae0bd08762c?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=500&auto=format&fit=crop'
    ],
    'History': [
      'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1447069387593-a5de0862481e?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1461088945293-0c17689e48ac?q=80&w=500&auto=format&fit=crop'
    ],
    'Art': [
      'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=500&auto=format&fit=crop'
    ]
  };
  
  // Default images for subjects not in the collection
  const defaultImages = [
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=500&auto=format&fit=crop'
  ];
  
  // Get the appropriate image collection
  const imageCollection = subjectImages[subject] || defaultImages;
  
  // Return a random image from the collection
  return imageCollection[Math.floor(Math.random() * imageCollection.length)];
};

// Define curriculum item type
interface CurriculumItem {
  key: string;
  title: string;
  created: string;
  grade: string;
  subject: string;
  gaps: string[];
  recommendations: string[];
  image?: string; // Optional image property
}

// Mock data for curriculum materials
const curriculumData: CurriculumItem[] = [
  {
    key: '1',
    title: 'Understanding Mathematics',
    created: '11 Nov, 2024 - 12:09PM',
    grade: '9th Grade',
    subject: 'Mathematics',
    gaps: [
      'Missing materials on geometry for 9th grade.',
      'Insufficient coverage of Shakespeare in 10th Grade English'
    ],
    recommendations: [
      'Add materials on geometry for 9th grade.',
      'Include more Shakespearean texts in 10th Grade English.'
    ]
  },
  {
    key: '2',
    title: 'English Literature Basics',
    created: '11 Nov, 2024 - 12:09PM',
    grade: '9th Grade',
    subject: 'English',
    gaps: [
      'Missing materials on grammar fundamentals.',
      'Insufficient coverage of modern literature'
    ],
    recommendations: [
      'Add materials on grammar and punctuation.',
      'Include more contemporary literature examples.'
    ]
  },
  {
    key: '3',
    title: 'Introduction to Biology',
    created: '11 Nov, 2024 - 12:09PM',
    grade: '9th Grade',
    subject: 'Science',
    gaps: [
      'Missing materials on cell structure.',
      'Insufficient coverage of genetics'
    ],
    recommendations: [
      'Add materials on cellular biology.',
      'Include more examples of genetic inheritance.'
    ]
  }
];

const AdminCurriculum = () => {
  const navigate = useNavigate();
  const auth = useRecoilValue(authAtom);
  const [activeTab, setActiveTab] = useState('curriculum');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  
  const handleViewCurriculum = (curriculum: CurriculumItem) => {
    // Navigate to curriculum detail page (to be implemented)
    console.log('View curriculum:', curriculum);
    message.info(`Viewing details for ${curriculum.title}`);
    // Future implementation: navigate to curriculum detail page
    // navigate(`/admin/curriculum/${curriculum.key}`, { state: { curriculum } });
  };

  const handleUploadCurriculum = () => {
    // Handle curriculum upload (to be implemented)
    message.info('Upload curriculum materials functionality will be implemented');
  };

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
              <button 
                className={`py-2 px-1 ${activeTab === 'curriculum' ? 'text-[#4970FC] border-b-2 border-[#4970FC] font-medium' : 'text-[#667085]'}`}
                onClick={() => {
                  setActiveTab('curriculum');
                  navigate('/admin/curriculum');
                }}
              >
                Curriculum
              </button>
              <button 
                className={`py-2 px-1 ${activeTab === 'review' ? 'text-[#4970FC] border-b-2 border-[#4970FC] font-medium' : 'text-[#667085]'}`}
                onClick={() => {
                  setActiveTab('review');
                  navigate('/admin/review');
                }}
              >
                Review & Report
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-[#101828]">Curriculum 📚</h1>
            <p className="text-[#667085]">Organize and manage your course materials.</p>
          </div>

          <div className="mb-5 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="text-lg font-medium text-[#101828]">20</div>
              <div className="text-sm text-[#667085]">Mapping(s)</div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                icon={<FilterOutlined />} 
                className="border border-[#D0D5DD] rounded-lg px-3 py-1 flex items-center gap-1 h-auto"
              >
                Filter
              </Button>
              <div className="flex items-center">
                <Input 
                  prefix={<SearchOutlined className="text-gray-400" />}
                  placeholder="Search"
                  className="rounded-lg border border-[#D0D5DD] h-9 w-40"
                />
              </div>
              <div className="flex border border-[#D0D5DD] rounded-lg overflow-hidden">
                <button 
                  className={`p-2 ${viewMode === 'grid' ? 'bg-[#F9FAFB] text-[#101828]' : 'bg-white text-[#667085]'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <GridViewIcon />
                </button>
                <button 
                  className={`p-2 ${viewMode === 'list' ? 'bg-[#F9FAFB] text-[#101828]' : 'bg-white text-[#667085]'}`}
                  onClick={() => setViewMode('list')}
                >
                  <ListViewIcon />
                </button>
              </div>
              <Button 
                type="primary" 
                icon={<UploadOutlined />} 
                className="bg-[#4970FC] hover:bg-[#3A5AD9] rounded-full h-9 flex items-center"
                onClick={handleUploadCurriculum}
              >
                Upload Curriculum Materials
              </Button>
            </div>
          </div>

          {/* Curriculum Grid View */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {curriculumData.map((curriculum) => (
                <div key={curriculum.key} className="bg-white border border-[#EAECF0] rounded-lg overflow-hidden">
                  <div className="relative">
                    <img 
                      src={curriculum.image || getSubjectImage(curriculum.subject)} 
                      alt={curriculum.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <Dropdown
                        overlay={
                          <Menu>
                            <Menu.Item key="view" icon={<EyeOutlined />} onClick={() => handleViewCurriculum(curriculum)}>
                              View
                            </Menu.Item>
                          </Menu>
                        }
                        trigger={['click']}
                        placement="bottomRight"
                      >
                        <button className="bg-white p-2 rounded-md shadow-sm text-[#667085] hover:text-[#101828]">
                          <MoreOutlined />
                        </button>
                      </Dropdown>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-[#101828] mb-1">{curriculum.title}</h3>
                    <p className="text-sm text-[#667085] mb-3">Created - {curriculum.created}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-[#667085] mb-1">Grade</div>
                        <div className="text-sm font-medium text-[#101828]">{curriculum.grade}</div>
                      </div>
                      <div>
                        <div className="text-xs text-[#667085] mb-1">Subject</div>
                        <div className="text-sm font-medium text-[#101828]">{curriculum.subject}</div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-xs text-[#667085] mb-1">Gaps Identified</div>
                      <ul className="text-sm text-[#101828] pl-4 list-disc">
                        {curriculum.gaps.map((gap, index) => (
                          <li key={index}>{gap}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <div className="text-xs text-[#667085] mb-1">Recommendations</div>
                      <ul className="text-sm text-[#101828] pl-4 list-disc">
                        {curriculum.recommendations.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Curriculum List View */}
          {viewMode === 'list' && (
            <div className="bg-white border border-[#EAECF0] rounded-lg overflow-hidden mb-8">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#EAECF0]">
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#667085] uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#667085] uppercase tracking-wider">Created</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#667085] uppercase tracking-wider">Grade</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#667085] uppercase tracking-wider">Subject</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-[#667085] uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAECF0]">
                  {curriculumData.map((curriculum) => (
                    <tr key={curriculum.key} className="hover:bg-[#F9FAFB]">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-md overflow-hidden mr-3">
                            <img 
                              src={curriculum.image || getSubjectImage(curriculum.subject)} 
                              alt={curriculum.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="text-sm font-medium text-[#101828]">{curriculum.title}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#667085]">{curriculum.created}</td>
                      <td className="px-6 py-4 text-sm text-[#667085]">{curriculum.grade}</td>
                      <td className="px-6 py-4 text-sm text-[#667085]">{curriculum.subject}</td>
                      <td className="px-6 py-4 text-right">
                        <Dropdown
                          overlay={
                            <Menu>
                              <Menu.Item key="view" icon={<EyeOutlined />} onClick={() => handleViewCurriculum(curriculum)}>
                                View
                              </Menu.Item>
                            </Menu>
                          }
                          trigger={['click']}
                          placement="bottomRight"
                        >
                          <button className="text-[#667085] hover:text-[#101828]">
                            <MoreOutlined />
                          </button>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-between mb-8">
            <div className="text-sm text-[#667085]">
              Page {currentPage} of 10
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="border border-[#D0D5DD] rounded-lg px-3 py-1 h-auto text-sm"
              >
                Previous
              </Button>
              <Button 
                disabled={currentPage === 10}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="border border-[#D0D5DD] rounded-lg px-3 py-1 h-auto text-sm"
              >
                Next
              </Button>
            </div>
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

export default AdminCurriculum;
