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

  // ✅ 유저 상태 계산
  const [tradeCount, followerCount, step5Count] = await Promise.all([
    prisma.trade_histories.count({ where: { user_id: userId } }),
    prisma.follows.count({ where: { following_user_id: userId } }),
    prisma.voyage_letters.count({ where: { user_id: userId, step: 5 } }),
  ]);

  // ✅ 업적 조건 불러오기
  const allAchievements = await prisma.achievement.findMany({
    orderBy: [{ level: 'asc' }],
  });

  const maxLevelBy = (type: 'trade' | 'follow' | 'rotate', value: number) =>
    allAchievements
      .filter((a) => a.type === type && a.condition_value <= value)
      .sort((a, b) => b.level - a.level)[0]?.level ?? 0;

  const tradeLevel = maxLevelBy('trade', tradeCount);
  const followLevel = maxLevelBy('follow', followerCount);
  const rotateLevel = maxLevelBy('rotate', step5Count);

  const totalLevel = Math.min(tradeLevel, followLevel, rotateLevel);

  // ✅ 유저 업적 row 없으면 생성
  const existing = await prisma.achievement_user.findUnique({
    where: { user_id: userId },
  });

  if (!existing) {
    await prisma.achievement_user.create({
      data: {
        user_id: userId,
        trade_level: tradeLevel,
        follow_level: followLevel,
        rotate_level: rotateLevel,
      },
    });

    return NextResponse.json({
      message: '업적이 새로 생성되었습니다.',
      trade_level: tradeLevel,
      follow_level: followLevel,
      rotate_level: rotateLevel,
      achievements: allAchievements,
    });
  }

  // ✅ 업적 갱신
  const isChanged =
    tradeLevel > existing.trade_level ||
    followLevel > existing.follow_level ||
    rotateLevel > existing.rotate_level;

  if (isChanged) {
    const updated = await prisma.achievement_user.update({
      where: { user_id: userId },
      data: {
        trade_level: tradeLevel,
        follow_level: followLevel,
        rotate_level: rotateLevel,
      },
    });

    return NextResponse.json({
      message: '업적이 갱신되었습니다.',
      trade_level: updated.trade_level,
      follow_level: updated.follow_level,
      rotate_level: updated.rotate_level,
      achievements: allAchievements,
      total_level: totalLevel,
    });
  }

  return NextResponse.json({
    message: '이미 최신 상태입니다.',
    trade_level: existing.trade_level,
    follow_level: existing.follow_level,
    rotate_level: existing.rotate_level,
    achievements: allAchievements,
    total_level: totalLevel,
  });
}
