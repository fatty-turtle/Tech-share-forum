import { AxiosRequestConfig } from "axios";
import { useCallback, useState } from "react";
import { ApiError, ApiResponse, fetchApi } from "../lib/apiClient";

// ─── Types ────────────────────────────────────────────────────────────────────

interface UseDeleteApiOptions<TResponse> {
  /** Called after a successful deletion. */
  onSuccess?: (data: TResponse) => void;
  /** Called after a failed deletion. */
  onError?: (error: ApiError) => void;
  /** Additional Axios config. */
  axiosConfig?: AxiosRequestConfig;
}

interface UseDeleteApiReturn<TResponse> {
  data: TResponse | null;
  error: ApiError | null;
  loading: boolean;
  status: number | null;
  /**
   * Execute the DELETE request.
   * @param urlSuffix - Appended to the base URL, e.g. `"/${id}"` → `DELETE /users/123`
   */
  remove: (
    urlSuffix?: string,
    overrideConfig?: AxiosRequestConfig,
  ) => Promise<ApiResponse<TResponse>>;
  /** Reset state back to its initial values. */
  reset: () => void;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * `useDeleteApi` — Imperative DELETE mutation hook.
 *
 * @example
 * const { remove, loading } = useDeleteApi<void>("/users");
 * await remove(`/${userId}`);  // → DELETE /users/123
 *
 * // With success callback
 * const { remove } = useDeleteApi("/posts", {
 *   onSuccess: () => refetchPosts(),
 * });
 */
export function useDeleteApi<TResponse = unknown>(
  url: string,
  options: UseDeleteApiOptions<TResponse> = {},
): UseDeleteApiReturn<TResponse> {
  const { onSuccess, onError, axiosConfig } = options;

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

  const remove = useCallback(
    async (
      urlSuffix = "",
      overrideConfig?: AxiosRequestConfig,
    ): Promise<ApiResponse<TResponse>> => {
      setLoading(true);
      setError(null);

      const result = await fetchApi<TResponse>(
        `${url}${urlSuffix}`,
        "DELETE",
        undefined,
        { ...axiosConfig, ...overrideConfig },
      );

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
    [url, JSON.stringify(axiosConfig)],
  );

  return { data, error, loading, status, remove, reset };
}
