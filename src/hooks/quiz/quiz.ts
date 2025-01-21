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

export function useGetAllQuiz(params?: any) {
  const url = "/api_backend/quiz/";
  const axios = useContext(AxiosContext);
  return useQuery(
    ["get:all_quiz"],
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

export function useGetQuiz(id: string, params?: any) {
  const url = "/api_backend/quiz/";
  const axios = useContext(AxiosContext);
  return useQuery(
    ["get:single_quiz"],
    () => getRequest(axios as unknown as AxiosInstance, url + id, params),
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

export function useGetQuizParticipants(id: string) {
  const url = "/api_backend/quiz/get_all_results/";
  const axios = useContext(AxiosContext);
  return useQuery(
    ["get:quiz_participants"],
    () => getRequest(axios as unknown as AxiosInstance, url + id),
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

export function usePostQuiz(successAction?: any) {
  const url = "/api_backend/quiz/create";
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

export function usePostQuizAnswer(successAction?: any) {
  const url = "/api_backend/quiz/submit_quiz";
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

export function useDeleteQuiz(successAction?: any, errorAction?: any) {
  const url = "/api_backend/quiz/";
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
