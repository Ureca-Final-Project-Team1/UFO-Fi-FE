import { initializeApp, getApps } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
};

// Firebase 앱 초기화
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// FCM 초기화
const messaging = typeof window !== 'undefined' ? getMessaging(app) : null;

export { messaging };
export default app;
