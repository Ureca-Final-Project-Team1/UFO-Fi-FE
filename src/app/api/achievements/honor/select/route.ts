import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/utils/getUserFromToken';

export async function POST(req: NextRequest) {
  const result = await getUserFromToken();
  if ('error' in result) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  const { userId } = result;

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

  try {
    const honorific = await prisma.honorific.findFirst({ where: { name } });

    if (!honorific) {
      return NextResponse.json({ error: '해당 이름의 칭호가 존재하지 않습니다.' }, { status: 404 });
    }

    // 사용자가 해당 칭호를 보유하고 있는지 확인
    const userOwnsHonorific = await prisma.user_honorific.findFirst({
      where: {
        user_id: userId,
        honorific_id: honorific.id,
      },
    });

    if (!userOwnsHonorific) {
      return NextResponse.json({ error: '보유하지 않은 칭호입니다.' }, { status: 403 });
    }

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
  } catch (err) {
    console.error('[honorific select error]', err);
    return NextResponse.json({ error: '서버 오류로 변경에 실패했습니다.' }, { status: 500 });
  }
}
