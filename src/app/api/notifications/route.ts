import { NextResponse } from 'next/server';

import { API_SELF_URL } from '@/constants';
import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/shared/utils/getUserFromToken';

// CORS 설정을 위한 정확한 origin 도메인
const ORIGIN = API_SELF_URL;

// 프리플라이트 요청 처리
export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': ORIGIN,
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

// 알림 전체 조회
export async function GET() {
  try {
    const result = await getUserFromToken();
    if ('error' in result) {
      const res = NextResponse.json(
        { success: false, error: result.error ?? '인증 오류' },
        { status: result.status ?? 401 },
      );
      res.headers.set('Access-Control-Allow-Origin', ORIGIN);
      res.headers.set('Access-Control-Allow-Credentials', 'true');
      return res;
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

    const res = NextResponse.json({
      success: true,
      content: {
        notifications: serializedNotifications,
        unreadCount,
      },
    });
    res.headers.set('Access-Control-Allow-Origin', ORIGIN);
    res.headers.set('Access-Control-Allow-Credentials', 'true');
    return res;
  } catch (error) {
    console.error('Notification fetch error:', error);
    const res = NextResponse.json(
      { success: false, error: '알림 조회 중 오류가 발생했습니다.' },
      { status: 500 },
    );
    res.headers.set('Access-Control-Allow-Origin', ORIGIN);
    res.headers.set('Access-Control-Allow-Credentials', 'true');
    return res;
  }
}

// 알림 전체 읽음 처리
export async function PATCH() {
  try {
    const result = await getUserFromToken();
    if ('error' in result) {
      const res = NextResponse.json(
        { success: false, error: result.error ?? '인증 오류' },
        { status: result.status ?? 401 },
      );
      res.headers.set('Access-Control-Allow-Origin', ORIGIN);
      res.headers.set('Access-Control-Allow-Credentials', 'true');
      return res;
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

    const res = NextResponse.json({
      success: true,
      content: {
        updatedCount: count,
      },
    });
    res.headers.set('Access-Control-Allow-Origin', ORIGIN);
    res.headers.set('Access-Control-Allow-Credentials', 'true');
    return res;
  } catch (error) {
    console.error('Mark all read error:', error);
    const res = NextResponse.json(
      { success: false, error: '알림 읽음 처리 중 오류가 발생했습니다.' },
      { status: 500 },
    );
    res.headers.set('Access-Control-Allow-Origin', ORIGIN);
    res.headers.set('Access-Control-Allow-Credentials', 'true');
    return res;
  }
}
