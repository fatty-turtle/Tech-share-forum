import { AxiosRequestConfig } from "axios";
import { useCallback, useState } from "react";
import { ApiError, ApiResponse, fetchApi } from "../lib/apiClient";

// ─── Types ────────────────────────────────────────────────────────────────────

type UpdateMethod = "PUT" | "PATCH";

interface UseCreateApiOptions<TResponse, TBody> {
  /**
   * HTTP method to use: "PUT" (full replace) or "PATCH" (partial update).
   * Defaults to `"PUT"`.
   */
  method?: UpdateMethod;
  /** Called after a successful update. */
  onSuccess?: (data: TResponse) => void;
  /** Called after a failed update. */
  onError?: (error: ApiError) => void;
  /** Additional Axios config. */
  axiosConfig?: AxiosRequestConfig;
}

interface UseCreateApiReturn<TResponse, TBody> {
  data: TResponse | null;
  error: ApiError | null;
  loading: boolean;
  status: number | null;
  /**
   * Execute the update. Optionally override the `url` suffix (e.g. append an id)
   * and pass a body payload.
   */
  update: (
    body?: TBody,
    urlSuffix?: string,
    overrideConfig?: AxiosRequestConfig,
  ) => Promise<ApiResponse<TResponse>>;
  /** Reset state back to its initial values. */
  reset: () => void;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * `useCreateApi` — PUT / PATCH mutation hook for resource updates.
 *
 * @example
 * // Full replace
 * const { update, loading } = useCreateApi<User, UpdateUserBody>("/users");
 * await update(payload, `/${userId}`);  // → PUT /users/123
 *
 * // Partial update
 * const { update } = useCreateApi<User, Partial<User>>("/users", { method: "PATCH" });
 * await update({ name: "Alice" }, `/${userId}`);
 */
export function useCreateApi<TResponse = unknown, TBody = unknown>(
  url: string,
  options: UseCreateApiOptions<TResponse, TBody> = {},
): UseCreateApiReturn<TResponse, TBody> {
  const { method = "PUT", onSuccess, onError, axiosConfig } = options;

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

  const update = useCallback(
    async (
      body?: TBody,
      urlSuffix = "",
      overrideConfig?: AxiosRequestConfig,
    ): Promise<ApiResponse<TResponse>> => {
      setLoading(true);
      setError(null);

      const result = await fetchApi<TResponse>(
        `${url}${urlSuffix}`,
        method,
        body,
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
    [url, method, JSON.stringify(axiosConfig)],
  );

  return { data, error, loading, status, update, reset };
}
