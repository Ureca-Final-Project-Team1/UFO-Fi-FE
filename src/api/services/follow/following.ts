import type { GetFollowingResponse } from '@/api';
import { apiRequest } from '@/api/client/axios';

export const followingAPI = {
  // 내가 팔로우하는 목록 조회
  async getFollowing(): Promise<GetFollowingResponse> {
    const response = await apiRequest.get<{ content: GetFollowingResponse }>(
      '/v1/mypage/followings',
    );
    return response.data.content;
  },
};
