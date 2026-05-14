import { getAuthToken, setAuthTokens } from "./session";

export type RequestInterceptorContext = {
  url: string;
  init: RequestInit;
};

export type ResponseInterceptorContext<T = unknown> = {
  response: Response;
  data: T;
};

export type ApiInterceptor<T = unknown> = (context: T) => T | Promise<T>;

export const applyRequestInterceptors = async (
  context: RequestInterceptorContext
): Promise<RequestInterceptorContext> => {
  const headers = new Headers(context.init.headers || {});

  if (!headers.has("Content-Type") && context.init.body) {
    headers.set("Content-Type", "application/json");
  }

  const token = getAuthToken();
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return {
    ...context,
    init: {
      ...context.init,
      headers,
    },
  };
};

export const applyResponseInterceptors = async <T>(
  context: ResponseInterceptorContext<T>
): Promise<ResponseInterceptorContext<T>> => {
  const { accessToken, refreshToken } = extractTokens(context.data);
  if (accessToken || refreshToken) {
    setAuthTokens(accessToken, refreshToken);
  }

  return context;
};

const extractTokens = (data: unknown): { accessToken: string | null; refreshToken: string | null } => {
  if (!data || typeof data !== "object") {
    return { accessToken: null, refreshToken: null };
  }

  const payload = data as Record<string, unknown>;
  const tokenCandidates = [payload.token, payload.accessToken, payload.jwt, payload.data];
  const refreshCandidates = [payload.refreshToken, payload.data];
  return {
    accessToken: extractTokenValue(tokenCandidates),
    refreshToken: extractRefreshToken(refreshCandidates),
  };
};

const extractTokenValue = (tokenCandidates: unknown[]): string | null => {

  for (const candidate of tokenCandidates) {
    if (typeof candidate === "string" && candidate.trim()) {
      return candidate;
    }

    if (candidate && typeof candidate === "object") {
      const nested = candidate as Record<string, unknown>;
      if (typeof nested.token === "string" && nested.token.trim()) return nested.token;
      if (typeof nested.accessToken === "string" && nested.accessToken.trim()) return nested.accessToken;
      if (typeof nested.jwt === "string" && nested.jwt.trim()) return nested.jwt;
    }
  }

  return null;
};

const extractRefreshToken = (refreshCandidates: unknown[]): string | null => {
  for (const candidate of refreshCandidates) {
    if (typeof candidate === "string" && candidate.trim()) {
      return candidate;
    }

    if (candidate && typeof candidate === "object") {
      const nested = candidate as Record<string, unknown>;
      if (typeof nested.refreshToken === "string" && nested.refreshToken.trim()) return nested.refreshToken;
    }
  }

  return null;
};
