'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { getRoleAPI } from '@/api/services/auth/role';
import { registerFCMToken } from '@/lib/fcm';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const handleLoginSuccess = async () => {
      try {
        // FCM 토큰 등록 (백그라운드)
        registerFCMToken().catch((error) => {
          console.warn('FCM registration failed, but continuing:', error);
        });

        const response = await getRoleAPI.getRole();

        switch (response.content.role) {
          case 'ROLE_NO_INFO':
            router.push('/signup/privacy');
          case 'ROLE_REPORTED':
            router.push('/blackhole');
          default:
            router.push('/');
        }
      } catch (error) {
        console.error('Login success handling failed:', error);
        router.push('/login');
      }
    };
    handleLoginSuccess();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 "></div>
    </div>
  );
};

export default Page;
