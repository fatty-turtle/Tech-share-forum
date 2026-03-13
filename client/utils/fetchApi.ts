import axios, { AxiosError } from "axios";

/**
 * HTTP method types supported by fetchApi
 */
type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/**
 * Return type for fetchApi function
 */
interface FetchApiResponse<T = unknown> {
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

async function fetchApi<T = unknown>(
  url: string,
  method: HttpMethod = "GET",
  data: unknown = null,
  headers: object = {},
): Promise<FetchApiResponse<T>> {
  try {
    const response = await axios({
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
        (axiosError.response?.data as string) ||
        axiosError.message ||
        "An unexpected error occurred",
      loading: false,
    };
  }
}

export default fetchApi;
