import { useQuery } from '@tanstack/react-query';

import { followersAPI } from '@/backend';

export const useFollowers = () => {
  return useQuery({
    queryKey: ['followers'],
    queryFn: () => followersAPI.getFollowers(),
    refetchInterval: 30000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 1000 * 60 * 2,
  });
};
