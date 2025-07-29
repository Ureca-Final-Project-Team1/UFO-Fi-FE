import type { achievement, user_achievements } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function POST() {
  const token = (await cookies()).get('Authorization')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not configured');

  let userId: bigint;
  try {
    const secret = Buffer.from(process.env.JWT_SECRET, 'base64');
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
    const id = decoded.id ?? decoded.sub;
    if (!id) throw new Error('User ID missing in token');
    userId = BigInt(id);
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  try {
    // 유저 상태 계산
    const [tradeCount, followerCount, step5Count] = await Promise.all([
      prisma.trade_histories.count({ where: { user_id: userId } }),
      prisma.follows.count({ where: { following_user_id: userId } }),
      prisma.voyage_letters.count({ where: { user_id: userId, step: 5 } }),
    ]);

    // 모든 업적 불러오기
    const allAchievements: achievement[] = await prisma.achievement.findMany({
      orderBy: [{ level: 'asc' }],
    });

    // 이미 달성한 업적 ID 및 시간 조회
    const alreadyAchieved: Pick<user_achievements, 'achievement_id' | 'achieved_at'>[] =
      await prisma.user_achievements.findMany({
        where: { user_id: userId },
        select: { achievement_id: true, achieved_at: true },
      });

    const achievedMap = new Map<number, Date>(
      alreadyAchieved.map((a) => [a.achievement_id, a.achieved_at]),
    );

    // 조건 만족 여부
    const isMet = (type: 'trade' | 'follow' | 'rotate', value: number, required: number) =>
      value >= required;

    // 새로 달성한 업적만 필터링
    const newlyAchieved = allAchievements.filter((a: achievement) => {
      const currentValue =
        a.type === 'trade' ? tradeCount : a.type === 'follow' ? followerCount : step5Count;
      return isMet(a.type, currentValue, a.condition_value) && !achievedMap.has(a.id);
    });

    // 새 업적 기록
    await prisma.$transaction(
      newlyAchieved.map((a: achievement) =>
        prisma.user_achievements.create({
          data: {
            user_id: userId,
            achievement_id: a.id,
            achieved_at: new Date(),
          },
        }),
      ),
    );

    // 달성 정보 포함
    const achievementsWithMeta = allAchievements.map((a: achievement) => ({
      ...a,
      achievedAt:
        achievedMap.get(a.id) ??
        (newlyAchieved.find((n: achievement) => n.id === a.id) ? new Date() : null),
    }));

    const tradeLevel = Math.max(
      ...allAchievements
        .filter((a: achievement) => a.type === 'trade' && tradeCount >= a.condition_value)
        .map((a: achievement) => a.level),
      0,
    );
    const followLevel = Math.max(
      ...allAchievements
        .filter((a: achievement) => a.type === 'follow' && followerCount >= a.condition_value)
        .map((a: achievement) => a.level),
      0,
    );
    const rotateLevel = Math.max(
      ...allAchievements
        .filter((a: achievement) => a.type === 'rotate' && step5Count >= a.condition_value)
        .map((a: achievement) => a.level),
      0,
    );
    const totalLevel = Math.min(tradeLevel, followLevel, rotateLevel);

    return NextResponse.json({
      message: '업적 상태가 업데이트되었습니다.',
      trade_level: tradeLevel,
      follow_level: followLevel,
      rotate_level: rotateLevel,
      total_level: totalLevel,
      achievements: achievementsWithMeta,
      newly_achieved_ids: newlyAchieved.map((a: achievement) => a.id),
    });
  } catch (error) {
    console.error('Achievement update error:', error);
    return NextResponse.json({ error: '업적 업데이트 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
