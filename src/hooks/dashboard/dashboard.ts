import { notification } from "antd";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router";
import authAtom from "../../atoms/auth/auth.atom";
import { useMutation, useQueryClient } from "react-query";
import { postRequest } from "../../context/requestTypes";
import { useContext } from "react";
import { AxiosContext } from "../../context/AxiosContext";
import { AxiosInstance } from "axios";

export function usePost() {
  const url = "/api/lectures/create_teacher_lecture";
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const axios = useContext(AxiosContext);
  const setAuth = useSetRecoilState(authAtom);
  return useMutation((payload) => postRequest(axios as unknown as AxiosInstance, url, payload), {
      onSuccess: (response: any) => {
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
