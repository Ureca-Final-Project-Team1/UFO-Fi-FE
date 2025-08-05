import { useQuery } from '@tanstack/react-query';

import { userPlanAPI } from '@/backend';

export function useUserPlan() {
  return useQuery({
    queryKey: ['userPlan'],
    queryFn: () => userPlanAPI.get(),
    staleTime: 1000 * 60 * 5,
  });
}
