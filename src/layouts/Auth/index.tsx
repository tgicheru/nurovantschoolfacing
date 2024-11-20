import React, { ReactComponentElement } from "react";
import Logo from "../../components/Logo";
import AuthFooter from "../../pages/auth/components/footer";

type Props = {
  children: ReactComponentElement<any>;
};
const AuthLayout = ({ children }: Props) => {
  return (
    <div className="w-full sm:w-[70vw] md:w-[50vw] lg:w-[40vw] mx-auto p-5 md:p-10 lg:px-20 flex flex-col justify-center items-center gap-5">
      <Logo />
      <div className="w-full min-h-[60vh] flex flex-col justify-center items-center">{children}</div>
      <AuthFooter />
    </div>
  );
};

export default AuthLayout;
