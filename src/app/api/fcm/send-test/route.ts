import admin from 'firebase-admin';
import { NextRequest, NextResponse } from 'next/server';

// Firebase Admin 초기화
if (!admin.apps.length) {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  // 모든 환경변수가 있을 때만 초기화
  if (projectId && clientEmail && privateKey) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
  } else {
    console.warn('Firebase Admin credentials not available - skipping initialization');
  }
}

export async function POST(request: NextRequest) {
  try {
    // 환경변수 체크
    if (!process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
      return NextResponse.json(
        {
          error: 'Firebase Admin not configured for this environment',
        },
        { status: 500 },
      );
    }

    const { token, title, body } = await request.json();

    if (!token) {
      return NextResponse.json({ error: 'Token required' }, { status: 400 });
    }

    const message = {
      token,
      notification: {
        title: title || 'Test Notification',
        body: body || 'This is a test message',
      },
      data: {
        timestamp: new Date().toISOString(),
      },
    };

    const response = await admin.messaging().send(message);
    return NextResponse.json({ success: true, messageId: response });
  } catch (error) {
    console.error('FCM Error:', error);
    return NextResponse.json({ error: 'Send failed' }, { status: 500 });
  }
}
