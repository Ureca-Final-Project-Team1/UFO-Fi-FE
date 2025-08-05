import { NextRequest, NextResponse } from 'next/server';

import { API_SELF_URL } from '@/constants';
import { prisma } from '@/lib/prisma';

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

export async function GET(req: NextRequest) {
  try {
    // Step 0: userId 쿼리 파라미터 검증
    const userIdParam = req.nextUrl.searchParams.get('userId');
    if (!userIdParam) {
      const res = NextResponse.json(
        { success: false, error: 'userId가 누락되었습니다.' },
        { status: 400 },
      );
      res.headers.set('Access-Control-Allow-Origin', ORIGIN);
      res.headers.set('Access-Control-Allow-Credentials', 'true');
      return res;
    }

    let userId: bigint;
    try {
      userId = BigInt(userIdParam);
    } catch {
      const res = NextResponse.json(
        { success: false, error: 'userId 형식이 올바르지 않습니다.' },
        { status: 400 },
      );
      res.headers.set('Access-Control-Allow-Origin', ORIGIN);
      res.headers.set('Access-Control-Allow-Credentials', 'true');
      return res;
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
    });

    // Step 5: 업적 정보 조회
    const achievementIds = userAchievements.map((ua) => ua.achievement_id);
    const achievementsData = await prisma.achievements.findMany({
      where: {
        id: { in: achievementIds },
      },
    });

    // Step 6: 직렬화
    const achievements = userAchievements
      .map((ua) => {
        const achievement = achievementsData.find(
          (a: { id: bigint }) => a.id === ua.achievement_id,
        );
        if (!achievement) return null;

        return {
          id: Number(achievement.id),
          name: achievement.name,
          level: Number(achievement.level),
          type: achievement.type,
          condition_value: Number(achievement.condition_value),
          description: achievement.description,
          achievedAt: ua.achieved_at ? ua.achieved_at.toISOString() : null,
        };
      })
      .filter(Boolean);

    // Step 6: 결과 응답
    const res = NextResponse.json({
      success: true,
      content: {
        trade_frequency,
        dominant_trade_time,
        achievements,
      },
    });
    res.headers.set('Access-Control-Allow-Origin', ORIGIN);
    res.headers.set('Access-Control-Allow-Credentials', 'true');
    return res;
  } catch (error) {
    console.error('[GET /collections/user-stats] error:', error);
    const res = NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 },
    );
    res.headers.set('Access-Control-Allow-Origin', ORIGIN);
    res.headers.set('Access-Control-Allow-Credentials', 'true');
    return res;
  }
}
