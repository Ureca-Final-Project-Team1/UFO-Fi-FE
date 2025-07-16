import { useState, useEffect, useCallback } from 'react';

import {
  generateFCMToken,
  setupForegroundMessageListener,
  getNotificationStatus,
  isFCMSupported,
  saveFCMTokenToServer,
  deleteFCMTokenFromServer,
  requestNotificationPermission,
} from '@/lib/fcm';

export function useNotification() {
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 초기화
  useEffect(() => {
    const init = async () => {
      // FCM 지원 여부 확인
      const supported = await isFCMSupported();
      setIsSupported(supported);

      // 알림 권한 상태 확인
      const currentPermission = getNotificationStatus();
      setPermission(currentPermission as NotificationPermission);

      // 포그라운드 메시지 리스너 설정
      if (supported) {
        setupForegroundMessageListener();
      }
    };

    init();
  }, []);

  // 권한 요청
  const requestPermission = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const granted: boolean = await requestNotificationPermission();
      const newPermission = getNotificationStatus();
      setPermission(newPermission as NotificationPermission);

      if (!granted) {
        setError('알림 권한이 거부되었습니다.');
      }
    } catch (err) {
      setError('권한 요청 중 오류가 발생했습니다.');
      console.error('Permission request failed:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 알림 구독
  const subscribe = useCallback(async (userId?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const newToken = await generateFCMToken();

      if (newToken) {
        // 서버에 토큰 저장
        await saveFCMTokenToServer(newToken, userId);
        setToken(newToken);
      } else {
        setError('FCM 토큰 생성에 실패했습니다.');
      }
    } catch (err) {
      setError('구독 중 오류가 발생했습니다.');
      console.error('Subscription failed:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 알림 구독 해제
  const unsubscribe = useCallback(async () => {
    if (!token) return;

    setIsLoading(true);
    setError(null);

    try {
      // 서버에서 토큰 삭제
      await deleteFCMTokenFromServer(token);
      setToken(null);
    } catch (err) {
      setError('구독 해제 중 오류가 발생했습니다.');
      console.error('Unsubscription failed:', err);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  return {
    isSupported,
    permission,
    token,
    isLoading,
    error,
    subscribe,
    unsubscribe,
    requestPermission,
  };
}
