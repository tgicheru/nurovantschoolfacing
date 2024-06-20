import React from "react";
import { useResetRecoilState } from "recoil";
import authAtom from "../../atoms/auth/auth.atom";
import { notification } from "antd";
import { useNavigate } from "react-router";
import Loading from "../../components/loading";
import { onboardingAtom } from "../../atoms/other/other.atom";

function LogoutPage() {
  const resetInfo = useResetRecoilState(onboardingAtom);
  const resetAuth = useResetRecoilState(authAtom);
  const navigate = useNavigate();
  resetAuth(); resetInfo();
  setTimeout(() => {
    navigate("/auth")
    notification.success({ message: "Logged out", key: "update-able" })
  }, 2000);
  return <Loading />;
}

export default LogoutPage;
