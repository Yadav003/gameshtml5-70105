import { apiConfig } from "@/lib/api/config";
import { request } from "@/lib/api/httpClient";
import type { ProfileResponse, RewardsResponse, UpdateProfilePayload } from "@/types/profile";

const PROFILE_ENDPOINTS = {
  profile: "/api/profile",
  rewards: "/api/profile/rewards",
} as const;

export const profileService = {
  getProfile: () =>
    request<ProfileResponse>(
      PROFILE_ENDPOINTS.profile,
      { method: "GET" },
      apiConfig.requestTimeoutMs,
      apiConfig.authServiceBaseUrl
    ),
  updateProfile: (payload: UpdateProfilePayload) =>
    request<ProfileResponse>(
      PROFILE_ENDPOINTS.profile,
      {
        method: "PUT",
        body: JSON.stringify(payload),
      },
      apiConfig.requestTimeoutMs,
      apiConfig.authServiceBaseUrl
    ),
  getRewards: () =>
    request<RewardsResponse>(
      PROFILE_ENDPOINTS.rewards,
      { method: "GET" },
      apiConfig.requestTimeoutMs,
      apiConfig.authServiceBaseUrl
    ),
};
