import { useQuery } from '@tanstack/react-query';

import { followingAPI } from '@/backend';
import { queryKeys } from '@/shared/utils';

export function useFollowStatus(targetUserId: number, enabled: boolean = true) {
  return useQuery({
    queryKey: queryKeys.followStatus(targetUserId),
    queryFn: async () => {
      try {
        const followingList = await followingAPI.getFollowing();
        const isFollowing = followingList.followingsReadRes.some(
          (user) => user.id === targetUserId,
        );
        return { isFollowing };
      } catch {
        return { isFollowing: false };
      }
    },
    enabled: enabled && !!targetUserId,
    staleTime: 60 * 1000,
    retry: false,
  });
}
