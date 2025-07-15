import { notification } from "antd";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router";
import authAtom from "../../atoms/auth/auth.atom";
import { useMutation } from "react-query";
import { postRequest } from "../../context/requestTypes";
import { useContext } from "react";
import { AxiosContext } from "../../context/AxiosContext";
import { AxiosInstance } from "axios";

// Custom login hook that always redirects to dashboard after successful login
export function useCustomLogin() {
  const url = "/teacher_api/auth/login";
  const axios = useContext(AxiosContext);
  const [auth, setAuth] = useRecoilState(authAtom);
  const navigate = useNavigate();

  // Function to redirect to main
  const goToMain = () => {
    navigate("/main", { replace: true });
  };

  return useMutation(
    (payload: any) =>
      postRequest(axios as unknown as AxiosInstance, url, payload),
    {
      onSuccess: (response: any) => {
        notification.success({
          message: "Success!",
          description: response?.message || "Login successful.",
        });
        
        // Update auth state with login information
        setAuth({
          ...auth,
          isLoggedIn: true,
          user: response?.user,
          token: response?.token,
          // Always set onBoarded to true to skip onboarding
          onBoarded: true,
        });
        
        // Always navigate to main
        goToMain();
      },
      onError: (error: any) =>
        notification.error({
          message: "Error!",
          description: error?.message,
        }),
    }
  );
}
