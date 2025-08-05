// useProfileFollowActions.ts 에러 처리 개선
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { followActionsAPI } from '@/backend';
import { ApiError } from '@/backend/client/axios';
import { queryKeys } from '@/shared/utils';

export function useProfileFollowActions() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const followMutation = useMutation({
    mutationFn: (targetUserId: number) => followActionsAPI.followUser(targetUserId),
    onSuccess: (_, targetUserId) => {
      toast.success('팔로우했습니다!');
      // 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: queryKeys.profile(targetUserId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.following() });
      queryClient.invalidateQueries({ queryKey: queryKeys.followStatus(targetUserId) });
    },
    onError: (error) => {
      console.error('팔로우 실패:', error);

      if (error instanceof ApiError) {
        switch (error.statusCode) {
          case 400:
            if (error.message.includes('자기 자신')) {
              toast.error('자기 자신을 팔로우할 수 없습니다.');
            } else {
              toast.error(error.message || '잘못된 요청입니다.');
            }
            break;
          case 401:
          case 403:
            toast.error('로그인이 필요합니다.');
            router.push('/login');
            break;
          case 404:
            toast.error('사용자를 찾을 수 없습니다.');
            break;
          case 409:
            toast.error('이미 팔로우한 사용자입니다.');
            break;
          default:
            toast.error('팔로우에 실패했습니다.');
        }
      } else {
        toast.error('팔로우에 실패했습니다.');
      }
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: (targetUserId: number) => followActionsAPI.unfollowUser(targetUserId),
    onSuccess: (_, targetUserId) => {
      toast.success('언팔로우했습니다.');
      // 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: queryKeys.profile(targetUserId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.following() });
      queryClient.invalidateQueries({ queryKey: queryKeys.followStatus(targetUserId) });
    },
    onError: (error) => {
      console.error('언팔로우 실패:', error);

      if (error instanceof ApiError) {
        switch (error.statusCode) {
          case 400:
            toast.error(error.message || '잘못된 요청입니다.');
            break;
          case 401:
          case 403:
            toast.error('로그인이 필요합니다.');
            router.push('/login');
            break;
          case 404:
            toast.error('팔로우 관계를 찾을 수 없습니다.');
            break;
          default:
            toast.error('언팔로우에 실패했습니다.');
        }
      } else {
        toast.error('언팔로우에 실패했습니다.');
      }
    },
  });

  return {
    followUser: followMutation.mutate,
    unfollowUser: unfollowMutation.mutate,
    isFollowing: followMutation.isPending,
    isUnfollowing: unfollowMutation.isPending,
    isLoading: followMutation.isPending || unfollowMutation.isPending,
  };
}
