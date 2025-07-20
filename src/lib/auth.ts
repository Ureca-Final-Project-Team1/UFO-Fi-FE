import { clearFCMToken } from './fcm';

export const logout = () => {
  clearFCMToken();

  // 서버 로그아웃
  window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/logout`;
};

// 사용법
// import { logout } from '@/lib/auth';
// logout();
