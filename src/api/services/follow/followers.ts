import { apiRequest } from '@/api/client/axios';
import type { GetFollowersResponse } from '@/api/types/follow';

export const followersAPI = {
  // 내 계정을 팔로우하는 유저 조회
  async getFollowers(): Promise<GetFollowersResponse> {
    const response = await apiRequest.get<{ content: GetFollowersResponse }>(
      '/v1/mypage/followers',
    );
    return response.data.content;
  },
};
