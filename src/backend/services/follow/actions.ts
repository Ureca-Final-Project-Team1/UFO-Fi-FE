import { apiRequest } from '@/backend/client/axios';
import type { FollowActionResponse } from '@/backend/types/follow';

export const followActionsAPI = {
  // 다른 유저에게 팔로우 신청
  async followUser(followId: number): Promise<FollowActionResponse> {
    const response = await apiRequest.post<{ content: FollowActionResponse }>(
      `/follow/${followId}`,
    );
    return response.data.content;
  },

  // 팔로우 취소 (언팔로우)
  async unfollowUser(followingId: number): Promise<FollowActionResponse> {
    const response = await apiRequest.delete<{ content: FollowActionResponse }>(
      `/follow/${followingId}`,
    );
    return response.data.content;
  },
};
