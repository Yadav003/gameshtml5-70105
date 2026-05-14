import { applyRequestInterceptors, applyResponseInterceptors } from "./interceptors";
import { apiConfig } from "./config";
import { AUTH_SERVICE_ENDPOINTS } from "./endpoints";
import { clearAuthToken, getRefreshToken, setAuthTokens } from "./session";

export class ApiError extends Error {
  status: number;
  details: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

const buildUrl = (path: string) => {
  const baseUrl = apiConfig.authServiceBaseUrl;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
};

const safeParseJson = async (response: Response) => {
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return null;
  }

  try {
    return await response.json();
  } catch {
    return null;
  }
};

const refreshSkippablePaths = new Set<string>([
  AUTH_SERVICE_ENDPOINTS.login,
  AUTH_SERVICE_ENDPOINTS.register,
  AUTH_SERVICE_ENDPOINTS.refreshToken,
  AUTH_SERVICE_ENDPOINTS.forgotPassword,
  AUTH_SERVICE_ENDPOINTS.resetPassword,
  AUTH_SERVICE_ENDPOINTS.logout,
  AUTH_SERVICE_ENDPOINTS.status,
]);

let refreshInFlight: Promise<string | null> | null = null;

const extractTokens = (data: Record<string, unknown> | null): { accessToken: string | null; refreshToken: string | null } => {
  if (!data) return { accessToken: null, refreshToken: null };

  const payload = data.data && typeof data.data === "object" ? (data.data as Record<string, unknown>) : data;
  const accessToken =
    (typeof payload.accessToken === "string" && payload.accessToken) ||
    (typeof payload.token === "string" && payload.token) ||
    null;
  const refreshToken = typeof payload.refreshToken === "string" ? payload.refreshToken : null;

  return { accessToken, refreshToken };
};

const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  if (!refreshInFlight) {
    refreshInFlight = (async () => {
      const response = await fetch(buildUrl(AUTH_SERVICE_ENDPOINTS.refreshToken), {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      const data = (await safeParseJson(response)) as Record<string, unknown> | null;
      if (!response.ok) {
        clearAuthToken();
        return null;
      }

      const tokens = extractTokens(data);
      if (tokens.accessToken || tokens.refreshToken) {
        setAuthTokens(tokens.accessToken, tokens.refreshToken);
      }

      return tokens.accessToken ?? null;
    })().finally(() => {
      refreshInFlight = null;
    });
  }

  return refreshInFlight;
};

export const request = async <T>(
  path: string,
  init: RequestInit = {},
  timeoutMs: number = apiConfig.requestTimeoutMs
): Promise<T> => {
  const requestContext = await applyRequestInterceptors({
    url: buildUrl(path),
    init: {
      credentials: "include",
      ...init,
    },
  });

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(requestContext.url, {
      ...requestContext.init,
      signal: controller.signal,
    });

    const data = await safeParseJson(response);

    if (response.status === 401 && !refreshSkippablePaths.has(path)) {
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        const retryHeaders = new Headers(requestContext.init.headers || {});
        retryHeaders.set("Authorization", `Bearer ${newAccessToken}`);

        const retryResponse = await fetch(requestContext.url, {
          ...requestContext.init,
          headers: retryHeaders,
          signal: controller.signal,
        });

        const retryData = await safeParseJson(retryResponse);
        if (!retryResponse.ok) {
          const retryMessage =
            (retryData && typeof retryData === "object" && "message" in retryData && typeof (retryData as { message?: unknown }).message === "string"
              ? (retryData as { message: string }).message
              : retryResponse.statusText) || "Request failed";

          throw new ApiError(retryMessage, retryResponse.status, retryData);
        }

        const retryContext = await applyResponseInterceptors({
          response: retryResponse,
          data: (retryData ?? null) as T,
        });

        return retryContext.data;
      }
    }

    if (!response.ok) {
      const message =
        (data && typeof data === "object" && "message" in data && typeof (data as { message?: unknown }).message === "string"
          ? (data as { message: string }).message
          : response.statusText) || "Request failed";

      throw new ApiError(message, response.status, data);
    }

    const responseContext = await applyResponseInterceptors({
      response,
      data: (data ?? null) as T,
    });

    return responseContext.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiError("Request timed out", 408);
    }

    throw new ApiError(error instanceof Error ? error.message : "Network error", 0, error);
  } finally {
    window.clearTimeout(timeoutId);
  }
};

export const apiClient = {
  get: <T>(path: string, init?: RequestInit) => request<T>(path, { ...init, method: "GET" }),
  post: <T>(path: string, body?: unknown, init?: RequestInit) =>
    request<T>(path, {
      ...init,
      method: "POST",
      body: body === undefined ? undefined : JSON.stringify(body),
    }),
  put: <T>(path: string, body?: unknown, init?: RequestInit) =>
    request<T>(path, {
      ...init,
      method: "PUT",
      body: body === undefined ? undefined : JSON.stringify(body),
    }),
  patch: <T>(path: string, body?: unknown, init?: RequestInit) =>
    request<T>(path, {
      ...init,
      method: "PATCH",
      body: body === undefined ? undefined : JSON.stringify(body),
    }),
  delete: <T>(path: string, init?: RequestInit) => request<T>(path, { ...init, method: "DELETE" }),
};
