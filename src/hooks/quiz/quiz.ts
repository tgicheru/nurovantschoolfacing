import { notification } from "antd";
import { useMutation, useQuery } from "react-query";
import { getRequest, postRequest } from "../../context/requestTypes";
import { useContext } from "react";
import { AxiosContext } from "../../context/AxiosContext";
import { AxiosInstance } from "axios";


export function useGetAllQuiz(params?: any) {
  const url = "/api/quiz/";
  const axios = useContext(AxiosContext);
  return useQuery(["get:all_quiz"], () => getRequest(axios as unknown as AxiosInstance, url, params), {
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

export function useGetQuiz(id: string) {
  const url = "/api/quiz/";
  const axios = useContext(AxiosContext);
  return useQuery(["get:single_quiz"], () => getRequest(axios as unknown as AxiosInstance, url+id), {
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
  const url = "/api/quiz/create";
  const axios = useContext(AxiosContext);
  return useMutation(async (payload: any) => postRequest(axios as unknown as AxiosInstance, url, payload), {
      onSuccess: (response: any) => {
        successAction?.();
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
