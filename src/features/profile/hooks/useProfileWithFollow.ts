import { useQuery } from '@tanstack/react-query';

import { profileAPI, type ProfileUser } from '@/api';
import { queryKeys, useMyInfo } from '@/shared';

interface ProfileWithFollowState extends ProfileUser {
  isMyProfile: boolean;
}

export function useProfileWithFollow(userId: number) {
  const { data: myInfo } = useMyInfo();

  const profileQuery = useQuery<ProfileWithFollowState, Error>({
    queryKey: queryKeys.profile(userId, myInfo?.nickname),
    queryFn: async () => {
      const response = await profileAPI.getProfile(userId);
      const profile = response.content;
      const normalizeNickname = (nickname: string) => nickname?.trim().toLowerCase() || '';
      const myNickname = normalizeNickname(myInfo?.nickname || '');
      const profileNickname = normalizeNickname(profile.nickname || '');
      const isMyProfile = !!(myInfo && myNickname && myNickname === profileNickname);

      return {
        ...profile,
        isMyProfile,
      };
    },
    enabled: !!userId && !isNaN(userId),
    staleTime: 2 * 60 * 1000,
    retry: 2,
  });

  const result = {
    ...profileQuery,
    data: profileQuery.data,
    isMyProfile: profileQuery.data?.isMyProfile ?? false,
  };

  return result;
}
