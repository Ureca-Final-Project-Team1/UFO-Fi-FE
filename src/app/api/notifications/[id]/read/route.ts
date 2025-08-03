import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/utils/getUserFromToken';

interface RouteParams {
  params: { id: string };
}

const initialUpdateAchievementResponse = {
  statusCode: 0,
  message: '',
  content: null,
};

export async function PATCH(request: NextRequest, { params }: RouteParams) {
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
    const { id } = params;

    await prisma.notification_histories.update({
      where: {
        id: BigInt(id),
        user_id: userId,
      },
      data: {
        is_read: true,
      },
    });

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

// src/app/api/notifications/unread-count/route.ts
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

    const unreadCount = await prisma.notification_histories.count({
      where: {
        user_id: userId,
        is_read: false,
      },
    });

    return NextResponse.json({
      statusCode: 200,
      message: 'OK',
      content: {
        unreadCount,
      },
    });
  } catch (error) {
    console.error('Unread count fetch error:', error);
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
