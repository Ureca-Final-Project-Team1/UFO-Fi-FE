import type { SuccessApiResponse } from './api';

export interface FCMTokenRequest {
  token: string;
}

export interface FCMTokenContent {
  id: number;
}

export type FCMTokenResponse = SuccessApiResponse<FCMTokenContent>;

export interface NotificationFilterRequest {
  carriers: string[]; // 문자열 배열 ["SKT", "KT", "LGU"]
  interestedMaxCapacity: number;
  interestedMinCapacity: number;
  interestedMaxPrice: number;
  interestedMinPrice: number;
}
