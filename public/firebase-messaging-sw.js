importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyCjsd6DSSvstY2FZxypONKJT2_k0OC4W_U',
  authDomain: 'ufo-fi.firebaseapp.com',
  projectId: 'ufo-fi',
  storageBucket: 'ufo-fi.firebasestorage.app',
  messagingSenderId: '176796950226',
  appId: '1:176796950226:web:54a15f105410f70d49570b',
  measurementId: 'G-CC7MQ86YEB',
});

const messaging = firebase.messaging();

// 백그라운드 푸시 메시지 수신 처리
messaging.onBackgroundMessage((payload) => {
  // eslint-disable-next-line no-console
  console.log('Background message received:', payload);

  const { title, body } = payload.notification || {};

  // 백그라운드 알림 표시
  if (title) {
    self.registration.showNotification(title, {
      body: body || '',
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      tag: 'ufo-fi-background',
      data: payload.data,
      actions: [
        {
          action: 'open',
          title: '열기',
        },
        {
          action: 'close',
          title: '닫기',
        },
      ],
    });
  }
});

// 알림 클릭 이벤트 처리
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'open' || !event.action) {
    // 앱 열기
    event.waitUntil(clients.openWindow('/'));
  }
});
