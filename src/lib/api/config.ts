const parseNumber = (value: string | undefined, fallback: number) => {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

export const apiConfig = {
  authServiceBaseUrl:
    (import.meta.env.VITE_AUTH_SERVICE_BASE_URL as string | undefined)?.replace(/\/$/, "") ??
    "https://auth.playarena.co.in",
  adminServiceBaseUrl:
    (import.meta.env.VITE_ADMIN_SERVICE_BASE_URL as string | undefined)?.replace(/\/$/, "") ??
    ((import.meta.env.VITE_AUTH_SERVICE_BASE_URL as string | undefined)?.replace(/\/$/, "") ??
      "https://auth.playarena.co.in"),
  spinServiceBaseUrl:
    (import.meta.env.VITE_SPIN_SERVICE_BASE_URL as string | undefined)?.replace(/\/$/, "") ??
    ((import.meta.env.VITE_AUTH_SERVICE_BASE_URL as string | undefined)?.replace(/\/$/, "") ??
      "https://auth.playarena.co.in"),
  spinApiBasePath: (import.meta.env.VITE_SPIN_API_BASE_PATH as string | undefined)?.replace(/\/$/, "") ?? "/api/spin",
  requestTimeoutMs: parseNumber(import.meta.env.VITE_AUTH_SERVICE_TIMEOUT as string | undefined, 15000),
};
