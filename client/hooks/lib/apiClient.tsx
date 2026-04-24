import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

// ─── Types ────────────────────────────────────────────────────────────────────

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiResponse<T = unknown> {
  data: T | null;
  error: ApiError | null;
  status: number | null;
}

export interface ApiError {
  message: string;
  status?: number;
  raw?: unknown;
}

// ─── Axios Instance ───────────────────────────────────────────────────────────

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000",
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── Request Interceptor ──────────────────────────────────────────────────────

apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// ─── Response Interceptor ─────────────────────────────────────────────────────

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

// ─── Core Fetch Utility ───────────────────────────────────────────────────────

export async function fetchApi<T = unknown>(
  url: string,
  method: HttpMethod = "GET",
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  try {
    const response = await apiClient.request<T>({
      url,
      method,
      data,
      ...config,
    });

    return { data: response.data, error: null, status: response.status };
  } catch (err) {
    const axiosError = err as AxiosError<{ message?: string }>;
    return {
      data: null,
      status: axiosError.response?.status ?? null,
      error: {
        message:
          axiosError.response?.data?.message ??
          axiosError.message ??
          "An unexpected error occurred",
        status: axiosError.response?.status,
        raw: axiosError.response?.data,
      },
    };
  }
}

export default apiClient;
