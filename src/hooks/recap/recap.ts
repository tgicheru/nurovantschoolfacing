import { notification } from "antd";
import { useMutation, useQuery } from "react-query";
import { deleteRequest, getRequest, postRequest } from "../../context/requestTypes";
import { useContext } from "react";
import { AxiosContext } from "../../context/AxiosContext";
import { AxiosInstance } from "axios";

export function useGetRecap(id: string) {
  const url = "/api/recaps/";
  const axios = useContext(AxiosContext);
  return useQuery(
    ["get:single_recap"],
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

export function usePostRecaps(successAction?: any) {
  const url = "/api/recaps/create";
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

export function useGetAllRecaps(params?: any) {
  const url = "/api/recaps/";
  const axios = useContext(AxiosContext);
  return useQuery(
    ["get:all_recaps"],
    () => getRequest(axios as unknown as AxiosInstance, url, params),
    {
      refetchInterval: 60000,
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

export function useDeleteRecap(successAction?: any, errorAction?: any) {
  const url = "/api/recaps/";
  const axios = useContext(AxiosContext);
  return useMutation(async (id: any) => deleteRequest(axios as unknown as AxiosInstance, url+id), {
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