import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/shared/utils/getUserFromToken';

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
  try {
    // STEP 1. 인증
    const result = await getUserFromToken();
    if ('error' in result) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    const { userId } = result;

    // STEP 2. 유저 정보 + 요금제
    const baseUser = await prisma.users.findUnique({
      where: { id: Number(userId) },
      include: {
        user_plans: { include: { plans: true } },
      },
    });

    if (!baseUser) {
      return NextResponse.json({ error: '유저를 찾을 수 없습니다.' }, { status: 404 });
    }

    // STEP 3. 거래 성향 분석
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

    // STEP 4. 통신사 / 데이터유형 추출
    const rawPlans = baseUser.user_plans;
    const userPlans = Array.isArray(rawPlans) ? rawPlans : [];

    const carriers = userPlans
      .map((p) => p.plans?.carrier)
      .filter((c): c is string => typeof c === 'string');
    const carrier =
      carriers.sort(
        (a, b) => carriers.filter((v) => v === b).length - carriers.filter((v) => v === a).length,
      )[0] ?? '';

    const types = userPlans
      .map((p) => p.plans?.mobile_data_type)
      .filter((t): t is string => typeof t === 'string');
    const mobile_data_type =
      types.sort(
        (a, b) => types.filter((v) => v === b).length - types.filter((v) => v === a).length,
      )[0] ?? '';

    // STEP 5. 팔로우 중인 유저 제외
    const followedUsers = await prisma.follows.findMany({
      where: { follower_user_id: Number(userId) },
      select: { following_user_id: true },
    });
    const followedIds = followedUsers.map((f) => Number(f.following_user_id));

    // STEP 6. Qdrant 요청
    const qdrantUrl = `${process.env.QDRANT_API_BASE_URL}/collections/ufo_fi/points/recommend`;

    const qdrantRes = await fetch(qdrantUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.QDRANT_API_KEY!,
      },
      body: JSON.stringify({
        positive: [Number(userId)],
        limit: 20,
        with_payload: true,
        filter: {
          must: [{ key: 'role', match: { value: 1 } }],
          must_not: [
            { key: 'id', match: { value: Number(userId) } },
            ...followedIds.map((id) => ({ key: 'id', match: { value: id } })),
          ],
          should: [
            { key: 'type', match: { value: oppositeType } },
            { key: 'carrier', match: { value: carrier } },
            { key: 'mobile_data_type', match: { value: mobile_data_type } },
          ],
        },
      }),
    });

    if (!qdrantRes.ok) {
      const errorText = await qdrantRes.text();
      console.error('Qdrant Error: ', qdrantRes.status, errorText);
      throw new Error(`Qdrant 요청 실패: ${qdrantRes.status} ${qdrantRes.statusText}`);
    }

    let data: QdrantResponse;
    try {
      data = await qdrantRes.json();
    } catch (parseErr) {
      console.error('Qdrant 응답 JSON 파싱 실패: ', parseErr);
      throw new Error('Qdrant 응답이 올바른 JSON 형식이 아닙니다.');
    }

    const neighbors = Array.isArray(data.result)
      ? data.result.map((point) => ({
          id: point.payload?.id,
          nickname: point.payload?.name,
          profile: point.payload?.profile_photo_url,
          score: point.score,
        }))
      : [];

    return NextResponse.json({
      neighbors,
      message: neighbors.length > 0 ? '추천 결과 반환 성공' : '추천 결과가 없습니다',
    });
  } catch (err: unknown) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      console.error('[Prisma Known Error]', err.message);
      return NextResponse.json({ error: '데이터 처리 중 오류가 발생했습니다.' }, { status: 500 });
    }

    if (err instanceof Prisma.PrismaClientUnknownRequestError) {
      console.error('[Prisma Unknown Error]', err.message);
      return NextResponse.json({ error: '알 수 없는 데이터베이스 오류입니다.' }, { status: 500 });
    }

    if (err instanceof Error) {
      console.error('[Server Error]', err.stack || err.message);
      return NextResponse.json({ error: '서버 내부 오류가 발생했습니다.' }, { status: 500 });
    }

    console.error('[Unhandled Error]', err);
    return NextResponse.json({ error: '예기치 못한 오류가 발생했습니다.' }, { status: 500 });
  }
}
