import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// TODO: Mock 데이터, 일단 임시로 이렇게 해놓겠습니다.
const mockNotifications = [
  {
    id: '1',
    type: 'SELL' as const,
    title: '데이터가 판매되었습니다',
    content: '5GB 데이터가 성공적으로 판매되었습니다.',
    url: '/mypage/trade',
    notifiedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    isRead: false,
  },
  {
    id: '2',
    type: 'INTERESTED_POST' as const,
    title: '관심 상품에 새 글이 등록되었어요',
    content: 'SKT 10GB 데이터가 저렴한 가격에 등록되었습니다.',
    url: '/exchange',
    notifiedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    isRead: true,
  },
];

let notificationStore = [...mockNotifications];

export async function GET() {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('Authorization');

    if (!authToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const unreadCount = notificationStore.filter((n) => !n.isRead).length;

    return NextResponse.json({
      statusCode: 200,
      message: 'OK',
      content: {
        notifications: notificationStore.sort(
          (a, b) => new Date(b.notifiedAt).getTime() - new Date(a.notifiedAt).getTime(),
        ),
        unreadCount,
      },
    });
  } catch (error) {
    console.error('Notification fetch error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// 모든 알림 읽음 처리
export async function PATCH() {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('Authorization');

    if (!authToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 모든 알림을 읽음 처리
    const updatedCount = notificationStore.filter((n) => !n.isRead).length;
    notificationStore = notificationStore.map((notification) => ({
      ...notification,
      isRead: true,
    }));

    return NextResponse.json({
      statusCode: 200,
      message: 'All notifications marked as read',
      content: {
        success: true,
        updatedCount,
      },
    });
  } catch (error) {
    console.error('Mark all read error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
