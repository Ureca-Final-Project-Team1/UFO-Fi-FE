import admin from 'firebase-admin';
import { NextRequest, NextResponse } from 'next/server';

// Firebase Admin 초기화
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      return NextResponse.json({ error: 'Firebase not configured' }, { status: 500 });
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
