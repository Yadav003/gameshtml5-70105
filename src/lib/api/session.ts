const ACCESS_TOKEN_KEY = "playarena_access_token";
const REFRESH_TOKEN_KEY = "playarena_refresh_token";

export const getAuthToken = (): string | null => {
  try {
    return sessionStorage.getItem(ACCESS_TOKEN_KEY) ?? localStorage.getItem(ACCESS_TOKEN_KEY);
  } catch {
    return null;
  }
};

export const setAuthToken = (token: string): void => {
  try {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
  } catch {
    // Ignore storage failures in restricted environments.
  }
};

export const getRefreshToken = (): string | null => {
  try {
    return sessionStorage.getItem(REFRESH_TOKEN_KEY) ?? localStorage.getItem(REFRESH_TOKEN_KEY);
  } catch {
    return null;
  }
};

export const setRefreshToken = (token: string): void => {
  try {
    sessionStorage.setItem(REFRESH_TOKEN_KEY, token);
  } catch {
    // Ignore storage failures in restricted environments.
  }
};

export const setAuthTokens = (accessToken?: string | null, refreshToken?: string | null): void => {
  if (accessToken) setAuthToken(accessToken);
  if (refreshToken) setRefreshToken(refreshToken);
};

export const clearAuthToken = (): void => {
  try {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  } catch {
    // Ignore storage failures in restricted environments.
  }
};
