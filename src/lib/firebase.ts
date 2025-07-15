import { initializeApp, getApps } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyCjsd6DSSvstY2FZxypONKJT2_k0OC4W_U',
  authDomain: 'ufo-fi.firebaseapp.com',
  projectId: 'ufo-fi',
  storageBucket: 'ufo-fi.firebasestorage.app',
  messagingSenderId: '176796950226',
  appId: '1:176796950226:web:54a15f105410f70d49570b',
  measurementId: 'G-CC7MQ86YEB',
};

// Firebase 앱 초기화
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// FCM 초기화
const messaging = typeof window !== 'undefined' ? getMessaging(app) : null;

export { messaging };
export default app;
