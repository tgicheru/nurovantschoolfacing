# Nurovant School Facing Application Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Project Overview](#project-overview)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Authentication System](#authentication-system)
6. [User Roles](#user-roles)
7. [Key Features](#key-features)
8. [API Integration](#api-integration)
9. [Components](#components)
10. [State Management](#state-management)
11. [Routing](#routing)
12. [Styling](#styling)
13. [Development Guidelines](#development-guidelines)
14. [Deployment](#deployment)

## Introduction

The Nurovant School Facing application is a comprehensive educational platform designed to serve multiple user roles including administrators, educators, and students. It provides tools for curriculum management, student tracking, group management, and educational content delivery.

## Project Overview

This application serves as the teacher and administrator-facing component of the Nurovant educational ecosystem. It provides a robust interface for educators to manage courses, track student progress, create student groups, and access various teaching tools. The admin section allows for management of teachers, students, and curriculum materials.

## Technology Stack

The application is built using the following technologies:

### Frontend
- **React**: Core library for building the user interface
- **TypeScript**: For type-safe JavaScript development
- **Next.js**: Framework with App Router for server and client components
- **React Router**: For application routing
- **Recoil**: For state management with persistence
- **TanStack Query (React Query)**: For data fetching and caching
- **React Hook Form**: For form management and validation
- **Zod**: For schema validation
- **Ant Design**: UI component library
- **Tailwind CSS**: For styling and responsive design
- **Shadcn UI**: For enhanced UI components

### Backend Integration
- **Axios**: For HTTP requests to the backend API
- **JWT**: For authentication token management

### Other Libraries
- **AWS SDK**: For direct S3 uploads (profile images)
- **Chart.js/Ant Design Charts**: For data visualization
- **Firebase**: For additional authentication options
- **React PDF/XLSX**: For document handling

## Project Structure

The project follows a modular structure organized by feature and function:

```
nurovantschoolfacing/
├── public/             # Static assets
├── src/                # Source code
│   ├── assets/         # Images, icons, and other assets
│   ├── atoms/          # Recoil atoms for state management
│   ├── components/     # Reusable UI components
│   ├── constants/      # Application constants
│   ├── context/        # React context providers
│   ├── firebaseAuth/   # Firebase authentication integration
│   ├── hooks/          # Custom React hooks
│   ├── layouts/        # Page layout components
│   ├── mocks/          # Mock data for development
│   ├── pages/          # Application pages
│   │   ├── admin/      # Admin dashboard pages
│   │   ├── auth/       # Authentication pages
│   │   ├── main/       # Educator platform pages
│   │   └── public/     # Public-facing pages
│   ├── router/         # Routing configuration
│   ├── services/       # API services
│   ├── styles/         # Global styles
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Utility functions
└── package.json        # Project dependencies and scripts
```

## Authentication System

The application implements a comprehensive authentication system with the following features:

### Authentication Flow
1. **Role Selection**: Users select their role (Admin, Educator, Student)
2. **Role-Specific Authentication**:
   - Admin: Custom signup, verification, and login flows
   - Educator: Standard login flow
   - Student: Redirected to external student application
3. **Onboarding Process**:
   - First-time users are automatically directed to the onboarding flow
   - Multi-step guided tour of key features and functionality
   - Onboarding status is tracked in the auth state

### Token Management
- JWT tokens are stored in localStorage using recoil-persist
- Tokens are automatically included in API requests
- Robust token extraction handles various token formats
- Authentication state is maintained across sessions

### Authentication Services
- `auth.service.ts`: Core authentication methods
  - `adminSignUp`: Admin registration
  - `adminLogin`: Admin authentication
  - `signIn`: Educator authentication
  - `signOut`: User logout
  - `isAuthenticated`: Authentication status check
  - `getCurrentUser`: Current user data retrieval

## User Roles

The application supports three distinct user roles:

### Administrator
- Access to admin dashboard
- Teacher management (add, view, edit)
- Student management
- Curriculum management
- System-wide analytics

### Educator
- Access to educator dashboard
- Course management
- Student group creation and management
- Lesson planning and delivery
- Performance tracking and analytics
- Educational tools (proofreader, speech rate, etc.)

### Student
- Redirected to external student application (https://app.nurovant.com/auth)

## Key Features

### User Onboarding
- **Guided Introduction**: Multi-step onboarding process for new users
- **Feature Highlights**: Visual tour of key platform capabilities
- **Role-Specific Flow**: Tailored onboarding experience based on user role
- **Interactive Elements**: Progress tracking and navigation controls

### Admin Dashboard
- **Teacher Management**: Add, view, and manage teachers
- **Student Management**: Track and manage students
- **Curriculum Management**: Upload and manage curriculum materials
- **Analytics**: View system-wide performance metrics

### Educator Platform
- **Overview Dashboard**: Quick access to key information and metrics
- **Course Management**: Create, edit, and manage courses and lectures
- **Calendar**: Schedule and track educational activities
- **Student Groups**: Create and manage student collaboration groups
- **Educational Tools**:
  - Proofreader
  - Speech Rate
  - Question Bank
  - Review & Report
  - GPT Zero
  - Adaptive Learning
  - Question Tracker

### Student Group Management
- Create student groups with designated leaders
- Add students from existing database or manually
- Update group names and leaders
- Associate groups with specific lectures and courses
- Track group activities and performance

### Course and Lecture Management
- Create and manage courses with multiple lectures
- Schedule lectures with date and time
- Track lecture attendance and participation
- Associate learning materials with lectures
- Analyze lecture effectiveness

## API Integration

The application integrates with a backend API using the following services:

### Core API Services
- `api-client.ts`: Base Axios instance with interceptors
- `auth.service.ts`: Authentication endpoints
- `admin.service.ts`: Admin-specific endpoints
- `student-groups.service.ts`: Student group management
- `courses.service.ts`: Course and lecture management
- `dashboard.service.ts`: Dashboard data retrieval

### API Endpoints
- `/teacher_api/auth/sign_up`: User registration
- `/teacher_api/auth/login`: User authentication
- `/teacher_api/students`: Student data retrieval
- `/teacher_api/student-groups/create`: Group creation
- `/teacher_api/student-groups/name`: Update group name
- `/teacher_api/student-groups/leader`: Change group leader
- `/teacher_api/student-groups/user`: Fetch teacher's groups
- `/teacher_api/lecture/update-date`: Update lecture schedule
- `/teacher_api/courses`: Course details
- `/teacher_api/courses/my_courses`: Teacher's courses

### Error Handling
- Comprehensive error handling for API requests
- Authentication error detection and handling
- Graceful degradation with fallbacks
- Detailed error logging for debugging

## Components

The application uses a component-based architecture with the following key components:

### Layout Components
- `PublicLayout`: For authentication and public pages
- `MainLayout`: For the educator platform
- `AdminLayout`: For the admin dashboard

### Authentication Components
- `RoleSelection`: User role selection
- `Login`: User authentication
- `AdminVerification`: Admin OTP verification
- `ProfileMenu`: User profile and logout

### Onboarding Components
- `Onboarding`: Dashboard overview introduction
- `OnboardingFeatures`: Key features showcase
- `OnboardingCourses`: Course management introduction
- `OnboardingComplete`: Completion and transition to main app

### Admin Components
- `AdminDashboard`: Admin overview
- `TeachersList`: Teacher management
- `StudentsList`: Student management
- `CurriculumManagement`: Curriculum materials

### Educator Components
- `Overview`: Educator dashboard
- `CoursesList`: Course management
- `Calendar`: Schedule management
- `StudentGroups`: Student group management
- `ClassDetail`: Detailed class view

### Form Components
- `CreateStudentGroupModal`: Student group creation
- `AddTeacherDrawer`: Teacher registration
- `AddStudentDrawer`: Student registration

## State Management

The application uses Recoil for state management with the following key features:

### Authentication State
- Stored in `auth.atom.ts`
- Persisted using recoil-persist
- Includes user data, token, role information, and onboarding status
- The `onBoarded` flag tracks whether a user has completed the onboarding process

### Onboarding State Management
- Custom hooks for onboarding flow control:
  - `useOnboardingRedirect`: Redirects users to onboarding if needed
  - `useCompleteOnboarding`: Updates onboarding status upon completion

### React Query Integration
- Custom hooks for data fetching and caching
- Automatic refetching and invalidation
- Loading and error states

### Local Component State
- React's useState for component-level state
- Form state managed with React Hook Form

## Routing

The application uses React Router for navigation with the following structure:

### Route Configuration
- Defined in `routes.tsx`
- Organized by feature area (admin, auth, main, public, onboarding)
- Lazy-loaded components for performance

### Key Routes
- `/`: Role selection
- `/auth/*`: Authentication routes
- `/main`: Educator dashboard
- `/admin/dashboard`: Admin dashboard
- `/courses/*`: Course management
- `/course/lecture/*`: Lecture management
- `/admin/teachers`: Teacher management
- `/admin/students`: Student management
- `/onboarding/*`: User onboarding flow
  - `/onboarding`: Dashboard overview
  - `/onboarding/features`: Key features
  - `/onboarding/courses`: Course management
  - `/onboarding/complete`: Completion

## Styling

The application uses a combination of styling approaches:

### Tailwind CSS
- Utility-first CSS framework
- Responsive design
- Custom color scheme with primary color #4970FC

### Ant Design
- UI component library
- Consistent design language
- Pre-built components (tables, forms, modals)

### Shadcn UI
- Enhanced UI components
- Consistent styling patterns

## Development Guidelines

### Code Style
- Follow Airbnb Style Guide
- Use PascalCase for React component file names
- Prefer named exports for components

### Project Structure
- Follow Next.js patterns
- Use App Router
- Correctly determine server vs. client components

### State Management
- Use React Context for state management
- Use Recoil for persistent state

### Data Fetching
- Use TanStack Query for data fetching
- Implement proper error handling
- Add loading states

### Forms
- Use React Hook Form for form handling
- Use Zod for validation

### Database Access
- Use Prisma for database access

## Deployment

The application can be deployed using the following scripts:

```bash
# Development
npm start

# Production build
npm run build
```

The build output is generated in the `dist/` directory and can be deployed to any static hosting service.
