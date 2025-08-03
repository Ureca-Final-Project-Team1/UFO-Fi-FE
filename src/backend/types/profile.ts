import { Achievement } from '@/features/mypage/types/Achievement';

import { SuccessApiResponse } from './api';
import { Carrier } from './carrier';
import { MobileDataType } from './mobileData';

export interface TradePost {
  postId: number;
  mobileDataType: MobileDataType;
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

export type UserStats = {
  trade_frequency: number;
  dominant_trade_time: 'day' | 'night';
  achievements: Achievement[];
};
