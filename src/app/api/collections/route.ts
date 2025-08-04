import dayjs from 'dayjs';
import { NextResponse } from 'next/server';

import { API_SELF_URL } from '@/constants';
import { prisma } from '@/lib/prisma';
import { qdrantClient } from '@/lib/qdrantClient';
import { createQdrantFieldIndex } from '@/lib/qdrantFieldIndex';
import { getVectorFromProfile } from '@/lib/vectorizer';

// CORS 설정을 위한 정확한 origin 도메인
const ORIGIN = API_SELF_URL;

// OPTIONS: 프리플라이트 요청
export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': ORIGIN,
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function POST() {
  const COLLECTION_NAME = 'ufo_fi';

  try {
    // Step 1. Qdrant 컬렉션 확인
    try {
      const collections = await qdrantClient.getCollections();
      const exists = collections.collections.some((col) => col.name === COLLECTION_NAME);

      if (!exists) {
        await qdrantClient.createCollection(COLLECTION_NAME, {
          vectors: { size: 4, distance: 'Euclid' },
        });

        await Promise.all([
          createQdrantFieldIndex('id', 'integer'),
          createQdrantFieldIndex('name', 'keyword'),
          createQdrantFieldIndex('role', 'integer'),
          createQdrantFieldIndex('type', 'keyword'),
          createQdrantFieldIndex('carrier', 'keyword'),
          createQdrantFieldIndex('mobile_data_type', 'keyword'),
        ]);
      }
    } catch (err) {
      console.error('Qdrant 컬렉션 생성 실패: ', err);
      const res = NextResponse.json(
        { success: false, error: 'Qdrant 초기화 실패' },
        { status: 500 },
      );
      res.headers.set('Access-Control-Allow-Origin', ORIGIN);
      res.headers.set('Access-Control-Allow-Credentials', 'true');
      return res;
    }

    // Step 2. 유저 조회
    let users;
    try {
      users = await prisma.users.findMany({
        where: { role: { in: ['ROLE_USER', 'ROLE_REPORTED'] } },
        include: {
          trade_histories: {
            where: { created_at: { gte: dayjs().subtract(7, 'day').toDate() } },
          },
          profile_photo: { select: { profile_photo_url: true } },
          trade_posts: true,
        },
      });
    } catch (err) {
      console.error('Prisma 조회 실패: ', err);
      const res = NextResponse.json(
        { success: false, error: '유저 데이터 조회 실패' },
        { status: 500 },
      );
      res.headers.set('Access-Control-Allow-Origin', ORIGIN);
      res.headers.set('Access-Control-Allow-Credentials', 'true');
      return res;
    }

    // Step 3. 포인트 생성
    const points = users
      .map((user) => {
        try {
          const trades = user.trade_histories;
          const posts = user.trade_posts;
          const profile = user.profile_photo?.profile_photo_url ?? '';

          const sales = trades.filter((t) => t.status === 'SALE').length;
          const purchases = trades.filter((t) => t.status === 'PURCHASE').length;
          const type = sales >= purchases ? 'seller' : 'purchaser';

          const zetValues = posts.map((p) => p.zet_per_unit).filter((v): v is number => v !== null);
          const avg_zet =
            zetValues.length > 0
              ? +(zetValues.reduce((a, b) => a + b, 0) / zetValues.length).toFixed(2)
              : 0;

          const gbValues = posts
            .map((p) => p.sell_mobile_data_capacity_gb)
            .filter((v): v is number => v !== null);
          const data_gb =
            gbValues.length > 0
              ? +(gbValues.reduce((a, b) => a + b, 0) / gbValues.length).toFixed(2)
              : 0;

          const trade_frequency = trades.length;

          const lastPostDate = posts.reduce<Date | null>((latest, post) => {
            if (!post.created_at) return latest;
            return !latest || post.created_at > latest ? post.created_at : latest;
          }, null);
          const recent_post_days = lastPostDate ? dayjs().diff(lastPostDate, 'day') : 30;

          const dayTradeCount = trades.filter((t) => {
            const hour = dayjs(t.created_at).hour();
            return hour >= 6 && hour < 18;
          }).length;
          const dominant_trade_time =
            dayTradeCount >= trade_frequency - dayTradeCount ? 'day' : 'night';

          const carrierCount: Record<string, number> = {};
          const dataTypeCount: Record<string, number> = {};
          posts.forEach((post) => {
            if (post.carrier) carrierCount[post.carrier] = (carrierCount[post.carrier] || 0) + 1;
            if (post.mobile_data_type)
              dataTypeCount[post.mobile_data_type] =
                (dataTypeCount[post.mobile_data_type] || 0) + 1;
          });
          const carrier = Object.entries(carrierCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '';
          const rawMobileType =
            Object.entries(dataTypeCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '';
          const mobile_data_type = rawMobileType === 'G' ? '5G' : rawMobileType;

          const vector = getVectorFromProfile({
            avg_zet,
            data_gb,
            trade_frequency,
            recent_post_days,
          });

          return {
            id: Number(user.id),
            vector,
            payload: {
              id: user.id,
              name: user.name ?? 'Unknown',
              role: user.role === 'ROLE_REPORTED' ? 0 : 1,
              type,
              carrier,
              mobile_data_type,
              profile_photo_url: profile,
              dominant_trade_time,
            },
          };
        } catch (err) {
          console.warn(`포인트 생성 실패 userId=${user.id}: `, err);
          return null;
        }
      })
      .filter((p): p is NonNullable<typeof p> => !!p);

    if (points.length === 0) {
      const res = NextResponse.json(
        { success: false, error: '업서트할 벡터가 없습니다.' },
        { status: 400 },
      );
      res.headers.set('Access-Control-Allow-Origin', ORIGIN);
      res.headers.set('Access-Control-Allow-Credentials', 'true');
      return res;
    }

    // Step 4. Qdrant 업서트
    try {
      await qdrantClient.upsert(COLLECTION_NAME, { points });
    } catch (err) {
      console.error('Qdrant 업서트 실패: ', err);
      const res = NextResponse.json(
        { success: false, error: 'Qdrant 업서트 실패' },
        { status: 500 },
      );
      res.headers.set('Access-Control-Allow-Origin', ORIGIN);
      res.headers.set('Access-Control-Allow-Credentials', 'true');
      return res;
    }

    const res = NextResponse.json({ success: true });
    res.headers.set('Access-Control-Allow-Origin', ORIGIN);
    res.headers.set('Access-Control-Allow-Credentials', 'true');
    return res;
  } catch (err) {
    console.error('Qdrant 시딩 전체 실패: ', err);
    const res = NextResponse.json({ success: false, error: '시딩 실패' }, { status: 500 });
    res.headers.set('Access-Control-Allow-Origin', ORIGIN);
    res.headers.set('Access-Control-Allow-Credentials', 'true');
    return res;
  }
}
