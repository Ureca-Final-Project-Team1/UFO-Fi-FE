'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { getUserInfoAPI } from '@/api/services/auth/userInfo';
import { registerFCMToken } from '@/lib/fcm';
import { useToastStore } from '@/stores/useToastStore';
import { useUserInfoStore } from '@/stores/useUserInfoStore';

const SuccessPage = () => {
  const router = useRouter();
  const { setPhoneNumber } = useUserInfoStore();
  const { setToast } = useToastStore();
  const hasRun = useRef(false);

  useEffect(() => {
    const handleLoginSuccess = async () => {
      if (hasRun.current) return;
      hasRun.current = true;

      // 쿠키 존재 여부 확인
      const hasAuthCookie =
        typeof document !== 'undefined' && document.cookie.includes('Authorization=');
      const hasRefreshCookie =
        typeof document !== 'undefined' && document.cookie.includes('Refresh=');

      if (!hasAuthCookie && !hasRefreshCookie) {
        setToast('로그인 처리 중 오류가 발생했습니다. 다시 시도해주세요.', 'error');
        setTimeout(() => {
          router.replace('/login');
        }, 500);
        return;
      }

      try {
        // FCM 토큰 등록 (백그라운드)
        registerFCMToken().catch((error) => {
          console.warn('FCM registration failed, but continuing:', error);
        });

        const response = await getUserInfoAPI.getInfo();

        // 전화번호 저장
        setPhoneNumber(response.content.phoneNumber);

        // 역할별 리다이렉트
        switch (response.content.role) {
          case 'ROLE_NO_INFO':
            router.replace('/signup/privacy');
            break;
          case 'ROLE_REPORTED':
            router.replace('/blackhole');
            break;
          case 'ROLE_ADMIN':
            router.replace('/admin');
            break;
          case 'ROLE_USER':
          default:
            router.replace('/');
            break;
        }
      } catch (error) {
        // 특정 에러 타입별 처리
        if (error instanceof Error) {
          if (
            error.message.includes('Authentication expired') ||
            error.message.includes('No refresh token')
          ) {
            setToast('로그인이 만료되었습니다. 다시 로그인해주세요.', 'error');
          } else {
            setToast('회원 정보를 불러올 수 없습니다. 다시 로그인해주세요.', 'error');
          }
        } else {
          setToast('알 수 없는 오류가 발생했습니다. 다시 로그인해주세요.', 'error');
        }

        // 에러 발생 시 쿠키 정리하고 로그인 페이지로
        if (typeof document !== 'undefined') {
          document.cookie =
            'Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict;';
          document.cookie =
            'Refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict;';
        }

        setTimeout(() => {
          router.replace('/login');
        }, 1000);
      }
    };

    handleLoginSuccess();
  }, [router, setPhoneNumber, setToast]);

  return (
    <div className="flex flex-col items-center justify-center min-h-full">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-4" />
      <p className="text-white text-sm">로그인 처리 중...</p>
    </div>
  );
};

export default SuccessPage;
