import { NextResponse } from 'next/server';

import { HttpStatusCode, SuccessApiResponse, ErrorApiResponse } from '@/backend/types/api';
import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/shared/utils/getUserFromToken';

export async function GET() {
  try {
    const result = await getUserFromToken();
    if ('error' in result) {
      const response: ErrorApiResponse = {
        statusCode: result.status ?? HttpStatusCode.UNAUTHORIZED,
        message: result.error ?? '인증 오류',
      };
      return NextResponse.json(response, { status: response.statusCode });
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

    const response: SuccessApiResponse<{
      notifications: typeof serializedNotifications;
      unreadCount: number;
    }> = {
      statusCode: HttpStatusCode.OK,
      message: 'OK',
      content: {
        notifications: serializedNotifications,
        unreadCount,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Notification fetch error:', error);
    const response: ErrorApiResponse = {
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
    };
    return NextResponse.json(response, { status: response.statusCode });
  }
}

export async function PATCH() {
  try {
    const result = await getUserFromToken();
    if ('error' in result) {
      const response: ErrorApiResponse = {
        statusCode: result.status ?? HttpStatusCode.UNAUTHORIZED,
        message: result.error ?? '인증 오류',
      };
      return NextResponse.json(response, { status: response.statusCode });
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

    const response: SuccessApiResponse<{ success: boolean; updatedCount: number }> = {
      statusCode: HttpStatusCode.OK,
      message: 'All notifications marked as read',
      content: {
        success: true,
        updatedCount: count,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Mark all read error:', error);
    const response: ErrorApiResponse = {
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
    };
    return NextResponse.json(response, { status: response.statusCode });
  }
}
