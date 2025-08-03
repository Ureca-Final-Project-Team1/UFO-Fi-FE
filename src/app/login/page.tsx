'use client';

import Image from 'next/image';
import '@/styles/globals.css';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { ICON_PATHS } from '@/constants/icons';
import { Button } from '@/shared';
import { useToastStore } from '@/stores/useToastStore';

const LoginPage = () => {
  const { message, status, clearToast, hasShown } = useToastStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (message && status && !hasShown) {
      toast[status](message);
      clearToast();
    }
  }, [message, status, hasShown, clearToast]);

  const handleKakaoLogin = async () => {
    try {
      setIsLoading(true);
      window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/oauth2/authorization/kakao`;
    } catch {
      toast.error('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleKakaoLogin();
    }
  };

  return (
    <main
      className="min-h-full flex flex-col justify-between items-center px-6"
      role="main"
      aria-labelledby="login-title"
    >
      {/* 메인 콘텐츠 영역 - 화면 중앙에 배치 */}
      <section
        className="flex-1 flex flex-col justify-center items-center text-center max-w-md w-full"
        aria-label="로그인 안내"
      >
        {/* 로고 및 텍스트 영역 */}
        <header className="flex flex-col items-center gap-8 mb-12">
          {/* UFO 로고 */}
          <div className="flex flex-col items-center gap-4">
            <Image
              src={ICON_PATHS['UFO_LOGO']}
              width={120}
              height={120}
              alt="UFO-Fi 로고"
              className="drop-shadow-lg"
              priority
              aria-hidden="true"
            />
            <h1 id="login-title" className="pyeongchangpeace-title-1 text-white">
              UFO-Fi
            </h1>
          </div>

          {/* 서브 타이틀 */}
          <h2 className="pyeongchangpeace-title-2 text-teal-300 leading-relaxed">
            데이터는 부족해도, 은하는 연결되어 있다.
          </h2>
        </header>
      </section>

      {/* 카카오 로그인 버튼 - 하단 고정 */}
      <section className="w-full max-w-[320px] pb-6" aria-label="로그인 버튼">
        <Button
          className="w-full h-11 sm:h-12 bg-[url('/images/kakao_login_button.png')] bg-no-repeat bg-center bg-contain hover:opacity-90 transition-opacity duration-200 border-0 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-slate-900"
          size="full-width"
          onClick={handleKakaoLogin}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          aria-label={isLoading ? '로그인 처리 중...' : '카카오로 로그인하기'}
          aria-describedby="login-description"
          role="button"
          tabIndex={0}
        >
          {/* 접근성을 위한 대체 텍스트 (시각적으로 숨김) */}
          <span className="sr-only">
            {isLoading ? '로그인 처리 중입니다...' : '카카오로 로그인하기'}
          </span>
          {isLoading && (
            <span className="sr-only" aria-live="polite">
              로그인 처리 중입니다...
            </span>
          )}
        </Button>
        <p id="login-description" className="sr-only">
          카카오 계정으로 UFO-Fi에 로그인할 수 있습니다. 버튼을 클릭하거나 Enter 키를 눌러 로그인을
          진행하세요.
        </p>
      </section>
    </main>
  );
};

export default LoginPage;
