import { getToken, onMessage, isSupported, deleteToken } from 'firebase/messaging';

import { messaging } from './firebase';

const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;

// FCM 지원 여부 확인
export const isFCMSupported = async (): Promise<boolean> => {
  try {
    return await isSupported();
  } catch (error) {
    console.error('FCM support check failed:', error);
    return false;
  }
};

// 알림 권한 요청
export const requestNotificationPermission = async (): Promise<boolean> => {
  try {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  } catch (error) {
    console.error('Notification permission request failed:', error);
    return false;
  }
};

// FCM 토큰 생성
export const generateFCMToken = async (): Promise<string | null> => {
  try {
    if (!messaging || !VAPID_KEY) {
      console.warn('FCM messaging or VAPID key not available');
      return null;
    }

    const supported = await isFCMSupported();
    if (!supported) {
      console.warn('FCM is not supported in this browser');
      return null;
    }

    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) {
      console.warn('Notification permission not granted');
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
    });

    if (token) {
      // eslint-disable-next-line no-console
      console.log('FCM Token generated:', token);
      return token;
    } else {
      console.warn('No FCM token available');
      return null;
    }
  } catch (error) {
    console.error('FCM token generation failed:', error);
    return null;
  }
};

// FCM 토큰 삭제 (클라이언트 측)
export const deleteFCMToken = async (): Promise<boolean> => {
  try {
    if (!messaging) {
      console.warn('FCM messaging not available');
      return false;
    }

    await deleteToken(messaging);
    // eslint-disable-next-line no-console
    console.log('FCM token deleted from client successfully');
    return true;
  } catch (error) {
    console.error('Error deleting FCM token from client:', error);
    return false;
  }
};

// 포그라운드 푸시 메시지 수신 처리
export const setupForegroundMessageListener = () => {
  if (!messaging) return;

  onMessage(messaging, (payload) => {
    // eslint-disable-next-line no-console
    console.log('Foreground message received:', payload);

    const { title, body, icon } = payload.notification || {};

    // 커스텀 알림 표시
    if (title && body) {
      showNotification(title, body, icon);
    }
  });
};

// 브라우저 알림 표시
// src/lib/fcm.ts에서 아이콘 경로 부분만 수정

// 브라우저 알림 표시
export const showNotification = (title: string, body: string, icon?: string) => {
  if ('Notification' in window && Notification.permission === 'granted') {
    const notification = new Notification(title, {
      body,
      icon: icon || '/favicon.ico', // 🔄 변경
      badge: '/favicon.ico', // 🔄 변경
      tag: 'ufo-fi-notification',
      // renotify: true,
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };
  }
};

// FCM 토큰을 서버에 저장
export const saveFCMTokenToServer = async (token: string, userId?: string) => {
  try {
    const response = await fetch('/api/fcm/save-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        userId,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent, // 디바이스 정보 추가
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to save FCM token: ${response.status}`);
    }

    const result = await response.json();
    // eslint-disable-next-line no-console
    console.log('FCM token saved to server successfully', result);
    return result;
  } catch (error) {
    console.error('Error saving FCM token:', error);
    throw error;
  }
};

// FCM 토큰 삭제 (구독 해제)
export const deleteFCMTokenFromServer = async (token: string) => {
  try {
    const response = await fetch('/api/fcm/delete-token', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      throw new Error(`Failed to delete FCM token: ${response.status}`);
    }

    const result = await response.json();
    // eslint-disable-next-line no-console
    console.log('FCM token deleted from server successfully', result);
    return result;
  } catch (error) {
    console.error('Error deleting FCM token:', error);
    throw error;
  }
};

// 토큰 새로고침 (주기적으로 호출)
export const refreshFCMToken = async (userId?: string) => {
  try {
    const newToken = await generateFCMToken();
    if (newToken) {
      await saveFCMTokenToServer(newToken, userId);
      return newToken;
    }
    return null;
  } catch (error) {
    console.error('Error refreshing FCM token:', error);
    return null;
  }
};

// 알림 상태 확인
export const getNotificationStatus = () => {
  if (!('Notification' in window)) {
    return 'not-supported';
  }

  return Notification.permission; // 'granted', 'denied', 'default'
};

// 전체 FCM 초기화
export const initializeFCM = async (userId?: string) => {
  try {
    const supported = await isFCMSupported();
    if (!supported) {
      console.warn('FCM not supported');
      return null;
    }

    const token = await generateFCMToken();
    if (token) {
      await saveFCMTokenToServer(token, userId);
      setupForegroundMessageListener();
      return token;
    }

    return null;
  } catch (error) {
    console.error('FCM initialization failed:', error);
    return null;
  }
};
