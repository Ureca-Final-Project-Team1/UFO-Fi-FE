'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { getUserInfoAPI } from '@/backend/services/auth/userInfo';
import { registerFCMToken } from '@/lib/fcm';
import { Loading } from '@/shared';
import { useToastStore } from '@/stores/useToastStore';
import { useUserInfoStore } from '@/stores/useUserInfoStore';

// 쿠키 확인 API 호출 함수
async function checkAuthCookies(): Promise<{
  hasAuth: boolean;
  hasRefresh: boolean;
  isAuthenticated: boolean;
}> {
  try {
    const response = await fetch('/api/auth/check', {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Cookie check failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Cookie check error:', error);
    return { hasAuth: false, hasRefresh: false, isAuthenticated: false };
  }
}

const SuccessPage = () => {
  const router = useRouter();
  const { setPhoneNumber } = useUserInfoStore();
  const { setToast } = useToastStore();
  const hasRun = useRef(false);

  useEffect(() => {
    const handleLoginSuccess = async () => {
      if (hasRun.current) return;
      hasRun.current = true;

      try {
        // 서버 사이드에서 쿠키 확인
        const cookieStatus = await checkAuthCookies();

        if (!cookieStatus.isAuthenticated) {
          setToast('로그인 처리 중 오류가 발생했습니다. 다시 시도해주세요.', 'error');
          setTimeout(() => {
            router.replace('/login');
          }, 500);
          return;
        }

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
        console.error('Login success handling failed:', error);

        // 에러 타입별 처리
        if (error instanceof Error) {
          if (
            error.message.includes('Authentication expired') ||
            error.message.includes('No refresh token') ||
            error.message.includes('Authentication failed')
          ) {
            setToast('로그인이 만료되었습니다. 다시 로그인해주세요.', 'error');
          } else {
            setToast('회원 정보를 불러올 수 없습니다. 다시 로그인해주세요.', 'error');
          }
        } else {
          setToast('알 수 없는 오류가 발생했습니다. 다시 로그인해주세요.', 'error');
        }

        setTimeout(() => {
          router.replace('/login');
        }, 1000);
      }
    };

    handleLoginSuccess();
  }, [router, setPhoneNumber, setToast]);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Loading />
    </div>
  );
};

export default SuccessPage;
