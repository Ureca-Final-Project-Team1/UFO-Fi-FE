import dayjs from 'dayjs';

import { prisma } from '@/lib/prisma';
import { qdrantClient } from '@/lib/qdrantClient';
import { createQdrantFieldIndex } from '@/lib/qdrantFieldIndex';
import { getVectorFromProfile } from '@/lib/vectorizer';

export async function POST() {
  try {
    // 기존 컬렉션이 있으면 백업 후 삭제
    const collections = await qdrantClient.getCollections();
    const exists = collections.collections.some((col) => col.name === 'ufo_fi');
    if (exists) {
      // TODO: 기존 데이터를 백업 컬렉션으로 복사
      // 백업 컬렉션 생성 (타임스탬프 포함)
      // const backupName = `ufo_fi_backup_${Date.now()}`;
      await qdrantClient.deleteCollection('ufo_fi');
    }

    // 새로운 Qdrant 컬렉션 생성 (벡터 길이: 4차원, 거리 기준: 유클리드)
    await qdrantClient.createCollection('ufo_fi', {
      vectors: {
        size: 4,
        distance: 'Euclid',
      },
    });

    // 필드 인덱스 생성 (검색용 필터)
    await Promise.all([
      createQdrantFieldIndex('id', 'integer'),
      createQdrantFieldIndex('name', 'keyword'),
      createQdrantFieldIndex('role', 'integer'),
      createQdrantFieldIndex('type', 'keyword'),
      createQdrantFieldIndex('carrier', 'keyword'),
      createQdrantFieldIndex('mobile_data_type', 'keyword'),
    ]);

    // 최근 7일 이내 거래 기록이 있는 유저 조회 (차단된 유저 제외)
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

    const points = users.map((user) => {
      const trades = user.trade_histories;
      const posts = user.trade_posts;
      const profile = user.profile_photo?.profile_photo_url ?? '';

      // 판매/구매 횟수 계산 → type 결정
      const sales = trades.filter((t) => t.status === 'SALE').length;
      const purchases = trades.filter((t) => t.status === 'PURCHASE').length;
      const type = sales >= purchases ? 'seller' : 'purchaser';

      // 평균 ZET 계산
      const zetValues = posts.map((p) => p.zet_per_unit).filter((v): v is number => v !== null);
      const avg_zet =
        zetValues.length > 0
          ? Number((zetValues.reduce((sum, v) => sum + v, 0) / zetValues.length).toFixed(2))
          : 0;

      // 평균 데이터 용량(GB) 계산
      const gbValues = posts
        .map((p) => p.sell_mobile_data_capacity_gb)
        .filter((v): v is number => v !== null);
      const data_gb =
        gbValues.length > 0
          ? Number((gbValues.reduce((sum, v) => sum + v, 0) / gbValues.length).toFixed(2))
          : 0;

      // 최근 7일간 거래 횟수
      const trade_frequency = trades.length;

      // 마지막 거래가 며칠 전인지 계산
      const lastTradeDate = trades.reduce<Date | null>((latest, t) => {
        if (!t.created_at) return latest;
        return !latest || t.created_at > latest ? t.created_at : latest;
      }, null);
      const last_trade_diff_days = lastTradeDate ? dayjs().diff(lastTradeDate, 'day') : null;

      // 가장 많이 사용된 통신사 및 데이터 타입 추출
      const carrierCount: Record<string, number> = {};
      const dataTypeCount: Record<string, number> = {};

      posts.forEach((post) => {
        const carrier = post.carrier;
        const type = post.mobile_data_type;
        if (carrier) carrierCount[carrier] = (carrierCount[carrier] || 0) + 1;
        if (type) dataTypeCount[type] = (dataTypeCount[type] || 0) + 1;
      });

      const carrier = Object.entries(carrierCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '';
      const rawMobileType = Object.entries(dataTypeCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '';
      const mobile_data_type = rawMobileType === 'G' ? '5G' : rawMobileType;

      // 벡터 생성
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
          role: user.role === 'ROLE_REPORTED' ? 0 : 1, // REPORT된 유저: 0, 일반 유저: 1
          type,
          carrier,
          mobile_data_type,
          profile_photo_url: profile,
        },
      };
    });

    // Qdrant에 벡터 업서트
    await qdrantClient.upsert('ufo_fi', { points });

    return Response.json({ success: true });
  } catch (err) {
    console.error('에러 발생:', err);
    return Response.json({ error: 'Failed to create or seed collection' }, { status: 500 });
  }
}
