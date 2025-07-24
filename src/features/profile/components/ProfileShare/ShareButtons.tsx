'use client';

import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import type { ProfileUser } from '@/api/types/profile';
import { useKakaoSDK } from '@/features/profile/hooks/useKakaoSDK';
import {
  facebookShare,
  twitterShare,
  lineShare,
  naverShare,
} from '@/features/profile/utils/socialShare';
import { Button, Icon } from '@/shared';

import 'swiper/css';
import 'swiper/css/free-mode';

interface ShareButtonsProps {
  profile: ProfileUser;
  profileUrl: string;
  onCopyLink: () => void;
  onClose: () => void;
}

export function ShareButtons({ profile, profileUrl, onCopyLink, onClose }: ShareButtonsProps) {
  const { isLoaded, shareToKakao } = useKakaoSDK();

  const shareText = `${profile.nickname}님의 UFO-Fi 프로필을 확인해보세요!`;

  const handleKakaoShare = () => {
    const success = shareToKakao(
      `${profile.nickname}의 프로필`,
      shareText,
      profile.profileImageUrl || '',
      profileUrl,
    );

    if (success) {
      onClose();
    }
  };

  const handleFacebookShare = () => {
    facebookShare(profileUrl);
    onClose();
  };

  const handleNaverShare = () => {
    naverShare(profileUrl, shareText);
    onClose();
  };

  const handleTwitterShare = () => {
    twitterShare(profileUrl, shareText);
    onClose();
  };

  const handleLineShare = () => {
    lineShare(profileUrl, shareText);
    onClose();
  };

  const shareOptions = [
    {
      id: 'kakao',
      name: '카카오톡',
      icon: 'k',
      bgColor: 'bg-yellow-400',
      textColor: 'text-black',
      handler: handleKakaoShare,
      disabled: !isLoaded,
    },
    {
      id: 'facebook',
      name: '페이스북',
      icon: 'f',
      bgColor: 'bg-blue-600',
      textColor: 'text-white',
      handler: handleFacebookShare,
      disabled: false,
    },
    {
      id: 'twitter',
      name: '트위터',
      icon: '𝕏',
      bgColor: 'bg-black',
      textColor: 'text-white',
      handler: handleTwitterShare,
      disabled: false,
    },
    {
      id: 'naver',
      name: '네이버',
      icon: 'N',
      bgColor: 'bg-green-600',
      textColor: 'text-white',
      handler: handleNaverShare,
      disabled: false,
    },
    {
      id: 'line',
      name: '라인',
      icon: 'LINE',
      bgColor: 'bg-green-500',
      textColor: 'text-white',
      handler: handleLineShare,
      disabled: false,
      iconSize: 'text-xs',
    },
  ];

  return (
    <div className="space-y-6">
      {/* 스와이퍼로 가로 스크롤 */}
      <div className="w-full">
        <Swiper
          modules={[FreeMode]}
          spaceBetween={16}
          slidesPerView="auto"
          freeMode={true}
          className="!px-4"
        >
          {shareOptions.map((option) => (
            <SwiperSlide key={option.id} className="!w-auto">
              <button
                onClick={option.handler}
                disabled={option.disabled}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 min-w-[70px]"
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center ${option.bgColor}`}
                >
                  {typeof option.icon === 'string' ? (
                    <span
                      className={`${option.textColor} font-bold ${option.iconSize || 'text-lg'}`}
                    >
                      {option.icon}
                    </span>
                  ) : (
                    option.icon
                  )}
                </div>
                <span className="text-xs text-gray-600 text-center leading-tight">
                  {option.name}
                </span>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 공유 링크 복사 버튼 */}
      <Button variant="secondary" className="w-full" onClick={onCopyLink}>
        <Icon name="Upload" className="w-4 h-4 mr-2" />
        공유 링크 복사하기
      </Button>
    </div>
  );
}
