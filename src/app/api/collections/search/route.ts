import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

type QdrantPayload = {
  id?: number;
  name?: string;
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

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('id');
  if (!userId) {
    return NextResponse.json({ error: 'Missing user ID' }, { status: 400 });
  }

  try {
    const baseUser = await prisma.users.findUnique({
      where: { id: Number(userId) },
      include: {
        user_plans: { include: { plans: true } },
      },
    });

    if (!baseUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // const trades = await prisma.trade_histories.findMany({
    //   where: {
    //     user_id: baseUser.id,
    //     status: { in: ['PURCHASE', 'SALE'] },
    //   },
    // });

    // const sales = trades.filter((t) => t.status === 'SALE').length;
    // const purchases = trades.filter((t) => t.status === 'PURCHASE').length;
    // const type = sales >= purchases ? 'seller' : 'purchaser';
    // const oppositeType = type === 'seller' ? 'purchaser' : 'seller';

    // const userPlans = baseUser.user_plans ?? [];

    // const carriers = userPlans.map((p) => p.plans?.carrier).filter((c): c is string => !!c);

    // const carrier =
    //   carriers.sort((a, b) => {
    //     return carriers.filter((v) => v === b).length - carriers.filter((v) => v === a).length;
    //   })[0] ?? '';

    // const types = userPlans.map((p) => p.plans?.mobile_data_type).filter((t): t is string => !!t);

    // const mobile_data_type =
    //   types.sort((a, b) => {
    //     return types.filter((v) => v === b).length - types.filter((v) => v === a).length;
    //   })[0] ?? '';

    const qdrantUrl = `${process.env.QDRANT_API_BASE_URL}/collections/ufo_fi/points/recommend`;

    const res = await fetch(qdrantUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.QDRANT_API_KEY!,
      },
      body: JSON.stringify({
        positive: [Number(userId)],
        limit: 5,
        with_payload: true,
        filter: {
          must: [{ key: 'role', match: { value: 1 } }],
          // should: [
          //   { key: 'type', match: { value: oppositeType } },
          //   { key: 'carrier', match: { value: carrier } },
          //   { key: 'mobile_data_type', match: { value: mobile_data_type } },
          // ],
          must_not: [{ key: 'id', match: { value: Number(userId) } }],
        },
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Qdrant request failed: ${res.status} ${res.statusText}\n${errorText}`);
    }

    const data: QdrantResponse = await res.json();
    const neighbors = Array.isArray(data.result)
      ? data.result.map((point) => ({
          id: point.payload?.id ?? point.id,
          name: point.payload?.name ?? null,
          score: point.score,
        }))
      : [];

    return NextResponse.json({
      neighbors,
      message: neighbors.length > 0 ? '✅ 추천 결과 반환 성공' : '⚠️ 추천 결과가 없습니다',
    });
  } catch (err) {
    console.error('Recommend failed:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
