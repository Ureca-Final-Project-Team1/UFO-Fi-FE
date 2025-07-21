'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { registerFCMToken } from '@/lib/fcm';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const handleLoginSuccess = async () => {
      // FCM 토큰 등록 (백그라운드)
      registerFCMToken().catch((error) => {
        console.warn('FCM registration failed, but continuing:', error);
      });
      router.push('/signup/privacy');
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
