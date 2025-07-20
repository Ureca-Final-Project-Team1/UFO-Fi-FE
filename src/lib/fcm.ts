import { getToken, onMessage, isSupported } from 'firebase/messaging';

import { fcmAPI } from '@/api';

import { messaging } from './firebase';

const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;

// FCM 토큰 생성 및 서버 저장
export const registerFCMToken = async (): Promise<boolean> => {
  try {
    // 지원 여부 확인
    const supported = await isSupported();
    if (!supported) {
      console.warn('FCM not supported');
      return false;
    }

    // 권한 요청
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.warn('Notification permission denied');
      return false;
    }

    // 토큰 생성
    if (!messaging || !VAPID_KEY) {
      console.warn('FCM messaging or VAPID key not available');
      return false;
    }

    const token = await getToken(messaging, { vapidKey: VAPID_KEY });
    if (!token) {
      console.warn('No FCM token generated');
      return false;
    }

    // 이미 저장된 토큰과 같으면 저장하지 않음
    const savedToken = localStorage.getItem('fcm_token');
    if (savedToken === token) {
      return true;
    }

    // 서버에 저장
    const response = await fcmAPI.saveToken({ token });
    if (response.statusCode === 200) {
      localStorage.setItem('fcm_token', token);

      return true;
    }

    return false;
  } catch (error) {
    console.error('FCM token registration failed:', error);
    return false;
  }
};

// 포그라운드 메시지 리스너 설정
export const setupMessageListener = () => {
  if (!messaging) return;

  onMessage(messaging, (payload) => {
    const { title, body } = payload.notification || {};
    if (title && body && 'Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon: '/favicon.ico',
        tag: 'ufo-fi-notification',
      });
    }
  });
};

// 로그아웃 시 토큰 정리
export const clearFCMToken = () => {
  localStorage.removeItem('fcm_token');
};
