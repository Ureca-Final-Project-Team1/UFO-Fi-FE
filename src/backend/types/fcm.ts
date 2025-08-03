import type { SuccessApiResponse } from './api';
import type { Carrier } from './carrier';

export interface FCMTokenRequest {
  token: string;
}

export interface FCMTokenContent {
  id: number;
}

export type FCMTokenResponse = SuccessApiResponse<FCMTokenContent>;

export interface NotificationFilterRequest {
  carriers: Carrier[];
  interestedMaxCapacity: number;
  interestedMinCapacity: number;
  interestedMaxPrice: number;
  interestedMinPrice: number;
}
