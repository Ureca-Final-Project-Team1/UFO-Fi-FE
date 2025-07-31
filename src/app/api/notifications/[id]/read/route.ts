import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('Authorization');

    if (!authToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    return NextResponse.json({
      statusCode: 200,
      message: 'Notification marked as read',
      content: {
        success: true,
        notificationId: id,
      },
    });
  } catch (error) {
    console.error('Mark notification read error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// src/app/api/notifications/unread-count/route.ts
export async function GET() {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('Authorization');

    if (!authToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 실제로는 데이터베이스에서 읽지 않은 알림 개수 조회
    const unreadCount = 2; // Mock 데이터

    return NextResponse.json({
      statusCode: 200,
      message: 'OK',
      content: {
        unreadCount,
      },
    });
  } catch (error) {
    console.error('Unread count fetch error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
