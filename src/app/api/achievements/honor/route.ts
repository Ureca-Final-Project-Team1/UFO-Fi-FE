import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/utils/getUserFromToken';

export async function GET() {
  try {
    // STEP 1. 쿠키에서 JWT 토큰 추출
    const result = await getUserFromToken();
    if ('error' in result) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    const { userId } = result;

    // STEP 2. 유저의 칭호 보유 내역 조회
    let userHonorifics = await prisma.user_honorific.findMany({
      where: { user_id: userId },
      include: {
        honorific: true,
      },
      orderBy: {
        honorific: {
          level: 'asc',
        },
      },
    });

    // STEP 3. 칭호가 없다면 기본 레벨 0 부여
    if (userHonorifics.length === 0) {
      const baseHonor = await prisma.honorific.findFirst({ where: { level: 0 } });

      if (!baseHonor) {
        throw new Error('레벨 0 칭호가 존재하지 않습니다.');
      }

      await prisma.user_honorific.create({
        data: {
          user_id: userId,
          honorific_id: baseHonor.id,
          is_active: true,
        },
      });

      // 다시 조회
      userHonorifics = await prisma.user_honorific.findMany({
        where: { user_id: userId },
        include: {
          honorific: true,
        },
        orderBy: {
          honorific: {
            level: 'asc',
          },
        },
      });
    }

    // STEP 4. 반환
    return NextResponse.json({
      userId: userId.toString(),
      honorifics: userHonorifics.map((uh) => ({
        id: uh.honorific.id.toString(),
        name: uh.honorific.name,
        level: uh.honorific.level,
        isActive: uh.is_active,
      })),
    });
  } catch (error: unknown) {
    // Prisma 오류 처리
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error('[Prisma Known Error]', error.message, error.code);
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
