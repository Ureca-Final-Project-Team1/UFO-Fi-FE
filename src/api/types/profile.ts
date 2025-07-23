import { SuccessApiResponse } from './api';
import { Carrier } from './carrier';

export interface TradePost {
  postId: number;
  mobileDataType: 'LTE' | '_5G';
  carrier: Carrier;
  sellMobileDataAmountGB: number;
  title: string;
  createdAt: string;
}

export interface ProfileUser {
  userId: number;
  nickname: string;
  profileImageUrl?: string;
  followerCount: number;
  followingCount: number;
  tradePostsRes: TradePost[];
}

export interface GetProfileRequest {
  anotherUserId: number;
}

export type GetProfileResponse = SuccessApiResponse<ProfileUser>;
