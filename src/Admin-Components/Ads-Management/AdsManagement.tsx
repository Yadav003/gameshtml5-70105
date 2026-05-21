import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/Admin-Components/layout/AdminLayout";
import { Image as ImageIcon } from "lucide-react";
import { advertisementApi, type AdvertisementData } from "@/lib/api";

const defaultForm = {
  title: "",
  websiteUrl: "",
  imageUrl: "",
  show: false,
};

const AdsManagement = () => {
  const { toast } = useToast();
  const [form, setForm] = useState(defaultForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let isActive = true;

    const loadAdvertisement = async () => {
      try {
        const response = await advertisementApi.getAdminAdvertisement();
        if (!isActive) return;

        setForm({
          title: response?.title ?? "",
          websiteUrl: response?.websiteUrl ?? "",
          imageUrl: response?.imageUrl ?? "",
          show: response?.show ?? false,
        });
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

    loadAdvertisement();
    return () => {
      isActive = false;
    };
  }, [toast]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isSaving) return;

    const title = form.title.trim();
    const websiteUrl = form.websiteUrl.trim();
    const imageUrl = form.imageUrl.trim();

    if (form.show && (!title || !websiteUrl || !imageUrl)) {
      toast({
        title: "Missing fields",
        description: "Title, website link, and image URL are required when showing the ad.",
        variant: "destructive",
      });
      return;
    }

    const payload: AdvertisementData = {
      show: form.show,
      title,
      websiteUrl,
      imageUrl,
    };

    setIsSaving(true);
    try {
      const response = await advertisementApi.updateAdminAdvertisement(payload);
      setForm({
        title: response?.title ?? payload.title,
        websiteUrl: response?.websiteUrl ?? payload.websiteUrl,
        imageUrl: response?.imageUrl ?? payload.imageUrl,
        show: response?.show ?? payload.show,
      });
      toast({ title: "Advertisement updated" });
    } catch (error) {
      toast({
        title: "Update failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout title="Advertisement Banner" subtitle="Configure the single banner shown on the site.">
      <section className="grid gap-4 lg:grid-cols-[420px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Banner Details</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-sm text-muted-foreground">Loading advertisement settings...</p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ad-title">Title</Label>
                  <Input
                    id="ad-title"
                    value={form.title}
                    onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                    placeholder="Launch Offer"
                    disabled={isSaving}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ad-url">Website Link</Label>
                  <Input
                    id="ad-url"
                    type="url"
                    value={form.websiteUrl}
                    onChange={(event) => setForm((current) => ({ ...current, websiteUrl: event.target.value }))}
                    placeholder="https://example.com"
                    disabled={isSaving}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ad-image">Image URL</Label>
                  <div className="relative">
                    <ImageIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="ad-image"
                      type="url"
                      value={form.imageUrl}
                      onChange={(event) => setForm((current) => ({ ...current, imageUrl: event.target.value }))}
                      placeholder="https://cdn.example.com/banner.jpg"
                      className="pl-9"
                      disabled={isSaving}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <p className="text-sm font-medium">Show Advertisement</p>
                    <p className="text-xs text-muted-foreground">Toggle the banner on the public site.</p>
                  </div>
                  <Switch
                    checked={form.show}
                    onCheckedChange={(value) => setForm((current) => ({ ...current, show: value }))}
                    aria-label="Toggle advertisement visibility"
                    disabled={isSaving}
                  />
                </div>

                <Button type="submit" disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Advertisement"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Preview</CardTitle>
          </CardHeader>
          <CardContent>
            {form.show ? (
              <div className="overflow-hidden rounded-lg border border-border bg-muted/30">
                {form.imageUrl ? (
                  <img src={form.imageUrl} alt={form.title || "Advertisement"} className="h-40 w-full object-cover" />
                ) : (
                  <div className="flex h-40 w-full items-center justify-center text-sm text-muted-foreground">
                    Image preview will appear here.
                  </div>
                )}
                <div className="border-t border-border bg-background px-4 py-3">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Sponsored</p>
                  <p className="text-sm font-semibold">{form.title || "Advertisement title"}</p>
                  <p className="text-xs text-muted-foreground">{form.websiteUrl || "https://example.com"}</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">The banner is hidden and will not appear on the site.</p>
            )}
          </CardContent>
        </Card>
      </section>
    </AdminLayout>
  );
};

export default AdsManagement;
