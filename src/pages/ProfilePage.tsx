import { useCallback, useEffect, useMemo, useState } from "react";
import { Calendar, Gift, Loader2, Lock, Mail, MapPin, Pencil, Phone, Star, Target, User, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EditProfileModal from "@/components/EditProfileModal";
import { Footer } from "@/components/Footer";
import LoginRequiredModal from "@/components/LoginRequiredModal";
import { MobileFooterNav } from "@/components/MobileFooterNav";
import { Navigation } from "@/components/Navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ApiError } from "@/lib/api/httpClient";
import { useAuth } from "@/lib/auth";
import { profileService } from "@/services/profileService";
import type { Profile, ProfileRewards, UpdateProfilePayload } from "@/types/profile";

const formatDate = (value: string | null | undefined) => {
  if (!value) return "Not available";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat(undefined, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};

const getInitial = (username?: string) => {
  const trimmed = username?.trim();
  return trimmed ? trimmed.charAt(0).toUpperCase() : "P";
};

const ProfilePage = () => {
  const { user, isInitialized } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [rewards, setRewards] = useState<ProfileRewards | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const openLoginModal = useCallback(() => {
    setLoginModalOpen(true);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    if (!user) {
      openLoginModal();
      return;
    }

    let isActive = true;

    const loadProfile = async () => {
      setLoading(true);
      try {
        const [profileResponse, rewardsResponse] = await Promise.all([
          profileService.getProfile(),
          profileService.getRewards(),
        ]);

        if (!isActive) return;

        if (!profileResponse.success || !profileResponse.profile) {
          throw new Error(profileResponse.message || "Unable to load profile.");
        }

        if (!rewardsResponse.success || !rewardsResponse.data) {
          throw new Error(rewardsResponse.message || "Unable to load rewards.");
        }

        setProfile(profileResponse.profile);
        setRewards(rewardsResponse.data);
        setLoginModalOpen(false);
      } catch (error) {
        if (!isActive) return;

        if (error instanceof ApiError && error.status === 401) {
          openLoginModal();
          return;
        }

        toast({
          title: "Unable to load profile",
          description: error instanceof Error ? error.message : "Please check your connection and try again.",
          variant: "destructive",
        });
      } finally {
        if (isActive) setLoading(false);
      }
    };

    loadProfile();

    return () => {
      isActive = false;
    };
  }, [isInitialized, openLoginModal, toast, user]);

  const handleLogin = () => {
    navigate("/login", {
      state: {
        redirectTo: "/profile",
      },
    });
  };

  const handleUpdateProfile = async (payload: UpdateProfilePayload) => {
    setUpdateLoading(true);
    setUpdateError(null);

    try {
      const response = await profileService.updateProfile(payload);

      if (!response.success) {
        throw new Error(response.message || "Profile update failed.");
      }

      setProfile((current) => {
        const updatedProfile = {
          ...(current ?? {}),
          ...payload,
          ...(response.profile ?? {}),
          username: response.profile?.username ?? payload.username,
          profileImage: response.profile?.profileImage ?? payload.profileImage,
          mobileNumber: response.profile?.mobileNumber ?? payload.mobileNumber,
          address:
            response.profile?.address ??
            payload.address ??
            current?.address ??
            null,
        } as Profile;

        return updatedProfile;
      });
      setEditMode(false);

      toast({
        title: "Profile updated",
        description: "Your profile changes were saved successfully.",
      });
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        setEditMode(false);
        openLoginModal();
        return;
      }

      const message = error instanceof Error ? error.message : "Please try again.";
      setUpdateError(message);
      toast({
        title: "Update failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setUpdateLoading(false);
    }
  };

  const displayedRewards = useMemo<ProfileRewards | null>(() => {
    if (rewards) return rewards;
    if (!profile) return null;

    return {
      totalRewardPoints: profile.totalRewardPoints,
      totalSpins: profile.totalSpins,
      lastSpinDate: profile.lastSpinDate,
      canSpin: false,
    };
  }, [profile, rewards]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="pt-16 pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 flex flex-col gap-2">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              <User className="h-4 w-4" aria-hidden="true" />
              Player Profile
            </p>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">My Profile</h1>
          </div>

          {loading ? (
            <div className="flex min-h-[360px] items-center justify-center rounded-lg border border-border bg-card">
              <Loader2 className="h-8 w-8 animate-spin text-primary" aria-label="Loading profile" />
            </div>
          ) : profile ? (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Profile Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <Avatar className="h-24 w-24 border border-border">
                      <AvatarImage src={profile.profileImage || undefined} alt={`${profile.username} profile`} />
                      <AvatarFallback className="bg-primary text-3xl font-bold text-primary-foreground">
                        {getInitial(profile.username)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <h2 className="break-words text-2xl font-bold">{profile.username}</h2>
                      <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" aria-hidden="true" />
                        Member since {formatDate(profile.memberSince)}
                      </p>
                    </div>
                    <Button type="button" variant="outline" onClick={() => setEditMode(true)} className="sm:self-start">
                      <Pencil className="h-4 w-4" aria-hidden="true" />
                      Edit Profile
                    </Button>
                  </div>

                  <div className="grid gap-4">
                    <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-4">
                      <User className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                      <div className="min-w-0">
                        <p className="text-sm text-muted-foreground">Username</p>
                        <p className="break-words font-medium">{profile.username}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-4">
                      <div className="relative">
                        <Mail className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                        <Lock className="absolute -right-2 -top-2 h-3.5 w-3.5 text-primary" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="break-all font-medium">{profile.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-4">
                      <Calendar className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                      <div className="min-w-0">
                        <p className="text-sm text-muted-foreground">Member Since</p>
                        <p className="font-medium">{formatDate(profile.memberSince)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-4">
                      <Phone className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                      <div className="min-w-0">
                        <p className="text-sm text-muted-foreground">Mobile Number</p>
                        <p className="break-words font-medium">{profile.mobileNumber || "Not added"}</p>
                      </div>
                    </div>

                    {profile.address ? (
                      <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-4">
                        <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" aria-hidden="true" />
                        <div className="min-w-0">
                          <p className="text-sm text-muted-foreground">Address</p>
                          <p className="break-words font-medium">{profile.address}</p>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="h-5 w-5 text-primary" aria-hidden="true" />
                    Rewards Dashboard
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="space-y-3">
                    <div className="rounded-lg border border-border bg-muted/40 p-4">
                      <p className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="h-4 w-4 text-primary" aria-hidden="true" />
                        Total Points
                      </p>
                      <p className="mt-1 text-3xl font-extrabold text-primary">
                        {displayedRewards?.totalRewardPoints ?? 0}
                      </p>
                    </div>

                    <div className="rounded-lg border border-border bg-muted/40 p-4">
                      <p className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Target className="h-4 w-4 text-primary" aria-hidden="true" />
                        Total Spins
                      </p>
                      <p className="mt-1 text-2xl font-bold">{displayedRewards?.totalSpins ?? 0}</p>
                    </div>

                    <div className="rounded-lg border border-border bg-muted/40 p-4">
                      <p className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 text-primary" aria-hidden="true" />
                        Last Spin
                      </p>
                      <p className="mt-1 text-lg font-semibold">{formatDate(displayedRewards?.lastSpinDate)}</p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-border p-4">
                    <p className="text-sm font-semibold text-card-foreground">Today's Status</p>
                    <p className="mt-2 text-lg font-bold">
                      {displayedRewards?.canSpin ? " Spin Available" : " Already Used"}
                    </p>
                  </div>

                  <Button type="button" className="w-full" onClick={() => navigate("/spin-wheel")}>
                    <Gift className="h-4 w-4" aria-hidden="true" />
                    Spin & Win
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="rounded-lg border border-border bg-card p-6 text-center text-muted-foreground">
              Profile details are unavailable right now.
            </div>
          )}
        </div>
      </main>

      <EditProfileModal
        open={editMode}
        profile={profile}
        loading={updateLoading}
        error={updateError}
        onClose={() => {
          if (!updateLoading) {
            setEditMode(false);
            setUpdateError(null);
          }
        }}
        onSubmit={handleUpdateProfile}
      />
      <LoginRequiredModal open={loginModalOpen} onLogin={handleLogin} />
      <Footer />
      <MobileFooterNav />
    </div>
  );
};

export default ProfilePage;
