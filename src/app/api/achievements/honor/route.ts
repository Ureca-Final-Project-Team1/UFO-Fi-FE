import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';

import { GetHonorificsResponse } from '@/features/mypage/types/Achievement';
import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/shared/utils/getUserFromToken';

const initialResponse = (): GetHonorificsResponse => ({
  message: '',
  statusCode: 200,
  content: [],
});

export async function GET() {
  const response = initialResponse();

  try {
    const result = await getUserFromToken();

    if ('error' in result) {
      return NextResponse.json(
        {
          ...response,
          message: result.error ?? '인증 오류',
          statusCode: result.status ?? 401,
        },
        { status: result.status ?? 401 },
      );
    }

    const { userId } = result;

    let userHonorifics = await prisma.user_honorific.findMany({
      where: { user_id: userId },
      include: { honorific: true },
      orderBy: { honorific: { level: 'asc' } },
    });

    // 기본 칭호 자동 지급
    if (userHonorifics.length === 0) {
      const baseHonor = await prisma.honorific.findFirst({ where: { level: 0 } });

      if (!baseHonor) {
        return NextResponse.json(
          {
            ...response,
            message: '레벨 0 칭호가 존재하지 않습니다.',
            statusCode: 500,
          },
          { status: 500 },
        );
      }

      await prisma.user_honorific.create({
        data: {
          user_id: userId,
          honorific_id: baseHonor.id,
          is_active: true,
        },
      });

      userHonorifics = await prisma.user_honorific.findMany({
        where: { user_id: userId },
        include: { honorific: true },
        orderBy: { honorific: { level: 'asc' } },
      });
    }

    return NextResponse.json({
      ...response,
      message: '칭호 목록 조회 성공',
      content: userHonorifics.map((uh) => ({
        id: Number(uh.honorific.id),
        name: uh.honorific.name,
        level: uh.honorific.level,
        isActive: uh.is_active,
      })),
    });
  } catch (error: unknown) {
    let message = '예기치 못한 오류가 발생했습니다.';

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      message = '데이터 처리 중 오류가 발생했습니다.';
      console.error('[Prisma Known Error]', error.message, error.code);
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
        ...response,
        message,
        statusCode: 500,
        content: [],
      },
      { status: 500 },
    );
  }
}
