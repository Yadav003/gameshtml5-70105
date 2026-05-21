import { apiConfig } from "./config";
import { ADMIN_SERVICE_ENDPOINTS, PUBLIC_SERVICE_ENDPOINTS } from "./endpoints";
import { request } from "./httpClient";

export type AdvertisementData = {
  show: boolean;
  title?: string;
  websiteUrl?: string;
  imageUrl?: string;
};

type AdvertisementResponse = {
  status?: string;
  data?: AdvertisementData;
};

const publicRequest = <T>(path: string, init?: RequestInit) =>
  request<T>(path, init, apiConfig.requestTimeoutMs, apiConfig.authServiceBaseUrl);

const adminRequest = <T>(path: string, init?: RequestInit) =>
  request<T>(path, init, apiConfig.requestTimeoutMs, apiConfig.adminServiceBaseUrl);

const normalizeAdvertisement = (payload: unknown): AdvertisementData | null => {
  if (!payload || typeof payload !== "object") return null;

  const record = payload as Record<string, unknown>;
  const data = (record.data ?? record) as Record<string, unknown> | null;
  if (!data || typeof data !== "object") return null;

  return {
    show: data.show === true,
    title: typeof data.title === "string" ? data.title : undefined,
    websiteUrl: typeof data.websiteUrl === "string" ? data.websiteUrl : undefined,
    imageUrl: typeof data.imageUrl === "string" ? data.imageUrl : undefined,
  };
};

export const advertisementApi = {
  getPublicAdvertisement: async (): Promise<AdvertisementData | null> => {
    const response = await publicRequest<AdvertisementResponse>(PUBLIC_SERVICE_ENDPOINTS.advertisement);
    return normalizeAdvertisement(response);
  },
  getAdminAdvertisement: async (): Promise<AdvertisementData | null> => {
    const response = await adminRequest<AdvertisementResponse>(ADMIN_SERVICE_ENDPOINTS.advertisement);
    return normalizeAdvertisement(response);
  },
  updateAdminAdvertisement: async (payload: AdvertisementData): Promise<AdvertisementData | null> => {
    const response = await adminRequest<AdvertisementResponse>(ADMIN_SERVICE_ENDPOINTS.advertisement, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    return normalizeAdvertisement(response);
  },
};
