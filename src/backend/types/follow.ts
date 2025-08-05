// 서버 스키마
export interface ApiFollowUser {
  id: number;
  username?: string;
  profilePhotoUrl?: string;
  nickname?: string;
}

// 팔로워 목록 조회 응답
export interface GetFollowersResponse {
  followersReadRes: ApiFollowUser[];
}

// 팔로잉 목록 조회 응답
export interface GetFollowingResponse {
  followingsReadRes: ApiFollowUser[];
}

// 팔로우/언팔로우 액션 응답
export interface FollowActionResponse {
  id: number;
}

// 팔로우 액션 요청 (Path Parameter)
export interface FollowActionRequest {
  targetUserId: number;
}

// 추천 친구 조회 응답
export interface FindRecommendUsersResponse {
  success: boolean;
  content: {
    neighbors: FindRecommendUsersResponseContent[];
  };
}

export interface FindRecommendUsersResponseContent {
  id: number;
  nickname: string;
  profile: string;
}
