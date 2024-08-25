import httpAxios, { AxiosInstance } from "axios";
import { baseURL } from "./AxiosContext";
import { notification } from "antd";

const handleExpOut = () => {
  notification.error({message: "Error!", description: "Token Expired Please Re-login."});
  setTimeout(() => {window.location.pathname = "/auth"}, 2000);
}

const handleError = (error: any) => {
  const messages = [
    "authenticated",
    "Token is not valid!",
    "Token is not valid! - 1",
    "Only teachers are required to perform this action!",
  ]
  if(messages?.includes(error?.message)) return handleExpOut()
  return Promise.reject(error)
}
const head = { "Content-Type": "multipart/form-data", Accept: "multipart/form-data" }
export const patchFormRequest = async (url: string, data: any, token: string, params: any, method="patch") => httpAxios({url: baseURL+url, method, headers: {...head, Authorization: `Bearer ${token}`}, data, params}).then(({ data }) => Promise.resolve(data)).catch(({ response: { data }}) => handleError(data));
export const postFormRequest = async (url: string, data: any, token: string, params: any, method="post") => httpAxios({url: baseURL+url, method, headers: {...head, Authorization: `Bearer ${token}`}, data, params}).then(({ data }) => Promise.resolve(data)).catch(({ response: { data }}) => handleError(data));
export const putFormRequest = async (url: string, data: any, token: string, params: any, method="put") => httpAxios({url: baseURL+url, method, headers: {...head, Authorization: `Bearer ${token}`}, data, params}).then(({ data }) => Promise.resolve(data)).catch(({ response: { data }}) => handleError(data));
export const otherRequest = async (url: string, method?: string, data?: any, headers?: any, params?: any) => httpAxios({url: baseURL+url, method, headers, data, params}).then(({ data }) => Promise.resolve(data)).catch(({ response: { data }}) => handleError(data));
export const patchRequest = async (axios: AxiosInstance, url: string, data?: any, headers?: any) => axios?.patch(url, data, headers).then(({ data }) => Promise.resolve(data)).catch(({ response: { data }}) => handleError(data));
export const postRequest = async (axios: AxiosInstance, url: string, data?: any, headers?: any) => axios?.post(url, data, headers).then(({ data }) => Promise.resolve(data)).catch(({ response: { data }}) => handleError(data));
export const putRequest = async (axios: AxiosInstance, url: string, data?: any, headers?: any) => axios?.put(url, data, headers).then(({ data }) => Promise.resolve(data)).catch(({ response: { data }}) => handleError(data));
export const getRequest = async (axios: AxiosInstance, url: string, params?: any) => axios?.get(url, { params }).then(({ data }) => Promise.resolve(data)).catch(({ response: { data }}) => handleError(data));
export const deleteRequest = async (axios: AxiosInstance, url: string, data?: any) => axios?.delete(url, data).then(({ data }) => Promise.resolve(data)).catch(({ response: { data }}) => handleError(data));