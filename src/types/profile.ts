export interface Profile {
  username: string;
  email: string;
  profileImage: string;
  mobileNumber?: string | null;
  address?: string | null;
  memberSince: string;
  totalRewardPoints: number;
  lastSpinDate: string | null;
  totalSpins: number;
}

export interface ProfileRewards {
  totalRewardPoints: number;
  totalSpins: number;
  lastSpinDate: string | null;
  canSpin: boolean;
}

export interface ProfileResponse {
  success: boolean;
  profile: Profile;
  message?: string;
}

export interface UpdateProfilePayload {
  username: string;
  profileImage: string;
  mobileNumber: string;
  address?: string;
}

export interface RewardsResponse {
  success: boolean;
  data: ProfileRewards;
  message?: string;
}
