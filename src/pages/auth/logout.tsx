import React from "react";
import { useSetRecoilState } from "recoil";
import authAtom from "../../atoms/auth/auth.atom";
import { notification } from "antd";
import { useNavigate } from "react-router";
import Loading from "../../components/loading";

function LogoutPage() {
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authAtom);
  setAuth({ isLoggedIn: false, user: null });
  setTimeout(() => {
    navigate("/auth")
    notification.success({ message: "Logged out", key: "update-able" })
  }, 2000);
  return <Loading />;
}

export default LogoutPage;
