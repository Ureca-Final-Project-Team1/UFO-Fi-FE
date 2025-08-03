import { NextRequest, NextResponse } from 'next/server';

import { SuccessApiResponse, ErrorApiResponse } from '@/backend';
import { HttpStatusCode } from '@/backend/types/api';
import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/utils/getUserFromToken';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
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
    const { id } = await params;

    await prisma.notification_histories.update({
      where: {
        id: BigInt(id),
        user_id: userId,
      },
      data: {
        is_read: true,
      },
    });

    const response: SuccessApiResponse<{ success: boolean; notificationId: string }> = {
      statusCode: HttpStatusCode.OK,
      message: 'Notification marked as read',
      content: {
        success: true,
        notificationId: id,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Mark notification read error:', error);
    const response: ErrorApiResponse = {
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
    };
    return NextResponse.json(response, { status: response.statusCode });
  }
}

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

    const unreadCount = await prisma.notification_histories.count({
      where: {
        user_id: userId,
        is_read: false,
      },
    });

    const response: SuccessApiResponse<{ unreadCount: number }> = {
      statusCode: HttpStatusCode.OK,
      message: 'OK',
      content: { unreadCount },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Unread count fetch error:', error);
    const response: ErrorApiResponse = {
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
    };
    return NextResponse.json(response, { status: response.statusCode });
  }
}
