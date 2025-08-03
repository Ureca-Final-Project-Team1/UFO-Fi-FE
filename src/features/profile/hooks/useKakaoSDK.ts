'use client';

import { useEffect, useState } from 'react';

export function useKakaoSDK() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 이미 로드되어 있으면 초기화만
    if (window.Kakao) {
      const apiKey = process.env.NEXT_PUBLIC_KAKAO_API_KEY;
      if (apiKey && !window.Kakao.isInitialized()) {
        window.Kakao.init(apiKey);
      }
      setIsLoaded(true);
      return;
    }

    // 스크립트 동적 로드
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
    script.async = true;
    script.defer = true;

    script.onload = () => {
      const apiKey = process.env.NEXT_PUBLIC_KAKAO_API_KEY;
      if (window.Kakao && apiKey && !window.Kakao.isInitialized()) {
        window.Kakao.init(apiKey);
      }
      setIsLoaded(true);
    };

    script.onerror = () => {
      console.error('Kakao SDK 로드 실패');
      setIsLoaded(false);
    };

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const shareToKakao = (title: string, description: string, imageUrl: string, webUrl: string) => {
    if (!window.Kakao || !isLoaded) {
      console.error('Kakao SDK가 준비되지 않았습니다.');
      return false;
    }

    try {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title,
          description,
          imageUrl: imageUrl || '/images/default-profile.png',
          link: {
            mobileWebUrl: webUrl,
            webUrl: webUrl,
          },
        },
        buttons: [
          {
            title: '프로필 보기',
            link: {
              mobileWebUrl: webUrl,
              webUrl: webUrl,
            },
          },
        ],
      });
      return true;
    } catch (error) {
      console.error('카카오톡 공유 실패:', error);
      return false;
    }
  };

  return { isLoaded, shareToKakao };
}
