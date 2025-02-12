import { notification } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../../context/requestTypes";
import { useContext } from "react";
import { AxiosContext } from "../../context/AxiosContext";
import { AxiosInstance } from "axios";
import { handleObjToParam } from "../../context/utils";

export function useGetReviewReports(params?: any, successAction?: any) {
  const url = `/teacher_api/review`;
  const axios = useContext(AxiosContext);
  return useQuery(
    ["get:review_reports"],
    () => getRequest(axios as unknown as AxiosInstance, url, params),
    {
      onSuccess: (res: any) => successAction?.(res),
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

export function useGetReviewReport(params?: any, successAction?: any) {
  const url = `/teacher_api/review/`;
  const axios = useContext(AxiosContext);
  return useQuery(
    ["get:review_report", params],
    () => getRequest(axios as unknown as AxiosInstance, url + handleObjToParam(params)),
    {
      onSuccess: (res: any) => successAction?.(res),
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

export function usePostReviewReport(successAction?: any) {
  const url = "/teacher_api/review/create_report";
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

export function usePostReviewReportCreate(successAction?: any) {
  const url = "/teacher_api/review/create_custom_report";
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

export function usePutReviewReport(
  params: any,
  successAction?: any,
  errorAction?: any
) {
  const url = `/teacher_api/speech_rate/`;
  const axios = useContext(AxiosContext);
  const queryClient = useQueryClient();
  return useMutation(
    (payload: any) =>
      putRequest(axios as unknown as AxiosInstance, url + handleObjToParam(params), payload),
    {
      onSuccess: (response) => {
        successAction?.();
        notification.success({
          key: "updateable",
          message: "Success!",
          description: response?.message || "action successful.",
        });
        queryClient.invalidateQueries("get:user_speech_rate");
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

export function useDeleteReviewReport(
  successAction?: any,
  errorAction?: any
) {
  const url = "/teacher_api/review/";
  const axios = useContext(AxiosContext);
  return useMutation(
    async (id: any) =>
      deleteRequest(axios as unknown as AxiosInstance, url + handleObjToParam({ review_id: id })),
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