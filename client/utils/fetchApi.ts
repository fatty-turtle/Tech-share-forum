import axios, { AxiosError, AxiosInstance } from "axios";

/**
 * HTTP method types supported by fetchApi
 */
type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/**
 * Return type for fetchApi function
 */
interface FetchApiResponse<T = any> {
  response: T | null;
  error: string | null;
  loading: boolean;
}

/**
 * A function for making HTTP requests using Axios
 * @param {string}      url       - The full URL to request
 * @param {HttpMethod}  [method="GET"] - HTTP method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
 * @param {unknown|null}[data=null]    - Request payload for POST / PUT / PATCH
 * @param {object}      [headers={}]   - Additional request headers
 * @returns {Promise<FetchApiResponse>}
 */

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:4000",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Optional: response interceptor for error handling or refresh
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      // Optional: redirect to login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

async function fetchApi<T = any>(
  url: string,
  method: HttpMethod = "GET",
  data: any = null,
  headers: object = {},
): Promise<FetchApiResponse<T>> {
  try {
    const response = await api({
      url: url,
      method: method,
      data: data,
      headers: headers,
    });
    return { response: response.data as T, error: null, loading: false };
  } catch (error) {
    const axiosError = error as AxiosError;
    return {
      response: null,
      error:
        (axiosError.response?.data as { message?: string })?.message ||
        axiosError.message ||
        "An unexpected error occurred",
      loading: false,
    };
  }
}

export default fetchApi;
