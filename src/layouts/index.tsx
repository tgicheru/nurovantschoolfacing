import { message } from "antd";
import { useRecoilValue } from "recoil";
import React, { Fragment, ReactComponentElement, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import authAtom from "../atoms/auth/auth.atom";
import AuthLayout from "./Auth";
import MainLayout from "./Main";
import PublicLayout from "./public";
import OnboardingLayout from "./Onboarding";

const Layouts = {
  auth: AuthLayout,
  main: MainLayout,
  public: PublicLayout,
  onboarding: OnboardingLayout,
};

type Props = {
  children: ReactComponentElement<any>;
};
const Layout = ({ children }: Props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isLoggedIn } = useRecoilValue(authAtom);

  // Layout Rendering
  const getLayout = () => {
    // Onboarding routes use the onboarding layout
    if (/^\/onboarding(?=\/|$)/i.test(pathname)) return "onboarding";
    if (/^\/auth(?=\/|$)/i.test(pathname)) return "auth";
    if (/^\/main(?=\/|$)/i.test(pathname)) return "main";
    if (/^\/public(?=\/|$)/i.test(pathname)) return "public";
    // Admin routes are accessible without token requirements
    if (/^\/admin(?=\/|$)/i.test(pathname)) return "public";
    // Root path now redirects to onboarding
    if (pathname === "/") return "public";
    return "main";
  };

  const Container = Layouts[getLayout()];
  const isMainLayout = getLayout() === "main";

  // scroll to top when path changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Authentication and route protection logic - simplified to avoid redirect loops
  useEffect(() => {
    // Only protect main layout pages - require login
    if (isMainLayout && !isLoggedIn && !pathname.includes('/auth/')) {
      message.info({
        content: "Please log in to access this page.",
        key: "auth-required",
      });
      navigate("/auth/login", { replace: true });
    }
    
    // Commented out maintenance redirect
    // if (pathname !== "/public/terms") {
    //   navigate("/public/maintenance");
    // } else {
    //   navigate("/public/terms");
    // }
  }, [isLoggedIn, isMainLayout, navigate, pathname]);
  return (
    <Fragment>
      <Container>{children}</Container>
    </Fragment>
  );
};

export default Layout;
