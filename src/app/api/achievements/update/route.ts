import { Prisma, achievements } from '@prisma/client';
import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/utils/getUserFromToken';

export async function POST() {
  try {
    // STEP 1. 인증 처리
    const result = await getUserFromToken();
    if ('error' in result) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    const { userId } = result;

    // STEP 2. 유저 상태 계산
    const [tradeCount, followerCount, step5Count] = await Promise.all([
      prisma.trade_histories.count({ where: { user_id: userId } }),
      prisma.follows.count({ where: { following_user_id: userId } }),
      prisma.voyage_letters.count({ where: { user_id: userId, step: 5 } }),
    ]);

    // STEP 3. 전체 업적 로딩
    const allAchievements = await prisma.achievements.findMany({
      orderBy: [{ level: 'asc' }],
    });

    // STEP 4. 이미 달성한 업적
    const alreadyAchieved = await prisma.user_achievements.findMany({
      where: { user_id: userId },
      select: { achievement_id: true, achieved_at: true },
    });

    const achievedMap = new Map<number, Date>(
      alreadyAchieved
        .filter((a): a is { achievement_id: bigint; achieved_at: Date } => !!a.achieved_at)
        .map((a) => [Number(a.achievement_id), a.achieved_at]),
    );

    const isMet = (type: 'trade' | 'follow' | 'rotate', value: number, required: number): boolean =>
      value >= required;

    const newlyAchieved = allAchievements.filter((a) => {
      const currentValue =
        a.type === 'trade' ? tradeCount : a.type === 'follow' ? followerCount : step5Count;

      return (
        isMet(a.type as 'trade' | 'follow' | 'rotate', currentValue, a.condition_value) &&
        !achievedMap.has(Number(a.id))
      );
    });

    // STEP 5. 새 업적 기록
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

    // STEP 6. 업적 + 달성 여부 반환
    const achievementsWithMeta = allAchievements.map((a) => ({
      ...a,
      achievedAt:
        achievedMap.get(Number(a.id)) ??
        (newlyAchieved.some((n) => n.id === a.id) ? new Date() : null),
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

    return NextResponse.json({
      message: '업적 상태가 업데이트되었습니다.',
      trade_level: tradeLevel,
      follow_level: followLevel,
      rotate_level: rotateLevel,
      total_level: totalLevel,
      achievements: achievementsWithMeta.map((a) => ({
        ...a,
        id: Number(a.id),
        level: Number(a.level),
        condition_value: Number(a.condition_value),
      })),
      newly_achieved_ids: newlyAchieved.map((a: achievements) => Number(a.id)),
    });
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error('[Prisma Known Error]', error.message);
      return NextResponse.json({ error: '데이터 처리 중 오류가 발생했습니다.' }, { status: 500 });
    }

    if (error instanceof Prisma.PrismaClientUnknownRequestError) {
      console.error('[Prisma Unknown Error]', error.message);
      return NextResponse.json({ error: '알 수 없는 데이터베이스 오류입니다.' }, { status: 500 });
    }

    if (error instanceof Error) {
      console.error('[Server Error]', error.stack || error.message);
      return NextResponse.json({ error: '서버 내부 오류가 발생했습니다.' }, { status: 500 });
    }

    console.error('[Unhandled Error]', error);
    return NextResponse.json({ error: '예기치 못한 오류가 발생했습니다.' }, { status: 500 });
  }
}
