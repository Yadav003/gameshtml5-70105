export type SpinRewardLabel = "Try Again" | "5 Points" | "10 Points" | "20 Points" | "50 Points";

export interface SpinStatusResponse {
  success: boolean;
  canSpin: boolean;
  totalPoints: number;
  lastSpinDate: string | null;
  nextSpinTime: string | null;
  message?: string;
}

export interface SpinResponse {
  success: boolean;
  reward: SpinRewardLabel;
  pointsWon: number;
  totalPoints: number;
  message?: string;
}

export interface SpinHistoryItem {
  id?: string;
  reward: string;
  pointsWon: number;
  totalPoints?: number;
  spinDate?: string;
  createdAt?: string;
}

export interface SpinHistoryResponse {
  success: boolean;
  history?: SpinHistoryItem[];
  data?: SpinHistoryItem[];
  message?: string;
}
