import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import Cookies from 'js-cookie';
import { toast } from "sonner";
import { refreshTokenService } from "../services";

// Create axios instances
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const axiosInstanceUnauth = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Axios request interceptor for authenticated instance
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get Access Token from cookies
    const access_token = Cookies.get('access_token');
    // Add Bearer API Key
    if (access_token && config.headers) {
      config.headers["Authorization"] = `Bearer ${access_token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Refresh access token if token has expired
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error?.response?.status === 401 &&
      !originalRequest._retry &&
      window.location.pathname !== "/"
    ) {
      originalRequest._retry = true;
      const accessToken = await refreshToken();
      if (accessToken) {
        return axiosInstance(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export const refreshToken = async (): Promise<string> => {
  let token = "";

  const refresh_token = Cookies.get('refresh_token');
  if (refresh_token) {
    await refreshTokenService({
      refresh_token: refresh_token
    })
      .then((res: { data: { access_token: string; }; }) => {
        token = res.data.access_token;
        Cookies.set("access_token", token, {
          path: "/",
          secure: false,
          sameSite: "Lax",
          expires: 7,
        });
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        return token;
      })
      .catch(() => {
        Logout();
      });

  } else {
    // Logout();
  }
  return token;
};

// API Request Functions
interface ApiRequestProps {
  url: string;
  config?: AxiosRequestConfig;
  data?: unknown;
}

// Axios request functions
export async function getRequest(request: ApiRequestProps) {
  return await axiosInstance.get(request.url, request.config);
}

export async function postRequest(request: ApiRequestProps) {
  return await axiosInstance.post(request.url, request.data, request.config);
}

export async function putRequest(request: ApiRequestProps) {
  return await axiosInstance.put(request.url, request.data, request.config);
}

export async function patchRequest(request: ApiRequestProps) {
  return await axiosInstance.patch(request.url, request.data, request.config);
}

export async function deleteRequest(request: ApiRequestProps) {
  return await axiosInstance.delete(request.url, request.config);
}

// Logout Function

const Logout = async (): Promise<string> =>  {
    // make logout request
    window.location.assign('/login');
    localStorage.clear();
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    toast.info('Your session has expired, Please log in again.')

    return 'logout successful'
};