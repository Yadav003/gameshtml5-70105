import { apiConfig } from "./config";
import { ADMIN_SERVICE_ENDPOINTS, PUBLIC_SERVICE_ENDPOINTS } from "./endpoints";
import { request } from "./httpClient";

export type AdvertisementData = {
  show: boolean;
  title?: string;
  websiteUrl?: string;
  imageUrl?: string;
  id?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type AdvertisementFormPayload = {
  show?: boolean;
  title?: string;
  websiteUrl?: string;
  image?: File | null;
};

export type AdvertisementRecord = AdvertisementData & {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
};

type AdvertisementResponse = {
  status?: string;
  data?: AdvertisementData;
};

type AdvertisementsResponse = {
  status?: string;
  data?: {
    ads?: AdvertisementRecord[];
  };
};

const publicRequest = <T>(path: string, init?: RequestInit) =>
  request<T>(path, init, apiConfig.requestTimeoutMs, apiConfig.authServiceBaseUrl);

const adminRequest = <T>(path: string, init?: RequestInit) =>
  request<T>(path, init, apiConfig.requestTimeoutMs, apiConfig.adminServiceBaseUrl);

const buildAdvertisementFormData = (payload: AdvertisementFormPayload): FormData => {
  const formData = new FormData();

  if (payload.title !== undefined) formData.append("title", payload.title);
  if (payload.websiteUrl !== undefined) formData.append("websiteUrl", payload.websiteUrl);
  if (payload.show !== undefined) formData.append("show", String(payload.show));
  if (payload.image instanceof File) formData.append("image", payload.image);

  return formData;
};

const normalizeAdvertisement = (payload: unknown): AdvertisementData | null => {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return null;

  const record = payload as Record<string, unknown>;
  const recordData = record.data;
  const data =
    recordData && typeof recordData === "object" && !Array.isArray(recordData)
      ? (recordData as Record<string, unknown>)
      : record;
  if (!data || typeof data !== "object" || Array.isArray(data)) return null;

  return {
    show: data.show === true,
    title: typeof data.title === "string" ? data.title : undefined,
    websiteUrl: typeof data.websiteUrl === "string" ? data.websiteUrl : undefined,
    imageUrl: typeof data.imageUrl === "string" ? data.imageUrl : undefined,
    id: typeof data.id === "string" ? data.id : undefined,
    createdAt: typeof data.createdAt === "string" ? data.createdAt : undefined,
    updatedAt: typeof data.updatedAt === "string" ? data.updatedAt : undefined,
  };
};

const normalizeAdvertisementWithFallback = (
  payload: unknown,
  fallbackShow?: boolean
): AdvertisementData | null => {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return null;

  const record = payload as Record<string, unknown>;
  const hasShow = typeof record.show === "boolean";
  const normalized = normalizeAdvertisement(payload);

  if (!normalized) return null;
  if (!hasShow && typeof fallbackShow === "boolean") {
    return { ...normalized, show: fallbackShow };
  }

  return normalized;
};

const normalizeAdvertisementRecord = (payload: unknown): AdvertisementRecord | null => {
  return normalizeAdvertisement(payload);
};

const normalizeAdvertisementList = (payload: unknown): AdvertisementData[] => {
  if (!payload) return [];

  if (Array.isArray(payload)) {
    return payload
      .map((item) => normalizeAdvertisement(item))
      .filter((item): item is AdvertisementData => !!item);
  }

  if (typeof payload === "object") {
    const record = payload as Record<string, unknown>;
    const data = record.data && typeof record.data === "object" ? (record.data as Record<string, unknown>) : null;
    const dataAds = data?.ads;
    const fallbackShow = typeof data?.show === "boolean" ? data.show : undefined;
    const listCandidate = Array.isArray(dataAds)
      ? dataAds
      : record.ads ?? record.items ?? record.results ?? record.records ?? record;

    if (Array.isArray(listCandidate)) {
      return listCandidate
        .map((item) => normalizeAdvertisementWithFallback(item, fallbackShow))
        .filter((item): item is AdvertisementData => !!item);
    }

    const single = normalizeAdvertisement(listCandidate);
    return single ? [single] : [];
  }

  return [];
};

const normalizeAdminAdvertisementList = (payload: unknown): AdvertisementRecord[] => {
  if (!payload || typeof payload !== "object") return [];

  const record = payload as Record<string, unknown>;
  const data = record.data && typeof record.data === "object" ? (record.data as Record<string, unknown>) : record;
  const list = data.ads;

  if (!Array.isArray(list)) return [];

  return list
    .map((item) => normalizeAdvertisementRecord(item))
    .filter((item): item is AdvertisementRecord => !!item);
};

const getPublicAdvertisements = async (): Promise<AdvertisementData[]> => {
  const response = await publicRequest<unknown>(PUBLIC_SERVICE_ENDPOINTS.advertisement);
  return normalizeAdvertisementList(response);
};

const getPublicAdvertisement = async (): Promise<AdvertisementData | null> => {
  const ads = await getPublicAdvertisements();
  return ads[0] ?? null;
};

const getAdminAdvertisement = async (): Promise<AdvertisementData | null> => {
  const response = await adminRequest<AdvertisementResponse>(ADMIN_SERVICE_ENDPOINTS.advertisement);
  return normalizeAdvertisement(response);
};

const updateAdminAdvertisement = async (
  payload: AdvertisementFormPayload
): Promise<AdvertisementData | null> => {
  const response = await adminRequest<AdvertisementResponse>(ADMIN_SERVICE_ENDPOINTS.advertisement, {
    method: "PATCH",
    body: buildAdvertisementFormData(payload),
  });
  return normalizeAdvertisement(response);
};

const getAdminAdvertisements = async (): Promise<AdvertisementRecord[]> => {
  const response = await adminRequest<AdvertisementsResponse>(ADMIN_SERVICE_ENDPOINTS.advertisements);
  return normalizeAdminAdvertisementList(response);
};

const createAdminAdvertisement = async (
  payload: AdvertisementFormPayload
): Promise<AdvertisementRecord | null> => {
  const response = await adminRequest<AdvertisementResponse>(ADMIN_SERVICE_ENDPOINTS.advertisements, {
    method: "POST",
    body: buildAdvertisementFormData(payload),
  });
  return normalizeAdvertisementRecord(response);
};

const updateAdminAdvertisementById = async (
  advertisementId: string,
  payload: AdvertisementFormPayload
): Promise<AdvertisementRecord | null> => {
  const response = await adminRequest<AdvertisementResponse>(
    `${ADMIN_SERVICE_ENDPOINTS.advertisements}/${advertisementId}`,
    {
      method: "PATCH",
      body: buildAdvertisementFormData(payload),
    }
  );
  return normalizeAdvertisementRecord(response);
};

const deleteAdminAdvertisement = async (advertisementId: string): Promise<void> => {
  await adminRequest<AdvertisementResponse>(`${ADMIN_SERVICE_ENDPOINTS.advertisements}/${advertisementId}`,
    {
      method: "DELETE",
    }
  );
};

export const advertisementApi = {
  getPublicAdvertisements,
  getPublicAdvertisement,
  getAdminAdvertisement,
  updateAdminAdvertisement,
  getAdminAdvertisements,
  createAdminAdvertisement,
  updateAdminAdvertisementById,
  deleteAdminAdvertisement,
};
