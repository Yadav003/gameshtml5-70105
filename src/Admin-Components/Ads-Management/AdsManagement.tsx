import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/Admin-Components/layout/AdminLayout";
import { Eye, EyeOff, Image as ImageIcon, Link2, Pencil, Plus, Trash2 } from "lucide-react";

type AdItem = {
  id: string;
  title: string;
  url: string;
  imageUrl: string;
  isVisible: boolean;
  updatedAt: string;
};

const createId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const isValidHttpUrl = (value: string) => {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};

const isValidImageUrl = (value: string) => value.startsWith("data:image/") || isValidHttpUrl(value);

const seedAds: AdItem[] = [
  {
    id: createId(),
    title: "PlayVerse Plus",
    url: "https://playverse.example/plus",
    imageUrl: "https://placehold.co/600x360/png?text=PlayVerse+Ad",
    isVisible: true,
    updatedAt: new Date().toISOString(),
  },
];

const defaultForm = {
  title: "",
  url: "",
  imageUrl: "",
  isVisible: true,
};

const AdsManagement = () => {
  const { toast } = useToast();
  const [ads, setAds] = useState<AdItem[]>(seedAds);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(defaultForm);
  const [imageInputKey, setImageInputKey] = useState(0);

  const visibleCount = useMemo(() => ads.filter((ad) => ad.isVisible).length, [ads]);
  const hiddenCount = ads.length - visibleCount;

  const resetForm = () => {
    setForm(defaultForm);
    setEditingId(null);
    setImageInputKey((value) => value + 1);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      if (result) {
        setForm((current) => ({ ...current, imageUrl: result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const startEdit = (ad: AdItem) => {
    setEditingId(ad.id);
    setForm({
      title: ad.title,
      url: ad.url,
      imageUrl: ad.imageUrl,
      isVisible: ad.isVisible,
    });
    setImageInputKey((value) => value + 1);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const title = form.title.trim();
    const url = form.url.trim();
    const imageUrl = form.imageUrl.trim();

    if (title.length < 3 || title.length > 60) {
      toast({
        title: "Invalid title",
        description: "Title must be between 3 and 60 characters.",
        variant: "destructive",
      });
      return;
    }

    if (!isValidHttpUrl(url)) {
      toast({
        title: "Invalid link",
        description: "Provide a valid website link (http or https).",
        variant: "destructive",
      });
      return;
    }

    if (!imageUrl || !isValidImageUrl(imageUrl)) {
      toast({
        title: "Invalid image",
        description: "Add a valid image URL or upload an image file.",
        variant: "destructive",
      });
      return;
    }

    if (editingId) {
      setAds((current) =>
        current.map((ad) =>
          ad.id === editingId
            ? { ...ad, title, url, imageUrl, isVisible: form.isVisible, updatedAt: new Date().toISOString() }
            : ad
        )
      );
      toast({ title: "Ad updated" });
    } else {
      setAds((current) => [
        {
          id: createId(),
          title,
          url,
          imageUrl,
          isVisible: form.isVisible,
          updatedAt: new Date().toISOString(),
        },
        ...current,
      ]);
      toast({ title: "Ad created" });
    }

    resetForm();
  };

  const toggleVisibility = (id: string) => {
    setAds((current) => current.map((ad) => (ad.id === id ? { ...ad, isVisible: !ad.isVisible } : ad)));
  };

  const deleteAd = (id: string) => {
    setAds((current) => current.filter((ad) => ad.id !== id));
    if (editingId === id) resetForm();
    toast({ title: "Ad removed" });
  };

  return (
    <AdminLayout title="Ads Management" subtitle="Create, show, and hide custom ads across the site.">
      <section className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Ads</p>
            <p className="mt-1 text-2xl font-bold">{ads.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Visible</p>
            <p className="mt-1 text-2xl font-bold text-emerald-600">{visibleCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Hidden</p>
            <p className="mt-1 text-2xl font-bold text-rose-600">{hiddenCount}</p>
          </CardContent>
        </Card>
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[420px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{editingId ? "Edit Ad" : "Add New Ad"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ad-title">Title</Label>
                <Input
                  id="ad-title"
                  value={form.title}
                  onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                  placeholder="Ad title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ad-url">Website Link</Label>
                <div className="relative">
                  <Link2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="ad-url"
                    type="url"
                    value={form.url}
                    onChange={(event) => setForm((current) => ({ ...current, url: event.target.value }))}
                    placeholder="https://example.com"
                    className="pl-9"
                    required
                  />
                </div>
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
                    placeholder="https://example.com/banner.png"
                    className="pl-9"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ad-file">Or upload image</Label>
                  <Input key={imageInputKey} id="ad-file" type="file" accept="image/*" onChange={handleFileChange} />
                </div>
                {form.imageUrl ? (
                  <div className="overflow-hidden rounded-lg border border-border bg-muted/30">
                    <img src={form.imageUrl} alt="Ad preview" className="h-40 w-full object-cover" />
                  </div>
                ) : null}
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium">Visibility</p>
                  <p className="text-xs text-muted-foreground">Show or hide this ad on the website.</p>
                </div>
                <Switch
                  checked={form.isVisible}
                  onCheckedChange={(value) => setForm((current) => ({ ...current, isVisible: value }))}
                  aria-label="Toggle ad visibility"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <Button type="submit" className="gap-2">
                  <Plus className="h-4 w-4" />
                  {editingId ? "Save Changes" : "Add Ad"}
                </Button>
                {editingId ? (
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                ) : null}
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Existing Ads</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {ads.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                No ads yet. Add your first custom ad to get started.
              </div>
            ) : (
              ads.map((ad) => (
                <div key={ad.id} className="flex flex-col gap-3 rounded-lg border border-border p-4 md:flex-row md:items-center">
                  <div className="h-20 w-full overflow-hidden rounded-md border border-border bg-muted/30 md:h-24 md:w-40">
                    {ad.imageUrl ? (
                      <img src={ad.imageUrl} alt={ad.title} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Title</p>
                        <p className="text-base font-semibold">{ad.title}</p>
                      </div>
                      <Badge className={ad.isVisible ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}>
                        {ad.isVisible ? "Visible" : "Hidden"}
                      </Badge>
                    </div>
                    <a
                      href={ad.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <Link2 className="h-4 w-4" />
                      {ad.url}
                    </a>
                    <p className="mt-2 text-xs text-muted-foreground">Updated {new Date(ad.updatedAt).toLocaleString()}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => toggleVisibility(ad.id)} className="gap-2">
                      {ad.isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      {ad.isVisible ? "Hide" : "Show"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => startEdit(ad)} className="gap-2">
                      <Pencil className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => deleteAd(ad.id)} className="gap-2">
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </section>
    </AdminLayout>
  );
};

export default AdsManagement;
