import type { SuccessApiResponse } from './api';

export interface FCMTokenRequest {
  token: string;
}

export interface FCMTokenContent {
  id: number;
}

export type FCMTokenResponse = SuccessApiResponse<FCMTokenContent>;

export interface NotificationFilterRequest {
  carrier?: number; // BIT 필드로 관리
  interestedMaxCapacity?: number;
  interestedMinCapacity?: number;
  interestedMaxZet?: number;
  interestedMinZet?: number;
  reputation?: string;
}
