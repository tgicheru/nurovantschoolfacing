import { lazy, ReactElement } from "react";

// Define route interface
export interface RouteItem {
  path: string;
  label: string;
  component: ReactElement;
}

// auth pages >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const Authentication = lazy(() => import("../pages/auth"));
const RoleSelection = lazy(() => import("../pages/auth/role-selection"));
const AdminSignup = lazy(() => import("../pages/auth/admin-signup"));
const AdminVerification = lazy(() => import("../pages/auth/admin-verification"));
const AdminLogin = lazy(() => import("../pages/auth/admin-login"));
const Login = lazy(() => import("../pages/auth/login"));
const Forgot = lazy(() => import("../pages/auth/forgot"));
const Verify = lazy(() => import("../pages/auth/verify"));
const Reset = lazy(() => import("../pages/auth/reset"));
const Logout = lazy(() => import("../pages/auth/logout"));
const Record = lazy(() => import("../pages/auth/record"));
const AuthInfo = lazy(() => import("../pages/auth/info"));

// public pages >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const UnderMaintenance = lazy(() => import("../pages/public/underMaintenance"));
const TermsAndCondition = lazy(
  () => import("../pages/public/termsAndConditions")
);

// onboarding pages >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const OnboardingPage = lazy(() => import("../pages/onboarding"));
const ClassInsightsOnboarding = lazy(() => import("../pages/onboarding/class-insights"));
const StudentGroupsOnboarding = lazy(() => import("../pages/onboarding/student-groups"));
const CourseLibraryOnboarding = lazy(() => import("../pages/onboarding/course-library"));
const CourseCreationOnboarding = lazy(() => import("../pages/onboarding/course-creation"));
const PacingGuidesOnboarding = lazy(() => import("../pages/onboarding/pacing-guides"));
const CalendarViewOnboarding = lazy(() => import("../pages/onboarding/calendar-view"));
const ReviewReportsOnboarding = lazy(() => import("../pages/onboarding/review-reports"));
const FeaturesOnboarding = lazy(() => import("../pages/onboarding/features"));
const CoursesOnboarding = lazy(() => import("../pages/onboarding/courses"));
const CompleteOnboarding = lazy(() => import("../pages/onboarding/complete"));
const TestOnboarding = lazy(() => import("../pages/onboarding/test"));

// main pages >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const Overview = lazy(() => import("../pages/main/overview"));
const CoursePage = lazy(() => import("../pages/main/course"));
const Courses = lazy(() => import("../pages/main/courses/index"));
const ClassDetail = lazy(() => import("../pages/main/class/detail"));
const Calendar = lazy(() => import("../pages/main/calendar/index"));
const StudentGroups = lazy(() => import("../pages/main/groups"));

// admin pages >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const AdminDashboard = lazy(() => import("../pages/admin/dashboard/overview"));
const AdminTeachers = lazy(() => import("../pages/admin/teachers"));
const TeacherDetail = lazy(() => import("../pages/admin/teachers/detail"));
const AdminStudents = lazy(() => import("../pages/admin/students"));
const StudentDetail = lazy(() => import("../pages/admin/students/detail"));
const AdminCurriculum = lazy(() => import("../pages/admin/curriculum"));
const CourseDetails = lazy(() => import("../pages/main/courses/details"));
const LectureDetails = lazy(() => import("../pages/main/courses/lecture"));
const StudentsDetails = lazy(() => import("../pages/main/courses/students"));
const CourseImport = lazy(() => import("../pages/main/courses/import"));
const QuizPage = lazy(() => import("../pages/main/courses/lecture/pages/quiz"));
const GamingPage = lazy(() => import("../pages/main/courses/gaming"));

const FlashCardPage = lazy(
  () => import("../pages/main/courses/lecture/pages/flashcards")
);
const RecapsPage = lazy(
  () => import("../pages/main/courses/lecture/pages/recaps")
);
const RecapsDetailsPage = lazy(
  () => import("../pages/main/courses/lecture/pages/recapDetails")
);

const AnalyzeLesson = lazy(
  () => import("../pages/main/courses/lecture/pages/analyze")
);
const ContinuousFeedback = lazy(
  () => import("../pages/main/courses/lecture/pages/continuousFeedback")
);

