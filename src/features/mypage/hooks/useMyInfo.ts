import { useQuery } from '@tanstack/react-query';

import { myInfoAPI } from '@/api';
import { MyInfoResponse } from '@/api/types/myInfo';

export function useMyInfo() {
  return useQuery<MyInfoResponse['content'], Error>({
    queryKey: ['myInfo'],
    queryFn: async () => {
      const data = await myInfoAPI.get();
      if (!data) throw new Error('프로필 정보를 불러오지 못했습니다.');
      return data;
    },
    staleTime: 0, // 매번 api 호출
    retry: 1,
    refetchInterval: 10 * 1000, // 10초마다 polling
    refetchOnWindowFocus: true, // 탭 전환 시 자동 refetch
    refetchOnReconnect: true, // 네트워크 복구 시 자동 refetch
  });
}
