import { AxiosRequestConfig } from "axios";
import { useCallback, useState } from "react";
import { ApiError, ApiResponse, fetchApi } from "../lib/apiClient";

// ─── Types ────────────────────────────────────────────────────────────────────

interface UsePostApiOptions<TResponse, TBody> {
  /** Called after a successful POST. */
  onSuccess?: (data: TResponse) => void;
  /** Called after a failed POST. */
  onError?: (error: ApiError) => void;
  /** Additional Axios config. */
  axiosConfig?: AxiosRequestConfig;
  /** HTTP method override — useful for PUT / PATCH reuse. Internal use. */
  _method?: "POST" | "PUT" | "PATCH";
}

interface UsePostApiReturn<TResponse, TBody> {
  data: TResponse | null;
  error: ApiError | null;
  loading: boolean;
  status: number | null;
  /** Execute the POST request with an optional body payload. */
  mutate: (
    body?: TBody,
    overrideConfig?: AxiosRequestConfig,
  ) => Promise<ApiResponse<TResponse>>;
  /** Reset state back to its initial values. */
  reset: () => void;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * `usePostApi` — Imperative POST (or PUT/PATCH) mutation hook.
 *
 * @example
 * const { mutate, loading, data, error } = usePostApi<AuthResponse, LoginBody>("/auth/login");
 * await mutate({ email, password });
 */
export function usePostApi<TResponse = unknown, TBody = unknown>(
  url: string,
  options: UsePostApiOptions<TResponse, TBody> = {},
): UsePostApiReturn<TResponse, TBody> {
  const { onSuccess, onError, axiosConfig, _method = "POST" } = options;

  const [data, setData] = useState<TResponse | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<number | null>(null);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
    setStatus(null);
  }, []);

  const mutate = useCallback(
    async (
      body?: TBody,
      overrideConfig?: AxiosRequestConfig,
    ): Promise<ApiResponse<TResponse>> => {
      setLoading(true);
      setError(null);

      const result = await fetchApi<TResponse>(url, _method, body, {
        ...axiosConfig,
        ...overrideConfig,
      });

      setStatus(result.status);

      if (result.error) {
        setError(result.error);
        onError?.(result.error);
      } else {
        setData(result.data);
        onSuccess?.(result.data as TResponse);
      }

      setLoading(false);
      return result;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [url, _method, JSON.stringify(axiosConfig)],
  );

  return { data, error, loading, status, mutate, reset };
}
