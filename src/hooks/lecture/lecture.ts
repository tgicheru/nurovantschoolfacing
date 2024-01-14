import { notification } from "antd";
import { useMutation, useQuery } from "react-query";
import { getRequest, postRequest } from "../../context/requestTypes";
import { useContext } from "react";
import { AxiosContext } from "../../context/AxiosContext";
import { AxiosInstance } from "axios";


export function useGetLectures(params?: any) {
  const url = `/api/lectures/`;
  // const url = `/api/lectures/get-user/${user?.info?.id || user?.info?._id}`;
  const axios = useContext(AxiosContext);
  return useQuery(["get:all_lectures"], () => getRequest(axios as unknown as AxiosInstance, url, params), {
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

export function usePostLecture(successAction?: any) {
  const url = "/api/lectures/create_teacher_lecture";
  const axios = useContext(AxiosContext);
  return useMutation(async (payload: any) => postRequest(axios as unknown as AxiosInstance, url, payload), {
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
