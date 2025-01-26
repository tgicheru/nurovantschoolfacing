import { notification } from "antd";
import { useMutation, useQuery } from "react-query";
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

export function useGetQuestionBanks(params?: any) {
  const url = `/teacher_api/question_bank/my_questions`;
  const axios = useContext(AxiosContext);
  return useQuery(
    ["get:user_question_banks", params],
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

export function useGetQuestionBank(params?: any) {
  const url = `/teacher_api/question_bank/`;
  const axios = useContext(AxiosContext);
  return useQuery(
    ["get:user_question_bank", params],
    () => getRequest(axios as unknown as AxiosInstance, url + handleObjToParam(params)),
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

export function usePostQuestionBank(successAction?: any) {
  const url = "/teacher_api/question_bank";
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

export function usePostQuestionBankVariant(id: string, successAction?: any) {
  const url = "/teacher_api/question_bank/add_variant";
  const axios = useContext(AxiosContext);
  return useMutation(
    async (payload: any) =>
      postRequest(axios as unknown as AxiosInstance, url + handleObjToParam({ id }), payload),
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

export function usePostQuestionBankQuestion(id: string, successAction?: any) {
  const url = "/teacher_api/question_bank/add_va_question";
  const axios = useContext(AxiosContext);
  return useMutation(
    async (payload: any) =>
      postRequest(axios as unknown as AxiosInstance, url + handleObjToParam({ id }), payload),
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

export function usePutQuestionBank(
  id: any,
  successAction?: any,
  errorAction?: any
) {
  const url = `/teacher_api/question_bank/`;
  const axios = useContext(AxiosContext);
  return useMutation(
    (payload: any) =>
      putRequest(axios as unknown as AxiosInstance, url + handleObjToParam({id}), payload),
    {
      onSuccess: (response) => {
        successAction?.();
        notification.success({
          key: "updateable",
          message: "Success!",
          description: response?.message || "action successful.",
        });
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

export function useDeleteQuestionBank(successAction?: any, errorAction?: any) {
  const url = "/teacher_api/question_bank/";
  const axios = useContext(AxiosContext);
  return useMutation(
    async (id: any) =>
      deleteRequest(axios as unknown as AxiosInstance, url + handleObjToParam({ question_bank_id: id })),
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

export function useDeleteQuestionBankVariant(successAction?: any, errorAction?: any) {
  const url = "/teacher_api/question_bank/delete_variant/";
  const axios = useContext(AxiosContext);
  return useMutation(
    async (data: any) =>
      deleteRequest(axios as unknown as AxiosInstance, url + handleObjToParam(data)),
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

export function useDeleteQuestionBankQuestion(successAction?: any, errorAction?: any) {
  const url = "/teacher_api/question_bank/delete_question_variant";
  const axios = useContext(AxiosContext);
  return useMutation(
    async (data: any) =>
      deleteRequest(axios as unknown as AxiosInstance, url + handleObjToParam(data)),
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
