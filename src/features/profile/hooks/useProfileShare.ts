import { useState } from 'react';

import type { ProfileUser } from '@/api/types/profile';

import { useWebShare } from './useWebShare';

export function useProfileShare(profile: ProfileUser) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { share, copyToClipboard, canShare } = useWebShare();

  const profileUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/profile/${profile.userId}`
      : `${process.env.NEXT_PUBLIC_BASE_URL}/profile/${profile.userId}`;

  const shareData = {
    title: `${profile.nickname}의 프로필`,
    text: `${profile.nickname}님의 UFO-Fi 프로필을 확인해보세요!`,
    url: profileUrl,
  };

  const handleShare = () => {
    if (canShare) {
      share(shareData);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleCopyLink = () => {
    copyToClipboard(profileUrl);
    setIsModalOpen(false);
  };

  const handleKakaoShare = () => {
    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    setIsModalOpen,
    profileUrl,
    shareData,
    handleShare,
    handleCopyLink,
    handleKakaoShare,
    canShare,
  };
}
