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
import { handleObjToParam } from "../../context/utils";

export function useGetAllAdaptiveLearning(params?: any) {
  const url = "/teacher_api/als";
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
  const url = "/teacher_api/als/";
  const axios = useContext(AxiosContext);
  return useQuery(
    ["get:single_als", id],
    () => getRequest(axios as unknown as AxiosInstance, url + handleObjToParam({id})),
    {
      enabled: Boolean(id),
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
  const url = "/teacher_api/als";
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

export function useDeleteAdaptiveLearning(successAction?: any, errorAction?: any) {
  const url = "/teacher_api/als/";
  const axios = useContext(AxiosContext);
  return useMutation(
    async (id: any) =>
      deleteRequest(axios as unknown as AxiosInstance, url + handleObjToParam({ als_id: id })),
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



// quiz questions section >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export function useGetALQuiz(
  id: string,
  successAction?: any,
  errorAction?: any
) {
  const url = "/teacher_api/als/als_quiz/";
  const axios = useContext(AxiosContext);
  return useQuery(
    ["get:single_als_quiz", id],
    () => getRequest(axios as unknown as AxiosInstance, url + id),
    {
      enabled: Boolean(id),
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

export function usePostALQuiz(successAction?: any, errorAction?: any) {
  const url = "/teacher_api/als/create_quiz/";
  const axios = useContext(AxiosContext);
  return useMutation(
    async (id: any) =>
      getRequest(axios as unknown as AxiosInstance, url + id),
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



// quiz participants section >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export function useGetALQuizParticipants(
  id: string,
  successAction?: any,
  errorAction?: any
) {
  const url = "/teacher_api/als/results/";
  const axios = useContext(AxiosContext);
  return useQuery(
    ["get:single_als_quiz_participants", id],
    () => getRequest(axios as unknown as AxiosInstance, url + handleObjToParam({id})),
    {
      enabled: Boolean(id),
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

export function useGetALQuizParticipant(
  id: string,
  successAction?: any,
  errorAction?: any
) {
  const url = "/teacher_api/als/results/";
  const axios = useContext(AxiosContext);
  return useQuery(
    ["get:single_als_quiz_participant", id],
    () => getRequest(axios as unknown as AxiosInstance, url + id),
    {
      enabled: Boolean(id),
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

export function usePostGenerateALReport(successAction?: any, errorAction?: any) {
  const url = "/teacher_api/als/generate_csv/";
  const axios = useContext(AxiosContext);
  return useMutation(
    async (id: any) =>
      getRequest(axios as unknown as AxiosInstance, url + id),
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

export function usePostUploadALReport(successAction?: any, errorAction?: any) {
  const url = "/teacher_api/als/upload_csv/";
  const axios = useContext(AxiosContext);
  return useMutation(
    async (id: any) =>
      getRequest(axios as unknown as AxiosInstance, url + id),
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