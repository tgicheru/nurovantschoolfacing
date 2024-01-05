import { notification } from "antd";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router";
import authAtom from "../../atoms/auth/auth.atom";
import { useMutation, useQueryClient } from "react-query";
import { postRequest } from "../../context/requestTypes";
import { useContext } from "react";
import { AxiosContext } from "../../context/AxiosContext";
import { AxiosInstance } from "axios";

export function useEmailLogin() {
  // const url = "/login";
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // const axios = useContext(AxiosContext);
  const setAuth = useSetRecoilState(authAtom);
  // return useMutation((payload) => postRequest(axios, url, payload), {
  return useMutation(
    async (payload) =>
      await {
        ...(payload as any),
        email: "johndoe@gmail.com",
        token: "nyjuhghiouhijgu",
      },
    {
      onSuccess: (response: any) => {
        notification.success({
          message: "Success!",
          description: response?.message || "welcome back.",
        });
        queryClient.invalidateQueries("get:user_profile");
        setAuth({ isLoggedIn: true, user: response });
        navigate("/");
      },
      onError: (error: any) =>
        notification.error({
          message: "Error!",
          description: error?.message
            ? Object.entries(error?.errors || { key: [error?.message] })
                ?.map(([, value]) => (value as any)?.join(", "))
                ?.join(", ")
            : "something went wrong please check internet connection.",
        }),
    }
  );
}

export function useEmailRegister() {
  const navigate = useNavigate();
  const url = "/api/auth/email_otp";
  const axios = useContext(AxiosContext);
  return useMutation(
    (payload) => postRequest(axios as unknown as AxiosInstance, url, payload),
    {
      onSuccess: (response: any) => {
        const message = response?.message?.split(" ");
        notification.success({
          message: "Success!",
          description: response?.message || "action successful.",
        });
        navigate(
          `/auth/verify/${response?.data?.reference_id}?email=${
            response?.email || message?.[message?.length - 1]
          }`
        );
      },
      onError: (error: any) =>
        notification.error({
          message: "Error!",
          description: error?.message
            ? Object.entries(error?.errors || { key: [error?.message] })
                ?.map(([, value]) => (value as any)?.join(", "))
                ?.join(", ")
            : "something went wrong please check internet connection.",
        }),
    }
  );
}

export function usePhoneRegister() {
  // const navigate = useNavigate();
  const url = "/api/auth/mobile_otp";
  const axios = useContext(AxiosContext);
  return useMutation(
    (payload) => postRequest(axios as unknown as AxiosInstance, url, payload),
    {
      onSuccess: (response: any) => {
        // const message = response?.message?.split(" ");
        notification.success({
          message: "Success!",
          description: response?.message || "action successful.",
        });
        // navigate(
        //   `/auth/verify/${response?.data?.reference_id}?mobile=${
        //     response?.email || message?.[message?.length - 1]
        //   }&country_code=${response?.country_code}`
        // );
        return response?.data?.reference_id;
      },
      onError: (error: any) =>
        notification.error({
          message: "Error!",
          description: error?.message
            ? Object.entries(error?.errors || { key: [error?.message] })
                ?.map(([, value]) => (value as any)?.join(", "))
                ?.join(", ")
            : "something went wrong please check internet connection.",
        }),
    }
  );
}

export function useVerify(successAction?: any) {
  const url = "/api/auth/otp_verify";
  const axios = useContext(AxiosContext);
  return useMutation(
    (payload) => postRequest(axios as unknown as AxiosInstance, url, payload),
    {
      onSuccess: (response: any) => {
        notification.success({
          message: "Success!",
          description: response?.message || "action successful.",
        });
        successAction?.();
      },
      onError: (error: any) =>
        notification.error({
          message: "Error!",
          description: error?.message
            ? Object.entries(error?.errors || { key: [error?.message] })
                ?.map(([, value]) => (value as any)?.join(", "))
                ?.join(", ")
            : "something went wrong please check internet connection.",
        }),
    }
  );
}

export function useResend() {
  // const url = "/login";
  const navigate = useNavigate();
  // const axios = useContext(AxiosContext);
  // return useMutation((payload) => postRequest(axios, url, payload), {
  return useMutation(
    async (payload: any) => await (payload || { email: "johndoe@gmail.com" }),
    {
      onSuccess: (response: any) => {
        notification.success({
          message: "Success!",
          description: response?.message || "action successful.",
        });
        navigate(`/auth/email-password`);
      },
      onError: (error: any) =>
        notification.error({
          message: "Error!",
          description: error?.message
            ? Object.entries(error?.errors || { key: [error?.message] })
                ?.map(([, value]) => (value as any)?.join(", "))
                ?.join(", ")
            : "something went wrong please check internet connection.",
        }),
    }
  );
}

export function usePassword(url: string) {
  const navigate = useNavigate();
  const axios = useContext(AxiosContext);
  return useMutation(
    (payload) => postRequest(axios as unknown as AxiosInstance, url, payload),
    {
      onSuccess: (response: any) => {
        notification.success({
          message: "Success!",
          description: response?.message || "action successful.",
        });
        navigate(`/auth/login`);
      },
      onError: (error: any) =>
        notification.error({
          message: "Error!",
          description: error?.message
            ? Object.entries(error?.errors || { key: [error?.message] })
                ?.map(([, value]) => (value as any)?.join(", "))
                ?.join(", ")
            : "something went wrong please check internet connection.",
        }),
    }
  );
}

export function useGoogleRegister() {
  const navigate = useNavigate();
  const url = "/api/teachers/auth";
  const axios = useContext(AxiosContext);
  const setAuth = useSetRecoilState(authAtom);

  return useMutation(
    (payload) => postRequest(axios as unknown as AxiosInstance, url, payload),
    {
      onSuccess: (response: any) => {
        const message = response?.message?.split(" ");
        notification.success({
          message: "Success!",
          description: response?.message || "action successful.",
        });

        // console.log(response);
        setAuth({ isLoggedIn: true, user: response?.data });

        navigate(`/`);
      },
      onError: (error: any) =>
        notification.error({
          message: "Error!",
          description: error?.message
            ? Object.entries(error?.errors || { key: [error?.message] })
                ?.map(([, value]) => (value as any)?.join(", "))
                ?.join(", ")
            : "something went wrong please check internet connection.",
        }),
    }
  );
}
