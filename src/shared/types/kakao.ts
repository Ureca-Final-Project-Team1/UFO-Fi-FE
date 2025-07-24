export interface KakaoShareContent {
  title: string;
  description: string;
  imageUrl?: string;
  link: {
    mobileWebUrl: string;
    webUrl: string;
  };
}

export interface KakaoShareButton {
  title: string;
  link: {
    mobileWebUrl: string;
    webUrl: string;
  };
}

export interface KakaoShareOptions {
  objectType: 'feed' | 'list' | 'location' | 'commerce' | 'text';
  content: KakaoShareContent;
  buttons?: KakaoShareButton[];
}

export interface KakaoShare {
  sendDefault: (options: KakaoShareOptions) => void;
}

export interface KakaoSDK {
  init: (appKey: string) => void;
  isInitialized: () => boolean;
  Share: KakaoShare;
}

declare global {
  interface Window {
    Kakao: KakaoSDK;
  }
}

export interface ProfileShareOptions {
  title: string;
  description: string;
  imageUrl?: string;
  webUrl: string;
  mobileWebUrl?: string;
}
