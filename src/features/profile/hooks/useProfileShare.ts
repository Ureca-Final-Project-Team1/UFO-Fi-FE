'use client';

import { useState } from 'react';

import type { ProfileUser } from '@/api';

import { useWebShare } from './useWebShare';
import { generateProfileUrl, generateShareText, generateShareTitle } from '../utils';

export function useProfileShare(profile: ProfileUser) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { share, copyToClipboard, canShare } = useWebShare();
  const profileUrl = generateProfileUrl(profile.userId);

  const shareData = {
    title: generateShareTitle(profile.nickname),
    text: generateShareText(profile.nickname),
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
