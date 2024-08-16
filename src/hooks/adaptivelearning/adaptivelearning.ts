import { notification } from "antd";
import { useMutation, useQuery } from "react-query";
import {
  deleteRequest,
  getRequest,
  postRequest,
} from "../../context/requestTypes";
import { useContext } from "react";
import { AxiosContext } from "../../context/AxiosContext";
import { AxiosInstance } from "axios";

export function useGetAllAdaptiveLearning(params?: any) {
  const url = "/api_backend/als/get_lectures";
  const axios = useContext(AxiosContext);
  return useQuery(
    ["get:all_als"],
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

export function useGetAdaptiveLearning(
  id: string,
  successAction?: any,
  errorAction?: any
) {
  const url = "/api_backend/als/als_lecture/";
  const axios = useContext(AxiosContext);
  return useQuery(
    ["get:single_als", id],
    () => getRequest(axios as unknown as AxiosInstance, url + id),
    {
      onSuccess: () => successAction?.(),
      onError: (error: any) => {
        errorAction?.();
        notification.error({
          message: "Error!",
          description: error?.message
            ? Object.entries(error?.errors || { key: [error?.message] })
                ?.map(([, value]) => (value as any)?.join(", "))
                ?.join(", ")
            : "something went wrong please check internet connection.",
        });
      },
    }
  );
}

export function usePostAdaptiveLearning(successAction?: any, errorAction?: any) {
  const url = "/api_backend/als/create_lecture";
  const axios = useContext(AxiosContext);
  return useMutation(
    async (payload: any) =>
      postRequest(axios as unknown as AxiosInstance, url, payload),
    {
      onSuccess: (response: any) => {
        successAction?.(response);
        notification.success({
          message: "Success!",
          description: response?.message || "action successful.",
        });
      },
      onError: (error: any) => {
        errorAction?.();
        notification.error({
          message: "Error!",
          description: error?.message
            ? Object.entries(error?.errors || { key: [error?.message] })
                ?.map(([, value]) => (value as any)?.join(", "))
                ?.join(", ")
            : "something went wrong please check internet connection.",
        });
      },
    }
  );
}

export function usePostAdaptiveLearningChat(successAction?: any, id?: string) {
  const url = "/api_backend/als/chat/";
  const axios = useContext(AxiosContext);
  return useMutation(
    async (payload: any) =>
      postRequest(
        axios as unknown as AxiosInstance,
        url + (id || payload?.id),
        payload
      ),
    {
      onSuccess: (response: any) => successAction?.(),
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

export function useDeleteAdaptiveLearning(successAction?: any, errorAction?: any) {
  const url = "/api_backend/als/";
  const axios = useContext(AxiosContext);
  return useMutation(
    async (id: any) =>
      deleteRequest(axios as unknown as AxiosInstance, url + id),
    {
      onSuccess: (response: any) => {
        successAction?.(response);
        notification.success({
          message: "Success!",
          description: response?.message || "action successful.",
        });
      },
      onError: (error: any) => {
        errorAction?.();
        notification.error({
          message: "Error!",
          description: error?.message
            ? Object.entries(error?.errors || { key: [error?.message] })
                ?.map(([, value]) => (value as any)?.join(", "))
                ?.join(", ")
            : "something went wrong please check internet connection.",
        });
      },
    }
  );
}
