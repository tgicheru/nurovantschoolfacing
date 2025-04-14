import { message, notification } from "antd";
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
import { useRecoilValue } from "recoil";
import authAtom from "../../atoms/auth/auth.atom";

export function useGetCourses(params?: any, keys?: any) {
  const url = `/teacher_api/courses/my_courses`;
  // const url = `/api_backend/lectures/get-user/${user?.info?.id || user?.info?._id}`;
  const axios = useContext(AxiosContext);
  return useQuery(
    ["get:all_courses", ...(keys || []).map((d: any) => params?.[d])],
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

export function useCreateCourse(successAction?: any) {
  const url = "/teacher_api/courses/create";
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

export function useGetCourseById(params?: any) {
  const url = `/teacher_api/courses/`;
  // const url = `/api_backend/lectures/get-user/${user?.info?.id || user?.info?._id}`;
  const axios = useContext(AxiosContext);
  return useQuery(
    ["get:single_course"],
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

export function useDeleteCourse(successAction?: any, errorAction?: any) {
  const url = "/api_backend/lectures/";
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




// course lecture group activities API hooks >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export function useGetStudentGroups(params?: any, keys?: any) {
  const url = `/teacher_api/student-groups`;
  const axios = useContext(AxiosContext);
  return useQuery(
    ["get:all_student_groups", ...(keys || []).map((d: any) => params?.[d])],
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


export function useGetStudentGroup(id?: any, successAction?: any) {
  const url = `/teacher_api/student-groups/activity`;
  const axios = useContext(AxiosContext);
  return useQuery(
    ["get:all_student_group", id],
    () => getRequest(axios as unknown as AxiosInstance, url, {group_id: id}),
    {
      enabled: Boolean(id),
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


export function useGetGroupDetails(id?: any, keys?: any) {
  const url = `/teacher_api/student-groups/group-by-id`;
  const axios = useContext(AxiosContext);
  return useQuery(
    ["get:all_group_details", id],
    () => getRequest(axios as unknown as AxiosInstance, url, {group_id: id}),
    {
      enabled: Boolean(id),
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


export function usePostGroupActivity(successAction?: any, errorAction?: any) {
  const url = "/teacher_api/student-groups/activity/create";
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


export function usePutStudentGroup(successAction?: any, errorAction?: any) {
  const url = "/teacher_api/student-groups/activity/update";
  const axios = useContext(AxiosContext);
  return useMutation(
    async (payload: any) =>
      putRequest(axios as unknown as AxiosInstance, url, payload),
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


export function usePutStudentGroupSwap(successAction?: any, errorAction?: any) {
  const url = "/teacher_api/student-groups/swap";
  const axios = useContext(AxiosContext);
  return useMutation(
    async (payload: any) =>
      putRequest(axios as unknown as AxiosInstance, url, payload),
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


export function useDeleteStudentGroup(successAction?: any, errorAction?: any) {
  const url = "/teacher_api/student-groups/delete";
  const axios = useContext(AxiosContext);
  return useMutation(
    async (id: any) =>
      deleteRequest(axios as unknown as AxiosInstance, url + handleObjToParam({group_id: id})),
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




// course lecture pacing guide API hooks >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export function useGetAllPacingGuides(params?: any, keys?: any) {
  const url = `/teacher_api/curriculum-alignment/get-all-alignments`;
  const axios = useContext(AxiosContext);
  return useQuery(
    ["get:all_pacing_guides", ...(keys || []).map((d: any) => params?.[d])],
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


export function useGetPacingGuide(id?: any, successAction?: any) {
  const url = `/teacher_api/curriculum-alignment/get-alignment/`;
  const axios = useContext(AxiosContext);
  return useQuery(
    ["get:pacing_guide", id],
    () => getRequest(axios as unknown as AxiosInstance, url + id),
    {
      enabled: Boolean(id),
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


export function usePostPacingGuide(successAction?: any, errorAction?: any) {
  const url = "/teacher_api/curriculum-alignment/improve";
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


export function usePostPacingGuideLesson(successAction?: any, errorAction?: any) {
  const url = "/teacher_api/curriculum-alignment/add-lecture-to-alignment/";
  const axios = useContext(AxiosContext);
  return useMutation(
    async (payload: any) =>
      postRequest(axios as unknown as AxiosInstance, url + payload?.id, payload),
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


export function useDeletePacingGuide(successAction?: any, errorAction?: any) {
  const url = "/teacher_api/curriculum-alignment/delete-alignment/";
  const axios = useContext(AxiosContext);
  return useMutation(
    async (payload: any) =>
      deleteRequest(axios as unknown as AxiosInstance, url + payload?.id, payload),
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


export function useDeletePacingGuideLecture(successAction?: any, errorAction?: any) {
  const url = "/teacher_api/curriculum-alignment/remove-lecture-from-alignment/";
  const axios = useContext(AxiosContext);
  return useMutation(
    async (payload: any) =>
      deleteRequest(axios as unknown as AxiosInstance, url + payload?.id, payload),
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



// course lecture lesson plan API hooks >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export function useGetAllLessonPlanAnalysis(id?: string) {
  const url = `/teacher_api/lesson_plan/get-conversation`;
  const axios = useContext(AxiosContext);
  return useQuery(
    ["get:all_lesson_plan_analysis", id],
    () => getRequest(axios as unknown as AxiosInstance, url, {lessonPlanId: id}),
    {
      enabled: Boolean(id),
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


export function usePostLessonPlanAnalyze(id?: string, successAction?: any, errorAction?: any) {
  const url = "/teacher_api/lesson_plan/analyze";
  const axios = useContext(AxiosContext);
  return useMutation(
    async (payload: any) =>
      postRequest(axios as unknown as AxiosInstance, url + handleObjToParam({lessonPlanId: id}), payload),
    {
      onSuccess: (response: any) => {
        successAction?.(response);
        notification.success({
          message: "Success!",
          description: response?.message || "action successful.",
        });
      },
      // onError: (error: any) => {
      //   errorAction?.();
      //   notification.error({
      //     message: "Error!",
      //     description: error?.message
      //       ? Object.entries(error?.errors || { key: [error?.message] })
      //           ?.map(([, value]) => (value as any)?.join(", "))
      //           ?.join(", ")
      //       : "something went wrong please check internet connection.",
      //   });
      // },
    }
  );
}




// course lecture feedback API hooks >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export function useGetAllCourseFeedbacks() {
  const url = `/teacher_api/course-feedback/all-feedbacks`;
  const axios = useContext(AxiosContext);
  return useQuery(
    ["get:all_course_feedbacks"],
    () => getRequest(axios as unknown as AxiosInstance, url),
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


export function useGetAllLectureFeedbacks(id?: string) {
  const url = `/teacher_api/course-feedback/lecture/`;
  const axios = useContext(AxiosContext);
  return useQuery(
    ["get:all_lecture_feedbacks"],
    () => getRequest(axios as unknown as AxiosInstance, url + id),
    {
      enabled: Boolean(id),
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


export function usePostCourseFeedback(successAction?: any, errorAction?: any) {
  const url = "/teacher_api/course-feedback/create";
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
      // onError: (error: any) => {
      //   errorAction?.();
      //   notification.error({
      //     message: "Error!",
      //     description: error?.message
      //       ? Object.entries(error?.errors || { key: [error?.message] })
      //           ?.map(([, value]) => (value as any)?.join(", "))
      //           ?.join(", ")
      //       : "something went wrong please check internet connection.",
      //   });
      // },
    }
  );
}


// course lecture feedback API hooks >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export function usePostGoogleCalendarAuthURL(successAction?: any) {
  const url = `/teacher_api/google/auth-url`;
  const { user } = useRecoilValue(authAtom);
  const axios = useContext(AxiosContext);
  return useMutation(
    (d: any) => getRequest(axios as unknown as AxiosInstance, url + handleObjToParam({user_id: user?._id})),
    {
      onSuccess: (res: any) => {
        successAction?.(res)
        message.success("you'll be redirected to continue authentication." )
        setTimeout(() => { window.location.href = res?.authUrl }, 3000);
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