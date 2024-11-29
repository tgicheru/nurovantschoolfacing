import { message } from "antd";
import { useRecoilValue } from "recoil";
import React, { Fragment, ReactComponentElement, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import authAtom from "../atoms/auth/auth.atom";
import AuthLayout from "./Auth";
import MainLayout from "./Main";
import PublicLayout from "./public";

const Layouts = {
  auth: AuthLayout,
  main: MainLayout,
  public: PublicLayout,
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
    if (/^\/auth(?=\/|$)/i.test(pathname)) return "auth";
    if (/^\/main(?=\/|$)/i.test(pathname)) return "main";
    if (/^\/public(?=\/|$)/i.test(pathname)) return "public";
    return "main";
  };

  const Container = Layouts[getLayout()];
  const isMainLayout = getLayout() === "main";

  // scroll to top when path changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // redirect to login page if current is not login page and user not authorized
  useEffect(() => {
     if (isMainLayout && !isLoggedIn) {
       message.info({
         content: "Welcome! please authenticate to proceed.",
         key: "updatable",
       });
       navigate("/auth");
     }
    // if (pathname !== "/public/terms") {
    //   navigate("/public/maintenance");
    // } else {
    //   navigate("/public/terms");
    // }
  }, [isLoggedIn, isMainLayout, navigate]);
  return (
    <Fragment>
      <Container>{children}</Container>
    </Fragment>
  );
};

export default Layout;
