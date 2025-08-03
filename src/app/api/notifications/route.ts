import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/utils/getUserFromToken';

const initialUpdateAchievementResponse = {
  statusCode: 0,
  message: '',
  content: null,
};

export async function GET() {
  try {
    const result = await getUserFromToken();
    if ('error' in result) {
      return NextResponse.json(
        {
          ...initialUpdateAchievementResponse,
          statusCode: result.status ?? 401,
          message: result.error ?? '인증 오류',
        },
        { status: result.status ?? 401 },
      );
    }

    const { userId } = result;

    const notificationStore = await prisma.notification_histories.findMany({
      where: { user_id: userId },
      orderBy: { notified_at: 'desc' },
    });

    const unreadCount = notificationStore.filter((n) => !n.is_read).length;

    const serializedNotifications = notificationStore.map((n) => ({
      id: n.id.toString(),
      type: n.notification_type ?? 'SELL',
      title: n.title ?? '',
      content: n.content ?? '',
      url: n.url ?? '',
      notifiedAt: n.notified_at?.toISOString() ?? '',
      isRead: n.is_read,
    }));

    return NextResponse.json({
      statusCode: 200,
      message: 'OK',
      content: {
        notifications: serializedNotifications,
        unreadCount,
      },
    });
  } catch (error) {
    console.error('Notification fetch error:', error);
    return NextResponse.json(
      {
        ...initialUpdateAchievementResponse,
        statusCode: 500,
        message: 'Internal Server Error',
      },
      { status: 500 },
    );
  }
}

export async function PATCH() {
  try {
    const result = await getUserFromToken();
    if ('error' in result) {
      return NextResponse.json(
        {
          ...initialUpdateAchievementResponse,
          statusCode: result.status ?? 401,
          message: result.error ?? '인증 오류',
        },
        { status: result.status ?? 401 },
      );
    }

    const { userId } = result;

    const { count } = await prisma.notification_histories.updateMany({
      where: {
        user_id: userId,
        is_read: false,
      },
      data: {
        is_read: true,
      },
    });

    return NextResponse.json({
      statusCode: 200,
      message: 'All notifications marked as read',
      content: {
        success: true,
        updatedCount: count,
      },
    });
  } catch (error) {
    console.error('Mark all read error:', error);
    return NextResponse.json(
      {
        ...initialUpdateAchievementResponse,
        statusCode: 500,
        message: 'Internal Server Error',
      },
      { status: 500 },
    );
  }
}
