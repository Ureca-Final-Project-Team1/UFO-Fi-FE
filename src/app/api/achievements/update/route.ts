import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';

import { UpdateAchievementResponse } from '@/features/mypage/types/Achievement';
import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/shared/utils/getUserFromToken';

const initialUpdateAchievementResponse: UpdateAchievementResponse = {
  message: '',
  statusCode: 200,
  content: {
    trade_level: 0,
    follow_level: 0,
    rotate_level: 0,
    total_level: 0,
    achievements: [],
    newly_achieved_ids: [],
    title_name: [],
  },
};

export async function POST() {
  try {
    const result = await getUserFromToken();
    if ('error' in result) {
      return NextResponse.json(
        {
          ...initialUpdateAchievementResponse,
          message: result.error ?? '인증 오류',
          statusCode: result.status ?? 401,
        },
        { status: result.status ?? 401 },
      );
    }

    const { userId } = result;

    const [tradeCount, followerCount, step5Count] = await Promise.all([
      prisma.trade_histories.count({ where: { user_id: userId } }),
      prisma.follows.count({ where: { following_user_id: userId } }),
      prisma.voyage_letters.count({ where: { user_id: userId, step: 5 } }),
    ]);

    const allAchievements = await prisma.achievements.findMany({
      orderBy: [{ level: 'asc' }],
    });

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

    const achievementsWithMeta = allAchievements.map((a) => ({
      ...a,
      achievedAt:
        achievedMap.get(Number(a.id)) ??
        (newlyAchieved.some((n) => n.id === a.id) ? new Date().toISOString() : null),
    }));

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

    const titleNames = await prisma.honorific.findMany({
      orderBy: { level: 'asc' },
      select: { name: true },
    });

    return NextResponse.json({
      message: '업적 상태가 업데이트되었습니다.',
      statusCode: 200,
      content: {
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
        newly_achieved_ids: newlyAchieved.map((a) => Number(a.id)),
        title_name: titleNames.map((t) => t.name),
      },
    });
  } catch (error) {
    let message = '예기치 못한 오류가 발생했습니다.';

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      message = '데이터 처리 중 오류가 발생했습니다.';
      console.error('[Prisma Known Error]', error.message);
    } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
      message = '알 수 없는 데이터베이스 오류입니다.';
      console.error('[Prisma Unknown Error]', error.message);
    } else if (error instanceof Error) {
      message = '서버 내부 오류가 발생했습니다.';
      console.error('[Server Error]', error.stack || error.message);
    } else {
      console.error('[Unhandled Error]', error);
    }

    return NextResponse.json(
      {
        ...initialUpdateAchievementResponse,
        message,
        statusCode: 500,
      },
      { status: 500 },
    );
  }
}
