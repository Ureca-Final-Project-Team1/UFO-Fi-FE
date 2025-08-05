import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

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

// POST: 칭호 변경 API
export async function POST(req: NextRequest) {
  try {
    // STEP 1. 사용자 인증
    const result = await getUserFromToken();
    if ('error' in result) {
      const res = NextResponse.json(
        { success: false, error: result.error },
        { status: result.status },
      );
      res.headers.set('Access-Control-Allow-Origin', ORIGIN);
      res.headers.set('Access-Control-Allow-Credentials', 'true');
      return res;
    }

    const { userId } = result;

    // STEP 2. 요청 본문 파싱
    let body: { name?: string };
    try {
      body = await req.json();
    } catch {
      const res = NextResponse.json(
        { success: false, error: '잘못된 요청 형식입니다.' },
        { status: 400 },
      );
      res.headers.set('Access-Control-Allow-Origin', ORIGIN);
      res.headers.set('Access-Control-Allow-Credentials', 'true');
      return res;
    }

    const { name } = body;
    if (!name || typeof name !== 'string') {
      const res = NextResponse.json(
        { success: false, error: '칭호 이름이 유효하지 않습니다.' },
        { status: 400 },
      );
      res.headers.set('Access-Control-Allow-Origin', ORIGIN);
      res.headers.set('Access-Control-Allow-Credentials', 'true');
      return res;
    }

    // STEP 3. 존재하는 칭호인지 확인
    const honorific = await prisma.honorific.findFirst({ where: { name } });
    if (!honorific) {
      const res = NextResponse.json(
        { success: false, error: '해당 이름의 칭호가 존재하지 않습니다.' },
        { status: 404 },
      );
      res.headers.set('Access-Control-Allow-Origin', ORIGIN);
      res.headers.set('Access-Control-Allow-Credentials', 'true');
      return res;
    }

    // STEP 4. 사용자가 해당 칭호를 보유 중인지 확인
    const userOwnsHonorific = await prisma.user_honorific.findFirst({
      where: {
        user_id: userId,
        honorific_id: honorific.id,
      },
    });

    if (!userOwnsHonorific) {
      const res = NextResponse.json(
        { success: false, error: '보유하지 않은 칭호입니다.' },
        { status: 403 },
      );
      res.headers.set('Access-Control-Allow-Origin', ORIGIN);
      res.headers.set('Access-Control-Allow-Credentials', 'true');
      return res;
    }

    // STEP 5. 현재 칭호 해제 후 새 칭호 활성화 (트랜잭션 처리)
    await prisma.$transaction([
      prisma.user_honorific.updateMany({
        where: { user_id: userId, is_active: true },
        data: { is_active: false },
      }),
      prisma.user_honorific.updateMany({
        where: { user_id: userId, honorific_id: honorific.id },
        data: { is_active: true },
      }),
    ]);

    const res = NextResponse.json({
      success: true,
      message: '칭호가 성공적으로 변경되었습니다.',
    });
    res.headers.set('Access-Control-Allow-Origin', ORIGIN);
    res.headers.set('Access-Control-Allow-Credentials', 'true');
    return res;
  } catch (error: unknown) {
    // STEP 6. 에러 핸들링
    let errorMessage = '서버 내부 오류가 발생했습니다.';
    const statusCode = 500;

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error('[Prisma Known Error]', error.message);
      errorMessage = '데이터 처리 중 오류가 발생했습니다.';
    } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
      console.error('[Prisma Unknown Error]', error.message);
      errorMessage = '알 수 없는 데이터베이스 오류입니다.';
    } else if (error instanceof Error) {
      console.error('[Server Error]', error.stack || error.message);
    } else {
      console.error('[Unhandled Error]', error);
      errorMessage = '예기치 못한 오류가 발생했습니다.';
    }

    const res = NextResponse.json({ success: false, error: errorMessage }, { status: statusCode });
    res.headers.set('Access-Control-Allow-Origin', ORIGIN);
    res.headers.set('Access-Control-Allow-Credentials', 'true');
    return res;
  }
}
