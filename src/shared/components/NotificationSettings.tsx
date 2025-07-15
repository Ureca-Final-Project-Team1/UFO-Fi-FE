'use client';

import React, { useState } from 'react';

import { useNotification } from '@/hooks/useNotification';
import { showNotification } from '@/lib/fcm';
import { Button } from '@/shared/ui';

export default function NotificationSettings() {
  const {
    isSupported,
    permission,
    token,
    isLoading,
    error,
    subscribe,
    unsubscribe,
    requestPermission,
  } = useNotification();

  const [testLoading, setTestLoading] = useState(false);
  const [testError, setTestError] = useState<string | null>(null);
  const [testSuccess, setTestSuccess] = useState<string | null>(null);

  if (!isSupported) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800">이 브라우저는 푸시 알림을 지원하지 않습니다.</p>
      </div>
    );
  }

  const getPermissionText = () => {
    switch (permission) {
      case 'granted':
        return '알림이 허용되었습니다.';
      case 'denied':
        return '알림이 차단되었습니다. 브라우저 설정에서 허용해주세요.';
      default:
        return '알림 권한이 필요합니다.';
    }
  };

  const getPermissionColor = () => {
    switch (permission) {
      case 'granted':
        return 'text-green-600';
      case 'denied':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  // 브라우저 알림 테스트
  const handleTestBrowserNotification = () => {
    setTestError(null);
    setTestSuccess(null);

    try {
      showNotification(
        'UFO-FI 테스트 알림',
        '브라우저 알림이 정상적으로 작동합니다! 🚀',
        '/icons/icon-192x192.png',
      );
      setTestSuccess('브라우저 알림 테스트 완료!');
    } catch (err) {
      setTestError('브라우저 알림 테스트 실패');
      console.error('Browser notification test failed:', err);
    }
  };

  // 푸시 알림 테스트 (서버 통해서)
  const handleTestPushNotification = async () => {
    if (!token) {
      setTestError('FCM 토큰이 없습니다. 먼저 구독해주세요.');
      return;
    }

    setTestLoading(true);
    setTestError(null);
    setTestSuccess(null);

    try {
      const response = await fetch('/api/fcm/send-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          title: 'UFO-FI 푸시 알림 테스트',
          body: '서버에서 발송된 푸시 알림입니다! 🎉',
          icon: '/icons/icon-192x192.png',
        }),
      });

      if (response.ok) {
        setTestSuccess('푸시 알림 전송 완료! 잠시 후 알림을 확인해보세요.');
      } else {
        const errorData = await response.json();
        setTestError(`푸시 알림 전송 실패: ${errorData.error || '알 수 없는 오류'}`);
      }
    } catch (err) {
      setTestError('푸시 알림 전송 중 오류가 발생했습니다.');
      console.error('Push notification test failed:', err);
    } finally {
      setTestLoading(false);
    }
  };

  // 토큰 복사
  const copyToken = () => {
    if (token) {
      navigator.clipboard.writeText(token);
      setTestSuccess('토큰이 클립보드에 복사되었습니다!');
    }
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg border shadow-sm">
      <h3 className="text-xl font-semibold text-gray-900">푸시 알림 설정</h3>

      {/* 권한 상태 */}
      <div className="flex items-center space-x-3">
        <div
          className={`w-3 h-3 rounded-full ${
            permission === 'granted'
              ? 'bg-green-500'
              : permission === 'denied'
                ? 'bg-red-500'
                : 'bg-gray-400'
          }`}
        />
        <span className={`${getPermissionColor()} font-medium`}>{getPermissionText()}</span>
      </div>

      {/* 토큰 상태 */}
      <div className="space-y-2">
        <div className="text-sm text-gray-600">
          <span className="font-medium">구독 상태:</span>
          <span className={`ml-2 ${token ? 'text-green-600' : 'text-red-600'}`}>
            {token ? '구독됨' : '구독 안됨'}
          </span>
        </div>

        {token && (
          <div className="text-xs text-gray-500 space-y-1">
            <div>FCM 토큰: {token.substring(0, 50)}...</div>
            <Button onClick={copyToken} variant="secondary" size="sm">
              토큰 복사
            </Button>
          </div>
        )}
      </div>

      {/* 에러 메시지 */}
      {(error || testError) && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm">{error || testError}</p>
        </div>
      )}

      {/* 성공 메시지 */}
      {testSuccess && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 text-sm">{testSuccess}</p>
        </div>
      )}

      {/* 기본 액션 버튼들 */}
      <div className="flex flex-wrap gap-3">
        {permission === 'default' && (
          <Button onClick={requestPermission} disabled={isLoading} variant="primary" size="sm">
            {isLoading ? '요청 중...' : '알림 권한 요청'}
          </Button>
        )}

        {permission === 'granted' && !token && (
          <Button onClick={() => subscribe()} disabled={isLoading} variant="primary" size="sm">
            {isLoading ? '구독 중...' : '알림 구독'}
          </Button>
        )}

        {permission === 'granted' && token && (
          <Button onClick={unsubscribe} disabled={isLoading} variant="secondary" size="sm">
            {isLoading ? '해제 중...' : '알림 구독 해제'}
          </Button>
        )}
      </div>

      {/* 테스트 버튼들 */}
      {permission === 'granted' && (
        <div className="border-t pt-4">
          <h4 className="text-lg font-medium text-gray-800 mb-3">테스트</h4>
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleTestBrowserNotification} variant="secondary" size="sm">
              브라우저 알림 테스트
            </Button>

            {token && (
              <Button
                onClick={handleTestPushNotification}
                disabled={testLoading}
                variant="secondary"
                size="sm"
              >
                {testLoading ? '전송 중...' : '푸시 알림 테스트'}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
