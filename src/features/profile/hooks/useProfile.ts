import { useQuery } from '@tanstack/react-query';

import { profileAPI, type ProfileUser } from '@/api';

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
