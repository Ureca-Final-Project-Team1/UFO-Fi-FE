import { apiRequest } from '@/backend/client/axios';
import type { FollowActionResponse } from '@/backend/types/follow';

export const followActionsAPI = {
  // 다른 유저에게 팔로우 신청
  async followUser(targetUserId: number): Promise<FollowActionResponse> {
    const response = await apiRequest.post<{ content: FollowActionResponse }>(
      `/v1/follow/${targetUserId}`,
    );
    return response.data.content;
  },

  // 팔로우 취소 (언팔로우)
  async unfollowUser(targetUserId: number): Promise<FollowActionResponse> {
    const response = await apiRequest.delete<{ content: FollowActionResponse }>(
      `/v1/unfollow/${targetUserId}`,
    );
    return response.data.content;
  },
};
