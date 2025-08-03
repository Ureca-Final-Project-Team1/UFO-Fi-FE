import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from '@prisma/client/runtime/library';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/utils/getUserFromToken';

export async function POST(req: NextRequest) {
  try {
    // STEP 1. 인증
    const result = await getUserFromToken();
    if ('error' in result) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    const { userId } = result;

    // STEP 2. 요청 파싱
    let body: { name?: string };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: '잘못된 요청 형식입니다.' }, { status: 400 });
    }

    const { name } = body;
    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: '칭호 이름이 유효하지 않습니다.' }, { status: 400 });
    }

    // STEP 3. 칭호 유효성 확인
    const honorific = await prisma.honorific.findFirst({ where: { name } });
    if (!honorific) {
      return NextResponse.json({ error: '해당 이름의 칭호가 존재하지 않습니다.' }, { status: 404 });
    }

    // STEP 4. 보유 여부 확인
    const userOwnsHonorific = await prisma.user_honorific.findFirst({
      where: {
        user_id: userId,
        honorific_id: honorific.id,
      },
    });

    if (!userOwnsHonorific) {
      return NextResponse.json({ error: '보유하지 않은 칭호입니다.' }, { status: 403 });
    }

    // STEP 5. 변경 처리 (트랜잭션)
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

    return NextResponse.json({ message: '칭호가 성공적으로 변경되었습니다.' });
  } catch (error: unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      console.error('[Prisma Known Error]', error.message);
      return NextResponse.json({ error: '데이터 처리 중 오류가 발생했습니다.' }, { status: 500 });
    }

    if (error instanceof PrismaClientUnknownRequestError) {
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
