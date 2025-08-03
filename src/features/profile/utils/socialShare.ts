import type { ProfileShareOptions } from '@/shared';

// 카카오톡 공유
export const kakaoTalkShare = (options: ProfileShareOptions): void => {
  if (!window.Kakao) {
    console.error('Kakao SDK가 로드되지 않았습니다.');
    return;
  }

  if (!window.Kakao.isInitialized()) {
    const apiKey = process.env.NEXT_PUBLIC_KAKAO_API_KEY;
    if (!apiKey) {
      console.error('Kakao API 키가 설정되지 않았습니다.');
      return;
    }
    window.Kakao.init(apiKey);
  }

  window.Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: options.title,
      description: options.description,
      imageUrl: options.imageUrl || '/images/default-profile.png',
      link: {
        mobileWebUrl: options.mobileWebUrl || options.webUrl,
        webUrl: options.webUrl,
      },
    },
    buttons: [
      {
        title: '프로필 보기',
        link: {
          mobileWebUrl: options.mobileWebUrl || options.webUrl,
          webUrl: options.webUrl,
        },
      },
    ],
  });
};

// 페이스북 공유
export const facebookShare = (url: string): void => {
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  window.open(facebookUrl, '_blank', 'width=600,height=400');
};

// 트위터 공유
export const twitterShare = (url: string, text: string): void => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  window.open(twitterUrl, '_blank', 'width=600,height=400');
};

// 네이버 공유
export const naverShare = (url: string, text: string): void => {
  const naverUrl = `https://share.naver.com/web/shareView?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`;
  window.open(naverUrl, '_blank', 'width=600,height=400');
};

// 라인 공유
export const lineShare = (url: string, text: string): void => {
  const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
  window.open(lineUrl, '_blank', 'width=600,height=400');
};
