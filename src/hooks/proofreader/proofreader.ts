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

export function useGetProofReader(params?: any) {
  const url = `/api_backend/proof_reader/user_readers`;
  // const url = `/api_backend/lectures/get-user/${user?.info?.id || user?.info?._id}`;
  const axios = useContext(AxiosContext);
  return useQuery(
    ["get:user_proofreader"],
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

export function usePostProofReader(successAction?: any) {
  const url = "/api_backend/proof_reader/create";
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

export function useDeleteProofReader(successAction?: any, errorAction?: any) {
  const url = "/api_backend/proof_reader/delete/";
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

export function useEditProofReader(
  id: any,
  successAction?: any,
  errorAction?: any
) {
  const url = `/api_backend/proof_reader/edit/${id}`;
  const axios = useContext(AxiosContext);
  const queryClient = useQueryClient();
  return useMutation(
    (payload: any) =>
      putRequest(axios as unknown as AxiosInstance, url, payload),
    {
      onSuccess: (response) => {
        successAction?.();
        notification.success({
          key: "updateable",
          message: "Success!",
          description: response?.message || "profile set successfully.",
        });
        queryClient.invalidateQueries("get:user_proofreader");
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
