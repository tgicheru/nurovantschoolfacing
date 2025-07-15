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

// main pages >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const Overview = lazy(() => import("../pages/main/overview"));
const CoursePage = lazy(() => import("../pages/main/course"));
const Courses = lazy(() => import("../pages/main/courses/index"));
const ClassDetail = lazy(() => import("../pages/main/class/detail"));

// admin pages >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// onboarding pages >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const Onboarding = lazy(() => import("../pages/onboarding"));
const OnboardingFeatures = lazy(() => import("../pages/onboarding/features"));
const OnboardingCourses = lazy(() => import("../pages/onboarding/courses"));
const OnboardingComplete = lazy(() => import("../pages/onboarding/complete"));

// admin pages >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const AdminDashboard = lazy(() => import("../pages/admin/dashboard/overview"));
const AdminTeachers = lazy(() => import("../pages/admin/teachers"));
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
  // onboarding pages >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  {
    path: "/onboarding",
    label: "Onboarding",
    component: <Onboarding />,
  },
  {
    path: "/onboarding/features",
    label: "Onboarding Features",
    component: <OnboardingFeatures />,
  },
  {
    path: "/onboarding/courses",
    label: "Onboarding Courses",
    component: <OnboardingCourses />,
  },
  {
    path: "/onboarding/complete",
    label: "Onboarding Complete",
    component: <OnboardingComplete />,
  },
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
    path: "/course",
    label: "Course",
    component: <CoursePage />,
  },
  {
    path: "/course",
    label: "Courses",
    component: <Courses />,
  },
  {
    path: "/course/class/:classId",
    label: "Class Detail",
    component: <ClassDetail />,
  },
  {
    path: "/course/gaming",
    label: "Gaming",
    component: <GamingPage />,
  },
  {
    path: "/course/lecture/analyze",
    label: "Analyze Lesson",
    component: <AnalyzeLesson />,
  },
  {
    path: "/course/lecture/continuousFeedback",
    label: "Continuous Feedback",
    component: <ContinuousFeedback />,
  },
  {
    path: "/course/lecture/feedback",
    label: "Feedback",
    component: <Feedback />,
  },
  {
    path: "/course/lecture/lmsIntegration",
    label: "Lms Integration",
    component: <LmsPage />,
  },
  {
    path: "/course/lecture/groupAnalysis",
    label: "Group Analysis",
    component: <GroupAnalysis />,
  },
  {
    path: "/course/lecture/groupActivity",
    label: "Group Activity",
    component: <GroupActivity />,
  },
  {
    path: "/course/lecture/curriculum-alignment",
    label: "Curriculum Alignment",
    component: <CurriculumAlignment />,
  },
  {
    path: "/course/details",
    label: "Course Detail",
    component: <CourseDetails />,
  },
  {
    path: "/course/lecture",
    label: "Course Lecture",
    component: <LectureDetails />,
  },
  {
    path: "/course/students",
    label: "Students",
    component: <StudentsDetails />,
  },
  {
    path: "/course/import",
    label: "Import",
    component: <CourseImport />,
  },
  {
    path: "/course/lecture/quiz",
    label: "Quiz",
    component: <QuizPage />,
  },
  {
    path: "/course/lecture/flashcard",
    label: "Flashcard",
    component: <FlashCardPage />,
  },
  {
    path: "/course/lecture/recap",
    label: "Recap",
    component: <RecapsPage />,
  },
  {
    path: "/course/lecture/recap/details",
    label: "Recap Details",
    component: <RecapsDetailsPage />,
  },
  {
    path: "/course/lecture/discuss",
    label: "Discuss",
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
