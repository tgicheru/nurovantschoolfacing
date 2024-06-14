import React, { ReactComponentElement } from "react";
import Logo from "../../components/Logo";

type Props = {
  children: ReactComponentElement<any>;
};
const AuthLayout = ({ children }: Props) => {
  return (
    <div className="w-full h-screen max-h-screen pt-5 bg-homeBg bg-cover">
      <div className="w-full flex items-center h-[50px] bg-[#24387E] px-10">
        <Logo isIcon isText />
      </div>
      <div className="w-full h-[90vh]">{children}</div>
    </div>
  );
};

export default AuthLayout;
