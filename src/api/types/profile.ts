import { SuccessApiResponse } from './api';

export interface ProfileUser {
  id: number;
  nickname: string;
  email: string | null;
  profileImageUrl?: string;
  sellMobileDataCapacityGb: number;
  sellableDataAmount: number;
  zetAsset: number | null;
  followersCount?: number;
  followingCount?: number;
  bio?: string;
  isFollowing?: boolean;
}

export interface GetProfileRequest {
  anotherUserId: number;
}

export interface GetProfileResponse extends SuccessApiResponse<ProfileUser> {
  statusCode: number;
  message: string;
  content: ProfileUser;
}
