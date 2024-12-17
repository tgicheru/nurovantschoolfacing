import { lazy } from "react";

// auth pages >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const Authentication = lazy(() => import("../pages/auth"));
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
const Courses = lazy(() => import("../pages/main/courses/index"));
const CourseDetails = lazy(() => import("../pages/main/courses/details"));
const LectureDetails = lazy(() => import("../pages/main/courses/lecture"));
const StudentsDetails = lazy(() => import("../pages/main/courses/students"));
const QuizPage = lazy(() => import("../pages/main/courses/lecture/pages/quiz"));
const FlashCardPage = lazy(
  () => import("../pages/main/courses/lecture/pages/flashcards")
);
const RecapsPage = lazy(
  () => import("../pages/main/courses/lecture/pages/recaps")
);
const RecapsDetailsPage = lazy(
  () => import("../pages/main/courses/lecture/pages/recapDetails")
);
const DiscussPage = lazy(
  () => import("../pages/main/courses/lecture/pages/discuss")
);
const Settings = lazy(() => import("../pages/main/settings"));
const ProofReader = lazy(() => import("../pages/main/proofreader"));
const SpeechRate = lazy(() => import("../pages/main/speechrate"));
const QuestionBank = lazy(() => import("../pages/main/questionbank"));
const GPTZero = lazy(() => import("../pages/main/gptzero"));
const AdaptiveLearning = lazy(() => import("../pages/main/adaptivelearning"));
const QuestionTracker = lazy(() => import("../pages/main/questiontracker"));

export const routes = [
  // main pages >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  {
    path: "/",
    label: "Overview",
    component: <Overview />,
  },
  {
    path: "/courses",
    label: "Courses",
    component: <Courses />,
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
