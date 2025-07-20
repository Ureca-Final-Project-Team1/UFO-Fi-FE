import dayjs from 'dayjs';

import { prisma } from '@/lib/prisma';
import { qdrantClient } from '@/lib/qdrantClient';
import { getVectorFromProfile } from '@/lib/vectorizer';

export async function DELETE() {
  try {
    await qdrantClient.deleteCollection('ufo_fi');
    console.log('컬렉션 삭제 완료');
    return Response.json({ success: true, message: '컬렉션 삭제 완료' });
  } catch (err) {
    console.error('컬렉션 삭제 실패:', err);
    return Response.json({ error: 'Failed to delete collection' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const list = await qdrantClient.getCollections();

    const collections = await Promise.all(
      list.collections.map(async ({ name }) => {
        const info = await qdrantClient.getCollection(name);
        const vectors = info.config?.params?.vectors;

        let size = null;
        let distance = null;

        if (vectors && 'default' in vectors && vectors.default) {
          size = vectors.default.size;
          distance = vectors.default.distance;
        } else if (vectors && 'size' in vectors && 'distance' in vectors) {
          size = vectors.size;
          distance = vectors.distance;
        }

        return {
          name,
          status: info.status,
          indexed_vectors_count: info.indexed_vectors_count ?? 0,
          size,
          distance,
        };
      }),
    );

    return Response.json({ collections });
  } catch (err) {
    console.error('컬렉션 조회 실패:', err);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function POST() {
  try {
    const collections = await qdrantClient.getCollections();
    const exists = collections.collections.some((col) => col.name === 'ufo_fi');
    if (exists) {
      await qdrantClient.deleteCollection('ufo_fi');
      console.log('기존 컬렉션 삭제 완료');
    }

    await qdrantClient.createCollection('ufo_fi', {
      vectors: {
        size: 4,
        distance: 'Euclid',
      },
    });
    console.log('컬렉션 생성 완료');

    await fetch(`${process.env.QDRANT_API_BASE_URL}/collections/ufo_fi/payload_schema`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.QDRANT_API_KEY && {
          'api-key': process.env.QDRANT_API_KEY,
        }),
      },
      body: JSON.stringify({
        id: { type: 'integer', index: true },
        name: { type: 'keyword' },
        role: { type: 'integer', index: true },
        type: { type: 'keyword', index: true },
        carrier: { type: 'keyword', index: true },
        mobile_data_type: { type: 'keyword', index: true },
      }),
    });
    console.log('필드 스키마 및 인덱스 설정 완료');

    const users = await prisma.users.findMany({
      where: {
        role: { in: ['ROLE_USER', 'ROLE_REPORTED'] },
        is_active: true,
      },
      include: {
        profile_photo: true,
        user_plans: { include: { plans: true } },
        trade_histories: {
          where: {
            status: { in: ['PURCHASE', 'SALE'] },
            created_at: { gte: dayjs().subtract(7, 'day').toDate() },
          },
        },
        trade_posts: true,
      },
    });

    const points = users.map((user) => {
      const trades = user.trade_histories ?? [];
      const posts = user.trade_posts ?? [];

      const sales = trades.filter((t) => t.status === 'SALE').length;
      const purchases = trades.filter((t) => t.status === 'PURCHASE').length;
      const type = sales >= purchases ? 'seller' : 'purchaser';

      const zetValues = posts.map((p) => p.zet_per_unit).filter((v): v is number => v !== null);
      const avg_zet = zetValues.length
        ? Number((zetValues.reduce((a, b) => a + b) / zetValues.length).toFixed(2))
        : 0;

      const gbValues = posts
        .map((p) => p.sell_mobile_data_capacity_gb)
        .filter((v): v is number => v !== null);
      const data_gb = gbValues.length
        ? Number((gbValues.reduce((a, b) => a + b) / gbValues.length).toFixed(2))
        : 0;

      const trade_frequency = trades.length;

      const lastTradeDate = trades.reduce(
        (latest, t) => {
          if (!t.created_at) return latest;
          return !latest || t.created_at > latest ? t.created_at : latest;
        },
        null as Date | null,
      );
      const last_trade_diff_days = lastTradeDate ? dayjs().diff(lastTradeDate, 'day') : null;

      const carrierCount: Record<string, number> = {};
      const dataTypeCount: Record<string, number> = {};

      const userPlans = Array.isArray(user.user_plans)
        ? user.user_plans
        : [user.user_plans].filter(Boolean);

      userPlans.forEach((plan) => {
        const carrier = plan?.plans?.carrier;
        const dataType = plan?.plans?.mobile_data_type;
        if (carrier) carrierCount[carrier] = (carrierCount[carrier] || 0) + 1;
        if (dataType) dataTypeCount[dataType] = (dataTypeCount[dataType] || 0) + 1;
      });

      const carrier = Object.entries(carrierCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '';
      const mobile_data_type_raw = Object.entries(dataTypeCount).sort(
        (a, b) => b[1] - a[1],
      )[0]?.[0];
      const mobile_data_type = mobile_data_type_raw === 'G' ? '5G' : (mobile_data_type_raw ?? '');

      const vector = getVectorFromProfile({
        avg_zet,
        data_gb,
        trade_frequency,
        last_trade_diff_days,
      });

      return {
        id: Number(user.id),
        vector,
        payload: {
          id: Number(user.id),
          name: user.name ?? 'Unknown',
          role: user.role === 'ROLE_REPORTED' ? 0 : 1,
          type,
          carrier,
          mobile_data_type,
        },
      };
    });

    await qdrantClient.upsert('ufo_fi', { points });
    console.log('벡터 삽입 완료');

    return Response.json({ success: true });
  } catch (err) {
    console.error('에러 발생:', err);
    return Response.json({ error: 'Failed to create or seed collection' }, { status: 500 });
  }
}
