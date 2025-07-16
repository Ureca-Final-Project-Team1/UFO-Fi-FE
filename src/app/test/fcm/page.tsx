'use client';

import { useState, useEffect } from 'react';

import { generateFCMToken, showNotification, getNotificationStatus } from '@/lib/fcm';

export default function FCMTestPage() {
  const [token, setToken] = useState<string>('');
  const [permission, setPermission] = useState<string>('default');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    setPermission(getNotificationStatus());
  }, []);

  const handleGetToken = async () => {
    setLoading(true);
    setMessage('토큰 생성 중...');

    try {
      const newToken = await generateFCMToken();
      if (newToken) {
        setToken(newToken);
        setMessage('토큰 생성 완료!');
      } else {
        setMessage('토큰 생성 실패');
      }
    } catch (error) {
      setMessage(`오류: ${error}`);
    }

    setLoading(false);
  };

  const handleBrowserTest = () => {
    showNotification('테스트 알림', '브라우저 알림 테스트입니다!');
    setMessage('브라우저 알림 전송됨');
  };

  const handlePushTest = async () => {
    if (!token) {
      setMessage('토큰이 없습니다. 먼저 토큰을 생성하세요.');
      return;
    }

    setLoading(true);
    setMessage('푸시 알림 전송 중...');

    try {
      const response = await fetch('/api/fcm/send-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          title: 'UFO-FI 테스트',
          body: '푸시 알림 테스트입니다! 🚀',
        }),
      });

      if (response.ok) {
        setMessage('푸시 알림 전송 완료!');
      } else {
        setMessage('푸시 알림 전송 실패');
      }
    } catch (error) {
      setMessage(`오류: ${error}`);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>FCM 테스트</h1>

      <div style={{ margin: '20px 0', padding: '10px', border: '1px solid #ccc' }}>
        <p>
          알림 권한: <strong>{permission}</strong>
        </p>
        <p>FCM 토큰: {token ? '생성됨' : '없음'}</p>
        {token && (
          <textarea
            value={token}
            readOnly
            style={{ width: '100%', height: '60px', fontSize: '10px' }}
          />
        )}
      </div>

      <div style={{ margin: '10px 0' }}>
        <button
          onClick={handleGetToken}
          disabled={loading}
          style={{
            padding: '10px 20px',
            margin: '5px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? '처리중...' : 'FCM 토큰 생성'}
        </button>

        <button
          onClick={handleBrowserTest}
          disabled={permission !== 'granted'}
          style={{
            padding: '10px 20px',
            margin: '5px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: permission !== 'granted' ? 'not-allowed' : 'pointer',
          }}
        >
          브라우저 알림 테스트
        </button>

        <button
          onClick={handlePushTest}
          disabled={!token || loading}
          style={{
            padding: '10px 20px',
            margin: '5px',
            backgroundColor: '#ffc107',
            color: 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: !token || loading ? 'not-allowed' : 'pointer',
          }}
        >
          푸시 알림 테스트
        </button>
      </div>

      {message && (
        <div
          style={{
            margin: '20px 0',
            padding: '10px',
            border: '1px solid #dee2e6',
            borderRadius: '4px',
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}
