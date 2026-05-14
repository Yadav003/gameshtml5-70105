const parseNumber = (value: string | undefined, fallback: number) => {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

export const apiConfig = {
  authServiceBaseUrl:
    (import.meta.env.VITE_AUTH_SERVICE_BASE_URL as string | undefined)?.replace(/\/$/, "") ??
    "https://auth-service-4ttc.onrender.com",
  requestTimeoutMs: parseNumber(import.meta.env.VITE_AUTH_SERVICE_TIMEOUT as string | undefined, 15000),
};
