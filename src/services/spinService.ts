import { apiConfig } from "@/lib/api/config";
import { request } from "@/lib/api/httpClient";
import type { SpinHistoryResponse, SpinResponse, SpinStatusResponse } from "@/types/spin";

const spinPath = (path = "") => `${apiConfig.spinApiBasePath}${path}`;

const SPIN_ENDPOINTS = {
  status: spinPath("/status"),
  spin: spinPath(),
  history: spinPath("/history"),
} as const;

export const spinService = {
  getSpinStatus: () =>
    request<SpinStatusResponse>(
      SPIN_ENDPOINTS.status,
      { method: "GET" },
      apiConfig.requestTimeoutMs,
      apiConfig.spinServiceBaseUrl
    ),
  spinWheel: () =>
    request<SpinResponse>(
      SPIN_ENDPOINTS.spin,
      { method: "POST" },
      apiConfig.requestTimeoutMs,
      apiConfig.spinServiceBaseUrl
    ),
  getSpinHistory: () =>
    request<SpinHistoryResponse>(
      SPIN_ENDPOINTS.history,
      { method: "GET" },
      apiConfig.requestTimeoutMs,
      apiConfig.spinServiceBaseUrl
    ),
};
