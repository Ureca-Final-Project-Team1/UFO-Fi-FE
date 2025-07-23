import { useQuery } from '@tanstack/react-query';

import { profileAPI } from '@/api';
import type { ProfileUser } from '@/api/types/profile';

export function useProfile(userId: number) {
  return useQuery<ProfileUser, Error>({
    queryKey: ['profile', userId],
    queryFn: async () => {
      const response = await profileAPI.getProfile(userId);
      return response.content;
    },
    enabled: !!userId && !isNaN(userId),
    staleTime: 2 * 60 * 1000, // 2분 캐싱
    retry: 2,
  });
}
