'use client';

import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { getUserInfoAPI } from '@/api/services/auth/userInfo';
import { useToastStore } from '@/hooks/useToastStore';
import { registerFCMToken } from '@/lib/fcm';
import { useUserInfoStore } from '@/stores/useUserInfoStore';

const Page = () => {
  const router = useRouter();
  const { setPhoneNumber } = useUserInfoStore();
  const { setMessage } = useToastStore();

  useEffect(() => {
    const handleLoginSuccess = async () => {
      try {
        // FCM 토큰 등록 (백그라운드)
        registerFCMToken().catch((error) => {
          console.warn('FCM registration failed, but continuing:', error);
        });

        const response = await getUserInfoAPI.getInfo();

        switch (response.content.role) {
          case 'ROLE_NO_INFO':
            router.push('/signup/privacy');
            break;
          case 'ROLE_REPORTED':
            router.push('/blackhole');
            break;
          case 'ROLE_ADMIN':
            router.push('/admin');
          default:
            router.push('/');
            break;
        }

        setPhoneNumber(response.content.phoneNumber);
      } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        const errorMessage =
          error?.response?.data?.message || error?.message || '알 수 없는 오류가 발생했습니다.';
        setMessage(errorMessage);
        router.push('/login');
      }
    };
    handleLoginSuccess();
  }, [router, setPhoneNumber, setMessage]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 "></div>
    </div>
  );
};

export default Page;
