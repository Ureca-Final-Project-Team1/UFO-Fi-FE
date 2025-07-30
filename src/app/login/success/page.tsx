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
  const hasRun = useRef(false); // 최초 실행 여부 플래그

  useEffect(() => {
    const handleLoginSuccess = async () => {
      if (hasRun.current) return;
      hasRun.current = true;

      const hasAuthCookie =
        typeof document !== 'undefined' && document.cookie.includes('Authorization=');

      if (!hasAuthCookie) {
        setToast('로그인이 만료되었습니다. 다시 로그인해주세요.', 'error');

        setTimeout(() => {
          router.replace('/login');
        }, 300);
        return;
      }

      try {
        registerFCMToken().catch((error) => {
          console.warn('FCM registration failed, but continuing:', error);
        });

        const response = await getUserInfoAPI.getInfo();

        setPhoneNumber(response.content.phoneNumber);

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
      } catch {
        setToast('회원 정보를 불러올 수 없습니다.', 'error');
        router.replace('/login');
      }
    };

    handleLoginSuccess();
  }, [router, setPhoneNumber, setToast]);

  return (
    <div className="flex items-center justify-center min-h-full">
      <div className="animate-spin rounded-full h-8 w-8" />
    </div>
  );
};

export default SuccessPage;
