import { FormEvent, useEffect, useState } from "react";
import { Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Profile, UpdateProfilePayload } from "@/types/profile";

type EditProfileModalProps = {
  open: boolean;
  profile: Profile | null;
  loading: boolean;
  error?: string | null;
  onClose: () => void;
  onSubmit: (payload: UpdateProfilePayload) => Promise<void>;
};

const EditProfileModal = ({ open, profile, loading, error, onClose, onSubmit }: EditProfileModalProps) => {
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!open || !profile) return;
    setUsername(profile.username ?? "");
    setProfileImage(profile.profileImage ?? "");
    setMobileNumber(profile.mobileNumber ?? "");
    setAddress(profile.address ?? "");
  }, [open, profile]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !loading) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [loading, onClose, open]);

  if (!open || !profile) return null;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit({
      username: username.trim(),
      profileImage: profileImage.trim(),
      mobileNumber: mobileNumber.trim(),
      address: address.trim() || undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4" role="dialog" aria-modal="true">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg border border-border bg-card p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-card-foreground">Edit Profile</h2>
            <p className="mt-1 text-sm text-muted-foreground">Update your profile details.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-md p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Close edit profile"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="profile-username">Username</Label>
            <Input
              id="profile-username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              disabled={loading}
              required
              maxLength={80}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile-mobile">Mobile Number</Label>
            <Input
              id="profile-mobile"
              type="tel"
              value={mobileNumber}
              onChange={(event) => setMobileNumber(event.target.value)}
              disabled={loading}
              required
                maxLength={15}
                pattern="[0-9()+. -]+"
                placeholder="+91 98765 43210"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile-image">Profile Image URL (optional)</Label>
            <Input
              id="profile-image"
              type="url"
              value={profileImage}
              onChange={(event) => setProfileImage(event.target.value)}
              disabled={loading}
              placeholder="https://example.com/avatar.jpg"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="profile-address">Address (optional)</Label>
            <Textarea
              id="profile-address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              disabled={loading}
              maxLength={300}
              placeholder="City, state, or full address"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="profile-email">Email</Label>
            <Input id="profile-email" value={profile.email} disabled readOnly />
          </div>
          </div>

          {error ? <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p> : null}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !username.trim() || !mobileNumber.trim() }>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
