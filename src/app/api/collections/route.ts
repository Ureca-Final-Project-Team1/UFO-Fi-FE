import dayjs from 'dayjs';

import { prisma } from '@/lib/prisma';
import { qdrantClient } from '@/lib/qdrantClient';
import { createQdrantFieldIndex } from '@/lib/qdrantFieldIndex';
import { getVectorFromProfile } from '@/lib/vectorizer';

export async function POST() {
  try {
    const COLLECTION_NAME = 'ufo_fi';

    /**
     * Step 1. Qdrant 컬렉션 존재 여부 확인
     * - 벡터 기반 추천을 위해 `ufo_fi`라는 이름의 컬렉션이 필요한데,
     *   이미 존재하면 인덱스 생성은 생략하고 없을 경우에만 생성한다.
     */
    const collections = await qdrantClient.getCollections();
    const exists = collections.collections.some((col) => col.name === COLLECTION_NAME);

    if (!exists) {
      // 컬렉션 생성: 사용자 벡터는 총 4차원으로 구성됨
      await qdrantClient.createCollection(COLLECTION_NAME, {
        vectors: { size: 4, distance: 'Euclid' },
      });

      // 검색 필드를 위한 인덱스 생성 (검색 속도 및 필터용)
      await Promise.all([
        createQdrantFieldIndex('id', 'integer'), // 고유 사용자 ID
        createQdrantFieldIndex('name', 'keyword'), // 사용자명 (닉네임)
        createQdrantFieldIndex('role', 'integer'), // 0: 제재유저, 1: 일반유저
        createQdrantFieldIndex('type', 'keyword'), // 거래유형: seller/purchaser
        createQdrantFieldIndex('carrier', 'keyword'), // 통신사
        createQdrantFieldIndex('mobile_data_type', 'keyword'), // 데이터 유형: 5G, LTE 등
      ]);
    }

    /**
     * Step 2. 최근 7일간 거래한 사용자 조회
     * - 거래 기록이 없는 유저는 벡터를 구성할 수 없으므로 제외
     */
    const users = await prisma.users.findMany({
      where: { role: { in: ['ROLE_USER', 'ROLE_REPORTED'] } },
      include: {
        trade_histories: {
          where: { created_at: { gte: dayjs().subtract(7, 'day').toDate() } },
        },
        profile_photo: { select: { profile_photo_url: true } },
        trade_posts: true,
      },
    });

    /**
     * Step 3. 각 사용자별 Qdrant 포인트 구성
     * - 벡터 값 4개: avg_zet, data_gb, trade_frequency, recent_post_days
     * - payload(부가 정보): id, name, role, 거래유형, 통신사, 데이터타입, 주 거래 시간대 등
     */
    const points = users.map((user) => {
      const trades = user.trade_histories;
      const posts = user.trade_posts;
      const profile = user.profile_photo?.profile_photo_url ?? '';

      // 판매 / 구매 수를 바탕으로 사용자 거래 유형 분류
      const sales = trades.filter((t) => t.status === 'SALE').length;
      const purchases = trades.filter((t) => t.status === 'PURCHASE').length;
      const type = sales >= purchases ? 'seller' : 'purchaser';

      // 게시물 ZET 평균
      const zetValues = posts.map((p) => p.zet_per_unit).filter((v): v is number => v !== null);
      const avg_zet =
        zetValues.length > 0
          ? +(zetValues.reduce((a, b) => a + b, 0) / zetValues.length).toFixed(2)
          : 0;

      // 게시물 데이터량(GB) 평균
      const gbValues = posts
        .map((p) => p.sell_mobile_data_capacity_gb)
        .filter((v): v is number => v !== null);
      const data_gb =
        gbValues.length > 0
          ? +(gbValues.reduce((a, b) => a + b, 0) / gbValues.length).toFixed(2)
          : 0;

      // 최근 7일간 총 거래 횟수
      const trade_frequency = trades.length;

      // 최근 게시물 작성일로부터 경과일 계산 (없으면 999로 설정)
      const lastPostDate = posts.reduce<Date | null>((latest, post) => {
        if (!post.created_at) return latest;
        return !latest || post.created_at > latest ? post.created_at : latest;
      }, null);
      const recent_post_days = lastPostDate ? dayjs().diff(lastPostDate, 'day') : 999;

      // 거래 시간 분포 분석 (낮/밤 판단)
      const dayTradeCount = trades.filter((t) => {
        const hour = dayjs(t.created_at).hour();
        return hour >= 6 && hour < 18;
      }).length;
      const nightTradeCount = trade_frequency - dayTradeCount;
      const dominant_trade_time = dayTradeCount >= nightTradeCount ? 'day' : 'night';

      // 가장 많이 사용한 통신사와 데이터 유형 계산
      const carrierCount: Record<string, number> = {};
      const dataTypeCount: Record<string, number> = {};
      posts.forEach((post) => {
        if (post.carrier) carrierCount[post.carrier] = (carrierCount[post.carrier] || 0) + 1;
        if (post.mobile_data_type)
          dataTypeCount[post.mobile_data_type] = (dataTypeCount[post.mobile_data_type] || 0) + 1;
      });
      const carrier = Object.entries(carrierCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '';
      const rawMobileType = Object.entries(dataTypeCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '';
      const mobile_data_type = rawMobileType === 'G' ? '5G' : rawMobileType;

      // 벡터 변환 (0~1 범위로 정규화된 4차원 벡터)
      const vector = getVectorFromProfile({
        avg_zet,
        data_gb,
        trade_frequency,
        recent_post_days,
      });

      // Qdrant 포인트 구성
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
    });

    /**
     * Step 4. Qdrant 컬렉션에 포인트 업서트 (존재 시 갱신)
     */
    await qdrantClient.upsert(COLLECTION_NAME, { points });

    return Response.json({ success: true });
  } catch (err) {
    console.error('Qdrant 시딩 실패:', err);
    return Response.json({ error: 'Failed to create or seed collection' }, { status: 500 });
  }
}
