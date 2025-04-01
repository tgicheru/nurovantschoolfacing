import { useContext } from "react";
import { notification } from "antd";
import { useRecoilState } from "recoil";
import { useLocation, useNavigate } from "react-router";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getRequest,
  otherRequest,
  patchRequest,
  postRequest,
  putRequest,
} from "../../context/requestTypes";
import { AxiosContext } from "../../context/AxiosContext";
import authAtom from "../../atoms/auth/auth.atom";
import { AxiosInstance } from "axios";

export function useGetProfile() {
  const url = "/teacher_api/auth/profile";
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useRecoilState(authAtom);
  const axios = useContext(AxiosContext);
  return useQuery(
    ["get:user_profile"],
    () => getRequest(axios as unknown as AxiosInstance, url),
    {
      onSuccess: (response) =>
        setAuth({
          ...auth,
          user: {
            ...auth?.user,
            ...response?.data,
          },
        }),
      onError: (error: any) => {
        if (error?.message?.includes("authenticated")) {
          sessionStorage.setItem("fallback", JSON.stringify(location));
          navigate("/auth");
        }
        notification.error({
          message: "Error!",
          description: error?.message
            ? Object.entries(error?.errors || { key: [error?.message] })
                ?.map(([, value]) => (value as any)?.join(", "))
                ?.join(", ")
            : "something went wrong please check internet connection.",
        });
      },
      retry: 2,
    }
  );
}

export function useGetProfileInfo(successAction?: any, errorAction?: any) {
  const url = "/api_backend/teachers/profile/";
  const axios = useContext(AxiosContext);

  return useQuery(
    ["get:user_profile_info"],
    () => getRequest(axios as unknown as AxiosInstance, url),
    {
      onSuccess: (response) => successAction?.(response),
      onError: (error: any) => {
        errorAction?.(error)
        notification.error({
          message: "Error!",
          description: error?.message
            ? Object.entries(error?.errors || { key: [error?.message] })
                ?.map(([, value]) => (value as any)?.join(", "))
                ?.join(", ")
            : "something went wrong please check internet connection.",
        });
      },
      retry: 2,
    }
  );
}

export function useGetUserSub() {
  const url = "/api_backend/teachers/subscription_detail";
  const axios = useContext(AxiosContext);
  return useQuery(
    ["get:user_subscription"],
    () => getRequest(axios as unknown as AxiosInstance, url),
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
      retry: 2,
    }
  );
}

export function useGetSubs() {
  const url = "/api_backend/user/subscription_pricing";
  const axios = useContext(AxiosContext);
  return useQuery(
    ["get:subscription_pricing"],
    () => getRequest(axios as unknown as AxiosInstance, url),
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
      retry: 2,
    }
  );
}

export function useSetProfile(successAction?: any, errorAction?: any) {
  const url = "/teacher_api/auth/update-profile";
  const axios = useContext(AxiosContext);
  const queryClient = useQueryClient();
  return useMutation(
    (payload: any) =>
      patchRequest(axios as unknown as AxiosInstance, url, payload),
    {
      onSuccess: (response) => {
        successAction?.();
        notification.success({
          key: "updateable",
          message: "Success!",
          description: response?.message || "profile set successfully.",
        });
        queryClient.invalidateQueries("get:user_profile_info");
        queryClient.invalidateQueries("get:user_profile");
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

export function useChangePassword() {
  const url = "/teacher_api/auth/reset_password_in_app";
  const navigate = useNavigate();
  const axios = useContext(AxiosContext);
  return useMutation(
    (payload) => patchRequest(axios as unknown as AxiosInstance, url, payload),
    {
      onSuccess: (response) => {
        notification.success({
          message: "Success!",
          description:
            response?.message ||
            "password changed, you'll be required to re-login.",
        });
        navigate("/auth/logout");
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

export function usePostSub(successAction?: any) {
  const url = "/api_backend/teachers/subscription_token";
  const axios = useContext(AxiosContext);
  return useMutation(
    (payload: any) =>
      postRequest(axios as unknown as AxiosInstance, url, payload),
    {
      onSuccess: (response) => {
        successAction?.(response);
        notification.success({
          message: "Success!",
          description: response?.message || "action successful.",
        });
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

export function usePostVerifySub(successAction?: any) {
  const queryClient = useQueryClient();
  const url = "api/teachers/subscription_upgrade";
  return useMutation(
    (payload: any) =>
      otherRequest(url, "post", payload, {
        Authorization: `Bearer ${payload?.token}`,
      }),
    {
      onSuccess: (response) => {
        successAction?.(response);
        notification.success({
          message: "Success!",
          description: response?.message || "action successful.",
        });
        queryClient.invalidateQueries("get:user_profile_info");
        queryClient.invalidateQueries("get:user_profile");
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
