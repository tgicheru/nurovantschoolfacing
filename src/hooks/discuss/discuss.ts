import { notification } from "antd";
import { useMutation, useQuery } from "react-query";
import { getRequest, postRequest } from "../../context/requestTypes";
import { useContext } from "react";
import { AxiosContext } from "../../context/AxiosContext";
import { AxiosInstance } from "axios";


export function useGetAllDiscuss(params?: any) {
  const url = "/api/discussion/";
  const axios = useContext(AxiosContext);
  return useQuery(["get:all_discussion"], () => getRequest(axios as unknown as AxiosInstance, url, params), {
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

export function useGetDiscuss(id: string, successAction?: any, errorAction?: any) {
  const url = "/api/discussion/";
  const axios = useContext(AxiosContext);
  return useQuery(["get:single_discussion", id], () => getRequest(axios as unknown as AxiosInstance, url+id), {
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
    },
  );
}

export function usePostDiscuss(successAction?: any, errorAction?: any) {
  const url = "/api/discussion/create";
  const axios = useContext(AxiosContext);
  return useMutation(async (payload: any) => postRequest(axios as unknown as AxiosInstance, url, payload), {
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
        })
      },
    }
  );
}

export function usePostDiscussChat(successAction?: any, id?: string) {
  const url = "/api/discussion/chat/";
  const axios = useContext(AxiosContext);
  return useMutation(async (payload: any) => postRequest(axios as unknown as AxiosInstance, url+(id || payload?.id), payload), {
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
