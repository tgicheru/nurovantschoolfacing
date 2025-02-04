import { notification } from "antd";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router";
import authAtom from "../../atoms/auth/auth.atom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getRequest,
  postRequest,
  putRequest,
} from "../../context/requestTypes";
import { useContext } from "react";
import { AxiosContext } from "../../context/AxiosContext";
import { AxiosInstance } from "axios";

export function useEmailLogin() {
  // "/api_backend/teachers/signin_email"
  const url = "/api_backend/auth/login_email";
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const axios = useContext(AxiosContext);
  const [authData, setAuth] = useRecoilState(authAtom);

  return useMutation(
    (payload) => postRequest(axios as unknown as AxiosInstance, url, payload),
    {
      onSuccess: (response: any) => {
        notification.success({
          message: "Success!",
          description: response?.message || "welcome back.",
        });
        setAuth({ ...authData, isLoggedIn: true, user: response?.data });
        queryClient.invalidateQueries("get:user_profile_info");
        queryClient.invalidateQueries("get:user_profile");
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

export function useOnboarding(successAction?: any, errorAction?: any) {
  const url = "/api_backend/auth/register_email";
  const axios = useContext(AxiosContext);
  return useMutation(
    (payload: any) =>
      postRequest(axios as unknown as AxiosInstance, url, payload),
    {
      onSuccess: (response: any) => {
        notification.success({
          message: "Success!",
          description: response?.message || "action successful.",
        });
        successAction?.(response);
      },
      onError: (error: any) => {
        notification.error({
          message: "Error!",
          description: error?.message
            ? Object.entries(error?.errors || { key: [error?.message] })
                ?.map(([, value]) => (value as any)?.join(", "))
                ?.join(", ")
            : "something went wrong please check internet connection.",
        });
        errorAction?.(error);
      },
    }
  );
}

export function useOnboardRecord(successAction?: any, errorAction?: any) {
  const url = "/api_backend/teachers/update_profile/";
  const axios = useContext(AxiosContext);
  return useMutation(
    (payload: any) =>
      putRequest(axios as unknown as AxiosInstance, url, payload),
    {
      onSuccess: (response: any) => {
        notification.success({
          message: "Success!",
          description: response?.message || "action successful.",
        });
        successAction?.(response);
      },
      onError: (error: any) => {
        notification.error({
          message: "Error!",
          description: error?.message
            ? Object.entries(error?.errors || { key: [error?.message] })
                ?.map(([, value]) => (value as any)?.join(", "))
                ?.join(", ")
            : "something went wrong please check internet connection.",
        });
        errorAction?.(error);
      },
    }
  );
}

export function useEmailRegister() {
  const navigate = useNavigate();
  const url = "/api_backend/teachers/send_email_otp";
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
  const url = "/api_backend/auth/mobile_otp";
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
  const url = "/api_backend/teachers/verify_otp";
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

export function useOAuthRegister() {
  const navigate = useNavigate();
  const url = "/api_backend/auth/register_socials";
  const axios = useContext(AxiosContext);
  const [authData, setAuth] = useRecoilState(authAtom);

  return useMutation(
    (payload) => postRequest(axios as unknown as AxiosInstance, url, payload),
    {
      onSuccess: (response: any) => {
        notification.success({
          message: "Success!",
          description: response?.message || "action successful.",
        });
        setAuth({ ...authData[0], isLoggedIn: true, user: response?.data });
        if (authData[0]?.onBoarded) navigate("/");
        navigate("/auth/info");
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
  const url = "/api_backend/teachers/gen_information";
  const axios = useContext(AxiosContext);
  const [authData, setAuth] = useRecoilState(authAtom);

  return useMutation(
    (payload: any) =>
      postRequest(axios as unknown as AxiosInstance, url, payload),
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

export function useGetAllStudents(params?: any) {
  const url = "/api_backend/auth/users";
  const axios = useContext(AxiosContext);
  return useQuery(
    ["get:all_students"],
    () => getRequest(axios as unknown as AxiosInstance, url, params),
    {
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

export function useUpdateStudentsGradeLevel(id: string) {
  const navigate = useNavigate();
  const url = `/api_backend/lectures/segment_student?id=${id}`;
  const axios = useContext(AxiosContext);
  const [authData, setAuth] = useRecoilState(authAtom);

  return useMutation(
    (payload: any) =>
      postRequest(axios as unknown as AxiosInstance, url, payload),
    {
      onSuccess: (response: any) => {
        notification.success({
          message: "Success!",
          description: response?.message || "action successful.",
        });
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
