import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    // Step 0: userId 쿼리 파라미터 검증
    const userIdParam = req.nextUrl.searchParams.get('userId');
    if (!userIdParam) {
      return NextResponse.json({ error: 'userId가 누락되었습니다.' }, { status: 400 });
    }

    let userId: bigint;
    try {
      userId = BigInt(userIdParam);
    } catch {
      return NextResponse.json({ error: 'userId 형식이 올바르지 않습니다.' }, { status: 400 });
    }

    // Step 1: 최근 일주일 간의 거래 기록 조회
    const now = new Date();
    const weekAgo = new Date(now);
    weekAgo.setDate(now.getDate() - 7);

    const recentTrades = await prisma.trade_histories.findMany({
      where: {
        user_id: userId,
        created_at: { gte: weekAgo },
      },
    });

    // Step 2: 거래 횟수 계산
    const trade_frequency = recentTrades.length;

    // Step 3: 시간대 분석 (낮/밤)
    let dayCount = 0;
    let nightCount = 0;

    for (const trade of recentTrades) {
      const createdAt = trade.created_at;
      if (!createdAt) continue;
      const hour = new Date(createdAt).getHours();
      if (hour >= 6 && hour < 18) {
        dayCount++;
      } else {
        nightCount++;
      }
    }

    const dominant_trade_time = dayCount >= nightCount ? 'day' : 'night';

    // Step 4: 유저가 획득한 업적 조회
    const userAchievements = await prisma.user_achievements.findMany({
      where: { user_id: userId },
      include: {
        achievement: true,
      },
    });

    // Step 5: 직렬화
    const achievements = userAchievements
      .filter((ua) => ua.achievement !== null)
      .map((ua) => ({
        id: Number(ua.achievement.id),
        name: ua.achievement.name,
        level: Number(ua.achievement.level),
        type: ua.achievement.type,
        condition_value: Number(ua.achievement.condition_value),
        description: ua.achievement.description,
        achievedAt: ua.achieved_at ? ua.achieved_at.toISOString() : null,
      }));

    // Step 6: 결과 응답
    return new Response(
      JSON.stringify({
        trade_frequency,
        dominant_trade_time,
        achievements,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error('[GET /collections/user-stats] error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
