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

interface RetryableRequest extends AxiosRequestConfig {
  _retry?: boolean;
}

// ─── Axios Instance ───────────────────────────────────────────────────────────

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000",
  timeout: 15_000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── Refresh Token State ──────────────────────────────────────────────────────

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token!);
  });
  failedQueue = [];
};

// ─── Auth Helpers ─────────────────────────────────────────────────────────────

/**
 * Clears the access token from localStorage and redirects to login.
 * The httpOnly refresh token cookie is cleared server-side when the
 * user explicitly logs out via POST /auth/logout.
 */
const clearAuthAndRedirect = () => {
  localStorage.removeItem("accessToken");
  delete apiClient.defaults.headers.common.Authorization;
  window.location.href = "/login";
};

/**
 * Logs the user out: clears localStorage and asks the server to clear
 * the httpOnly refresh token cookie, then redirects to login.
 */
export const logout = async () => {
  localStorage.removeItem("accessToken");
  delete apiClient.defaults.headers.common.Authorization;

  try {
    // Server clears the httpOnly cookie — no body or token needed from client
    await apiClient.post("/auth/logout");
  } catch {
    // Proceed with local logout regardless of server response
  }

  window.location.href = "/login";
};

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
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequest;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (typeof window === "undefined") {
      return Promise.reject(error);
    }

    // ── Case 1: A refresh is already in progress — queue this request ──
    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${token}`,
          };
          return apiClient(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    // ── Case 2: Start the refresh flow ────────────────────────────────
    originalRequest._retry = true;
    isRefreshing = true;

    try {
      // withCredentials sends the httpOnly cookie automatically — no body needed
      const { data } = await apiClient.post<{ accessToken: string }>(
        "/auth/refresh",
      );

      const newAccessToken = data.accessToken;

      localStorage.setItem("accessToken", newAccessToken);
      apiClient.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

      processQueue(null, newAccessToken);

      originalRequest.headers = {
        ...originalRequest.headers,
        Authorization: `Bearer ${newAccessToken}`,
      };
      return apiClient(originalRequest);
    } catch (refreshError) {
      // Refresh token is also expired/invalid — clear local state and redirect
      processQueue(refreshError, null);
      clearAuthAndRedirect();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
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
