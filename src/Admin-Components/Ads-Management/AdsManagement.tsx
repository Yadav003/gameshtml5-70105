import { useEffect, useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/Admin-Components/layout/AdminLayout";
import { Image as ImageIcon } from "lucide-react";
import { ApiError, advertisementApi, type AdvertisementData, type AdvertisementRecord } from "@/lib/api";
import { cn } from "@/lib/utils";

type AdField = "title" | "websiteUrl" | "imageUrl" | "show";

type AdFormErrors = Partial<Record<AdField, string>>;

type AdRowState = {
  localId: string;
  id?: string;
  title: string;
  websiteUrl: string;
  imageUrl: string;
  show: boolean;
  createdAt?: string;
  updatedAt?: string;
  isSaving?: boolean;
  isDeleting?: boolean;
  isNew?: boolean;
  isLegacy?: boolean;
  errors?: AdFormErrors;
};

const allowedFields = new Set<AdField>(["title", "websiteUrl", "imageUrl", "show"]);

const buildLocalId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const buildAdRow = (ad: AdvertisementRecord, index: number): AdRowState => ({
  localId: ad.id ?? `legacy-${index}-${Date.now()}`,
  id: ad.id,
  title: ad.title ?? "",
  websiteUrl: ad.websiteUrl ?? "",
  imageUrl: ad.imageUrl ?? "",
  show: ad.show ?? false,
  createdAt: ad.createdAt,
  updatedAt: ad.updatedAt,
  isLegacy: !ad.id,
  isNew: false,
  errors: {},
});

const buildEmptyAd = (): AdRowState => ({
  localId: buildLocalId("ad"),
  title: "",
  websiteUrl: "",
  imageUrl: "",
  show: false,
  isNew: true,
  errors: {},
});

const buildPayload = (ad: AdRowState): AdvertisementData => ({
  show: ad.show,
  title: ad.title.trim(),
  websiteUrl: ad.websiteUrl.trim(),
  imageUrl: ad.imageUrl.trim(),
});

const validatePayload = (payload: AdvertisementData): AdFormErrors => {
  const errors: AdFormErrors = {};

  if (payload.show) {
    if (!payload.title) errors.title = "Title is required when the ad is visible.";
    if (!payload.websiteUrl) errors.websiteUrl = "Website link is required when the ad is visible.";
    if (!payload.imageUrl) errors.imageUrl = "Image URL is required when the ad is visible.";
  }

  return errors;
};

const toErrorMessage = (value: unknown): string | undefined => {
  if (typeof value === "string" && value.trim()) return value;
  if (Array.isArray(value)) {
    const first = value.find((item) => typeof item === "string" && item.trim());
    return typeof first === "string" ? first : undefined;
  }
  return undefined;
};

const extractValidationErrors = (error: unknown): AdFormErrors => {
  if (!(error instanceof ApiError) || error.status !== 400) return {};

  const details = error.details;
  if (!details || typeof details !== "object") return {};

  const record = details as Record<string, unknown>;
  const data = record.data && typeof record.data === "object" ? (record.data as Record<string, unknown>) : record;
  const rawErrors = data.errors ?? record.errors;
  const errors: AdFormErrors = {};

  const assignError = (field: string, message?: string) => {
    if (!message || !allowedFields.has(field as AdField)) return;
    errors[field as AdField] = message;
  };

  if (Array.isArray(rawErrors)) {
    rawErrors.forEach((item) => {
      if (!item || typeof item !== "object") return;
      const entry = item as Record<string, unknown>;
      const field =
        (typeof entry.field === "string" && entry.field) ||
        (typeof entry.path === "string" && entry.path) ||
        (typeof entry.param === "string" && entry.param) ||
        "";
      const message = toErrorMessage(entry.message) ?? toErrorMessage(entry.msg) ?? toErrorMessage(entry.error);
      if (field) assignError(field, message);
    });
  } else if (rawErrors && typeof rawErrors === "object") {
    Object.entries(rawErrors as Record<string, unknown>).forEach(([field, value]) => {
      assignError(field, toErrorMessage(value));
    });
  }

  return errors;
};

const AdsManagement = () => {
  const { toast } = useToast();
  const [ads, setAds] = useState<AdRowState[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const loadAdvertisements = async () => {
      setIsLoading(true);
      try {
        const response = await advertisementApi.getAdminAdvertisements();
        if (!isActive) return;
        if (response.length) {
          setAds(response.map(buildAdRow));
          setIsLoading(false);
          return;
        }
      } catch (error) {
        if (isActive && !(error instanceof ApiError && (error.status === 404 || error.status === 405))) {
          toast({
            title: "Failed to load advertisements",
            description: error instanceof Error ? error.message : "Please try again.",
            variant: "destructive",
          });
        }
      }

      try {
        const legacy = await advertisementApi.getAdminAdvertisement();
        if (!isActive) return;
        setAds(legacy ? [buildAdRow(legacy, 0)] : []);
      } catch (error) {
        if (isActive) {
          toast({
            title: "Failed to load advertisement",
            description: error instanceof Error ? error.message : "Please try again.",
            variant: "destructive",
          });
        }
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    loadAdvertisements();
    return () => {
      isActive = false;
    };
  }, [toast]);

  const updateAd = (localId: string, updater: (current: AdRowState) => AdRowState) => {
    setAds((current) => current.map((ad) => (ad.localId === localId ? updater(ad) : ad)));
  };

  const removeAd = (localId: string) => {
    setAds((current) => current.filter((ad) => ad.localId !== localId));
  };

  const handleAddAd = () => {
    setAds((current) => [...current, buildEmptyAd()]);
  };

  const handleFieldChange = (localId: string, field: "title" | "websiteUrl" | "imageUrl") =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      updateAd(localId, (current) => ({
        ...current,
        [field]: value,
        errors: { ...current.errors, [field]: undefined },
      }));
    };

  const handleToggle = (localId: string) => (value: boolean) => {
    updateAd(localId, (current) => ({
      ...current,
      show: value,
      errors: { ...current.errors, show: undefined },
    }));
  };

  const handleSave = async (ad: AdRowState) => {
    if (ad.isSaving) return;

    const payload = buildPayload(ad);
    const validationErrors = validatePayload(payload);

    if (Object.keys(validationErrors).length > 0) {
      updateAd(ad.localId, (current) => ({ ...current, errors: validationErrors }));
      return;
    }

    updateAd(ad.localId, (current) => ({ ...current, isSaving: true, errors: {} }));

    try {
      let response: AdvertisementRecord | null = null;

      if (ad.isNew) {
        response = await advertisementApi.createAdminAdvertisement(payload);
      } else if (ad.id) {
        response = await advertisementApi.updateAdminAdvertisementById(ad.id, payload);
      } else {
        response = await advertisementApi.updateAdminAdvertisement(payload);
      }

      const updated = response ?? payload;

      updateAd(ad.localId, (current) => ({
        ...current,
        id: (updated as AdvertisementRecord).id ?? current.id,
        title: updated.title ?? payload.title ?? "",
        websiteUrl: updated.websiteUrl ?? payload.websiteUrl ?? "",
        imageUrl: updated.imageUrl ?? payload.imageUrl ?? "",
        show: updated.show ?? payload.show,
        createdAt: (updated as AdvertisementRecord).createdAt ?? current.createdAt,
        updatedAt: (updated as AdvertisementRecord).updatedAt ?? current.updatedAt,
        isSaving: false,
        isNew: false,
        isLegacy: !(updated as AdvertisementRecord).id,
        errors: {},
      }));

      toast({ title: ad.isNew ? "Advertisement created" : "Advertisement updated" });
    } catch (error) {
      const fieldErrors = extractValidationErrors(error);
      updateAd(ad.localId, (current) => ({
        ...current,
        isSaving: false,
        errors: Object.keys(fieldErrors).length ? fieldErrors : current.errors,
      }));

      const description = Object.keys(fieldErrors).length
        ? "Please fix the highlighted fields."
        : error instanceof Error
          ? error.message
          : "Please try again.";

      toast({
        title: "Save failed",
        description,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (ad: AdRowState) => {
    if (ad.isDeleting) return;

    if (ad.isNew && !ad.id) {
      removeAd(ad.localId);
      return;
    }

    if (!ad.id) {
      toast({
        title: "Delete unavailable",
        description: "Legacy advertisements can be hidden by toggling them off.",
        variant: "destructive",
      });
      return;
    }

    updateAd(ad.localId, (current) => ({ ...current, isDeleting: true }));

    try {
      await advertisementApi.deleteAdminAdvertisement(ad.id);
      removeAd(ad.localId);
      toast({ title: "Advertisement deleted" });
    } catch (error) {
      updateAd(ad.localId, (current) => ({ ...current, isDeleting: false }));
      toast({
        title: "Delete failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout title="Advertisement Banners" subtitle="Manage multiple ads shown on the site.">
      <section className="space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            The first ad in this list maps to the legacy banner when needed.
          </p>
          <Button onClick={handleAddAd} disabled={isLoading}>
            Add more ads
          </Button>
        </div>

        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading advertisement settings...</p>
        ) : ads.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">No advertisements yet</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Add your first advertisement to get started.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {ads.map((ad, index) => {
              const baseId = `ad-${ad.localId}`;
              const canDelete = !!ad.id || ad.isNew;

              return (
                <Card key={ad.localId}>
                  <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <CardTitle className="text-lg">Advertisement {index + 1}</CardTitle>
                      <p className="text-xs text-muted-foreground">
                        {ad.id ? `ID: ${ad.id}` : "Legacy advertisement"}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button onClick={() => handleSave(ad)} disabled={ad.isSaving}>
                        {ad.isSaving ? "Saving..." : ad.isNew ? "Create Advertisement" : "Save Changes"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleDelete(ad)}
                        disabled={ad.isDeleting || !canDelete}
                      >
                        {ad.isDeleting ? "Deleting..." : "Delete"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 lg:grid-cols-[420px_1fr]">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor={`${baseId}-title`}>Title</Label>
                          <Input
                            id={`${baseId}-title`}
                            value={ad.title}
                            onChange={handleFieldChange(ad.localId, "title")}
                            placeholder="Launch Offer"
                            aria-invalid={!!ad.errors?.title}
                            aria-describedby={ad.errors?.title ? `${baseId}-title-error` : undefined}
                            className={cn(ad.errors?.title && "border-destructive focus-visible:ring-destructive")}
                            disabled={ad.isSaving}
                          />
                          {ad.errors?.title ? (
                            <p id={`${baseId}-title-error`} className="text-sm text-destructive">
                              {ad.errors.title}
                            </p>
                          ) : null}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`${baseId}-url`}>Website Link</Label>
                          <Input
                            id={`${baseId}-url`}
                            type="url"
                            value={ad.websiteUrl}
                            onChange={handleFieldChange(ad.localId, "websiteUrl")}
                            placeholder="https://example.com"
                            aria-invalid={!!ad.errors?.websiteUrl}
                            aria-describedby={ad.errors?.websiteUrl ? `${baseId}-url-error` : undefined}
                            className={cn(ad.errors?.websiteUrl && "border-destructive focus-visible:ring-destructive")}
                            disabled={ad.isSaving}
                          />
                          {ad.errors?.websiteUrl ? (
                            <p id={`${baseId}-url-error`} className="text-sm text-destructive">
                              {ad.errors.websiteUrl}
                            </p>
                          ) : null}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`${baseId}-image`}>Image URL</Label>
                          <div className="relative">
                            <ImageIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id={`${baseId}-image`}
                              type="url"
                              value={ad.imageUrl}
                              onChange={handleFieldChange(ad.localId, "imageUrl")}
                              placeholder="https://cdn.example.com/banner.jpg"
                              className={cn(
                                "pl-9",
                                ad.errors?.imageUrl && "border-destructive focus-visible:ring-destructive"
                              )}
                              aria-invalid={!!ad.errors?.imageUrl}
                              aria-describedby={ad.errors?.imageUrl ? `${baseId}-image-error` : undefined}
                              disabled={ad.isSaving}
                            />
                          </div>
                          {ad.errors?.imageUrl ? (
                            <p id={`${baseId}-image-error`} className="text-sm text-destructive">
                              {ad.errors.imageUrl}
                            </p>
                          ) : null}
                        </div>

                        <div className="flex items-center justify-between rounded-lg border border-border p-3">
                          <div>
                            <p className="text-sm font-medium">Show Advertisement</p>
                            <p className="text-xs text-muted-foreground">Toggle the banner on the public site.</p>
                          </div>
                          <Switch
                            checked={ad.show}
                            onCheckedChange={handleToggle(ad.localId)}
                            aria-label="Toggle advertisement visibility"
                            disabled={ad.isSaving}
                          />
                        </div>
                        {ad.errors?.show ? (
                          <p className="text-sm text-destructive">{ad.errors.show}</p>
                        ) : null}
                      </div>

                      <div>
                        {ad.show ? (
                          <div className="overflow-hidden rounded-lg border border-border bg-muted/30">
                            {ad.imageUrl ? (
                              <img src={ad.imageUrl} alt={ad.title || "Advertisement"} className="h-40 w-full object-cover" />
                            ) : (
                              <div className="flex h-40 w-full items-center justify-center text-sm text-muted-foreground">
                                Image preview will appear here.
                              </div>
                            )}
                            <div className="border-t border-border bg-background px-4 py-3">
                              <p className="text-xs uppercase tracking-widest text-muted-foreground">Sponsored</p>
                              <p className="text-sm font-semibold">{ad.title || "Advertisement title"}</p>
                              <p className="text-xs text-muted-foreground">
                                {ad.websiteUrl || "https://example.com"}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            {/* The banner is hidden and will not appear on the site. */}
                          </p>
                        )}
                      </div>
                    </div>

                    {!ad.id && !ad.isNew ? (
                      <p className="mt-3 text-xs text-muted-foreground">
                        This ad was loaded from the legacy endpoint. Delete is unavailable; use the toggle to hide it.
                      </p>
                    ) : null}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </AdminLayout>
  );
};

export default AdsManagement;
