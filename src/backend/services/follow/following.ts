import { apiRequest } from '@/backend/client/axios';
import type { GetFollowingResponse } from '@/backend/types/follow';

export const followingAPI = {
  // 내가 팔로우하는 목록 조회
  async getFollowing(page?: number): Promise<GetFollowingResponse> {
    const response = await apiRequest.get<{ content: GetFollowingResponse }>(
      '/v1/mypage/followings',
      {
        params: { page: page ?? 0 },
      },
    );
    return response.data.content;
  },
};
