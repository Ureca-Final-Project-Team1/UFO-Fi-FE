'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { getUserInfoAPI } from '@/api/services/auth/userInfo';
import { registerFCMToken } from '@/lib/fcm';
import { useUserInfoStore } from '@/stores/useUserInfoStore';

const Page = () => {
  const router = useRouter();
  const { setPhoneNumber } = useUserInfoStore();

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
          default:
            router.push('/');
            break;
        }

        setPhoneNumber(response.content.phoneNumber);
      } catch (error) {
        console.error('Login success handling failed:', error);
        router.push('/login');
      }
    };
    handleLoginSuccess();
  }, [router, setPhoneNumber]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 "></div>
    </div>
  );
};

export default Page;
