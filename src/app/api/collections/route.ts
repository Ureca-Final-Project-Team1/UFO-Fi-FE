import type { users, trade_histories, trade_posts } from '@prisma/client';
import dayjs from 'dayjs';

import { prisma } from '@/lib/prisma';
import { qdrantClient } from '@/lib/qdrantClient';
import { createQdrantFieldIndex } from '@/lib/qdrantFieldIndex';
import { getVectorFromProfile } from '@/lib/vectorizer';

export async function POST() {
  try {
    const collections = await qdrantClient.getCollections();
    const exists = collections.collections.some((col: { name: string }) => col.name === 'ufo_fi');
    if (exists) {
      await qdrantClient.deleteCollection('ufo_fi');
    }

    await qdrantClient.createCollection('ufo_fi', {
      vectors: {
        size: 4,
        distance: 'Euclid',
      },
    });

    await Promise.all([
      createQdrantFieldIndex('id', 'integer'),
      createQdrantFieldIndex('name', 'keyword'),
      createQdrantFieldIndex('role', 'integer'),
      createQdrantFieldIndex('type', 'keyword'),
      createQdrantFieldIndex('carrier', 'keyword'),
      createQdrantFieldIndex('mobile_data_type', 'keyword'),
    ]);

    const users = await prisma.users.findMany({
      where: {
        role: { in: ['ROLE_USER', 'ROLE_REPORTED'] },
        is_active: true,
      },
      include: {
        trade_histories: {
          where: {
            status: { in: ['PURCHASE', 'SALE'] },
            created_at: { gte: dayjs().subtract(7, 'day').toDate() },
          },
        },
        profile_photo: {
          select: {
            profile_photo_url: true,
          },
        },
        trade_posts: true,
      },
    });

    const points = users.map(
      (
        user: users & {
          trade_histories: trade_histories[];
          trade_posts: trade_posts[];
          profile_photo: { profile_photo_url: string | null } | null;
        },
      ) => {
        const trades = user.trade_histories;
        const posts = user.trade_posts;
        const profile = user.profile_photo?.profile_photo_url ?? '';

        const sales = trades.filter((t: trade_histories) => t.status === 'SALE').length;
        const purchases = trades.filter((t: trade_histories) => t.status === 'PURCHASE').length;
        const type = sales >= purchases ? 'seller' : 'purchaser';

        const zetValues = posts
          .map((p: trade_posts) => p.zet_per_unit)
          .filter((v: number | null): v is number => v !== null);
        const avg_zet =
          zetValues.length > 0
            ? Number(
                (
                  zetValues.reduce((sum: number, v: number) => sum + v, 0) / zetValues.length
                ).toFixed(2),
              )
            : 0;

        const gbValues = posts
          .map((p: trade_posts) => p.sell_mobile_data_capacity_gb)
          .filter((v: number | null): v is number => v !== null);
        const data_gb =
          gbValues.length > 0
            ? Number(
                (gbValues.reduce((sum: number, v: number) => sum + v, 0) / gbValues.length).toFixed(
                  2,
                ),
              )
            : 0;

        const trade_frequency = trades.length;

        const lastTradeDate = trades.reduce<Date | null>(
          (latest: Date | null, t: trade_histories) => {
            if (!t.created_at) return latest;
            return !latest || t.created_at > latest ? t.created_at : latest;
          },
          null,
        );
        const last_trade_diff_days = lastTradeDate ? dayjs().diff(lastTradeDate, 'day') : null;

        const carrierCount: Record<string, number> = {};
        const dataTypeCount: Record<string, number> = {};

        posts.forEach((post: trade_posts) => {
          const carrier = post.carrier;
          const type = post.mobile_data_type;
          if (carrier) carrierCount[carrier] = (carrierCount[carrier] || 0) + 1;
          if (type) dataTypeCount[type] = (dataTypeCount[type] || 0) + 1;
        });

        const carrier = Object.entries(carrierCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '';
        const rawMobileType =
          Object.entries(dataTypeCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '';
        const mobile_data_type = rawMobileType === 'G' ? '5G' : rawMobileType;

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
            id: user.id,
            name: user.name ?? 'Unknown',
            role: user.role === 'ROLE_REPORTED' ? 0 : 1,
            type,
            carrier,
            mobile_data_type,
            profile_photo_url: profile,
          },
        };
      },
    );

    await qdrantClient.upsert('ufo_fi', { points });

    return Response.json({ success: true });
  } catch (err) {
    console.error('에러 발생:', err);
    return Response.json({ error: 'Failed to create or seed collection' }, { status: 500 });
  }
}
