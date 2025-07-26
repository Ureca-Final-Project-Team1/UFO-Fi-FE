'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { getUserInfoAPI } from '@/api/services/auth/userInfo';
import { registerFCMToken } from '@/lib/fcm';
import { useToastStore } from '@/stores/useToastStore';
import { useUserInfoStore } from '@/stores/useUserInfoStore';

const SuccessPage = () => {
  const router = useRouter();
  const { setPhoneNumber } = useUserInfoStore();
  const { setToast } = useToastStore();

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
        console.log('회원 정보 요청 실패: ', err);
        setToast('회원 정보를 불러올 수 없습니다.', 'error');
        router.push('/login');
      }
    };
    handleLoginSuccess();
  }, [router, setPhoneNumber, setToast]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 "></div>
    </div>
  );
};

export default SuccessPage;
