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

export function useGetQuestionTracker(params?: any) {
  const url = `/api_backend/proof_reader/question_tracker`;
  // const url = `/api_backend/lectures/get-user/${user?.info?.id || user?.info?._id}`;
  const axios = useContext(AxiosContext);
  return useQuery(
    ["get:user_question_tracker"],
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

export function usePostQuestionTracker(successAction?: any) {
  const url = "/api_backend/proof_reader/question_tracker";
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

// export function useDeleteQuestionTracker(
//   successAction?: any,
//   errorAction?: any
// ) {
//   const url = "/api_backend/proof_reader/delete/";
//   const axios = useContext(AxiosContext);
//   return useMutation(
//     async (id: any) =>
//       deleteRequest(axios as unknown as AxiosInstance, url + id),
//     {
//       onSuccess: (response: any) => {
//         successAction?.(response);
//         notification.success({
//           message: "Success!",
//           description: response?.message || "action successful.",
//         });
//       },
//       onError: (error: any) => {
//         errorAction?.();
//         notification.error({
//           message: "Error!",
//           description: error?.message
//             ? Object.entries(error?.errors || { key: [error?.message] })
//                 ?.map(([, value]) => (value as any)?.join(", "))
//                 ?.join(", ")
//             : "something went wrong please check internet connection.",
//         });
//       },
//     }
//   );
// }

export function useEditQuestionTracker(
  id: any,
  successAction?: any,
  errorAction?: any
) {
  const url = `/api_backend/proof_reader/question_tracker/${id}`;
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
        queryClient.invalidateQueries("get:user_question_tracker");
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
