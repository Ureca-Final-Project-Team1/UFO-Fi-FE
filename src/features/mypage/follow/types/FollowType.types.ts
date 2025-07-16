export const FOLLOW_TYPE = {
  FOLLOWER: 'follower',
  FOLLOWING: 'following',
} as const;

export const FOLLOW_ACTION = {
  FOLLOW: 'follow',
  UNFOLLOW: 'unfollow',
  DELETE: 'delete',
} as const;

export const FOLLOW_STATUS = {
  NOT_FOLLOWING: 'not_following',
  FOLLOWING: 'following',
  MUTUAL: 'mutual',
} as const;

export type FollowType = (typeof FOLLOW_TYPE)[keyof typeof FOLLOW_TYPE];
export type FollowAction = (typeof FOLLOW_ACTION)[keyof typeof FOLLOW_ACTION];
export type FollowStatus = (typeof FOLLOW_STATUS)[keyof typeof FOLLOW_STATUS];

export interface FollowUser {
  id: string;
  profileImage: string;
  isFollowing: boolean;
  username?: string;
  status?: 'online' | 'offline';
}

export interface FollowActions {
  onFollow: (userId: string) => void;
  onUnfollow: (userId: string) => void;
  onDelete?: (userId: string) => void;
}

export interface FollowItemProps {
  user: FollowUser;
  actions: FollowActions;
  type: FollowType;
}

// 팔로우 버튼 관련 타입
export interface FollowButtonConfig {
  variant: 'follow-button' | 'following-button' | 'unfollow-button';
  text: string;
  action: FollowAction;
}
