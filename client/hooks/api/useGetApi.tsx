import { AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { ApiError, ApiResponse, fetchApi } from "../lib/apiClient";

// ─── Types ────────────────────────────────────────────────────────────────────

interface UseGetApiOptions<T> {
  /** Fire the request immediately on mount. Defaults to `true`. */
  immediate?: boolean;
  /** Initial data before the first successful response. */
  initialData?: T;
  /** Called after a successful fetch. */
  onSuccess?: (data: T) => void;
  /** Called after a failed fetch. */
  onError?: (error: ApiError) => void;
  /** Additional Axios config (e.g. params, signal). */
  axiosConfig?: AxiosRequestConfig;
}

interface UseGetApiReturn<T> {
  data: T | null;
  error: ApiError | null;
  loading: boolean;
  status: number | null;
  /** Manually trigger (or re-trigger) the request. */
  refetch: (overrideConfig?: AxiosRequestConfig) => Promise<ApiResponse<T>>;
  /** Reset state back to its initial values. */
  reset: () => void;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * `useGetApi` — Declarative GET request hook with auto-fetch, refetch, and abort support.
 *
 * @example
 * const { data, loading, error, refetch } = useGetApi<User[]>("/users");
 * const { data: user } = useGetApi<User>(`/users/${id}`, { immediate: !!id });
 */
export function useGetApi<T = unknown>(
  url: string,
  options: UseGetApiOptions<T> = {},
): UseGetApiReturn<T> {
  const {
    immediate = true,
    initialData,
    onSuccess,
    onError,
    axiosConfig,
  } = options;

  const [data, setData] = useState<T | null>(initialData ?? null);
  const [error, setError] = useState<ApiError | null>(null);
  const [loading, setLoading] = useState<boolean>(immediate);
  const [status, setStatus] = useState<number | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const reset = useCallback(() => {
    setData(initialData ?? null);
    setError(null);
    setLoading(false);
    setStatus(null);
  }, [initialData]);

  const execute = useCallback(
    async (overrideConfig?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      setLoading(true);
      setError(null);

      const result = await fetchApi<T>(url, "GET", undefined, {
        ...axiosConfig,
        ...overrideConfig,
        signal: controller.signal,
      });

      if (controller.signal.aborted) return result;

      setStatus(result.status);

      if (result.error) {
        setError(result.error);
        onError?.(result.error);
      } else {
        setData(result.data);
        onSuccess?.(result.data as T);
      }

      setLoading(false);
      return result;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [url, JSON.stringify(axiosConfig)],
  );

  useEffect(() => {
    if (immediate) execute();
    return () => {
      abortControllerRef.current?.abort();
    };
  }, [execute, immediate]);

  return { data, error, loading, status, refetch: execute, reset };
}
