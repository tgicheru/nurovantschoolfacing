import { notification } from "antd";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router";
import authAtom from "../../atoms/auth/auth.atom";
import { useMutation, useQueryClient } from "react-query";
import { postRequest } from "../../context/requestTypes";
import { useContext } from "react";
import { AxiosContext } from "../../context/AxiosContext";
import { AxiosInstance } from "axios";

export function useEmailLogin() {
  const url = "/api/teachers/signin_email";
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const axios = useContext(AxiosContext);
  const setAuth = useSetRecoilState(authAtom);
  const authData = useRecoilValue(authAtom);

  // return useMutation((payload) => postRequest(axios, url, payload), {
  return useMutation(
    (payload) => postRequest(axios as unknown as AxiosInstance, url, payload),
    {
      onSuccess: (response: any) => {
        notification.success({
          message: "Success!",
          description: response?.message || "welcome back.",
        });
        queryClient.invalidateQueries("get:user_profile");
        console.log(response);
        setAuth({ ...authData, isLoggedIn: true, user: response?.data });
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
  const url = "/api/teachers/send_email_otp";
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
  const url = "/api/teachers/verify_otp";
  const axios = useContext(AxiosContext);
  return useMutation(
    (payload) => postRequest(axios as unknown as AxiosInstance, url, payload),
    {
      onSuccess: (response: any) => {
        notification.success({
          message: "Success!",
          description: response?.message || "action successful.",
        });
        successAction?.(response);
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
  const authData = useRecoilState(authAtom);

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
        setAuth({ ...authData[0], isLoggedIn: true, user: response?.data });

        if (authData[0]?.onBoarded) navigate(`/`);
        navigate(`/info`);
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

export function useUpdateInformation() {
  const navigate = useNavigate();
  const url = "/api/teachers/gen_information";
  const axios = useContext(AxiosContext);
  const setAuth = useSetRecoilState(authAtom);
  const authData = useRecoilState(authAtom);

  return useMutation(
    (payload) => postRequest(axios as unknown as AxiosInstance, url, payload),
    {
      onSuccess: (response: any) => {
        notification.success({
          message: "Success!",
          description: response?.message || "action successful.",
        });

        setAuth({ ...authData[0], onBoarded: true });
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
