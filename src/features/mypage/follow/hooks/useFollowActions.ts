import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { followActionsAPI } from '@/backend';

export const useFollowActions = () => {
  const queryClient = useQueryClient();

  const followMutation = useMutation({
    mutationFn: (targetUserId: number) => followActionsAPI.followUser(targetUserId),
    onSuccess: () => {
      toast.success('팔로우했습니다!');
      // 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['followers'] });
      queryClient.invalidateQueries({ queryKey: ['following'] });
    },
    onError: () => {
      toast.error('팔로우에 실패했습니다.');
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: (targetUserId: number) => followActionsAPI.unfollowUser(targetUserId),
    onSuccess: () => {
      toast.success('언팔로우했습니다!');
      // 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['followers'] });
      queryClient.invalidateQueries({ queryKey: ['following'] });
    },
    onError: () => {
      toast.error('언팔로우에 실패했습니다.');
    },
  });

  return {
    followUser: followMutation.mutate,
    unfollowUser: unfollowMutation.mutate,
    isFollowing: followMutation.isPending,
    isUnfollowing: unfollowMutation.isPending,
  };
};
