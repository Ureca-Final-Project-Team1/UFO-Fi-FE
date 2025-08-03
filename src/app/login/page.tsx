'use client';

import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';
import { toast } from 'sonner';

import { ICON_PATHS } from '@/constants/icons';
import { Button } from '@/shared';
import { useToastStore } from '@/stores/useToastStore';

type LoginPageProps = object;

const LoginPage = ({}: LoginPageProps) => {
  const { message, status, clearToast, hasShown } = useToastStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (message && status && !hasShown && isMounted) {
      toast[status](message);
      clearToast();
    }
  }, [message, status, hasShown, clearToast, isMounted]);

  const handleKakaoLogin = useCallback(() => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/oauth2/authorization/kakao`;
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleKakaoLogin();
      }
    },
    [handleKakaoLogin],
  );

  // SSR hydration mismatch 방지
  if (!isMounted) {
    return null;
  }

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden" aria-labelledby="login-title">
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-md w-full">
          {/* 로고 및 타이틀 */}
          <div className="flex flex-col items-center gap-8">
            {/* 로고 */}
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
          </div>
        </div>
      </div>

      {/* 카카오 로그인 버튼 */}
      <div className="flex-shrink-0 px-6 pb-8 pt-4">
        <div className="max-w-[320px] mx-auto">
          <Button
            className="w-full h-11 sm:h-12 !bg-transparent border-0 p-0 bg-[url('/images/kakao_login_button.png')] bg-no-repeat bg-center bg-contain hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-slate-900"
            size="full-width"
            type="button"
            variant="ghost"
            onClick={handleKakaoLogin}
            onKeyDown={handleKeyDown}
            disabled={false}
            aria-label="카카오로 로그인하기"
            aria-describedby="login-description"
            role="button"
            tabIndex={0}
          >
            <span className="sr-only">카카오로 로그인하기</span>
          </Button>
          <p id="login-description" className="sr-only">
            카카오 계정으로 UFO-Fi에 로그인할 수 있습니다. 버튼을 클릭하거나 Enter 키를 눌러
            로그인을 진행하세요.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
