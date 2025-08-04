import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';

import { API_SELF_URL } from '@/constants';
import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/shared/utils/getUserFromToken';

// CORS 설정을 위한 정확한 origin 도메인
const ORIGIN = API_SELF_URL;

// 프리플라이트 요청(OPTIONS)에 대한 응답 처리
export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': ORIGIN,
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

// POST: 업적 업데이트 API
export async function POST() {
  try {
    // STEP 1. 사용자 인증
    const result = await getUserFromToken();
    if ('error' in result) {
      const res = NextResponse.json(
        { success: false, error: result.error ?? '인증 오류' },
        { status: result.status ?? 401 },
      );
      res.headers.set('Access-Control-Allow-Origin', ORIGIN);
      res.headers.set('Access-Control-Allow-Credentials', 'true');
      return res;
    }

    const { userId } = result;

    // STEP 2. 업적 조건값 수집
    const [tradeCount, followerCount, step5Count] = await Promise.all([
      prisma.trade_histories.count({ where: { user_id: userId } }),
      prisma.follows.count({ where: { following_user_id: userId } }),
      prisma.voyage_letters.count({ where: { user_id: userId, step: 5 } }),
    ]);

    // STEP 3. 모든 업적 및 유저 업적 조회
    const [allAchievements, alreadyAchieved] = await Promise.all([
      prisma.achievements.findMany({ orderBy: [{ level: 'asc' }] }),
      prisma.user_achievements.findMany({
        where: { user_id: userId },
        select: { achievement_id: true, achieved_at: true },
      }),
    ]);

    const achievedMap = new Map<number, Date>(
      alreadyAchieved
        .filter((a): a is { achievement_id: bigint; achieved_at: Date } => !!a.achieved_at)
        .map((a) => [Number(a.achievement_id), a.achieved_at]),
    );

    const isMet = (type: 'trade' | 'follow' | 'rotate', value: number, required: number): boolean =>
      value >= required;

    // STEP 4. 새롭게 달성한 업적 계산
    const newlyAchieved = allAchievements.filter((a) => {
      const currentValue =
        a.type === 'trade' ? tradeCount : a.type === 'follow' ? followerCount : step5Count;

      return (
        isMet(a.type as 'trade' | 'follow' | 'rotate', currentValue, a.condition_value) &&
        !achievedMap.has(Number(a.id))
      );
    });

    // STEP 5. 새로 달성한 업적 저장
    if (newlyAchieved.length > 0) {
      await prisma.$transaction(
        newlyAchieved.map((a) =>
          prisma.user_achievements.create({
            data: {
              user_id: userId,
              achievement_id: a.id,
              achieved_at: new Date(),
            },
          }),
        ),
      );
    }

    // STEP 6. 업적 응답 포맷 구성
    const achievementsWithMeta = allAchievements.map((a) => ({
      ...a,
      id: Number(a.id),
      level: Number(a.level),
      condition_value: Number(a.condition_value),
      achievedAt:
        achievedMap.get(Number(a.id)) ??
        (newlyAchieved.some((n) => n.id === a.id) ? new Date().toISOString() : null),
    }));

    // STEP 7. 레벨 계산
    const calculateLevel = (type: 'trade' | 'follow' | 'rotate', currentValue: number): number => {
      return Math.max(
        ...allAchievements
          .filter((a) => a.type === type && currentValue >= a.condition_value)
          .map((a) => a.level),
        0,
      );
    };

    const tradeLevel = calculateLevel('trade', tradeCount);
    const followLevel = calculateLevel('follow', followerCount);
    const rotateLevel = calculateLevel('rotate', step5Count);
    const totalLevel = Math.min(tradeLevel, followLevel, rotateLevel);

    // STEP 8. 칭호명 조회
    const titleNames = await prisma.honorific.findMany({
      orderBy: { level: 'asc' },
      select: { name: true },
    });

    // STEP 9. 응답 반환
    const res = NextResponse.json({
      success: true,
      content: {
        trade_level: tradeLevel,
        follow_level: followLevel,
        rotate_level: rotateLevel,
        total_level: totalLevel,
        achievements: achievementsWithMeta,
        newly_achieved_ids: newlyAchieved.map((a) => Number(a.id)),
        title_name: titleNames.map((t) => t.name),
      },
    });
    res.headers.set('Access-Control-Allow-Origin', ORIGIN);
    res.headers.set('Access-Control-Allow-Credentials', 'true');
    return res;
  } catch (error) {
    let errorMessage = '예기치 못한 오류가 발생했습니다.';

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      errorMessage = '데이터 처리 중 오류가 발생했습니다.';
      console.error('[Prisma Known Error]', error.message);
    } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
      errorMessage = '알 수 없는 데이터베이스 오류입니다.';
      console.error('[Prisma Unknown Error]', error.message);
    } else if (error instanceof Error) {
      errorMessage = '서버 내부 오류가 발생했습니다.';
      console.error('[Server Error]', error.stack || error.message);
    } else {
      console.error('[Unhandled Error]', error);
    }

    const res = NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
    res.headers.set('Access-Control-Allow-Origin', ORIGIN);
    res.headers.set('Access-Control-Allow-Credentials', 'true');
    return res;
  }
}