const Feedback = lazy(
  () => import("../pages/main/courses/lecture/pages/feedback")
);
const LmsPage = lazy(
  () => import("../pages/main/courses/lecture/pages/lmsIntegration")
);
const GroupActivity = lazy(
  () => import("../pages/main/courses/lecture/pages/groupActivity")
);
const GroupAnalysis = lazy(
  () => import("../pages/main/courses/lecture/pages/groupAnalysis")
);
const CurriculumAlignment = lazy(
  () => import("../pages/main/courses/lecture/pages/curriculumAlignment")
);
const DiscussPage = lazy(
  () => import("../pages/main/courses/lecture/pages/discuss")
);
const Settings = lazy(() => import("../pages/main/settings"));
const ProofReader = lazy(() => import("../pages/main/proofreader"));
const SpeechRate = lazy(() => import("../pages/main/speechrate"));
const QuestionBank = lazy(() => import("../pages/main/questionbank"));
const ReviewReport = lazy(() => import("../pages/main/reviewreport"));
const GPTZero = lazy(() => import("../pages/main/gptzero"));
const AdaptiveLearning = lazy(() => import("../pages/main/adaptivelearning"));
const QuestionTracker = lazy(() => import("../pages/main/questiontracker"));

export const routes: RouteItem[] = [
  // admin pages >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  {
    path: "/admin/dashboard",
    label: "Admin Dashboard",
    component: <AdminDashboard />,
  },
  {
    path: "/admin/teachers",
    label: "Admin Teachers",
    component: <AdminTeachers />,
  },
  {
    path: "/admin/teachers/:id",
    label: "Teacher Detail",
    component: <TeacherDetail />,
  },
  {
    path: "/admin/students",
    label: "Admin Students",
    component: <AdminStudents />,
  },
  {
    path: "/admin/students/:id",
    label: "Student Detail",
    component: <StudentDetail />,
  },
  {
    path: "/admin/curriculum",
    label: "Admin Curriculum",
    component: <AdminCurriculum />,
  },

  // main pages >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  {
    path: "/",
    label: "Role Selection",
    component: <RoleSelection />,
  },
  {
    path: "/main",
    label: "Overview",
    component: <Overview />,
  },
  {
    path: "/courses/class/:classId",
    label: "Class Detail",
    component: <ClassDetail />,
  },
  {
    path: "/course",
    label: "Course",
    component: <CoursePage />,
  },
  {
    path: "/courses",
    label: "Courses",
    component: <Courses />,
  },
  {
    path: "/calendar",
    label: "Calendar",
    component: <Calendar />,
  },
  {
    path: "/groups",
    label: "Student Groups",
    component: <StudentGroups />,
  },
  {
    path: "/courses/gaming",
    label: "Gaming",
    component: <GamingPage />,
  },
  {
    path: "/courses/lecture/analyze",
    label: "Analyze Lesson",
    component: <AnalyzeLesson />,
  },
  {
    path: "/courses/lecture/continuousFeedback",
    label: "Continuous Feedback",
    component: <ContinuousFeedback />,
  },
  {
    path: "/courses/lecture/feedback",
    label: "Feedback",
    component: <Feedback />,
  },
  {
    path: "/courses/lecture/lmsIntegration",
    label: "Lms Integration",
    component: <LmsPage />,
  },
  {
    path: "/courses/lecture/groupAnalysis",
    label: "Group Analysis",
    component: <GroupAnalysis />,
  },
  {
    path: "/courses/lecture/groupActivity",
    label: "Group Activity",
    component: <GroupActivity />,
  },
  {
    path: "/courses/lecture/curriculum-alignment",
    label: "Curriculum Alignment",
    component: <CurriculumAlignment />,
  },
  {
    path: "/courses/details",
    label: "Courses Details",
    component: <CourseDetails />,
  },
  {
    path: "/courses/lecture",
    label: "Courses Lecture",
    component: <LectureDetails />,
  },
  {
    path: "/courses/students",
    label: "Courses Students",
    component: <StudentsDetails />,
  },
  {
    path: "/courses/import",
    label: "Courses Students",
    component: <CourseImport />,
  },
  {
    path: "/courses/lecture/quiz",
    label: "Lecture Quiz",
    component: <QuizPage />,
  },
  {
    path: "/courses/lecture/flashcard",
    label: "Lecture Flashcard",
    component: <FlashCardPage />,
  },
  {
    path: "/courses/lecture/recap",
    label: "Lecture Recap",
    component: <RecapsPage />,
  },
  {
    path: "/courses/lecture/recap/details",
    label: "Lecture Recap Details",
    component: <RecapsDetailsPage />,
  },
  {
    path: "/courses/lecture/discuss",
    label: "Lecture Discuss",
    component: <DiscussPage />,
  },
  {
    label: "Adaptive Learning",
    path: "/adaptive-learning",
    component: <AdaptiveLearning />,
  },
  {
    path: "/settings",
    label: "Settings",
    component: <Settings />,
  },
  {
    path: "/proofreader",
    label: "Proof Reader",
    component: <ProofReader />,
  },
  {
    path: "/speech-rate",
    label: "Speech Rate",
    component: <SpeechRate />,
  },
  {
    path: "/question-bank",
    label: "Question Bank",
    component: <QuestionBank />,
  },
  {
    path: "/review-report",
    label: "Review & Report",
    component: <ReviewReport />,
  },
  {
    path: "/gpt-zero",
    label: "GPT Zero",
    component: <GPTZero />,
  },
  {
    path: "/question-tracker",
    label: "Question Tracker",
    component: <QuestionTracker />,
  },

  // public pages >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  {
    path: "/public/maintenance",
    label: "Under Maintenance",
    component: <UnderMaintenance />,
  },
  {
    path: "/public/terms",
    label: "Terms of Service",
    component: <TermsAndCondition />,
  },

  // onboarding pages >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  {
    path: "/onboarding",
    label: "Onboarding",
    component: <OnboardingPage />,
  },
  {
    path: "/onboarding/class-insights",
    label: "Class Insights Onboarding",
    component: <ClassInsightsOnboarding />,
  },
  {
    path: "/onboarding/student-groups",
    label: "Student Groups Onboarding",
    component: <StudentGroupsOnboarding />,
  },
  {
    path: "/onboarding/course-library",
    label: "Course Library Onboarding",
    component: <CourseLibraryOnboarding />,
  },
  {
    path: "/onboarding/course-creation",
    label: "Course Creation Onboarding",
    component: <CourseCreationOnboarding />,
  },
  {
    path: "/onboarding/pacing-guides",
    label: "Pacing Guides Onboarding",
    component: <PacingGuidesOnboarding />,
  },
  {
    path: "/onboarding/calendar-view",
    label: "Calendar View Onboarding",
    component: <CalendarViewOnboarding />,
  },
  {
    path: "/onboarding/review-reports",
    label: "Review & Reports Onboarding",
    component: <ReviewReportsOnboarding />,
  },
  {
    path: "/onboarding/features",
    label: "Features Onboarding",
    component: <FeaturesOnboarding />,
  },
  {
    path: "/onboarding/courses",
    label: "Courses Onboarding",
    component: <CoursesOnboarding />,
  },
  {
    path: "/onboarding/complete",
    label: "Complete Onboarding",
    component: <CompleteOnboarding />,
  },
  {
    path: "/onboarding/test",
    label: "Test Onboarding",
    component: <TestOnboarding />,
  },

  // auth pages >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  {
    path: "/auth",
    label: "Authentication",
    component: <Authentication />,
  },
  {
    path: "/auth/role-selection",
    label: "Role Selection",
    component: <RoleSelection />,
  },
  {
    path: "/auth/admin-signup",
    label: "Admin Signup",
    component: <AdminSignup />,
  },
  {
    path: "/auth/admin-verification",
    label: "Admin Verification",
    component: <AdminVerification />,
  },
  {
    path: "/auth/admin-login",
    label: "Admin Login",
    component: <AdminLogin />,
  },
  {
    path: "/auth/login",
    label: "Login",
    component: <Login />,
  },
  {
    path: "/auth/forgot",
    label: "Forgot Password",
    component: <Forgot />,
  },
  {
    path: "/auth/reset/:id",
    label: "Reset Password",
    component: <Reset />,
  },
  {
    path: "/auth/verify/:id",
    label: "Verify",
    component: <Verify />,
  },
  {
    path: "/auth/logout",
    label: "Logout",
    component: <Logout />,
  },
  {
    path: "/auth/record",
    label: "Record Page",
    component: <Record />,
  },
  {
    path: "/auth/info",
    label: "Info Page",
    component: <AuthInfo />,
  },
];
