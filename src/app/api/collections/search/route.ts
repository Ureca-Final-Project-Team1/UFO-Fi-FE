import { NextResponse } from 'next/server';

import { API_SELF_URL } from '@/constants';
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

// CORS 설정을 위한 정확한 origin 도메인
const ORIGIN = API_SELF_URL;

// OPTIONS: 프리플라이트 요청
export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': ORIGIN,
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function GET() {
  try {
    const result = await getUserFromToken();
    if ('error' in result) {
      const res = NextResponse.json(
        { success: false, error: result.error },
        { status: result.status ?? 401 },
      );
      res.headers.set('Access-Control-Allow-Origin', ORIGIN);
      res.headers.set('Access-Control-Allow-Credentials', 'true');
      return res;
    }

    const { userId } = result;

    const baseUser = await prisma.users.findUnique({
      where: { id: Number(userId) },
      include: { user_plans: { include: { plans: true } } },
    });

    if (!baseUser) {
      const res = NextResponse.json(
        { success: false, error: '유저를 찾을 수 없습니다.' },
        { status: 404 },
      );
      res.headers.set('Access-Control-Allow-Origin', ORIGIN);
      res.headers.set('Access-Control-Allow-Credentials', 'true');
      return res;
    }

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

    const followedUsers = await prisma.follows.findMany({
      where: { follower_user_id: Number(userId) },
      select: { following_user_id: true },
    });
    const followedIds = followedUsers.map((f) => Number(f.following_user_id));

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

    const res = NextResponse.json({
      success: true,
      content: {
        neighbors,
        message: neighbors.length > 0 ? '추천 결과 반환 성공' : '추천 결과가 없습니다',
      },
    });
    res.headers.set('Access-Control-Allow-Origin', ORIGIN);
    res.headers.set('Access-Control-Allow-Credentials', 'true');
    return res;
  } catch (err: unknown) {
    console.error('[GET /collections/search] error:', err);

    const res = NextResponse.json(
      { success: false, error: '서버 내부 오류가 발생했습니다.' },
      { status: 500 },
    );
    res.headers.set('Access-Control-Allow-Origin', ORIGIN);
    res.headers.set('Access-Control-Allow-Credentials', 'true');
    return res;
  }
}
