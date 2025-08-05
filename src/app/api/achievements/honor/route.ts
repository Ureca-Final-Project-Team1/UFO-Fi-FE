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

// 실제 API 로직 (칭호 목록 조회)
export async function GET() {
  try {
    const result = await getUserFromToken();

    if ('error' in result) {
      const res = NextResponse.json(
        {
          success: false,
          error: result.error ?? '인증 오류',
          content: [],
        },
        { status: result.status ?? 401 },
      );
      res.headers.set('Access-Control-Allow-Origin', ORIGIN);
      res.headers.set('Access-Control-Allow-Credentials', 'true');
      return res;
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
        const res = NextResponse.json(
          {
            success: false,
            error: '레벨 0 칭호가 존재하지 않습니다.',
            content: [],
          },
          { status: 500 },
        );
        res.headers.set('Access-Control-Allow-Origin', ORIGIN);
        res.headers.set('Access-Control-Allow-Credentials', 'true');
        return res;
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

    const res = NextResponse.json({
      success: true,
      content: userHonorifics.map((uh) => ({
        id: Number(uh.honorific.id),
        name: uh.honorific.name,
        level: uh.honorific.level,
        isActive: uh.is_active,
      })),
    });
    res.headers.set('Access-Control-Allow-Origin', ORIGIN);
    res.headers.set('Access-Control-Allow-Credentials', 'true');
    return res;
  } catch (error: unknown) {
    let errorMessage = '예기치 못한 오류가 발생했습니다.';

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      errorMessage = '데이터 처리 중 오류가 발생했습니다.';
      console.error('[Prisma Known Error]', error.message, error.code);
    } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
      errorMessage = '알 수 없는 데이터베이스 오류입니다.';
      console.error('[Prisma Unknown Error]', error.message);
    } else if (error instanceof Error) {
      errorMessage = '서버 내부 오류가 발생했습니다.';
      console.error('[Server Error]', error.stack || error.message);
    } else {
      console.error('[Unhandled Error]', error);
    }

    const res = NextResponse.json(
      {
        success: false,
        error: errorMessage,
        content: [],
      },
      { status: 500 },
    );
    res.headers.set('Access-Control-Allow-Origin', ORIGIN);
    res.headers.set('Access-Control-Allow-Credentials', 'true');
    return res;
  }
}
