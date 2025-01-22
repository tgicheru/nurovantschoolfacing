import { lazy } from "react";

// auth pages >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const Authentication = lazy(() => import("../pages/auth"));
const EmailRegister = lazy(() => import("../pages/auth/emailRegister"));
const EmailPassword = lazy(() => import("../pages/auth/emailPassword"));
const PhoneRegister = lazy(() => import("../pages/auth/phoneRegister"));
const Login = lazy(() => import("../pages/auth/login"));
const Verify = lazy(() => import("../pages/auth/verify"));
const Logout = lazy(() => import("../pages/auth/logout"));
const Record = lazy(() => import("../pages/auth/record"));
const AuthInfo = lazy(() => import("../pages/auth/info"));

// public pages >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const UnderMaintenance = lazy(() => import("../pages/public/underMaintenance"));
const TermsAndCondition = lazy(
  () => import("../pages/public/termsAndConditions")
);

// main pages >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const Home = lazy(() => import("../pages/main/home"));
const Settings = lazy(() => import("../pages/main/settings"));
const ProofReader = lazy(() => import("../pages/main/proofreader"));
const SpeechRate = lazy(() => import("../pages/main/speechrate"));
const QuestionBank = lazy(() => import("../pages/main/questionbank"));
const GPTZero = lazy(() => import("../pages/main/gptzero"));
const AdaptiveLearning = lazy(() => import("../pages/main/adaptivelearning"));
const QuestionTracker = lazy(() => import("../pages/main/questiontracker"));
const AssignStudents = lazy(
  () => import("../pages/main/home/sections/assignStudents")
);

export const routes = [
  // main pages >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  {
    path: "/",
    label: "Home",
    component: <Home />,
  },
  {
    path: "/assign-students",
    label: "Assign Students",
    component: <AssignStudents />,
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
    path: "/auth/email-register",
    label: "Email Register",
    component: <EmailRegister />,
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
    path: "/auth/password",
    label: "Set Email Password",
    component: <EmailPassword />,
  },
  {
    path: "/auth/phone",
    label: "Phone Register",
    component: <PhoneRegister />,
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
