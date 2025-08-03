import { useQuery } from '@tanstack/react-query';

import { followingAPI } from '@/backend';

export const useFollowing = () => {
  return useQuery({
    queryKey: ['following'],
    queryFn: () => followingAPI.getFollowing(),
    refetchInterval: 30000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 1000 * 60 * 2,
  });
};
