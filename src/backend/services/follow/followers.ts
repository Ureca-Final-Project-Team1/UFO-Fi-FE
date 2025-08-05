import { apiRequest } from '@/backend/client/axios';
import type { GetFollowersResponse } from '@/backend/types/follow';

export const followersAPI = {
  // 내 계정을 팔로우하는 유저 조회
  async getFollowers(page?: number): Promise<GetFollowersResponse> {
    const response = await apiRequest.get<{ content: GetFollowersResponse }>(
      '/v1/mypage/followers',
      {
        params: { page: page ?? 0 },
      },
    );
    return response.data.content;
  },
};
