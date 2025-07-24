import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

type QdrantPayload = {
  id: number;
  name: string;
  profile_photo_url: string;
  [key: string]: unknown;
};

type QdrantPoint = {
  id: number | string;
  score: number;
  payload?: QdrantPayload;
};

type QdrantResponse = {
  result?: QdrantPoint[];
};

export async function GET() {
  // 쿠키에서 JWT 추출
  const token = (await cookies()).get('Authorization')?.value;
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // JWT 검증 및 유저 ID 추출
    const secret = Buffer.from(process.env.JWT_SECRET!, 'base64');
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
    const userId = decoded.id ?? decoded.sub;

    // 해당 유저 정보 조회 (요금제 기반 필터링에 필요)
    const baseUser = await prisma.users.findUnique({
      where: { id: Number(userId) },
      include: {
        user_plans: { include: { plans: true } },
      },
    });

    if (!baseUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    /**
     * 아래는 Qdrant 추천 필터 강화를 위한 과거 로직입니다 (현재 주석 처리됨)
     * - oppositeType: 나와 반대되는 거래 유형
     * - carrier / mobile_data_type: 가장 많이 사용한 통신사, 데이터 유형
     * 필요 시 주석 해제 가능
     */
    const trades = await prisma.trade_histories.findMany({
      where: {
        user_id: baseUser.id,
        status: { in: ['PURCHASE', 'SALE'] },
      },
    });

    const sales = trades.filter((t) => t.status === 'SALE').length;
    const purchases = trades.filter((t) => t.status === 'PURCHASE').length;
    const type = sales >= purchases ? 'seller' : 'purchaser';
    const oppositeType = type === 'seller' ? 'purchaser' : 'seller';

    const rawPlans = baseUser.user_plans;
    const userPlans = Array.isArray(rawPlans) ? rawPlans : [];

    const carriers = userPlans.map((p) => p.plans?.carrier).filter((c): c is string => !!c);

    const carrier =
      carriers.sort((a, b) => {
        return carriers.filter((v) => v === b).length - carriers.filter((v) => v === a).length;
      })[0] ?? '';

    const types = userPlans.map((p) => p.plans?.mobile_data_type).filter((t): t is string => !!t);

    const mobile_data_type =
      types.sort((a, b) => {
        return types.filter((v) => v === b).length - types.filter((v) => v === a).length;
      })[0] ?? '';

    const followedUsers = await prisma.follows.findMany({
      where: { follower_user_id: Number(userId) },
      select: { following_user_id: true },
    });
    const followedIds = followedUsers.map((f) => f.following_user_id);

    // Qdrant의 벡터 유사도 추천 API 호출
    const qdrantUrl = `${process.env.QDRANT_API_BASE_URL}/collections/ufo_fi/points/recommend`;

    const res = await fetch(qdrantUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.QDRANT_API_KEY!,
      },
      body: JSON.stringify({
        positive: [Number(userId)], // 기준 유저 벡터
        limit: 20, // 최대 추천 수
        with_payload: true, // id, name 포함된 payload도 함께 반환
        filter: {
          must: [{ key: 'role', match: { value: 1 } }], // 일반 사용자만 추천
          should: [
            // 유사 속성 기반 추가 필터
            { key: 'type', match: { value: oppositeType } },
            { key: 'carrier', match: { value: carrier } },
            { key: 'mobile_data_type', match: { value: mobile_data_type } },
          ],
          must_not: [
            // 자기 자신, 이미 팔로우 되있는 사용자 및 정지된 사용자 제외
            { key: 'id', match: { value: Number(userId) || followedIds } },
          ],
        },
      }),
    });

    // Qdrant API 실패 시 상세 로그 출력
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Qdrant request failed: ${res.status} ${res.statusText}\n${errorText}`);
    }

    // 응답에서 추천 사용자 리스트 추출
    const data: QdrantResponse = await res.json();
    const neighbors = Array.isArray(data.result)
      ? data.result.map((point) => ({
          id: point.payload?.id,
          nickname: point.payload?.name,
          profile: point.payload?.profile_photo_url,
          score: point.score,
        }))
      : [];

    // 추천 결과 반환
    return NextResponse.json({
      neighbors,
      message: neighbors.length > 0 ? '추천 결과 반환 성공' : '추천 결과가 없습니다',
    });
  } catch (err) {
    console.error('Recommend failed:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
