/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ROUTER_PATH } from "@/config/routerPath";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import useSWR from "swr";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean;
}

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Use relative API path since Nginx proxies /api to backend
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor for error handling and retry logic
apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;
        const isLoginRequest = originalRequest.url?.includes('/login');

        if (
            originalRequest &&
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            if (isLoginRequest) {
                // If it's a login attempt and fails, do NOT redirect
                return Promise.reject(error); // Let the component handle the error
            }

            try {
                // Uncomment this if you support token refresh
                // const newToken = await refreshAuthToken();
                // if (originalRequest.headers) {
                //   originalRequest.headers.Authorization = `Bearer ${newToken}`;
                // }
                // return apiClient(originalRequest);

                throw new Error();
            } catch (refreshError) {
                console.error('Token refresh failed. Redirecting to login.');
                localStorage.clear();
                window.location.href = ROUTER_PATH.LOGIN;
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export const getAPI = async (url: string, params?: Record<string, any>) => {
    try {
        const response = await apiClient.get(url, { params });
        return response.data;
    } catch (error) {
        console.error("GET request error:", error);
        throw error;
    }
};

export const postAPI = async (url: string, data: any) => {
    try {
        const response = await apiClient.post(url, data);
        return response.data;
    } catch (error) {
        console.error("POST request error:", error);
        throw error;
    }
};

export const putAPI = async (url: string, data: any) => {
    try {
        const response = await apiClient.put(url, data);
        return response.data;
    } catch (error) {
        console.error("PUT request error:", error);
        throw error;
    }
};

export const deleteAPI = async (url: string) => {
    try {
        const response = await apiClient.delete(url);
        return response.data;
    } catch (error) {
        console.error("DELETE request error:", error);
        throw error;
    }
};

const fetcher = (url: string) => apiClient.get(url).then(res => res.data)

export const useDataSWR = (url: string, payload: Record<string, any>) => {
    const queryParams = new URLSearchParams(payload).toString();
    const paginatedUrl = `${url}?${queryParams}`;
    return useSWR(paginatedUrl, fetcher);
}