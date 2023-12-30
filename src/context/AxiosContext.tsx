import axios from "axios";
import { useRecoilValue } from "recoil";
import { useMemo, createContext } from "react";
import authAtom from "../atoms/auth/auth.atom";

type Headers = {
  "Content-Type": string,
  Authorization?: string,
  Accept: string,
}

const {href: host} = window.location
export const AxiosContext = createContext(null);
export const isTestEnv = host.includes('localhost') || host.includes('surge');
const isDevEnv = !process.env.NODE_ENV || (process.env.NODE_ENV === 'development') || isTestEnv;
export const baseURL = isDevEnv ? "https://nurovant-production-serve-kaax.codecapsules.co.za/" : "https://nurovant-production-serve-kaax.codecapsules.co.za/"
export default function AxiosContextProvider({ children } : { children: any }) {
  const { isLoggedIn, user } = useRecoilValue(authAtom);
  const axiosInstance = useMemo(() => {
    const headers: Headers = { "Content-Type": "application/json", Accept: "application/json" };
    if (isLoggedIn) { headers.Authorization = `Bearer ${user?.token}` };
    return axios.create({ baseURL, headers });
  }, [isLoggedIn, user]);

  return (
    <AxiosContext.Provider value={axiosInstance as any}>
      {children}
    </AxiosContext.Provider>
  );
}
